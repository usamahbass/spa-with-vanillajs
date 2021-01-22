importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

let urlApi = "http://api.football-data.org/";

if (urlApi.match("^http://")) {
  urlApi = urlApi.replace("http://", "https://");
}

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute(
  [
    {
      url: "/index.html",
      revision: "1",
    },
    {
      url: "/team.html",
      revision: "1",
    },
    {
      url: "/push.js",
      revision: "1",
    },
    {
      url: "/reqpush.js",
      revision: "1",
    },
    {
      url: "/manifest.json",
      revision: "1",
    },
    {
      url: "/assets/icons/icon-72x72.png",
      revision: "1",
    },
    {
      url: "/assets/icons/icon-96x96.png",
      revision: "1",
    },
    {
      url: "/assets/icons/icon-128x128.png",
      revision: "1",
    },
    {
      url: "/assets/icons/icon-144x144.png",
      revision: "1",
    },
    {
      url: "/assets/icons/icon-152x152.png",
      revision: "1",
    },
    {
      url: "/assets/icons/icon-192x192.png",
      revision: "1",
    },
    {
      url: "/assets/icons/icon-384x384.png",
      revision: "1",
    },
    {
      url: "/assets/icons/icon-512x512.png",
      revision: "1",
    },
    {
      url: "/assets/svg/empty.svg",
      revision: "1",
    },
    {
      url: "/components/nav.html",
      revision: "1",
    },
    {
      url: "/css/base/_base.css",
      revision: "1",
    },
    {
      url: "/css/base/_utilities.css",
      revision: "1",
    },
    {
      url: "/css/components/_timer.css",
      revision: "1",
    },
    {
      url: "/css/custom.css",
      revision: "1",
    },
    {
      url: "/css/materialize.min.css",
      revision: "1",
    },
    {
      url: "/js/api.js",
      revision: "1",
    },
    {
      url: "/js/db.js",
      revision: "1",
    },
    {
      url: "/js/idb.js",
      revision: "1",
    },
    {
      url: "/js/materialize.min.js",
      revision: "1",
    },
    {
      url: "/js/nav.js",
      revision: "1",
    },
    {
      url: "/js/team.js",
      revision: "1",
    },
    {
      url: "/pages/bundesleague.html",
      revision: "1",
    },
    {
      url: "/pages/eredivisie.html",
      revision: "1",
    },
    {
      url: "/pages/home.html",
      revision: "1",
    },
    {
      url: "/pages/laliga.html",
      revision: "1",
    },
    {
      url: "/pages/league-1.html",
      revision: "1",
    },
    {
      url: "/pages/premier-league.html",
      revision: "1",
    },
    {
      url: "/pages/saved.html",
      revision: "1",
    },
  ],
  {
    ignoreUrlParametersMatching: [/.*/],
  }
);

self.addEventListener("push", (e) => {
  let body;

  if (e.data) {
    body = e.data.text();
  } else {
    body = "Push message no payload";
  }

  const options = {
    body: body,
    icon: "",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  e.waitUntil(self.registration.showNotification("Push Notification", options));
});

workbox.routing.registerRoute(
  new RegExp(urlApi),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "football-api",
    cacheExpiration: {
      maxAgeSeconds: 60 * 30,
    },
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: "google-fonts-icons",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);
