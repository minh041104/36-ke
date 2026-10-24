/* ---------- Ủng hộ ---------- */
/* Điền thông tin nhận ủng hộ. Mục nào để trống thì không hiện; trống hết thì ẩn mọi nút ủng hộ. */
const DONATE = {
  bank: {id:"", account:"", name:""}, // id: mã ngân hàng theo VietQR, ví dụ "MB", "VCB", "TCB", "ACB"; name: tên chủ tài khoản, viết hoa không dấu
  qrImage: "qr-momo.jpg",           // Hoặc ảnh QR có sẵn, đặt ở thư mục gốc của repo. Chỉ dùng khi không điền bank.
  note: "Ung ho 36 ke",               // Nội dung chuyển khoản điền sẵn trong mã QR
  crypto: [
    {coin:"USDT", network:"TRC20 (Tron)", address:"TYDCHoFu4W5KZyaNPjnCcRqinunsF3zK3B"},
    {coin:"USDT", network:"BEP20 (BNB Smart Chain)", address:"0xbe647cb1498a6190ed25876c92a531d48e609abe"},
    {coin:"USDT", network:"ERC20 (Ethereum)", address:"0xbe647cb1498a6190ed25876c92a531d48e609abe", hint:"Phí gửi trên Ethereum khá cao, nên dùng TRC20 hoặc BEP20 nếu ví của bạn hỗ trợ."},
  ]
};
const bank = DONATE.bank.id && DONATE.bank.account ? DONATE.bank : null;
/* Đường dẫn ảnh QR tính từ thư mục gốc của trang, nên dùng được ở cả landing và trang học */
const siteRoot = new URL("../", document.currentScript.src);
const qrSrc = bank
  ? "https://img.vietqr.io/image/" + encodeURIComponent(bank.id) + "-" + encodeURIComponent(bank.account) + "-compact2.png?addInfo=" + encodeURIComponent(DONATE.note) + "&accountName=" + encodeURIComponent(bank.name)
  : DONATE.qrImage ? new URL(DONATE.qrImage, siteRoot).href : "";
const canDonate = !!(qrSrc || DONATE.crypto.length);
function donateHTML(text){ return canDonate ? '<p class="donate-cta"><button class="linkbtn donate-open">' + esc(text) + '</button></p>' : ''; }
function copyRow(label, value){
  return '<div class="crow"><span class="clabel">' + label + '</span><code>' + esc(value) + '</code><button class="btn sm" data-copy="' + esc(value) + '">Sao chép</button></div>';
}
function showWallet(d, i){
  const c = DONATE.crypto[i];
  d.querySelectorAll(".netbtn").forEach(b => b.setAttribute("aria-pressed", +b.dataset.net === i));
  let qr = "";
  if (window.qrcode) { const q = qrcode(0, "M"); q.addData(c.address); q.make(); qr = '<img class="cqr" src="' + q.createDataURL(8, 16) + '" alt="Mã QR địa chỉ ví ' + esc(c.coin + " " + c.network) + '">'; }
  d.querySelector("#wallet").innerHTML = qr +
    '<p class="wname">' + esc(c.coin) + ' <span class="net">mạng ' + esc(c.network) + '</span></p>' + copyRow("Địa chỉ", c.address) +
    '<p class="dwarn">Chỉ gửi ' + esc(c.coin) + ' qua mạng ' + esc(c.network) + '. Gửi nhầm mạng sẽ mất tiền.</p>' + (c.hint ? '<p class="dhint">' + esc(c.hint) + '</p>' : '');
}
function openDonate(){
  let d = document.getElementById("donate");
  if (!d) {
    d = document.createElement("dialog");
    d.id = "donate"; d.className = "donate"; d.setAttribute("aria-labelledby", "donate-h");
    let h = '<div class="dhead"><h2 id="donate-h">Mời mình ly cà phê</h2><button class="btn sq" data-close aria-label="Đóng">×</button></div>' +
      '<p class="dlead">Mình làm trang này một mình và không chạy quảng cáo. Nếu thấy có ích, bạn ủng hộ bao nhiêu cũng được. Số tiền này cho mình thêm thời gian viết tình huống mới.</p>';
    if (qrSrc) {
      h += '<section class="dsec"><h3>Chuyển khoản qua mã QR</h3><img class="qr" src="' + esc(qrSrc) + '" alt="Mã QR chuyển khoản">' +
        '<p class="dhint">Mở app ngân hàng hoặc MoMo, chọn quét QR. Nếu đang dùng điện thoại, nhấn giữ ảnh để lưu rồi chọn quét QR từ ảnh.</p>' +
        (bank ? copyRow("Ngân hàng", bank.id) + copyRow("Số tài khoản", bank.account) + (bank.name ? copyRow("Chủ tài khoản", bank.name) : "") : "") + '</section>';
    }
    if (DONATE.crypto.length) {
      const coins = [...new Set(DONATE.crypto.map(c => c.coin))];
      h += '<section class="dsec"><h3>Crypto' + (coins.length === 1 ? ' (' + esc(coins[0]) + ')' : '') + '</h3>' +
        '<p class="dhint">Chọn mạng mà ví hoặc sàn của bạn dùng để gửi.</p>' +
        '<div class="nets" role="group" aria-label="Chọn mạng">' + DONATE.crypto.map((c, i) =>
          '<button class="netbtn" data-net="' + i + '" aria-pressed="false">' + esc((coins.length > 1 ? c.coin + ' ' : '') + c.network.split(" ")[0]) + '</button>').join("") + '</div>' +
        '<div class="wallet" id="wallet" aria-live="polite"></div></section>';
    }
    d.innerHTML = h;
    document.body.append(d);
    if (DONATE.crypto.length) showWallet(d, 0);
    d.addEventListener("click", async e => {
      if (e.target === d || e.target.closest("[data-close]")) { d.close(); return; }
      const n = e.target.closest("[data-net]"); if (n) { showWallet(d, +n.dataset.net); return; }
      const b = e.target.closest("[data-copy]"); if (!b) return;
      const ok = await copyText(b.dataset.copy);
      b.textContent = ok ? "Đã chép ✓" : "Không chép được";
      setTimeout(() => { b.textContent = "Sao chép"; }, 1600);
    });
  }
  d.showModal();
}
document.addEventListener("click", e => { if (e.target.closest(".donate-open")) openDonate(); });
document.querySelectorAll(".donate-foot").forEach(b => b.hidden = !canDonate);
