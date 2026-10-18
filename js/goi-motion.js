/* GÓI — vi tương tác & hiệu ứng cuộn cho các trang dựng từ Figma. Không phụ thuộc thư viện. */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || /[?&]static\b/.test(location.search);
  root.classList.add('js');
  if (/[?&]static\b/.test(location.search)) Array.prototype.forEach.call(d.images, function (i) { i.loading = 'eager'; });
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var visible = function (el) { return el.offsetParent !== null || getComputedStyle(el).position === 'fixed'; };

  // 1. Hiện dần khi cuộn tới
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  $$('[data-reveal],[data-crop],[data-cut],[data-draw],[data-drift]').forEach(function (el) { if (reduce) el.classList.add('is-in'); else io.observe(el); });

  // 2. Đếm số (400+, 50, 24h, 100%, 10 NĂM, 15.000 HỘP)
  var cio = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return; cio.unobserve(e.target);
      var el = e.target, raw = el.getAttribute('data-count'), m = raw.match(/^([\d.]+)(.*)$/);
      if (!m || reduce) return;
      var target = parseInt(m[1].replace(/\./g, ''), 10), suf = m[2], dot = m[1].indexOf('.') > -1, t0 = performance.now(), dur = 1100;
      (function step(t) {
        var k = Math.min(1, (t - t0) / dur), v = Math.round(target * (1 - Math.pow(1 - k, 3)));
        el.textContent = (dot ? v.toLocaleString('vi-VN') : v) + suf;
        if (k < 1) requestAnimationFrame(step); else el.textContent = raw;
      })(t0);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(function (el) { cio.observe(el); });

  // 3. Băng chữ chạy (nhân đôi nội dung để chạy vòng)
  $$('[data-marquee]').forEach(function (s) {
    var inner = s.firstElementChild; if (!inner || reduce) return;
    var wrap = d.createElement('div'); wrap.className = 'mq';
    var a = inner.cloneNode(true), b = inner.cloneNode(true); b.setAttribute('aria-hidden', 'true');
    [a, b].forEach(function (x) { x.style.paddingRight = '48px'; x.style.flexShrink = '0'; x.removeAttribute('data-reveal'); x.style.opacity = '1'; x.style.transform = 'none'; });
    wrap.appendChild(a); wrap.appendChild(b); s.replaceChild(wrap, inner);
  });

  // 4. Parallax nhẹ + thanh tiến độ + header dính
  var par = $$('[data-parallax]'), ticking = false;
  function onScroll() {
    var y = scrollY, h = root.scrollHeight - innerHeight;
    root.style.setProperty('--p', h > 0 ? (y / h).toFixed(4) : 0);
    d.body.classList.toggle('is-scrolled', y > 8);
    if (!reduce) par.forEach(function (el) {
      if (!visible(el)) return;
      var r = el.getBoundingClientRect(); if (r.bottom < -200 || r.top > innerHeight + 200) return;
      var k = parseFloat(el.getAttribute('data-parallax')) || 0;
      el.style.transform = 'translate3d(0,' + ((r.top + r.height / 2 - innerHeight / 2) * k).toFixed(1) + 'px,0)';
    });
    ticking = false;
  }
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll); onScroll();

  // 5. Nút "nam châm" nhẹ cho nút đỏ chính (chỉ chuột)
  if (!reduce && matchMedia('(hover: hover)').matches) $$('[data-btn="primary"]').forEach(function (b) {
    b.addEventListener('pointermove', function (e) {
      var r = b.getBoundingClientRect(), x = (e.clientX - r.left - r.width / 2) / r.width, y = (e.clientY - r.top - r.height / 2) / r.height;
      b.style.transform = 'translate(' + (x * 6).toFixed(1) + 'px,' + (y * 4).toFixed(1) + 'px)';
    });
    b.addEventListener('pointerleave', function () { b.style.transform = ''; });
  });

  // 6. Form báo giá nhanh: chọn loại, nhập kích thước, kéo số lượng, gửi qua Zalo
  var ZALO = 'https://zalo.me/0387365020';
  function toast(msg) {
    var t = document.querySelector('.goi-toast');
    if (!t) { t = document.createElement('div'); t.className = 'goi-toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('is-on'); clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('is-on'); }, 4200);
  }
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).catch(function () {});
    var a = document.createElement('textarea'); a.value = text; a.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(a); a.select();
    try { document.execCommand('copy'); } catch (e) {} a.remove();
  }
  $$('form[data-quote]').forEach(function (form) {
    var STEPS = $$('[data-name="Các Nấc Số Lượng"] p', form), track = form.querySelector('[data-slider-track]');
    var fill = form.querySelector('[data-slider-fill]'), thumb = form.querySelector('[data-slider-thumb]');
    var qtyP = $$('[data-name="Qty Header"] p', form)[1], sum = $$('[data-name="Summary"] span', form)[1];
    var pills = $$('[data-name="Types"] > *', form), type = pills[0] ? pills[0].textContent.trim() : '';
    var qty = qtyP ? qtyP.textContent.replace(/\s*cái/, '').trim() : '1.000';
    function render() {
      if (qtyP) qtyP.textContent = qty + ' cái';
      if (sum) sum.textContent = type + ' · ' + qty + ' cái';
    }
    pills.forEach(function (it) { it.addEventListener('click', function () { type = it.textContent.trim(); render(); }); });
    function scale() { return track.getBoundingClientRect().width / track.offsetWidth || 1; }
    function centers() {
      var r = track.getBoundingClientRect(), k = scale();
      return STEPS.map(function (p) { var q = p.getBoundingClientRect(); return (q.left + q.width / 2 - r.left) / k; });
    }
    function go(i) {
      var c = centers(); i = Math.max(0, Math.min(STEPS.length - 1, i));
      var x = Math.max(0, Math.min(track.offsetWidth, c[i]));
      if (fill) fill.style.width = x + 'px';
      if (thumb) thumb.style.left = (x - thumb.offsetWidth / 2) + 'px';
      STEPS.forEach(function (p, j) { p.classList.toggle('is-on', j === i); });
      qty = STEPS[i].textContent.trim(); form._i = i; render();
      if (track) track.setAttribute('aria-valuetext', qty + ' cái');
    }
    function nearest(clientX) {
      var r = track.getBoundingClientRect(), x = (clientX - r.left) / scale(), c = centers(), best = 0;
      c.forEach(function (v, j) { if (Math.abs(v - x) < Math.abs(c[best] - x)) best = j; }); return best;
    }
    if (track && STEPS.length) {
      var zone = track.parentElement, drag = false;
      form._i = Math.max(0, STEPS.map(function (p) { return p.textContent.trim(); }).indexOf(qty));
      track.setAttribute('role', 'slider'); track.setAttribute('aria-label', 'Số lượng'); track.tabIndex = 0;
      track.setAttribute('aria-valuemin', '0'); track.setAttribute('aria-valuemax', String(STEPS.length - 1));
      zone.style.touchAction = 'pan-y'; zone.style.cursor = 'pointer';
      zone.addEventListener('pointerdown', function (e) { drag = true; zone.setPointerCapture(e.pointerId); thumb && thumb.classList.add('is-drag'); go(nearest(e.clientX)); });
      zone.addEventListener('pointermove', function (e) { if (drag) go(nearest(e.clientX)); });
      zone.addEventListener('pointerup', function () { drag = false; thumb && thumb.classList.remove('is-drag'); });
      zone.addEventListener('pointercancel', function () { drag = false; thumb && thumb.classList.remove('is-drag'); });
      track.addEventListener('keydown', function (e) {
        if (/Arrow(Right|Up)/.test(e.key)) { e.preventDefault(); go(form._i + 1); }
        if (/Arrow(Left|Down)/.test(e.key)) { e.preventDefault(); go(form._i - 1); }
      });
      STEPS.forEach(function (p, j) { p.style.cursor = 'pointer'; p.addEventListener('click', function () { go(j); }); });
    }
    var sel = form.querySelector('select[data-goi-input]');
    if (sel) sel.addEventListener('change', function () { sel.classList.toggle('has-v', !!sel.value); });
    var btn = form.querySelector('[data-quote-submit]');
    if (btn) btn.addEventListener('click', function (e) {
      e.preventDefault();
      var v = function (n) { var x = form.querySelector('[name="' + n + '"]'); return x ? x.value.trim() : ''; };
      var phone = v('sdt').replace(/[\s.\-]/g, ''), box = form.querySelector('[name="sdt"]');
      if (!/^(0|\+?84)\d{9,10}$/.test(phone)) {
        if (box) { box.closest('[data-name]').classList.add('is-err'); box.focus(); }
        toast('Bạn nhập giúp số điện thoại Zalo để GÓI gửi báo giá nhé.'); return;
      }
      if (box) box.closest('[data-name]').classList.remove('is-err');
      var dims = [v('dai'), v('rong'), v('cao')], hasDim = dims.some(Boolean);
      var msg = ['GÓI ơi, mình cần báo giá:',
        '• Loại: ' + type,
        '• Kích thước: ' + (hasDim ? dims.map(function (d) { return d || '?'; }).join(' × ') + ' cm' : 'chưa có, nhờ GÓI tư vấn'),
        '• Số lượng: ' + qty + ' cái',
        '• Tên: ' + (v('ten') || '...'),
        '• SĐT Zalo: ' + phone,
        '• Giao tới: ' + (v('tinh') || '...')].join('\n');
      saveRequest({ source: 'form', page: location.pathname, ten: v('ten'), sdt: phone, tinh: v('tinh'), items: [{ loai: type, kichthuoc: hasDim ? dims.join('x') + ' cm' : '', sl: qty }], web: '' });
      copy(msg); toast('Đã chép nội dung báo giá. Dán vào khung chat Zalo của GÓI để gửi.');
      setTimeout(function () { window.open(ZALO, '_blank', 'noopener'); }, 350);
    });
  });
  // nút có sẵn nội dung tin nhắn (chọn gói, báo giá mẫu này): chép tin rồi mở Zalo
  $$('[data-zalo-msg]').forEach(function (a) {
    a.addEventListener('click', function () { copy(a.getAttribute('data-zalo-msg')); toast('Đã chép tin nhắn. Dán vào Zalo của GÓI để gửi.'); });
  });

  // gửi yêu cầu về máy chủ để lưu lại (không chặn việc mở Zalo nếu lỗi mạng)
  function saveRequest(data) {
    try {
      return fetch('/api/bao-gia', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), keepalive: true }).catch(function () {});
    } catch (e) { return Promise.resolve(); }
  }

  // 6b. Giỏ báo giá: gom nhiều mẫu, chọn số lượng, gửi một lần qua Zalo
  var cartRoot = document.querySelector('[data-cart]');
  if (cartRoot) (function () {
    var KEY = 'goi-cart-v1', QTY = ['100', '200', '300', '500', '1.000', '2.000', '5.000+'];
    var SKUS = {}; try { SKUS = JSON.parse(document.getElementById('goi-skus').textContent); } catch (e) {}
    var items = []; try { items = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) {}
    items = items.filter(function (it) { return SKUS[it.code]; });
    function store() { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {} }
    var views = $$('.goi-cart__v', cartRoot).map(function (v) {
      var list = v.querySelector('[data-name="Cart Items"]'), tpl = list && list.querySelector('[data-name="Cart Item"]');
      tpl = tpl && tpl.cloneNode(true); if (list) list.innerHTML = '';
      var frame = v.firstElementChild;
      var empty = document.createElement('div'); empty.className = 'goi-cart__empty';
      var et = cartRoot.querySelector('template[data-cart-empty]'); if (et) empty.appendChild(et.content.cloneNode(true));
      frame.appendChild(empty);
      return { v: v, list: list, tpl: tpl, frame: frame };
    });
    function setText(root, name, txt) { var n = root.querySelector('[data-name="' + name + '"]'); n = n && (n.tagName === 'P' ? n : (n.querySelector('p') || n)); if (n) n.textContent = txt; }
    function count() { return items.length; }
    function render() {
      $$('[data-cart-count]').forEach(function (b) { var p = b.querySelector('p'); if (p) p.textContent = count(); b.classList.toggle('is-zero', !count()); });
      views.forEach(function (w) {
        w.frame.classList.toggle('is-empty', !count());
        $$('[data-name="Cart Count Text"]', w.v).forEach(function (p) { p.textContent = '(' + count() + ' mẫu)'; });
        if (!w.list || !w.tpl) return;
        w.list.innerHTML = '';
        items.forEach(function (it, i) {
          var s = SKUS[it.code], row = w.tpl.cloneNode(true); row.setAttribute('data-i', i);
          setText(row, 'Code', it.code); setText(row, 'Title', s.n); setText(row, 'Size', s.s); setText(row, 'Qty Value', QTY[it.q] + ' cái');
          var img = row.querySelector('[data-name="Ảnh"] img'); if (img) { img.src = s.i; img.alt = s.n; }
          w.list.appendChild(row);
        });
      });
    }
    function visibleView() { return views.filter(function (w) { return getComputedStyle(w.v).display !== 'none'; })[0]; }
    function open() {
      render(); cartRoot.classList.add('is-open'); cartRoot.setAttribute('aria-hidden', 'false'); document.documentElement.classList.add('goi-cart-open');
      var w = visibleView(); var f = w && w.v.querySelector('[data-cart-close]'); if (f) f.focus();
    }
    function close() { cartRoot.classList.remove('is-open'); cartRoot.setAttribute('aria-hidden', 'true'); document.documentElement.classList.remove('goi-cart-open'); }
    function selectedQty(btn) {
      var bp = btn.closest('.bp'), on = bp && bp.querySelector('[data-tier].is-on'); if (!on) return 0;
      var i = QTY.indexOf(on.getAttribute('data-tier')); return i < 0 ? 0 : i;
    }
    function add(code, q) {
      var hit = items.filter(function (it) { return it.code === code; })[0];
      if (hit) { if (q > hit.q) hit.q = q; } else items.push({ code: code, q: q || 0 });
      store(); render();
      toast('Đã thêm ' + code + ' vào giỏ báo giá (' + count() + ' mẫu).');
    }
    document.addEventListener('click', function (e) {
      var a = e.target.closest('[data-cart-add]');
      if (a) { e.preventDefault(); e.stopPropagation(); add(a.getAttribute('data-cart-add'), selectedQty(a)); a.classList.remove('is-added'); void a.offsetWidth; a.classList.add('is-added'); return; }
      if (e.target.closest('[data-cart-open]')) { e.preventDefault(); open(); return; }
      if (e.target.closest('[data-cart-close]')) { e.preventDefault(); close(); return; }
      var row = e.target.closest('[data-name="Cart Item"]');
      if (row && cartRoot.contains(row)) {
        var i = +row.getAttribute('data-i'), it = items[i]; if (!it) return;
        if (e.target.closest('[data-name="Btn Giảm"]')) it.q = Math.max(0, it.q - 1);
        else if (e.target.closest('[data-name="Btn Tăng"]')) it.q = Math.min(QTY.length - 1, it.q + 1);
        else if (e.target.closest('[data-name="Btn Xoá"]')) items.splice(i, 1);
        else return;
        store(); render();
      }
    }, true);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && cartRoot.classList.contains('is-open')) close();
      var t = e.target;
      if ((e.key === 'Enter' || e.key === ' ') && t.matches && t.matches('[data-cart-open],[data-cart-add],[data-cart-close],[data-tier],[data-name="Btn Giảm"],[data-name="Btn Tăng"],[data-name="Btn Xoá"]')) { e.preventDefault(); t.click(); }
    });
    cartRoot.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cart-submit]'); if (!b) return; e.preventDefault();
      var w = visibleView(); if (!w) return;
      if (!count()) { toast('Giỏ đang trống. Chọn mẫu hộp trước nhé.'); return; }
      var v = function (n) { var x = w.v.querySelector('[name="' + n + '"]'); return x ? x.value.trim() : ''; };
      var phone = v('sdt').replace(/[\s.\-]/g, ''), box = w.v.querySelector('[name="sdt"]');
      if (!/^(0|\+?84)\d{9,10}$/.test(phone)) {
        if (box) { box.closest('[data-name]').classList.add('is-err'); box.focus(); }
        toast('Bạn nhập giúp số điện thoại Zalo để GÓI gửi báo giá nhé.'); return;
      }
      if (box) box.closest('[data-name]').classList.remove('is-err');
      var lines = items.map(function (it, i) { return (i + 1) + '. ' + it.code + ' · ' + SKUS[it.code].n + ' · ' + QTY[it.q] + ' cái'; });
      var msg = ['GÓI ơi, mình cần báo giá giỏ ' + count() + ' mẫu:'].concat(lines, ['• Tên: ' + (v('ten') || '...'), '• SĐT Zalo: ' + phone, '• Giao tới: ' + (v('tinh') || '...')], v('ghichu') ? ['• Ghi chú: ' + v('ghichu')] : []).join('\n');
      saveRequest({ source: 'gio', page: location.pathname, ten: v('ten'), sdt: phone, tinh: v('tinh'), ghichu: v('ghichu'), items: items.map(function (it) { return { code: it.code, ten: SKUS[it.code].n, sl: QTY[it.q] }; }), web: '' });
      copy(msg); toast('Đã chép nội dung giỏ báo giá. Dán vào khung chat Zalo của GÓI để gửi.');
      items = []; store(); render(); close();
      setTimeout(function () { window.open(ZALO, '_blank', 'noopener'); }, 350);
    });
    // nấc số lượng ở trang chi tiết (100 cái, 200 cái…): bấm để chọn số lượng khi thêm vào giỏ
    $$('.bp').forEach(function (bp) {
      var tiers = [];
      $$('p', bp).forEach(function (p) {
        var m = /^([\d.]+) cái$/.exec(p.textContent.trim()); if (!m || QTY.indexOf(m[1]) < 0) return;
        var tile = p.parentElement; if (!tile || p.closest('[data-cart]') || p.closest('form')) return;
        if (!tile.querySelector('p + p')) return; // ô nấc có cả dòng giá bên dưới
        tile.setAttribute('data-tier', m[1]); tile.setAttribute('role', 'button'); tile.tabIndex = 0; tiers.push(tile);
      });
      if (!tiers.length) return;
      // mặc định chọn ô thiết kế đang làm nổi (class khác các ô còn lại), nếu không có thì ô đầu
      var cls = tiers.map(function (t) { return t.className; });
      var odd = tiers.filter(function (t) { return cls.filter(function (c) { return c === t.className; }).length === 1; });
      (odd.length === 1 ? odd[0] : tiers[0]).classList.add('is-on');
      tiers.forEach(function (t) { t.addEventListener('click', function () { tiers.forEach(function (x) { x.classList.toggle('is-on', x === t); }); }); });
    });
    render();
  })();

  // chân trang mobile: ngăn kéo liên kết (mặc định gập, bấm tiêu đề để mở)
  $$('[data-name^="Ngăn "]').forEach(function (g, i) {
    var head = g.querySelector('[data-name="Ngăn Tiêu Đề"]'), body = g.querySelector('[data-name="Ngăn Nội Dung"]');
    if (!head || !body) return;
    var id = 'goi-ngan-' + i; body.id = id;
    head.setAttribute('role', 'button'); head.tabIndex = 0; head.setAttribute('aria-controls', id); head.setAttribute('aria-expanded', 'false');
    g.classList.add('goi-ngan');
    function toggle() {
      var open = !g.classList.contains('is-open'); g.classList.toggle('is-open', open); head.setAttribute('aria-expanded', String(open));
      body.style.maxHeight = open ? (body.scrollHeight + 16) + 'px' : '';
    }
    head.addEventListener('click', toggle);
    if (/[?&]static(&|$)/.test(location.search)) { g.classList.add('is-open'); head.setAttribute('aria-expanded', 'true'); body.style.maxHeight = 'none'; }
    head.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });

  // thẻ Facebook: cập nhật số người theo dõi (hàm /api/fb-followers, cache 1 giờ)
  var fbCount = $$('[data-fb-followers]');
  if (fbCount.length && window.fetch) fetch('/api/fb-followers').then(function (r) { return r.status === 200 ? r.json() : null; }).then(function (d) {
    if (!d || !d.followers) return;
    var n = Number(d.followers).toLocaleString('vi-VN');
    fbCount.forEach(function (p) { p.textContent = p.textContent.replace(/^[\d.,]+(?= người theo dõi)/, n); });
  }).catch(function () {});

  // nút lên đầu trang, nút tải hồ sơ (in ra PDF)
  $$('[data-name="Scroll to Top Button"]').forEach(function (b) {
    b.setAttribute('role', 'button'); b.tabIndex = 0; b.style.cursor = 'pointer'; b.setAttribute('aria-label', 'Lên đầu trang');
    function up() { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); }
    b.addEventListener('click', up); b.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); up(); } });
  });
  $$('a[href="#in-ho-so"]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); window.print(); }); });

  // 7. Thanh lọc / tab: bấm là chọn (đổi kiểu theo nút đang chọn trong thiết kế)
  $$('[data-name*="Bộ Lọc"],[data-name="Types"],[data-name*="Stepper"],[data-name*="Tabs"]').forEach(function (bar) {
    var items = Array.prototype.slice.call(bar.children); if (items.length < 2) return;
    var on = items[0].className, off = (items[1] || items[0]).className;
    var onP = items[0].querySelector('p'), offP = items[1] && items[1].querySelector('p');
    var onPC = onP && onP.className, offPC = offP && offP.className;
    items.forEach(function (it) {
      it.style.cursor = 'pointer'; it.setAttribute('role', 'button'); it.tabIndex = 0;
      it.addEventListener('click', function () {
        items.forEach(function (x) { x.className = off; var p = x.querySelector('p'); if (p && offPC) p.className = offPC; });
        it.className = on; var p = it.querySelector('p'); if (p && onPC) p.className = onPC;
      });
    });
  });
})();
