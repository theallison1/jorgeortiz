const CACHE_NAME = 'jorge-ortiz-v1';

// Archivos básicos para que la App abra sin internet
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// 1. INSTALACIÓN: Guarda los archivos básicos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// 2. ACTIVACIÓN: Limpia versiones viejas de la App
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 3. ESTRATEGIA: Network First (Prioriza internet para ver stock actualizado)
// Si no hay internet, muestra lo que tiene en cache.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
