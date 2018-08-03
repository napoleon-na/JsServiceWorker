'use strict';

var currentCacheVersion = 'js-sw-v0.01';

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(currentCacheVersion).then(function (cache) {
    return cache.add('./offline.html');
  }));
});

self.addEventListener('activate', function (event) {
  event.waitUntil(caches.keys().then(function (chacheNames) {
    return Promise.all(chacheNames.filter(function (cacheName) {
      return !(cacheName == currentCacheVersion);
    }).map(function (cacheName) {
      return caches.delete(cacheName);
    }));
  }));
});

self.addEventListener('fetch', function (event) {
  event.respondWith(fetch(event.request).catch(function () {
    return caches.match('offline.html');
  }));
});

// Before compiling
// 'use strict';

// const currentCacheVersion = 'js-sw-v0.01';

// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(currentCacheVersion).then(cache => cache.add('./offline.html'))
//   );
// });

// self.addEventListener('activate', event => {
//   event.waitUntil(
//     caches.keys().then(chacheNames => 
//       Promise.all(
//         chacheNames.filter(cacheName => !(cacheName == currentCacheVersion))
//         .map(cacheName => caches.delete(cacheName))
//       )
//     )
//   );
// });

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     fetch(event.request).catch(() => caches.match('offline.html'))
//   );
// });