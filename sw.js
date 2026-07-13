/* =========================================================
   BSEB Student Portal
   Production Service Worker
========================================================= */

const CACHE_NAME = "bseb-v1.0.0";

const ASSETS = [
  "./",
  "./index.html",
  "./notes.html",
  "./help.html",
  "./latest.html",
  "./syllabus.html",
  "./exam.html",
  "./admit.html",
  "./result.html",
  "./modelpaper.html",
  "./downloads.html",
  "./about.html",
  "./manifest.json",

  "./banner1.jpg",
  "./banner2.jpg",

  "./home.png",
  "./study.png",
  "./help.png",

  "./syllabus.png",
  "./latest.png",
  "./exam.png",
  "./admit.png",
  "./result.png",
  "./modelpaper.png",
  "./notes.png",
  "./downloads.png",
  "./about.png",
  "./my.png",

  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

/* INSTALL */

self.addEventListener("install", event => {

  self.skipWaiting();

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))

  );

});

/* ACTIVATE */

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys =>

      Promise.all(

        keys.map(key => {

          if (key !== CACHE_NAME) {

            return caches.delete(key);

          }

        })

      )

    )

  );

  self.clients.claim();

});

/* FETCH */

self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") return;

  event.respondWith(

    caches.match(event.request)

      .then(response => {

        if (response) {

          return response;

        }

        return fetch(event.request)

          .then(networkResponse => {

            const copy = networkResponse.clone();

            caches.open(CACHE_NAME)

              .then(cache => cache.put(event.request, copy));

            return networkResponse;

          })

          .catch(() => {

            if (event.request.mode === "navigate") {

              return caches.match("./offline.html") || caches.match("./index.html");

            }

          });

      })

  );

});
