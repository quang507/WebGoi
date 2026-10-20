/**
 * Lưu yêu cầu báo giá từ web GÓI vào Google Sheet và gửi email báo ngay cho Quang.
 *
 * Cách cài (một lần):
 * 1. Tạo Google Sheet mới, đặt tên tab là "Yêu cầu".
 * 2. Menu Tiện ích mở rộng → Apps Script, xoá code mẫu, dán toàn bộ file này.
 * 3. Đổi SECRET bên dưới thành một chuỗi ngẫu nhiên (khoảng 24 ký tự). Repo này công khai nên đừng commit chuỗi thật.
 * 4. Triển khai → Tùy chọn triển khai mới → Loại: Ứng dụng web
 *    - Thực thi với tư cách: Tôi
 *    - Ai có quyền truy cập: Bất kỳ ai
 *    Bấm Triển khai, cấp quyền (cho phép đọc/ghi Sheet và gửi email bằng Gmail của bạn), chép "URL ứng dụng web".
 * 5. Trên Vercel (project goi) → Settings → Environment Variables:
 *    GOI_SHEET_WEBHOOK = URL vừa chép,  GOI_SHEET_SECRET = chuỗi SECRET ở bước 3.
 *    Deploy lại là web bắt đầu ghi vào Sheet.
 */
const SECRET = 'DOI-CHUOI-NAY'; // repo công khai: chuỗi thật chỉ nằm trong bản dán vào Apps Script
const NOTIFY = 'quanggooner1996@gmail.com'; // email nhận báo có yêu cầu mới (cách nhau bằng dấu phẩy nếu nhiều người)
const SHEET = 'Yêu cầu';
const COLS = ['Lúc', 'Nguồn', 'Tên / shop', 'SĐT Zalo', 'Tỉnh/Thành', 'Mẫu & số lượng', 'Ghi chú', 'Trang', 'Đã gọi?'];

function doPost(e) {
  let data;
  try { data = JSON.parse(e.postData.contents); } catch (err) { return json({ ok: false, error: 'bad_json' }); }
  if (!data || data.secret !== SECRET) return json({ ok: false, error: 'secret' });
  const r = data.row || {};
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET) || ss.insertSheet(SHEET);
  if (sh.getLastRow() === 0) { sh.appendRow(COLS); sh.setFrozenRows(1); }
  const when = r.luc ? new Date(r.luc) : new Date();
  // thêm dấu ' trước SĐT để Sheet không bỏ số 0 đầu
  sh.appendRow([when, r.nguon || '', r.ten || '', "'" + (r.sdt || ''), r.tinh || '', r.mau || '', r.ghichu || '', r.trang || '', false]);
  sh.getRange(sh.getLastRow(), COLS.length).insertCheckboxes();
  // báo ngay qua Gmail: bật thông báo app Gmail trên điện thoại là nhận được tức thì
  try {
    const sdt = String(r.sdt || '');
    const zalo = 'https://zalo.me/' + sdt.replace(/^\+?84/, '0');
    const body = [
      'Có yêu cầu báo giá mới từ web GÓI (' + (r.nguon || '') + ')', '',
      'Tên / shop: ' + (r.ten || '(không ghi)'),
      'SĐT Zalo: ' + sdt,
      'Tỉnh/Thành: ' + (r.tinh || '(không ghi)'),
      'Mẫu & số lượng:', (r.mau || '(không có)'),
      'Ghi chú: ' + (r.ghichu || '(không có)'),
      'Trang gửi: ' + (r.trang || ''), '',
      'Gọi: tel:' + sdt, 'Nhắn Zalo: ' + zalo,
      'Danh sách: ' + ss.getUrl()
    ].join('
');
    MailApp.sendEmail({ to: NOTIFY, subject: '[GÓI] Yêu cầu báo giá mới · ' + (r.ten || sdt), body: body });
  } catch (err) { /* email lỗi vẫn giữ dòng trong Sheet */ }
  return json({ ok: true });
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
