/* ---------- Landing ---------- */
const byId = Object.fromEntries(K.map(k => [k.id, k]));
const TRY = {scenario:"dam-phan", options:[1, 6, 8, 10]};

/* Lưới 36 kế: chữ Hán đầu tiên của mỗi kế, màu theo lăng kính */
document.getElementById("grid36").innerHTML =
  K.slice().sort((a, b) => a.id - b.id).map(k => '<span class="t ' + k.lens + '" lang="zh">' + [...k.han][0] + '</span>').join("");

document.getElementById("facts").textContent = F.length + " bài nền tảng, " + K.length + " kế, " + S.length + " tình huống. Miễn phí, không cần đăng ký.";

/* Người đã học dở: đổi nút thành Học tiếp và hiện tiến độ */
try {
  const st = JSON.parse(localStorage.getItem("k36-nhanthuc-v1") || "null");
  if (st) {
    const f = Object.values(st.fdone || {}).filter(Boolean).length;
    const u = Object.values(st.understood || {}).filter(Boolean).length;
    const q = Object.values(st.quiz || {}).filter(v => v === "correct").length;
    if (f + u + q > 0) {
      document.getElementById("start").textContent = "Học tiếp";
      const r = document.getElementById("resume");
      r.textContent = "Bạn đang học dở: " + f + "/" + F.length + " bài nền tảng, " + u + "/" + K.length + " kế, " + q + "/" + S.length + " tình huống.";
      r.hidden = false;
    }
  }
} catch(e) {}

/* Làm thử một tình huống */
const ts = S.find(s => s.id === TRY.scenario);
function renderTry(pick){
  const box = document.getElementById("try");
  let h = '<p class="scenario">' + esc(ts.text) + '</p><p class="qlabel">Đây chủ yếu là kế nào?</p><div class="opts">' +
    TRY.options.map(id => {
      let cls = "";
      if (pick != null) cls = ts.answers.includes(id) ? "correct" : id === pick ? (ts.partial.includes(id) ? "partial" : "wrong") : "dim";
      return '<button class="opt ' + cls + '" data-id="' + id + '"' + (pick != null ? " disabled" : "") + '><span class="knum">' + id + '</span>' + esc(byId[id].name) + '</button>';
    }).join("") + '</div>';
  if (pick != null) {
    const v = ts.answers.includes(pick) ? "correct" : ts.partial.includes(pick) ? "partial" : "wrong";
    const names = ts.answers.map(id => byId[id].name).join(" và ");
    h += '<div class="result ' + v + '"><p class="verdict ' + v + '" tabindex="-1">' + (v === "correct" ? "Đúng: " + names + "." : v === "partial" ? "Gần đúng. Kế chính là " + names + "." : "Chưa đúng. Kế chính là " + names + ".") + '</p>' +
      '<p>' + esc(ts.explain) + '</p>' +
      '<div class="row"><a class="btn primary" href="hoc/">Còn ' + (S.length - 1) + ' tình huống nữa</a><button class="btn" id="tryagain">Làm lại</button></div></div>';
  }
  box.innerHTML = h;
  box.querySelectorAll(".opt").forEach(b => b.onclick = () => { renderTry(+b.dataset.id); box.querySelector(".verdict").focus({preventScroll:true}); });
  const again = document.getElementById("tryagain"); if (again) again.onclick = () => renderTry(null);
}
renderTry(null);

if (canDonate) document.getElementById("ung-ho").hidden = false;

/* Các lĩnh vực đã có */
const LVS = window.LV || [];
if (LVS.length) {
  document.getElementById("lvcards").innerHTML = LVS.map(d => '<a class="lvcard" href="' + d.id + '/"><b>' + esc(d.name) + '</b><span>' + d.ke.length + ' kế, ' + d.scenarios.length + ' tình huống</span></a>').join("");
  document.getElementById("linh-vuc").hidden = false;
}
