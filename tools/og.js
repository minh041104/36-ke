/* Vẽ ảnh xem trước khi chia sẻ (og/*.jpg) và icon ứng dụng (icons/*.png) bằng Chrome.
   Chạy sau tools/build.js:  npm install  rồi  node tools/og.js
   Đường dẫn Chrome lấy từ biến CHROME_PATH, mặc định là vị trí cài đặt trên Windows. */
const fs = require("fs"), path = require("path"), puppeteer = require("puppeteer-core");
const ROOT = path.join(__dirname, "..");
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const list = JSON.parse(fs.readFileSync(path.join(ROOT, "og/list.json"), "utf8"));
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const FONTS = "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@500;600&family=Literata:opsz,wght@7..72,600&family=Ma+Shan+Zheng&display=swap";

function seal(han, size){
  const c = [...han], four = c.length === 4;
  const pos = [[2,1],[2,2],[1,1],[1,2]];
  return '<div class="seal ' + (four ? "four" : "") + '" style="--s:' + size + 'px">' + c.map((ch, i) => '<span' + (four ? ' style="grid-column:' + pos[i][0] + ';grid-row:' + pos[i][1] + '"' : '') + '>' + ch + '</span>').join("") + '</div>';
}
function ogHTML(it){
  return '<!doctype html><html><head><meta charset="utf-8"><link href="' + FONTS + '" rel="stylesheet"><style>' +
    'html,body{margin:0}body{width:1200px;height:630px;background:#E4E9E2;color:#18201C;font-family:"Be Vietnam Pro",sans-serif;position:relative;overflow:hidden}' +
    '.top{position:absolute;left:72px;top:64px;display:flex;align-items:center;gap:14px;font-family:Literata,serif;font-weight:600;font-size:30px}' +
    '.mini{width:46px;height:46px;border-radius:6px;background:#A8302A;color:#FBF1EC;display:grid;place-items:center;font-family:"Ma Shan Zheng";font-size:30px;transform:rotate(-3deg)}' +
    '.t{position:absolute;left:72px;top:190px;width:' + (it.han ? 640 : 980) + 'px;font-family:Literata,serif;font-weight:600;font-size:' + (it.title.length > 26 ? 64 : 80) + 'px;line-height:1.08;letter-spacing:-.01em}' +
    '.s{margin-top:26px;font-size:32px;line-height:1.35;color:#56625B;font-family:"Be Vietnam Pro"}' +
    '.url{position:absolute;left:72px;bottom:56px;font-size:24px;color:#2F5D50;font-weight:600}' +
    '.bar{position:absolute;left:0;right:0;bottom:0;height:14px;background:linear-gradient(90deg,#A8302A 0 16.6%,#2F6A57 0 33.3%,#3E5394 0 50%,#A26F0E 0 66.6%,#7D3C72 0 83.3%,#1E6E8A 0)}' +
    '.seal{position:absolute;right:96px;top:150px;width:var(--s);height:var(--s);background:#A8302A;color:#FBF1EC;border-radius:16px;display:grid;grid-template-rows:repeat(3,1fr);font-family:"Ma Shan Zheng";font-size:calc(var(--s)*.26);line-height:1;padding:22px;box-sizing:border-box;box-shadow:inset 0 0 0 7px #A8302A,inset 0 0 0 10px #FBF1EC;transform:rotate(-3deg)}' +
    '.seal.four{grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;font-size:calc(var(--s)*.36)}.seal span{display:grid;place-items:center}' +
    '</style></head><body><div class="top"><span class="mini">计</span>Học 36 kế</div>' +
    '<div class="t">' + esc(it.title) + (it.sub ? '<div class="s">' + esc(it.sub) + '</div>' : '') + '</div>' +
    (it.han ? seal(it.han, 330) : '') + '<div class="url">minh041104.github.io/36-ke</div><div class="bar"></div></body></html>';
}
function iconHTML(size, maskable){
  const pad = maskable ? size * .1 : 0;
  return '<!doctype html><html><head><meta charset="utf-8"><link href="' + FONTS + '" rel="stylesheet"><style>html,body{margin:0;background:' + (maskable ? "#A8302A" : "transparent") + '}' +
    'div{position:absolute;left:' + pad + 'px;top:' + pad + 'px;width:' + (size - 2 * pad) + 'px;height:' + (size - 2 * pad) + 'px;border-radius:' + (maskable ? 0 : size * .18) + 'px;background:#A8302A;color:#FBF1EC;display:grid;place-items:center;font-family:"Ma Shan Zheng";font-size:' + (size - 2 * pad) * .66 + 'px;line-height:1}</style></head><body><div>计</div></body></html>';
}

(async () => {
  const browser = await puppeteer.launch({executablePath:CHROME, headless:true});
  const page = await browser.newPage();
  const render = async (html, w, h, out, type) => {
    await page.setViewport({width:w, height:h});
    await page.setContent(html, {waitUntil:"load", timeout:90000});
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({path:out, type, quality:type === "jpeg" ? 82 : undefined, omitBackground:type === "png"});
  };
  fs.mkdirSync(path.join(ROOT, "og"), {recursive:true});
  for (const it of list) await render(ogHTML(it), 1200, 630, path.join(ROOT, "og", it.name + ".jpg"), "jpeg");
  fs.mkdirSync(path.join(ROOT, "icons"), {recursive:true});
  for (const [size, mask] of [[192, false], [512, false], [512, true]])
    await render(iconHTML(size, mask), size, size, path.join(ROOT, "icons", "icon-" + size + (mask ? "-maskable" : "") + ".png"), "png");
  await browser.close();
  console.log("Đã vẽ " + list.length + " ảnh chia sẻ và 3 icon.");
})();
