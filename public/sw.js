// Service Worker for INVESTOPATRONUS
// Caches static resources for faster repeat visits

const CACHE_NAME = 'investopatronus-v1';
const STATIC_CACHE = 'static-v1';
const API_CACHE = 'api-v1';

// Static resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/logos/navigation/news.png',
  '/logos/navigation/analytics.png',
  '/logos/navigation/forum.png',
  '/logos/navigation/academy.png',
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Network-first for API calls (fresh data preferred)
  networkFirst: async (request, cacheName) => {
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        const cache = await caches.open(cacheName);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch {
      return caches.match(request);
    }
  },

  // Cache-first for static assets (speed preferred)
  cacheFirst: async (request, cacheName) => {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        const cache = await caches.open(cacheName);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch {
      return new Response('Offline', { status: 503 });
    }
  },

  // Stale-while-revalidate for translations and semi-static content
  staleWhileRevalidate: async (request, cacheName) => {
    const cached = await caches.match(request);
    
    const fetchPromise = fetch(request).then(async networkResponse => {
      if (networkResponse.ok) {
        // Clone response immediately before it's used
        const clonedResponse = networkResponse.clone();
        const cache = await caches.open(cacheName);
        // Put cloned response in cache (don't await to avoid blocking)
        cache.put(request, clonedResponse).catch(err => {
          console.warn('SW: Failed to cache response:', err);
        });
      }
      return networkResponse;
    }).catch(() => cached);

    return cached || fetchPromise;
  }
};

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(STATIC_ASSETS.filter(url => !url.includes('undefined')));
    }).catch(err => {
      console.warn('SW: Failed to cache some static assets', err);
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => !name.includes('v1'))
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - apply caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) return;

  // Skip Supabase realtime and auth
  if (url.hostname.includes('supabase') && 
      (url.pathname.includes('/realtime') || url.pathname.includes('/auth'))) {
    return;
  }

  // Google Fonts - cache first (they rarely change)
  if (url.hostname.includes('fonts.googleapis.com') || 
      url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Images - cache first
  if (request.destination === 'image' || 
      url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|avif|ico)$/i)) {
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Translation JSON files - stale while revalidate
  if (url.pathname.includes('/locales/') && url.pathname.endsWith('.json')) {
    event.respondWith(CACHE_STRATEGIES.staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }

  // API calls to Supabase - network first with cache fallback
  if (url.hostname.includes('supabase')) {
    event.respondWith(CACHE_STRATEGIES.networkFirst(request, API_CACHE));
    return;
  }

  // Static assets (JS, CSS) - stale while revalidate
  if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(CACHE_STRATEGIES.staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }

  // Default - network first
  event.respondWith(CACHE_STRATEGIES.networkFirst(request, CACHE_NAME));
});

// Handle messages from the main thread
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
