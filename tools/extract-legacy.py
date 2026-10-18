# Trích nội dung bài viết + bộ thiết kế từ HTML cũ sang content/*.json (chạy một lần trước khi dựng lại trang)
import re, json, glob, os, html as H
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def rd(p): return open(p, encoding='utf8').read()
def txt(s): return H.unescape(re.sub(r'<[^>]+>', '', s)).strip()
def one(rx, s, d=''):
    m = re.search(rx, s, re.S); return m.group(1) if m else d
def skus(s):
    return [{'u': u, 'i': i, 'n': txt(n), 'c': c} for u, i, n, c in re.findall(r'<a class="mini" href="([^"]+)"><img src="([^"]+)"[^>]*><span><b>(.*?)</b><span>(.*?)</span>', s, re.S)]
posts = []
for p in sorted(glob.glob(os.path.join(ROOT, 'tin-tuc', '*.html'))):
    s = rd(p); main = one(r'(<main.*?</main>)', s)
    art = one(r'<div class="wrap article">(.*?)<aside', main)
    posts.append({
        'slug': os.path.basename(p)[:-5],
        'title': txt(one(r'<h1[^>]*>(.*?)</h1>', main)),
        'desc': H.unescape(one(r'<meta name="description" content="([^"]*)"', s)),
        'date': one(r'<time datetime="([^"]+)"', main), 'tag': txt(one(r'<span class="tag">(.*?)</span>', main)),
        'img': one(r'<div class="article__img"><img src="([^"]+)"', main),
        'body': one(r'<div class="prose">(.*?)</div>(?:</div>)?\s*$', art).strip() or one(r'<div class="prose">(.*)</div>', art),
        'skus': skus(main), 'zalo': H.unescape(one(r'data-zalo="([^"]*)"', main)),
    })
posts.sort(key=lambda x: x['date'], reverse=True)
sets = []
for p in sorted(glob.glob(os.path.join(ROOT, 'thiet-ke', '*.html'))):
    s = rd(p); main = one(r'(<main.*?</main>)', s)
    sets.append({
        'slug': os.path.basename(p)[:-5],
        'title': txt(one(r'<h1[^>]*>(.*?)</h1>', main)), 'lead': txt(one(r'<p class=lead>(.*?)</p>', main)),
        'desc': H.unescape(one(r'<meta name="description" content="([^"]*)"', s)),
        'imgs': re.findall(r'<img src="(/img/thietke/[^"]+)"', main),
        'body': one(r'<div class="prose">(.*?)</div>', main).strip(),
        'skus': skus(main), 'zalo': H.unescape(one(r'data-zalo="([^"]*)"', main)),
    })
for name, data in (('tin-tuc', posts), ('thiet-ke', sets)):
    json.dump(data, open(os.path.join(ROOT, 'content', name + '.json'), 'w', encoding='utf8'), ensure_ascii=False, indent=1)
print(len(posts), len(sets))
