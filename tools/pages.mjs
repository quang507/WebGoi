// Danh sách trang dựng từ Figma (page "Design — DS fix (bản sao 18/10)").
import { readFileSync } from 'node:fs';
import path from 'node:path';

export const PAGES = [
  { file: 'index.html', url: '/', kind: 'home', frames: { d: 'home-d', t: 'home-t', m: 'home-m' },
    title: 'GÓI · Xưởng In Bao Bì Giấy Số Lượng Nhỏ', desc: 'Xưởng in bao bì giấy trực tiếp tại Quận 12, TP.HCM. Hộp quà Tết, hộp cứng, túi giấy in logo thương hiệu riêng.' },
  { file: 'mau-hop.html', url: '/mau-hop', kind: 'listing', frames: { d: 'listing-d', t: 'listing-t', m: 'listing-m' },
    title: 'Mẫu Hộp Có Sẵn · GÓI', desc: 'Các mẫu hộp và túi giấy GÓI có sẵn khuôn, in logo thương hiệu riêng theo set 100 sản phẩm.' },
  { file: 've-goi.html', url: '/ve-goi', kind: 'profile', frames: { d: 'profile-d', t: 'profile-t', m: 'profile-m' },
    title: 'Hồ Sơ Năng Lực Xưởng In · GÓI', desc: 'Hồ sơ năng lực xưởng in bao bì GÓI tại Tân Thới Hiệp, Quận 12, TP.HCM.' },
  { file: 'mau-hop/tt001.html', url: '/mau-hop/tt001', kind: 'pdp', frames: { d: 'pdp-d', t: 'pdp-t', m: 'pdp-m' },
    title: 'Hộp Thời Trang Âm Dương SKU-TT001 · GÓI', desc: 'Hộp thời trang âm dương nắp rời 320 × 250 × 70 mm, in logo thương hiệu riêng.' }
];

// ---------- Trang chi tiết cho các SKU khác: cùng template PDP của Figma, chỉ thay dữ liệu ----------
// Dữ liệu SKU thật lấy từ js/skus.js (21 SKU trong bản đồ sản phẩm GÓI).
const ROOT = path.resolve(import.meta.dirname, '..');
const raw = readFileSync(path.join(ROOT, 'js/skus.js'), 'utf8');
const SKUS = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1)).skus;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const TIME = 'Thời gian: mẫu 3–7 ngày, hàng làm riêng 7–10 ngày sau khi duyệt file';

// node id trong bản xuất PDP (bản gộp design/figma-export/batch-rest.jsx)
const N = {
  d: { title: '170:1238', meta: '170:1239', img: '170:1223', thumbs: ['170:1226', '170:1228', '170:1230', '170:1232'], prices: ['170:1244', '170:1248', '170:1252', '170:1256', '170:1260'], sizes: ['170:1265', '170:1267', '170:1269'], specs: ['170:1285', '170:1286', '170:1287', '170:1288', '170:1289', '170:1290'] },
  t: { title: '170:1352', img: '170:1343', thumbs: ['170:1345', '170:1346', '170:1347', '170:1348'], prices: ['170:1356', '170:1359', '170:1362', '170:1365', '170:1368'], specs: ['170:1374', '170:1375', '170:1376', '170:1377', '170:1378', '170:1379', '170:1380'] },
  m: { title: '170:1406', img: '170:1395', thumbs: ['170:1397', '170:1398', '170:1399', '170:1400'], prices: ['170:1410', '170:1413', '170:1416', '170:1419', '170:1422'], specs: ['170:1425', '170:1426', '170:1427', '170:1428', '170:1429', '170:1430', '170:1431'] }
};

function skuMutate(slug, s) {
  const sizes = s.sizes.map(([a, b]) => (a === b ? a : `${a}: ${b}`));
  const specs = [
    `• Kích thước: ${sizes.join(' · ')}`,
    `• Chất liệu: ${s.paper}`,
    `• Gia công: ${s.finish}`,
    `• Đựng vừa: ${s.holds}`,
    `• ${s.desc}`,
    `• ${TIME}`,
    `• Đặt theo set 100 sản phẩm, in logo thương hiệu riêng`
  ];
  const imgs = s.imgs.length ? s.imgs : [`/img/sku/${slug}-1.webp`];
  return (el, bp) => {
    const n = N[bp]; const q = (id) => el.querySelector(`[data-node-id="${id}"]`);
    // đoạn chữ nhiều kiểu (p có text-[0px] + span) -> giữ class của span đầu để không mất cỡ chữ
    const put = (x, t) => { const sp = x.querySelector('span'); if (sp) x.set_content(`<span class="${sp.getAttribute('class')}">${esc(t)}</span>`); else x.set_content(esc(t)); };
    const set = (id, t) => { const x = q(id); if (x) put(x, t); };
    set(n.title, bp === 'd' ? s.name.toUpperCase() : `${s.name} (${s.code})`);
    if (n.meta) set(n.meta, `Mã sản phẩm: ${s.code}   |   ${s.dimNote}`);
    n.prices.forEach((id) => set(id, 'Báo giá'));
    (n.sizes || []).forEach((id, i) => { const x = q(id); if (!x) return; if (sizes[i]) put(x, sizes[i]); else x.parentNode.setAttribute('style', 'display:none'); });
    n.specs.forEach((id, i) => specs[i] ? set(id, specs[i]) : null);
    const img = (id, src) => { const box = q(id); const im = box && (box.tagName === 'IMG' ? box : box.querySelector('img')); if (im) im.setAttribute('src', src); };
    img(n.img, imgs[0]);
    n.thumbs.forEach((id, i) => img(id, imgs[(i + 1) % imgs.length]));
    // breadcrumb + thanh dưới mobile
    el.querySelectorAll('p').forEach((p) => {
      const t = p.text.trim();
      if (/^Trang Chủ\s+\//.test(t)) put(p, `Trang Chủ  /  Mẫu Hộp  /  ${s.name}`);
      if (t === 'HC-0209') put(p, s.code);
      if (/^Từ [\d.]+đ\/cái$/.test(t)) put(p, 'Báo giá theo set 100');
    });
  };
}

export const SKU_PAGES = Object.entries(SKUS)
  .filter(([slug, s]) => /^SKU-/.test(s.code) && slug !== 'tt001')
  .map(([slug, s]) => ({
    file: `mau-hop/${slug}.html`, url: `/mau-hop/${slug}`, kind: 'pdp', frames: { d: 'pdp-d', t: 'pdp-t', m: 'pdp-m' },
    title: `${s.name} ${s.code} · GÓI`, desc: s.desc.slice(0, 155), mutate: skuMutate(slug, s)
  }));
export const RETIRED = Object.keys(SKUS).filter((slug) => !/^SKU-/.test(SKUS[slug].code));
