// Helper per sottoscrizione alle Notifiche Push (Nativo iOS/Android + Web Push Safari/Chrome)
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';

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

export async function getPushPermissionState(): Promise<'granted' | 'denied' | 'prompt'> {
  if (typeof window === 'undefined') return 'denied';

  if (Capacitor.isNativePlatform()) {
    try {
      const status = await PushNotifications.checkPermissions();
      if (status.receive === 'granted') return 'granted';
      if (status.receive === 'denied') return 'denied';
      return 'prompt';
    } catch {
      return 'prompt';
    }
  }

  if ('Notification' in window) {
    if (Notification.permission === 'granted') return 'granted';
    if (Notification.permission === 'denied') return 'denied';
    return 'prompt';
  }

  return 'denied';
}

export async function registerPushNotifications(): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  // 1. SUPPORTO NATIVO (iOS TestFlight o Android APK)
  if (Capacitor.isNativePlatform()) {
    try {
      let permStatus = await PushNotifications.checkPermissions();
      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        console.log('Permesso notifiche push nativo negato');
        return false;
      }

      await PushNotifications.register();

      return new Promise<boolean>((resolve) => {
        PushNotifications.addListener('registration', async (token) => {
          console.log('Token dispositivo nativo registrato:', token.value);
          try {
            await fetch('/api/push/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                endpoint: `native:${token.value}`,
                keys: {
                  p256dh: 'native',
                  auth: 'native',
                },
                deviceInfo: `${Capacitor.getPlatform()}: ${navigator.userAgent}`,
              }),
            });
            resolve(true);
          } catch (e) {
            console.error('Errore invio token al server:', e);
            resolve(false);
          }
        });

        PushNotifications.addListener('registrationError', (error) => {
          console.error('Errore registrazione push nativo:', error);
          resolve(false);
        });

        setTimeout(() => resolve(true), 3500);
      });
    } catch (err) {
      console.error('Errore esecuzione push nativo:', err);
      return false;
    }
  }

  // 2. SUPPORTO WEB PUSH (Safari iOS 16.4+, Chrome, Edge, Android Browser)
  if ('serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window) {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;

      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.log('Permesso notifiche web negato');
        return false;
      }

      const vapidKey = (
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
        'BMeRI6-Cc0iR77fc7uCt2VfTzQIyaxnyxTWZ79hTKFt8saVHgPmhIdKcubzGgjJucuElyzU3ONNRMkJiC_WBSJc'
      ).replace(/\s+/g, '');

      const convertedKey = urlBase64ToUint8Array(vapidKey);

      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedKey,
      });

      const subJson = subscription.toJSON();
      if (!subJson.endpoint || !subJson.keys) return false;

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
      console.error('Errore durante la registrazione web push:', error);
      return false;
    }
  }

  return false;
}

export function isPushSupported(): boolean {
  if (typeof window === 'undefined') return false;
  if (Capacitor.isNativePlatform()) return true;
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}
