/* Alphabloom Offline Cache-First Service Worker (v2 — Redirect-Safe for Cloudflare & Android PWA) */
const CACHE_NAME = 'alphabloom-pwa-v2';
const ASSETS_TO_CACHE = [
  './',
  './styles.css',
  './audio.js',
  './languages.js',
  './stories.js',
  './ads.js',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Strip redirect flag so Android Chrome never rejects cached navigation responses
async function cleanResponse(response) {
  if (!response) return response;
  if (!response.redirected) return response;
  const body = await response.clone().arrayBuffer();
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of ASSETS_TO_CACHE) {
        try {
          const res = await fetch(new Request(url, { cache: 'reload' }));
          if (res && res.ok) {
            await cache.put(url, await cleanResponse(res));
          }
        } catch (e) {
          // Continue caching remaining assets even if one fails
        }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  // Ignore external ad/analytics requests so offline mode never breaks
  if (url.origin !== self.location.origin) return;

  // Navigation requests (opening the installed PWA / refreshing): serve clean cached app shell
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('./', { ignoreSearch: true }).then((cached) => {
        if (cached) return cached;
        return fetch(event.request)
          .then(async (res) => {
            if (res && res.ok) {
              const cleaned = await cleanResponse(res);
              const copy = cleaned.clone();
              caches.open(CACHE_NAME).then((c) => c.put('./', copy));
              return cleaned;
            }
            return res;
          })
          .catch(() => caches.match('./', { ignoreSearch: true }));
      })
    );
    return;
  }

  // Static assets: Cache-First with network fallback
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request)
        .then(async (networkResponse) => {
          if (networkResponse && networkResponse.ok && networkResponse.type === 'basic') {
            const cleaned = await cleanResponse(networkResponse);
            const copy = cleaned.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
            return cleaned;
          }
          return networkResponse;
        })
        .catch(() => caches.match('./', { ignoreSearch: true }));
    })
  );
});
