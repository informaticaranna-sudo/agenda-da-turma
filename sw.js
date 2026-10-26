/* Service worker da Agenda da Turma: deixa o app instalável e abrindo mesmo sem internet.
   Os DADOS não passam por aqui: o Firebase cuida deles (e guarda uma cópia offline). */
const V = "agenda-v1";
const BASE = ["./", "index.html", "firebase-config.js", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(BASE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET") return;
  const mesmo = u.origin === location.origin;
  const estatico = u.hostname === "www.gstatic.com" || u.hostname === "fonts.gstatic.com" || u.hostname === "fonts.googleapis.com";
  if (!mesmo && !estatico) return;              /* API do Firebase: sempre direto na rede */
  if (mesmo) {                                  /* arquivos do app: rede primeiro, cópia se estiver offline */
    e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); return res; })
      .catch(() => caches.match(r).then(m => m || caches.match("index.html"))));
  } else {                                      /* bibliotecas e fontes: cópia primeiro */
    e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); return res; })));
  }
});
