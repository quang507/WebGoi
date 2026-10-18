# Bật số người theo dõi Facebook tự cập nhật

Thẻ Facebook ở chân trang lấy số người theo dõi từ `/api/fb-followers` (cache 1 giờ). Chưa cài thì web hiện con số trong thiết kế Figma.

## Cài một lần (người quản trị trang GÓI làm)

1. Vào https://developers.facebook.com → **My Apps** → **Create App** → chọn loại **Business** (hoặc "Other" → Business). Đặt tên ví dụ `GOI Web`.
2. Trong app, mở **Tools → Graph API Explorer**:
   - Meta App: chọn `GOI Web`.
   - User or Page: chọn **Get Page Access Token**, đăng nhập và tick trang **GÓI**.
   - Quyền cần: `pages_read_engagement` (và `pages_show_list` để chọn trang).
   - Bấm **Generate Access Token**, chọn trang GÓI ở ô "User or Page" → chép token của trang.
3. Đổi sang token **dài hạn** (không hết hạn): mở **Tools → Access Token Debugger**, dán token → **Extend Access Token**. Dùng token trang lấy từ user token dài hạn thì token trang không hết hạn.
4. Thử: trong Graph API Explorer gọi `61593633389379?fields=followers_count` — thấy số là được.
5. Gửi token cho Claude để gắn vào Vercel, hoặc tự gắn: Vercel → project **goi** → Settings → Environment Variables:
   - `FB_PAGE_ID` = `61593633389379`
   - `FB_PAGE_TOKEN` = token trang (đánh dấu Sensitive)
   rồi deploy lại.

Token này chỉ đọc số liệu công khai của trang, nằm trên máy chủ Vercel, không lộ ra trình duyệt. Nếu đổi mật khẩu Facebook hoặc gỡ quyền app, làm lại bước 2–5.
