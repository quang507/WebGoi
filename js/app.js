/* GÓI v2 — tương tác: menu, sân khấu ảnh, đoạn cuộn gói lại, lọc mẫu, xem nhanh, ước tính, soạn tin Zalo. */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const G = window.GOI || { skus: {} };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const vnd = (n) => Math.round(n).toLocaleString('vi-VN') + 'đ';
  const trieu = (n) => (n / 1e6).toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/0$/, '').replace(/,$/, '');

  /* ---------- thông báo nhỏ ---------- */
  let toastEl, toastT;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('is-on');
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('is-on'), 3200);
  }

  /* ---------- Zalo: chép sẵn nội dung rồi mở khung chat ---------- */
  function openZalo(href, msg) {
    const go = () => window.open(href, '_blank', 'noopener');
    if (!msg || !navigator.clipboard) return go();
    navigator.clipboard.writeText(msg).then(() => { toast('Đã chép sẵn nội dung. Mở Zalo rồi dán vào ô chat.'); setTimeout(go, 900); }, go);
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-zalo]');
    if (!a) return;
    e.preventDefault(); openZalo(a.getAttribute('href'), a.getAttribute('data-zalo'));
  });

  /* ---------- menu lớn + ngăn kéo ---------- */
  $$('.nav__item').forEach((item) => {
    const btn = $('button', item); let t;
    const open = (v) => { item.classList.toggle('is-open', v); btn.setAttribute('aria-expanded', String(v)); };
    btn.addEventListener('click', () => open(!item.classList.contains('is-open')));
    if (canHover) {
      item.addEventListener('mouseenter', () => { clearTimeout(t); open(true); });
      item.addEventListener('mouseleave', () => { t = setTimeout(() => open(false), 160); });
    }
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') open(false); });
    document.addEventListener('click', (e) => { if (!item.contains(e.target)) open(false); });
  });
  const drawer = $('#drawer');
  if (drawer) {
    const set = (v) => { drawer.classList.toggle('is-open', v); document.documentElement.style.overflow = v ? 'hidden' : ''; };
    $$('[data-drawer]').forEach((b) => b.addEventListener('click', () => set(b.dataset.drawer === 'open')));
    $$('a', drawer).forEach((a) => a.addEventListener('click', () => set(false)));
  }

  /* ---------- sân khấu ảnh: nghiêng theo chuột, ánh kim, chế độ khuôn bế ---------- */
  const stage = $('[data-stage]');
  if (stage) {
    const card = $('.stage__card', stage), photos = $$('.stage__photo', stage), prints = $$('.stage__print img', stage), thumbs = $$('.stage__thumbs button', stage);
    const chipA = $('.stage__chip--a', stage), chipB = $('.stage__chip--b', stage), sw = $('.switch', stage), link = $('[data-stage-link]');
    const items = JSON.parse(stage.dataset.items || '[]');
    let cur = 0, auto, touched = false;
    function show(i) {
      cur = (i + items.length) % items.length;
      photos.forEach((p, k) => p.classList.toggle('is-on', k === cur));
      prints.forEach((p, k) => p.classList.toggle('is-on', k === cur));
      thumbs.forEach((t, k) => t.setAttribute('aria-pressed', String(k === cur)));
      const it = items[cur];
      chipA.innerHTML = '<b>' + it.meta + '</b>' + it.label; chipB.textContent = it.note;
      if (link) link.setAttribute('href', it.url);
    }
    thumbs.forEach((t, k) => t.addEventListener('click', () => { touched = true; clearInterval(auto); show(k); }));
    sw.addEventListener('click', () => { const v = sw.getAttribute('aria-pressed') !== 'true'; sw.setAttribute('aria-pressed', String(v)); stage.classList.toggle('is-print', v); touched = true; clearInterval(auto); });
    if (canHover && !reduced) {
      let raf = 0, ev;
      const apply = () => {
        raf = 0; const r = card.getBoundingClientRect();
        const x = clamp((ev.clientX - r.left) / r.width, 0, 1), y = clamp((ev.clientY - r.top) / r.height, 0, 1);
        card.style.setProperty('--ry', ((x - .5) * 11).toFixed(2) + 'deg'); card.style.setProperty('--rx', ((.5 - y) * 8).toFixed(2) + 'deg');
        card.style.setProperty('--px', ((.5 - x) * 16).toFixed(1) + 'px'); card.style.setProperty('--py', ((.5 - y) * 12).toFixed(1) + 'px');
        card.style.setProperty('--mx', (x * 100).toFixed(1) + '%'); card.style.setProperty('--my', (y * 100).toFixed(1) + '%'); card.style.setProperty('--sx', (100 - x * 100).toFixed(1) + '%');
      };
      card.addEventListener('pointermove', (e) => { ev = e; card.classList.add('is-live'); card.style.setProperty('--fo', '.9'); if (!raf) raf = requestAnimationFrame(apply); });
      card.addEventListener('pointerleave', () => { card.classList.remove('is-live'); ['--rx', '--ry', '--px', '--py'].forEach((k) => card.style.removeProperty(k)); card.style.setProperty('--fo', '0'); });
    }
    show(0);
    if (!reduced) auto = setInterval(() => { if (!touched && !document.hidden) show(cur + 1); }, 5200);
  }

  /* ---------- đoạn cuộn: khuôn → bản in → hộp → gói xong ---------- */
  const story = $('[data-story]');
  if (story) {
    const layers = $$('.story__layer', story).slice(1), steps = $$('.story__step', story), dots = $$('.story__meter span', story);
    const n = steps.length; let raf = 0;
    const pinned = () => matchMedia('(min-width: 960px)').matches;
    function tick() {
      raf = 0;
      if (!pinned()) { steps.forEach((s) => s.classList.add('is-on')); return; }
      const r = story.getBoundingClientRect(), total = r.height - innerHeight;
      const p = clamp(-r.top / Math.max(total, 1), 0, 1) * (n - 1);
      layers.forEach((l, i) => l.style.setProperty('--t', clamp((p - i) * 1.35 - .1, 0, 1).toFixed(3)));
      const act = clamp(Math.round(p - .12), 0, n - 1);
      steps.forEach((s, i) => s.classList.toggle('is-on', i === act)); dots.forEach((d, i) => d.classList.toggle('is-on', i <= act));
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on); tick();
    steps.forEach((s, i) => s.addEventListener('click', () => {
      if (!pinned()) return; const r = story.getBoundingClientRect();
      scrollTo({ top: scrollY + r.top + (r.height - innerHeight) * (i / (n - 1)), behavior: reduced ? 'auto' : 'smooth' });
    }));
  }

  /* ---------- lọc mẫu hộp ---------- */
  $$('[data-grid]').forEach((grid) => {
    const scope = grid.closest('[data-catalog]') || document, cards = $$('.sku', grid), limit = parseInt(grid.dataset.limit || '0', 10);
    const state = { group: 'all', need: 'all' }, empty = $('.empty', grid), count = $('[data-count]', scope);
    function apply() {
      let shown = 0;
      cards.forEach((c) => {
        const ok = (state.group === 'all' || c.dataset.group === state.group) && (state.need === 'all' || (' ' + c.dataset.needs + ' ').includes(' ' + state.need + ' '));
        const vis = ok && (!limit || shown < limit); c.hidden = !vis; if (vis) shown++;
      });
      if (empty) empty.hidden = shown > 0;
      if (count) count.textContent = shown + ' mẫu';
      $$('[data-f]', scope).forEach((b) => b.classList.toggle('is-on', state[b.dataset.f] === b.dataset.val));
    }
    $$('[data-f]', scope).forEach((b) => b.addEventListener('click', () => { state[b.dataset.f] = b.dataset.val; if (b.dataset.f === 'need') state.group = 'all'; else state.need = 'all'; apply(); }));
    const q = new URLSearchParams(location.search);
    if (q.get('nhom')) state.group = q.get('nhom'); if (q.get('can')) state.need = q.get('can');
    apply();
  });

  /* ---------- xem nhanh ---------- */
  const qv = $('#qv');
  if (qv) {
    const main = $('.qv__main', qv), mainImg = $('img', main), th = $('.qv__thumbs', qv);
    function pick(src, khuon, btn) { mainImg.src = src; main.classList.toggle('is-khuon', !!khuon); $$('button', th).forEach((b) => b.setAttribute('aria-pressed', String(b === btn))); }
    function open(slug) {
      const s = G.skus[slug]; if (!s) return;
      $('[data-q=code]', qv).textContent = s.code; $('[data-q=name]', qv).textContent = s.name; $('[data-q=desc]', qv).textContent = s.desc;
      $('[data-q=sizes]', qv).innerHTML = s.sizes.map((z) => '<div>' + (s.sizes.length > 1 ? z[0] + ': ' : '') + z[1] + '</div>').join('');
      $('[data-q=dim]', qv).textContent = s.dimNote; $('[data-q=holds]', qv).textContent = s.holds; $('[data-q=paper]', qv).textContent = s.paper; $('[data-q=finish]', qv).textContent = s.finish;
      $('[data-q=price]', qv).textContent = s.priced ? 'Từ 12.000đ một bộ, theo set 100' : 'Báo giá theo mẫu, trong ngày';
      $('[data-q=more]', qv).href = s.url;
      const z = $('[data-q=zalo]', qv); z.setAttribute('data-zalo', 'GÓI ơi, mình hỏi mẫu ' + s.code + ' (' + s.name + '). Món mình bán: ... Số lượng: ...');
      th.innerHTML = '';
      s.imgs.forEach((src, i) => { const b = document.createElement('button'); b.type = 'button'; b.innerHTML = '<img src="' + src + '" alt="Ảnh ' + (i + 1) + '">'; b.addEventListener('click', () => pick(src, false, b)); th.appendChild(b); });
      if (s.khuon) { const b = document.createElement('button'); b.type = 'button'; b.className = 'k'; b.innerHTML = '<img src="' + s.khuon + '" alt="Bản vẽ khuôn">'; b.addEventListener('click', () => pick(s.khuon, true, b)); th.appendChild(b); }
      pick(s.imgs[0], false, th.firstChild); mainImg.alt = s.name;
      qv.showModal();
    }
    document.addEventListener('click', (e) => { const b = e.target.closest('[data-qv]'); if (b) { e.preventDefault(); open(b.dataset.qv); } });
    $('.qv__close', qv).addEventListener('click', () => qv.close());
    qv.addEventListener('click', (e) => { if (e.target === qv) qv.close(); });
  }

  /* ---------- ảnh trang mẫu ---------- */
  $$('[data-gallery]').forEach((g) => {
    const main = $('.gallery__main img', g);
    $$('.gallery__thumbs button', g).forEach((b) => b.addEventListener('click', () => { main.src = b.dataset.src; $$('.gallery__thumbs button', g).forEach((x) => x.setAttribute('aria-pressed', String(x === b))); }));
  });

  /* ---------- ước tính ---------- */
  const est = $('[data-estimator]');
  if (est) {
    const UNIT = { hop: 6240, card: 1040, nhan: 728, hu: 12480, seal: 166.4 }, FIX = 624000, K = 0.9615;
    const PACK = { '': ['Gói Khởi Đầu', 1200000], 'card,nhan': ['Gói Đồng Bộ', 1370000], 'card,hu,nhan,seal': ['Gói Nâng Tầm', 2586000] };
    const LABEL = { card: 'thank card', nhan: 'nhãn phụ', hu: 'hũ nhựa 500 ml', seal: 'seal nhôm 82 mm' };
    const st = { item: 'hat', qty: 100, add: new Set(['card', 'nhan']) };
    const el = (k) => $('[data-e=' + k + ']', est);
    const total = (q, add) => K * (FIX + q * (UNIT.hop + [...add].reduce((s, k) => s + UNIT[k], 0)));
    function render() {
      const o = $('[data-est=item] [data-val="' + st.item + '"]', est), custom = o.dataset.custom, key = [...st.add].sort().join(',');
      const price = el('price'); price.classList.add('is-swap');
      setTimeout(() => {
        const t = total(st.qty, st.add), pack = PACK[key], exact = pack && st.qty === 100;
        if (custom) {
          price.textContent = 'Báo riêng trong ngày'; el('per').textContent = custom + ' khác giấy và khác cỡ, nên không dùng chung bảng giá hộp giấy gập.';
          el('pack').innerHTML = 'Tham khảo: hộp giấy gập từ <b>1.200.000đ</b> cho 100 bộ.'; el('items').textContent = 'Gửi ảnh món hàng và số lượng, GÓI báo đúng mẫu này.'; el('tip').hidden = true;
        } else {
          price.textContent = exact ? vnd(pack[1]) : 'Khoảng ' + trieu(Math.round(t / 10000) * 10000) + ' triệu';
          el('per').textContent = 'cho ' + st.qty + ' bộ, tức khoảng ' + vnd(Math.round((exact ? pack[1] : t) / st.qty / 100) * 100) + ' một bộ';
          el('pack').innerHTML = pack ? 'Đúng <b>' + pack[0] + '</b>' : 'Gần nhất: <b>' + (st.add.has('hu') ? 'Gói Nâng Tầm' : st.add.size ? 'Gói Đồng Bộ' : 'Gói Khởi Đầu') + '</b>, tuỳ chỉnh phụ kiện';
          el('items').textContent = ['Hộp giấy', 'in logo'].concat([...st.add].map((k) => LABEL[k])).join(' · ');
          const tip = el('tip'), next = st.qty === 100 ? 200 : st.qty === 200 ? 300 : 0;
          if (next) { const a = t / st.qty, b = total(next, st.add) / next; tip.hidden = false; tip.textContent = 'Lên ' + next + ' bộ, mỗi bộ còn khoảng ' + vnd(Math.round(b / 100) * 100) + ', rẻ hơn ' + Math.round((1 - b / a) * 100) + '%. Tiền in logo chia cho nhiều bộ hơn.'; }
          else { tip.hidden = false; tip.textContent = 'Từ 300 bộ trở lên GÓI tính giá riêng. Nhắn Zalo để có số chính xác.'; }
        }
        el('zalo').setAttribute('data-zalo', 'GÓI ơi, mình cần bao bì cho: ' + o.textContent.trim() + '. Số lượng: ' + st.qty + ' bộ. Phụ kiện: ' + ([...st.add].map((k) => LABEL[k]).join(', ') || 'không') + '. Mình gửi logo kèm theo.');
        price.classList.remove('is-swap');
      }, 130);
    }
    $$('[data-est]', est).forEach((fs) => {
      const kind = fs.dataset.est;
      $$('.opt', fs).forEach((b) => b.addEventListener('click', () => {
        if (kind === 'add') { const k = b.dataset.val, on = !st.add.has(k); on ? st.add.add(k) : st.add.delete(k); b.setAttribute('aria-pressed', String(on)); }
        else { st[kind] = kind === 'qty' ? +b.dataset.val : b.dataset.val; $$('.opt', fs).forEach((x) => x.setAttribute('aria-pressed', String(x === b))); }
        render();
      }));
    });
    render();
  }

  /* ---------- soạn tin gửi logo ---------- */
  const form = $('[data-compose]');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault(); const f = new FormData(form);
    const msg = 'GÓI ơi, mình là ' + (f.get('ten') || '...') + '. Món mình bán: ' + (f.get('mon') || '...') + '. Số lượng dự kiến: ' + (f.get('sl') || '...') + ' bộ. Gói quan tâm: ' + (f.get('goi') || 'chưa chọn') + '. Giao tới: ' + (f.get('tinh') || '...') + '. ' + (f.get('ghichu') || '') + ' Mình gửi logo kèm theo.';
    openZalo(form.dataset.compose, msg);
  });

  /* ---------- hiện khi cuộn, video ---------- */
  if (!reduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting || x.boundingClientRect.top < 0) { x.target.classList.add('is-in'); io.unobserve(x.target); } }), { rootMargin: '0px 0px -7% 0px' });
    $$('.reveal').forEach((n) => io.observe(n));
    $$('video[data-lazy]').forEach((v) => new IntersectionObserver((es) => es.forEach((x) => { x.isIntersecting ? v.play().catch(() => {}) : v.pause(); }), { threshold: .35 }).observe(v));
  } else $$('.reveal').forEach((n) => n.classList.add('is-in'));
})();
