const CACHE_NAME = "Weather-cache-v1";

const urlsToCache = [
  "/",
// site manifest
'/static/site.webmanifest',

// favicon
'/static/images/favicon.ico',

// js
'/static/js/main.js',
'/static/js/index.js',

// css
'/static/css/style.css',

// images
'/static/images/sky.jpg',

//   bootstrap
  'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js',
  'https://code.jquery.com/jquery-3.5.1.slim.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',

];

self.addEventListener("install", function (event) {

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("push", (event) => {
  const title = "Yay! New Notification";
  const body = "We have received a push message";
  const icon = "/static/images/favicon-32x32.png";
  const tag = "simple-push-example-tag";
  try {
    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        icon: icon,
        tag: tag,
      })
    );
  } catch (error) {
    return;
  }
});
