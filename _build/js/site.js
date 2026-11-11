/* Gün Teknik — ortak site betiği. Kaynak: _build/js/site.js (assets/site.js bu dosyadan üretilir; GT ayarları _build/data.py içindedir). */
(function () {
  'use strict';
  var GT = __GT_CONFIG__;
  window.GT = GT;
  var d = document, w = window;

  /* ───────── Çerez tercihi + Google etiketi ───────── */
  var tercih = null;
  try { tercih = localStorage.getItem('gt_cerez'); } catch (e) {}
  var izin = tercih ? tercih === 'ok' : GT.cerezVarsayilan === 'acik';
  w.dataLayer = w.dataLayer || [];
  function gtag() { w.dataLayer.push(arguments); }
  w.gtag = w.gtag || gtag;
  function izinDurum(v) {
    var s = v ? 'granted' : 'denied';
    return { ad_storage: s, analytics_storage: s, ad_user_data: s, ad_personalization: s };
  }
  gtag('consent', 'default', izinDurum(izin));
  gtag('js', new Date());
  gtag('config', GT.ga);
  gtag('config', GT.aw);
  function etiketYukle() {
    if (d.getElementById('gt-gtag')) return;
    var s = d.createElement('script');
    s.id = 'gt-gtag'; s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GT.ga;
    d.head.appendChild(s);
  }
  if (d.readyState === 'complete') etiketYukle(); else w.addEventListener('load', etiketYukle);

  function donusum(etiket, ad) {
    try {
      gtag('event', 'conversion', { send_to: GT.aw + '/' + etiket, value: 1.0, currency: 'TRY' });
      gtag('event', ad, { sayfa: location.pathname });
    } catch (e) {}
  }
  /* Eski sayfalardaki onclick="trackTel()" çağrıları hata vermesin; sayım aşağıdaki tek dinleyicide yapılır */
  var sonTik = 0;
  w.trackTel = function () { if (Date.now() - sonTik > 800) donusum(GT.donusum.tel, 'telefon_tiklama'); };
  w.trackWA = function () { if (Date.now() - sonTik > 800) donusum(GT.donusum.wa, 'whatsapp_tiklama'); };
  d.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (h.indexOf('tel:') === 0) { sonTik = Date.now(); donusum(GT.donusum.tel, 'telefon_tiklama'); }
    else if (h.indexOf('wa.me/') > -1 || h.indexOf('api.whatsapp.com') > -1) { sonTik = Date.now(); donusum(GT.donusum.wa, 'whatsapp_tiklama'); }
  }, true);

  /* Reklamdan gelen ziyareti hatırla (form kaydına işlenir) */
  var reklam = false;
  try {
    if (/[?&](gclid|gbraid|wbraid)=/.test(location.search)) sessionStorage.setItem('gt_reklam', '1');
    reklam = sessionStorage.getItem('gt_reklam') === '1';
  } catch (e) {}

  /* ───────── Yardımcılar ───────── */
  function el(tag, cls, txt) {
    var n = d.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }
  var IKON_TEL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>';
  var IKON_WA = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.95 7.95 0 01-4.073-1.117l-.292-.174-3.024.858.829-2.955-.19-.303A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>';
  function waLink(metin) { return 'https://wa.me/' + GT.wa + '?text=' + encodeURIComponent(metin || 'Merhaba, bilgi almak istiyorum.'); }

  function hazir(fn) { if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', fn); else fn(); }

  hazir(function () {
    var body = d.body;

    /* ───────── Mobil sabit alt çubuk ───────── */
    if (body.getAttribute('data-gt-bar') !== '0') {
      var bar = el('div', 'gt-bar');
      bar.setAttribute('role', 'complementary');
      bar.setAttribute('aria-label', 'Hızlı iletişim');
      bar.appendChild(el('span', 'gt-bar-acil', '7/24 Acil Servis'));
      var t = el('a', 'gt-bar-tel'); t.href = 'tel:' + GT.tel; t.innerHTML = IKON_TEL + '<span>Hemen Ara</span>';
      var wa = el('a', 'gt-bar-wa'); wa.href = waLink(body.getAttribute('data-gt-wa')); wa.target = '_blank'; wa.rel = 'noopener'; wa.innerHTML = IKON_WA + '<span>WhatsApp</span>';
      bar.appendChild(t); bar.appendChild(wa);
      body.appendChild(bar);
      body.classList.add('gt-has-bar');
      /* Kahramandaki düğmeler ekrandayken gizli; onlar yukarıda kaybolunca yavaşça belirir */
      var cta = d.querySelector('#s-hero a[href^="tel:"]') || d.querySelector('.hero .cta-group') || d.querySelector('main a[href^="tel:"]');
      var barBekle = false;
      var barGuncel = function () {
        barBekle = false;
        var ac = cta ? cta.getBoundingClientRect().bottom < 60 : w.scrollY > 260;
        body.classList.toggle('gt-bar-on', ac);
      };
      w.addEventListener('scroll', function () { if (!barBekle) { barBekle = true; w.requestAnimationFrame(barGuncel); } }, { passive: true });
      barGuncel();
    }

    /* ───────── Çerez bildirimi (tek satır) ───────── */
    if (!tercih) {
      var c = el('div', 'gt-cerez');
      c.setAttribute('role', 'region'); c.setAttribute('aria-label', 'Çerez bildirimi');
      var sp = el('span');
      sp.appendChild(d.createTextNode('Ölçüm için çerez kullanıyoruz. '));
      var lk = el('a', null, 'Ayrıntı'); lk.href = '/gizlilik.html'; sp.appendChild(lk);
      var ok = el('button', 'gt-cerez-ok', 'Tamam'); ok.type = 'button';
      var no = el('button', 'gt-cerez-no', 'Reddet'); no.type = 'button';
      function sec(v) {
        try { localStorage.setItem('gt_cerez', v ? 'ok' : 'no'); } catch (e) {}
        gtag('consent', 'update', izinDurum(v)); izin = v; c.hidden = true;
      }
      ok.addEventListener('click', function () { sec(true); });
      no.addEventListener('click', function () { sec(false); });
      c.appendChild(sp); c.appendChild(no); c.appendChild(ok);
      body.appendChild(c);
    }

    /* ───────── Google yorumları ───────── */
    var kutular = d.querySelectorAll('[data-gt-yorumlar]');
    if (kutular.length) {
      fetch(GT.sb + '/rest/v1/rpc/site_yorumlar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: GT.sbKey, Authorization: 'Bearer ' + GT.sbKey },
        body: '{}'
      }).then(function (r) { return r.ok ? r.json() : null; }).then(function (v) {
        Array.prototype.forEach.call(kutular, function (k) { yorumCiz(k, v); });
      }).catch(function () {
        Array.prototype.forEach.call(kutular, function (k) { yorumCiz(k, null); });
      });
    }
    function yildiz(n) { n = Math.round(n || 0); return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n); }
    function yorumCiz(k, v) {
      k.textContent = '';
      var ozet = el('div', 'gt-yorum-ozet');
      if (v && v.puan && v.adet) {
        ozet.appendChild(el('div', 'gt-yorum-puan', Number(v.puan).toFixed(1).replace('.', ',')));
        var orta = el('div');
        var y = el('div', 'gt-yildiz', yildiz(v.puan)); y.setAttribute('aria-label', '5 üzerinden ' + v.puan + ' puan');
        orta.appendChild(y);
        orta.appendChild(el('div', 'gt-yorum-say', 'Google\'da ' + v.adet + ' değerlendirme'));
        ozet.appendChild(orta);
      } else {
        ozet.appendChild(el('div', 'gt-yorum-say', 'Hizmetimizden memnun kaldıysanız Google\'da değerlendirmeniz bize çok yardımcı olur.'));
      }
      var b = el('a', 'gt-yorum-btn', 'Google\'da Bizi Değerlendirin'); b.href = GT.yorumLink; b.target = '_blank'; b.rel = 'noopener';
      ozet.appendChild(b);
      k.appendChild(ozet);
      var liste = (v && v.yorumlar) || [];
      var enFazla = parseInt(k.getAttribute('data-gt-yorumlar'), 10) || 5;
      if (liste.length) {
        var grid = el('div', 'gt-yorum-grid');
        liste.slice(0, enFazla).forEach(function (yr) {
          var kart = el('article', 'gt-yorum-kart');
          var ad;
          if (yr.profil && /^https:\/\//.test(yr.profil)) { ad = el('a', 'gt-yorum-ad', yr.ad || 'Google kullanıcısı'); ad.href = yr.profil; ad.target = '_blank'; ad.rel = 'noopener nofollow'; }
          else ad = el('div', 'gt-yorum-ad', yr.ad || 'Google kullanıcısı');
          kart.appendChild(ad);
          var ys = el('div', 'gt-yildiz', yildiz(yr.puan)); ys.setAttribute('aria-label', yr.puan + ' yıldız'); kart.appendChild(ys);
          kart.appendChild(el('p', 'gt-yorum-metin', yr.metin));
          kart.appendChild(el('div', 'gt-yorum-alt', (yr.zaman || '') + ' · Google yorumu'));
          grid.appendChild(kart);
        });
        k.appendChild(grid);
        var kay = el('div', 'gt-yorum-kaynak');
        kay.appendChild(d.createTextNode('Yorumlar Google İşletme Profilimizden alınmıştır. '));
        if (v.url) { var tum = el('a', null, 'Tümünü Google\'da görün'); tum.href = v.url; tum.target = '_blank'; tum.rel = 'noopener'; kay.appendChild(tum); }
        k.appendChild(kay);
      }
    }

    /* ───────── Teklif formu: önce ERP'ye kayıt, sonra isteğe bağlı WhatsApp ───────── */
    Array.prototype.forEach.call(d.querySelectorAll('[data-gt-form]'), function (f) {
      var msg = f.querySelector('.gt-form-msg');
      var btn = f.querySelector('[data-gt-gonder]');
      function al(ad) { var x = f.querySelector('[name="' + ad + '"]'); return x ? String(x.value || '').trim() : ''; }
      function goster(tur, parcalar) {
        if (!msg) return;
        msg.textContent = ''; msg.className = 'gt-form-msg ' + tur; msg.hidden = false;
        parcalar.forEach(function (p) { msg.appendChild(typeof p === 'string' ? d.createTextNode(p) : p); });
        msg.setAttribute('tabindex', '-1'); msg.focus();
      }
      function gonder(e) {
        if (e) e.preventDefault();
        var ad = al('ad'), tel = al('tel'), hizmet = al('hizmet'), bolge = al('bolge'), acik = al('aciklama');
        var rakam = tel.replace(/\D/g, '');
        var eksik = [];
        if (ad.length < 2) eksik.push('adınızı');
        if (rakam.length < 10) eksik.push('telefon numaranızı');
        if (f.querySelector('[name="hizmet"]') && !hizmet) eksik.push('hizmet türünü');
        if (f.querySelector('[name="bolge"]') && !bolge) eksik.push('bölgeyi');
        if (eksik.length) { goster('hata', ['Lütfen ' + eksik.join(', ') + ' yazın.']); return; }
        if (al('web')) return; /* botlar için gizli alan */
        if (btn) btn.disabled = true;
        var veri = { ad: ad, tel: tel, hizmet: hizmet, bolge: bolge, aciklama: acik, sayfa: location.pathname, reklam: reklam };
        fetch(GT.sb + '/rest/v1/rpc/web_talep_gonder', {
          method: 'POST', keepalive: true,
          headers: { 'Content-Type': 'application/json', apikey: GT.sbKey, Authorization: 'Bearer ' + GT.sbKey },
          body: JSON.stringify({ p: veri })
        }).then(function (r) { return r.ok ? r.json() : { ok: false }; }).then(function (s) {
          if (btn) btn.disabled = false;
          var metin = 'Merhaba, fiyat teklifi almak istiyorum.\nAd: ' + ad + '\nTel: ' + tel + (hizmet ? '\nHizmet: ' + hizmet : '') + (bolge ? '\nBölge: ' + bolge : '') + (acik ? '\nNot: ' + acik : '');
          var wl = el('a', null, 'WhatsApp\'tan da yazın'); wl.href = waLink(metin); wl.target = '_blank'; wl.rel = 'noopener'; wl.style.textDecoration = 'underline'; wl.style.color = 'inherit';
          if (s && s.ok) {
            if (izin) { try { var e164 = rakam.length === 10 ? '+90' + rakam : (rakam.length === 11 && rakam[0] === '0' ? '+9' + rakam : '+' + rakam); gtag('set', 'user_data', { phone_number: e164 }); } catch (x) {} }
            donusum(GT.donusum.form, 'form_gonderimi');
            goster('ok', ['Talebiniz bize ulaştı, en kısa sürede sizi arayacağız. Fotoğraf göndermek isterseniz ', wl, '.']);
            if (f.reset) f.reset();
          } else {
            var ara = el('a', null, GT.telGorunen); ara.href = 'tel:' + GT.tel; ara.style.textDecoration = 'underline'; ara.style.color = 'inherit';
            goster('hata', ['Talep şu an kaydedilemedi. Lütfen bizi arayın: ', ara, ' ya da ', wl, '.']);
          }
        }).catch(function () {
          if (btn) btn.disabled = false;
          var ara2 = el('a', null, GT.telGorunen); ara2.href = 'tel:' + GT.tel; ara2.style.textDecoration = 'underline'; ara2.style.color = 'inherit';
          goster('hata', ['Bağlantı kurulamadı. Lütfen bizi arayın: ', ara2, '.']);
        });
      }
      if (f.tagName === 'FORM') f.addEventListener('submit', gonder);
      else if (btn) btn.addEventListener('click', gonder);
    });

    /* ───────── Akış: açılış sahnesi + kaydırınca tek seferlik, sıralı belirme ───────── */
    var az = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var kok = d.documentElement;
    w.GT_AN = 1;
    if (az || !('IntersectionObserver' in w)) { kok.classList.add('gt-all'); }
    else {
      var ADIM = 75;
      var yon = function (n) {
        var f = n.getAttribute('data-from');
        if (f === 'left') { n.style.setProperty('--gx', '-36px'); n.style.setProperty('--gy', '0px'); }
        else if (f === 'right') { n.style.setProperty('--gx', '36px'); n.style.setProperty('--gy', '0px'); }
        else if (f === 'scale') { n.style.setProperty('--gy', '0px'); n.style.setProperty('--gs', '.92'); }
      };
      var bitir = function (n, gecikme) {
        setTimeout(function () { n.classList.add('gt-ok'); n.classList.remove('gt-an', 'gt-in'); n.style.removeProperty('--gd'); }, gecikme + 1100);
      };
      var goster = function (n, gecikme) {
        n.style.setProperty('--gd', gecikme + 'ms');
        n.classList.add('gt-in');
        bitir(n, gecikme);
      };

      /* 1) Açılış sahnesi: kahraman bölümündeki parçalar sırayla */
      var sahne = Array.prototype.slice.call(d.querySelectorAll('#s-hero .px[data-speed-exit], .gt-r'));
      sahne.forEach(function (n) { if (!n.classList.contains('h1-line')) n.classList.add('gt-an'); });
      void kok.offsetWidth;
      w.requestAnimationFrame(function () {
        sahne.forEach(function (n, i) { goster(n, 60 + Math.min(i, 11) * 55); });
      });

      /* 2) Kaydırınca belirenler */
      var otomatik = '.section .sec-tag,.section .sec-h2,.section .sec-desc,.gt-fiyat,.gt-sss details,.gt-chips,.cta-band h2,.cta-band p,.cta-band .cta-group,.gt-metin>*,.acc-item,.teklif-wrap';
      var hedefler = [];
      Array.prototype.forEach.call(d.querySelectorAll('.px[data-from], .gt-bel'), function (n) { hedefler.push(n); });
      Array.prototype.forEach.call(d.querySelectorAll(otomatik), function (n) {
        /* zaten bir akış parçasının içindeyse ya da ekrandaysa dokunma (göz önünde kaybolup belirmesin) */
        if (n.closest('.px[data-from], .gt-bel, .gt-r, #s-hero')) return;
        if (n.getBoundingClientRect().top < w.innerHeight) return;
        hedefler.push(n);
      });
      var io = new IntersectionObserver(function (es) {
        var gelen = es.filter(function (x) { return x.isIntersecting; }).map(function (x) { return x.target; });
        if (!gelen.length) return;
        gelen.sort(function (a, b) { var ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect(); return (ra.top - rb.top) || (ra.left - rb.left); });
        gelen.forEach(function (n, i) { io.unobserve(n); goster(n, Math.min(i, 6) * ADIM); });
      }, { rootMargin: '0px 0px -9% 0px', threshold: 0.06 });
      hedefler.forEach(function (n) { yon(n); n.classList.add('gt-an'); io.observe(n); });

      /* 3) Süs: arka plan çizgileri kaydırmayla hafifçe kayar (içeriğe dokunmaz) */
      var par = Array.prototype.slice.call(d.querySelectorAll('[data-gt-par]'));
      if (par.length) {
        var parBekle = false;
        w.addEventListener('scroll', function () {
          if (parBekle) return; parBekle = true;
          w.requestAnimationFrame(function () {
            parBekle = false;
            var sy = w.scrollY; if (sy > w.innerHeight * 1.6) return;
            par.forEach(function (n) { n.style.transform = 'translate3d(0,' + (sy * parseFloat(n.getAttribute('data-gt-par'))).toFixed(1) + 'px,0)'; });
          });
        }, { passive: true });
      }
    }

    var pbar = d.getElementById('pbar');
    if (pbar) w.addEventListener('scroll', function () {
      var dh = d.documentElement.scrollHeight - w.innerHeight;
      pbar.style.width = (dh > 0 ? (w.scrollY / dh * 100).toFixed(1) : 0) + '%';
    }, { passive: true });

    /* Yıl */
    Array.prototype.forEach.call(d.querySelectorAll('[data-gt-yil]'), function (n) { n.textContent = new Date().getFullYear(); });
  });
})();
