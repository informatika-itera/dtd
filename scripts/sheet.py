#!/usr/bin/env python3
"""Contact sheets from shot.mjs output. Usage: sheet.py <dir> [cols=2] [per=6] [w=640]"""
import glob, sys
from PIL import Image
d = sys.argv[1]; cols = int(sys.argv[2]) if len(sys.argv) > 2 else 2
per = int(sys.argv[3]) if len(sys.argv) > 3 else 6; w = int(sys.argv[4]) if len(sys.argv) > 4 else 640
fs = sorted(glob.glob(f'{d}/s*.png'))
for k in range(0, len(fs), per):
    ims = [Image.open(f) for f in fs[k:k + per]]
    h = int(w * ims[0].height / ims[0].width)
    rows = (len(ims) + cols - 1) // cols
    sh = Image.new('RGB', (cols * (w + 8), rows * (h + 8)), '#888')
    for i, im in enumerate(ims):
        sh.paste(im.resize((w, h)), ((i % cols) * (w + 8), (i // cols) * (h + 8)))
    sh.save(f'{d}/sheet{k // per + 1}.png')
print(len(fs), 'slides')
