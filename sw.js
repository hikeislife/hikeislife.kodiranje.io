let CACHE = "cache";
const precacheFiles = [
        // 'index.html',
        // 'styles/style.css',
        // 'styles/dot.png',
        // 'other/cog192.png',
        // 'other/cog48.png',
        // 'other/cog512.png',
        // 'other/flipping_robot.gif',
        // 'other/carriage-return.gif',
        // 'other/radni-ciklus.gif',
        // 'other/what-is-this-for.gif',
        // 'js/content.json',
        // 'js/app.js'
];

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "offline.html";

const networkFirstPaths = [
  /* Add an array of regex of paths that should go network first */
  // Example: /\/api\/.*/
];

const avoidCachingPaths = [
  /* Add an array of regex of paths that shouldn't be cached */
  // Example: /\/api\/.*/
];

function pathComparer(requestUrl, pathRegEx) {
  return requestUrl.match(new RegExp(pathRegEx));
}

function comparePaths(requestUrl, pathsArray) {
  if (requestUrl) {
    for (let index = 0; index < pathsArray.length; index++) {
      const pathRegEx = pathsArray[index];
      if (pathComparer(requestUrl, pathRegEx)) {
        return true;
      }
    }
  }

  return false;
}

self.addEventListener("install", function (event) {
  console.log("Instalacija");

  console.log("Preskakanje čekanja na instalaciju");
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      console.log("Keširanje stranica pri instalaciji");

      return cache.addAll(precacheFiles).then(function () {
        if (offlineFallbackPage === "offline.html") {
          return cache.add(new Response("Updejt vrednosti offlineFallbackPage constante servisnog workera."));
        }

        return cache.add(offlineFallbackPage);
      });
    })
  );
});

// Allow sw to control of current page
self.addEventListener("activate", function (event) {
  console.log("Preuzimanje klijenta");
  event.waitUntil(self.clients.claim());
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;

  if (comparePaths(event.request.url, networkFirstPaths)) {
    networkFirstFetch(event);
  } else {
    cacheFirstFetch(event);
  }
});

function cacheFirstFetch(event) {
  event.respondWith(
    fromCache(event.request).then(
      function (response) {
        // The response was found in the cache so we respond with it and update the entry

        // This is where we call the server to get the newest version of the
        // file to use the next time we show view
        event.waitUntil(
          fetch(event.request).then(function (response) {
            return updateCache(event.request, response);
          })
        );

        return response;
      },
      function () {
        // The response was not found in the cache so we look for it on the server
        return fetch(event.request)
          .then(function (response) {
            // If request was success, add or update it in the cache
            event.waitUntil(updateCache(event.request, response.clone()));

            return response;
          })
          .catch(function (error) {
            // The following validates that the request was for a navigation to a new document
            if (event.request.destination !== "document" || event.request.mode !== "navigate") {
              return;
            }

            console.log("[PWA Builder] Network request failed and no cache." + error);
            // Use the precached offline page as fallback
            return caches.open(CACHE).then(function (cache) {
              cache.match(offlineFallbackPage);
            });
          });
      }
    )
  );
}

function networkFirstFetch(event) {
  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        // If request was success, add or update it in the cache
        event.waitUntil(updateCache(event.request, response.clone()));
        return response;
      })
      .catch(function (error) {
        console.log("Mreža nije dostupna. Koristi se sadržaj keša: " + error);
        return fromCache(event.request);
      })
  );
}

function fromCache(request) {
  // Check to see if you have it in the cache
  // Return response
  // If not in the cache, then return error page
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        return Promise.reject("no-match");
      }

      return matching;
    });
  });
}

function updateCache(request, response) {
  if (!comparePaths(request.url, avoidCachingPaths)) {
    return caches.open(CACHE).then(function (cache) {
      return cache.put(request, response);
    });
  }

  return Promise.resolve();
}


// let staticCacheName = 'kodiranje';

// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open(staticCacheName).then(function(cache) {
//       return cache.addAll([
//         '/',
//         '../../hikeislife.kodiranje.io/other/manifest.webmanifest',

//         '../../hikeislife.kodiranje.io',
//         '../../hikeislife.kodiranje.io/index.html',

//         '../../hikeislife.kodiranje.io/styles/style.css',

//         '../../hikeislife.kodiranje.io/other/cog192.png',
//         '../../hikeislife.kodiranje.io/other/cog512.png',
//         '../../hikeislife.kodiranje.io/other/cog48.png',

//         '../../hikeislife.kodiranje.io/js/content.json',

//         '../../hikeislife.kodiranje.io/app.js',
//         '../../hikeislife.kodiranje.io/sw.js',
//         '../../hikeislife.kodiranje.io/cog.png',

//         'https://fonts.googleapis.com/css?family=Cutive+Mono'
//       ]);
//     })
//   );
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(caches.match(event.request).then(function(response) {
//     // caches.match() always resolves
//     // but in case of success response will have value
//     if (response !== undefined) {
//       return response;
//     } else {
//       return fetch(event.request).then(function (response) {
//         // response may be used only once
//         // we need to save clone to put one copy in cache
//         // and serve second one
//         let responseClone = response.clone();
        
//         caches.open(staticCacheName).then(function (cache) {
//           cache.put(event.request, responseClone);
//         });
//         return response;
//       }).catch(function () {
//         return caches.match('/other/cog512.png');
//       });
//     }
//   }));
// });

// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.filter(function(cacheName) {
//           return cacheName.startsWith('kodiranje-') &&
//                  cacheName != staticCacheName;
//         }).map(function(cacheName) {
//           return cashe.delete(cacheName);
//         })
//       );
//     })
//   );
  
//   //cashes.delete('oldkodiranje')
// });




// document.querySelector('.cache-article').addEventListener('click', function(event) {
//   event.preventDefault();
//   var id = this.dataset.articleId;
//   caches.open('mysite-article-' + id).then(function(cache) {
//     fetch('/get-article-urls?id=' + id).then(function(response) {
//       // /get-article-urls returns a JSON-encoded array of
//       // resource URLs that a given article depends on
//       return response.json();
//       console.log(response.json());
//     }).then(function(urls) {
//       cache.addAll(urls);
//     });
//   });
// });

// /*var CACHE_VERSION = 1;

// // Shorthand identifier mapped to specific versioned cache.
// var CURRENT_CACHES = {
//   font: 'font-cache-v' + CACHE_VERSION
// };

// self.addEventListener('activate', function(event) {
//   var expectedCacheNames = Object.values(CURRENT_CACHES);

//   // Active worker won't be treated as activated until promise
//   // resolves successfully.
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(cacheName) {
//           if (!expectedCacheNames.includes(cacheName)) {
//             console.log('Deleting out of date cache:', cacheName);
            
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener('fetch', function(event) {
//   console.log('Handling fetch event for', event.request.url);

//   event.respondWith(
    
//     // Opens Cache objects that start with 'font'.
//     caches.open(CURRENT_CACHES['font']).then(function(cache) {
//       return cache.match(event.request).then(function(response) {
//         if (response) {
//           console.log('Found response in cache:', response);

//           return response;
//         }

//         console.log('Fetching request from the network');

//         return fetch(event.request).then(function(networkResponse) {
//           cache.put(event.request, networkResponse.clone());

//           return networkResponse;
//         });
//       }).catch(function(error) {
        
//         // Handles exceptions that arise from match() or fetch().
//         console.error('Error in fetch handler:', error);

//         throw error;
//       });
//     })
//   );
// });*/