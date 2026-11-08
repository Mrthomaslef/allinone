// Service Worker « images uniquement » : ne touche JAMAIS au HTML/JS (les mises à jour restent gérées par version.json).
// - Cartes tcgdex (URLs immuables, qualité HD conservée) : cache d'abord, réseau sinon.
// - Images locales (dresseurs, boosters, tapis) : réponse immédiate depuis le cache + rafraîchissement en arrière-plan.
const CACHE = 'ppi-img-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('ppi-img-') && k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isCard = url.hostname === 'assets.tcgdex.net';
  const isLocalImg = url.origin === self.location.origin && /\.(webp|png|jpe?g|svg)$/i.test(url.pathname);
  if (!isCard && !isLocalImg) return;

  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req.url);
    if (isCard) {
      if (hit) return hit;
      let res;
      try { res = await fetch(req.url, { mode: 'cors', credentials: 'omit' }); } catch (_) { res = null; }
      if (!res || !res.ok) return fetch(req);
      cache.put(req.url, res.clone()).catch(() => {});
      return res;
    }
    const refresh = fetch(req).then((res) => {
      if (res && res.ok) cache.put(req.url, res.clone()).catch(() => {});
      return res;
    });
    if (hit) { e.waitUntil(refresh.catch(() => {})); return hit; }
    return refresh;
  })());
});
