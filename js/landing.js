/* ---------- Landing ---------- */
const byId = Object.fromEntries(K.map(k => [k.id, k]));
const LENS_NAMES = {l1:"Nhận thức", l3:"Vị trí", l4:"Bên thứ ba", l2:"Thời cơ và nguồn lực", l5:"Tâm lý và động cơ", l6:"Trọng tâm và cấu trúc"};
const PREVIEW_KE = 2;
const TRY = {scenario:"dam-phan", options:[1, 6, 8, 10]};

/* Lưới 36 kế: chữ Hán đầu tiên của mỗi kế, màu theo lăng kính */
document.getElementById("grid36").innerHTML =
  K.slice().sort((a, b) => a.id - b.id).map(k => '<span class="t ' + k.lens + '" lang="zh" title="' + k.id + '. ' + esc(k.name) + '">' + [...k.han][0] + '</span>').join("");
document.querySelector(".grid-cap").insertAdjacentHTML("afterend",
  '<p class="glegend">' + Object.entries(LENS_NAMES).map(([c, n]) => '<span class="' + c + '"><i class="sw"></i>' + esc(n) + '</span>').join("") + '</p>');

document.getElementById("stats").innerHTML = [
  [F.length, "bài nền tảng"], [K.length, "kế, chia 6 lăng kính"], [S.length, "tình huống thời nay"], ["0đ", "không quảng cáo, không cần tài khoản"]
].map(([n, t]) => '<li><b>' + n + '</b><span>' + t + '</span></li>').join("");

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
      r.textContent = "Bạn đang học dở: " + f + "/" + F.length + " bài nền tảng, " + u + "/" + K.length + " kế đã hiểu, " + q + "/" + S.length + " tình huống làm đúng.";
      r.hidden = false;
    }
  }
} catch(e) {}

/* Xem trước một kế */
function sealHTML(k){
  const c = [...k.han];
  if (c.length === 4) {
    const pos = [[2,1],[2,2],[1,1],[1,2]];
    return '<div class="seal four" lang="zh" aria-label="' + k.han + '">' + c.map((ch,i) => '<span style="grid-column:' + pos[i][0] + ';grid-row:' + pos[i][1] + '">' + ch + '</span>').join("") + '</div>';
  }
  return '<div class="seal three" lang="zh" aria-label="' + k.han + '">' + c.map(ch => '<span>' + ch + '</span>').join("") + '</div>';
}
const pk = byId[PREVIEW_KE];
document.getElementById("preview").innerHTML =
  '<div class="khead">' + sealHTML(pk) + '<div><p class="kmeta"><span class="ltag ' + pk.lens + '">' + esc(LENS_NAMES[pk.lens]) + '</span><span>Kế thứ ' + pk.id + '</span></p><h3 class="pname">' + esc(pk.name) + '</h3><p class="literal">' + esc(pk.literal) + '</p></div></div>' +
  '<h4 class="ph">Điển tích</h4><p class="story">' + esc(pk.story) + '</p>' +
  '<h4 class="ph">Phân tích</h4><dl class="anal">' +
    '<div><dt>Cơ chế</dt><dd>' + esc(pk.mech) + '</dd></div>' +
    '<div><dt>Điều kiện</dt><dd>' + esc(pk.cond) + '</dd></div>' +
    '<div><dt>Điểm gãy</dt><dd>' + esc(pk.fail) + '</dd></div>' +
    '<div><dt>Nhận diện</dt><dd>' + esc(pk.detect) + '</dd></div>' +
  '</dl>' +
  '<p class="pmore">Trong phần học, mỗi kế còn có phần so sánh với kế dễ nhầm và một bài tự viết. <a href="hoc/">Đọc đủ 36 kế</a></p>';

/* Làm thử một tình huống */
const ts = S.find(s => s.id === TRY.scenario);
function renderTry(pick){
  const box = document.getElementById("try");
  let h = '<p class="scenario">' + esc(ts.text) + '</p><p class="qlabel">Đây chủ yếu là kế nào?</p><div class="opts">' +
    TRY.options.map(id => {
      const k = byId[id];
      let cls = "";
      if (pick != null) cls = ts.answers.includes(id) ? "correct" : id === pick ? (ts.partial.includes(id) ? "partial" : "wrong") : "dim";
      return '<button class="opt ' + cls + '" data-id="' + id + '"' + (pick != null ? " disabled" : "") + '><span class="knum">' + id + '</span>' + esc(k.name) + '</button>';
    }).join("") + '</div>';
  if (pick != null) {
    const v = ts.answers.includes(pick) ? "correct" : ts.partial.includes(pick) ? "partial" : "wrong";
    const names = ts.answers.map(id => byId[id].name).join(" và ");
    h += '<div class="result ' + v + '"><p class="verdict ' + v + '" tabindex="-1">' + (v === "correct" ? "Đúng: " + names + "." : v === "partial" ? "Gần đúng. Kế chính là " + names + "." : "Chưa đúng. Kế chính là " + names + ".") + '</p>' +
      '<p>' + esc(ts.explain) + '</p><p class="trap">' + esc(ts.trap) + '</p>' +
      '<div class="row"><a class="btn primary" href="hoc/">Còn ' + (S.length - 1) + ' tình huống nữa trong phần học</a><button class="btn" id="tryagain">Làm lại</button></div></div>';
  }
  box.innerHTML = h;
  box.querySelectorAll(".opt").forEach(b => b.onclick = () => { renderTry(+b.dataset.id); box.querySelector(".verdict").focus({preventScroll:true}); });
  const again = document.getElementById("tryagain"); if (again) again.onclick = () => renderTry(null);
}
renderTry(null);

if (canDonate) document.getElementById("ung-ho").hidden = false;
