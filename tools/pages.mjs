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

// Nhóm sản phẩm cho bộ lọc trang Mẫu hộp và "mẫu cùng nhóm" ở trang chi tiết (một mã có thể thuộc nhiều nhóm)
export const GROUPS = {
  qt: { label: 'Quà Tết', slugs: ['dst01', 'dst02', 'qxs', 'hopqua01', 'bc001', 'lx200', 'lx500', 'lx1000', 'goi', 'pk001'] },
  tp: { label: 'Thực phẩm & hạt', slugs: ['qxs', 'hopqua01', 'lx200', 'lx500', 'lx1000', 'bc001', 'mat01', 'dai', 'tqh01', 'vch01', 'tdl01'] },
  tt: { label: 'Thời trang & quà tặng', slugs: ['tt001', 'dst02', 'goi', 'tgt01', 'mailer', 'tr001', 'eco'] },
  tem: { label: 'Tem, đai & phụ kiện', slugs: ['dai', 'nhan01', 'tdl01', 'tqh01', 'vch01', 'pk001'] }
};
// nhóm hẹp (ít mã) đứng trước để "mẫu cùng nhóm" sát nghĩa nhất
// từ khoá khách hay gõ (không dấu cũng được), gắn thêm vào mã khi tìm
const KEYWORDS = {
  lx200: 'lạp xưởng khô bò khô gà mứt đồ khô', lx500: 'lạp xưởng khô bò khô gà mứt đồ khô nửa ký', lx1000: 'lạp xưởng khô bò khô gà đồ khô 1 ký',
  qxs: 'hũ hạt hạt điều mắc ca hạt dinh dưỡng yến sào mứt', hopqua01: 'hũ hạt hạt điều mắc ca hũ nhựa 500 ml yến', bc001: 'bánh chưng giò chả giò lụa',
  dst01: 'quà tết quà biếu 4 món giỏ quà', dst02: 'quà biếu cao cấp nam châm', goi: 'quà nhỏ trang sức son mỹ phẩm',
  tt001: 'áo dài khăn lụa thời trang quần áo', tgt01: 'túi giấy quai xách shop thời trang', mailer: 'ship cod giao hàng quần áo online', eco: 'ship cod quần áo giày dép',
  tr001: 'trà cà phê ống giấy', mat01: 'đồ mát đông lạnh hải sản thịt', dai: 'đai giấy túi hút chân không', nhan01: 'nhãn logo sticker', tdl01: 'tem định lượng trọng lượng', tqh01: 'tem dán hũ', vch01: 'vòng cổ hũ nắp hũ', pk001: 'thiệp tết hangtag sticker ruy băng thiệp cảm ơn'
};
const groupsOf = (slug) => Object.keys(GROUPS).filter((g) => GROUPS[g].slugs.includes(slug)).sort((a, b) => GROUPS[a].slugs.length - GROUPS[b].slugs.length);
// 4 mẫu liên quan: cùng nhóm đầu tiên, rồi bù bằng nhóm kế tiếp
function relatedOf(slug) {
  const fam = slug.replace(/\d+$/, ''); const out = Object.keys(SKUS).filter((x) => x !== slug && /^SKU-/.test(SKUS[x].code) && x.replace(/\d+$/, '') === fam && /\d$/.test(x));
  for (const g of [...groupsOf(slug), ...Object.keys(GROUPS)]) for (const x of GROUPS[g].slugs) if (x !== slug && !out.includes(x) && SKUS[x]) out.push(x);
  return out.slice(0, 4);
}
const TT001_CHIPS = ['Nắp rời', 'Giấy nến bọc trong', 'Sticker niêm phong'];

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
    // chip "Gia công & hoàn thiện": tách từ dữ liệu finish của mã, thiếu thì ẩn chip
    const chips = s.finish.replace(/\.$/, '').split(/,\s*/).map(cap).slice(0, 3);
    el.querySelectorAll('p').forEach((p) => { const i = TT001_CHIPS.indexOf(p.text.trim()); if (i < 0) return; if (chips[i]) put(p, chips[i]); else p.parentNode.setAttribute('style', 'display:none'); });
    // dòng khay: tem/đai/phụ kiện không có khay -> ghi phụ kiện đi kèm
    if (groupsOf(slug).includes('tem') || slug === 'tgt01') el.querySelectorAll('p').forEach((p) => {
      const t = p.text.trim();
      if (/^Tùy chọn khay:/.test(t)) put(p, 'Đi kèm tuỳ chọn: tem, đai, thiệp cảm ơn (báo giá theo món)');
      if (/^Khay:/.test(t)) put(p, 'Tuỳ chọn: tem, đai, thiệp cảm ơn');
    });
    // 4 mẫu cùng nhóm (desktop)
    const rel = relatedOf(slug);
    const grid = el.querySelector('[data-name="Lưới 4 Mẫu Liên Quan"]');
    if (grid) grid.childNodes.filter((n) => n.nodeType === 1 && /^SKU-/.test(n.getAttribute('data-name') || '')).forEach((card, i) => {
      const r = SKUS[rel[i]]; if (!r) { card.setAttribute('style', 'visibility:hidden'); return; }
      card.setAttribute('data-name', `${r.code} - ${cap(r.name)}`);
      const ps = card.querySelectorAll('p'); if (ps[0]) put(ps[0], r.code); if (ps[1]) put(ps[1], cap(r.name));
      const im = card.querySelector('img'); if (im) { im.setAttribute('src', (r.imgs[0] || `/img/sku/${rel[i]}-1.webp`)); im.setAttribute('alt', cap(r.name)); }
    });
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
// dữ liệu gọn cho giỏ báo giá (mã → tên, cỡ, ảnh nhỏ, link)
export const CART_SKUS = Object.fromEntries(Object.entries(SKUS).filter(([, s]) => /^SKU-/.test(s.code)).map(([slug, s]) => [s.code, {
  n: s.name.charAt(0).toUpperCase() + s.name.slice(1), s: s.sizes.map(([a, b]) => (a === b ? a : `${a}: ${b}`)).join(' · '),
  i: (s.imgs[0] || `/img/sku/${slug}-1.webp`).replace(/\.webp$/, '-t.webp'), u: `/mau-hop/${slug}`,
  // nhóm (bộ lọc) + từ khoá không dấu (ô tìm kiếm trang Mẫu hộp)
  g: groupsOf(slug),
  k: [s.code, s.name, s.desc, s.holds, s.finish, KEYWORDS[slug] || '', ...groupsOf(slug).map((g) => GROUPS[g].label)].join(' ').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase()
}]));
export const RETIRED = Object.keys(SKUS).filter((slug) => !/^SKU-/.test(SKUS[slug].code));
