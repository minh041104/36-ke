/* ---------- Landing ---------- */
const byId = Object.fromEntries(K.map(k => [k.id, k]));
const LVS = window.LV || [];
const KEY = "k36-nhanthuc-v1";
const TOTAL_S = S.length + LVS.reduce((n, d) => n + d.scenarios.length, 0);
function loadState(){ try { return JSON.parse(localStorage.getItem(KEY) || "null") || {}; } catch(e) { return {}; } }

/* Lưới 36 kế: chữ Hán đầu tiên của mỗi kế, màu theo lăng kính */
document.getElementById("grid36").innerHTML =
  K.slice().sort((a, b) => a.id - b.id).map(k => '<a class="t ' + k.lens + '" href="ke/' + slug(k.name) + '/" title="' + k.id + ". " + esc(k.name) + '" aria-label="' + esc(k.name) + '"><span lang="zh" aria-hidden="true">' + [...k.han][0] + '</span></a>').join("");

document.getElementById("facts").textContent = F.length + " bài nền tảng, " + K.length + " kế, " + TOTAL_S + " tình huống. Miễn phí, không cần đăng ký.";
document.getElementById("start").addEventListener("click", () => track("bat-dau-hoc"));

/* Người đã học dở: đổi nút thành Học tiếp và hiện tiến độ */
{
  const st = loadState();
  const f = Object.values(st.fdone || {}).filter(Boolean).length;
  const u = Object.values(st.understood || {}).filter(Boolean).length;
  const q = Object.values(st.quiz || {}).filter(v => v === "correct").length;
  if (f + u + q > 0) {
    document.getElementById("start").textContent = "Học tiếp";
    const r = document.getElementById("resume");
    r.textContent = "Bạn đang học dở: " + f + "/" + F.length + " bài nền tảng, " + u + "/" + K.length + " kế, " + q + "/" + TOTAL_S + " tình huống.";
    r.hidden = false;
  }
}

/* ---------- Câu hỏi hôm nay ----------
   Chọn theo ngày nên ai mở trong cùng một ngày cũng thấy cùng một câu.
   Bước nhảy nguyên tố cùng nhau với số câu, nên đi hết các câu rồi mới lặp lại. */
const SETS = {nhanthuc:["Nhận thức", ["l1"]], vitri:["Vị trí và Bên thứ ba", ["l3", "l4"]], thoico:["Thời cơ và nguồn lực", ["l2"]], tamly:["Tâm lý và động cơ", ["l5"]], trongtam:["Trọng tâm và cấu trúc", ["l6"]]};
const POOL = S.map(s => ({s, d:null})).concat(...LVS.map(d => d.scenarios.map(s => ({s, d}))));
const now = new Date(), dayNo = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 864e5);
const gcd = (a, b) => b ? gcd(b, a % b) : a;
let step = 37; while (gcd(step, POOL.length) !== 1) step++;
const today = POOL[(dayNo * step) % POOL.length], ts = today.s, td = today.d;
const setKey = ts.set || "nhanthuc";

/* Bốn lựa chọn: đáp án, kế gần đúng, kế dễ nhầm, rồi thêm kế cùng nhóm cho đủ. Thứ tự xáo theo ngày. */
let seed = dayNo;
const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const same = td ? td.ke.map(x => x.id) : K.filter(k => SETS[setKey][1].includes(k.lens)).map(k => k.id);
const confuse = byId[ts.answers[0]].confuse.id;
const opts = shuffle([...new Set([...ts.answers, ...ts.partial, ...(td && !same.includes(confuse) ? [] : [confuse]), ...shuffle(same.slice())])].slice(0, Math.max(4, ts.answers.length + ts.partial.length)));

const where = td ? "lĩnh vực " + td.name : "bộ " + SETS[setKey][0];
const more = td ? "hoc/#luyen-" + td.id : "hoc/#luyen-" + setKey;
document.getElementById("daily-note").textContent = "Câu của ngày " + now.getDate() + "/" + (now.getMonth() + 1) + ", thuộc " + where + ". Ngày mai có câu mới.";

function renderDaily(pick){
  const box = document.getElementById("try");
  let h = '<p class="scenario">' + esc(ts.text) + '</p><p class="qlabel">Đây chủ yếu là kế nào?</p><div class="opts">' +
    opts.map(id => {
      let cls = "";
      if (pick != null) cls = ts.answers.includes(id) ? "correct" : id === pick ? (ts.partial.includes(id) ? "partial" : "wrong") : "dim";
      return '<button class="opt ' + cls + '" data-id="' + id + '"' + (pick != null ? " disabled" : "") + '><span class="knum">' + id + '</span>' + esc(byId[id].name) + '</button>';
    }).join("") + '</div>';
  if (pick != null) {
    const v = ts.answers.includes(pick) ? "correct" : ts.partial.includes(pick) ? "partial" : "wrong";
    const names = ts.answers.map(id => byId[id].name).join(" và ");
    h += '<div class="result ' + v + '"><p class="verdict ' + v + '" tabindex="-1">' + (v === "correct" ? "Đúng: " + names + "." : v === "partial" ? "Gần đúng. Kế chính là " + names + "." : "Chưa đúng. Kế chính là " + names + ".") + '</p>' +
      '<p>' + esc(ts.explain) + '</p><p class="trap">' + esc(ts.trap) + '</p>' +
      '<div class="row"><a class="btn primary" href="' + more + '">Luyện thêm ở ' + esc(where) + '</a><button class="btn" id="dshare">Đố bạn bè câu này</button>' +
      '<a class="btn" href="ke/' + slug(byId[ts.answers[0]].name) + '/">Đọc về ' + esc(byId[ts.answers[0]].name) + '</a></div></div>';
  }
  box.innerHTML = h;
  box.querySelectorAll(".opt").forEach(b => b.onclick = () => {
    const id = +b.dataset.id, st = loadState();
    st.quiz = st.quiz || {}; st.reasons = st.reasons || {};
    st.quiz[ts.id] = ts.answers.includes(id) ? "correct" : ts.partial.includes(id) ? "partial" : "wrong";
    st.reasons[ts.id] = Object.assign(st.reasons[ts.id] || {}, {pick:id});
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch(e) {}
    track("cau-hom-nay");
    renderDaily(id); box.querySelector(".verdict").focus({preventScroll:true});
  });
  const sh = document.getElementById("dshare"); if (sh) sh.onclick = () => shareScenario(ts, sh);
}
{
  const st = loadState(), done = st.quiz && st.quiz[ts.id], pick = st.reasons && st.reasons[ts.id] && st.reasons[ts.id].pick;
  renderDaily(done && pick ? pick : null);
}

if (canDonate) document.getElementById("ung-ho").hidden = false;

/* Các lĩnh vực đã có */
if (LVS.length) {
  document.getElementById("lvcards").innerHTML = LVS.map(d => '<a class="lvcard" href="' + d.id + '/"><b>' + esc(d.name) + '</b><span>' + d.ke.length + ' kế, ' + d.scenarios.length + ' tình huống</span></a>').join("");
  document.getElementById("linh-vuc").hidden = false;
}
