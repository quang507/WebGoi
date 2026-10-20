// Trang quản trị GÓI (/quan-tri): đăng nhập, xem và cập nhật yêu cầu báo giá.
// Một hàm cho mọi việc (Vercel gói Hobby giới hạn số hàm): ?a=login | logout | me | list | update | history | qr
// Biến môi trường trên Vercel:
//   GOI_ADMIN_USERS            danh sách người dùng "my:matkhau,quang:matkhau" (tên chỉ gồm a-z 0-9 _ -)
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY   đã có (dùng chung với /api/bao-gia)
//   GOI_ADMIN_SECRET           (tuỳ chọn) khoá ký phiên; không đặt thì suy ra từ service role key
//   GOI_BANK_ID, GOI_BANK_ACCOUNT, GOI_BANK_NAME   tài khoản nhận cọc (Quang tự đặt) -> mã VietQR
// Phiên = cookie HttpOnly ký HMAC, 30 ngày. Lệnh ghi phải kèm header X-GOI: 1 (chặn gửi chéo trang).

const crypto = require('crypto');

const STATUSES = ['moi', 'da_goi', 'da_bao_gia', 'chot', 'da_coc', 'dang_in', 'da_giao', 'huy'];
const NEW_STATUSES = ['da_coc', 'dang_in', 'da_giao']; // cần chạy docs/supabase-quan-tri.sql
const COOKIE = 'goi_admin';
const DAY = 864e5;

const secret = () => crypto.createHash('sha256').update('goi-admin|' + (process.env.GOI_ADMIN_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || '')).digest();
const sign = (v) => crypto.createHmac('sha256', secret()).update(v).digest('base64url');
const digest = (s) => crypto.createHash('sha256').update(String(s)).digest();
const same = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };
const clip = (v, n) => String(v == null ? '' : v).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n);
// tiền là số nguyên đồng; bỏ mọi dấu chấm/phẩy ngăn nghìn ("12.500" = 12500)
const num = (v) => { const s = String(v == null ? '' : v).replace(/\D/g, ''); return s ? Math.min(Number(s), 1e12) : null; };

function users() {
  const out = {};
  for (const part of String(process.env.GOI_ADMIN_USERS || '').split(',')) {
    const i = part.indexOf(':'); if (i < 1) continue;
    const u = part.slice(0, i).trim().toLowerCase(), p = part.slice(i + 1).trim();
    if (/^[a-z0-9_-]{2,32}$/.test(u) && p.length >= 6) out[u] = p;
  }
  return out;
}

function who(req) {
  const m = new RegExp('(?:^|;\\s*)' + COOKIE + '=([^;]+)').exec(req.headers.cookie || '');
  if (!m) return null;
  const [u, exp, sig] = decodeURIComponent(m[1]).split('.');
  if (!u || !exp || !sig || !same(sig, sign(u + '.' + exp)) || Number(exp) < Date.now()) return null;
  return users()[u] ? u : null; // xoá người khỏi danh sách là phiên của họ hết hiệu lực ngay
}

function setCookie(res, value, maxAge) {
  res.setHeader('Set-Cookie', `${COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`);
}

async function sb(path, init = {}) {
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw Object.assign(new Error('no_db'), { code: 503 });
  const r = await fetch(url.replace(/\/$/, '') + '/rest/v1/' + path, {
    ...init, headers: { apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json', ...(init.headers || {}) }
  });
  if (!r.ok) { const t = await r.text().catch(() => ''); throw Object.assign(new Error('db_' + r.status), { code: 502, db: r.status, detail: t }); }
  return r.status === 204 ? null : r.json();
}

function body(req) {
  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = null; } }
  return b && typeof b === 'object' ? b : {};
}

// dòng hàng: giữ mã/tên/kích thước/số lượng khách gửi, thêm đơn giá (đ/cái) do GÓI nhập
function cleanItems(items) {
  return (Array.isArray(items) ? items : []).slice(0, 40).map((it) => ({
    code: clip(it && it.code, 20), ten: clip(it && (it.ten || it.loai), 80), kichthuoc: clip(it && it.kichthuoc, 40),
    sl: clip(it && it.sl, 12), gia: num(it && it.gia), them: !!(it && it.them)
  }));
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');
  const a = String((req.query && req.query.a) || '');
  try {
    if (a === 'login' && req.method === 'POST') {
      const list = users();
      if (!Object.keys(list).length) return res.status(503).json({ ok: false, error: 'chua_cau_hinh' });
      const b = body(req), u = clip(b.user, 32).toLowerCase(), p = String(b.pass || '');
      const ok = list[u] && crypto.timingSafeEqual(digest(p), digest(list[u]));
      if (!ok) { await new Promise((r) => setTimeout(r, 800)); return res.status(401).json({ ok: false, error: 'sai' }); }
      const exp = Date.now() + 30 * DAY, v = u + '.' + exp;
      setCookie(res, v + '.' + sign(v), 30 * 86400);
      return res.status(200).json({ ok: true, user: u });
    }
    if (a === 'logout') { setCookie(res, '', 0); return res.status(200).json({ ok: true }); }

    const user = who(req);
    if (a === 'me') return user ? res.status(200).json({ ok: true, user }) : res.status(401).json({ ok: false });
    if (!user) return res.status(401).json({ ok: false, error: 'dang_nhap' });

    if (a === 'list' && req.method === 'GET') {
      const rows = await sb('quote_requests?select=*&order=created_at.desc&limit=500');
      return res.status(200).json({ ok: true, rows });
    }
    if (a === 'update' && req.method === 'PATCH') {
      if (req.headers['x-goi'] !== '1') return res.status(403).json({ ok: false });
      const id = Number(req.query.id); if (!Number.isInteger(id) || id < 1) return res.status(400).json({ ok: false, error: 'id' });
      const b = body(req), patch = {};
      if (b.status !== undefined) { if (!STATUSES.includes(b.status)) return res.status(400).json({ ok: false, error: 'status' }); patch.status = b.status; }
      if (b.note !== undefined) patch.note = String(b.note == null ? '' : b.note).replace(/\r/g, '').replace(/[\u0000-\u0009\u000b-\u001f]/g, ' ').trim().slice(0, 2000) || null; // giữ xuống dòng
      if (b.items !== undefined) patch.items = cleanItems(b.items);
      if (!Object.keys(patch).length) return res.status(400).json({ ok: false, error: 'trong' });
      const go = (p) => sb('quote_requests?id=eq.' + id, { method: 'PATCH', headers: { Prefer: 'return=representation' }, body: JSON.stringify(p) });
      let rows;
      try { rows = await go({ ...patch, updated_by: user }); } catch (e) {
        // database chưa chạy SQL quản trị: chưa có cột updated_by / chưa nhận trạng thái mới
        if (e.db !== 400) throw e;
        if (patch.status && NEW_STATUSES.includes(patch.status)) return res.status(409).json({ ok: false, error: 'can_chay_sql' });
        rows = await go(patch);
      }
      if (!rows || !rows.length) return res.status(404).json({ ok: false });
      return res.status(200).json({ ok: true, row: rows[0], by: user });
    }
    if (a === 'qr' && req.method === 'GET') {
      // mã VietQR chuyển khoản cọc: tiền vào thẳng tài khoản ngân hàng của GÓI, nội dung "GOI <số yêu cầu>" để đối chiếu
      const bank = clip(process.env.GOI_BANK_ID, 20).replace(/[^A-Za-z0-9]/g, ''), acc = clip(process.env.GOI_BANK_ACCOUNT, 30).replace(/\D/g, ''), name = clip(process.env.GOI_BANK_NAME, 60);
      if (!bank || !acc) return res.status(503).json({ ok: false, error: 'chua_cau_hinh_ngan_hang' });
      const id = Number(req.query.id); if (!Number.isInteger(id) || id < 1) return res.status(400).json({ ok: false, error: 'id' });
      const amount = num(req.query.amount); if (!amount || amount < 1000) return res.status(400).json({ ok: false, error: 'so_tien' });
      const info = 'GOI ' + id;
      const url = `https://api.vietqr.io/image/${encodeURIComponent(bank)}-${acc}-compact2.jpg?amount=${amount}&addInfo=${encodeURIComponent(info)}` + (name ? `&accountName=${encodeURIComponent(name)}` : '');
      return res.status(200).json({ ok: true, url, amount, info, bank, name, acc_tail: acc.slice(-4) });
    }
    if (a === 'history' && req.method === 'GET') {
      const id = Number(req.query.id); if (!Number.isInteger(id) || id < 1) return res.status(400).json({ ok: false, error: 'id' });
      try { return res.status(200).json({ ok: true, rows: await sb('quote_events?request_id=eq.' + id + '&order=at.desc&limit=50') }); }
      catch (e) { if (e.db === 404 || e.db === 400) return res.status(200).json({ ok: true, rows: [], chua_co: true }); throw e; }
    }
    return res.status(404).json({ ok: false });
  } catch (e) {
    return res.status(e.code || 500).json({ ok: false, error: e.message });
  }
};
