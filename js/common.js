/* Hàm dùng chung cho landing và trang học */
function esc(s){ const d = document.createElement("div"); d.textContent = s == null ? "" : s; return d.innerHTML; }
async function copyText(text){
  try { await navigator.clipboard.writeText(text); return true; } catch(e) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;opacity:0";
    document.body.append(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch(e2) {}
    ta.remove();
    return ok;
  }
}
/* Đường dẫn trang tĩnh của một kế, khớp với tools/build.js */
function slug(s){ return s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

/* Đăng ký service worker để dùng được khi mất mạng (chỉ khi chạy qua http/https) */
const SITE_ROOT = new URL("../", document.currentScript.src);
if ("serviceWorker" in navigator && location.protocol.startsWith("http"))
  window.addEventListener("load", () => navigator.serviceWorker.register(new URL("sw.js", SITE_ROOT)).catch(() => {}));

/* ---------- Đo lường (GoatCounter: miễn phí, không cookie) ----------
   Tạo tài khoản ở goatcounter.com, rồi điền mã (phần trước .goatcounter.com) vào đây. Để trống thì không đo gì. */
const GOATCOUNTER = "minh041104";
if (GOATCOUNTER && location.protocol.startsWith("http")) {
  const s = document.createElement("script");
  s.async = true; s.src = "https://gc.zgo.at/count.js";
  s.dataset.goatcounter = "https://" + GOATCOUNTER + ".goatcounter.com/count";
  document.head.append(s);
}
/* Ghi một sự kiện, ví dụ track("bat-dau-hoc"). Không làm gì nếu chưa bật đo lường. */
function track(name){ try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({path:"su-kien/" + name, title:name, event:true}); } catch(e) {} }

/* Đố bạn bè: chia sẻ link mở thẳng vào một tình huống (hoc/#th-<id>). Dùng bảng chia sẻ của điện thoại nếu có, không thì chép link. */
async function shareScenario(s, btn){
  const url = new URL("hoc/#th-" + s.id, SITE_ROOT).href;
  const text = "Đố bạn: đây là kế nào trong 36 kế?\n\n" + (s.text.length > 180 ? s.text.slice(0, s.text.lastIndexOf(" ", 180)) + "…" : s.text);
  track("do-ban");
  if (navigator.share) {
    try { await navigator.share({title:"Đố bạn: đây là kế nào?", text, url}); return; }
    catch(e) { if (e && e.name === "AbortError") return; }
  }
  const ok = await copyText(text + "\n" + url);
  if (btn) { const t = btn.textContent; btn.textContent = ok ? "Đã chép link ✓" : "Không chép được"; setTimeout(() => { btn.textContent = t; }, 1800); }
}
