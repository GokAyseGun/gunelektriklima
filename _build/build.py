#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Gün Teknik site üretici.

Kullanım:  python3 _build/build.py
Bilgiler _build/data.py içindedir. Bu betik Türkçe sayfaları, ortak css/js dosyalarını,
site haritasını ve robots.txt dosyasını yeniden üretir. İngilizce sayfalara dokunmaz.
"""
import datetime
import hashlib
import html
import json
import os
import re
import sys

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(KOK, "_build"))
import data as D  # noqa: E402
import brans_veri as BV  # noqa: E402

F, SITE = D.FIRMA, D.SITE
BUGUN = datetime.date.today().isoformat()
YIL = datetime.date.today().year
e = html.escape


def oku(yol):
    with open(os.path.join(KOK, yol), encoding="utf-8") as f:
        return f.read()


def yaz(yol, icerik):
    tam = os.path.join(KOK, yol)
    os.makedirs(os.path.dirname(tam), exist_ok=True)
    with open(tam, "w", encoding="utf-8", newline="\n") as f:
        f.write(icerik)
    print("  yazıldı:", yol)


# ── Ortak varlıklar ───────────────────────────────────────────────────────
ayar = {
    "ad": F["ad"], "tel": F["tel"], "telGorunen": F["tel_gorunen"], "wa": F["wa"],
    "yorumLink": F["yorum_link"], "ga": D.OLCUM["ga"], "aw": D.OLCUM["aw"], "donusum": D.OLCUM["donusum"],
    "cerezVarsayilan": D.OLCUM["cerez_varsayilan"], "sb": D.OLCUM["sb"], "sbKey": D.OLCUM["sb_key"],
}
SITE_JS = oku("_build/js/site.js").replace("__GT_CONFIG__", json.dumps(ayar, ensure_ascii=False))
def kucult(c):
    """CSS'i küçültür: yorumları ve gereksiz boşlukları atar."""
    c = re.sub(r"/\*.*?\*/", "", c, flags=re.S)
    c = re.sub(r"\s*\n\s*", " ", c)
    return re.sub(r"\s*([{};,>])\s*", r"\1", c).replace(";}", "}")


EK_CSS = ".gt-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}.gt-atla{position:absolute;left:-999px;top:0;z-index:10000;background:#0F1E3C;color:#fff;padding:10px 14px;border-radius:0 0 8px 0;}.gt-atla:focus{left:0;}.gt-metin{font-size:.92rem;line-height:1.75;color:#334155;}.gt-metin h2{font:700 1.2rem/1.3 'Barlow Condensed',system-ui,sans-serif;color:#0F1E3C;margin:1.6rem 0 .5rem;}.gt-metin p,.gt-metin ul{margin:0 0 .9rem;}.gt-metin ul{padding-left:1.2rem;}.gt-metin a{color:#0F1E3C;text-decoration:underline;}"
SITE_CSS = kucult(oku("_build/css/common.css") + EK_CSS)
LANDING_CSS = kucult(oku("_build/_landing_base.css") + "\n" + oku("_build/css/landing.css"))
V = hashlib.md5((SITE_JS + SITE_CSS + LANDING_CSS).encode("utf-8")).hexdigest()[:8]

IKON_TEL = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>'
IKON_WA = '<svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.95 7.95 0 01-4.073-1.117l-.292-.174-3.024.858.829-2.955-.19-.303A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>'
LOGO = '<svg viewBox="0 0 90 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="lg1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#F59E0B"/><stop offset="100%" stop-color="#D97706"/></linearGradient><linearGradient id="lg2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#1E3A8A"/><stop offset="100%" stop-color="#0F172A"/></linearGradient></defs><polygon points="47,6 24,58 38,58 30,114 47,73" fill="url(#lg1)"/><polygon points="47,6 47,73 60,114 66,58 52,58" fill="url(#lg2)"/></svg>'
GT_BOLT = '<svg viewBox="0 0 90 120" aria-hidden="true"><polygon points="47,6 24,58 38,58 30,114 47,73" fill="#E9FF3B"/><polygon points="47,6 47,73 60,114 66,58 52,58" fill="#3FF2DF"/></svg>'
GT_OK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'
def gt_buton(ek_sinif="", ek_attr=""):
    """Ana siteye (Gün Teknik) giden, ana sitenin renklerini taşıyan buton."""
    return '<a href="/" class="gt-git%s"%s aria-label="Gün Teknik ana sitesini ziyaret edin"><span class="gt-git-i">%s</span><span>Gün Teknik\'i ziyaret edin</span>%s</a>' % (ek_sinif, ek_attr, GT_BOLT, GT_OK)
GT_CSS = kucult(""".gt-git{display:inline-flex;align-items:center;gap:9px;min-height:44px;padding:0 16px 0 13px;border-radius:10px;background:#0C1610;border:1px solid rgba(233,255,59,.45);color:#E9FF3B !important;font:700 .84rem/1 'Inter',system-ui,sans-serif;letter-spacing:.02em;text-decoration:none;box-shadow:0 6px 18px rgba(12,22,16,.22);transition:box-shadow .25s,transform .2s,border-color .25s;}
.gt-git:hover{transform:translateY(-2px);border-color:#E9FF3B;box-shadow:0 0 18px rgba(233,255,59,.32),0 8px 24px rgba(12,22,16,.3);}
.gt-git-i{display:flex;filter:drop-shadow(0 0 4px rgba(233,255,59,.45));}
.gt-git-i svg{width:13px;height:17px;display:block;}
.gt-git>svg:last-child{width:14px;height:14px;color:#3FF2DF;}
.gt-git-wrap{margin-top:14px;}
.hero .gt-git-wrap{display:flex;justify-content:center;}""")
DEVRE = oku("_build/templates/_devre.svg").replace("<svg", '<svg data-gt-par="0.16"', 1)


def wa_href(metin):
    from urllib.parse import quote
    return "https://wa.me/%s?text=%s" % (F["wa"], quote(metin))


def isletme_schema(tip="LocalBusiness"):
    return {
        "@type": tip, "@id": SITE + "/#isletme", "name": F["ad"], "alternateName": F["eski_ad"],
        "url": SITE + "/", "telephone": F["tel"], "email": F["eposta"], "foundingDate": F["kurulus"], "priceRange": "₺₺",
        "image": SITE + "/og-image.jpg",
        "address": {"@type": "PostalAddress", "addressLocality": "Ortaca", "addressRegion": "Muğla", "addressCountry": "TR"},
        "areaServed": [{"@type": "City", "name": n} for n in ("Ortaca", "Dalyan", "Dalaman", "Köyceğiz")],
        "openingHoursSpecification": {"@type": "OpeningHoursSpecification",
                                      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                                      "opens": "00:00", "closes": "23:59"},
        "sameAs": [F["harita"]],
    }


def sss_schema(sorular):
    return {"@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": s, "acceptedAnswer": {"@type": "Answer", "text": c}} for s, c in sorular]}


def ld(graph):
    return '<script type="application/ld+json">' + json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False) + "</script>"


def sss_coz(liste, bolge=None):
    cikti = []
    for x in liste:
        s, c = D.SSS_ORTAK[x] if isinstance(x, str) else x
        if bolge:
            b = D.BOLGE[bolge]
            deg = dict(ye=b["ye"], nin=b["nin"], de=b["de"], sure=b["sure"], mahalleler=", ".join(b["mahalle"]))
            s, c = s.format(**deg), c.format(**deg)
        elif "{" in s or "{" in c:
            continue
        cikti.append((s, c))
    return cikti


def sss_html(sorular):
    return '<div class="gt-sss">' + "".join(
        "<details><summary>%s</summary><p>%s</p></details>" % (e(s), e(c)) for s, c in sorular) + "</div>"


def fiyat_html(anahtarlar):
    k = []
    for a in anahtarlar:
        f = D.FIYAT[a]
        k.append('<div class="gt-fiyat%s">%s<h3>%s</h3>%s<div class="gt-fiyat-yeni">%s%s</div><p>%s</p></div>' % (
            " kampanya" if f["etiket"] else "",
            '<span class="gt-fiyat-etiket">%s</span>' % e(f["etiket"]) if f["etiket"] else "",
            e(f["ad"]),
            '<div class="gt-fiyat-eski"><span class="gt-sr">Önceki fiyat: </span>%s</div>' % e(f["eski"]) if f["eski"] else "",
            e(f["yeni"]), " <small>%s</small>" % e(f["ek"]) if f.get("ek") else "", e(f["not"])))
    return '<div class="gt-fiyat-grid">' + "".join(k) + '</div><p class="gt-fiyat-not">%s</p>' % e(D.FIYAT_NOT)


def kart_html(kartlar):
    c = []
    for ad, acik, link in kartlar:
        bas = '<a href="%s">%s</a>' % (link, e(ad)) if link else e(ad)
        c.append('<div class="hiz-card gt-bel"><h3>%s</h3><p>%s</p></div>' % (bas, e(acik)))
    return '<div class="hiz-grid">' + "".join(c) + "</div>"


def altbilgi():
    return """<footer>
  <div class="footer-logo">%(ad)s</div>
  <div class="footer-bolge">%(bolge)s / Muğla · <a href="tel:%(tel)s">%(telg)s</a></div>
  <div class="gt-ft-links" role="navigation" aria-label="Alt bağlantılar">
    <a href="/">Ana Sayfa</a>%(branslar)s<a href="/landing/villa-bakim-paketi.html">Villa Bakım</a><a href="/kvkk.html">KVKK</a><a href="/gizlilik.html">Gizlilik ve Çerezler</a>
  </div>
  <div class="footer-copy">© <span data-gt-yil>%(yil)s</span> %(ad)s</div>
</footer>""" % dict(ad=e(F["ad"]), bolge=e(F["bolge_metin"]), tel=F["tel"], telg=F["tel_gorunen"], yil=YIL, branslar=brans_linkleri())


def brans_linkleri():
    return "".join('<a href="/landing/%s">%s</a>' % (D.GENEL[k], e(D.GENEL_AD[k])) for k in D.GENEL)


def sayfa(yol, title, desc, govde, graph, en=None, wa_metin="", uyari="genel", noindex=False, bar=True):
    kanonik = SITE + "/" + yol if yol != "index.html" else SITE + "/"
    hreflang = ""
    if en:
        hreflang = ('<link rel="alternate" hreflang="tr" href="%s"/>\n<link rel="alternate" hreflang="en" href="%s/%s"/>\n'
                    '<link rel="alternate" hreflang="x-default" href="%s"/>\n') % (kanonik, SITE, en, kanonik)
    dil = '<div class="lang-pill"><a href="/%s" class="on" aria-current="true">TR</a><a href="/%s" lang="en">EN</a></div>' % (yol, en) if en else ""
    return """<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>%(title)s</title>
<meta name="description" content="%(desc)s"/>
<link rel="canonical" href="%(kanonik)s"/>
<meta name="robots" content="%(robots)s"/>
%(hreflang)s<meta property="og:type" content="website"/>
<meta property="og:locale" content="tr_TR"/>
<meta property="og:site_name" content="%(ad)s"/>
<meta property="og:url" content="%(kanonik)s"/>
<meta property="og:title" content="%(title)s"/>
<meta property="og:description" content="%(desc)s"/>
<meta property="og:image" content="%(site)s/og-image.jpg"/>
<meta name="twitter:card" content="summary_large_image"/>
<link rel="icon" type="image/x-icon" href="/favicon.ico"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png"/>
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
<meta name="theme-color" content="#F8FAFC"/>
<link rel="preload" href="/fonts/barlow-condensed-latin-800-normal.woff2" as="font" type="font/woff2" crossorigin/>
<script>document.documentElement.classList.add('gt-js');setTimeout(function(){if(!window.GT_AN)document.documentElement.classList.add('gt-all')},3500)</script>
<style>%(css)s</style>
<script src="/assets/site.js?v=%(v)s" defer></script>
%(ld)s
</head>
<body data-gt-wa="%(wa)s"%(bar)s>
<a href="#icerik" class="gt-atla">İçeriğe geç</a>
<div id="pbar"></div>
<nav aria-label="Ana menü">
  <a href="/" class="nav-logo">%(logo)s%(ad)s</a>
  <div style="display:flex;align-items:center;gap:.7rem;">
    %(dil)s
    <a href="tel:%(tel)s" class="nav-tel" aria-label="Telefonla ara: %(telg)s">%(ikon_tel)s<span>%(telk)s</span></a>
  </div>
</nav>
<main id="icerik">
%(govde)s
</main>
%(altbilgi)s
<div class="float-btns">
  <a href="%(wa_href)s" class="float-btn float-btn-wa" target="_blank" rel="noopener" aria-label="WhatsApp'tan yazın"><span class="float-ring" aria-hidden="true"></span><svg viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg></a>
  <a href="tel:%(tel)s" class="float-btn float-btn-tel" aria-label="Telefonla arayın"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></a>
</div>
</body>
</html>
""" % dict(title=e(title), desc=e(desc), kanonik=kanonik, robots="noindex, follow" if noindex else "index, follow",
           hreflang=hreflang, ad=e(F["ad"]), site=SITE, v=V, css=SITE_CSS + LANDING_CSS + GT_CSS, ld=ld(graph) if graph else "", wa=e(wa_metin),
           bar="" if bar else ' data-gt-bar="0"', logo=LOGO, dil=dil, tel=F["tel"], telg=F["tel_gorunen"], telk=F["tel_kisa"],
           ikon_tel=IKON_TEL,
           govde=govde.replace("<!--UYARI-->", '<p class="gt-uyari" role="note">%s</p>' % D.UYARI[uyari] if uyari else ""), altbilgi=altbilgi(), wa_href=wa_href(wa_metin or "Merhaba, bilgi almak istiyorum."))


def cta(wa_metin):
    return ('<div class="cta-group"><a href="tel:%s" class="btn-tel gt-r">%s %s</a>'
            '<a href="%s" class="btn-wa gt-r" target="_blank" rel="noopener">%s WhatsApp\'ta Yazın</a></div>') % (
        F["tel"], IKON_TEL, F["tel_gorunen"], wa_href(wa_metin), IKON_WA)


def kahraman(rozet, h1a, h1b, ozet, wa_metin):
    return """<section class="hero">
  %s
  <div class="hero-inner">
    <div class="hero-badge gt-r">%s</div>
    <h1 class="gt-r">%s <em>%s</em></h1>
    <p class="hero-desc">%s</p>
    %s
    <div class="gt-git-wrap gt-r">%s</div>
  </div>
</section>""" % (DEVRE, e(rozet), e(h1a), e(h1b), e(ozet), cta(wa_metin), gt_buton())


def istatistik(sure_buyuk, sure_alt):
    return """<div class="stats">
  <div class="stat-card amber gt-r"><div class="stat-num">%s</div><div class="stat-lbl">Yıllık Tecrübe</div></div>
  <div class="stat-card amber gt-r"><div class="stat-num">%s</div><div class="stat-lbl">Tamamlanan İş</div></div>
  <div class="stat-card navy gt-r"><div class="stat-num buyuk">7/24</div><div class="stat-lbl">Acil Servis</div></div>
  <div class="stat-card navy gt-r"><div class="stat-num buyuk">%s</div><div class="stat-lbl">%s</div></div>
</div>
<!--UYARI-->""" % (F["tecrube"], F["is_sayisi"], e(sure_buyuk), e(sure_alt))


def neden_html():
    return '<div class="neden-grid">' + "".join(
        '<div class="neden-item gt-bel"><h3 style="font-family:var(--fd);font-size:1.05rem;font-weight:700;color:#B45309;margin-bottom:.35rem;">%s</h3><p>%s</p></div>' % (e(a), e(b))
        for a, b in D.NEDEN) + "</div>"


def yorum_bolumu():
    return """<section class="section bg2">
  <div class="sec-tag navy">Müşteri Yorumları</div>
  <h2 class="sec-h2">Google'daki Değerlendirmelerimiz</h2>
  <div data-gt-yorumlar="3"><p class="sec-desc" style="margin:0;"><a href="%s" target="_blank" rel="noopener" style="text-decoration:underline;">Google'da bizi değerlendirin</a></p></div>
</section>""" % F["yorum_link"]


def marka_bolumu():
    return """<section class="section">
  <div class="sec-tag navy">Tüm Markalar</div>
  <h2 class="sec-h2">Hangi Markalara Bakıyoruz?</h2>
  <p class="sec-desc">Aşağıdakiler dahil tüm marka klimalara özel servis veriyoruz. Yetkili servis değiliz; garanti ve sıfır ürün için direkt marka ile görüşünüz.</p>
  <div class="gt-chips">%s<span>ve diğer tüm markalar</span></div>
</section>""" % "".join("<span>%s</span>" % e(m) for m in D.MARKALAR)


def son_cta(baslik, metin, wa_metin):
    return '<section class="cta-band"><h2>%s</h2><p>%s</p>%s</section>' % (e(baslik), e(metin), cta(wa_metin))


def ic_baglanti(baslik, baglantilar):
    return '<section class="section"><div class="sec-tag amber">Diğer Sayfalar</div><h2 class="sec-h2">%s</h2><div class="gt-chips">%s</div></section>' % (
        e(baslik), "".join('<a href="%s">%s</a>' % (u, e(t)) for t, u in baglantilar))


URETILEN = []  # (yol, en_yol, oncelik)

# ── Şehir sayfaları ───────────────────────────────────────────────────────
DOSYA = D.DOSYA
GENEL = D.GENEL
for tur_k, tur in D.TUR.items():
    for b_k, b in D.BOLGE.items():
        yol = "landing/" + DOSYA[tur_k] % b_k
        en = "landing/" + (DOSYA[tur_k] % b_k).replace(".html", "-en.html")
        ad = "%s %s" % (b["ad"], tur["baslik"])
        if tur_k in ("klima", "elektrik"):
            title = "%s | 7/24 %s — %s" % (ad, "Özel Klima Servisi" if tur_k == "klima" else "Acil Elektrikçi", F["ad"])
        else:
            title = "%s | %s — %s" % (ad, tur["title_ek"], F["ad"])
        desc = tur["ozet"].format(de=b["de"]) + " %s %s içinde." % (b["ye"], b["sure"])
        wa_m = "Merhaba, %s için bilgi almak istiyorum." % ad
        sorular = sss_coz(D.SSS[tur_k], b_k)
        baglar = [("%s %s" % (b["ad"], D.TUR[t]["baslik"]), "/landing/" + DOSYA[t] % b_k) for t in D.TUR if t != tur_k]
        baglar += [("%s %s" % (x["ad"], tur["baslik"]), "/landing/" + DOSYA[tur_k] % k) for k, x in D.BOLGE.items() if k != b_k]
        baglar += [("Tüm Bölgeler: %s" % D.GENEL_AD[tur_k], "/landing/" + GENEL[tur_k]), ("Gün Teknik Ana Sayfa", "/")]
        govde = "\n".join([
            kahraman("7/24 · %s %s içinde" % (b["ye"], b["sure"]), b["ad"], tur["baslik"], tur["ozet"].format(de=b["de"]), wa_m),
            istatistik(b["sure"], "%s ulaşım" % b["ye"]),
            '<section class="section bg2" style="padding-top:48px;"><div class="sec-tag amber">Hizmetlerimiz</div><h2 class="sec-h2">%s %s</h2>%s</section>' % (e(b["de"]), e(tur["h2"]), kart_html(tur["kartlar"])),
            '<section class="section"><div class="sec-tag navy">Fiyatlar</div><h2 class="sec-h2">%s</h2>%s</section>' % (
                "Güncel Klima Fiyatları" if tur_k == "klima" else "Keşif ve Fiyat", fiyat_html(tur["fiyatlar"])),
            """<section class="section bg2"><div class="sec-tag amber">%s</div><h2 class="sec-h2">%s %s</h2>
  <p class="sec-desc">%s</p>
  <div class="bolge-grid">
    <div class="bolge-kutu gt-bel"><h3>Bu bölgede sık karşılaştığımız işler</h3><ul>%s</ul></div>
    <div class="bolge-kutu gt-bel"><h3>Geldiğimiz mahalleler</h3><div class="gt-chips">%s</div>
      <div class="bolge-sure"><b>%s</b><span>%s ortalama ulaşım süremiz. 7/24 arayabilirsiniz.</span></div></div>
  </div></section>""" % (e(b["ad"]), e(b["de"]), "Hizmet Bölgemiz", e(b["tanitim"]),
                         "".join("<li>%s</li>" % e(i) for i in tur["isler"][b_k]),
                         "".join("<span>%s</span>" % e(m) for m in b["mahalle"]), e(b["sure"]), e(b["ye"])),
            marka_bolumu() if tur_k == "klima" else "",
            '<section class="section%s"><div class="sec-tag navy">Neden %s?</div><h2 class="sec-h2">Hızlı, Açık Fiyatlı, Garantili</h2>%s</section>' % (" bg2" if tur_k == "klima" else "", e(F["ad"]), neden_html()),
            yorum_bolumu() if tur_k != "klima" else yorum_bolumu().replace('class="section bg2"', 'class="section"'),
            '<section class="section%s"><div class="sec-tag amber">Sık Sorulanlar</div><h2 class="sec-h2">%s Hakkında Sorular</h2>%s</section>' % (" bg2" if tur_k == "klima" else "", e(ad), sss_html(sorular)),
            ic_baglanti("Diğer Bölgeler ve Hizmetler", baglar),
            son_cta("%s Hemen Ulaşın" % b["de"], "%s %s içinde yanınızdayız. Arayın ya da WhatsApp'tan fotoğraf gönderin." % (b["ye"], b["sure"]), wa_m),
        ])
        hizmet = {"@type": "Service", "name": ad, "serviceType": tur["hizmet_adi"], "provider": {"@id": SITE + "/#isletme"},
                  "areaServed": {"@type": "City", "name": b["ad"]}, "url": SITE + "/" + yol}
        if tur_k == "klima":
            hizmet["offers"] = [{"@type": "Offer", "name": D.FIYAT[k]["ad"], "price": D.FIYAT[k]["sayi"], "priceCurrency": "TRY"} for k in ("bakim", "montaj")]
        graph = [isletme_schema(tur["schema"]), hizmet, sss_schema(sorular),
                 {"@type": "BreadcrumbList", "itemListElement": [
                     {"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": SITE + "/"},
                     {"@type": "ListItem", "position": 2, "name": D.GENEL_AD[tur_k], "item": SITE + "/landing/" + GENEL[tur_k]},
                     {"@type": "ListItem", "position": 3, "name": ad, "item": SITE + "/" + yol}]}]
        en_var = os.path.exists(os.path.join(KOK, en))
        yaz(yol, sayfa(yol, title, desc, govde, graph, en=en if en_var else None, wa_metin=wa_m, uyari=tur.get("uyari", tur_k)))
        URETILEN.append((yol, en if en_var else None, "0.8"))

# ── Branş genel siteleri (eski ana sayfanın tek branşlı hâli) ─────────────
BRANS_SABLON = oku("_build/templates/brans.html")
IKON_RENK = {"mg": "#D97706", "cy": "#1A3060"}


def ikon(ad, renk=None, kalin="1.5"):
    return '<svg viewBox="0 0 24 24" fill="none" stroke="%s" stroke-width="%s">%s</svg>' % (renk or "currentColor", kalin, BV.IKON[ad])


PANEL = """    <div class="svc-panel %(r)s px" data-from="bottom" data-speed="1.0" data-delay="%(d)s" role="button" tabindex="0" aria-expanded="false">
      <div class="svc-preview" aria-hidden="true">%(ikp)s</div>
      <div class="svc-num %(r)s">%(no)s</div>
      <div class="svc-icon %(r)s">%(ik)s</div>
      <h3 class="svc-h3">%(bas)s</h3>
      <p class="svc-short">%(kisa)s</p>
      <div class="svc-more"><p>%(uzun)s</p></div>
      <div class="svc-tog"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>Detay</div>
    </div>"""


def paneller_html(liste):
    c = []
    for i, (ik, bas, kisa, uzun) in enumerate(liste):
        r = "mg" if i % 4 in (0, 3) else "cy"
        c.append(PANEL % dict(r=r, d=(i % 4) * 60, ikp=ikon(ik, kalin="0.8"), no="%02d" % (i + 1), ik=ikon(ik, IKON_RENK[r]),
                              bas=bas, kisa=kisa, uzun=uzun))
    return "\n".join(c)


NEDEN_BLOK = """  <div class="sorb sorb-%(kr)s" aria-hidden="true"></div>
  <div class="two-col%(rev)s" style="margin-bottom:100px;">
    <div class="kpi-card kpi-%(kr)s px" data-from="%(yon)s" data-speed="1.0">
      <div class="kpi-l">%(kl)s</div>
      <div class="kpi-n" data-count="%(sayi)s" data-suffix="%(ek)s">%(gor)s</div>
      <div class="kpi-s">%(alt)s</div>
      <div class="kpi-trend up">%(trend)s</div>
      <div class="kpi-progress"><div class="kpi-progress-fill" data-fill="%(dolu)s"></div></div>
    </div>
    <div class="feat-col">
      <div class="px" data-from="bottom" data-speed="1.0"><div class="sec-tag %(renk)s">%(etiket)s</div></div>
      <div class="px" data-from="bottom" data-speed="0.95" data-delay="60"><h2 class="sec-h2">%(h2)s</h2></div>
%(maddeler)s
    </div>
  </div>"""
NEDEN_MADDE = """      <div class="feat-pt px" data-from="bottom" data-speed="1.0" data-delay="%d">
        <div class="fdot %s"></div>
        <div><h3>%s</h3><p>%s</p></div>
      </div>"""


def neden_brans_html(bloklar):
    c = []
    for i, bl in enumerate(bloklar):
        kl, sayi, ek, gor, alt, trend, dolu = bl["kpi"]
        renk, etiket = bl["tag"]
        kr = "mg" if i % 2 == 0 else "cy"
        c.append(NEDEN_BLOK % dict(kr=kr, rev="" if i % 2 == 0 else " rev", yon="left" if i % 2 == 0 else "right", kl=kl, sayi=sayi, ek=ek,
                                   gor=gor, alt=alt, trend=trend, dolu=dolu, renk=renk, etiket=etiket, h2=bl["h2"],
                                   maddeler="\n".join(NEDEN_MADDE % (80 + j * 60, renk, a, b) for j, (a, b) in enumerate(bl["maddeler"]))))
    return "\n\n".join(c)


DETAY = """    <div class="acc-item %s">
      <button class="acc-btn" aria-expanded="false">%s<span class="acc-arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg></span></button>
      <div class="acc-body"><div class="acc-inner">
        %s
      </div></div>
    </div>"""


def detay_html(liste):
    return "\n".join(DETAY % x for x in liste)


H1_STIL = [
    "display:block;color:#0F1E3C;font-size:1.12em;opacity:1;letter-spacing:.01em;",
    "display:block;color:#1E40AF;font-size:1.04em;opacity:0.92;text-shadow:0 0 20px rgba(30,64,175,.18), 0 0 60px rgba(30,64,175,.08);letter-spacing:-.005em;",
    "display:block;color:#1D4ED8;font-size:0.97em;opacity:0.82;text-shadow:0 0 30px rgba(29,78,216,.30), 0 0 80px rgba(29,78,216,.14);letter-spacing:-.01em;",
    "display:block;color:#3B82F6;font-size:0.88em;opacity:0.68;text-shadow:0 0 20px rgba(59,130,246,.35), 0 0 60px rgba(59,130,246,.18), 0 0 120px rgba(59,130,246,.08);letter-spacing:-.015em;",
]
H1_SATIR = """      <span class="px h1-line" data-px-y="0" data-speed-exit="%.1f" id="h%d">
        <span id="h%di" style="%s">%s</span>
      </span>"""
MARKA_BOLUM = """<!-- ═══ MARKALAR ═══ -->
<section id="s-markalar" class="section bg2">
  <div class="px" data-from="bottom" data-speed="1.0"><div class="sec-tag cy">Tüm Markalar</div></div>
  <div class="px" data-from="bottom" data-speed="0.95" data-delay="40"><h2 class="sec-h2">Tüm Markalar İçin Özel Servis</h2></div>
  <div class="px" data-from="bottom" data-speed="0.95" data-delay="60"><p class="sec-desc" style="margin-bottom:22px;">Aşağıdakiler dahil tüm marka klimalara bakım, arıza ve montaj hizmeti veriyoruz. Yetkili servis değiliz; garanti ve sıfır ürün için direkt marka ile görüşünüz.</p></div>
  <div class="gt-chips px" data-from="bottom" data-speed="0.9" data-delay="80">%s</div>
</section>"""
LS_KUTU = """<div class="ls-box" id="lsBox" role="dialog" aria-label="Dil önerisi">
  <p>Tarayıcı diliniz Türkçe değil. Bu sayfayı İngilizce görüntülemek ister misiniz?</p>
  <div class="ls-btns">
    <a href="/%s" class="ls-yes rip">View in English</a>
    <button class="ls-no" onclick="dismissLang()">Hayır, teşekkürler</button>
  </div>
</div>"""

BRANS_URET = []
for k, B in BV.BRANS.items():
    yol = "landing/" + GENEL[k]
    kanonik = SITE + "/" + yol
    tur = D.TUR[k]
    ad_genel = D.GENEL_AD[k]
    sorular = sss_coz(D.SSS[k]) + sss_coz(["sure_genel", "saat"])
    wa_m = B["wa"]
    en = B["en"]
    if en:
        hreflang = ('<link rel="alternate" hreflang="tr" href="%s"/>\n<link rel="alternate" hreflang="en" href="%s/%s"/>\n'
                    '<link rel="alternate" hreflang="x-default" href="%s"/>') % (kanonik, SITE, en, kanonik)
        dil = '<div class="lang-pill"><a href="/%s" class="on">TR</a><a href="/%s">EN</a></div>' % (yol, en)
        ls = LS_KUTU % en
    else:
        hreflang = dil = ls = ""
    bolge_link = ('<div class="px" data-from="bottom" data-speed="0.95" data-delay="60" style="margin-top:28px;">'
                  '<p class="sec-desc" style="margin-bottom:14px;">Bölgenize özel sayfamız: geldiğimiz mahalleler, ulaşım süremiz ve o bölgede sık yaptığımız işler.</p>'
                  '<div class="gt-chips">%s</div></div>') % "".join(
        '<a href="/landing/%s">%s %s</a>' % (DOSYA[k] % bk, e(D.BOLGE[bk]["ad"]), e(tur["baslik"])) for bk in BV.BOLGE_SIRA)
    diger = '<div class="gt-chips" style="margin-top:12px;">%s<a href="/">Gün Teknik Ana Sayfa</a></div>' % "".join(
        '<a href="/landing/%s">%s</a>' % (GENEL[t], e(D.GENEL_AD[t])) for t in GENEL if t != k)
    bolge_detay = "<p>%s; Dalyan dahil.</p><ul>%s</ul><p>Diğer hizmetlerimiz:</p>%s" % (
        e(F["bolge_metin"]),
        "".join('<li><a href="/landing/%s" style="color:var(--mg);text-decoration:underline;">%s %s</a>: %s %s içinde.</li>' % (
            DOSYA[k] % bk, e(D.BOLGE[bk]["ad"]), e(tur["baslik"]), e(D.BOLGE[bk]["ye"]), e(D.BOLGE[bk]["sure"])) for bk in BV.BOLGE_SIRA),
        diger)
    detay = B["detay"] + [("cy" if len(B["detay"]) % 2 == 0 else "mg", "Hizmet Bölgemiz — %s" % e(ad_genel), bolge_detay)]
    markalar = MARKA_BOLUM % ("".join("<span>%s</span>" % e(m) for m in D.MARKALAR) + "<span>ve diğer tüm markalar</span>") if k == "klima" else ""
    h1 = "\n".join(H1_SATIR % (.5 + i * .1, i + 1, i + 1, H1_STIL[i], t) for i, t in enumerate(B["h1"]))
    hizmet = {"@type": "Service", "name": ad_genel, "serviceType": tur["hizmet_adi"], "provider": {"@id": SITE + "/#isletme"}, "url": kanonik,
              "areaServed": [{"@type": "City", "name": n} for n in ("Ortaca", "Dalyan", "Dalaman", "Köyceğiz")]}
    teklif = [{"@type": "Offer", "name": D.FIYAT[f]["ad"], "price": D.FIYAT[f]["sayi"], "priceCurrency": "TRY"} for f in B["fiyatlar"] if D.FIYAT[f]["sayi"]]
    if teklif:
        hizmet["offers"] = teklif
    graph = [isletme_schema(B["schema"]), hizmet, sss_schema(sorular),
             {"@type": "BreadcrumbList", "itemListElement": [
                 {"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": SITE + "/"},
                 {"@type": "ListItem", "position": 2, "name": ad_genel, "item": kanonik}]}]
    degis = {
        "{{B_TITLE}}": e(B["title"]), "{{B_DESC}}": e(B["desc"]), "{{B_KANONIK}}": kanonik, "{{B_HREFLANG}}": hreflang,
        "{{B_LD}}": ld(graph), "{{B_CSS}}": GT_CSS,
        "{{B_WA}}": e(wa_m), "{{B_WA_HREF}}": wa_href(wa_m), "{{B_DIL}}": dil, "{{B_LS}}": ls, "{{B_H1}}": h1, "{{B_SUB}}": B["sub"],
        "{{B_GT_BTN}}": gt_buton(" rip px", ' data-px-y="0" data-speed-exit="0.45" data-exit-x="18"'),
        "{{B_UYARI}}": D.UYARI[B["uyari"]], "{{B_SVC_H2}}": B["svc_h2"], "{{B_SVC_DESC}}": B["svc_desc"],
        "{{B_PANELLER}}": paneller_html(B["paneller"]), "{{B_NEDEN}}": neden_brans_html(B["neden"]),
        "{{B_ACIL_DESC}}": B["acil_desc"], "{{B_ACIL}}": B["acil"], "{{B_BOLGE_LINK}}": bolge_link,
        "{{B_FORM_OPT}}": "".join("<option>%s</option>" % e(o) for o in B["form"]),
        "{{B_MARKALAR}}": markalar, "{{B_FIYAT_H2}}": B["fiyat_h2"], "{{B_FIYAT}}": fiyat_html(B["fiyatlar"]),
        "{{B_SSS}}": sss_html(sorular), "{{B_DETAY}}": detay_html(detay),
        "{{ALT_BAGLANTI}}": '<div class="gt-ft-links" role="navigation" aria-label="Alt bağlantılar"><a href="/">Ana Sayfa</a>%s<a href="/landing/villa-bakim-paketi.html">Villa Bakım</a><a href="/kvkk.html">KVKK</a><a href="/gizlilik.html">Gizlilik ve Çerezler</a></div>' % brans_linkleri(),
    }
    h_ = BRANS_SABLON
    for a_, b_ in degis.items():
        assert a_ in h_, a_
        h_ = h_.replace(a_, b_)
    BRANS_URET.append((yol, h_))
    URETILEN.append((yol, en, "0.9"))


# ── Kapatılan sayfalar: yönlendirme (reklam tıkları boşa gitmesin) ─────────
YONLENDIR = """<!DOCTYPE html>
<html lang="tr"><head><meta charset="UTF-8"/>
<title>Taşındı — %(ad)s</title>
<meta name="robots" content="noindex, follow"/>
<link rel="canonical" href="%(site)s%(hedef)s"/>
<meta http-equiv="refresh" content="0; url=%(hedef)s"/>
<script>location.replace(%(hedef_js)s+location.search+location.hash);</script>
</head><body><p>Bu sayfa taşındı: <a href="%(hedef)s">%(site)s%(hedef)s</a></p></body></html>
"""
for eski, hedef in D.KAPANAN.items():
    yaz(eski, YONLENDIR % dict(ad=e(F["ad"]), site=SITE, hedef=hedef, hedef_js=json.dumps(hedef)))


# ── KVKK, gizlilik, 404 ───────────────────────────────────────────────────
def metin_sayfa(yol, title, desc, baslik, icerik, noindex=False):
    govde = '<section class="section" style="max-width:860px;margin:0 auto;"><h1 class="sec-h2" style="margin-bottom:1.2rem;">%s</h1><div class="gt-metin">%s</div></section>' % (e(baslik), icerik)
    yaz(yol, sayfa(yol, title, desc, govde, None, uyari=None, noindex=noindex))


ILET = '<a href="tel:%s">%s</a> · <a href="mailto:%s">%s</a>' % (F["tel"], F["tel_gorunen"], F["eposta"], F["eposta"])
metin_sayfa("kvkk.html", "KVKK Aydınlatma Metni — %s" % F["ad"], "Gün Teknik kişisel verilerin korunması aydınlatma metni.", "KVKK Aydınlatma Metni", """
<p>Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 10. maddesi uyarınca sizi bilgilendirmek için hazırlanmıştır.</p>
<h2>Veri sorumlusu</h2><p>%(sorumlu)s (%(ad)s) · %(ilet)s</p>
<h2>Hangi verileri işliyoruz?</h2>
<ul><li><b>Teklif formu:</b> adınız, telefon numaranız, seçtiğiniz hizmet ve bölge, yazdığınız açıklama ve formu gönderdiğiniz sayfa.</li>
<li><b>Telefon ve WhatsApp:</b> bizimle paylaştığınız ad, numara, adres, fotoğraf ve mesajlar.</li>
<li><b>Site kullanımı:</b> çerezler aracılığıyla toplanan anonimleştirilmiş ziyaret ve reklam ölçüm verileri.</li></ul>
<h2>Neden işliyoruz?</h2>
<p>Talebinize dönüş yapmak, keşif ve fiyat teklifi vermek, hizmeti sunmak, işçilik garantisi kapsamındaki başvuruları takip etmek ve reklamlarımızın işe yarayıp yaramadığını ölçmek için.</p>
<h2>Hukuki sebep</h2>
<p>Sözleşmenin kurulması ve ifası, meşru menfaatimiz ve ölçüm çerezleri bakımından sizin tercihiniz (KVKK m. 5).</p>
<h2>Kimlerle paylaşıyoruz?</h2>
<p>Verilerinizi satmıyor ve pazarlama amacıyla üçüncü kişilere vermiyoruz. Teklif talepleri, yalnızca ekibimizin erişebildiği iş takip sistemimizde saklanır; bu sistemin altyapı hizmeti (Supabase) ve ölçüm araçları (Google Analytics, Google Ads) yurt dışında sunucu kullanabilir. Form gönderdiğinizde, izin vermişseniz telefon numaranız reklam dönüşümünün doğru eşleşmesi için şifrelenmiş (özetlenmiş) olarak Google'a iletilir.</p>
<h2>Ne kadar saklıyoruz?</h2>
<p>İşe dönüşmeyen talepler en geç bir yıl içinde silinir. Yapılan işlere ait kayıtlar yasal saklama süreleri boyunca tutulur.</p>
<h2>Haklarınız</h2>
<p>KVKK'nın 11. maddesi uyarınca verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini ya da silinmesini isteme ve işlemeye itiraz etme hakkına sahipsiniz. Başvurularınızı yukarıdaki telefon ya da e-posta üzerinden iletebilirsiniz; en geç 30 gün içinde yanıtlarız.</p>
<p style="color:#64748B;font-size:.8rem;">Son güncelleme: %(bugun)s</p>""" % dict(sorumlu=e(F["sorumlu"]), ad=e(F["ad"]), ilet=ILET, bugun=BUGUN))

metin_sayfa("gizlilik.html", "Gizlilik ve Çerezler — %s" % F["ad"], "Gün Teknik gizlilik politikası ve çerez bilgilendirmesi.", "Gizlilik ve Çerezler", """
<p>%(ad)s olarak sitemizi ziyaret ettiğinizde ve bizimle iletişime geçtiğinizde paylaştığınız bilgileri yalnızca size hizmet vermek için kullanırız. Ayrıntılar için <a href="/kvkk.html">KVKK Aydınlatma Metni</a>'ne bakabilirsiniz.</p>
<h2>Kullandığımız çerezler</h2>
<ul><li><b>Google Analytics:</b> hangi sayfaların ziyaret edildiğini anonim olarak ölçer.</li>
<li><b>Google Ads:</b> reklamdan gelen ziyaretçinin bizi arayıp aramadığını ya da form gönderip göndermediğini ölçer.</li>
<li><b>Tercih kaydı:</b> çerez tercihinizi tarayıcınızda saklar.</li></ul>
<p>Sitemizde reklam gösterilmez; veriler üçüncü kişilere satılmaz.</p>
<h2>Tercihinizi değiştirme</h2>
<p>Ölçüm çerezlerini istemiyorsanız aşağıdaki düğmeyle reddedebilirsiniz. Tercihiniz bu tarayıcıda saklanır.</p>
<p><button type="button" class="gt-yorum-btn" style="margin:0;" onclick="try{localStorage.setItem('gt_cerez','no')}catch(e){};if(window.gtag)gtag('consent','update',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});this.textContent='Ölçüm çerezleri reddedildi';">Ölçüm çerezlerini reddet</button>
<button type="button" class="gt-yorum-btn" style="margin:0 0 0 8px;" onclick="try{localStorage.setItem('gt_cerez','ok')}catch(e){};if(window.gtag)gtag('consent','update',{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});this.textContent='Ölçüm çerezlerine izin verildi';">İzin ver</button></p>
<h2>İletişim</h2><p>%(sorumlu)s (%(ad)s) · %(ilet)s</p>
<p style="color:#64748B;font-size:.8rem;">Son güncelleme: %(bugun)s</p>""" % dict(sorumlu=e(F["sorumlu"]), ad=e(F["ad"]), ilet=ILET, bugun=BUGUN))

metin_sayfa("404.html", "Sayfa Bulunamadı — %s" % F["ad"], "Aradığınız sayfa bulunamadı.", "Sayfa bulunamadı", """
<p>Aradığınız sayfa taşınmış ya da kaldırılmış olabilir. Aşağıdaki sayfalardan devam edebilir ya da bizi doğrudan arayabilirsiniz.</p>
<div class="gt-chips" style="margin:1.2rem 0;"><a href="/">Ana Sayfa</a>%s</div>
%s""" % (brans_linkleri(), cta("Merhaba, bilgi almak istiyorum.")), noindex=True)

# ── Şablondan üretilen sayfalar: ana sayfa, villa, teklif onayı ───────────
def doldur(s):
    degis = {
        "{{AD}}": e(F["ad"]), "{{TEL}}": F["tel"], "{{TEL_GORUNEN}}": F["tel_gorunen"], "{{WA}}": F["wa"],
        "{{EPOSTA}}": F["eposta"], "{{SITE_CSS}}": SITE_CSS, "{{YIL}}": str(YIL), "{{V}}": V, "{{YORUM_LINK}}": F["yorum_link"],
        "{{BOLGE_KISA}}": e(F["bolge_kisa"]), "{{BOLGE_METIN}}": e(F["bolge_metin"]),
        "{{UYARI_GENEL}}": D.UYARI["genel"],
        "{{ANA_SSS}}": sss_html(D.ANA_SSS),
        "{{ANA_FIYAT}}": fiyat_html(["bakim", "montaj", "gaz", "kesif"]),
        "{{ANA_MARKA}}": "".join("<span>%s</span>" % e(m) for m in D.MARKALAR) + "<span>ve diğer tüm markalar</span>",
        "{{ANA_LD}}": ld([isletme_schema(["Electrician", "HVACBusiness"]), sss_schema(D.ANA_SSS),
                          {"@type": "WebSite", "@id": SITE + "/#site", "url": SITE + "/", "name": F["ad"], "inLanguage": "tr"}]),
        "{{ALT_BAGLANTI}}": '<div class="gt-ft-links" role="navigation" aria-label="Alt bağlantılar"><a href="/landing/klima-bakim-temizlik.html">Klima Bakım</a><a href="/landing/klima-ariza-gaz-dolumu.html">Klima Arıza</a><a href="/landing/klima-montaj.html">Klima Montaj</a><a href="/landing/ortaca-elektrikci.html">Elektrikçi</a><a href="/landing/hidrofor-pompa.html">Hidrofor</a><a href="/landing/uydu-canak-anten.html">Uydu</a><a href="/landing/villa-bakim-paketi.html">Villa Bakım</a><a href="/kvkk.html">KVKK</a><a href="/gizlilik.html">Gizlilik ve Çerezler</a></div>',
    }
    for k, v in degis.items():
        s = s.replace(k, v)
    kalan = re.findall(r"\{\{[A-Z_]+\}\}", s)
    if kalan:
        raise SystemExit("Doldurulmamış alan: %s" % set(kalan))
    return s


for sablon, hedef in (("index.html", "index.html"), ("villa-bakim-paketi.html", "landing/villa-bakim-paketi.html"), ("onay.html", "onay.html")):
    yaz(hedef, doldur(oku("_build/templates/" + sablon)))

for yol, h in BRANS_URET:
    yaz(yol, doldur(h))

# ── Ortak dosyalar, site haritası, robots ─────────────────────────────────
yaz("assets/site.css", SITE_CSS)
yaz("assets/landing.css", LANDING_CSS)
yaz("assets/site.js", SITE_JS)

satirlar = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']


def url_ekle(yol, en, oncelik, sik="monthly"):
    tr_u = SITE + "/" + ("" if yol == "index.html" else yol)
    alt = ""
    if en:
        en_u = SITE + "/" + en
        alt = ('<xhtml:link rel="alternate" hreflang="tr" href="%s"/><xhtml:link rel="alternate" hreflang="en" href="%s"/>'
               '<xhtml:link rel="alternate" hreflang="x-default" href="%s"/>') % (tr_u, en_u, tr_u)
    satirlar.append("<url><loc>%s</loc><lastmod>%s</lastmod><changefreq>%s</changefreq><priority>%s</priority>%s</url>" % (tr_u, BUGUN, sik, oncelik, alt))
    if en:
        en_tarih = "2026-07-12"  # İngilizce sayfalar bu tarihten beri değişmedi; güncellenince burası da güncellenir
        satirlar.append("<url><loc>%s</loc><lastmod>%s</lastmod><changefreq>%s</changefreq><priority>%s</priority>%s</url>" % (en_u, en_tarih, sik, oncelik, alt))


url_ekle("index.html", "index-en.html", "1.0", "weekly")
url_ekle("landing/villa-bakim-paketi.html", "landing/villa-maintenance-package-en.html", "0.9")
for yol, en, onc in sorted(URETILEN, key=lambda x: (-float(x[2]), x[0])):
    url_ekle(yol, en, onc)
url_ekle("kvkk.html", None, "0.2", "yearly")
url_ekle("gizlilik.html", None, "0.2", "yearly")
satirlar.append("</urlset>")
yaz("sitemap.xml", "\n".join(satirlar) + "\n")

yaz("robots.txt", """User-agent: *
Allow: /
Disallow: /onay.html

Sitemap: %s/sitemap.xml

User-agent: MJ12bot
Disallow: /
""" % SITE)
print("Bitti. Sürüm:", V)
