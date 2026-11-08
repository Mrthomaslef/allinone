const CACHE_NAME = 'ppi-mobile-v47';
const ASSETS = [
  '/', '/index.html', '/manifest.json',
  '/src/main.js', '/src/engine/GameState.js', '/src/engine/RulesEngine.js',
  '/src/engine/AIPlayer.js', '/src/engine/CoinFlip.js',
  '/src/ui/Playmat.js', '/src/ui/Hand.js', '/src/ui/LogPanel.js',
  '/src/ui/TutorialOverlay.js', '/src/ui/DeckBuilder.js',
  '/src/data/cards.js', '/src/data/decks.js', '/src/data/tutorial.js',
  '/src/assets/card-back.svg', '/src/assets/coin-heads.svg', '/src/assets/coin-tails.svg',
  '/src/assets/playmat.svg', '/src/assets/bgm.m4a', '../assets/bgm.m4a',
  '../assets/playmats/night.jpg', '../assets/playmats/jungle.jpg',
  '../assets/playmats/fossil.jpg', '../assets/playmats/mewtwo.jpg',
  '../assets/trainers/hanae.jpg', '../assets/trainers/ryo.jpg', '../assets/trainers/kai.jpg',
  '../assets/trainers/takuya.jpg', '../assets/trainers/soren.jpg', '../assets/trainers/axel.jpg',
  '../assets/trainers/hanae.png', '../assets/trainers/ryo.png', '../assets/trainers/kai.png',
  '../assets/trainers/takuya.png', '../assets/trainers/soren.png', '../assets/trainers/axel.png',
  '../assets/trainers/mika.jpg', '../assets/trainers/mika.png', '../assets/trainers/yuki.jpg', '../assets/trainers/yuki.png', '../assets/trainers/dorian.jpg', '../assets/trainers/dorian.png', '../assets/trainers/lena.jpg', '../assets/trainers/lena.png', '../assets/trainers/raphael.jpg', '../assets/trainers/raphael.png', '../assets/trainers/selene.jpg', '../assets/trainers/selene.png', '../assets/trainers/ren.jpg', '../assets/trainers/ren.png'
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
