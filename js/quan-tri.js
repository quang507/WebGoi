/* Trang quản trị GÓI: xem yêu cầu báo giá, nhập giá từng dòng, đổi trạng thái, chép tin báo giá gửi khách. */
(function () {
  'use strict';
  var API = '/api/admin';
  var ST = [['moi', 'Mới'], ['da_goi', 'Đã gọi'], ['da_bao_gia', 'Đã báo giá'], ['chot', 'Chốt đơn'], ['huy', 'Huỷ']];
  var LABEL = {}; ST.forEach(function (s) { LABEL[s[0]] = s[1]; });
  var $ = function (id) { return document.getElementById(id); };
  var rows = [], filter = 'all', query = '', current = null, draft = null, dirty = false;

  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var norm = function (t) { return String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase(); };
  var money = function (n) { return (Math.round(n) || 0).toLocaleString('vi-VN'); };
  var qty = function (sl) { var n = parseInt(String(sl || '').replace(/\D/g, ''), 10); return n > 0 ? n : 0; };
  var zalo = function (sdt) { return 'https://zalo.me/' + String(sdt || '').replace(/^\+?84/, '0'); };
  function when(iso) {
    var d = new Date(iso), diff = (Date.now() - d) / 60000, p = function (x) { return String(x).padStart(2, '0'); };
    var abs = p(d.getHours()) + ':' + p(d.getMinutes()) + ' ' + p(d.getDate()) + '/' + p(d.getMonth() + 1);
    var rel = diff < 1 ? 'vừa xong' : diff < 60 ? Math.floor(diff) + ' phút trước' : diff < 1440 ? Math.floor(diff / 60) + ' giờ trước' : Math.floor(diff / 1440) + ' ngày trước';
    return abs + ' · ' + rel;
  }
  function total(items) { return (items || []).reduce(function (s, it) { return s + (it.gia || 0) * (qty(it.sl) || 0); }, 0); }
  function toast(msg) { var t = $('toast'); t.textContent = msg; t.hidden = false; clearTimeout(t._h); t._h = setTimeout(function () { t.hidden = true; }, 3200); }

  function api(a, opt) {
    opt = opt || {};
    return fetch(API + '?a=' + a + (opt.id ? '&id=' + opt.id : ''), {
      method: opt.method || 'GET', credentials: 'same-origin',
      headers: opt.body ? { 'Content-Type': 'application/json', 'X-GOI': '1' } : {},
      body: opt.body ? JSON.stringify(opt.body) : undefined
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { j.status = r.status; return j; }); });
  }

  // ---------- đăng nhập ----------
  function showLogin() { $('app').hidden = true; $('login').hidden = false; setTimeout(function () { $('login-form').user.focus(); }, 0); }
  $('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, btn = f.querySelector('button'), err = $('login-err');
    err.hidden = true; btn.setAttribute('aria-busy', 'true'); btn.textContent = 'Đang đăng nhập…';
    api('login', { method: 'POST', body: { user: f.user.value.trim(), pass: f.pass.value } }).then(function (j) {
      btn.removeAttribute('aria-busy'); btn.textContent = 'Đăng nhập';
      if (j.ok) { f.pass.value = ''; start(j.user); return; }
      err.textContent = j.error === 'chua_cau_hinh' ? 'Chưa đặt tài khoản quản trị trên máy chủ (biến GOI_ADMIN_USERS).' : 'Sai tên đăng nhập hoặc mật khẩu.';
      err.hidden = false;
    }).catch(function () { btn.removeAttribute('aria-busy'); btn.textContent = 'Đăng nhập'; err.textContent = 'Không kết nối được máy chủ. Thử lại.'; err.hidden = false; });
  });
  $('logout').addEventListener('click', function () { if (dirty && !confirm('Có thay đổi chưa lưu. Vẫn đăng xuất?')) return; api('logout', { method: 'POST' }).then(showLogin); });

  function start(user) { $('login').hidden = true; $('app').hidden = false; $('me').textContent = user; load(); }

  // ---------- danh sách ----------
  function load() {
    $('list').innerHTML = '<p class="qt-empty">Đang tải…</p>';
    api('list').then(function (j) {
      if (j.status === 401) return showLogin();
      if (!j.ok) { $('list').innerHTML = '<p class="qt-empty">Không tải được danh sách (' + esc(j.error || j.status) + ').</p>'; return; }
      rows = j.rows || []; renderTabs(); renderList();
      if (current) { var again = rows.filter(function (r) { return r.id === current.id; })[0]; if (again && !dirty) open(again); }
    });
  }
  function match(r) {
    if (filter !== 'all' && r.status !== filter) return false;
    if (!query) return true;
    var hay = norm([r.ten, r.sdt, r.tinh, r.ghichu, r.note, (r.items || []).map(function (i) { return [i.code, i.ten].join(' '); }).join(' ')].join(' '));
    return norm(query).split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; });
  }
  function renderTabs() {
    var count = { all: rows.length }; ST.forEach(function (s) { count[s[0]] = 0; }); rows.forEach(function (r) { count[r.status] = (count[r.status] || 0) + 1; });
    $('tabs').innerHTML = [['all', 'Tất cả']].concat(ST).map(function (s) {
      return '<button class="qt-tab" type="button" data-f="' + s[0] + '" aria-pressed="' + (filter === s[0]) + '">' + s[1] + '<b>' + (count[s[0]] || 0) + '</b></button>';
    }).join('');
  }
  function renderList() {
    var list = rows.filter(match);
    if (!list.length) { $('list').innerHTML = '<p class="qt-empty">' + (rows.length ? 'Không có yêu cầu nào khớp.' : 'Chưa có yêu cầu báo giá nào.') + '</p>'; return; }
    $('list').innerHTML = list.map(function (r) {
      var items = r.items || [], sum = total(items);
      var desc = items.map(function (i) { return (i.code ? i.code + ' ' : '') + (i.ten || '') + (i.sl && !i.them ? ' · ' + i.sl + ' cái' : ''); }).join(' / ') || '(không ghi mẫu)';
      return '<button class="qt-row" type="button" data-id="' + r.id + '" aria-current="' + (current && current.id === r.id) + '">' +
        '<span class="qt-row__top"><span class="qt-row__name">' + esc(r.ten || 'Khách chưa ghi tên') + '</span><span class="qt-pill st-' + esc(r.status) + '">' + esc(LABEL[r.status] || r.status) + '</span></span>' +
        '<span class="qt-row__meta">' + esc(r.sdt) + (r.tinh ? ' · ' + esc(r.tinh) : '') + ' · ' + esc(when(r.created_at)) + '</span>' +
        '<span class="qt-row__items">' + esc(desc) + '</span>' +
        (sum ? '<span class="qt-row__sum">' + money(sum) + 'đ</span>' : '') + '</button>';
    }).join('');
  }
  $('tabs').addEventListener('click', function (e) { var b = e.target.closest('[data-f]'); if (!b) return; filter = b.getAttribute('data-f'); renderTabs(); renderList(); });
  var tq; $('q').addEventListener('input', function (e) { clearTimeout(tq); tq = setTimeout(function () { query = e.target.value.trim(); renderList(); }, 150); });
  $('reload').addEventListener('click', function () { if (dirty && !confirm('Có thay đổi chưa lưu. Vẫn tải lại?')) return; dirty = false; load(); });
  $('list').addEventListener('click', function (e) {
    var b = e.target.closest('[data-id]'); if (!b) return;
    if (dirty && !confirm('Có thay đổi chưa lưu ở yêu cầu đang mở. Bỏ thay đổi?')) return;
    var r = rows.filter(function (x) { return String(x.id) === b.getAttribute('data-id'); })[0]; if (r) open(r);
  });

  // ---------- chi tiết ----------
  function open(r) {
    current = r; dirty = false;
    draft = { status: r.status, note: r.note || '', items: (r.items || []).map(function (i) { return Object.assign({}, i); }) };
    renderDetail(); renderList();
    $('detail').hidden = false; $('detail').scrollTop = 0;
    if (matchMedia('(max-width: 959.98px)').matches) document.body.style.overflow = 'hidden';
  }
  function close() {
    if (dirty && !confirm('Có thay đổi chưa lưu. Đóng không lưu?')) return;
    dirty = false; current = null; $('detail').hidden = true; document.body.style.overflow = ''; renderList();
  }
  function markDirty() { dirty = true; var d = $('dirty'); if (d) d.hidden = false; }
  function renderDetail() {
    var r = current, d = draft;
    var lines = d.items.map(function (it, i) {
      var tt = (it.gia || 0) * qty(it.sl);
      var name = it.them ? '<input class="qt-in-name" data-i="' + i + '" data-k="ten" value="' + esc(it.ten) + '" placeholder="Tên khoản (VD: phí vận chuyển)" aria-label="Tên khoản">'
        : (it.code ? '<span class="qt-code">' + esc(it.code) + '</span><br>' : '') + esc(it.ten || '') + (it.kichthuoc ? '<br><small>' + esc(it.kichthuoc) + '</small>' : '');
      return '<tr><td>' + name + '</td>' +
        '<td class="num">' + (it.them ? '<input data-i="' + i + '" data-k="sl" inputmode="numeric" value="' + esc(it.sl || '1') + '" aria-label="Số lượng">' : esc(it.sl || '—')) + '</td>' +
        '<td class="num"><input data-i="' + i + '" data-k="gia" inputmode="numeric" value="' + (it.gia != null ? money(it.gia) : '') + '" placeholder="đ/cái" aria-label="Đơn giá dòng ' + (i + 1) + '"></td>' +
        '<td class="num" data-tt="' + i + '">' + (tt ? money(tt) : '—') + '</td>' +
        '<td>' + (it.them ? '<button class="del" type="button" data-del="' + i + '" aria-label="Xoá dòng">✕</button>' : '') + '</td></tr>';
    }).join('');
    $('detail').innerHTML =
      '<div class="qt-detail__head"><div><h2>' + esc(r.ten || 'Khách chưa ghi tên') + '</h2><p class="qt-kv">#' + r.id + ' · ' + (r.source === 'gio' ? 'Giỏ báo giá' : 'Form báo giá nhanh') + ' · ' + esc(when(r.created_at)) + '</p></div>' +
      '<button class="qt-btn qt-btn--ghost" type="button" id="close" aria-label="Đóng chi tiết">Đóng</button></div>' +
      '<div class="qt-contact"><a class="qt-btn" href="tel:' + esc(r.sdt) + '">Gọi ' + esc(r.sdt) + '</a><a class="qt-btn" href="' + esc(zalo(r.sdt)) + '" target="_blank" rel="noopener">Nhắn Zalo ↗</a></div>' +
      '<p class="qt-kv">Giao tới: <b>' + esc(r.tinh || '(không ghi)') + '</b>' + (r.page ? ' · Gửi từ trang <b>' + esc(r.page) + '</b>' : '') + '</p>' +
      (r.ghichu ? '<p class="qt-note-kh"><b>Khách ghi chú:</b> ' + esc(r.ghichu) + '</p>' : '') +
      '<table class="qt-lines"><thead><tr><th>Mẫu</th><th class="num">SL</th><th class="num">Đơn giá</th><th class="num">Thành tiền</th><th></th></tr></thead><tbody>' + lines + '</tbody></table>' +
      '<button class="qt-btn qt-btn--ghost" type="button" id="add-line">+ Thêm khoản (phí vận chuyển, khuôn…)</button>' +
      '<p class="qt-total">Tổng (chưa VAT 8%) <b id="sum">' + money(total(d.items)) + 'đ</b></p>' +
      '<div><p class="qt-kv" style="margin-bottom:8px">Trạng thái</p><div class="qt-status" id="status">' + ST.map(function (s) {
        return '<button type="button" class="st-' + s[0] + '" data-s="' + s[0] + '" aria-pressed="' + (d.status === s[0]) + '">' + s[1] + '</button>'; }).join('') + '</div></div>' +
      '<label>Ghi chú nội bộ (khách không thấy)<textarea id="note" placeholder="VD: đã gọi 10h, khách hẹn gửi logo tối nay">' + esc(d.note) + '</textarea></label>' +
      '<div class="qt-actions"><button class="qt-btn qt-btn--primary" type="button" id="save">Lưu</button><button class="qt-btn" type="button" id="copy">Chép tin báo giá</button></div>' +
      '<p class="qt-dirty" id="dirty" hidden>Có thay đổi chưa lưu.</p>';
  }
  function refreshSums() {
    draft.items.forEach(function (it, i) { var c = $('detail').querySelector('[data-tt="' + i + '"]'); if (c) { var tt = (it.gia || 0) * qty(it.sl); c.textContent = tt ? money(tt) : '—'; } });
    $('sum').textContent = money(total(draft.items)) + 'đ';
  }
  $('detail').addEventListener('input', function (e) {
    var t = e.target;
    if (t.id === 'note') { draft.note = t.value; return markDirty(); }
    var i = t.getAttribute('data-i'), k = t.getAttribute('data-k'); if (i == null) return;
    var it = draft.items[+i];
    if (k === 'gia') { var n = parseInt(t.value.replace(/\D/g, ''), 10); it.gia = n >= 0 ? n : null; }
    else it[k] = t.value;
    refreshSums(); markDirty();
  });
  $('detail').addEventListener('blur', function (e) { // định dạng lại số tiền khi rời ô
    var t = e.target; if (t.getAttribute && t.getAttribute('data-k') === 'gia') { var it = draft.items[+t.getAttribute('data-i')]; t.value = it.gia != null ? money(it.gia) : ''; }
  }, true);
  $('detail').addEventListener('click', function (e) {
    var t = e.target;
    if (t.closest('#close')) return close();
    var s = t.closest('[data-s]'); if (s) { draft.status = s.getAttribute('data-s'); $('status').querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b === s)); }); return markDirty(); }
    if (t.closest('#add-line')) { draft.items.push({ ten: '', sl: '1', gia: null, them: true }); renderDetail(); markDirty(); var ins = $('detail').querySelectorAll('.qt-in-name'); if (ins.length) ins[ins.length - 1].focus(); return; }
    var del = t.closest('[data-del]'); if (del) { draft.items.splice(+del.getAttribute('data-del'), 1); renderDetail(); return markDirty(); }
    if (t.closest('#save')) return save(t.closest('#save'));
    if (t.closest('#copy')) return copyQuote();
  });
  function save(btn) {
    btn.setAttribute('aria-busy', 'true'); btn.textContent = 'Đang lưu…';
    var items = draft.items.filter(function (it) { return !it.them || it.ten || it.gia; });
    api('update', { method: 'PATCH', id: current.id, body: { status: draft.status, note: draft.note, items: items } }).then(function (j) {
      btn.removeAttribute('aria-busy'); btn.textContent = 'Lưu';
      if (j.status === 401) { toast('Phiên đăng nhập đã hết, đăng nhập lại.'); return showLogin(); }
      if (!j.ok) { toast('Chưa lưu được (' + (j.error || j.status) + '). Thử lại.'); return; }
      rows = rows.map(function (r) { return r.id === j.row.id ? j.row : r; });
      dirty = false; open(j.row); renderTabs(); toast('Đã lưu.');
    }).catch(function () { btn.removeAttribute('aria-busy'); btn.textContent = 'Lưu'; toast('Mất kết nối, chưa lưu được.'); });
  }
  function copyQuote() {
    var priced = draft.items.filter(function (it) { return it.gia; });
    if (!priced.length) { toast('Nhập đơn giá ít nhất một dòng trước khi chép tin.'); return; }
    var lines = priced.map(function (it, i) {
      var n = qty(it.sl) || 1;
      var name = (i + 1) + '. ' + [it.code, it.ten].filter(Boolean).join(' ') + (it.kichthuoc ? ' (' + it.kichthuoc + ')' : '');
      return it.them && n === 1 ? name + ': ' + money(it.gia) + 'đ' : name + ': ' + money(n) + ' × ' + money(it.gia) + 'đ = ' + money(n * it.gia) + 'đ';
    });
    var msg = ['GÓI gửi báo giá' + (current.ten ? ' cho ' + current.ten : '') + ':'].concat(lines,
      ['Tổng: ' + money(total(draft.items)) + 'đ', 'Giá chưa gồm VAT 8%. Báo giá có hiệu lực 30 ngày.', 'Cần chỉnh số lượng hay mẫu, mình nhắn GÓI nhé.']).join('\n');
    var done = function () { toast('Đã chép tin báo giá. Dán vào Zalo của khách.'); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(msg).then(done, function () { prompt('Chép tin dưới đây:', msg); });
    else prompt('Chép tin dưới đây:', msg);
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !$('detail').hidden) close(); });
  window.addEventListener('beforeunload', function (e) { if (dirty) { e.preventDefault(); e.returnValue = ''; } });

  // ---------- vào trang ----------
  api('me').then(function (j) { j.ok ? start(j.user) : showLogin(); }).catch(showLogin);
})();
