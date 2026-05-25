const CACHE_NAME = "app4match-pwa-branding-v2";
const FILES = [
  "./",
  "./index.html",
  "./START_APP4MATCH.html",
  "./manifest.webmanifest",
  "./service-worker.js",
  "./assets/header-logo.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/favicon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  ));
});

self.addEventListener("fetch", event => {
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
