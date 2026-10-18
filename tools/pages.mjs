// Danh sách trang dựng từ Figma (page "Design — DS fix (bản sao 18/10)").
import { readFileSync } from 'node:fs';
import path from 'node:path';

export const PAGES = [
  { file: 'index.html', url: '/', kind: 'home', frames: { d: 'home-d', t: 'home-t', m: 'home-m' },
    title: 'GÓI · Xưởng In Bao Bì Giấy Số Lượng Nhỏ', desc: 'Xưởng in bao bì giấy trực tiếp tại Quận 12, TP.HCM. Hộp quà Tết, hộp cứng, túi giấy in logo thương hiệu riêng.' },
  { file: 'mau-hop.html', url: '/mau-hop', kind: 'listing', frames: { d: 'listing-d', t: 'listing-t', m: 'listing-m' },
    title: 'Mẫu Hộp Có Sẵn · GÓI', desc: 'Các mẫu hộp và túi giấy GÓI có sẵn thiết kế, in logo thương hiệu riêng theo set 100 sản phẩm.' },
  { file: 've-goi.html', url: '/ve-goi', kind: 'profile', frames: { d: 'profile-d', t: 'profile-t', m: 'profile-m' },
    title: 'Hồ Sơ Năng Lực Xưởng In · GÓI', desc: 'Hồ sơ năng lực xưởng in bao bì GÓI tại Tân Thới Hiệp, Quận 12, TP.HCM.' },
  { file: 'mau-hop/tt001.html', url: '/mau-hop/tt001', kind: 'pdp', frames: { d: 'pdp-d', t: 'pdp-t', m: 'pdp-m' },
    title: 'Hộp Thời Trang Âm Dương SKU-TT001 · GÓI', desc: 'Hộp thời trang âm dương nắp rời 320 × 250 × 70 mm, in logo thương hiệu riêng.',
    khuon: '/img/khuon/tt001.svg?v=10181655', skuName: 'Hộp thời trang âm dương', skuCode: 'SKU-TT001' }
];

// ---------- Trang chi tiết cho các SKU khác: cùng template PDP của Figma, chỉ thay dữ liệu ----------
// Dữ liệu SKU thật lấy từ js/skus.js (21 SKU trong bản đồ sản phẩm GÓI).
const ROOT = path.resolve(import.meta.dirname, '..');
const raw = readFileSync(path.join(ROOT, 'js/skus.js'), 'utf8');
const SKUS = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1)).skus;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const TIME = 'Thời gian: mẫu 3–7 ngày, hàng làm riêng 7–10 ngày sau khi duyệt file';

function skuMutate(slug, s) {
  const sizes = s.sizes.map(([a, b]) => (a === b ? a : `${a}: ${b}`));
  const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
  const specs = [
    `• Kích thước: ${sizes.join(' · ')}`,
    `• Kiểu dáng: ${s.finish.replace(/\.$/, '').toLowerCase()}`,
    `• ${s.desc}`,
    `• Đựng vừa: ${s.holds.replace(/\.$/, '').toLowerCase()}`,
    `• Chất liệu: ${s.paper.replace(/\.$/, '').toLowerCase()}`,
    `• ${TIME}`,
    `• Đặt theo set 100 sản phẩm, in logo thương hiệu riêng`
  ];
  const imgs = s.imgs.length ? s.imgs : [`/img/sku/${slug}-1.webp`];
  return (el) => {
    // đoạn chữ nhiều kiểu (p có text-[0px] + span) -> giữ class của span đầu để không mất cỡ chữ
    const put = (x, t) => { const sp = x.querySelector('span'); if (sp) x.set_content(`<span class="${sp.getAttribute('class')}">${esc(t)}</span>`); else x.set_content(esc(t)); };
    const bullets = [];
    el.querySelectorAll('p').forEach((p) => {
      const t = p.text.replace(/\s+/g, ' ').trim();
      if (t === 'HỘP THỜI TRANG ÂM DƯƠNG NẮP RỜI') put(p, s.name.toUpperCase());
      else if (t === 'Hộp Thời Trang Âm Dương Nắp Rời (SKU-TT001)') put(p, `${cap(s.name)} (${s.code})`);
      else if (t === 'Hộp Âm Dương SKU-TT001') put(p, `${cap(s.name)} ${s.code}`);
      else if (/^Mã sản phẩm: SKU-TT001/.test(t)) p.querySelectorAll('span').forEach((sp) => { const x = sp.text; if (x.includes('SKU-TT001') || x.includes('Âm dương nắp rời')) sp.set_content(esc(x.replace('SKU-TT001', s.code).replace('Âm dương nắp rời', cap(s.finish.replace(/\.$/, '').split(',')[0].trim())))); });
      else if (/^Kiểu dáng: Âm dương nắp rời/.test(t)) put(p, `Kiểu dáng: ${s.finish.replace(/\.$/, '')}`);
      else if (/^Đáy: /.test(t)) put(p, sizes[0]);
      else if (/^Nắp: /.test(t)) { if (sizes[1]) put(p, sizes[1]); else p.parentNode.setAttribute('style', 'display:none'); }
      else if (/^Trang Chủ \/ Mẫu Hộp \//.test(t)) put(p, `Trang Chủ  /  Mẫu Hộp  /  ${cap(s.name)} ${s.code}`);
      else if (t === 'SKU-TT001') put(p, s.code);
      else if (/^• /.test(t)) bullets.push(p);
    });
    // 6 dòng (desktop) bỏ dòng "set 100" cuối; 7 dòng (tablet/mobile) dùng đủ
    bullets.forEach((p, i) => put(p, specs[i] || ''));
    const main = el.querySelectorAll('[data-name^="Ảnh Lớn"] img, [data-name^="Ảnh Hero"] img');
    main.forEach((im) => im.setAttribute('src', imgs[0]));
    el.querySelectorAll('[data-name^="Dải Ảnh Thumbnail"], [data-name^="Dải Thumbnails"]').forEach((row) =>
      row.querySelectorAll('img').forEach((im, i) => im.setAttribute('src', imgs[(i + 1) % imgs.length])));
  };
}

export const SKU_PAGES = Object.entries(SKUS)
  .filter(([slug, s]) => /^SKU-/.test(s.code) && slug !== 'tt001')
  .map(([slug, s]) => ({
    file: `mau-hop/${slug}.html`, url: `/mau-hop/${slug}`, kind: 'pdp', frames: { d: 'pdp-d', t: 'pdp-t', m: 'pdp-m' },
    title: `${s.name} ${s.code} · GÓI`, desc: s.desc.slice(0, 155), mutate: skuMutate(slug, s),
    khuon: s.khuon, skuName: s.name, skuCode: s.code
  }));
export const RETIRED = Object.keys(SKUS).filter((slug) => !/^SKU-/.test(SKUS[slug].code));
