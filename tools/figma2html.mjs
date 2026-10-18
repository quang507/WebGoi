// Dựng các trang GÓI từ bản xuất Figma (design/figma-export/*.jsx).
// Chạy: cd tools && npm run build
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { jsxToHtml, AtomicCSS, toDom } from './lib/jsx2html.mjs';
import { PAGES, SKU_PAGES } from './pages.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const EXP = path.join(ROOT, 'design/figma-export');
const ASSET_DIR = path.join(ROOT, 'assets/f');
const CACHE = path.join(ROOT, 'design/asset-cache.json');
mkdirSync(ASSET_DIR, { recursive: true });
const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : {};
const atoms = new AtomicCSS('f');
const ZALO = 'https://zalo.me/0387365020';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=36%2F6H+Tr%E1%BA%A7n+Th%E1%BB%8B+H%C3%A8%2C+T%C3%A2n+Th%E1%BB%9Bi+Hi%E1%BB%87p%2C+Qu%E1%BA%ADn+12';
// Figma xuất code bỏ mất độ mờ của màu gắn biến trắng (base/white) -> bù lại theo node (quét bằng use_figma)
const PAINT_FIX = { '134:604': 's.24', '134:606': 's.24', '134:608': 's.24', '134:610': 's.24', '178:1086': 'b.04|s.14', '178:1089': 's.2', '178:1093': 'c.62', '178:1095': 's.2', '178:1101': 'c.62', '178:1103': 's.2', '178:1108': 'c.62', '178:1110': 's.2', '178:1115': 'c.62', '178:1117': 's.2', '178:1121': 'c.62' };
const PROVINCES = ['TP Hồ Chí Minh','Hà Nội','Hải Phòng','Đà Nẵng','Cần Thơ','Huế','Đồng Nai','Tây Ninh','Vĩnh Long','Đồng Tháp','An Giang','Cà Mau','Lâm Đồng','Đắk Lắk','Khánh Hòa','Gia Lai','Quảng Ngãi','Quảng Trị','Hà Tĩnh','Nghệ An','Thanh Hóa','Ninh Bình','Hưng Yên','Bắc Ninh','Quảng Ninh','Lạng Sơn','Cao Bằng','Tuyên Quang','Lào Cai','Thái Nguyên','Phú Thọ','Sơn La','Điện Biên','Lai Châu'];

// ---------- tải asset Figma về repo ----------
async function localAsset(url) {
  if (cache[url] && existsSync(path.join(ROOT, cache[url].slice(1)))) return cache[url];
  const res = await fetch(url); if (!res.ok) throw new Error('asset ' + res.status + ' ' + url);
  const buf = Buffer.from(await res.arrayBuffer());
  const type = res.headers.get('content-type') || '';
  const ext = type.includes('svg') ? 'svg' : type.includes('jpeg') ? 'jpg' : type.includes('webp') ? 'webp' : 'png';
  const h = createHash('sha1').update(buf).digest('hex').slice(0, 12);
  let file = `${h}.${ext}`;
  const abs = path.join(ASSET_DIR, file);
  if (!existsSync(abs)) writeFileSync(abs, buf);
  // ảnh chụp PNG nặng -> WebP cùng kích thước (không đổi hình)
  if (ext === 'png' && buf.length > 160_000) {
    const webp = path.join(ASSET_DIR, `${h}.webp`);
    if (!existsSync(webp)) execFileSync('python', ['-c', `from PIL import Image;im=Image.open(r'''${abs}''');im.save(r'''${webp}''','WEBP',quality=84,method=6)`]);
    file = `${h}.webp`;
  }
  cache[url] = `/assets/f/${file}`;
  writeFileSync(CACHE, JSON.stringify(cache, null, 1));
  return cache[url];
}

// ---------- quy tắc liên kết (khớp prototype Figma) ----------
function hrefFor(el, ctx) {
  const t = el.text.replace(/\s+/g, ' ').trim(); const T = t.toUpperCase(); const name = el.getAttribute('data-name') || '';
  if (/^Deco/.test(name)) return null;
  const CH = { Facebook: 'https://www.facebook.com/profile.php?id=61593633389379', Instagram: 'https://www.instagram.com/goi.packaging', TikTok: 'https://www.tiktok.com/@goipackaging', YouTube: 'https://www.youtube.com/channel/UCpPrblgue9zz5ORZLhF6ItA', 'Zalo OA': ZALO };
  const kn = name.match(/^Kênh (.+)$/); if (kn && CH[kn[1]]) return CH[kn[1]];
  const SOC = { 'Social FB': CH.Facebook, 'Social YT': CH.YouTube, 'Social TT': CH.TikTok, 'Social ZL': ZALO }; if (SOC[name]) return SOC[name];
  if (/^Sơ Đồ Xưởng/.test(name)) return MAPS;
  if (/^XEM \d+ MẪU HỘP|^XEM ĐỦ \d+ MẪU/.test(T)) return '/mau-hop';
  if (/XEM BẢN VẼ KHUÔN/.test(T)) return ctx.khuon || '/mau-hop';
  if (/^SKU-/.test(name)) return ctx.skuHref(name.split(' ')[0]);
  const rel = el.parentNode && el.parentNode.getAttribute && el.parentNode.getAttribute('data-name') === 'Lưới 4 Mẫu Liên Quan' && el.querySelectorAll('p').map((x) => x.text.trim()).find((x) => /^SKU-[A-Z0-9]+$/.test(x));
  if (rel) return ctx.skuHref(rel);
  if (/^CHỌN GÓI/.test(T)) return ZALO;
  if (/^TẢI .*PDF|^TẢI HỒ SƠ/.test(T) || name === 'Btn Tải PDF') return '#in-ho-so';
  // ảnh/thumbnail trong dòng sản phẩm trang chủ -> trang SKU theo tên thẻ
  if (!t && (/^Ảnh|^Thumb|^Hộp|^Túi/.test(name))) {
    let p = el.parentNode, title = /^(Hộp|Túi)/.test(name) ? name : '';
    for (let i = 0; i < 3 && p && !title; i++, p = p.parentNode) { const ts = (p.querySelectorAll ? p.querySelectorAll('p') : []).map((x) => x.text.trim()).filter((x) => /^(Hộp|Túi)/.test(x) && x.length < 40); if (ts.length) title = ts[0]; }
    const M = [[/âm dương|thời trang/i, 'tt001'], [/nam châm/i, 'dst02'], [/kéo rút|eco/i, 'eco'], [/mailer/i, 'mailer'], [/quai xách|yến sào/i, 'qxs'], [/túi giấy/i, 'tgt01'], [/quà tết/i, 'dst01']];
    const hit = M.find(([re]) => re.test(title)); return hit ? '/mau-hop/' + hit[1] : null;
  }
  if (/XEM CHI TIẾT/.test(T)) { const card = el.closest('[data-name^="SKU-"]'); return card ? ctx.skuHref(card.getAttribute('data-name').split(' ')[0]) : '/mau-hop/tt001'; }
  if (T === 'GÓI' || /^TRANG CHỦ$/.test(T)) return '/';
  if (/^TRANG CHỦ\s*\//.test(T)) return ctx.kind === 'pdp' ? '/mau-hop' : '/';
  if (/HỒ SƠ NĂNG LỰC/.test(T) && !/TẢI/.test(T)) return '/ve-goi';
  if (/CẨM NANG/.test(T)) return '/tin-tuc';
  if (/^LIÊN HỆ$/.test(T)) return '/lien-he';
  if (/^THIẾT KẾ$/.test(T)) return '/thiet-ke';
  if (/^BẢNG GIÁ$/.test(T)) return '/bang-gia';
  if (/IN GIA CÔNG/.test(T)) return '/dich-vu';
  if (/^DANH MỤC CÓ SẴN/.test(T) || /^(HỘP CỨNG|HỘP CỨNG CAO CẤP|MẪU HỘP|KHO KHUÔN|HỘP GIẤY|HỘP GIẤY MỀM|TÚI GIẤY|HỘP CARTON SÓNG)$/.test(T) || /XEM TOÀN BỘ/.test(T)) return '/mau-hop';
  if (/GHÉ XƯỞNG/.test(T)) return '/lien-he';
  if (/^(DỰ ÁN ĐÃ BÀN GIAO)$/.test(T)) return '/thiet-ke';
  if (/^(BẢNG GIÁ XƯỞNG)$/.test(T)) return '/bang-gia';
  if (/^QUY TRÌNH SẢN XUẤT$/.test(T)) return '/quy-trinh';
  if (/^SẢN PHẨM$/.test(T)) return '/mau-hop';
  if (/^TIN TỨC/.test(T)) return '/tin-tuc';
  if (/^LIÊN HỆ TƯ VẤN$/.test(T)) return '/lien-he';
  if (/^CHÍNH SÁCH|QUY CHUẨN DUYỆT MÀU|TIÊU CHUẨN VẬT LIỆU|MIỄN 100% TIỀN KHUÔN/.test(T)) return '/chinh-sach';
  if (/^HỘP CỨNG CAO CẤP \(|^TÚI GIẤY BOUTIQUE|^HỘP GIẤY MỀM \(|^HỘP CARTON SÓNG SHIP|^THÙNG CARTON|^TEM NHÃN DECAL/.test(T)) return '/mau-hop';
  if (/^EMAIL:/.test(T)) return 'mailto:baogia@goi.vn';
  if (/^XƯỞNG & BÁO GIÁ \(MY\)/.test(T)) return 'tel:0981047115';
  if (/^THIẾT KẾ & TƯ VẤN \(QUANG\)/.test(T)) return 'tel:0387365020';
  if (/^ZALO OA/.test(T)) return ZALO;
  if (/^TÌM MẪU HỘP/.test(T)) return '/mau-hop';
  if (/CHỈ ĐƯỜNG/.test(T)) return MAPS;
  if (/GỌI|^0\d|09XX/.test(T) || /phone|Call/i.test(name)) return 'tel:0387365020';
  if (/^NHẬN BÁO GIÁ$|BÁO GIÁ NHANH|^BÁO GIÁ$/.test(T)) return ctx.kind === 'home' ? '#bao-gia' : '/#bao-gia';
  if (ctx.wrap) return null; // chữ thường trong header/footer: chỉ link khi khớp quy tắc rõ ràng ở trên
  if (/ZALO|BÁO GIÁ|MAKET|MẪU|TƯ VẤN|E-PROFILE|KHUÔN|CHAT/.test(T)) return ZALO;
  return null;
}

// ---------- gắn nhãn tương tác ----------
function tagInteractions(root, kind) {
  const sections = root.childNodes.filter((n) => n.nodeType === 1);
  sections.forEach((s) => {
    const nm = s.getAttribute('data-name') || '';
    if (/Widget Báo Giá/i.test(nm)) s.setAttribute('id', 'bao-gia');
    if (/Header Navigation|Nav Mobile|Navigation Tablet|Header Tablet|Header Mobile/i.test(nm)) s.setAttribute('data-sticky', '');
    if (/Marquee/i.test(nm)) s.setAttribute('data-marquee', '');
    s.setAttribute('data-section', '');
    if (/topbar|top bar|header|nav|breadcrumb|sticky/i.test(nm)) return;
    let i = 0;
    s.childNodes.filter((n) => n.nodeType === 1 && !/^Deco/.test(n.getAttribute('data-name') || '')).forEach((c) => { c.setAttribute('data-reveal', ''); c.setAttribute('style', ((c.getAttribute('style') || '') + `;--i:${i++}`).replace(/^;/, '')); });
  });
  root.querySelectorAll('[data-name]').forEach((el) => {
    const nm = el.getAttribute('data-name');
    if (/^SKU-|^HC-|^Featured Card|^Bước \d|^\d\d \/|Trụ Cột|^Stat$/i.test(nm)) el.setAttribute('data-card', '');
    if (/^Ảnh Hero|Hero Photo/.test(nm) && !el.hasAttribute('data-section')) el.setAttribute('data-parallax', '0.06');
    if (nm === 'Deco · Halftone') el.setAttribute('data-parallax', '-0.05');
    if (nm === 'Deco · Kraft sheet') el.setAttribute('data-drift', '');
    if (nm === 'Deco · Crop marks') el.setAttribute('data-crop', '');
    if (nm === 'Deco · Khuôn bế' || nm === 'Deco/Dieline Blueprint') el.setAttribute('data-draw', '');
    if (/Deco · Dieline divider|Deco\/Dieline Divider/.test(nm)) el.setAttribute('data-cut', '');
    if (/^Track$/.test(nm)) el.setAttribute('data-slider-track', '');
    if (/^Active Track$/.test(nm)) el.setAttribute('data-slider-fill', '');
    if (/^Thumb$/.test(nm) && el.parentNode && /Track/i.test(el.parentNode.getAttribute('data-name') || '')) el.setAttribute('data-slider-thumb', '');
  });
  // số đếm
  root.querySelectorAll('p').forEach((p) => {
    const t = p.text.trim();
    if (/^\d{1,3}(\.\d{3})*(\+|h|%)?( MÃ| NĂM| HỘP)?$/.test(t) && p.closest('[data-card],[data-name="Specs Row"],[data-name*="Chỉ Số"],[data-name*="Stats"]')) p.setAttribute('data-count', t);
  });
  // nút
  root.querySelectorAll('a,button,[data-name^="Btn"],[data-name^="Nút"]').forEach((a) => {
    const cls = a.getAttribute('data-src-class') || '';
    const nm = a.getAttribute('data-name') || '';
    if (/btn|nút|cta|Trailing|Label/i.test(nm) || a.querySelector('[data-name="Trailing icon"],[data-name="Label"]')) {
      a.setAttribute('data-btn', /bg-\[var\(--brand\\\/red/.test(cls) || /bg-\[var\(--brand\\\/gold/.test(cls) ? 'primary' : /bg-\[var\(--ink\\\/strong/.test(cls) ? 'dark' : 'outline');
    }
  });
}

// ---------- chuyển một frame ----------
async function convertFrame(el, kind, skuHref, ctx = {}) {
  // gỡ toạ độ tuyệt đối khi frame lấy từ wrapper xuất gộp
  el.querySelectorAll('[class]').concat([el]).forEach((n) => n.setAttribute('data-src-class', n.getAttribute('class')));
  // Figma xuất instance halftone ở footer thành component phụ, mất opacity 10% và xoay 180° -> trả lại đúng như thiết kế
  el.querySelectorAll('[data-node-id="158:591"]').forEach((h) => h.setAttribute('style', ((h.getAttribute('style') || '') + ';opacity:.1;rotate:180deg').replace(/^;/, '')));
  tagInteractions(el, kind);
  // asset
  for (const img of el.querySelectorAll('img')) {
    const src = img.getAttribute('src') || '';
    const m = src.match(/^@@(img\w+)@@$/); if (m) img.setAttribute('src', '@@' + m[1] + '@@');
    const nm = img.parentNode?.getAttribute('data-name') || '';
    img.setAttribute('alt', /^(Deco|Icon|Trailing|Leading|Vector)/.test(nm) ? '' : nm.replace(/^Ảnh:?\s*/, ''));
    img.setAttribute('loading', 'lazy'); img.setAttribute('decoding', 'async');
  }
  for (const t of el.querySelectorAll('[class*="bg-size-["]')) { const m = (t.getAttribute('class') || '').match(/bg-size-\[([\d.]+)px_[\d.]+px\]/); if (m) t.setAttribute('data-tile', m[1]); }
  for (const [id, fx] of Object.entries(PAINT_FIX)) {
    const n = el.querySelector(`[data-node-id="${id}"]`); if (!n) continue;
    const css = fx.split('|').map((f) => `${{ b: 'background-color', s: 'border-color', c: 'color' }[f[0]]}:rgba(255,255,255,${f.slice(1)})`).join(';');
    n.setAttribute('style', ((n.getAttribute('style') || '') + ';' + css).replace(/^;/, ''));
  }
  // form báo giá: ô nhập thật thay chữ giữ chỗ (giữ nguyên kiểu chữ của thiết kế)
  const KEY = { 'Input Dài': ['dai', 'decimal'], 'Input Rộng': ['rong', 'decimal'], 'Input Cao': ['cao', 'decimal'], 'Input Tên': ['ten', 'text'], 'Input SĐT': ['sdt', 'tel'] };
  for (const box of el.querySelectorAll('[data-name^="Input "], [data-name="Select Tỉnh"]')) {
    const ph = box.querySelector('[data-name="Placeholder"]') || box.querySelector('p'); if (!ph) continue;
    const nm = box.getAttribute('data-name'); const cls = ph.getAttribute('class') || '';
    let html;
    if (nm === 'Select Tỉnh') html = `<select class="${cls}" data-goi-input name="tinh" aria-label="Tỉnh/Thành nhận hàng"><option value="">— Tỉnh/Thành nhận hàng —</option>${PROVINCES.map((v) => `<option>${v}</option>`).join('')}</select>`;
    else { const [k, t] = KEY[nm] || ['x', 'text']; html = `<input class="${cls}" data-goi-input name="${k}" placeholder="${ph.text.trim()}" aria-label="${ph.text.trim()}" ${t === 'decimal' ? 'inputmode="decimal"' : t === 'tel' ? 'type="tel" inputmode="tel" autocomplete="tel"' : 'autocomplete="name"'}>`; }
    ph.replaceWith(toDom(html).firstChild);
  }
  for (const f of el.querySelectorAll('[data-name="Form Báo Giá Nhanh"]')) { f.tagName = 'form'; f.setAttribute('data-quote', ''); f.setAttribute('novalidate', ''); }
  // nút trong thiết kế chưa nối prototype -> thành thẻ <a>
  for (const b of el.querySelectorAll('[data-name]')) {
    const nm = b.getAttribute('data-name');
    if (b.tagName !== 'A' && !b.closest('a') && (/^(Btn|Nút|Search Input|Call Btn|Kênh (?!Của)|Social |Sơ Đồ Xưởng)/i.test(nm) || (b.parentNode && b.parentNode.getAttribute && b.parentNode.getAttribute('data-name') === 'Lưới 4 Mẫu Liên Quan') || b.querySelector(':scope > [data-name="Trailing icon"], :scope > [data-name="Label"]'))) b.tagName = 'a';
  }
  // chữ trong header/footer có đích đến -> bọc <a>
  for (const sec of el.childNodes.filter((n) => n.nodeType === 1 && /Header|Nav|Footer|Topbar|Top Bar|Breadcrumb/i.test(n.getAttribute('data-name') || ''))) {
    for (const p of sec.querySelectorAll('p')) {
      if (p.closest('a')) continue;
      const h = hrefFor(p, { kind, skuHref, ...ctx, wrap: true }); if (!h) continue;
      const a = toDom(`<a href="${h}" data-link>${p.toString()}</a>`).firstChild; p.replaceWith(a);
    }
  }
  // link
  for (const a of el.querySelectorAll('a')) { const h = hrefFor(a, { kind, skuHref, ...ctx }); if (!h && !a.hasAttribute('data-link')) { a.tagName = 'div'; continue; } if (h) { a.setAttribute('href', h); if (/^https?:/.test(h)) { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); } } }
  for (const a of el.querySelectorAll('a')) {
    const T = a.text.replace(/\s+/g, ' ').trim().toUpperCase();
    if (a.getAttribute('data-name') === 'Btn Gửi Báo Giá') a.setAttribute('data-quote-submit', '');
    const g = T.match(/^CHỌN (GÓI [^ ]+ [^ ]+)$/) || (/^CHỌN GÓI NÀY$/.test(T) && (a.getAttribute('data-name') || '').match(/Chọn (GÓI .+)$/));
    if (g) a.setAttribute('data-zalo-msg', `GÓI ơi, mình quan tâm ${g[1].replace(/^GÓI/, 'Gói').replace(/(\S+)$/, (w) => w[0] + w.slice(1).toLowerCase())} (set 100 sản phẩm). Tư vấn giúp mình nhé.`);
    if (/^(ĐẶT HÀNG MẪU TRƯỚC|NHẬN BÁO GIÁ MẪU NÀY|ZALO BÁO GIÁ NGAY|NHẬN MẪU IN THỬ)/.test(T) && ctx.skuName) a.setAttribute('data-zalo-msg', `GÓI ơi, mình cần báo giá ${ctx.skuName} (${ctx.skuCode}), số lượng dự kiến: ... Giao tới: ...`);
  }
  // class -> atomic
  const all = [el, ...el.querySelectorAll('*')];
  for (const n of all) {
    const c = n.getAttribute('class'); n.removeAttribute('data-src-class');
    if (c != null) { const name = atoms.classFor(c.split(/\s+/).filter(Boolean)); if (name) n.setAttribute('class', name); else n.removeAttribute('class'); }
  }
  return el;
}

// Figma TILE: ô lặp = cỡ ảnh gốc × scalingFactor; bản xuất lại lấy 100px × scalingFactor -> tính lại theo ảnh thật
const dimCache = {};
function imgDim(rel) {
  if (!dimCache[rel]) dimCache[rel] = execSync(`python -c "from PIL import Image;print(*Image.open(r'${path.join(ROOT, rel)}').size)"`).toString().trim().split(' ').map(Number);
  return dimCache[rel];
}
function fixTiles(html) {
  return html.replace(/<[^>]*data-tile="([\d.]+)"[^>]*>/g, (tag, n) => {
    const m = tag.match(/url\(&quot;(\/assets\/f\/[^&]+)&quot;\)/); if (!m || /\.svg$/.test(m[1])) return tag;
    const [w, h] = imgDim(m[1]); const k = parseFloat(n) / 100;
    return tag.replace(/style="([^"]*)"/, (_, st) => `style="${st};background-size:${+(w * k).toFixed(1)}px ${+(h * k).toFixed(1)}px"`);
  });
}
async function resolveAssets(html, assets) {
  let out = html;
  for (const [k, url] of Object.entries(assets)) { if (!out.includes('@@' + k + '@@')) continue; const p = await localAsset(url); out = out.split('@@' + k + '@@').join(p); }
  return out;
}

// ---------- đọc bản xuất ----------
const frames = {};
for (const f of ['home-d', 'home-t', 'home-m', 'profile-d', 'profile-t', 'listing-d']) frames[f] = jsxToHtml(readFileSync(path.join(EXP, f + '.jsx'), 'utf8'));
{ // batch-rest: wrapper chứa 6 frame theo thứ tự
  const b = jsxToHtml(readFileSync(path.join(EXP, 'batch-rest.jsx'), 'utf8'));
  const dom = toDom(b.html); const kids = dom.firstChild.childNodes.filter((n) => n.nodeType === 1);
  ['profile-m', 'listing-t', 'listing-m', 'pdp-d', 'pdp-t', 'pdp-m'].forEach((k, i) => {
    const c = kids[i]; const cls = (c.getAttribute('class') || '').split(/\s+/).filter((t) => !/^(absolute|left-\[|top-\[|top-0|left-0)/.test(t));
    c.setAttribute('class', ['relative', ...cls].join(' '));
    frames[k] = { html: c.toString(), assets: b.assets };
  });
}

const W = { d: 1440, t: 834, m: 390 };
const head = (p) => `<!DOCTYPE html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${p.title}</title><meta name="description" content="${p.desc}"><meta name="robots" content="noindex">
<link rel="canonical" href="https://goi-v2.vercel.app${p.url}"><meta property="og:title" content="${p.title}"><meta property="og:description" content="${p.desc}">
<meta name="theme-color" content="#FAF8F5"><link rel="icon" href="/brand/avatar-goi-icon-tet-red.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/goi-base.css?v=${p.v}"><link rel="stylesheet" href="/css/goi-atoms.css?v=${p.v}">
<script>(function(){var q=/[?&]bp=([dtm])/.exec(location.search),R=document.documentElement;if(q)R.setAttribute('data-bp',q[1]);function z(){var w=R.clientWidth,b=q?{d:1440,t:834,m:390}[q[1]]:(w>=1100?1440:w>=600?834:390),v=q?1:w/b;if(b===1440)v=Math.min(v,1);R.style.setProperty('--z',v);}z();addEventListener('resize',z);})();</script>
</head><body class="goi" data-page="${p.kind}">
<div class="goi-progress" aria-hidden="true"></div>`;

const v = Date.now().toString(36);
async function buildPage(p, frameKeys, skuHref, mutate) {
  let body = '';
  for (const bp of ['d', 't', 'm']) {
    const fr = frames[frameKeys[bp]]; if (!fr) continue;
    const dom = toDom(fr.html); const el = dom.firstChild;
    if (mutate) mutate(el, bp);
    await convertFrame(el, p.kind, skuHref, { khuon: p.khuon, skuName: p.skuName, skuCode: p.skuCode });
    let html = fixTiles(await resolveAssets(el.toString(), fr.assets));
    body += `\n<div class="bp bp-${bp}" style="--w:${W[bp]}"${bp === 'd' ? '' : ' aria-hidden="false"'}>${html}</div>`;
  }
  const out = head({ ...p, v }) + body + `\n<script src="/js/goi-motion.js?v=${v}" defer></script>\n</body></html>\n`;
  const file = path.join(ROOT, p.file); mkdirSync(path.dirname(file), { recursive: true }); writeFileSync(file, out);
  console.log('✓', p.file, (out.length / 1024).toFixed(0) + 'KB');
}

const skuHref = (code) => '/mau-hop/' + code.replace(/^SKU-/, '').toLowerCase().replace(/[^a-z0-9]/g, '');
for (const p of PAGES) await buildPage(p, p.frames, skuHref, p.mutate);
for (const p of SKU_PAGES) await buildPage(p, p.frames, skuHref, p.mutate);
writeFileSync(path.join(ROOT, 'css/goi-atoms.css'), '/* Tự sinh từ Figma — không sửa tay. tools/figma2html.mjs */\n' + atoms.css() + '\n');
if (atoms.unknown.size) console.log('Class chưa hỗ trợ:', [...atoms.unknown].slice(0, 40));
console.log('atoms:', atoms.rules.size);
