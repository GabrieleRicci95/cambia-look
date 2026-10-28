import webpush from 'web-push';
import { getDbPool } from './db';

const publicKey =
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
  'BMeRI6-Cc0iR77fc7uCt2VfTzQIyaxnyxTWZ79hTKFt8saVHgPmhIdKcubzGgjJucuElyzU3ONNRMkJiC_WBSJc';
const privateKey =
  process.env.VAPID_PRIVATE_KEY || 'zF-sPsmNLfKuuD2qGyv4i4rSh7rd3aI8zjFK5DDYRqI';
const subject = process.env.VAPID_SUBJECT || 'mailto:info@gardigital.it';

try {
  webpush.setVapidDetails(subject, publicKey, privateKey);
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
          // If status is 410 Gone or 404 Not Found, subscriber unregistered:
          if (err.statusCode === 410 || err.statusCode === 404) {
            staleEndpoints.push(sub.endpoint);
          }
        }
      })
    );

    // Clean up stale subscribers
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
