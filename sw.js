// Guarda la app en el móvil para que cargue al instante. Spotify siempre va por red.
const CACHE = 'hitazo-v1';
const SHELL = ['./', 'index.html', 'css/styles.css', 'js/app.js', 'js/data.js', 'js/spotify.js', 'js/qr.js', 'vendor/jsQR.js', 'manifest.webmanifest', 'icons/icon-192.png'];

self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.origin === location.origin) {
    // Red primero (para recibir cambios), caché si no hay conexión
    e.respondWith(fetch(e.request).then(r => {
      const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true })));
  } else if (url.host.includes('fonts.g')) {
    e.respondWith(caches.match(e.request).then(m => m || fetch(e.request).then(r => {
      const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r;
    })));
  }
});
