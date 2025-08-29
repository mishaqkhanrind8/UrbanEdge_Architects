const CACHE_NAME = "my-pwa-cache-v1"; // Cache name (change version to update)
const OFFLINE_URL = "/offline.html";  // Fallback offline page

// Files to cache for offline use
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/assets/android-chrome-192x192.png",
  "/assets/android-chrome-512x512.png",
  OFFLINE_URL
];

// Install event - cache essential files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Activate immediately
});

// Activate event - clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // Take control of clients immediately
});

// Fetch event - offline-first strategy
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Serve from cache if available
        return cachedResponse;
      }
      // Otherwise fetch from network
      return fetch(event.request).catch(() => {
        // If both fail and it's a navigation request, show offline page
        if (event.request.mode === "navigate") {
          return caches.match(OFFLINE_URL);
        }
      });
    })
  );
});