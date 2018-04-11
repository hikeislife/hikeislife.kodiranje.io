//cashes important assets on first visit for easier load on later visits

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',

        '/styles/style.css',
        '/styles/dt-style.css',

        '/other/',
        '/other/cog192.png',
        '/other/cog512.png',
        '/other/cog48.png',

        '/app.js',
        '/sw.js',
        '/cog.png'
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
        
        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/other/cog512.png');
      });
    }
  }));
});
