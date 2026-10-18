// Chuyển code React + Tailwind do Figma MCP xuất ra thành HTML tĩnh + CSS nguyên tử.
// Giữ nguyên mọi số đo của bản thiết kế; chỉ đổi cú pháp.
import { createHash } from 'node:crypto';
import { parse } from 'node-html-parser';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => esc(s).replace(/"/g, '&quot;');
const kebab = (k) => k.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());

// ---------- 1. JSX -> chuỗi HTML ----------
export function jsxToHtml(src) {
  const assets = {};
  src.replace(/const (img\w+) = "([^"]+)";/g, (_, k, u) => { assets[k] = u; });
  // component phụ (vd. DecoHalftone) -> nhúng thẳng vào chỗ dùng
  const helpers = {};
  src.replace(/function (\w+)\(\{ className \}[^)]*\) \{\s*return \(([\s\S]*?)\);\s*\}/g, (_, n, b) => { helpers[n] = b.trim(); });
  const main = src.slice(src.indexOf('export default function'));
  let body = main.slice(main.indexOf('return (') + 8, main.lastIndexOf(');'));
  body = body.replace(/<([A-Z]\w*) className="([^"]*)" \/>/g, (m, n, cls) => helpers[n] ? helpers[n].replace(/className=\{className \|\| "[^"]*"\}/, `className="${cls}"`) : m);

  // style={{ ... }}
  body = body.replace(/style=\{\{([\s\S]*?)\}\}(?=[\s/>])/g, (_, inner) => {
    const decl = [];
    inner.replace(/(\w+):\s*(`[^`]*`|"(?:[^"\\]|\\.)*")/g, (__, key, raw) => {
      let v = raw.startsWith('`') ? raw.slice(1, -1).replace(/\$\{(img\w+)\}/g, '@@$1@@') : JSON.parse(raw);
      decl.push(`${kebab(key)}:${v}`);
    });
    return `style="${escAttr(decl.join(';'))}"`;
  });
  body = body.replace(/className=/g, 'class=');
  body = body.replace(/src=\{(img\w+)\}/g, 'src="@@$1@@"');

  // Văn bản JSX nhiều dòng: áp quy tắc gộp khoảng trắng của JSX
  body = body.replace(/>([^<{]*\n[^<{]*)</g, (_, t) => {
    const lines = t.split('\n').map((l) => l.trim()).filter(Boolean);
    return '>' + esc(lines.join(' ')) + '<';
  });
  // {`...`} và {"..."}
  body = body.replace(/\{`([\s\S]*?)`\}/g, (_, t) => esc(t));
  body = body.replace(/\{"((?:[^"\\]|\\.)*)"\}/g, (_, t) => esc(JSON.parse('"' + t + '"')));

  // thẻ tự đóng
  body = body.replace(/<(\w+)((?:\s+[\w-]+(?:="[^"]*")?)*)\s*\/>/g, (_, tag, attrs) =>
    tag === 'img' ? `<img${attrs}>` : `<${tag}${attrs}></${tag}>`);
  return { html: body.trim(), assets };
}

// ---------- 2. Tailwind (bộ con Figma dùng) -> khai báo CSS ----------
const VAR = (v) => v.replace(/var\(--([^,)]+)/g, (_, n) => 'var(--' + n.replace(/\\\//g, '-').replace(/\//g, '-'));
const val = (v) => VAR(v.replace(/_/g, ' '));
const WEIGHT = { Thin: 100, ExtraLight: 200, Light: 300, Regular: 400, Medium: 500, Semi_Bold: 600, SemiBold: 600, Bold: 700, ExtraBold: 800, Black: 900 };
const fam = (spec) => { const [f, s] = spec.replace(/'/g, '').split(':'); return { family: f.replace(/_/g, ' '), weight: WEIGHT[s] || 400 }; };
const isLen = (v) => /^-?[\d.]+(px|%|rem|em|vw|vh)?$|^var\(--(spacing|dm|radius|typography)/.test(v) || /^calc\(/.test(v);

export function compile(tok) {
  const d = [];
  const add = (p, v) => d.push([p, v]);
  let m;
  const simple = {
    relative: [['position', 'relative']], absolute: [['position', 'absolute']], fixed: [['position', 'fixed']],
    flex: [['display', 'flex']], block: [['display', 'block']], 'flex-col': [['flex-direction', 'column']],
    'content-stretch': [['align-content', 'stretch']], 'items-center': [['align-items', 'center']], 'items-start': [['align-items', 'flex-start']], 'items-end': [['align-items', 'flex-end']],
    'justify-center': [['justify-content', 'center']], 'justify-between': [['justify-content', 'space-between']], 'justify-start': [['justify-content', 'flex-start']], 'justify-end': [['justify-content', 'flex-end']],
    'shrink-0': [['flex-shrink', '0']], 'flex-none': [['flex', 'none']], 'min-w-px': [['min-width', '1px']], 'min-w-full': [['min-width', '100%']],
    'overflow-clip': [['overflow', 'clip']], 'size-full': [['width', '100%'], ['height', '100%']], 'w-full': [['width', '100%']], 'h-0': [['height', '0']], 'h-px': [['height', '1px']], 'w-px': [['width', '1px']],
    'inset-0': [['inset', '0']], 'top-0': [['top', '0']], 'left-0': [['left', '0']], 'right-0': [['right', '0']], 'bottom-0': [['bottom', '0']],
    'translate-y-full': [['translate', '0 100%']], 'rotate-180': [['rotate', '180deg']], 'mb-0': [['margin-bottom', '0']],
    border: [['border-width', '1px']], 'border-2': [['border-width', '2px']], 'border-3': [['border-width', '3px']], 'border-solid': [['border-style', 'solid']],
    'bg-top-left': [['background-position', 'top left']], 'not-italic': [['font-style', 'normal']], uppercase: [['text-transform', 'uppercase']],
    'whitespace-nowrap': [['white-space', 'nowrap']], 'whitespace-pre': [['white-space', 'pre']], 'whitespace-pre-wrap': [['white-space', 'pre-wrap']],
    'max-w-none': [['max-width', 'none']], 'object-cover': [['object-fit', 'cover']], 'pointer-events-none': [['pointer-events', 'none']], 'cursor-pointer': [['cursor', 'pointer']],
    'text-left': [['text-align', 'left']], 'text-center': [['text-align', 'center']], 'text-right': [['text-align', 'right']], 'text-white': [['color', '#fff']],
    'font-normal': [['font-weight', '400']], 'font-medium': [['font-weight', '500']], 'font-semibold': [['font-weight', '600']], 'font-bold': [['font-weight', '700']],
    'bg-gradient-to-l': [['--gdir', 'to left']], 'bg-gradient-to-r': [['--gdir', 'to right']], 'bg-gradient-to-b': [['--gdir', 'to bottom']], 'bg-gradient-to-t': [['--gdir', 'to top']],
    'from-white': [['--gfrom', '#fff']], 'via-white': [['--gvia', '#fff']], 'to-white': [['--gto', '#fff']], 'via-1/2': [['--gviapos', '50%']]
  };
  const extra = { contents: [['display', 'contents']], 'flex-wrap': [['flex-wrap', 'wrap']], 'content-start': [['align-content', 'flex-start']], 'leading-none': [['line-height', '1']], 'min-h-px': [['min-height', '1px']], 'mix-blend-multiply': [['mix-blend-mode', 'multiply']], 'self-stretch': [['align-self', 'stretch']], 'bg-clip-text': [['-webkit-background-clip', 'text'], ['background-clip', 'text']], 'items-end': [['align-items', 'flex-end']], 'items-baseline': [['align-items', 'baseline']], 'border-b': [['border-bottom-width', '1px']], 'border-l': [['border-left-width', '1px']], 'border-r': [['border-right-width', '1px']], 'border-t': [['border-top-width', '1px']], 'bg-white': [['background-color', '#fff']], 'bg-black': [['background-color', '#000']], 'overflow-hidden': [['overflow', 'hidden']] };
  if (simple[tok]) return simple[tok];
  if (extra[tok]) return extra[tok];
  if ((m = tok.match(/^(-?)rotate-(\d+)$/))) return [['rotate', `${m[1]}${m[2]}deg`]];
  if ((m = tok.match(/^opacity-(\d+)$/))) return [['opacity', String(+m[1] / 100)]];
  if ((m = tok.match(/^\[([\w-]+):(.+)\]$/))) return [[m[1], val(m[2])]];
  if (!(m = tok.match(/^(-?)([a-z-]+)-\[(.+)\]$/))) return null;
  const [, neg, k, raw] = m; let v = val(raw); if (neg) v = `calc(${v} * -1)`;
  const box = { p: ['padding'], px: ['padding-left', 'padding-right'], py: ['padding-top', 'padding-bottom'], pl: ['padding-left'], pr: ['padding-right'], pt: ['padding-top'], pb: ['padding-bottom'], mb: ['margin-bottom'], mt: ['margin-top'], gap: ['gap'],
    w: ['width'], h: ['height'], size: ['width', 'height'], left: ['left'], top: ['top'], right: ['right'], bottom: ['bottom'], inset: ['inset'], rounded: ['border-radius'], leading: ['line-height'], tracking: ['letter-spacing'], flex: ['flex'], 'min-w': ['min-width'], 'max-w': ['max-width'], 'min-h': ['min-height'] };
  if (box[k]) { box[k].forEach((p) => add(p, v)); return d; }
  if (k === 'shadow') return [['box-shadow', v]];
  if (k === 'drop-shadow') return [['filter', `drop-shadow(${v})`]];
  if (k === 'text-shadow') return [['text-shadow', v]];
  if (k === 'bg-size') return [['background-size', v]];
  if (k === 'bg') return [[/^url\(/.test(v) ? 'background-image' : 'background-color', v]];
  if (k === 'border') return [[isLen(v) ? 'border-width' : 'border-color', v]];
  if (k === 'from') return [['--gfrom', v]]; if (k === 'via') return [['--gvia', v]]; if (k === 'to') return [['--gto', v]];
  if (k === 'text') {
    if (raw.startsWith('color:')) return [['color', val(raw.slice(6))]];
    if (raw.startsWith('length:')) return [['font-size', val(raw.slice(7))]];
    return [[isLen(v) ? 'font-size' : 'color', v]];
  }
  if (k === 'font') {
    if (raw.startsWith('family-name:')) {
      const inner = raw.slice(12); const fb = inner.match(/'([^']+)'/); const f = fb ? fam(fb[1]) : { family: 'Inter', weight: 400 };
      const varName = inner.match(/var\(--([^,]+)/);
      const stack = `'${f.family}', ${f.family === 'Lora' ? 'Georgia, serif' : f.family === 'JetBrains Mono' ? 'ui-monospace, monospace' : 'system-ui, sans-serif'}`;
      return [['font-family', varName ? `var(--${varName[1].replace(/\\\//g, '-')}, ${stack})` : stack]];
    }
    if (/^'/.test(raw)) { const f = fam(raw); return [['font-family', `'${f.family}', ${f.family === 'Lora' ? 'Georgia, serif' : f.family === 'JetBrains Mono' ? 'ui-monospace, monospace' : 'system-ui, sans-serif'}`], ['font-weight', String(f.weight)]]; }
    return [['font-weight', v]];
  }
  return null;
}

// ---------- 3. Gắn class nguyên tử ----------
export class AtomicCSS {
  constructor(prefix = 'f') { this.rules = new Map(); this.prefix = prefix; this.unknown = new Map(); }
  classFor(tokens) {
    const decl = []; let grad = false;
    for (const t of tokens) {
      const c = compile(t);
      if (!c) { this.unknown.set(t, (this.unknown.get(t) || 0) + 1); continue; }
      for (const [p, v] of c) { if (p.startsWith('--g')) grad = true; decl.push([p, v]); }
    }
    if (grad) {
      const g = Object.fromEntries(decl.filter(([p]) => p.startsWith('--g')));
      const stops = [g['--gfrom'] || 'transparent', g['--gvia'] ? `${g['--gvia']}${g['--gviapos'] ? ' ' + g['--gviapos'] : ''}` : null, g['--gto'] || 'transparent'].filter(Boolean);
      decl.push(['background-image', `linear-gradient(${g['--gdir'] || 'to bottom'}, ${stops.join(', ')})`]);
    }
    const body = decl.filter(([p]) => !p.startsWith('--g')).map(([p, v]) => `${p}:${v}`).join(';');
    if (!body) return '';
    const name = this.prefix + createHash('md5').update(body).digest('base64url').slice(0, 6).replace(/[-_]/g, 'x');
    this.rules.set(name, body);
    return name;
  }
  css() { return [...this.rules].map(([n, b]) => `.${n}{${b}}`).join('\n'); }
}

export function toDom(html) { return parse(html, { comment: false, blockTextElements: { script: true, style: true } }); }
