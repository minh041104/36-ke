/* ---------- Trang lĩnh vực: đọc id từ <body data-lv="..."> ---------- */
const byId = Object.fromEntries(K.map(k => [k.id, k]));
const LENS_NAMES = {l1:"Nhận thức", l2:"Thời cơ và nguồn lực", l3:"Vị trí", l4:"Bên thứ ba", l5:"Tâm lý và động cơ", l6:"Trọng tâm và cấu trúc"};
const D = (window.LV || []).find(d => d.id === document.body.dataset.lv);

let st = {};
try { st = JSON.parse(localStorage.getItem("k36-nhanthuc-v1") || "{}") || {}; } catch(e) {}
const understood = st.understood || {}, quiz = st.quiz || {};

const hoc = "../hoc/";
document.getElementById("lv-name").textContent = D.name;
document.getElementById("lv-title").textContent = D.title;
document.getElementById("lv-intro").textContent = D.intro;
const lv = document.getElementById("lv-practice");
lv.href = hoc + "#luyen-" + D.id;
lv.textContent = "Luyện " + D.scenarios.length + " tình huống";

const u = D.ke.filter(x => understood[x.id]).length, q = D.scenarios.filter(s => quiz[s.id] === "correct").length;
document.getElementById("facts").textContent = D.ke.length + " kế, " + D.scenarios.length + " tình huống." +
  (u + q ? " Bạn đã hiểu " + u + "/" + D.ke.length + " kế và làm đúng " + q + "/" + D.scenarios.length + " tình huống." : "");

document.getElementById("lv-list").innerHTML = D.ke.map((x, i) => {
  const k = byId[x.id];
  return '<li class="lvke">' +
    '<div class="lvhead"><span class="lvnum">' + (i + 1) + '</span><div><h3>' + esc(k.name) + (understood[k.id] ? ' <span class="kdone" title="Đã hiểu">✓</span>' : '') + '</h3>' +
      '<p class="kmeta"><span class="ltag ' + k.lens + '">' + esc(LENS_NAMES[k.lens]) + '</span><span lang="zh" class="lvhan">' + esc(k.han) + '</span></p></div></div>' +
    '<p class="lvhow">' + esc(x.how) + '</p>' +
    '<details><summary>Dấu hiệu và cách ứng xử</summary><dl class="anal">' +
      '<div><dt>Dấu hiệu</dt><dd>' + esc(x.signs) + '</dd></div>' +
      '<div><dt>Cách ứng xử</dt><dd>' + esc(x.respond) + '</dd></div></dl>' +
      '<p class="lvlink"><a href="' + hoc + '#ke-' + k.id + '">Đọc điển tích và phân tích đầy đủ</a></p></details>' +
  '</li>';
}).join("");

const eth = document.getElementById("lv-ethics");
if (D.ethics) { eth.textContent = D.ethics; eth.hidden = false; }
if (canDonate) document.getElementById("ung-ho").hidden = false;
