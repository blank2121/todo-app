const CACHE_NAME = "static-cache-v1";
// Cache Files
const FILES_TO_CACHE = ["/pwa/index.html", "/build/bundle.js", "/build/bundle.js.map", "/global.css", "https://fonts.googleapis.com/css2?family=Poppins&family=Source+Code+Pro:wght@300&display=swap"];

self.addEventListener("install", evt => {
  console.log("Service Worker: Installed");
  evt.waitUntil(
      caches
      .open(CACHE_NAME)
      .then(cache => {
          console.log("Service Worker: Caching files");
          cache.addAll(FILES_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
})

self.addEventListener("activate", evt => {
  console.log("Service Worker: Activated");
  //removing unwanted cache entries
  evt.waitUntil(
      caches.keys().then(CACHE_NAME => {
          return Promise.all(
              CACHE_NAME.map(cache => {
                  if(cache === CACHE_NAME) {
                      console.log("Service Worker: Clearing cache");
                      return caches.delete(cache);
                  }
              })
          )
      })
  );
});

self.addEventListener("fetch", evt => {
  console.log('fetching...');
  evt.respondWith(fetch(evt.request).catch(() => caches.match(evt.request)));
});
