/**
 * Registration of the service worker.
 * This code checks if the service worker API is available.
 */

if ('serviceWorker' in navigator){
    window.addEventListener('load' , function(){
        navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration){
            //Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);

        }, function(err){
            //registration failed :(
            console.log('ServiceWorker registration failed: ',err);
        });     
    });
}

/**
 * Updating the Service Worker
 */
 // Function to perform HTTP request
 var get = function(url) {
    return new Promise(function(resolve, reject) {
  
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                  var result = xhr.responseText
                  result = JSON.parse(result);
                  resolve(result);
              } else {
                  reject(xhr);
              }
          }
      };
      
      xhr.open("GET", url, true);
      xhr.send();
  
    }); 
  };
  

//Array used to hold the resources to be cached
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/styles/styles.css',
    '/styles/style1.css',
    '/styles/images/horse2.jpg',
    '/styles/images/horse1.jpg',
    '/styles/images/black.png',
    '/index.html',
    '/script/main.js'
];

/**
 * This is the install callback, we need to take the following steps:
 * 1. Open a cache
 * 2. Cache our files
 * 3. Confirm whether all the required assets are cached or not.
 * 
 * If all the files are successfully cached, then the service worker will be installed.
 * The installation step will fail if one file fails to be cached.
 */
self.addEventListener('install', function(event){
    console.log('[ServiceWorker] Installed');

    //Perform install steps, the .waitUntil() method calculates the installation time and if wether it succeeds.
    event.waitUntil(
        //The PROMISES caches.open() and caches.addAll() will be passed to CACHE_NAME 
        //PROMISE are functions
        caches.open(CACHE_NAME)
        .then(function(cache){
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

/**
 * FETCH this step lets the service worker return cached responses
 * This is used when a user refreshes or goes to a different page
 */
self.addEventListener ('fetch' , function(event){
    console.log('[ServiceWorker] Fetch', event.request.url);
    event.respondWith(
        /**
         * This method looks at the request and finds any cached results from any of the caches from the service worker
         * If there is no cached value available the service worker will FETCH the data through a network request and will
         * try to find anything can be retrieved.
         * 
        */
        caches.match(event.request)
        .then(function(response){
            // If the requesr is in the cache (Cache hit - return response)
            if (response){
                console.log("[ServiceWorker] Found in Cache", event.request.url, response);
                return response;
            }

        /**
         * If a user wants to cache new multiple requests, we then need to handle the response by storing the fetch requests to the cache
         * IMPORTANT:
         * Clone the request because it is a stream that can only be used once.
         * Hence storing the request in a variable.
         */

         var fetchRequest = event.request.clone();

         return fetch(fetchRequest).then(
             function(response){
                 // Checks if we recieved a valid response
                 if(!response || response.status !== 200 || response.type !== 'basic'){
                     return response;
                 }

                 /**
                  * Clone the response again for both the browser and the cache to consume the response. 
                  */
                 var responseToCache = response.clone();

                 caches.open(CACHE_NAME)
                 .then(function(cache){
                     cache.put(event.request, responseToCache);
                 });

                 return response;
            }
        );
    })
    );
});


