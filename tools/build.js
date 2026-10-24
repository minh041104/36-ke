/* Tạo các trang tĩnh cho SEO từ dữ liệu trong js/data/.
   Chạy: node tools/build.js
   Kết quả: ke/, nen-tang/, các trang lĩnh vực, sitemap.xml, robots.txt, 404.html, og/list.json,
   và phần <head> giữa hai dấu <!-- seo --> ... <!-- /seo --> của index.html và hoc/index.html. */
const fs = require("fs"), path = require("path"), vm = require("vm");

const ROOT = path.join(__dirname, "..");
const SITE = "https://minh041104.github.io/36-ke/";
const DOMAIN_IDS = ["lam-viec", "hoc-tap", "tinh-yeu", "gia-dinh", "mua-sam"];

/* ---------- Đọc dữ liệu ---------- */
const ctx = {window:{}}; vm.createContext(ctx);
for (const f of ["nen-tang", "cac-ke", "tinh-huong"].map(x => "js/data/" + x + ".js").concat(DOMAIN_IDS.map(x => "js/data/linh-vuc/" + x + ".js")))
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8") + ";this.F=typeof F!=='undefined'?F:this.F;this.K=typeof K!=='undefined'?K:this.K;this.S=typeof S!=='undefined'?S:this.S;", ctx);
const {F, K, S} = ctx, LV = ctx.window.LV;
const byId = Object.fromEntries(K.map(k => [k.id, k]));
const LENS = {l1:"Nhận thức", l2:"Thời cơ và nguồn lực", l3:"Vị trí", l4:"Bên thứ ba", l5:"Tâm lý và động cơ", l6:"Trọng tâm và cấu trúc"};

/* ---------- Tiện ích ---------- */
const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slug = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const cut = (s, n) => s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n)).replace(/[,:;]$/, "") + "…";
const keUrl = k => "ke/" + slug(k.name) + "/";
const fUrl = f => "nen-tang/" + slug(f.title) + "/";
const write = (rel, html) => { const p = path.join(ROOT, rel); fs.mkdirSync(path.dirname(p), {recursive:true}); fs.writeFileSync(p, html); };
const ogList = [];
function og(name, title, sub, han){ ogList.push({name, title, sub, han:han || ""}); return "og/" + name + ".jpg"; }

const FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='5' fill='%23A8302A'/%3E%3Ctext x='16' y='23.5' font-size='21' text-anchor='middle' fill='%23FBF1EC' font-family='serif'%3E%E8%AE%A1%3C/text%3E%3C/svg%3E";
const FONTS = "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@500&display=swap";

/* Phần SEO của <head>: dùng cho mọi trang */
function seoHead({title, desc, url, img, up, type, ld, app}){
  return [
    '<title>' + esc(title) + '</title>',
    '<meta name="description" content="' + esc(desc) + '">',
    '<link rel="canonical" href="' + SITE + url + '">',
    '<meta property="og:type" content="' + (type || "website") + '">',
    '<meta property="og:site_name" content="Học 36 kế">',
    '<meta property="og:title" content="' + esc(title.replace(/ · Học 36 kế$/, "")) + '">',
    '<meta property="og:description" content="' + esc(desc) + '">',
    '<meta property="og:url" content="' + SITE + url + '">',
    '<meta property="og:image" content="' + SITE + img + '">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:locale" content="vi_VN">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="theme-color" content="#2F5D50">',
    '<link rel="icon" href="' + FAVICON + '">',
    '<link rel="apple-touch-icon" href="' + up + 'icons/icon-192.png">',
    '<link rel="manifest" href="' + up + 'manifest.webmanifest">',
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="' + FONTS + '" rel="stylesheet">',
    '<link rel="stylesheet" href="' + up + 'css/style.css">',
    app ? '' : '<link rel="stylesheet" href="' + up + 'css/landing.css">',
    ld ? '<script type="application/ld+json">' + JSON.stringify(ld).replace(/</g, "\\u003c") + '</script>' : ''
  ].filter(Boolean).join("\n");
}
function crumbs(items){
  return {"@context":"https://schema.org", "@type":"BreadcrumbList", itemListElement:items.map((it, i) => ({"@type":"ListItem", position:i + 1, name:it[0], item:SITE + it[1]}))};
}
function page({head, up, body, scripts, bodyAttr}){
  return '<!doctype html>\n<html lang="vi">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' + head + '\n</head>\n<body class="landing"' + (bodyAttr || "") + '>\n\n' +
    '<header class="bar">\n  <div class="wrap">\n    <a class="brand" href="' + up + '"><span class="brand-seal" aria-hidden="true">计</span><span class="brand-t">Tam thập lục kế</span></a>\n    <a class="btn primary" href="' + up + 'hoc/">Vào học</a>\n  </div>\n</header>\n\n<main>\n' + body + '\n</main>\n\n' +
    '<footer>\n  <div class="wrap">\n    <span><a href="' + up + '">Học 36 kế</a> · <a href="' + up + 'ke/">36 kế</a> · <a href="' + up + 'nen-tang/">Nền tảng</a> · <a href="https://github.com/minh041104/36-ke" target="_blank" rel="noopener">Mã nguồn</a></span>\n    <span class="foot-r">\n      <button class="donate-foot donate-open" hidden>Mời mình ly cà phê</button>\n    </span>\n  </div>\n</footer>\n\n' +
    ['js/vendor/qrcode.js', 'js/common.js', 'js/donate.js'].concat(scripts || []).map(s => '<script src="' + (s.startsWith("js/") ? up + s : s) + '"></script>').join("\n") + '\n</body>\n</html>\n';
}
const nav = (up, trail) => '<nav class="crumbs" aria-label="Đường dẫn"><a href="' + up + '">Trang chủ</a>' + trail.map(([n, u]) => ' › ' + (u ? '<a href="' + up + u + '">' + esc(n) + '</a>' : '<span aria-current="page">' + esc(n) + '</span>')).join("") + '</nav>';
function sealHTML(k){
  const c = [...k.han];
  if (c.length === 4) {
    const pos = [[2,1],[2,2],[1,1],[1,2]];
    return '<div class="seal four" lang="zh" aria-label="' + k.han + '">' + c.map((ch, i) => '<span style="grid-column:' + pos[i][0] + ';grid-row:' + pos[i][1] + '">' + ch + '</span>').join("") + '</div>';
  }
  return '<div class="seal three" lang="zh" aria-label="' + k.han + '">' + c.map(ch => '<span>' + ch + '</span>').join("") + '</div>';
}

/* ---------- Trang từng kế ---------- */
const ORDER = K.slice().sort((a, b) => a.id - b.id);
ORDER.forEach((k, i) => {
  const up = "../../", url = keUrl(k), other = byId[k.confuse.id];
  const prev = ORDER[i - 1], next = ORDER[i + 1];
  const uses = LV.map(d => ({d, x:d.ke.find(e => e.id === k.id)})).filter(u => u.x);
  const title = k.name + " là gì? Điển tích và cách nhận ra · Học 36 kế";
  const desc = cut(k.name + " (" + k.han + "), kế thứ " + k.id + " trong 36 kế. " + k.mech, 158);
  const img = og("ke-" + slug(k.name), k.name, "Kế thứ " + k.id + " · " + k.literal, k.han);
  const ld = [{"@context":"https://schema.org", "@type":"Article", headline:k.name + " (" + k.han + ")", description:desc, inLanguage:"vi", image:SITE + img, url:SITE + url,
    isPartOf:{"@type":"WebSite", name:"Học 36 kế", url:SITE}}, crumbs([["Học 36 kế", ""], ["36 kế", "ke/"], [k.name, url]])];
  const body = '<article class="wrap kpage">\n' + nav(up, [["36 kế", "ke/"], [k.name]]) +
    '<div class="khead">' + sealHTML(k) + '<div><p class="kmeta"><span class="ltag ' + k.lens + '">' + esc(LENS[k.lens]) + '</span><span>Kế thứ ' + k.id + '</span></p><h1>' + esc(k.name) + '</h1><p class="literal">' + esc(k.literal) + '</p><p class="group">Thuộc ' + esc(k.group) + '.</p></div></div>\n' +
    '<section class="sect"><h2>Điển tích</h2><p class="story">' + esc(k.story) + '</p>' + (k.note ? '<p class="story-note">' + esc(k.note) + '</p>' : '') + '</section>\n' +
    '<section class="sect"><h2>Phân tích</h2><dl class="anal">' +
      '<div><dt>Cơ chế</dt><dd>' + esc(k.mech) + '</dd></div>' +
      '<div><dt>Điều kiện</dt><dd>' + esc(k.cond) + '</dd></div>' +
      '<div><dt>Điểm gãy</dt><dd>' + esc(k.fail) + '</dd></div>' +
      '<div><dt>Nhận diện</dt><dd>' + esc(k.detect) + '</dd></div></dl></section>\n' +
    '<section class="sect confuse ' + other.lens + '"><strong>Dễ nhầm với <a href="' + up + keUrl(other) + '">' + esc(other.name) + '</a></strong><p>' + esc(k.confuse.text) + '</p></section>\n' +
    (uses.length ? '<section class="sect"><h2>Gặp trong đời sống</h2>' + uses.map(u =>
      '<div class="kuse"><h3><a href="' + up + u.d.id + '/">' + esc(u.d.name) + '</a></h3><dl class="anal">' +
      '<div><dt>Biểu hiện</dt><dd>' + esc(u.x.how) + '</dd></div><div><dt>Dấu hiệu</dt><dd>' + esc(u.x.signs) + '</dd></div><div><dt>Cách ứng xử</dt><dd>' + esc(u.x.respond) + '</dd></div></dl></div>').join("") + '</section>\n' : '') +
    '<div class="kcta"><p>Trong trang học, bạn có thể viết lại cơ chế bằng lời của mình, nhờ Claude phản biện và luyện nhận diện kế này qua tình huống.</p><a class="btn primary" href="' + up + 'hoc/#ke-' + k.id + '">Học kế này</a></div>\n' +
    '<nav class="lnav">' + (prev ? '<a class="btn navbtn" href="' + up + keUrl(prev) + '"><small>Kế thứ ' + prev.id + '</small>' + esc(prev.name) + '</a>' : '<span></span>') +
      (next ? '<a class="btn navbtn next" href="' + up + keUrl(next) + '"><small>Kế thứ ' + next.id + '</small>' + esc(next.name) + '</a>' : '<a class="btn navbtn next" href="' + up + 'ke/"><small>Đã hết 36 kế</small>Xem danh sách</a>') + '</nav>\n</article>';
  write(url + "index.html", page({head:seoHead({title, desc, url, img, up, type:"article", ld}), up, body}));
});

/* ---------- Danh sách 36 kế ---------- */
{
  const up = "../", url = "ke/";
  const groups = [];
  ORDER.forEach(k => { const g = k.group.split(",")[0]; let gr = groups.find(x => x.g === g); if (!gr) groups.push(gr = {g, sub:k.group.split(",").slice(1).join(",").trim(), ks:[]}); gr.ks.push(k); });
  const title = "36 kế: danh sách đầy đủ, ý nghĩa và điển tích · Học 36 kế";
  const desc = "Danh sách đủ 36 kế trong Tam thập lục kế, chia theo sáu nhóm, mỗi kế có chữ Hán, nghĩa đen, điển tích, cơ chế và cách nhận ra.";
  const img = og("ke", "36 kế", "Danh sách đầy đủ, ý nghĩa và điển tích", "三十六计");
  const ld = [{"@context":"https://schema.org", "@type":"ItemList", name:"36 kế", itemListElement:ORDER.map((k, i) => ({"@type":"ListItem", position:i + 1, name:k.name, url:SITE + keUrl(k)}))}, crumbs([["Học 36 kế", ""], ["36 kế", url]])];
  const body = '<section class="wrap kindex">\n' + nav(up, [["36 kế"]]) + '<h1>36 kế</h1><p class="hero-p">Tam thập lục kế gồm 36 kế, chia thành sáu nhóm theo tình thế: từ khi mình đang có ưu thế đến khi đã thất thế. Bấm vào một kế để đọc điển tích, cơ chế và cách nhận ra.</p>\n' +
    groups.map(gr => '<section class="kgroup"><h2>' + esc(gr.g) + '</h2><p class="msub">' + esc(gr.sub.replace(/^nhóm /, "Nhóm ")) + '</p><ol class="klinks">' +
      gr.ks.map(k => '<li><a href="' + up + keUrl(k) + '"><span class="knum">' + k.id + '</span><span class="kn">' + esc(k.name) + '</span><span class="kl" lang="zh">' + esc(k.han) + '</span><span class="kt">' + esc(k.literal) + '</span></a></li>').join("") + '</ol></section>').join("\n") +
    '\n</section>';
  write(url + "index.html", page({head:seoHead({title, desc, url, img, up, ld}), up, body}));
}

/* ---------- Bài nền tảng ---------- */
F.forEach((f, i) => {
  const up = "../../", url = fUrl(f), prev = F[i - 1], next = F[i + 1];
  const title = f.title + " · Nền tảng học 36 kế";
  const desc = cut(f.lead, 158);
  const img = og("nen-tang-" + slug(f.title), f.title, "Bài nền tảng " + f.id + "/" + F.length, "");
  const ld = [{"@context":"https://schema.org", "@type":"Article", headline:f.title, description:desc, inLanguage:"vi", image:SITE + img, url:SITE + url, isPartOf:{"@type":"WebSite", name:"Học 36 kế", url:SITE}},
    crumbs([["Học 36 kế", ""], ["Nền tảng", "nen-tang/"], [f.title, url]])];
  const body = '<article class="wrap kpage lesson">\n' + nav(up, [["Nền tảng", "nen-tang/"], [f.title]]) +
    '<p class="lesson-pos">Bài ' + f.id + '/' + F.length + '</p><h1>' + esc(f.title) + '</h1><p class="lead">' + esc(f.lead) + '</p>\n' +
    '<div class="quotes">' + f.quotes.map(q => '<figure class="quote"><p class="zh" lang="zh">' + esc(q.zh) + '</p><p class="hv">' + esc(q.hv) + '</p><p class="vi">' + esc(q.vi) + '</p><cite>' + esc(q.src) + '</cite></figure>').join("") + '</div>\n' +
    '<section class="sect prose"><h2>' + (f.check ? "Giải thích" : "Ba câu hỏi") + '</h2>' + f.body.map(p => '<p>' + esc(p) + '</p>').join("") + '</section>\n' +
    (f.extra === "map" ? '<section class="sect"><h2>36 kế theo nhóm</h2><p><a href="' + up + 'ke/">Xem danh sách đủ 36 kế</a>, chia theo sáu nhóm truyền thống.</p></section>\n' : '') +
    (f.example ? '<section class="sect"><h2>Ví dụ</h2><p class="example">' + esc(f.example) + '</p></section>\n' : '') +
    '<section class="sect"><div class="contrast"><div class="mm"><h3>Cách nghĩ thường gặp</h3><p>' + esc(f.wrong) + '</p></div><div class="bc"><h3>Cách nghĩ nên có</h3><p>' + esc(f.right) + '</p></div></div></section>\n' +
    '<div class="kcta"><p>Trong trang học, bài này có thêm câu hỏi tình huống và bài tự viết để Claude phản biện.</p><a class="btn primary" href="' + up + 'hoc/#bai-' + f.id + '">Học bài này</a></div>\n' +
    '<nav class="lnav">' + (prev ? '<a class="btn navbtn" href="' + up + fUrl(prev) + '"><small>Bài trước</small>' + esc(prev.title) + '</a>' : '<span></span>') +
      (next ? '<a class="btn navbtn next" href="' + up + fUrl(next) + '"><small>Bài tiếp</small>' + esc(next.title) + '</a>' : '<a class="btn navbtn next" href="' + up + 'ke/"><small>Xong phần nền tảng</small>Sang 36 kế</a>') + '</nav>\n</article>';
  write(url + "index.html", page({head:seoHead({title, desc, url, img, up, type:"article", ld}), up, body}));
});
{
  const up = "../", url = "nen-tang/";
  const title = "Nền tảng để hiểu 36 kế: hư thực, chính kỳ, thế · Học 36 kế";
  const desc = "Mười bài nền tảng trước khi học 36 kế: cách đọc văn bản, âm dương biến dịch, hư thực, chính kỳ, thế, khung phân tích một kế và cách phá kế.";
  const img = og("nen-tang", "Nền tảng", "Mười bài cần đọc trước khi học 36 kế", "");
  const ld = crumbs([["Học 36 kế", ""], ["Nền tảng", url]]);
  const body = '<section class="wrap kindex">\n' + nav(up, [["Nền tảng"]]) + '<h1>Mười bài nền tảng</h1><p class="hero-p">Nên đọc mười bài này trước khi vào các kế. Chúng giải thích những khái niệm mà phần sau dùng liên tục như hư thực, chính kỳ và thế.</p>\n' +
    '<ol class="klinks">' + F.map(f => '<li><a href="' + up + fUrl(f) + '"><span class="knum">' + f.id + '</span><span class="kn">' + esc(f.title) + '</span><span class="kt">' + esc(cut(f.lead, 110)) + '</span></a></li>').join("") + '</ol>\n</section>';
  write(url + "index.html", page({head:seoHead({title, desc, url, img, up, ld}), up, body}));
}

/* ---------- Trang lĩnh vực ---------- */
LV.forEach(d => {
  const up = "../", url = d.id + "/";
  const title = d.title + " · Học 36 kế";
  const desc = d.desc || cut(d.intro, 158);
  const img = og(d.id, d.title, d.ke.length + " kế, " + d.scenarios.length + " tình huống", "");
  const ld = [{"@context":"https://schema.org", "@type":"Article", headline:d.title, description:desc, inLanguage:"vi", image:SITE + img, url:SITE + url, isPartOf:{"@type":"WebSite", name:"Học 36 kế", url:SITE}},
    crumbs([["Học 36 kế", ""], [d.name, url]])];
  const body = '<section class="wrap lvhero">\n' + nav(up, [[d.name]]) + '<p class="eyebrow">Lĩnh vực · ' + esc(d.name) + '</p><h1>' + esc(d.title) + '</h1><p class="hero-p">' + esc(d.intro) + '</p>\n' +
    '<div class="cta"><a class="btn primary big" href="' + up + 'hoc/#luyen-' + d.id + '">Luyện ' + d.scenarios.length + ' tình huống</a><a class="btn big" href="' + up + 'ke/">Xem đủ 36 kế</a></div>\n' +
    '<p class="facts" id="facts">' + d.ke.length + ' kế, ' + d.scenarios.length + ' tình huống.</p>\n</section>\n' +
    '<section class="wrap band"><ol class="lvlist">' + d.ke.map((x, i) => { const k = byId[x.id];
      return '<li class="lvke" data-k="' + k.id + '"><div class="lvhead"><span class="lvnum">' + (i + 1) + '</span><div><h2><a href="' + up + keUrl(k) + '">' + esc(k.name) + '</a></h2>' +
        '<p class="kmeta"><span class="ltag ' + k.lens + '">' + esc(LENS[k.lens]) + '</span><span lang="zh" class="lvhan">' + esc(k.han) + '</span></p></div></div>' +
        '<p class="lvhow">' + esc(x.how) + '</p><details><summary>Dấu hiệu và cách ứng xử</summary><dl class="anal">' +
        '<div><dt>Dấu hiệu</dt><dd>' + esc(x.signs) + '</dd></div><div><dt>Cách ứng xử</dt><dd>' + esc(x.respond) + '</dd></div></dl>' +
        '<p class="lvlink"><a href="' + up + keUrl(k) + '">Đọc điển tích và phân tích đầy đủ</a></p></details></li>'; }).join("") + '</ol>' +
    (d.ethics ? '<p class="lvethics">' + esc(d.ethics) + '</p>' : '') + '</section>\n' +
    '<p class="wrap support" id="ung-ho" hidden>Nếu thấy có ích, bạn có thể <button class="linkbtn donate-open">mời mình một ly cà phê</button>.</p>';
  write(url + "index.html", page({head:seoHead({title, desc, url, img, up, ld}), up, body, bodyAttr:' data-lv="' + d.id + '" data-total="' + d.scenarios.length + '"',
    scripts:["js/data/linh-vuc/" + d.id + ".js", "js/linh-vuc.js"]}));
});

/* ---------- Landing và trang học: thay phần SEO trong <head> ---------- */
function patchHead(rel, opts){
  const p = path.join(ROOT, rel); let h = fs.readFileSync(p, "utf8");
  const block = "<!-- seo -->\n" + seoHead(opts) + "\n<!-- /seo -->";
  if (h.includes("<!-- seo -->")) h = h.replace(/<!-- seo -->[\s\S]*?<!-- \/seo -->/, block);
  else h = h.replace(/<title>[\s\S]*?(?=<\/head>)/, block + "\n");
  fs.writeFileSync(p, h);
}
patchHead("index.html", {title:"Học 36 kế qua sử sách và chuyện thời nay", up:"", url:"",
  desc:"Học 36 kế qua điển tích trong sử sách và " + (S.length + LV.reduce((n, d) => n + d.scenarios.length, 0)) + " tình huống thời nay. Có 10 bài nền tảng, phân tích từng kế, bài tập theo lĩnh vực. Miễn phí, không cần đăng ký.",
  img:og("trang-chu", "Học 36 kế", "Qua sử sách và chuyện thời nay", "三十六计"),
  ld:{"@context":"https://schema.org", "@type":"WebSite", name:"Học 36 kế", url:SITE, inLanguage:"vi"}});
patchHead("hoc/index.html", {title:"Trang học · Học 36 kế", up:"../", url:"hoc/", app:true,
  desc:"Học 36 kế theo thứ tự: 10 bài nền tảng, 36 kế chia theo sáu lăng kính, " + S.length + " tình huống luyện nhận diện và bài tập theo lĩnh vực. Tiến độ lưu ngay trên trình duyệt.",
  img:og("hoc", "Trang học", "Nền tảng · 36 kế · Luyện tập · Lĩnh vực", "")});

/* ---------- 404, sitemap, robots, danh sách ảnh ---------- */
{
  const up = "/36-ke/";
  const body = '<section class="wrap kindex"><h1>Không tìm thấy trang</h1><p class="hero-p">Trang này không có hoặc đã đổi địa chỉ.</p><div class="cta"><a class="btn primary big" href="' + up + '">Về trang chủ</a><a class="btn big" href="' + up + 'ke/">Xem 36 kế</a></div></section>';
  write("404.html", page({head:seoHead({title:"Không tìm thấy trang · Học 36 kế", desc:"Trang không tồn tại.", url:"404.html", img:"og/trang-chu.jpg", up}).replace('<link rel="canonical"', '<meta name="robots" content="noindex">\n<link rel="canonical"'), up, body}));
}
const urls = ["", "hoc/", "ke/", "nen-tang/"].concat(LV.map(d => d.id + "/"), ORDER.map(keUrl), F.map(fUrl));
const today = new Date().toISOString().slice(0, 10);
write("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.map(u => '  <url><loc>' + SITE + u + '</loc><lastmod>' + today + '</lastmod></url>').join("\n") + '\n</urlset>\n');
write("robots.txt", "User-agent: *\nAllow: /\n\nSitemap: " + SITE + "sitemap.xml\n");
write("og/list.json", JSON.stringify(ogList, null, 1));
console.log("Đã tạo " + urls.length + " trang trong sitemap, " + ogList.length + " ảnh cần vẽ (chạy node tools/og.js).");
