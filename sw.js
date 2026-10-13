// Nombre de la versión del caché
const CACHE_NAME = 'notas-pwa-v1';

// Archivos básicos a guardar
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Evento de instalación: guarda los archivos en caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Evento de activación: limpia cachés antiguas si las hubiera
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Evento fetch: responde desde el caché si no hay internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});