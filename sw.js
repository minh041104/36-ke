/* Service worker: luôn lấy bản mới từ mạng, chỉ dùng bản đã lưu khi mất mạng. Đổi VERSION khi đổi danh sách PRECACHE. */
const VERSION = "v3";
const CACHE = "36ke-" + VERSION;
const PRECACHE = [
  "./", "hoc/", "ke/", "nen-tang/", "manifest.webmanifest",
  "css/style.css", "css/landing.css",
  "js/common.js", "js/donate.js", "js/app.js", "js/landing.js", "js/linh-vuc.js", "js/vendor/qrcode.js",
  "js/data/nen-tang.js", "js/data/cac-ke.js", "js/data/tinh-huong.js",
  "js/data/linh-vuc/lam-viec.js", "js/data/linh-vuc/hoc-tap.js", "js/data/linh-vuc/tinh-yeu.js", "js/data/linh-vuc/gia-dinh.js", "js/data/linh-vuc/mua-sam.js",
  "icons/icon-192.png", "qr-momo.jpg"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("36ke-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  const isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (!sameOrigin && !isFont) return;
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok && (sameOrigin || isFont)) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, {ignoreSearch:true}).then(r => r || (req.mode === "navigate" ? caches.match("hoc/") : undefined)))
  );
});
