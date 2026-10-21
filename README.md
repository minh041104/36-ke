# Học 36 kế từ bản chất

Web học Tam thập lục kế theo hướng hiểu cơ chế thay vì học thuộc. Gồm ba phần:

- **Nền tảng:** 10 bài về cách đọc văn bản, âm dương biến dịch, hư thực, chính kỳ, thế, ba câu hỏi nền, bản đồ 36 kế, khung 5 câu hỏi và cách phá kế.
- **Các kế:** đủ 36 kế, chia theo 6 lăng kính. Mỗi kế có điển tích, phân tích (cơ chế, điều kiện, điểm gãy, nhận diện) và phần so sánh với kế dễ nhầm.
- **Luyện tập:** 44 tình huống thời nay không ghi tên kế, chia theo bộ.

## Chạy trên máy

Không cần cài đặt gì. Mở file `index.html` bằng trình duyệt (nhấp đúp là được).

Ghi chú, bài làm và tiến độ được lưu trong trình duyệt bạn dùng (localStorage). Đổi trình duyệt hoặc xóa dữ liệu duyệt web thì tiến độ sẽ mất.

Phông chữ được tải từ Google Fonts, nên khi không có mạng trang vẫn chạy nhưng dùng phông dự phòng.

> **Phản biện bằng Claude:** khi trang được mở dưới dạng artifact trong Claude, Claude hỏi vặn ngay trên trang. Ở mọi nơi khác (chạy trên máy, GitHub Pages), nút đổi thành "Sao chép prompt cho Claude": trang soạn sẵn đề phản biện kèm bài làm của người học, sao chép vào bộ nhớ tạm, người học chỉ cần dán vào claude.ai (bản miễn phí cũng được).

## Nút ủng hộ Buy Me a Coffee

1. Tạo tài khoản ở [buymeacoffee.com](https://buymeacoffee.com) và chọn username.
2. Mở `js/app.js`, tìm dòng `const BMC_USER = "";` và điền username vào giữa hai dấu ngoặc kép, ví dụ `const BMC_USER = "ten-ban";`.

Khi `BMC_USER` để trống, mọi nút ủng hộ đều ẩn. Khi đã điền, nút hiện ở chân trang, ở màn học xong phần nền tảng và ở màn đánh dấu hiểu đủ 36 kế.

## Cấu trúc thư mục

```
36-ke/
├── index.html              Khung trang
├── css/style.css           Giao diện, có sẵn chế độ sáng và tối
└── js/
    ├── data/
    │   ├── nen-tang.js     10 bài nền tảng
    │   ├── cac-ke.js       36 kế
    │   └── tinh-huong.js   Các tình huống luyện tập
    └── app.js              Logic hiển thị, lưu tiến độ, luyện tập
```

Nội dung và code được tách riêng: muốn sửa hay thêm nội dung, bạn chỉ cần sửa các file trong `js/data/`.

## Thêm hoặc sửa nội dung

**Thêm một tình huống:** mở `js/data/tinh-huong.js` và thêm một mục vào mảng `S`:

```js
{id:"ten-duy-nhat", set:"tamly", text:"Mô tả tình huống...",
 answers:[17], partial:[16],
 explain:"Vì sao đáp án đúng.",
 trap:"Vì sao kế gần giống lại không đúng."}
```

- `id`: chuỗi không trùng với tình huống khác (tiến độ được lưu theo id này).
- `set`: bộ tình huống, một trong `nhanthuc`, `vitri`, `thoico`, `tamly`, `trongtam`.
- `answers`: số thứ tự của kế đúng; `partial`: kế được tính là gần đúng. Các kế này phải thuộc lăng kính của bộ đó.

**Sửa một kế:** mở `js/data/cac-ke.js`, tìm theo `id` (số thứ tự trong 36 kế). Trường `lens` là mã lăng kính: `l1` Nhận thức, `l2` Thời cơ và nguồn lực, `l3` Vị trí, `l4` Bên thứ ba, `l5` Tâm lý và động cơ, `l6` Trọng tâm và cấu trúc.

Khi viết văn bản, dùng dấu ngoặc kép cong “ ” bên trong chuỗi để không làm hỏng cú pháp JavaScript.

## Đưa lên GitHub và xuất bản miễn phí

```bash
cd 36-ke
git init
git add .
git commit -m "Phiên bản đầu tiên"
git branch -M main
git remote add origin https://github.com/<tên-tài-khoản>/36-ke.git
git push -u origin main
```

Để có một đường link xem trên mọi thiết bị: vào repo trên GitHub, chọn **Settings → Pages**, phần *Branch* chọn `main` và thư mục `/ (root)`, rồi lưu. Sau một hai phút, trang sẽ có ở `https://<tên-tài-khoản>.github.io/36-ke/`.

## Nguồn và độ chính xác

Điển tích được ưu tiên lấy từ chính sử (Sử ký, Tả truyện, Tam quốc chí, Hàn Phi Tử...). Chỗ nào thuộc Tam quốc diễn nghĩa hoặc truyền thuyết đều được ghi chú trong phần điển tích. Khi học sâu, nên đối chiếu thêm với các bản dịch có chú giải của Binh pháp Tôn Tử và Tam thập lục kế.
