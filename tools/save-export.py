# Lưu code Figma MCP (file JSON tool-results) thành design/figma-export/<tên>.jsx: python tools/save-export.py <file.json> <tên> ...
import json, sys, os
out = os.path.join(os.path.dirname(__file__), '..', 'design', 'figma-export')
a = sys.argv[1:]
for src, name in zip(a[::2], a[1::2]):
    code = json.load(open(src, encoding='utf-8'))[0]['text']
    open(os.path.join(out, name + '.jsx'), 'w', encoding='utf-8').write(code)
    print(name, len(code))
