# So ảnh web với Figma: in điểm lệch theo dải 200px, xuất ảnh ghép vào design/compare/
import sys, os
from PIL import Image, ImageChops, ImageStat, ImageDraw
os.makedirs('design/compare', exist_ok=True)
names = sys.argv[1:] or [f[:-4] for f in sorted(os.listdir('design/figma-ref'))]
for n in names:
    a = Image.open(f'design/figma-ref/{n}.png').convert('RGB'); b = Image.open(f'design/shots/{n}.png').convert('RGB')
    h = min(a.height, b.height); w = a.width
    if b.width != w: b = b.resize((w, int(b.height * w / b.width)))
    bands = []
    for y in range(0, h, 200):
        ca = a.crop((0, y, w, min(y + 200, h))); cb = b.crop((0, y, w, min(y + 200, h)))
        d = ImageStat.Stat(ImageChops.difference(ca, cb)).mean; bands.append((y, sum(d) / 3))
    worst = sorted(bands, key=lambda x: -x[1])[:4]
    print(f'{n:10s} fig {a.height:5d} web {b.height:5d}  avg {sum(x[1] for x in bands)/len(bands):5.1f}  worst ' + ' '.join(f'{y}:{v:.0f}' for y, v in worst))
    g = 20; im = Image.new('RGB', (w * 2 + g, max(a.height, b.height)), (40, 40, 40)); im.paste(a, (0, 0)); im.paste(b, (w + g, 0))
    s = min(1, 1600 / im.width); im = im.resize((int(im.width * s), int(im.height * s))); im.save(f'design/compare/{n}.jpg', quality=78)
