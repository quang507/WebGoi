// Nhận yêu cầu báo giá từ web (giỏ báo giá + form báo giá nhanh) và chuyển tới nơi lưu.
// Nơi lưu đặt bằng biến môi trường trên Vercel, không lộ ra trình duyệt:
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY  ghi vào bảng public.quote_requests (RLS khoá, chỉ service role ghi)
//   GOI_SHEET_WEBHOOK, GOI_SHEET_SECRET      (tuỳ chọn) chép thêm vào Google Sheet, xem docs/apps-script-bao-gia.gs
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

  const jobs = [];
  const sbUrl = process.env.SUPABASE_URL, sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (sbUrl && sbKey) {
    jobs.push(fetch(sbUrl.replace(/\/$/, '') + '/rest/v1/quote_requests', {
      method: 'POST',
      headers: { apikey: sbKey, Authorization: 'Bearer ' + sbKey, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ source: b.source === 'gio' ? 'gio' : 'form', ten: row.ten || null, sdt, tinh: row.tinh || null, ghichu: row.ghichu || null, items, page: row.trang || null })
    }).then((r) => r.ok));
  }
  const hook = process.env.GOI_SHEET_WEBHOOK;
  if (hook) {
    jobs.push(fetch(hook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret: process.env.GOI_SHEET_SECRET || '', row }), redirect: 'follow' }).then((r) => r.ok));
  }
  if (!jobs.length) return res.status(202).json({ ok: true, stored: false });
  const done = await Promise.all(jobs.map((j) => j.catch(() => false)));
  const stored = done.some(Boolean);
  return res.status(stored ? 200 : 502).json({ ok: stored, stored });
};
