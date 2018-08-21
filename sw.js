let staticCacheName = 'kodiranje';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '../../hikeislife.kodiranje.io/other/manifest.webmanifest',

        '../../hikeislife.kodiranje.io',
        '../../hikeislife.kodiranje.io/index.html',

        '../../hikeislife.kodiranje.io/styles/style.css',

        '../../hikeislife.kodiranje.io/other/cog192.png',
        '../../hikeislife.kodiranje.io/other/cog512.png',
        '../../hikeislife.kodiranje.io/other/cog48.png',

        '../../hikeislife.kodiranje.io/js/content.json',

        '../../hikeislife.kodiranje.io/app.js',
        '../../hikeislife.kodiranje.io/sw.js',
        '../../hikeislife.kodiranje.io/cog.png',

        'https://fonts.googleapis.com/css?family=Cutive+Mono'
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
        
        caches.open(staticCacheName).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/other/cog512.png');
      });
    }
  }));
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('kodiranje-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return cashe.delete(cacheName);
        })
      );
    })
  );
  
  //cashes.delete('oldkodiranje')
});




/*document.querySelector('.cache-article').addEventListener('click', function(event) {
  event.preventDefault();
  var id = this.dataset.articleId;
  caches.open('mysite-article-' + id).then(function(cache) {
    fetch('/get-article-urls?id=' + id).then(function(response) {
      // /get-article-urls returns a JSON-encoded array of
      // resource URLs that a given article depends on
      return response.json();
      console.log(response.json());
    }).then(function(urls) {
      cache.addAll(urls);
    });
  });
});*/

/*var CACHE_VERSION = 1;

// Shorthand identifier mapped to specific versioned cache.
var CURRENT_CACHES = {
  font: 'font-cache-v' + CACHE_VERSION
};

self.addEventListener('activate', function(event) {
  var expectedCacheNames = Object.values(CURRENT_CACHES);

  // Active worker won't be treated as activated until promise
  // resolves successfully.
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (!expectedCacheNames.includes(cacheName)) {
            console.log('Deleting out of date cache:', cacheName);
            
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('Handling fetch event for', event.request.url);

  event.respondWith(
    
    // Opens Cache objects that start with 'font'.
    caches.open(CURRENT_CACHES['font']).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if (response) {
          console.log('Found response in cache:', response);

          return response;
        }

        console.log('Fetching request from the network');

        return fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());

          return networkResponse;
        });
      }).catch(function(error) {
        
        // Handles exceptions that arise from match() or fetch().
        console.error('Error in fetch handler:', error);

        throw error;
      });
    })
  );
});*/