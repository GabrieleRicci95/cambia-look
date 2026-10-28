// Service Worker per Cambia Look - Notifiche Push
self.addEventListener('push', function (event) {
  if (!event.data) return;

  try {
    const data = event.data.json();
    const title = data.title || 'Cambia Look Parrucchieri';
    const options = {
      body: data.body || 'Nuova offerta disponibile!',
      icon: data.icon || '/icon-192x192.png',
      badge: data.badge || '/icon-192x192.png',
      vibrate: [200, 100, 200],
      data: {
        url: data.url || '/?tab=promozioni',
        ...(data.data || {}),
      },
      actions: [
        { action: 'open', title: 'Apri Promozione' },
        { action: 'close', title: 'Chiudi' },
      ],
    };

    event.waitUntil(self.registration.showNotification(title, options));
  } catch (e) {
    console.error('Errore visualizzazione notifica push:', e);
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  if (event.action === 'close') return;

  const targetUrl = event.notification.data?.url || '/?tab=promozioni';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url && 'focus' in client) {
          client.focus();
          client.navigate(targetUrl);
          return;
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
