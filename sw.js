"use strict";
const files = [
  "./burger2.jpeg",
  "./index.html",
  "./main.js",
  "./main.css",
  "fonts/Inter-Medium.ttf",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open("v1");
        return cache.addAll(files);
      } catch (e) {
        console.log(e.message);
      }
    })()
  );
});
self.addEventListener("fetch", (event) => {
  console.log("ServiceWorker Fetch", event.request.url);
  event.respondWith(
    (async () => {
      try {
        const response = await caches.match(event.request);
        return response || fetch(event.request);
      } catch (e) {
        console.log(e.message);
      }
    })()
  );
});
