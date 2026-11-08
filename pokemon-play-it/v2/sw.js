const CACHE_NAME = 'ppi-mobile-v8';
const ASSETS = [
  '/', '/index.html', '/manifest.json',
  '/src/main.js', '/src/engine/GameState.js', '/src/engine/RulesEngine.js',
  '/src/engine/AIPlayer.js', '/src/engine/CoinFlip.js',
  '/src/ui/Playmat.js', '/src/ui/Hand.js', '/src/ui/LogPanel.js',
  '/src/ui/TutorialOverlay.js', '/src/ui/DeckBuilder.js',
  '/src/data/cards.js', '/src/data/decks.js', '/src/data/tutorial.js',
  '/src/assets/card-back.svg', '/src/assets/coin-heads.svg', '/src/assets/coin-tails.svg',
  '/src/assets/playmat.svg', '/src/assets/bgm.m4a', '../assets/bgm.m4a'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).then(fetchRes => {
      if (fetchRes.ok) caches.open(CACHE_NAME).then(cache => cache.put(e.request, fetchRes.clone()));
      return fetchRes;
    }).catch(() => caches.match('/index.html')))
  );
});
