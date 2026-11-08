const CACHE = 'califica-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './js/core.js', './js/ui.js', './js/hoja.js', './js/omr.js', './js/excel.js',
  './vendor/jsQR.js', './vendor/qrcode.js', './vendor/jspdf.umd.min.js', './vendor/xlsx.bundle.js',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-180.png', './icons/favicon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('califica-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if(e.request.method !== 'GET') return;
  if(url.pathname.endsWith('revocados.json') || url.hostname.includes('supabase')) return;
  // Archivos propios: red primero (para recibir mejoras), caché si no hay internet
  if(url.origin === location.origin){
    e.respondWith(fetch(e.request).then(r => { if(r.ok){ const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request.mode === 'navigate' ? './index.html' : e.request, cp)); } return r; })
      .catch(() => caches.match(e.request.mode === 'navigate' ? './index.html' : e.request, {ignoreSearch:true})));
    return;
  }
  // Fuentes y el lector de imágenes: caché primero
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
    if(r.ok && /gstatic|googleapis|jsdelivr/.test(url.hostname)){ const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); }
    return r;
  })));
});
