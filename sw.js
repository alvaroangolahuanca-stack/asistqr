const CACHE = 'asistqr-v4';
const SHELL = ['./', './index.html', './manifest.webmanifest', './vendor/jsQR.js', './vendor/qrcode.js',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-180.png', './icons/favicon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // Lista de códigos revocados: siempre desde la red
  if (url.pathname.endsWith('revocados.json')) return;
  // Página principal: red primero (para recibir actualizaciones), caché si no hay internet
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put('./index.html', cp)); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
    if (r.ok && (url.origin === location.origin || url.hostname.includes('gstatic') || url.hostname.includes('googleapis'))) {
      const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp));
    }
    return r;
  })));
});
