/**
 * Lưu yêu cầu báo giá từ web GÓI vào Google Sheet.
 *
 * Cách cài (một lần):
 * 1. Tạo Google Sheet mới, đặt tên tab là "Yêu cầu".
 * 2. Menu Tiện ích mở rộng → Apps Script, xoá code mẫu, dán toàn bộ file này.
 * 3. Đổi SECRET bên dưới thành một chuỗi bất kỳ (ví dụ 20 ký tự ngẫu nhiên).
 * 4. Triển khai → Tùy chọn triển khai mới → Loại: Ứng dụng web
 *    - Thực thi với tư cách: Tôi
 *    - Ai có quyền truy cập: Bất kỳ ai
 *    Bấm Triển khai, cấp quyền, chép "URL ứng dụng web".
 * 5. Trên Vercel (project goi) → Settings → Environment Variables:
 *    GOI_SHEET_WEBHOOK = URL vừa chép,  GOI_SHEET_SECRET = chuỗi SECRET ở bước 3.
 *    Deploy lại là web bắt đầu ghi vào Sheet.
 */
const SECRET = 'DOI-CHUOI-NAY';
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
  return json({ ok: true });
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
