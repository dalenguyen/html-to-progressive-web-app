console.log('Service Worker is running...');

var cacheName = 'CacheWeb';
var filesToCache = [
  '/',
  '/index.html',
  '/css/fireworks.css',
  '/js/fireworks.js',
  '/images/big-glow.png',
  '/images/small-glow.png',
  '/images/fireworks-icon192x192.png'
];
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate',  event => {
    console.log('SW activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    console.log('SW fetch...');
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});