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
