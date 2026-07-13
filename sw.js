/* =========================================================
   BSEB Student Portal
   Production Service Worker
   File: sw.js
========================================================= */

const CACHE_NAME = "bseb-student-portal-v1.0.0";

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
  "./offline.html",
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

  "./icons/icon-72.png",
  "./icons/icon-96.png",
  "./icons/icon-128.png",
  "./icons/icon-144.png",
  "./icons/icon-152.png",
  "./icons/icon-192.png",
  "./icons/icon-384.png",
  "./icons/icon-512.png"
];

/* Install */

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache => cache.addAll(ASSETS))

    );

    self.skipWaiting();

});

/* Activate */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys.map(key => {

                    if(key !== CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            );

        })

    );

    self.clients.claim();

});

/* Fetch */

self.addEventListener("fetch", event => {

    if(event.request.method !== "GET") return;

    event.respondWith(

        caches.match(event.request)

        .then(cacheResponse => {

            if(cacheResponse){

                return cacheResponse;

            }

            return fetch(event.request)

            .then(networkResponse => {

                const responseClone = networkResponse.clone();

                caches.open(CACHE_NAME)

                .then(cache => {

                    cache.put(event.request,responseClone);

                });

                return networkResponse;

            })

            .catch(() => {

                if(event.request.mode === "navigate"){

                    return caches.match("./offline.html");

                }

            });

        })

    );

});
