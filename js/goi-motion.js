/* GÓI — vi tương tác & hiệu ứng cuộn cho các trang dựng từ Figma. Không phụ thuộc thư viện. */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || /[?&]static\b/.test(location.search);
  root.classList.add('js');
  if (/[?&]static\b/.test(location.search)) Array.prototype.forEach.call(d.images, function (i) { i.loading = 'eager'; });
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var visible = function (el) { return el.offsetParent !== null || getComputedStyle(el).position === 'fixed'; };

  // 0. Nhịp cuộn: chia khối dài thành từng nhịp nhỏ trước khi gắn hiệu ứng
  //    - lưới thẻ: mỗi thẻ hiện riêng khi tới, trong một hàng chạy lần lượt trái → phải
  //    - tiêu đề lớn: chữ trồi lên khỏi mép như tờ in ra khỏi máy
  //    - ảnh: mở dần từ dưới lên, ảnh lớn trôi chậm hơn trang (chiều sâu)
  var activeBp = $$('.bp').filter(function (b) { return getComputedStyle(b).display !== 'none'; });
  var named = function (el) { return el.getAttribute('data-name') || ''; };
  var skipZone = '[data-sticky],[data-name^="Footer"],[data-name^="Topbar"],[data-name^="Breadcrumb"],[data-marquee],.goi-cart,.goi-menu';
  if (!reduce) activeBp.forEach(function (bp) {
    $$('[data-reveal]', bp).forEach(function (u) {
      if (u.closest(skipZone)) return;
      // bản thân khối là một hàng thẻ: mỗi thẻ hiện lần lượt trái → phải
      var us = getComputedStyle(u), uw = u.getBoundingClientRect().width, cards = Array.prototype.filter.call(u.children, function (c) { return !/^(Deco|Ô Trống|Spacer)/.test(named(c)); });
      if (us.display.indexOf('flex') > -1 && us.flexDirection === 'row' && cards.length > 1 && cards.every(function (c) { var r = c.getBoundingClientRect(); return r.width < uw * 0.6 && r.height >= 80; })) {
        var base = parseInt(u.style.getPropertyValue('--i'), 10) || 0; u.removeAttribute('data-reveal');
        cards.forEach(function (c, j) { c.setAttribute('data-reveal', ''); c.style.setProperty('--i', Math.min(j, 5) + (base ? 1 : 0)); });
        return;
      }
      if (u.getBoundingClientRect().height < innerHeight * 0.55) return;
      var group = null, q = [u];
      while (q.length && !group) {
        var n = q.shift(), kids = Array.prototype.filter.call(n.children, function (k) { return !/^(Deco|Ô Trống|Spacer)/.test(named(k)) && k.getBoundingClientRect().height >= 80; });
        if (n !== u && kids.length >= 2) group = n; else kids.forEach(function (k) { if (k.children.length) q.push(k); });
      }
      if (!group) return;
      var items = [];
      Array.prototype.forEach.call(group.children, function (k) {
        if (/^(Deco|Ô Trống|Spacer)/.test(named(k))) return;
        var cs = getComputedStyle(k), gw = group.getBoundingClientRect().width, row = cs.display.indexOf('flex') > -1 && cs.flexDirection === 'row' && k.children.length > 1 && Array.prototype.every.call(k.children, function (c) { return c.getBoundingClientRect().width < gw * 0.6; });
        if (row) Array.prototype.forEach.call(k.children, function (c, j) { if (!/^(Ô Trống|Deco)/.test(named(c))) items.push([c, j]); });
        else items.push([k, getComputedStyle(group).flexDirection === 'row' ? items.length : 0]);
      });
      if (items.length < 2) return;
      u.removeAttribute('data-reveal'); u.style.removeProperty('--i');
      items.forEach(function (it) { it[0].setAttribute('data-reveal', ''); it[0].style.setProperty('--i', Math.min(it[1], 5)); });
    });
    $$('p,h1,h2', bp).forEach(function (p) {
      if (p.closest(skipZone) || p.closest('a,[data-btn]') || parseFloat(getComputedStyle(p).fontSize) < 22 || p.textContent.length > 90) return;
      p.setAttribute('data-rise', ''); if (p.parentElement) p.parentElement.setAttribute('data-rise-host', ''); // chữ đang bị che kín nên theo dõi khung cha
    });
    $$('img', bp).forEach(function (im) {
      var box = im.parentElement; if (!box || box.closest(skipZone) || /^(Deco|Icon|Trailing|Leading)/.test(named(box))) return;
      var r = box.getBoundingClientRect(); if (r.width < 160 || r.height < 120) return;
      box.setAttribute('data-unmask', '');
      if (r.width >= 480 && !box.closest('[data-card]') && !box.hasAttribute('data-parallax') && box.children.length === 1) { im.setAttribute('data-depth', ''); box.style.overflow = 'hidden'; }
    });
  });

  // 1. Hiện dần khi cuộn tới
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  $$('[data-reveal],[data-crop],[data-cut],[data-draw],[data-drift],[data-unmask],[data-rise-host]').forEach(function (el) { if (reduce) el.classList.add('is-in'); else io.observe(el); });

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
  var par = $$('[data-parallax]'), depth = $$('[data-depth]'), ticking = false, lastY = scrollY;
  function onScroll() {
    var y = scrollY, h = root.scrollHeight - innerHeight;
    root.style.setProperty('--p', h > 0 ? (y / h).toFixed(4) : 0);
    d.body.classList.toggle('is-scrolled', y > 8);
    // header: cuộn xuống thì nhường chỗ cho nội dung, cuộn lên là hiện lại
    var dy = y - lastY;
    if (Math.abs(dy) > 6) { var busy = root.classList.contains('goi-menu-open') || root.classList.contains('goi-cart-open'); d.body.classList.toggle('goi-head-away', !reduce && !busy && dy > 0 && y > 480); lastY = y; }
    if (!reduce) par.forEach(function (el) {
      if (!visible(el)) return;
      var r = el.getBoundingClientRect(); if (r.bottom < -200 || r.top > innerHeight + 200) return;
      var k = parseFloat(el.getAttribute('data-parallax')) || 0;
      el.style.transform = 'translate3d(0,' + ((r.top + r.height / 2 - innerHeight / 2) * k).toFixed(1) + 'px,0)';
    });
    // ảnh lớn trôi chậm hơn khung chứa nó (ảnh phóng 8% để không lộ mép)
    if (!reduce) depth.forEach(function (im) {
      var r = im.parentElement.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight || !r.height) return;
      var k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      im.style.transform = 'translate3d(0,' + (k * -r.height * 0.06).toFixed(1) + 'px,0) scale(1.08)';
    });
    ticking = false;
  }
  // cuộn chuột có quán tính (chỉ chuột/trackpad trên máy tính; điện thoại giữ cuộn gốc)
  if (!reduce && matchMedia('(pointer: fine)').matches) (function () {
    var target = scrollY, cur = scrollY, raf = 0;
    function step() {
      cur += (target - cur) * 0.14; if (Math.abs(target - cur) < 0.6) cur = target;
      window.scrollTo({ top: cur, behavior: 'instant' }); raf = cur !== target ? requestAnimationFrame(step) : 0;
    }
    addEventListener('wheel', function (e) {
      if (e.ctrlKey || e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (root.classList.contains('goi-menu-open') || root.classList.contains('goi-cart-open') || (e.target.closest && e.target.closest('.goi-cart,.goi-menu,select,textarea'))) return;
      e.preventDefault();
      if (!raf) target = cur = scrollY;
      var dyw = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * innerHeight : e.deltaY;
      target = Math.max(0, Math.min(root.scrollHeight - innerHeight, target + dyw));
      if (!raf) raf = requestAnimationFrame(step);
    }, { passive: false });
  })();
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
  // ô nhập lỗi: viền đỏ + dòng nhắc ngay dưới ô (theo component "Trường Nhập/Lỗi")
  function markErr(input, on, text) {
    if (!input) return; var box = input.closest('[data-name]'); if (!box) return;
    box.classList.toggle('is-err', on);
    var m = box.nextElementSibling && box.nextElementSibling.classList.contains('goi-err-msg') ? box.nextElementSibling : null;
    if (on) { if (!m) { m = document.createElement('p'); m.className = 'goi-err-msg'; m.setAttribute('role', 'alert'); box.parentNode.insertBefore(m, box.nextSibling); } m.textContent = text || 'Bạn nhập giúp số điện thoại Zalo để GÓI gửi báo giá nhé.'; input.focus(); input.setAttribute('aria-invalid', 'true'); }
    else { if (m) m.remove(); input.removeAttribute('aria-invalid'); }
  }
  document.addEventListener('input', function (e) { if (e.target.matches && e.target.matches('[name="sdt"][aria-invalid]')) markErr(e.target, false); });
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
        markErr(box, true); return;
      }
      markErr(box, false);
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
      window.open(ZALO, '_blank', 'noopener');
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
      var sent = document.createElement('div'); sent.className = 'goi-cart__sent';
      var st = cartRoot.querySelector('template[data-cart-sent]'); if (st) sent.appendChild(st.content.cloneNode(true));
      frame.appendChild(sent);
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
    function close() { views.forEach(function (w) { w.frame.classList.remove('is-sent'); }); cartRoot.classList.remove('is-open'); cartRoot.setAttribute('aria-hidden', 'true'); document.documentElement.classList.remove('goi-cart-open'); }
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
        markErr(box, true); return;
      }
      markErr(box, false);
      var lines = items.map(function (it, i) { return (i + 1) + '. ' + it.code + ' · ' + SKUS[it.code].n + ' · ' + QTY[it.q] + ' cái'; });
      var msg = ['GÓI ơi, mình cần báo giá giỏ ' + count() + ' mẫu:'].concat(lines, ['• Tên: ' + (v('ten') || '...'), '• SĐT Zalo: ' + phone, '• Giao tới: ' + (v('tinh') || '...')], v('ghichu') ? ['• Ghi chú: ' + v('ghichu')] : []).join('\n');
      saveRequest({ source: 'gio', page: location.pathname, ten: v('ten'), sdt: phone, tinh: v('tinh'), ghichu: v('ghichu'), items: items.map(function (it) { return { code: it.code, ten: SKUS[it.code].n, sl: QTY[it.q] }; }), web: '' });
      copy(msg);
      // mở Zalo ngay trong cú bấm (iPhone chặn nếu mở trễ); nếu bị chặn, màn "Đã gửi" có nút Mở Zalo GÓI
      window.open(ZALO, '_blank', 'noopener');
      items = []; store(); render();
      views.forEach(function (x) { x.frame.classList.add('is-sent'); });
      var sb = w.v.querySelector('.goi-cart__sent a[href]'); if (sb) sb.focus();
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

  // liên hệ nhanh: bấm nút đỏ để xổ Facebook / Zalo / gọi; rời chuột, bấm ra ngoài hoặc Esc để thu lại
  var fab = d.querySelector('[data-fab]');
  if (fab) (function () {
    var btn = fab.querySelector('[data-fab-toggle]'); if (!btn) return;
    function set(open) { fab.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', String(open)); }
    btn.addEventListener('click', function (e) { e.preventDefault(); set(!fab.classList.contains('is-open')); });
    btn.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); } });
    if (matchMedia('(hover: hover)').matches) fab.addEventListener('mouseleave', function () { set(false); });
    d.addEventListener('click', function (e) { if (!fab.contains(e.target)) set(false); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && fab.classList.contains('is-open')) { set(false); btn.focus(); } });
  })();

  // menu mobile/tablet: mở từ nút ☰ ở header, đóng bằng nút X, nền mờ hoặc phím Esc
  var menu = document.querySelector('[data-menu]');
  if (menu) (function () {
    var last = null;
    $$('a[href]', menu).forEach(function (a) {
      var h = a.getAttribute('href'), path = location.pathname.replace(/\/$/, '') || '/';
      if (h === path || (h === '/mau-hop' && path.indexOf('/mau-hop') === 0)) a.setAttribute('aria-current', 'page');
    });
    function setOpen(open) {
      menu.classList.toggle('is-open', open); menu.setAttribute('aria-hidden', String(!open));
      document.documentElement.classList.toggle('goi-menu-open', open);
      $$('[data-menu-open]').forEach(function (b) { b.setAttribute('aria-expanded', String(open)); });
      if (open) { var c = menu.querySelector('[data-menu-close]:not(.goi-menu__scrim)'); if (c) c.focus(); }
      else if (last) last.focus();
    }
    document.addEventListener('click', function (e) {
      var o = e.target.closest('[data-menu-open]'); if (o) { e.preventDefault(); last = o; setOpen(true); return; }
      if (e.target.closest('[data-menu-close]')) { e.preventDefault(); setOpen(false); return; }
      if (menu.classList.contains('is-open') && e.target.closest('[data-menu] a[href]')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false);
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[data-menu-open],[data-menu-close]')) { e.preventDefault(); e.target.click(); }
    });
  })();

  // trang Mẫu hộp: lọc theo nhóm + tìm theo món bạn bán (không cần tải lại trang)
  if (document.body.getAttribute('data-page') === 'listing') (function () {
    var SK = {}; try { SK = JSON.parse(document.getElementById('goi-skus').textContent); } catch (e) {}
    var norm = function (t) { return (t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase().trim(); };
    var tpl = document.querySelector('template[data-empty-search]');
    var state = { f: 'all', q: '' }, applied = false;
    var qs = new URLSearchParams(location.search); if (qs.get('nhom')) state.f = qs.get('nhom'); if (qs.get('q')) state.q = qs.get('q');
    var views = $$('.bp').map(function (bp) {
      var cards = $$('[data-sku]', bp).filter(function (c) { return !c.parentElement.closest('[data-sku]'); });
      if (!cards.length) return null;
      var rows = []; cards.forEach(function (c) { if (rows.indexOf(c.parentElement) < 0) rows.push(c.parentElement); });
      var cap = rows.length > 1 ? rows[0].querySelectorAll(':scope > [data-sku]').length : 1e9;
      var hold = document.createElement('div'); hold.hidden = true; rows[0].parentElement.appendChild(hold);
      var empty = document.createElement('div'); empty.className = 'goi-empty-search'; empty.hidden = true;
      if (tpl) empty.appendChild(tpl.content.cloneNode(true));
      rows[0].parentElement.insertBefore(empty, rows[0]);
      return { bp: bp, cards: cards, rows: rows, cap: cap, hold: hold, empty: empty };
    }).filter(Boolean);
    function match(c) {
      var d = SK[c.getAttribute('data-sku')] || { g: [], k: '' };
      if (state.f !== 'all' && d.g.indexOf(state.f) < 0) return false;
      var q = norm(state.q); if (!q) return true;
      var hay = d.k + ' ' + norm(c.textContent);
      return q.split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; });
    }
    function apply() {
      views.forEach(function (v) {
        var vis = v.cards.filter(match);
        if (applied) vis.forEach(function (c) { c.classList.add('is-in'); $$('[data-reveal],[data-crop]', c).forEach(function (x) { x.classList.add('is-in'); }); });
        v.cards.forEach(function (c) { v.hold.appendChild(c); });
        if (v.cap === 1e9) vis.forEach(function (c) { v.rows[0].appendChild(c); });
        else vis.forEach(function (c, i) { v.rows[Math.floor(i / v.cap)].appendChild(c); });
        v.rows.forEach(function (r) { r.style.display = r.querySelector(':scope > [data-sku]') ? '' : 'none'; });
        v.empty.hidden = vis.length > 0;
        var t = v.empty.querySelector('[data-name="Empty Title"]'); if (t) t.textContent = state.q ? 'Chưa có mẫu khớp “' + state.q + '”' : 'Nhóm này chưa có mẫu';
      });
      $$('[data-filter]').forEach(function (b) { var on = b.getAttribute('data-filter') === state.f; b.setAttribute('aria-selected', String(on)); if (on && !b.classList.contains('is-on-tab')) { b.classList.add('is-on-tab'); } else if (!on) b.classList.remove('is-on-tab'); });
      $$('[data-sku-search]').forEach(function (i) { if (document.activeElement !== i) i.value = state.q; });
      var u = new URL(location.href); state.f === 'all' ? u.searchParams.delete('nhom') : u.searchParams.set('nhom', state.f); state.q ? u.searchParams.set('q', state.q) : u.searchParams.delete('q');
      history.replaceState(null, '', u.pathname + (u.search || '') + u.hash);
      applied = true;
    }
    var timer;
    document.addEventListener('input', function (e) { if (!e.target.matches('[data-sku-search]')) return; clearTimeout(timer); timer = setTimeout(function () { state.q = e.target.value; apply(); }, 160); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.matches('[data-sku-search],[data-filter],[data-search-tag]')) { e.preventDefault(); if (e.target.matches('[data-sku-search]')) { state.q = e.target.value; apply(); } else e.target.click(); } });
    document.addEventListener('click', function (e) {
      var f = e.target.closest('[data-filter]'); if (f) { state.f = f.getAttribute('data-filter'); apply(); return; }
      var t = e.target.closest('[data-search-tag]'); if (t) { state.q = t.getAttribute('data-search-tag'); apply(); return; }
      var g = e.target.closest('[data-search-go]'); if (g) { e.preventDefault(); var i = g.closest('.bp').querySelector('[data-sku-search]'); state.q = i ? i.value : ''; apply(); return; }
      if (e.target.closest('[data-filter-reset]')) { e.preventDefault(); state.f = 'all'; state.q = ''; apply(); var first = $$('[data-filter="all"]'); first.forEach(function (b) { b.click(); }); }
    });
    if (state.f !== 'all' || state.q) { $$('[data-filter="' + state.f + '"]').forEach(function (b) { b.click(); }); }
    apply();
  })();

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
