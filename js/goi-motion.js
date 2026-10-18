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

  // 6. Thanh kéo số lượng trong widget báo giá
  var STEPS = ['50', '100', '200', '500', '1.000', '2.000', '5.000'];
  $$('[data-slider-track]').forEach(function (track) {
    var fill = track.querySelector('[data-slider-fill]'), thumb = track.querySelector('[data-slider-thumb]');
    var box = track.closest('[data-name*="Slider"],[data-name*="Form"],[data-name*="Widget"]') || track.parentElement;
    var label = $$('p', box).filter(function (p) { return /ĐANG CHỌN/i.test(p.textContent); })[0];
    function set(clientX) {
      var r = track.getBoundingClientRect(), k = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
      var i = Math.round(k * (STEPS.length - 1)), kk = i / (STEPS.length - 1);
      if (fill) fill.style.width = (kk * 100) + '%';
      if (thumb) thumb.style.left = 'calc(' + (kk * 100) + '% - ' + (thumb.offsetWidth / 2) + 'px)';
      if (label) label.textContent = label.textContent.replace(/[\d.]+ CÁI/i, STEPS[i] + ' CÁI');
    }
    var drag = false;
    track.addEventListener('pointerdown', function (e) { drag = true; track.setPointerCapture(e.pointerId); thumb && thumb.classList.add('is-drag'); set(e.clientX); });
    track.addEventListener('pointermove', function (e) { if (drag) set(e.clientX); });
    track.addEventListener('pointerup', function () { drag = false; thumb && thumb.classList.remove('is-drag'); });
  });

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
