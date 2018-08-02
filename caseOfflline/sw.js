'use strict';

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open('js-sw-v0.01').then(function (cache) {
    return cache.add('./offline.html');
  }));
});

self.addEventListener('fetch', function (event) {
  event.respondWith(fetch(event.request).catch(function () {
    return caches.match('offline.html');
  }));
});

// Before compiling
// 'use strict';
// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open('js-sw-v0.01').then(cache => cache.add('./offline.html'))
//   );
// });
//
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     fetch(event.request).catch(() => caches.match('offline.html'))
//   );
// });