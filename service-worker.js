/* Agenda da Turma PWA — cache básico do app shell.
   Ao publicar alterações relevantes, incremente CACHE_VERSION. */
const CACHE_VERSION = "agenda-da-turma-v1";
const APP_BASE = "/agenda-da-turma/";
const APP_SHELL = [
  APP_BASE,
  APP_BASE + "index.html",
  APP_BASE + "manifest.webmanifest",
  APP_BASE + "icons/icon-192.png",
  APP_BASE + "icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Apenas GETs da mesma origem e dentro do caminho deste projeto.
  if (request.method !== "GET" || url.origin !== self.location.origin ||
      !url.pathname.startsWith(APP_BASE)) return;

  // Para navegação, prefira a rede para manter login e dados atualizados.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match(request).then((cached) =>
        cached || caches.match(APP_BASE + "index.html")
      ))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).then((response) => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
      }
      return response;
    }))
  );
});
