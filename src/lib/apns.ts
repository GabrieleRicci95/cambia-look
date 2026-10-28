import http2 from 'http2';
import crypto from 'crypto';

export interface ApnsPayload {
  deviceToken: string;
  title: string;
  body: string;
  url?: string;
  data?: any;
}

let cachedJwt: { token: string; expiresAt: number } | null = null;

function getApnsJwt(teamId: string, keyId: string, privateKeyRaw: string): string {
  const now = Math.floor(Date.now() / 1000);
  if (cachedJwt && cachedJwt.expiresAt > now + 300) {
    return cachedJwt.token;
  }

  // Assicura il formato corretto della chiave PEM .p8
  let formattedKey = privateKeyRaw.trim();
  if (!formattedKey.includes('-----BEGIN PRIVATE KEY-----')) {
    // Se passata in base64 o su una sola riga
    formattedKey = `-----BEGIN PRIVATE KEY-----\n${formattedKey}\n-----END PRIVATE KEY-----`;
  }
  // Ripristina eventuali a capo se salvata come stringa con newline sfuggiti
  formattedKey = formattedKey.replace(/\\n/g, '\n');

  const header = Buffer.from(JSON.stringify({ alg: 'ES256', kid: keyId })).toString('base64url');
  const claims = Buffer.from(JSON.stringify({ iss: teamId, iat: now })).toString('base64url');
  const message = `${header}.${claims}`;

  const signature = crypto.sign('sha256', Buffer.from(message), {
    key: formattedKey,
    dsaEncoding: 'ieee-p1363',
  }).toString('base64url');

  const token = `${message}.${signature}`;
  cachedJwt = {
    token,
    expiresAt: now + 3000, // Valido per 50 minuti (max Apple: 60 min)
  };
  return token;
}

async function sendToApnsHost(
  host: string,
  deviceToken: string,
  jwt: string,
  bundleId: string,
  payloadJson: string
): Promise<{ success: boolean; statusCode?: number; error?: string }> {
  return new Promise((resolve) => {
    let client: http2.ClientHttp2Session | null = null;
    try {
      client = http2.connect(`https://${host}:443`);

      client.on('error', (err) => {
        resolve({ success: false, error: err.message });
      });

      const req = client.request({
        ':method': 'POST',
        ':path': `/3/device/${deviceToken}`,
        authorization: `bearer ${jwt}`,
        'apns-topic': bundleId,
        'apns-push-type': 'alert',
        'apns-priority': '10',
        'content-type': 'application/json',
      });

      let responseBody = '';
      let statusCode = 0;

      req.on('response', (headers) => {
        statusCode = Number(headers[':status'] || 0);
      });

      req.setEncoding('utf8');
      req.on('data', (chunk) => {
        responseBody += chunk;
      });

      req.on('end', () => {
        if (client && !client.closed) client.close();
        if (statusCode === 200) {
          resolve({ success: true, statusCode });
        } else {
          resolve({ success: false, statusCode, error: responseBody });
        }
      });

      req.on('error', (err) => {
        if (client && !client.closed) client.close();
        resolve({ success: false, error: err.message });
      });

      req.setTimeout(8000, () => {
        req.close();
        if (client && !client.closed) client.close();
        resolve({ success: false, error: 'APNs request timeout' });
      });

      req.write(payloadJson);
      req.end();
    } catch (err: any) {
      if (client && !client.closed) client.close();
      resolve({ success: false, error: err.message });
    }
  });
}

export async function sendNativeApns(payload: ApnsPayload): Promise<{ success: boolean; error?: string }> {
  const teamId = (process.env.APNS_TEAM_ID || '33VT7NT5X9').trim();
  const keyId = (process.env.APNS_KEY_ID || '').trim();
  const privateKey = (process.env.APNS_PRIVATE_KEY || '').trim();
  const bundleId = (process.env.APNS_BUNDLE_ID || 'com.gardigital.cambialook').trim();

  if (!keyId || !privateKey) {
    return {
      success: false,
      error: 'APNs non configurato sul server: mancano APNS_KEY_ID o APNS_PRIVATE_KEY',
    };
  }

  try {
    const jwt = getApnsJwt(teamId, keyId, privateKey);
    const body = JSON.stringify({
      aps: {
        alert: {
          title: payload.title,
          body: payload.body,
        },
        sound: 'default',
        badge: 1,
      },
      url: payload.url || '/?tab=promozioni',
      data: payload.data || {},
    });

    // Per le app TestFlight / Produzione, proviamo prima api.push.apple.com, poi api.sandbox.push.apple.com se necessario
    let res = await sendToApnsHost('api.push.apple.com', payload.deviceToken, jwt, bundleId, body);
    if (!res.success && (res.error?.includes('BadDeviceToken') || res.statusCode === 400)) {
      // In modalità TestFlight o sviluppo, il token potrebbe risiedere nel server sandbox di Apple
      const sandboxRes = await sendToApnsHost('api.sandbox.push.apple.com', payload.deviceToken, jwt, bundleId, body);
      if (sandboxRes.success) return { success: true };
    }

    return res;
  } catch (err: any) {
    console.error('sendNativeApns error:', err);
    return { success: false, error: err.message };
  }
}
