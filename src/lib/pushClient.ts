// Helper per sottoscrizione alle Notifiche Push dal browser / webview

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function registerPushNotifications(): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.log('Push notifications non supportate su questo browser.');
    return false;
  }

  try {
    const reg = await navigator.serviceWorker.register('/sw.js');
    await navigator.serviceWorker.ready;

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('Permesso notifiche negato o chiuso dall\'utente.');
      return false;
    }

    const vapidKey =
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
      'BMeRI6-Cc0iR77fc7uCt2VfTzQIyaxnyxTWZ79hTKFt8saVHgPmhIdKcubzGgjJucuElyzU3ONNRMkJiC_WBSJc';

    const convertedKey = urlBase64ToUint8Array(vapidKey);

    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedKey,
    });

    const subJson = subscription.toJSON();

    if (!subJson.endpoint || !subJson.keys) {
      return false;
    }

    const res = await fetch('/api/push/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: subJson.endpoint,
        keys: {
          p256dh: subJson.keys.p256dh,
          auth: subJson.keys.auth,
        },
        deviceInfo: navigator.userAgent,
      }),
    });

    const data = await res.json();
    return data.success === true;
  } catch (error) {
    console.error('Errore durante la registrazione push:', error);
    return false;
  }
}

export function isPushSupported(): boolean {
  return typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}
