import webpush from 'web-push';
import { getDbPool } from './db';
import { sendNativeApns } from './apns';

const publicKey = (
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
  'BMeRI6-Cc0iR77fc7uCt2VfTzQIyaxnyxTWZ79hTKFt8saVHgPmhIdKcubzGgjJucuElyzU3ONNRMkJiC_WBSJc'
).replace(/\s+/g, '');
const privateKey = (
  process.env.VAPID_PRIVATE_KEY || 'zF-sPsmNLfKuuD2qGyv4i4rSh7rd3aI8zjFK5DDYRqI'
).replace(/\s+/g, '');
const subject = (process.env.VAPID_SUBJECT || 'mailto:info@gardigital.it').trim();

let vapidConfigured = false;
try {
  webpush.setVapidDetails(subject, publicKey, privateKey);
  vapidConfigured = true;
} catch (e) {
  console.warn('VAPID setup error:', e);
}

export interface PushPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  url?: string;
  data?: any;
}

export async function broadcastPushNotification(payload: PushPayload) {
  const pool = getDbPool();
  try {
    const res = await pool.query(
      'SELECT id, endpoint, p256dh, auth FROM public.cambia_look_push_subscribers'
    );
    const subscribers = res.rows;
    console.log(`Sending push notification to ${subscribers.length} subscriber(s)...`);

    if (subscribers.length === 0) {
      return { sent: 0, failed: 0 };
    }

    const jsonPayload = JSON.stringify({
      title: payload.title,
      body: payload.body,
      icon: payload.icon || '/icon-192x192.png',
      badge: payload.badge || '/icon-192x192.png',
      url: payload.url || '/?tab=promozioni',
      data: payload.data || {},
    });

    let sent = 0;
    let failed = 0;
    const staleEndpoints: string[] = [];

    await Promise.allSettled(
      subscribers.map(async (sub) => {
        // CASO 1: NOTIFICA NATIVA iOS (APNs Apple Push Notification service)
        if (sub.endpoint && sub.endpoint.startsWith('native:')) {
          const deviceToken = sub.endpoint.replace(/^native:/, '').trim();
          try {
            const apnsRes = await sendNativeApns({
              deviceToken,
              title: payload.title,
              body: payload.body,
              url: payload.url,
              data: payload.data,
            });
            if (apnsRes.success) {
              sent++;
              console.log(`[APNs] Notifica inviata con successo al token ${deviceToken.slice(0, 8)}...`);
            } else {
              failed++;
              console.warn(`[APNs] Invio fallito: ${apnsRes.error}`);
              if (apnsRes.error?.includes('BadDeviceToken') || apnsRes.error?.includes('Unregistered')) {
                staleEndpoints.push(sub.endpoint);
              }
            }
          } catch (e: any) {
            failed++;
            console.error('[APNs] Errore imprevisto:', e.message);
          }
          return;
        }

        // CASO 2: WEB PUSH STANDARD (Safari macOS, Chrome, Edge, Android)
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth,
          },
        };
        try {
          await webpush.sendNotification(pushSubscription, jsonPayload);
          sent++;
        } catch (err: any) {
          failed++;
          // Se 410 o 404, l'utente ha disiscritto o disinstallato
          if (err.statusCode === 410 || err.statusCode === 404) {
            staleEndpoints.push(sub.endpoint);
          }
        }
      })
    );

    // Pulizia subscriber non più validi
    if (staleEndpoints.length > 0) {
      await pool.query(
        'DELETE FROM public.cambia_look_push_subscribers WHERE endpoint = ANY($1)',
        [staleEndpoints]
      );
    }

    return { sent, failed };
  } catch (error) {
    console.error('Error broadcasting push notification:', error);
    return { sent: 0, failed: 0, error };
  }
}
