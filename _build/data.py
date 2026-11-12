# -*- coding: utf-8 -*-
"""Gün Teknik sitesi — tek yerden yönetilen bilgiler ve sayfa içerikleri.

Telefon, fiyat, bölge, müdahale süresi gibi bilgiler SADECE burada değiştirilir;
ardından `python3 _build/build.py` çalıştırılır ve bütün Türkçe sayfalar yeniden üretilir.
"""

SITE = "https://www.gunelektrikklima.com"

FIRMA = {
    "ad": "Gün Teknik",
    "eski_ad": "Gün Elektrik & Klima",
    "slogan": "Elektrik Klima Uydu İnternet",
    "tel": "+905446529486",
    "tel_gorunen": "+90 544 652 94 86",
    "tel_kisa": "0544 652 94 86",
    "wa": "905446529486",
    "eposta": "info@gunelektrikklima.com",
    "sorumlu": "Gökay Gün",
    "kurulus": "2010",
    "tecrube": "15+",
    "is_sayisi": "2K+",
    "iscilik_garanti": "15 gün",
    "yorum_link": "https://g.page/r/Cdq32mSn9e6KEBE/review",
    "harita": "https://maps.google.com/?cid=10011209120991590362",
    "bolge_metin": "Ortaca, Dalaman, Köyceğiz ve bağlı tüm mahalleler",
    "bolge_kisa": "Dalyan · Ortaca · Dalaman · Köyceğiz",
}

# Google etiketleri ve Supabase (yalnızca herkese açık anahtar)
OLCUM = {
    "ga": "G-TXZ6DC22X2",
    "aw": "AW-11041830318",
    "donusum": {"tel": "ETbWCMGP0L8cEK7rk5Ep", "wa": "rMx_CIiE1bYdEK7rk5Ep", "form": "wYgiCIuE1bYdEK7rk5Ep"},
    # 'acik': ölçüm varsayılan açık, ziyaretçi "Reddet" derse kapanır. 'kapali': ziyaretçi "Tamam" demeden ölçüm yapılmaz.
    "cerez_varsayilan": "acik",
    "sb": "https://zfflnrerdevnflchscqe.supabase.co",
    "sb_key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmZmxucmVyZGV2bmZsY2hzY3FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MzQ3MjUsImV4cCI6MjA5NjQxMDcyNX0.uby8MidaKpnsceel5E_zTJm3LTYwoMrbKUryr5ZszcI",
}

UYARI = {
    "klima": "<strong>Tüm markalar için özel servis.</strong> Garanti ve sıfır ürün için direkt marka ile görüşünüz.",
    "elektrik": "<strong>Özel teknik servis.</strong> Elektrik kesintisi için dağıtım şirketini arayın (186).",
    "genel": "<strong>Özel teknik servis.</strong> Elektrik kesintisi için dağıtım şirketini (186), garantili cihazlar için markanın kendisini arayın.",
}

# ── Fiyatlar ──────────────────────────────────────────────────────────────
FIYAT = {
    "bakim": {"ad": "Klima Bakım ve Temizlik", "etiket": "Bahar Kampanyası", "eski": "2.500 TL", "yeni": "1.500 TL", "sayi": 1500,
              "not": "İç ve dış ünite temizliği, filtre yıkama, gaz basıncı ve drenaj kontrolü."},
    "montaj": {"ad": "Klima Montajı", "etiket": "Bahar Kampanyası", "eski": "4.000 TL", "yeni": "3.000 TL", "sayi": 3000,
               "not": "Split ve inverter klima montajı, vakumlama ve çalıştırma testi."},
    "gaz": {"ad": "Klima Gaz Dolumu", "etiket": "", "eski": "", "yeni": "Gramı 2 TL", "ek": "+ 1.000 TL işçilik", "sayi": None,
            "not": "Kaçak kontrolü yapılır, eksik gaz tartılarak tamamlanır; yalnızca basılan gaz kadar ödersiniz."},
    "kesif": {"ad": "Keşif", "etiket": "", "eski": "", "yeni": "Ücretsiz", "sayi": 0,
              "not": "Yerinde inceleme ve net fiyat teklifi. Onay vermeden işe başlanmaz."},
}
FIYAT_NOT = "Fiyatlar güncel kampanya fiyatlarıdır; net tutar cihaz ve mekân bilgisine göre telefonda veya ücretsiz keşifte teyit edilir."

MARKALAR = ["Daikin", "Mitsubishi", "Gree", "Samsung", "LG", "Vestel", "Arçelik", "Beko", "Bosch", "Toshiba", "Airfel", "Fujiplus"]

# ── Bölgeler ──────────────────────────────────────────────────────────────
BOLGE = {
    "ortaca": {
        "ad": "Ortaca", "de": "Ortaca'da", "nin": "Ortaca'nın", "ye": "Ortaca'ya", "sure": "1 saat",
        "mahalle": ["Atatürk", "Bahçelievler", "Cumhuriyet", "Akıncı", "Arıkbaşı", "Beşköprü", "Çaylı", "Dalaklı", "Dalyan", "Dereköy", "Dikmekavak", "Ekşiliyurt", "Eskiköy", "Fevziye", "Gökbel", "Gölbaşı", "Güzelyurt", "Karaburun", "Karadonlar", "Kemaliye", "Mergenli", "Okçular", "Sarıgerme", "Tepearası", "Terzialiler", "Yerbelen", "Yeşilyurt"],
        "tanitim": "Ortaca bizim merkezimiz. Çarşı içindeki iş yerlerinden Sarıgerme'deki yazlıklara kadar ilçenin her mahallesine aynı gün içinde ulaşıyoruz.",
    },
    "dalyan": {
        "ad": "Dalyan", "de": "Dalyan'da", "nin": "Dalyan'ın", "ye": "Dalyan'a", "sure": "1 saat",
        "mahalle": ["Dalyan merkez", "Çandır", "Okçular", "Eskiköy", "Gökbel", "Mergenli", "Tepearası", "Kavakarası"],
        "tanitim": "Dalyan bize en yakın bölge ve en çok çalıştığımız yerlerden biri. Villa, pansiyon, butik otel ve yazlıklarda sezon öncesi hazırlıktan sezon ortasındaki acil arızalara kadar yanınızdayız. Yurt dışında ya da başka şehirde yaşayan ev sahipleriyle işi WhatsApp üzerinden fotoğraf ve video ile yürütüyoruz.",
    },
    "dalaman": {
        "ad": "Dalaman", "de": "Dalaman'da", "nin": "Dalaman'ın", "ye": "Dalaman'a", "sure": "2 saat",
        "mahalle": ["Merkez", "Atakent", "Ege", "Hürriyet", "Akçataş", "Altıntaş", "Bezkese", "Bozbel", "Çöğmen", "Darıyeri", "Elcik", "Gürköy", "Gürlek", "Kapıkargın", "Karacaağaç", "Karaçalı", "Kargınkürü", "Kavacık", "Kayadibi", "Kızılkaya", "Narlı", "Sabunlu", "Şerefler", "Söğütlüyurt", "Taşbaşı"],
        "tanitim": "Dalaman merkezindeki konut ve iş yerlerine, havalimanı çevresine, Kapıkargın ve Gürköy tarafından Akçataş ve Sabunlu'ya kadar ilçenin bütün mahallelerine hizmet veriyoruz.",
    },
    "koycegiz": {
        "ad": "Köyceğiz", "de": "Köyceğiz'de", "nin": "Köyceğiz'in", "ye": "Köyceğiz'e", "sure": "2 saat",
        "mahalle": ["Köyceğiz", "Ulucami", "Gelişim", "Yeni", "Akköprü", "Balcılar", "Beyobası", "Çandır", "Çayhisar", "Döğüşbelen", "Ekincik", "Gülpınar", "Hamitköy", "Karaçam", "Kavakarası", "Otmanlar", "Pınar", "Sazak", "Sultaniye", "Toparlar", "Yangı", "Yayla", "Yeşilköy", "Zaferler", "Zeytinalanı"],
        "tanitim": "Köyceğiz merkezinden göl çevresindeki mahallelere, Toparlar ve Yangı'dan Sultaniye ve Ekincik'e, Beyobası ve Yayla tarafındaki köylere kadar geliyoruz.",
    },
}

# ── Hizmet türleri (şehir sayfaları için) ─────────────────────────────────
TUR = {
    "klima": {
        "baslik": "Klima Servisi", "h2": "Klima Hizmetleri", "hizmet_adi": "klima servisi", "schema": "HVACBusiness",
        "ozet": "{de} klima montajı, bakım ve temizlik, gaz dolumu ve arıza servisi. Tüm markalar için özel servis, 7/24.",
        "kartlar": [
            ("Bakım ve Temizlik", "İç-dış ünite yıkama, filtre temizliği, gaz ve drenaj kontrolü.", "/landing/klima-bakim-temizlik.html"),
            ("Arıza Servisi", "Soğutmuyor, ısıtmıyor, su akıtıyor, hata kodu veriyor: yerinde tespit ve onarım.", "/landing/klima-ariza-gaz-dolumu.html"),
            ("Gaz Dolumu", "Kaçak kontrolü ile birlikte tartılı gaz dolumu.", "/landing/klima-ariza-gaz-dolumu.html"),
            ("Klima Montajı", "Split ve inverter klima montajı, altyapı ve bakır boru dahil.", "/landing/klima-montaj.html"),
            ("Yer Değiştirme", "Söküm, taşıma ve yeniden montaj.", "/landing/klima-montaj.html"),
            ("Elektrik Altyapısı", "Klima hattı, sigorta ve pano bağlantısı aynı ekipten.", ""),
            ("VRF ve Kaset Sistemler", "İş yeri ve otellerde ticari klima kurulumu ve bakımı.", ""),
        ],
        "fiyatlar": ["bakim", "montaj", "gaz", "kesif"],
        "isler": {
            "ortaca": ["Yaz öncesi ev ve iş yeri klimalarında bakım ve temizlik", "Sarıgerme ve çevresindeki yazlıklarda sezon açılışı kontrolü", "Yeni taşınılan dairelerde klima montajı ve yer değiştirme", "Soğutmayan klimalarda gaz kaçağı tespiti ve dolum"],
            "dalyan": ["Villa ve pansiyonlarda sezon öncesi toplu klima bakımı", "Nem ve tuzlu hava nedeniyle yıpranan dış ünitelerde temizlik ve onarım", "Misafir varken çıkan arızalarda aynı gün müdahale", "Kışın kapalı kalan evlerde ilk çalıştırma ve koku giderme temizliği"],
            "dalaman": ["Sıcak ova ikliminde yoğun çalışan klimalarda yıllık bakım", "İş yeri ve mağazalarda klima montajı", "Soğutmayan klimalarda gaz kontrolü ve dolum", "Kiralık dairelerde giriş-çıkış öncesi klima temizliği"],
            "koycegiz": ["Göl çevresindeki nem nedeniyle küf ve koku yapan klimalarda detaylı temizlik", "Pansiyon ve apartlarda sezon öncesi bakım", "Uzak mahallelerde tek seferde bakım ve arıza kontrolü", "Yeni yapılan evlerde klima altyapısı ve montaj"],
        },
    },
    "elektrik": {
        "baslik": "Elektrikçi", "h2": "Elektrik Hizmetleri", "hizmet_adi": "elektrikçi", "schema": "Electrician",
        "ozet": "{de} elektrik arıza tespiti, tesisat, pano ve sigorta işleri için özel elektrikçi. 7/24 acil servis.",
        "kartlar": [
            ("Arıza ve Acil Servis", "Sigorta atması, kaçak akım, yanık kokusu, kısmi kesinti: 7/24 arıza tespiti ve onarım.", ""),
            ("Elektrik Tesisatı", "Konut ve iş yerinde yeni tesisat, yenileme ve kablo çekimi.", ""),
            ("Pano ve Sigorta", "Dağıtım panosu kurulumu, sigorta ve kaçak akım rölesi yenileme.", ""),
            ("Priz ve Anahtar", "Priz, anahtar, dimmer ve USB priz değişimi.", ""),
            ("Aydınlatma", "LED spot, avize, bahçe ve dış cephe aydınlatması.", ""),
            ("İnşaat ve Tadilat", "İnşaat, tadilat ve iş yeri elektrik işleri; proje ve keşif.", ""),
            ("Topraklama ve Ölçüm", "Topraklama kontrolü, kaçak tespiti ve tesisat ölçümü.", ""),
        ],
        "fiyatlar": ["kesif"],
        "isler": {
            "ortaca": ["Eski binalarda sigorta kutusu ve pano yenileme", "Çarşıdaki iş yerlerinde tesisat ve aydınlatma", "Sarıgerme yazlıklarında sezon öncesi tesisat kontrolü", "Gece atan sigorta ve kaçak akım arızaları"],
            "dalyan": ["Villa ve pansiyonlarda bahçe, havuz çevresi ve dış cephe aydınlatması", "Nem nedeniyle atan kaçak akım röleleri ve dış priz arızaları", "Sezon öncesi tesisat ve pano kontrolü", "Misafir varken çıkan elektrik arızalarına hızlı müdahale"],
            "dalaman": ["Konut ve iş yerlerinde tesisat yenileme", "Dükkân ve mağazalarda pano, priz ve aydınlatma işleri", "Klima ve şofben hatlarının ayrılması, sigorta düzenleme", "Kiralık dairelerde giriş öncesi elektrik kontrolü"],
            "koycegiz": ["Bahçe ve narenciye arazilerinde kuyu, pompa ve pano bağlantıları", "Pansiyon ve apartlarda tesisat kontrolü", "Uzak mahallelerde arıza tespiti ve tesisat yenileme", "Yeni yapılan evlerde elektrik tesisatı"],
        },
    },
}

SSS_ORTAK = {
    "sure": ("{ye} ne kadar sürede geliyorsunuz?", "{ye} normal koşullarda {sure} içinde ulaşıyoruz. Dalyan ve Ortaca için 1 saat, Dalaman ve Köyceğiz için 2 saat hedefliyoruz. Aradığınızda size net bir saat söyleriz."),
    "garanti": ("Yaptığınız işe garanti veriyor musunuz?", "Evet. İşçiliğimiz 15 gün garantilidir. Kullanılan malzemeler üreticinin kendi garantisi kapsamındadır."),
    "kesif": ("Keşif ücretli mi?", "Hayır, keşif ücretsizdir. Yerinde bakar, net fiyatı söyleriz; siz onay vermeden işe başlamayız."),
    "saat": ("Gece ya da hafta sonu hizmet veriyor musunuz?", "Evet, 7/24 çalışıyoruz. Mesai saatimiz yok; gece, hafta sonu ve bayramda da arayabilirsiniz."),
    "mahalle": ("{nin} hangi mahallelerine geliyorsunuz?", "{nin} bütün mahallelerine geliyoruz: {mahalleler}."),
}
SSS = {
    "klima": [
        ("Yetkili servis misiniz?", "Hayır. Gün Teknik bağımsız, özel bir teknik servistir ve tüm marka klimalara hizmet verir. Garantisi devam eden ya da yeni satın alınmış ürünler için direkt markanın kendisiyle görüşmeniz gerekir."),
        ("Klima bakım ve temizlik ücreti ne kadar?", "Bahar Kampanyası kapsamında klima bakım ve temizlik 2.500 TL yerine 1.500 TL."),
        ("Klima gaz dolumu ne kadar tutar?", "Gaz dolumunda gramı 2 TL, işçilik 1.000 TL. Önce kaçak kontrolü yapılır, yalnızca basılan gaz kadar ödersiniz."),
        ("Klima montaj ücreti ne kadar?", "Bahar Kampanyası kapsamında klima montajı 4.000 TL yerine 3.000 TL. Net tutar cihaz ve mekâna göre ücretsiz keşifte teyit edilir."),
        "sure", "garanti", "kesif", "mahalle",
    ],
    "elektrik": [
        ("Elektrikler kesildi, sizi mi aramalıyım?", "Kesinti sokağınızın ya da mahallenizin genelindeyse dağıtım şirketinin arıza hattını (186) aramalısınız; biz bir özel teknik servisiz, şebeke kesintilerine müdahale edemeyiz. Elektrik yalnızca sizin evinizde ya da iş yerinizde yoksa (sigorta atması, kaçak akım, pano arızası) bizi arayın."),
        ("Gece elektrikçi gelir mi?", "Evet. 7/24 acil elektrikçi hizmeti veriyoruz; gece yarısı atan sigorta ya da yanık kokusu gibi durumlarda arayabilirsiniz."),
        "sure", "garanti", "kesif", "mahalle",
    ],
}

NEDEN = [
    ("7/24 Acil Servis", "Mesai saatimiz yok. Gece, hafta sonu ve bayramda da telefona çıkıyoruz."),
    ("Ücretsiz Keşif", "Önce yerinde bakıyor, net fiyatı söylüyoruz. Gizli maliyet yok."),
    ("15+ Yıllık Tecrübe", "2010'dan bu yana Muğla'da binlerce iş tamamladık."),
    ("15 Gün İşçilik Garantisi", "İşçiliğimiz 15 gün garantilidir; malzemeler üretici garantisi kapsamındadır."),
]

# ── Bölgeden bağımsız hizmet sayfaları ────────────────────────────────────
HIZMET_SAYFA = {
    "klima-bakim-temizlik": {
        "tur": "klima", "yeni": True, "en": None,
        "title": "Klima Bakım ve Temizlik | Ortaca, Dalyan, Dalaman, Köyceğiz — Gün Teknik",
        "desc": "Ortaca, Dalyan, Dalaman ve Köyceğiz'de klima bakım ve temizlik: Bahar Kampanyası ile 2.500 TL yerine 1.500 TL. İç-dış ünite yıkama, filtre, gaz kontrolü.",
        "h1": ("Klima", "Bakım ve Temizlik"), "rozet": "Bahar Kampanyası · 1.500 TL",
        "ozet": "İç ve dış ünite yıkama, filtre temizliği, gaz basıncı ve drenaj kontrolü. Koku yapan, az soğutan, su akıtan klimalar için.",
        "h2": "Bakımda Neler Yapılır?",
        "kartlar": [
            ("İç Ünite Temizliği", "Filtreler, serpantin ve fan ilaçlı suyla yıkanır; küf ve koku giderilir.", ""),
            ("Dış Ünite Temizliği", "Kondenser peteği basınçlı suyla temizlenir; hava akışı açılır.", ""),
            ("Gaz Basıncı Kontrolü", "Gaz basıncı ölçülür; eksikse kaçak aranır ve size bilgi verilir.", ""),
            ("Drenaj Hattı", "Su akıtmaya neden olan tıkalı drenaj açılır.", ""),
            ("Elektrik ve Kumanda", "Bağlantılar, kumanda ve sensörler kontrol edilir.", ""),
            ("Çalıştırma Testi", "Soğutma ve ısıtmada üfleme sıcaklığı ölçülerek teslim edilir.", ""),
        ],
        "fiyatlar": ["bakim", "gaz", "kesif"],
        "ek_baslik": "Ne Zaman Bakım Gerekir?",
        "ek_liste": ["Klima eskisi kadar soğutmuyor ya da ısıtmıyorsa", "Çalışırken kötü koku geliyorsa", "İç üniteden su damlıyorsa", "Elektrik faturası sebepsiz arttıysa", "Son bakımın üzerinden bir yıl geçtiyse; yoğun kullanılan iş yeri ve pansiyonlarda yılda iki kez"],
        "sss": [
            ("Klima bakım ve temizlik ücreti ne kadar?", "Bahar Kampanyası kapsamında 2.500 TL yerine 1.500 TL."),
            ("Bakım ne kadar sürer?", "Bir split klimada bakım ve temizlik genellikle bir saat civarında sürer."),
            ("Bakımda gaz eksik çıkarsa ne olur?", "Önce kaçak aranır ve size bilgi verilir. Onay verirseniz gaz tartılarak tamamlanır: gramı 2 TL, işçilik 1.000 TL."),
            ("Yetkili servis misiniz?", "Hayır. Tüm markalar için özel servis veriyoruz. Garantisi devam eden ya da sıfır ürünler için direkt marka ile görüşünüz."),
            "garanti", "saat",
        ],
        "wa": "Merhaba, klima bakım ve temizlik için bilgi almak istiyorum.",
    },
    "klima-ariza-gaz-dolumu": {
        "tur": "klima", "yeni": True, "en": None,
        "title": "Klima Arıza ve Gaz Dolumu | Ortaca, Dalyan, Dalaman, Köyceğiz — Gün Teknik",
        "desc": "Klima soğutmuyor, su akıtıyor ya da hata kodu mu veriyor? Ortaca, Dalyan, Dalaman ve Köyceğiz'de 7/24 klima arıza servisi ve tartılı gaz dolumu.",
        "h1": ("Klima", "Arıza ve Gaz Dolumu"), "rozet": "7/24 Arıza Servisi",
        "ozet": "Soğutmayan, ısıtmayan, su akıtan ya da hata kodu veren klimalar için yerinde arıza tespiti. Gaz dolumunda yalnızca basılan gaz kadar ödersiniz.",
        "h2": "Hangi Arızalara Bakıyoruz?",
        "kartlar": [
            ("Soğutmuyor / Isıtmıyor", "Gaz eksikliği, kompresör, kondansatör ve sensör arızaları.", ""),
            ("Su Akıtıyor", "Tıkalı drenaj, eğim ve buzlanma kaynaklı su damlatma.", ""),
            ("Hata Kodu Veriyor", "Ekranda görünen arıza kodunun tespiti ve onarımı.", ""),
            ("Gaz Kaçağı ve Dolum", "Kaçak noktası bulunur, onarılır, gaz tartılarak basılır.", ""),
            ("Kart ve Motor", "Anakart, fan motoru ve kumanda alıcısı arızaları.", ""),
            ("Ses ve Titreşim", "Gürültülü çalışan iç ve dış ünitelerde tespit ve onarım.", ""),
        ],
        "fiyatlar": ["gaz", "bakim", "kesif"],
        "ek_baslik": "Aramadan Önce Bakabilecekleriniz",
        "ek_liste": ["Kumandanın pili ve modu (soğutma / ısıtma) doğru mu?", "Klimanın sigortası atmış olabilir mi?", "Filtreler çok kirliyse hava akışı düşer; çıkarıp yıkamayı deneyin", "Ekranda bir kod varsa fotoğrafını çekip WhatsApp'tan gönderin; gelmeden önce hazırlıklı oluruz"],
        "sss": [
            ("Klima gaz dolumu ne kadar tutar?", "Gramı 2 TL, işçilik 1.000 TL. Önce kaçak kontrolü yapılır; yalnızca basılan gaz kadar ödersiniz."),
            ("Klimanın gazı her yıl biter mi?", "Hayır. Klima gazı normalde eksilmez. Gaz azaldıysa bir kaçak vardır; kaçak giderilmeden yapılan dolum kısa sürede yine biter."),
            ("Yetkili servis misiniz?", "Hayır. Tüm markalar için özel servis veriyoruz. Garantisi devam eden ya da sıfır ürünler için direkt marka ile görüşünüz."),
            ("Arıza tespiti için ücret alıyor musunuz?", "Keşif ücretsizdir. Arızayı ve tutarı söyleriz; onay verirseniz onarıma başlarız."),
            "garanti", "saat",
        ],
        "wa": "Merhaba, klima arızası / gaz dolumu için bilgi almak istiyorum.",
    },
    "klima-montaj": {
        "tur": "klima", "yeni": True, "en": None,
        "title": "Klima Montajı | Ortaca, Dalyan, Dalaman, Köyceğiz — Gün Teknik",
        "desc": "Ortaca, Dalyan, Dalaman ve Köyceğiz'de klima montajı: Bahar Kampanyası ile 4.000 TL yerine 3.000 TL. Split ve inverter montaj, söküm ve yer değiştirme.",
        "h1": ("Klima", "Montajı"), "rozet": "Bahar Kampanyası · 3.000 TL",
        "ozet": "Split ve inverter klima montajı, söküm ve yer değiştirme. Klima hattı ve sigorta bağlantısı aynı ekip tarafından yapılır.",
        "h2": "Montaj Hizmetleri",
        "kartlar": [
            ("Split ve Inverter Montaj", "İç ve dış ünite montajı, bakır boru, drenaj ve vakumlama.", ""),
            ("Söküm ve Yer Değiştirme", "Gazı toplanarak söküm, taşıma ve yeni yerinde montaj.", ""),
            ("Elektrik Hattı", "Klimaya ayrı hat, sigorta ve pano bağlantısı.", ""),
            ("Altyapı Hazırlığı", "İnşaat ve tadilat aşamasında gömme boru ve drenaj altyapısı.", ""),
            ("Ticari Sistemler", "İş yeri ve otellerde kaset ve VRF sistem kurulumu.", ""),
            ("Çalıştırma Testi", "Kaçak testi, vakum ve üfleme sıcaklığı ölçümü ile teslim.", ""),
        ],
        "fiyatlar": ["montaj", "bakim", "kesif"],
        "ek_baslik": "Montaj Öncesi Bilmeniz Gerekenler",
        "ek_liste": ["Yeni cihazlarda bazı markalar garanti için kendi yetkili servisinin montajını şart koşar; satın alırken sorun", "Dış ünitenin yeri ve boru mesafesi tutarı etkileyebilir; fotoğraf gönderirseniz net fiyat veririz", "Oda büyüklüğüne göre kapasite (BTU) seçimi için arayabilirsiniz"],
        "sss": [
            ("Klima montaj ücreti ne kadar?", "Bahar Kampanyası kapsamında 4.000 TL yerine 3.000 TL. Net tutar cihaz ve mekâna göre ücretsiz keşifte teyit edilir."),
            ("Yeni aldığım klimayı siz takarsanız garantisi bozulur mu?", "Bu markaya göre değişir. Bazı markalar garanti için kendi yetkili servisinin montajını şart koşar. Biz özel servisiz; sıfır ve garantili ürünlerde önce marka ile görüşmenizi öneririz."),
            ("Klimamı başka bir odaya ya da eve taşıyabilir misiniz?", "Evet. Gazı toplanarak sökülür, taşınır ve yeni yerinde vakumlanarak takılır."),
            "garanti", "kesif", "saat",
        ],
        "wa": "Merhaba, klima montajı için bilgi almak istiyorum.",
    },
    "hidrofor-pompa": {
        "tur": "genel", "yeni": False, "en": "hidrofor-pompa-en.html",
        "title": "Hidrofor ve Pompa Servisi | Ortaca, Dalyan, Dalaman, Köyceğiz — Gün Teknik",
        "desc": "Ortaca, Dalyan, Dalaman ve Köyceğiz'de hidrofor kurulumu, dalgıç pompa montajı, kuyu panosu ve arıza servisi. 7/24.",
        "h1": ("Hidrofor", "ve Pompa"), "rozet": "7/24 Su Arıza Servisi",
        "ozet": "Hidrofor kurulumu, dalgıç pompa montajı, kuyu panosu ve arıza servisi. Su basmıyor, basınç düşük ya da pompa sürekli çalışıyorsa arayın.",
        "h2": "Hidrofor ve Pompa Hizmetleri",
        "kartlar": [
            ("Hidrofor Kurulumu", "Ev, villa ve binalarda sessiz ve frekans konvertörlü hidrofor montajı.", ""),
            ("Arıza Tespiti", "Su basmıyor, basınç düşük, sürekli devreye giriyor: yerinde tespit.", ""),
            ("Basınç Şalteri ve Tank", "Basınç şalteri ve genleşme tankı değişimi.", ""),
            ("Dalgıç Pompa", "Kuyu ve depo için dalgıç pompa kurulumu ve onarımı.", ""),
            ("Kuyu Panosu", "Pompa panosu, sıvı seviye rölesi ve elektrik bağlantısı.", ""),
            ("Bina Sistemleri", "Çok katlı binalarda su deposu ve hidrofor sistemleri.", ""),
        ],
        "fiyatlar": ["kesif"],
        "sss": [
            ("Hidrofor sürekli devreye girip çıkıyor, neden olur?", "Çoğunlukla genleşme tankının havası bitmiştir ya da tesisatta bir kaçak vardır. Basınç şalteri arızası da aynı belirtiyi verir; yerinde ölçerek tespit ediyoruz."),
            "sure_genel", "garanti", "kesif", "saat",
        ],
        "wa": "Merhaba, hidrofor / pompa için bilgi almak istiyorum.",
    },
    "uydu-canak-anten": {
        "tur": "genel", "yeni": False, "en": "uydu-canak-anten-en.html",
        "title": "Uydu, Çanak Anten ve TV Kurulumu | Ortaca, Dalyan, Dalaman, Köyceğiz — Gün Teknik",
        "desc": "Ortaca, Dalyan, Dalaman ve Köyceğiz'de çanak anten montajı, yön ayarı, LNB değişimi, merkezi uydu sistemi ve TV kanal kurulumu.",
        "h1": ("Uydu ve", "Çanak Anten"), "rozet": "Yerinde Kurulum ve Ayar",
        "ozet": "Çanak anten montajı, yön ayarı, LNB değişimi, kablolama ve TV kanal kurulumu. Sinyal yok ya da görüntü donuyorsa yerinde çözüyoruz.",
        "h2": "Uydu ve Anten Hizmetleri",
        "kartlar": [
            ("Çanak Anten Montajı", "Tekli ve çiftli çanak kurulumu, sinyal ölçer ile yön ayarı.", ""),
            ("LNB ve Alıcı", "LNB ve uydu alıcısı değişimi, ince ayar.", ""),
            ("TV Kanal Kurulumu", "Televizyonda kanal arama, sıralama ve uydu ayarları.", ""),
            ("Merkezi Sistem", "Bina, site, otel ve pansiyonlar için merkezi uydu sistemi.", ""),
            ("Sinyal Arızası", "Sinyal yok, görüntü donuyor, bazı kanallar çıkmıyor sorunları.", ""),
            ("Kablo Çekimi", "Uydu, anten ve Cat6 internet kablosu çekimi.", ""),
        ],
        "fiyatlar": ["kesif"],
        "sss": [
            ("Çanak ayarını kendim yapabilir miyim?", "Küçük kaymalarda mümkün, ancak sinyal ölçer olmadan doğru açıyı yakalamak zordur. Yerinde ölçüm cihazıyla ayar yapıyor, kanalları kurup teslim ediyoruz."),
            "sure_genel", "garanti", "kesif", "saat",
        ],
        "wa": "Merhaba, uydu / çanak anten için bilgi almak istiyorum.",
    },
}
SSS_ORTAK["sure_genel"] = ("Ne kadar sürede geliyorsunuz?", "Dalyan ve Ortaca'ya 1 saat, Dalaman ve Köyceğiz'e 2 saat içinde ulaşmayı hedefliyoruz. Aradığınızda size net bir saat söyleriz.")

# ── Ana sayfa: görünür SSS (yapılandırılmış veri de bundan üretilir) ──────
ANA_SSS = [
    ("Hangi bölgelere hizmet veriyorsunuz?", "Ortaca, Dalaman, Köyceğiz ve bu ilçelere bağlı tüm mahallelere geliyoruz; Dalyan dahil."),
    ("Ne kadar sürede geliyorsunuz?", "Dalyan ve Ortaca'ya 1 saat, Dalaman ve Köyceğiz'e 2 saat içinde ulaşmayı hedefliyoruz. 7/24 çalışıyoruz."),
    ("Yetkili servis misiniz?", "Hayır. Gün Teknik bağımsız, özel bir teknik servistir ve tüm marka klimalara hizmet verir. Garantisi devam eden ya da sıfır ürünler için direkt marka ile görüşünüz."),
    ("Elektrikler kesildi, sizi mi aramalıyım?", "Kesinti sokak ya da mahalle genelindeyse dağıtım şirketinin arıza hattını (186) arayın. Elektrik yalnızca sizin evinizde ya da iş yerinizde yoksa bizi arayın."),
    ("Keşif ücretli mi?", "Hayır, keşif ücretsizdir. Yerinde bakar, net fiyatı söyleriz."),
    ("Yaptığınız işe garanti veriyor musunuz?", "Evet. İşçiliğimiz 15 gün garantilidir; kullanılan malzemeler üreticinin kendi garantisi kapsamındadır."),
    ("Klima bakım, montaj ve gaz dolumu ücretleri ne kadar?", "Bahar Kampanyası ile klima bakım ve temizlik 2.500 TL yerine 1.500 TL, klima montajı 4.000 TL yerine 3.000 TL. Gaz dolumunda gramı 2 TL, işçilik 1.000 TL."),
]

# ══════════════════════════════════════════════════════════════════════════
#  BRANŞ SİTELERİ (2026-11): 5 branş × (1 genel + 4 bölge)
# ══════════════════════════════════════════════════════════════════════════
UYARI["sade"] = "<strong>Özel teknik servis.</strong> Keşif ücretsiz, işçiliğimiz 15 gün garantilidir."

TUR["uydu"] = {
    "baslik": "Uydu ve Çanak Anten", "h2": "Uydu ve Anten Hizmetleri", "hizmet_adi": "uydu ve çanak anten servisi", "schema": "LocalBusiness",
    "title_ek": "Montaj, Ayar ve Arıza", "uyari": "sade",
    "ozet": "{de} çanak anten montajı, sinyal ölçerle yön ayarı, LNB değişimi, merkezi uydu sistemi ve TV kanal kurulumu.",
    "kartlar": [
        ("Çanak Anten Montajı", "Tekli ve çiftli çanak kurulumu, sinyal ölçer ile yön ayarı.", ""),
        ("LNB ve Alıcı", "LNB ve uydu alıcısı değişimi, ince ayar.", ""),
        ("TV Kanal Kurulumu", "Televizyonda kanal arama, sıralama ve uydu ayarları.", ""),
        ("Merkezi Sistem", "Bina, site, otel ve pansiyonlar için merkezi uydu sistemi ve multiswitch.", ""),
        ("Sinyal Arızası", "Sinyal yok, görüntü donuyor, bazı kanallar çıkmıyor sorunları.", ""),
        ("Kablo ve Konnektör", "Uydu kablosu çekimi, su alan konnektörlerin yenilenmesi.", ""),
        ("Söküm ve Taşıma", "Taşınmada çanak söküm, yeni yerinde montaj ve ayar.", ""),
    ],
    "fiyatlar": ["kesif"],
    "isler": {
        "ortaca": ["Apartman ve sitelerde merkezi uydu sistemi kurulumu ve arızası", "Yeni taşınılan evlerde çanak montajı ve kanal kurulumu", "Fırtına sonrası yönü kayan çanaklarda yeniden ayar", "Sarıgerme yazlıklarında sezon öncesi uydu kontrolü"],
        "dalyan": ["Villa ve pansiyonlarda her odaya ayrı yayın için multiswitch kurulumu", "Yabancı ev sahipleri için Astra ve Hotbird kanal ayarı", "Kışın kapalı kalan evlerde sezon açılışı uydu kontrolü", "Nem ve tuzlu havada bozulan LNB ve konnektörlerin yenilenmesi"],
        "dalaman": ["Konut ve apartmanlarda çanak montajı ve yön ayarı", "Otel, pansiyon ve kafelerde çoklu TV uydu dağıtımı", "Sinyal gitmesi ve donan görüntü arızaları", "Kiralık dairelerde çanak söküm ve yeniden montaj"],
        "koycegiz": ["Göl çevresi ve uzak mahallelerde çanak montajı ve ayar", "Pansiyon ve apartlarda çoklu TV uydu dağıtımı", "Rüzgârda kayan çanakların sabitlenmesi ve ayarı", "Eskiyen LNB ve kabloların yenilenmesi"],
    },
}
TUR["guvenlik"] = {
    "baslik": "Güvenlik Kamerası ve Alarm", "h2": "Güvenlik Sistemleri", "hizmet_adi": "güvenlik kamerası ve alarm kurulumu", "schema": "LocalBusiness",
    "title_ek": "Kamera, Alarm ve Diafon", "uyari": "sade",
    "ozet": "{de} güvenlik kamerası kurulumu, telefondan izleme, alarm sistemi, görüntülü diafon ve kamera arıza servisi.",
    "kartlar": [
        ("Güvenlik Kamerası Kurulumu", "Ev, villa, iş yeri ve şantiyeler için IP ve analog kamera sistemleri.", ""),
        ("Telefondan İzleme", "Kayıt cihazının internete bağlanması, telefondan canlı izleme ve geçmiş kayıt.", ""),
        ("Alarm Sistemi", "Kapı-pencere sensörü, hareket dedektörü ve siren ile alarm kurulumu.", ""),
        ("Kayıt Cihazı ve Disk", "Kayıt cihazı kurulumu, disk değişimi ve kayıt süresi ayarı.", ""),
        ("Arıza ve Bakım", "Görüntü gelmeyen, kayıt yapmayan kameralarda arıza tespiti ve onarım.", ""),
        ("Kablolama ve Altyapı", "Kamera kablosu, enerji hattı ve kablo kanalı; yeni yapılarda altyapı.", ""),
        ("Görüntülü Diafon", "Kapı zili, görüntülü diafon ve kapı açma sistemleri.", ""),
    ],
    "fiyatlar": ["kesif"],
    "isler": {
        "ortaca": ["Çarşıdaki dükkân ve iş yerlerinde kamera sistemi", "Müstakil evlerde bahçe ve giriş kamerası", "Sarıgerme yazlıklarında boş kalan evler için telefondan izleme", "Mevcut kamera sistemlerinde arıza ve ek kamera"],
        "dalyan": ["Villa ve pansiyonlarda havuz, bahçe ve giriş kameraları", "Yurt dışındaki ev sahiplerinin evini telefondan izleyebilmesi", "Kışın boş kalan evlerde alarm sistemi", "Tekne iskelesi ve iş yerlerinde gece görüşlü kamera"],
        "dalaman": ["Mağaza, ofis ve depolarda kamera ve kayıt sistemi", "Apartman girişlerinde kamera ve görüntülü diafon", "Müstakil evlerde alarm ve kamera", "Kiralık dairelerde giriş kapısı kamerası"],
        "koycegiz": ["Narenciye bahçeleri ve arazilerde kamera sistemi", "Göl çevresindeki pansiyonlarda kamera ve alarm", "Uzak mahallelerde telefondan izlenebilir kamera", "Mevcut sistemlerde disk değişimi ve arıza"],
    },
}
TUR["montaj"] = {
    "baslik": "Montaj İşleri", "h2": "Montaj Hizmetleri", "hizmet_adi": "montaj ustası", "schema": "HomeAndConstructionBusiness",
    "title_ek": "Korniş, TV Askı, Avize, Mobilya", "uyari": "sade",
    "ozet": "{de} korniş ve perde, TV askısı, avize, raf, ayna, mobilya montajı, demir ve ahşap işleri ile şofben montajı.",
    "kartlar": [
        ("Korniş ve Perde", "Korniş, rustik, stor ve zebra perde montajı.", ""),
        ("TV Duvar Askısı", "Sabit ve hareketli TV askısı montajı, kablo düzenleme.", ""),
        ("Avize ve Aydınlatma", "Avize, sarkıt, aplik ve LED montajı; elektrik bağlantısı dahil.", ""),
        ("Raf, Ayna ve Tablo", "Duvar rafı, ayna, tablo ve dolap asma; duvara uygun dübelle.", ""),
        ("Mobilya Montajı", "Hazır mobilya, gardırop, yatak ve dolap kurulumu.", ""),
        ("Demir ve Ahşap İşleri", "Küçük demir ve ahşap işleri, tamir ve sabitleme.", ""),
        ("Şofben Montajı", "Elektrikli şofben montajı ve ayrı sigorta hattı.", ""),
    ],
    "fiyatlar": ["kesif"],
    "isler": {
        "ortaca": ["Yeni taşınılan evlerde korniş, avize ve TV askısı montajı", "Hazır mobilya ve gardırop kurulumu", "Raf, ayna ve dolap asma", "Elektrikli şofben montajı ve hattı"],
        "dalyan": ["Sezon öncesi villa ve pansiyonlarda perde, ayna ve aydınlatma yenileme", "Kiralık evlerde mobilya kurulumu ve tamiri", "Bahçe ve teras için ahşap ve demir işleri", "Odalarda TV askısı montajı"],
        "dalaman": ["Apartman dairelerinde korniş ve stor perde montajı", "Mağaza ve ofislerde raf ve tabela sabitleme", "TV askısı ve avize montajı", "Şofben değişimi ve montajı"],
        "koycegiz": ["Pansiyon ve apartlarda oda hazırlığı: perde, ayna, aydınlatma", "Mobilya montajı ve kapı-dolap tamiri", "Bahçe ve arazilerde demir ve ahşap işleri", "Uzak mahallelerde tek seferde toplu montaj işleri"],
    },
}
# Klima bölge sayfalarındaki kartlar artık klima genel sitesine bağlanır
TUR["klima"]["kartlar"] = [(a, b, "/landing/klima-servisi.html" if c else "") for a, b, c in TUR["klima"]["kartlar"]]

SSS["uydu"] = [
    ("Çanak ayarını kendim yapabilir miyim?", "Küçük kaymalarda mümkün, ancak sinyal ölçer olmadan doğru açıyı yakalamak zordur. Yerinde ölçüm cihazıyla ayar yapıyor, kanalları kurup teslim ediyoruz."),
    ("Yağmurda ya da rüzgârda görüntü neden gidiyor?", "Genellikle çanağın yönü kaymış, LNB yıpranmış ya da kablo ve konnektörlere su girmiştir. Sinyal ölçerle yerinde ölçüp nedenini buluyoruz."),
    ("Birden fazla televizyona uydu bağlanabilir mi?", "Evet. Çiftli LNB ya da multiswitch ile her televizyon kendi kanalını bağımsız izleyebilir. Bina, site ve pansiyonlarda merkezi sistem kuruyoruz."),
    "sure", "garanti", "kesif", "mahalle",
]
SSS["guvenlik"] = [
    ("Kameraları telefondan izleyebilir miyim?", "Evet. Kurulumda kayıt cihazını internete bağlıyor, telefonunuza uygulamayı kurup canlı izleme ve geçmiş kayıtları açıyoruz."),
    ("Kayıtlar ne kadar süre saklanır?", "Kamera sayısına, çözünürlüğe ve kayıt cihazındaki diskin boyutuna bağlıdır. İhtiyacınıza göre disk seçip kurulumda süreyi birlikte ayarlıyoruz."),
    ("Var olan kamera sistemime bakım ya da ek kamera yapıyor musunuz?", "Evet. Görüntü gelmeyen, kayıt yapmayan kameraların arızasına bakıyor, mevcut sisteme yeni kamera ekliyoruz."),
    ("Alarm sistemi kuruyor musunuz?", "Evet. Kapı ve pencere sensörleri, hareket dedektörü ve siren ile alarm sistemi kuruyor; telefondan kurma ve bildirim ayarlarını yapıyoruz."),
    "sure", "garanti", "kesif", "mahalle",
]
SSS["montaj"] = [
    ("Hangi montaj işlerini yapıyorsunuz?", "Korniş ve perde, TV duvar askısı, avize ve aydınlatma, raf, ayna, tablo, mobilya montajı, demir ve ahşap işleri ile şofben montajı."),
    ("Duvarın beton ya da alçıpan olması fark eder mi?", "Evet. Beton, tuğla, gazbeton ve alçıpan için farklı dübel ve vida kullanılır. Duvara uygun bağlantı elemanıyla sağlam montaj yapıyoruz."),
    ("TV askısı montajında kabloları topluyor musunuz?", "Evet. Kabloları kablo kanalıyla düzenli şekilde topluyoruz; duvar içinden geçirme mümkünse keşifte söyleriz."),
    ("Şofben montajı da yapıyor musunuz?", "Evet. Elektrikli şofbenin montajını, bağlantısını ve gerekiyorsa ayrı sigorta hattını aynı ekip yapar."),
    "sure", "garanti", "kesif", "mahalle",
]

# Dosya adları: bölge sayfaları ve branş genel siteleri
DOSYA = {"klima": "%s-klima.html", "elektrik": "%s-elektrikci.html", "uydu": "%s-uydu-canak.html",
         "guvenlik": "%s-guvenlik-kamera.html", "montaj": "%s-montaj-isleri.html"}
GENEL = {"elektrik": "elektrikci.html", "klima": "klima-servisi.html", "uydu": "uydu-canak-anten.html",
         "guvenlik": "guvenlik-kamera.html", "montaj": "montaj-isleri.html"}
GENEL_AD = {"elektrik": "Elektrikçi", "klima": "Klima Servisi", "uydu": "Uydu ve Çanak Anten",
            "guvenlik": "Güvenlik Kamerası ve Alarm", "montaj": "Montaj İşleri"}
# Kapatılan sayfalar: adres → yönlendirilecek yer
KAPANAN = {
    "landing/klima-bakim-temizlik.html": "/landing/klima-servisi.html",
    "landing/klima-ariza-gaz-dolumu.html": "/landing/klima-servisi.html",
    "landing/klima-montaj.html": "/landing/klima-servisi.html",
    "landing/hidrofor-pompa.html": "/",
    "landing/hidrofor-pompa-en.html": "/index-en.html",
}
