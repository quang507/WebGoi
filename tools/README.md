# Dựng web GÓI từ Figma

Trang chủ, Mẫu hộp, Hồ sơ năng lực và các trang Chi tiết SKU được sinh tự động từ code Figma xuất ra, để web luôn giống bản thiết kế.

## Cập nhật khi thiết kế đổi
1. Trong Figma (page "Design — DS fix"), chọn frame cần cập nhật và xuất lại code bằng Figma MCP (`get_design_context`, `forceCode`), lưu file `.jsx` vào `design/figma-export/` đúng tên cũ (`home-d.jsx`, `home-t.jsx`, … `batch-rest.jsx`).
2. Chạy:
   ```bash
   cd tools && npm install && npm run build
   ```
   Lệnh này viết lại `index.html`, `mau-hop.html`, `ve-goi.html`, `mau-hop/*.html`, `css/goi-atoms.css` và tải ảnh vào `assets/f/`.
3. Kiểm tra lệch so với Figma: đặt ảnh chụp Figma vào `design/figma-ref/`, chụp web bằng `tools/shot.sh`, rồi `python tools/compare.py`.

## Cấu trúc
- `lib/jsx2html.mjs` — đổi JSX + Tailwind của Figma thành HTML và CSS nguyên tử (giữ nguyên số đo).
- `figma2html.mjs` — ghép trang, tải ảnh, gắn link theo prototype, gắn nhãn tương tác.
- `pages.mjs` — danh sách trang và dữ liệu thay cho từng SKU.
- `css/goi-base.css` — token màu, 3 bản Desktop/Tablet/Mobile, vi tương tác.
- `js/goi-motion.js` — hiện dần khi cuộn, đếm số, parallax, băng chữ chạy, thanh kéo số lượng, nút nam châm.

Mỗi trang chứa đủ 3 bản (1440 / 834 / 390) và tự phóng theo bề rộng màn hình, nên chữ, khoảng cách, ảnh giữ đúng tỉ lệ thiết kế ở mọi máy.

## Những chỗ bản xuất Figma sai, bộ dựng tự bù
- Màu gắn biến trắng có độ mờ (thẻ kênh, nút mạng xã hội ở chân trang) mất độ mờ khi xuất → bảng `PAINT_FIX` trong `figma2html.mjs` (quét lại bằng `use_figma` nếu thêm lớp mới).
- Nền lặp (Paper grain, Nền kraft) xuất sai cỡ ô → tính lại theo cỡ ảnh gốc × scalingFactor (`fixTiles`).
- Form "Form Báo Giá Nhanh": các ô `Input …`/`Select Tỉnh` thành ô nhập thật; JS ở mục 6 của `js/goi-motion.js` (chọn loại, kéo số lượng, chép tin nhắn rồi mở Zalo).
- Chụp so sánh: chạy `shot.sh` lần lượt từng trang (chạy song song làm Chrome lẫn trang).
