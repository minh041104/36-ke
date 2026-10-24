/* ---------- Trang lĩnh vực: nội dung đã có sẵn trong HTML (tools/build.js), ở đây chỉ thêm tiến độ ---------- */
const D = (window.LV || []).find(d => d.id === document.body.dataset.lv);
let st = {};
try { st = JSON.parse(localStorage.getItem("k36-nhanthuc-v1") || "{}") || {}; } catch(e) {}
const understood = st.understood || {}, quiz = st.quiz || {};

if (D) {
  const u = D.ke.filter(x => understood[x.id]).length, q = D.scenarios.filter(s => quiz[s.id] === "correct").length;
  if (u + q) document.getElementById("facts").textContent += " Bạn đã hiểu " + u + "/" + D.ke.length + " kế và làm đúng " + q + "/" + D.scenarios.length + " tình huống.";
  document.querySelectorAll(".lvke[data-k]").forEach(li => {
    if (understood[li.dataset.k]) li.querySelector("h2").insertAdjacentHTML("beforeend", ' <span class="kdone" title="Đã hiểu">✓</span>');
  });
}
if (canDonate) document.getElementById("ung-ho").hidden = false;
