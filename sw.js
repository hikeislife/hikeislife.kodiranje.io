//cashes important assets on first visit for easier load on later visits

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('kodiranje').then(function(cache) {
      return cache.addAll([
        '../../hikeislife.kodiranje.io',
        '../../hikeislife.kodiranje.io/index.html',

        '../../hikeislife.kodiranje.io/styles/style.css',
        '../../hikeislife.kodiranje.io/styles/dt-style.css',

        '../../hikeislife.kodiranje.io/other/',
        '../../hikeislife.kodiranje.io/other/cog192.png',
        '../../hikeislife.kodiranje.io/other/cog512.png',
        '../../hikeislife.kodiranje.io/other/cog48.png',

        '../../hikeislife.kodiranje.io/app.js',
        '../../hikeislife.kodiranje.io/sw.js',
        '../../hikeislife.kodiranje.io/cog.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        
        caches.open('kodiranje').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/other/cog512.png');
      });
    }
  }));
});