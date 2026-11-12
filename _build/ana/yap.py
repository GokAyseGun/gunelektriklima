#!/usr/bin/env python3
"""Yeni ana sayfayı üretir.
  python3 _build/ana/yap.py           -> onizleme/index.html (Google'a kapalı önizleme)
  python3 _build/ana/yap.py --yayin   -> index.html + index-en.html (asıl ana sayfa ve İngilizcesi)
Kaynaklar: _build/ana/a.html (sayfa + stil), _build/ana/b.js (hareket motoru), _build/ana/fonts.css."""
import hashlib, os, re, sys
K = os.path.dirname(os.path.abspath(__file__)); KOK = os.path.dirname(os.path.dirname(K))
js = open(f'{K}/b.js', encoding='utf-8').read()
open(f'{KOK}/assets/gt/ana.js', 'w', encoding='utf-8').write(js)
v = hashlib.md5(js.encode()).hexdigest()[:8]
sitev = hashlib.md5(open(f'{KOK}/assets/site.js', 'rb').read()).hexdigest()[:8]
yayin = '--yayin' in sys.argv
h = open(f'{K}/a.html', encoding='utf-8').read()
h = (h.replace('{{ROBOTS}}', 'index, follow' if yayin else 'noindex, nofollow')
      .replace('{{FONTS}}', open(f'{K}/fonts.css', encoding='utf-8').read().strip())
      .replace('{{V}}', v).replace('{{SITEV}}', sitev))
hedef = f'{KOK}/index.html' if yayin else f'{KOK}/onizleme/index.html'
os.makedirs(os.path.dirname(hedef), exist_ok=True)
open(hedef, 'w', encoding='utf-8').write(h)
print(hedef, len(h), 'ana.js', len(js), v)

# İngilizcesi: aynı sayfa, en.py ile çevrilir
sys.path.insert(0, K)
import en  # noqa: E402
h_en = en.cevir(h)
hedef_en = f'{KOK}/index-en.html' if yayin else f'{KOK}/onizleme/en.html'
open(hedef_en, 'w', encoding='utf-8').write(h_en)
print(hedef_en, len(h_en))
