# GÓI — luồng người dùng & phạm vi bản web 18/10/2026

Nguồn thiết kế: Figma `ZZ9KagpVSklLBhzHIsax1i`, page **"Design — DS fix (bản sao 18/10)"** (page `Design` gốc giữ làm V1).

## Người dùng chính
Chủ shop nhỏ bán quà Tết / thực phẩm khô lần đầu làm bao bì riêng. Lo hai chuyện: số lượng tối thiểu và tiền khuôn. Vào web từ Zalo, Facebook, phần lớn trên điện thoại.

## Luồng chính (đã nối trong prototype Figma và trên web)
| # | Luồng | Đường đi |
|---|---|---|
| A | Khám phá → báo giá | Trang chủ → Mẫu hộp → Chi tiết SKU → "Nhận báo giá" (Zalo) |
| B | Báo giá nhanh | Trang chủ, nút "Nhận báo giá" → cuộn tới widget báo giá → gửi qua Zalo |
| C | Kiểm tra độ tin cậy | Trang chủ / menu → Hồ sơ năng lực → ghé xưởng / Zalo |
| D | Xem mẫu theo sản phẩm | Trang chủ, thẻ sản phẩm → Chi tiết SKU |

Flow bắt đầu trong Figma: *Desktop — Khám phá → Mẫu hộp → Chi tiết → Báo giá*, *Tablet*, *Mobile*.

## Trang dựng từ Figma
| Trang | URL | Frame |
|---|---|---|
| Trang chủ | `/` | Trang chủ Desktop / Tablet / Mobile |
| Mẫu hộp | `/mau-hop` | Listing Desktop / Tablet / Mobile |
| Hồ sơ năng lực | `/ve-goi` | Hồ Sơ Năng Lực Desktop / Tablet / Mobile |
| Chi tiết SKU | `/mau-hop/tt001` | PDP Desktop / Tablet / Mobile |
| Chi tiết 20 SKU còn lại | `/mau-hop/<mã>` | Cùng template PDP, thay tên, mã, ảnh, kích thước, thông số từ `js/skus.js` |

Trang chưa có thiết kế Figma (giữ giao diện cũ): bảng giá, dịch vụ, quy trình, thiết kế, cẩm nang, liên hệ, chính sách, 404.

## Nội dung còn chờ My duyệt (đang để đúng như bản thiết kế)
- MOQ "từ 50" (đã chốt set 100 ngày 12/10).
- "0đ tiền khuôn", "miễn phí 100% tiền khuôn" (chính sách: không tặng khuôn).
- "48h", "in mẫu 1 ngày", "maket 3D 15 phút" (chính sách: mẫu 3–7 ngày, làm riêng 7–10 ngày).
- Địa chỉ footer "Đường Lê Văn Khương" (xưởng: 36/6H Trần Thị Hè, P. Tân Thới Hiệp, Q.12).
- Số điện thoại "09xx xxx xxx" (link đã trỏ 0387 365 020).
- "RoHS 2.0 & CE", "10 năm", máy BOBST/Konica, "15.000 hộp/ngày".
- Giá trên trang TT001 (65.000đ → 19.000đ) chưa có nguồn từ Báo giá My. 20 trang SKU còn lại ghi "Báo giá".
- Câu sáo: "phá bỏ rào cản", "bài toán lớn nhất", "linh hồn thương hiệu", "hiệu ứng wow", "EST. 2018".

Sửa chữ trong Figma (page bản sao) rồi xuất lại code là web tự cập nhật theo.
