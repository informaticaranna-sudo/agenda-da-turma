const BASE = "/agenda-da-turma/";
const CACHE = "agenda-da-turma-v1";
const CORE = [BASE, BASE + "index.html", BASE + "manifest.webmanifest",
  BASE + "icons/icon-192.png", BASE + "icons/icon-512.png", BASE + "icons/maskable-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Página: rede primeiro (pega atualizações), cache como reserva offline
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(BASE + "index.html", copy));
        return res;
      }).catch(() => caches.match(BASE + "index.html"))
    );
    return;
  }

  // Ícones e fontes do Google: cache primeiro, atualiza em segundo plano
  const ok = url.origin === location.origin ||
    url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (!ok) return;
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if (res && (res.ok || res.type === "opaque")) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
