// Nhận yêu cầu báo giá từ web (giỏ báo giá + form báo giá nhanh) và chuyển tới nơi lưu.
// Nơi lưu đặt bằng biến môi trường trên Vercel, không lộ ra trình duyệt:
//   GOI_SHEET_WEBHOOK  URL Web App của Google Apps Script (xem docs/apps-script-bao-gia.gs)
//   GOI_SHEET_SECRET   chuỗi bí mật, khớp với SECRET trong Apps Script
// Chưa đặt biến thì vẫn trả 202 để web không báo lỗi; khách vẫn gửi được qua Zalo.

const clip = (v, n) => String(v == null ? '' : v).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false }); }
  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = null; } }
  if (!b || typeof b !== 'object') return res.status(400).json({ ok: false, error: 'bad_json' });
  if (b.web) return res.status(202).json({ ok: true }); // ô bẫy bot

  const sdt = clip(b.sdt, 20).replace(/[\s.\-]/g, '');
  if (!/^(0|\+?84)\d{9,10}$/.test(sdt)) return res.status(400).json({ ok: false, error: 'sdt' });
  const items = (Array.isArray(b.items) ? b.items : []).slice(0, 30).map((it) => ({
    code: clip(it && it.code, 20), ten: clip(it && (it.ten || it.loai), 80), kichthuoc: clip(it && it.kichthuoc, 40), sl: clip(it && it.sl, 12)
  }));
  const row = {
    luc: new Date().toISOString(),
    nguon: b.source === 'gio' ? 'Giỏ báo giá' : 'Form báo giá nhanh',
    ten: clip(b.ten, 80), sdt, tinh: clip(b.tinh, 40), ghichu: clip(b.ghichu, 300),
    mau: items.map((it) => [it.code, it.ten, it.kichthuoc, it.sl && it.sl + ' cái'].filter(Boolean).join(' · ')).join('\n'),
    trang: clip(b.page, 120)
  };

  const url = process.env.GOI_SHEET_WEBHOOK;
  if (!url) return res.status(202).json({ ok: true, stored: false });
  try {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret: process.env.GOI_SHEET_SECRET || '', row }), redirect: 'follow' });
    return res.status(r.ok ? 200 : 502).json({ ok: r.ok, stored: r.ok });
  } catch (e) {
    return res.status(502).json({ ok: false, stored: false });
  }
};
