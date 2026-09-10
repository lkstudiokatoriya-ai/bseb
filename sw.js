const CACHE_NAME = "bseb-portal-v1";

const FILES = [
    "./",
    "./index.html",
    "./manifest.json",
    "./sw.js",
    "./logo.png",
    "./banner1.webp",
    "./banner2.webp",
    "./banner3.webp"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES);
        })
    );

    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );

    self.clients.claim();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            return cached || fetch(event.request).catch(() => {
                return caches.match("./index.html");
            });
        })
    );
});
