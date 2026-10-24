/* ---------- Dữ liệu ---------- */
const byId = Object.fromEntries(K.map(k => [k.id, k]));

/* ---------- Lưu trữ ---------- */
const KEY = "k36-nhanthuc-v1";
const blank = () => ({notes:{}, understood:{}, quiz:{}, reasons:{}, fnotes:{}, ftried:{}, fdone:{}, workshop:{}});
let state = blank();
try { const raw = localStorage.getItem(KEY); if (raw) state = Object.assign(blank(), JSON.parse(raw)); } catch(e) {}
function save(){ try { localStorage.setItem(KEY, JSON.stringify(state)); } catch(e) {} }

/* ---------- Claude ---------- */
let sample = null, sampleReady = false;
setTimeout(async () => {
  try { sample = window.claude && window.claude.use ? await window.claude.use("sample") : null; } catch(e) { sample = null; }
  sampleReady = true;
  renderIntro(); rerenderCurrent();
}, 0);
function errText(e){
  const c = e && e.code;
  if (c === "not_granted") return "Bạn chưa cho phép trang dùng Claude, nên phần phản biện tạm thời không khả dụng.";
  if (c === "rate_limited") return "Đang có quá nhiều yêu cầu. Đợi một lát rồi thử lại.";
  return "Không lấy được phản hồi lúc này. Thử lại sau.";
}
const RULES = "Phản hồi bằng tiếng Việt, văn xuôi tự nhiên, không dùng markdown, không gạch đầu dòng, không in đậm.";

/* Trong artifact thì hỏi Claude ngay trên trang; ngoài artifact thì sao chép prompt để dán vào claude.ai */
function claudeLabel(t){ return sample ? (t || "Nhờ Claude phản biện") : "Sao chép prompt cho Claude"; }
function coach(container, prompt, followRule){ (sample ? makeCoach : copyPrompt)(container, prompt, followRule); }
async function copyPrompt(container, prompt, followRule){
  const full = prompt + "\n\nSau đó, mỗi lần người học trả lời, hãy nhận xét ngắn gọn rồi đặt đúng một câu hỏi phản biện mới, tối đa 120 chữ. " + RULES + " " + (followRule || "Nếu họ đã cho thấy hiểu sâu bản chất, hãy xác nhận điều đó và không hỏi thêm.");
  const ok = await copyText(full);
  container.classList.add("show");
  container.innerHTML = '<p class="copied">' + (ok
      ? "Đã sao chép prompt. Mở Claude, dán vào khung chat rồi gửi. Claude sẽ nhận xét và hỏi lại, bạn cứ trả lời tiếp trong cuộc trò chuyện đó."
      : "Trình duyệt không cho tự sao chép. Mở phần “Xem prompt” bên dưới, chọn toàn bộ, sao chép rồi dán vào Claude.") + '</p>' +
    '<div class="row"><a class="btn primary" href="https://claude.ai/new" target="_blank" rel="noopener">Mở Claude</a></div>' +
    '<details class="prompt"' + (ok ? '' : ' open') + '><summary>Xem prompt</summary><textarea readonly aria-label="Prompt cho Claude"></textarea></details>';
  container.querySelector("textarea").value = full;
}

function makeCoach(container, firstPrompt, followRule){
  container.innerHTML = "";
  container.classList.add("show");
  const turns = [{role:"user", content:firstPrompt}];
  const log = document.createElement("div");
  const reply = document.createElement("div");
  reply.className = "reply"; reply.hidden = true;
  reply.innerHTML = '<textarea aria-label="Trả lời câu hỏi phản biện" placeholder="Trả lời câu hỏi của Claude…"></textarea><div class="row"><span class="saved"></span><button class="btn primary">Gửi câu trả lời</button></div>';
  container.append(log, reply);
  const ta = reply.querySelector("textarea"), send = reply.querySelector("button");
  async function ask(){
    const m = document.createElement("div");
    m.className = "msg ai"; m.innerHTML = '<span class="who">Claude</span><span class="t">Đang suy nghĩ…</span>';
    log.append(m);
    const t = m.querySelector(".t");
    send.disabled = true; reply.hidden = true;
    try {
      const res = await sample(turns.slice(), {cache:false, onText:({text}) => { t.textContent = text; }});
      t.textContent = res.text;
      turns.push({role:"assistant", content:res.text});
      reply.hidden = false; ta.value = "";
    } catch(e) {
      if (e && e.text) { t.textContent = e.text; }
      else { m.className = "msg err"; m.textContent = errText(e); }
      if (e && e.code === "not_granted") { sample = null; renderIntro(); }
    } finally { send.disabled = false; }
  }
  send.onclick = () => {
    const v = ta.value.trim(); if (!v) { ta.focus(); return; }
    const me = document.createElement("div");
    me.className = "msg me"; me.innerHTML = '<span class="who">Bạn</span>';
    me.append(document.createTextNode(v));
    log.append(me);
    turns.push({role:"user", content:"Người học trả lời:\n\"\"\"" + v + "\"\"\"\n\nTiếp tục theo cùng cách, tối đa 120 chữ. " + RULES + " Nhận xét ngắn gọn câu trả lời, rồi đặt đúng một câu hỏi phản biện mới. " + (followRule || "Nếu họ đã cho thấy hiểu sâu bản chất, hãy xác nhận điều đó và không hỏi thêm.")});
    ask();
  };
  ask();
}

/* ---------- Điều hướng ---------- */
const NAMES = ["found","learn","practice"];
const tabs = {found:document.getElementById("tab-found"), learn:document.getElementById("tab-learn"), practice:document.getElementById("tab-practice")};
const views = {found:document.getElementById("view-found"), learn:document.getElementById("view-learn"), practice:document.getElementById("view-practice")};
let active = "found";
function show(name, scroll){
  active = name;
  for (const n of NAMES) { tabs[n].setAttribute("aria-selected", n === name); views[n].hidden = n !== name; }
  renderIntro(); rerenderCurrent();
  if (scroll) window.scrollTo({top:0});
}
NAMES.forEach(n => tabs[n].onclick = () => show(n, true));
function rerenderCurrent(){
  if (active === "found") { renderFList(); renderLesson(); }
  else if (active === "learn") { renderList(); renderKe(); }
  else renderPractice();
}
function toTopOf(el){ window.scrollTo({top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - 80)}); }

const INTROS = {
  found:{h:"Mười bài nền tảng", p:"Nên đọc mười bài này trước khi vào các kế. Chúng giải thích những khái niệm mà phần sau dùng liên tục như hư thực, chính kỳ và thế. Mỗi bài có nguyên văn chữ Hán, phần giải thích, một câu hỏi và một bài tự viết ngắn."},
  learn:{h:"36 kế", p:"Mình chia 36 kế thành sáu nhóm, gọi là lăng kính, và xếp theo thứ tự nên học. Mỗi kế có điển tích, phần phân tích, và một kế hay bị nhầm với nó để bạn so sánh."},
  practice:{h:"Đoán kế qua tình huống", p:"Tình huống không ghi tên kế. Trước khi chọn, hỏi xem người ta đang tác động vào đâu: cách bạn nhìn sự việc, vị trí, một bên thứ ba, thời điểm, tâm lý, hay chỗ dựa chính của đối phương."}
};
function renderIntro(){
  const i = INTROS[active];
  document.getElementById("intro").innerHTML = '<h1>' + esc(i.h) + '</h1><p>' + esc(i.p) + '</p>' +
    (sampleReady && !sample && active === "found" ? '<p class="ai-note">Ở bài tự viết, nút “Sao chép prompt cho Claude” chép sẵn đề và bài làm của bạn. Dán vào Claude, kể cả bản miễn phí, để được hỏi vặn lại.</p>' : '');
}
function renderProgress(){
  const f = F.filter(x => state.fdone[x.id]).length;
  const u = K.filter(k => state.understood[k.id]).length;
  const q = S.filter(s => state.quiz[s.id] === "correct").length;
  document.getElementById("tc-found").textContent = f + "/" + F.length;
  document.getElementById("tc-learn").textContent = u + "/" + K.length;
  document.getElementById("tc-practice").textContent = q + "/" + S.length;
}

/* ---------- Nền tảng ---------- */
let fcur = 1;
const fById = Object.fromEntries(F.map(f => [f.id, f]));
function renderFList(){
  const ul = document.getElementById("flist");
  ul.innerHTML = F.map(f => '<li><button class="kbtn" data-id="' + f.id + '"' + (f.id === fcur ? ' aria-current="true"' : '') + '><span class="knum">' + f.id + '</span><span class="kname">' + esc(f.title) + '</span><span class="kdone">' + (state.fdone[f.id] ? "✓" : "") + '</span></button></li>').join("");
  ul.querySelectorAll(".kbtn").forEach(b => b.onclick = () => { fcur = +b.dataset.id; renderFList(); renderLesson(); toTopOf(views.found); });
}
function quoteHTML(q){
  return '<figure class="quote"><p class="zh" lang="zh">' + esc(q.zh) + '</p><p class="hv">' + esc(q.hv) + '</p><p class="vi">' + esc(q.vi) + '</p><cite>' + esc(q.src) + '</cite></figure>';
}
function markFDone(id, on){
  state.fdone[id] = on; save(); renderFList(); renderProgress();
}
function renderLesson(){
  const f = fById[fcur];
  const v = document.getElementById("fview");
  const allDone = F.every(x => state.fdone[x.id]);
  let h = '';
  h += '<p class="lesson-pos">Bài ' + f.id + '/' + F.length + '</p><h2>' + esc(f.title) + '</h2><p class="lead">' + esc(f.lead) + '</p>';
  h += '<div class="quotes">' + f.quotes.map(quoteHTML).join("") + '</div>';
  h += '<section class="sect prose"><h3>' + (f.id === 7 ? "Ba câu hỏi" : "Giải thích") + '</h3>' + f.body.map(p => '<p>' + esc(p) + '</p>').join("") + '</section>';
  if (f.extra === "map") h += mapHTML();
  if (f.example) h += '<section class="sect"><h3>Ví dụ</h3><p class="example">' + esc(f.example) + '</p></section>';
  h += '<section class="sect"><div class="contrast"><div class="mm"><h4>Cách nghĩ thường gặp</h4><p>' + esc(f.wrong) + '</p></div><div class="bc"><h4>Cách nghĩ nên có</h4><p>' + esc(f.right) + '</p></div></div></section>';

  if (f.check) {
    h += '<section class="sect"><h3>Câu hỏi tình huống</h3><p class="checkq">' + esc(f.check.q) + '</p><div class="copts" id="copts"></div><p class="checkhint" id="checkhint"></p></section>';
    h += '<section class="sect"><h3>Bài tập tự viết</h3><p class="note-prompt">' + esc(f.explain) + '</p><textarea id="fnote" aria-label="Bài tự diễn giải"></textarea><div class="row"><span class="saved" id="fsaved"></span>' +
         '<button class="btn primary" id="fcrit">' + claudeLabel() + '</button></div><div class="coach" id="fcoach" aria-live="polite"></div></section>';
  } else {
    const w = state.workshop || {};
    h += '<section class="sect workshop"><h3>Thực hành</h3><p class="note-prompt">Chọn một cuộc xung đột bạn đang gặp hoặc biết rõ: ở chỗ làm, trong kinh doanh, trong gia đình hay trong lịch sử. Trả lời ba câu hỏi trước khi nghĩ đến bất kỳ kế nào.</p>' +
      '<label for="w0">Tình huống</label><textarea id="w0" data-k="sit" placeholder="Ai đối đầu với ai, về chuyện gì?"></textarea>' +
      '<label for="w1">1. Mục tiêu thật của bạn là gì?</label><textarea id="w1" data-k="goal" placeholder="Tách mục tiêu bề mặt khỏi mục tiêu thật."></textarea>' +
      '<label for="w2">2. Thế hiện tại ra sao?</label><textarea id="w2" data-k="the" placeholder="Bạn mạnh ở đâu, yếu ở đâu? Thời gian đang đứng về phía ai?"></textarea>' +
      '<label for="w3">3. Đối phương đang tin gì và muốn gì?</label><textarea id="w3" data-k="other" placeholder="Họ nhìn tình huống thế nào? Đây là quan hệ một lần hay lặp lại?"></textarea>' +
      '<div class="row"><span class="saved" id="wsaved"></span><button class="btn primary" id="wcrit">' + claudeLabel("Nhờ Claude phản biện bài phân tích") + '</button>' +
      '<button class="btn" id="wdone"></button></div><div class="coach" id="wcoach" aria-live="polite"></div></section>';
  }
  if (allDone) h += '<div class="done-banner"><p>Bạn đã học xong phần nền tảng. Khi sang phần các kế, để ý xem mỗi kế tạo ra chỗ hư nào, dựa vào cái chính nào và cần thế ra sao.</p><button class="btn primary" id="gokeys">Sang phần các kế</button>' + donateHTML("Nếu thấy có ích, mời mình một ly cà phê") + '</div>';
  h += '<nav class="lnav">' + (f.id > 1 ? '<button class="btn navbtn" id="fprev"><small>Bài trước</small>' + esc(fById[f.id-1].title) + '</button>' : '<span></span>') +
       (f.id < F.length ? '<button class="btn primary navbtn next" id="fnext"><small>Bài tiếp</small>' + esc(fById[f.id+1].title) + '</button>' : '<button class="btn primary navbtn next" id="fnext"><small>Xong phần nền tảng</small>Sang phần các kế</button>') + '</nav>';
  v.innerHTML = h;

  v.querySelectorAll("button.mkbtn").forEach(b => b.onclick = () => { current = +b.dataset.k; show("learn", true); });
  if (f.check) {
    renderCheck(f);
    const note = document.getElementById("fnote"), saved = document.getElementById("fsaved");
    note.value = state.fnotes[f.id] || "";
    let t; note.oninput = () => { clearTimeout(t); saved.textContent = ""; t = setTimeout(() => { state.fnotes[f.id] = note.value; save(); saved.textContent = "Đã lưu"; }, 500); };
    const cb = document.getElementById("fcrit");
    if (cb) cb.onclick = () => {
      const text = note.value.trim();
      if (text.length < 30) { saved.textContent = "Viết ít nhất vài câu trước khi nhờ phản biện."; note.focus(); return; }
      state.fnotes[f.id] = note.value; save();
      const prompt = "Bạn là người hướng dẫn theo phương pháp Socrates, giúp người học nắm nền tảng tư duy chiến lược trước khi học 36 kế, hiểu bản chất thay vì học thuộc.\n\n" +
        "Bài: " + f.title + ".\nÝ chính: " + f.lead + "\nNội dung người học đã đọc: " + f.body.join(" ") + "\nHiểu lầm máy móc cần tránh: " + f.wrong + "\n\n" +
        "Đề bài: " + f.explain + "\n\nBài làm của người học:\n\"\"\"" + text + "\"\"\"\n\n" +
        "Hãy phản hồi tối đa 150 chữ. " + RULES + " Nêu cụ thể một điểm họ đã nắm đúng bản chất. Chỉ ra chỗ còn hời hợt, nhầm khái niệm (ví dụ nhầm hư với yếu kém, kỳ với mánh khóe, thế với thực lực), hoặc ví dụ không thực sự khớp, nếu có. Kết thúc bằng đúng một câu hỏi phản biện buộc họ nghĩ sâu hơn. Không viết sẵn đáp án hoàn chỉnh.";
      coach(document.getElementById("fcoach"), prompt);
    };
  } else {
    const saved = document.getElementById("wsaved");
    let t;
    document.querySelectorAll(".workshop textarea").forEach(ta => {
      ta.value = (state.workshop || {})[ta.dataset.k] || "";
      ta.oninput = () => { clearTimeout(t); saved.textContent = ""; t = setTimeout(() => { document.querySelectorAll(".workshop textarea").forEach(x => state.workshop[x.dataset.k] = x.value); save(); saved.textContent = "Đã lưu"; }, 500); };
    });
    const wd = document.getElementById("wdone");
    const paint = () => { const on = !!state.fdone[7]; wd.textContent = on ? "Đã hoàn thành ✓" : "Đánh dấu hoàn thành"; wd.classList.toggle("on", on); wd.setAttribute("aria-pressed", on); };
    paint();
    wd.onclick = () => {
      const w = state.workshop || {};
      if (!state.fdone[7] && ["sit","goal","the","other"].some(k => !(w[k] || "").trim())) { saved.textContent = "Hãy trả lời đủ cả bốn ô trước."; return; }
      markFDone(7, !state.fdone[7]); renderLesson();
    };
    const wc = document.getElementById("wcrit");
    if (wc) wc.onclick = () => {
      const w = state.workshop || {};
      if (["sit","goal","the","other"].some(k => (w[k] || "").trim().length < 10)) { saved.textContent = "Hãy viết đủ cả bốn ô trước khi nhờ phản biện."; return; }
      const prompt = "Bạn là người hướng dẫn tư duy chiến lược theo phương pháp Socrates. Người học đang luyện ba câu hỏi nền trước khi học 36 kế: mục tiêu thật, thế hiện tại, và đối phương tin gì muốn gì.\n\n" +
        "Tình huống:\n\"\"\"" + w.sit + "\"\"\"\nMục tiêu thật:\n\"\"\"" + w.goal + "\"\"\"\nThế hiện tại:\n\"\"\"" + w.the + "\"\"\"\nĐối phương tin gì và muốn gì:\n\"\"\"" + w.other + "\"\"\"\n\n" +
        "Hãy phản hồi tối đa 180 chữ. " + RULES + " Xét xem: họ có tách được mục tiêu thật khỏi mục tiêu bề mặt không; phân tích thế có tính đến vị trí, thời điểm, quan hệ và chuyện thời gian đứng về phía ai không; có thật sự nhìn từ góc của đối phương hay chỉ chiếu suy nghĩ của mình lên họ; đã xét quan hệ một lần hay lặp lại chưa. Nêu một điểm mạnh, một hoặc hai điểm mù lớn nhất, rồi kết thúc bằng đúng một câu hỏi phản biện. Không gợi ý cách lừa dối hay thao túng người khác; nếu tình huống là quan hệ lâu dài, nhắc nhẹ về cái giá của mất lòng tin.";
      coach(document.getElementById("wcoach"), prompt,"Nếu phân tích của họ đã vững, hãy xác nhận và gợi ý họ đánh dấu hoàn thành bài này.");
    };
  }
  const gk = document.getElementById("gokeys"); if (gk) gk.onclick = () => show("learn", true);
  const pv = document.getElementById("fprev"); if (pv) pv.onclick = () => { fcur--; renderFList(); renderLesson(); toTopOf(views.found); };
  document.getElementById("fnext").onclick = () => { if (f.id < F.length) { fcur++; renderFList(); renderLesson(); toTopOf(views.found); } else show("learn", true); };
}
const LENS = [
  {c:"l1", name:"Nhận thức", ids:[1,6,7,8,10,27,29,32]},
  {c:"l2", name:"Thời cơ và nguồn lực", ids:[4,5,9,11,12,20,36]},
  {c:"l3", name:"Vị trí", ids:[15,21,22,28]},
  {c:"l4", name:"Bên thứ ba", ids:[3,23,24,33]},
  {c:"l5", name:"Tâm lý và động cơ", ids:[13,14,16,17,26,31,34]},
  {c:"l6", name:"Trọng tâm và cấu trúc", ids:[2,18,19,25,30,35]}
];
const MAP = [
  {g:"Thắng chiến kế", sub:"Khi mình có ưu thế", items:["Man thiên quá hải","Vây Ngụy cứu Triệu","Tá đao sát nhân","Dĩ dật đãi lao","Sấn hỏa đả kiếp","Dương đông kích tây"]},
  {g:"Địch chiến kế", sub:"Khi hai bên ngang sức", items:["Vô trung sinh hữu","Ám độ Trần Thương","Cách ngạn quan hỏa","Tiếu lý tàng đao","Lý đại đào cương","Thuận thủ khiên dương"]},
  {g:"Công chiến kế", sub:"Khi chủ động tấn công", items:["Đả thảo kinh xà","Tá thi hoàn hồn","Điệu hổ ly sơn","Dục cầm cố túng","Phao chuyên dẫn ngọc","Cầm tặc cầm vương"]},
  {g:"Hỗn chiến kế", sub:"Khi tình thế rối ren", items:["Phủ để trừu tân","Hỗn thủy mô ngư","Kim thiền thoát xác","Quan môn tróc tặc","Viễn giao cận công","Giả đạo phạt Quắc"]},
  {g:"Tịnh chiến kế", sub:"Trong liên minh và tranh quyền", items:["Thâu lương hoán trụ","Chỉ tang mạ hòe","Giả si bất điên","Thượng ốc trừu thê","Thụ thượng khai hoa","Phản khách vi chủ"]},
  {g:"Bại chiến kế", sub:"Khi mình thất thế", items:["Mỹ nhân kế","Không thành kế","Phản gián kế","Khổ nhục kế","Liên hoàn kế","Tẩu vi thượng sách"]}
];
function lensOf(n){ return LENS.find(l => l.ids.includes(n)); }
function mapHTML(){
  let h = '<section class="sect"><h3>Bản đồ</h3><p class="note-prompt">Mỗi khung là một nhóm truyền thống, sắp theo thứ tự từ khi có ưu thế đến khi thất thế. Màu viền cho biết lăng kính. Bấm vào một kế để mở trang của kế đó.</p>';
  h += '<div class="legend">' + LENS.map(l => '<span><i class="sw ' + l.c + '"></i>' + esc(l.name) + '</span>').join("") + '</div><div class="map">';
  MAP.forEach((grp, gi) => {
    h += '<div class="mgroup"><h4>' + esc(grp.g) + '</h4><p class="msub">' + esc(grp.sub) + '</p><ol>';
    grp.items.forEach((name, i) => {
      const n = gi * 6 + i + 1, l = lensOf(n), has = !!byId[n];
      const inner = '<span class="knum">' + n + '</span><span>' + esc(name) + '</span><span class="vh">, lăng kính ' + esc(l.name) + '</span>' + (has && state.understood[n] ? '<span class="kdone">✓</span>' : '');
      h += '<li class="mk ' + l.c + '">' + (has ? '<button class="mkbtn" data-k="' + n + '" title="Mở kế này">' + inner + '</button>' : '<span class="mkbtn off">' + inner + '</span>') + '</li>';
    });
    h += '</ol></div>';
  });
  return h + '</div></section>';
}
function renderCheck(f){
  const box = document.getElementById("copts"), hint = document.getElementById("checkhint");
  const tried = state.ftried[f.id] || [];
  const solved = tried.some(i => f.check.opts[i].ok);
  box.innerHTML = f.check.opts.map((o,i) => {
    const t = tried.includes(i);
    const cls = t ? (o.ok ? "correct" : "wrong") : "";
    return '<button class="copt ' + cls + '" data-i="' + i + '"' + ((solved || t) ? " disabled" : "") + '>' + esc(o.t) + (t ? '<span class="fb">' + esc(o.fb) + '</span>' : '') + '</button>';
  }).join("");
  hint.textContent = solved ? "" : (tried.length ? "Đọc phần giải thích rồi chọn lại." : "Chọn phương án bạn thấy hợp lý nhất.");
  box.querySelectorAll(".copt").forEach(b => b.onclick = () => {
    const i = +b.dataset.i;
    state.ftried[f.id] = (state.ftried[f.id] || []).concat(i); save();
    if (f.check.opts[i].ok) markFDone(f.id, true);
    renderCheck(f);
  });
}

/* ---------- Các kế ---------- */
const LENS_ORDER = ["l1","l3","l4","l2","l5","l6"];
function lensName(c){ const l = LENS.find(x => x.c === c); return l ? l.name : ""; }
function byLens(a, b){ return LENS_ORDER.indexOf(a.lens) - LENS_ORDER.indexOf(b.lens) || a.id - b.id; }
const ORDER = K.slice().sort(byLens);
let current = 1, openLens = null, lastCur = null;
function kbtnHTML(k){
  return '<li><button class="kbtn" data-id="' + k.id + '"' + (k.id === current ? ' aria-current="true"' : '') + '><span class="knum">' + k.id + '</span><span class="kname">' + esc(k.name) + '</span><span class="kdone">' + (state.understood[k.id] ? "✓" : "") + '</span></button></li>';
}
function openKe(id){ current = id; renderList(); renderKe(true); }
function renderList(){
  const ul = document.getElementById("klist");
  const cur = byId[current] || K[0];
  if (lastCur !== current) { openLens = cur.lens; lastCur = current; }
  let h = '<li class="kpick"><label for="kselect">Chọn kế</label><select id="kselect">' +
    LENS_ORDER.map(c => '<optgroup label="' + esc(lensName(c)) + '">' + ORDER.filter(k => k.lens === c).map(k => '<option value="' + k.id + '"' + (k.id === current ? ' selected' : '') + '>' + k.id + '. ' + esc(k.name) + (state.understood[k.id] ? '  ✓' : '') + '</option>').join("") + '</optgroup>').join("") +
    '</select></li>';
  LENS_ORDER.forEach(c => {
    const ks = ORDER.filter(k => k.lens === c);
    const done = ks.filter(k => state.understood[k.id]).length;
    const open = c === openLens;
    h += '<li class="lgroup ' + c + '"><button class="lhead" data-l="' + c + '" aria-expanded="' + open + '"><span class="lbar"></span><span class="lname">' + esc(lensName(c)) + '</span><span class="lcount">' + done + '/' + ks.length + '</span><span class="chev" aria-hidden="true"></span></button>' +
      (open ? '<ul class="litems">' + ks.map(kbtnHTML).join("") + '</ul>' : '') + '</li>';
  });
  ul.innerHTML = h;
  ul.querySelectorAll(".lhead").forEach(b => b.onclick = () => { openLens = (openLens === b.dataset.l) ? "" : b.dataset.l; renderList(); });
  ul.querySelectorAll(".kbtn").forEach(b => b.onclick = () => openKe(+b.dataset.id));
  document.getElementById("kselect").onchange = e => { openKe(+e.target.value); };
}
function sealHTML(k, cls){
  const c = [...k.han];
  if (c.length === 4) {
    const pos = [[2,1],[2,2],[1,1],[1,2]];
    return '<div class="seal four ' + (cls||"") + '" lang="zh" aria-label="' + k.han + '">' + c.map((ch,i) => '<span style="grid-column:' + pos[i][0] + ';grid-row:' + pos[i][1] + '">' + ch + '</span>').join("") + '</div>';
  }
  return '<div class="seal three ' + (cls||"") + '" lang="zh" aria-label="' + k.han + '">' + c.map(ch => '<span>' + ch + '</span>').join("") + '</div>';
}
function renderKe(stamp){
  const k = byId[current] || K[0];
  const v = document.getElementById("kview");
  const other = byId[k.confuse.id];
  const idx = ORDER.indexOf(k), prev = ORDER[idx-1], next = ORDER[idx+1];
  v.innerHTML =
    '<div class="khead">' + sealHTML(k, stamp ? "stamp" : "") + '<div><p class="kmeta"><span class="ltag ' + k.lens + '">' + esc(lensName(k.lens)) + '</span><span>Kế ' + (idx+1) + '/' + ORDER.length + ' theo thứ tự học</span></p><h2>' + esc(k.name) + '</h2><p class="literal">' + esc(k.literal) + '</p><p class="group">Kế thứ ' + k.id + ' trong 36 kế, thuộc ' + esc(k.group) + '.</p></div></div>' +
    '<section class="sect"><h3>Điển tích</h3><p class="story">' + esc(k.story) + '</p>' + (k.note ? '<p class="story-note">' + esc(k.note) + '</p>' : '') + '</section>' +
    '<section class="sect"><h3>Phân tích</h3><dl class="anal">' +
      '<div><dt>Cơ chế</dt><dd>' + esc(k.mech) + '</dd></div>' +
      '<div><dt>Điều kiện</dt><dd>' + esc(k.cond) + '</dd></div>' +
      '<div><dt>Điểm gãy</dt><dd>' + esc(k.fail) + '</dd></div>' +
      '<div><dt>Nhận diện</dt><dd>' + esc(k.detect) + '</dd></div>' +
    '</dl></section>' +
    '<section class="sect confuse ' + other.lens + '"><strong>Dễ nhầm với </strong><button class="linkbtn" id="goto">' + esc(other.name) + '</button><p>' + esc(k.confuse.text) + '</p></section>' +
    '<section class="sect"><h3>Phân tích của bạn</h3>' +
      '<p class="note-prompt">Viết lại cơ chế của kế này bằng lời của bạn, không dùng thành ngữ. Kế này tạo ra hay khai thác chỗ hư nào, và dựa vào cái chính nào? Sau đó nêu một ví dụ bạn từng gặp hoặc tự nghĩ ra.</p>' +
      '<textarea id="note" aria-label="Phân tích của bạn"></textarea>' +
      '<div class="row"><span class="saved" id="saved"></span>' +
      '<button class="btn primary" id="critique">' + claudeLabel() + '</button>' +
      '<button class="btn" id="understood"></button></div>' +
      '<div class="coach" id="coach" aria-live="polite"></div>' +
    '</section>' +
    '<div id="kalldone"></div>' +
    '<nav class="lnav">' + (prev ? '<button class="btn navbtn" id="kprev"><small>Kế trước</small>' + esc(prev.name) + '</button>' : '<span></span>') +
      (next ? '<button class="btn navbtn next" id="knext"><small>Kế tiếp</small>' + esc(next.name) + '</button>' : '<button class="btn primary navbtn next" id="knext"><small>Đã hết 36 kế</small>Sang luyện tình huống</button>') + '</nav>';
  document.getElementById("goto").onclick = () => { openKe(other.id); toTopOf(views.learn); };
  const kp = document.getElementById("kprev"); if (kp) kp.onclick = () => { openKe(prev.id); toTopOf(views.learn); };
  document.getElementById("knext").onclick = () => { if (next) { openKe(next.id); toTopOf(views.learn); } else show("practice", true); };
  const note = document.getElementById("note"), saved = document.getElementById("saved");
  note.value = state.notes[k.id] || "";
  let t;
  note.oninput = () => { clearTimeout(t); saved.textContent = ""; t = setTimeout(() => { state.notes[k.id] = note.value; save(); saved.textContent = "Đã lưu"; }, 500); };
  const ub = document.getElementById("understood");
  const paintU = () => { const on = !!state.understood[k.id]; ub.textContent = on ? "Đã hiểu ✓" : "Đánh dấu đã hiểu"; ub.classList.toggle("on", on); ub.setAttribute("aria-pressed", on); };
  const paintAll = () => {
    const box = document.getElementById("kalldone");
    box.innerHTML = K.every(x => state.understood[x.id]) ? '<div class="done-banner"><p>Bạn đã đánh dấu hiểu đủ 36 kế. Giờ thử nhận ra chúng trong các tình huống không ghi tên.</p><button class="btn primary" id="gopractice">Sang luyện tình huống</button>' + donateHTML("Nếu thấy có ích, mời mình một ly cà phê") + '</div>' : '';
    const gp = document.getElementById("gopractice"); if (gp) gp.onclick = () => show("practice", true);
  };
  paintU(); paintAll();
  ub.onclick = () => { state.understood[k.id] = !state.understood[k.id]; save(); paintU(); paintAll(); renderList(); renderProgress(); };
  const cb = document.getElementById("critique");
  if (cb) cb.onclick = () => {
    const text = note.value.trim();
    if (text.length < 30) { saved.textContent = "Viết ít nhất vài câu trước khi nhờ phản biện."; note.focus(); return; }
    state.notes[k.id] = note.value; save();
    const prompt =
      "Bạn là người hướng dẫn học 36 kế theo phương pháp Socrates, giúp người học hiểu bản chất thay vì học thuộc. Người học đã học nền tảng: hư thực, chính kỳ, thế, biến dịch, khung 5 câu hỏi và cách phá kế.\n\n" +
      "Kế đang học: " + k.name + " (" + k.han + "), lăng kính " + lensName(k.lens) + ".\n" +
      "Tài liệu người học đã đọc:\nCơ chế: " + k.mech + "\nĐiều kiện: " + k.cond + "\nĐiểm gãy: " + k.fail + "\nKế dễ nhầm: " + other.name + ". " + k.confuse.text + "\n\n" +
      "Phân tích của người học:\n\"\"\"" + text + "\"\"\"\n\n" +
      "Hãy phản hồi tối đa 150 chữ. " + RULES + " Nêu cụ thể một điểm họ đã nắm đúng bản chất. Chỉ ra chỗ còn hời hợt, nhầm lẫn, hoặc chỉ nhắc lại thành ngữ, nếu có. Nếu ví dụ của họ không thực sự khớp cơ chế, hãy nói thẳng và giải thích ngắn gọn. Khi phù hợp, gắn nhận xét với khái niệm nền tảng như hư thực, chính kỳ hoặc thế. Kết thúc bằng đúng một câu hỏi phản biện về điều kiện, điểm gãy, hoặc khác biệt với kế " + other.name + ". Không viết sẵn đáp án hoàn chỉnh.";
    coach(document.getElementById("coach"), prompt,"Nếu họ đã cho thấy hiểu sâu bản chất, hãy xác nhận và gợi ý họ đánh dấu đã hiểu kế này, không hỏi thêm.");
  };
}

/* ---------- Luyện tình huống ---------- */
const SETS = [
  {id:"nhanthuc", name:"Nhận thức", lenses:["l1"]},
  {id:"vitri", name:"Vị trí và Bên thứ ba", lenses:["l3","l4"]},
  {id:"thoico", name:"Thời cơ và nguồn lực", lenses:["l2"]},
  {id:"tamly", name:"Tâm lý và động cơ", lenses:["l5"]},
  {id:"trongtam", name:"Trọng tâm và cấu trúc", lenses:["l6"]},
  {id:"all", name:"Trộn tất cả", lenses:null}
];
let setId = "nhanthuc", si = 0, pickLens = null, pickFor = null;
function setScen(id){
  if (id !== "all") return S.filter(s => (s.set || "nhanthuc") === id);
  const groups = SETS.filter(x => x.id !== "all").map(x => setScen(x.id)), out = [];
  for (let i = 0; groups.some(g => i < g.length); i++) groups.forEach(g => { if (i < g.length) out.push(g[i]); });
  return out;
}
function setOpts(id){ const st = SETS.find(x => x.id === id); return K.filter(k => !st.lenses || st.lenses.includes(k.lens)).sort(byLens); }
function setLensCount(id){ const st = SETS.find(x => x.id === id); return st.lenses ? st.lenses.length : LENS_ORDER.length; }
function curScen(){ return setScen(setId)[si]; }
function optButtons(ks){ return '<div class="opts">' + ks.map(k => '<button class="opt" data-id="' + k.id + '"><span class="knum">' + k.id + '</span>' + esc(k.name) + '</button>').join("") + '</div>'; }
function renderPractice(){
  const list = setScen(setId);
  if (si >= list.length) si = 0;
  const s = list[si];
  const res = state.quiz[s.id];
  const saved = state.reasons[s.id] && state.reasons[s.id].pick;
  if (pickFor !== s.id) { pickFor = s.id; pickLens = (res && saved) ? byId[saved].lens : null; }
  const p = document.getElementById("pview");
  const correctN = list.filter(x => state.quiz[x.id] === "correct").length;
  const doneN = list.filter(x => state.quiz[x.id]).length;
  const opts = setOpts(setId);
  let optsHTML = "";
  if (setId === "all") {
    if (!pickLens) {
      optsHTML = '<p class="qlabel">Bước 1: Kế này chủ yếu tác động vào đâu?</p><div class="lenspick">' +
        LENS_ORDER.map(c => '<button class="lensbtn ' + c + '" data-l="' + c + '"><i class="sw"></i>' + esc(lensName(c)) + '</button>').join("") + '</div>';
    } else {
      optsHTML = '<p class="qlabel">Bước 2: Trong lăng kính <span class="ltag ' + pickLens + '">' + esc(lensName(pickLens)) + '</span> đây là kế nào?</p>' +
        (res ? '' : '<p class="stepback"><button class="linkbtn" id="relens">Chọn lại lăng kính</button></p>') + optButtons(opts.filter(k => k.lens === pickLens));
    }
  } else {
    optsHTML = '<p class="qlabel">Đây chủ yếu là kế nào?</p>';
    LENS_ORDER.forEach(c => {
      const ks = opts.filter(k => k.lens === c);
      if (!ks.length) return;
      optsHTML += (setLensCount(setId) > 1 ? '<p class="ogroup ' + c + '">' + esc(lensName(c)) + '</p>' : '') + optButtons(ks);
    });
  }
  const unanswered = list.findIndex((x, i) => i > si && !state.quiz[x.id]);
  const firstUn = unanswered >= 0 ? unanswered : list.findIndex(x => !state.quiz[x.id]);
  const nav = list.length > 12
    ? '<div class="segbar" role="group" aria-label="Chọn tình huống">' + list.map((x,i) => '<button class="seg ' + (state.quiz[x.id]||"") + '" data-i="' + i + '" aria-label="Tình huống ' + (i+1) + '"' + (i===si ? ' aria-current="true"' : '') + '></button>').join("") + '</div>'
    : '<div class="dots">' + list.map((x,i) => '<button class="dot ' + (state.quiz[x.id]||"") + '" data-i="' + i + '" aria-label="Tình huống ' + (i+1) + '"' + (i===si ? ' aria-current="true"' : '') + '>' + (i+1) + '</button>').join("") + '</div>';
  p.innerHTML =
    '<div class="sets" role="group" aria-label="Bộ tình huống">' + SETS.map(x => { const l = setScen(x.id); const c = l.filter(y => state.quiz[y.id] === "correct").length; return '<button class="setbtn" data-s="' + x.id + '" aria-pressed="' + (x.id === setId) + '">' + esc(x.name) + ' <span class="cnt">' + c + '/' + l.length + '</span></button>'; }).join("") + '</div>' +
    '<div class="pnav"><div class="pstep"><button class="btn sq" id="pprev" aria-label="Tình huống trước"' + (si === 0 ? ' disabled' : '') + '>‹</button><span class="pcount">Tình huống ' + (si+1) + ' trên ' + list.length + '</span><button class="btn sq" id="pnext" aria-label="Tình huống tiếp"' + (si === list.length-1 ? ' disabled' : '') + '>›</button></div>' +
    (res && firstUn >= 0 && firstUn !== si ? '<button class="linkbtn small" id="pjump">Tới câu chưa làm</button>' : '') +
    '<span class="score">' + (doneN ? "Đúng " + correctN + " trên " + doneN + " câu đã làm" : "Chưa làm câu nào trong bộ này") + '</span>' + nav + '</div>' +
    '<p class="scenario">' + esc(s.text) + '</p>' +
    '<div class="why"><label for="reason">Vì sao bạn nghĩ vậy? <span class="hint">Không bắt buộc, nhưng viết ra giúp bạn thấy rõ cách mình suy luận.</span></label>' +
    '<textarea id="reason" placeholder="Điều gì đang bị tác động: nhận thức, vị trí, bên thứ ba, thời cơ, tâm lý hay trọng tâm? Vì sao?"></textarea></div>' +
    optsHTML + '<div id="result"></div>';
  const go = i => { si = i; renderPractice(); };
  p.querySelectorAll(".setbtn").forEach(b => b.onclick = () => { setId = b.dataset.s; si = 0; pickFor = null; renderPractice(); });
  p.querySelectorAll(".dot,.seg").forEach(d => d.onclick = () => go(+d.dataset.i));
  document.getElementById("pprev").onclick = () => go(si - 1);
  document.getElementById("pnext").onclick = () => go(si + 1);
  const pj = document.getElementById("pjump"); if (pj) pj.onclick = () => go(firstUn);
  const reason = document.getElementById("reason");
  reason.value = state.reasons[s.id] ? (state.reasons[s.id].text || "") : "";
  reason.oninput = () => { state.reasons[s.id] = Object.assign(state.reasons[s.id] || {}, {text:reason.value}); save(); };
  p.querySelectorAll(".lensbtn").forEach(b => b.onclick = () => { pickLens = b.dataset.l; renderPractice(); const f = document.querySelector(".opt"); if (f) f.focus({preventScroll:true}); });
  const rl = document.getElementById("relens"); if (rl) rl.onclick = () => { pickLens = null; renderPractice(); };
  p.querySelectorAll(".opt").forEach(b => b.onclick = () => choose(+b.dataset.id));
  const act = p.querySelector('.setbtn[aria-pressed="true"]'); const row = p.querySelector('.sets');
  if (act && row.scrollWidth > row.clientWidth) row.scrollLeft = act.offsetLeft - (row.clientWidth - act.offsetWidth) / 2;
  if (res && saved) reveal(saved, false);
}
function choose(id){
  const s = curScen();
  const verdict = s.answers.includes(id) ? "correct" : s.partial.includes(id) ? "partial" : "wrong";
  state.quiz[s.id] = verdict;
  state.reasons[s.id] = Object.assign(state.reasons[s.id] || {}, {pick:id, text:document.getElementById("reason").value});
  save(); renderProgress();
  const rl = document.getElementById("relens"); if (rl) rl.parentNode.remove();
  reveal(id, true);
  const el = document.querySelector('.dots .dot[data-i="' + si + '"], .segbar .seg[data-i="' + si + '"]');
  if (el) el.className = (el.classList.contains("seg") ? "seg " : "dot ") + verdict;
}
function reveal(pick, focus){
  const s = curScen();
  const verdict = state.quiz[s.id];
  document.querySelectorAll(".opt").forEach(b => {
    const id = +b.dataset.id; b.disabled = true;
    if (s.answers.includes(id)) b.classList.add("correct");
    else if (id === pick && s.partial.includes(id)) b.classList.add("partial");
    else if (id === pick) b.classList.add("wrong");
    else b.classList.add("dim");
  });
  const names = s.answers.map(id => byId[id].name).join(" và ");
  const vText = verdict === "correct" ? (s.answers.length > 1 ? "Đúng, và còn một lớp nữa: " + names + "." : "Đúng: " + names + ".")
              : verdict === "partial" ? "Gần đúng. Kế chính là " + names + "."
              : "Chưa đúng. Kế chính là " + names + ".";
  const ansLens = s.answers.map(i => byId[i].lens), pl = byId[pick].lens;
  const lensLine = setLensCount(setId) > 1 ? '<p class="lensline">' + (ansLens.includes(pl) ? 'Bạn đã nhận đúng lăng kính <span class="ltag ' + pl + '">' + esc(lensName(pl)) + '</span>' : 'Lăng kính đúng là <span class="ltag ' + ansLens[0] + '">' + esc(lensName(ansLens[0])) + '</span> còn bạn chọn <span class="ltag ' + pl + '">' + esc(lensName(pl)) + '</span>') + '</p>' : '';
  const r = document.getElementById("result");
  const reasonText = (document.getElementById("reason").value || "").trim();
  const total = setScen(setId).length;
  r.innerHTML = '<div class="result ' + verdict + '"><p class="verdict ' + verdict + '" tabindex="-1">' + esc(vText) + '</p>' + lensLine +
    '<p>' + esc(s.explain) + '</p><p class="trap">' + esc(s.trap) + '</p>' +
    '<div class="row">' +
      '<button class="btn" id="seeKe">Xem lại kế ' + esc(byId[s.answers[0]].name) + '</button>' +
      '<button class="btn" id="askWhy">' + claudeLabel(reasonText ? "Nhờ Claude nhận xét lý do của bạn" : "Nhờ Claude giải thích sâu hơn") + '</button>' +
      '<button class="btn" id="retry">Làm lại câu này</button>' +
      '<button class="btn primary" id="next">' + (si < total - 1 ? "Tình huống tiếp" : "Về tình huống đầu") + '</button>' +
    '</div><div class="coach" id="pcoach" aria-live="polite"></div></div>';
  if (focus) r.querySelector(".verdict").focus();
  document.getElementById("seeKe").onclick = () => { current = s.answers[0]; show("learn", true); };
  document.getElementById("next").onclick = () => { si = (si + 1) % total; renderPractice(); toTopOf(views.practice); };
  document.getElementById("retry").onclick = () => { delete state.quiz[s.id]; if (state.reasons[s.id]) delete state.reasons[s.id].pick; save(); pickFor = null; renderProgress(); renderPractice(); };
  const aw = document.getElementById("askWhy");
  if (aw) aw.onclick = () => {
    const prompt =
      "Bạn là người hướng dẫn học 36 kế theo phương pháp Socrates. Người học đang luyện nhận diện kế trong tình huống thực tế. Các lựa chọn họ có: " + setOpts(setId).map(k => k.name + " (" + lensName(k.lens) + ")").join(", ") + ". Họ đã học nền tảng hư thực, chính kỳ, thế và cách phá kế.\n\n" +
      "Tình huống:\n\"\"\"" + s.text + "\"\"\"\n\n" +
      "Đáp án chính: " + names + ". Giải thích tham khảo: " + s.explain + " " + s.trap + "\n" +
      "Người học chọn: " + byId[pick].name + ".\n" +
      (reasonText ? "Lý do người học đưa ra:\n\"\"\"" + reasonText + "\"\"\"\n\n" : "Người học không ghi lý do.\n\n") +
      "Hãy phản hồi tối đa 150 chữ. " + RULES + " " +
      (reasonText ? "Đánh giá cách suy luận của họ: họ đã nhìn đúng điều gì, bỏ sót hay nhầm ở đâu. Nếu họ chọn sai nhưng lập luận có phần hợp lý, hãy ghi nhận phần đó. " : "Giải thích ngắn vì sao cơ chế trong tình huống khớp với đáp án chính hơn các kế gần giống. ") +
      "Kết thúc bằng đúng một câu hỏi phản biện, ví dụ hỏi họ thay đổi chi tiết nào trong tình huống thì nó sẽ thành một kế khác.";
    coach(document.getElementById("pcoach"), prompt);
  };
}

/* ---------- Khác ---------- */
document.getElementById("reset").onclick = () => {
  if (!confirm("Xóa toàn bộ ghi chú, bài làm và tiến độ trên trình duyệt này?")) return;
  state = blank(); save(); renderProgress(); rerenderCurrent();
};

/* Mở chương Nền tảng nếu chưa xong, ngược lại mở Các kế */
if (F.every(x => state.fdone[x.id])) active = "learn";
else { const first = F.find(x => !state.fdone[x.id]); if (first) fcur = first.id; }
show(active, false);
renderProgress();
