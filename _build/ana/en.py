# -*- coding: utf-8 -*-
"""Ana sayfanın İngilizcesi (index-en.html).

Kaynak tek: a.html. Bu dosya Türkçe metinleri İngilizceye çevirir; yap.py --yayin çalışınca
index.html ile birlikte index-en.html de üretilir. a.html'de bir metin değişir de burada karşılığı
bulunmazsa üretim hata verir (eksik çeviri sessizce kalmasın diye).
"""
import json
import re

SITE = "https://www.gunelektrikklima.com"

# ── <head> ────────────────────────────────────────────────────────────────
HEAD = [
    ('<html lang="tr">', '<html lang="en">'),
    ('<title>Gün Teknik | Elektrik, Klima, Uydu, Güvenlik ve Montaj — Ortaca, Dalyan, Dalaman, Köyceğiz</title>',
     '<title>Gün Teknik | Electrician, Air Conditioning, Satellite, Security &amp; Installation — Dalyan, Ortaca, Dalaman, Köyceğiz</title>'),
    ('<meta name="description" content="Ortaca, Dalyan, Dalaman ve Köyceğiz\'de elektrik, klima, uydu çanak, güvenlik sistemleri ve montaj işleri için lisanslı teknik servis. 7/24 acil servis, ücretsiz keşif, 15 gün işçilik garantisi.">',
     '<meta name="description" content="Licensed technical service in Dalyan, Ortaca, Dalaman and Köyceğiz: electrical, air conditioning, satellite dishes, security systems and installation work. 24/7 emergency service, free site survey, 15-day workmanship warranty.">'),
    ('<link rel="canonical" href="https://www.gunelektrikklima.com/">', '<link rel="canonical" href="https://www.gunelektrikklima.com/index-en.html">'),
    ('<meta property="og:url" content="https://www.gunelektrikklima.com/">', '<meta property="og:url" content="https://www.gunelektrikklima.com/index-en.html">'),
    ('<meta property="og:title" content="Gün Teknik | Elektrik, Klima, Uydu, Güvenlik, Montaj">',
     '<meta property="og:title" content="Gün Teknik | Electrical, Air Conditioning, Satellite, Security, Installation">'),
    ('<meta property="og:description" content="Ortaca, Dalyan, Dalaman ve Köyceğiz\'de elektrik, klima, uydu çanak, güvenlik sistemleri ve montaj işleri. 7/24 acil servis.">',
     '<meta property="og:description" content="Electrical, air conditioning, satellite, security systems and installation work in Dalyan, Ortaca, Dalaman and Köyceğiz. 24/7 emergency service.">'),
    ('<meta property="og:locale" content="tr_TR">', '<meta property="og:locale" content="en_GB">'),
]

FAQ = [
    ("Which areas do you serve?", "Ortaca, Dalaman, Köyceğiz and all their neighbourhoods, including Dalyan."),
    ("How quickly can you come?", "We aim to reach Dalyan and Ortaca within 1 hour, Dalaman and Köyceğiz within 2 hours. We work 24/7."),
    ("The power is out. Should I call you?", "If the outage covers your street or neighbourhood, call the distribution company's fault line (186). If only your home or business has no power, call us."),
    ("Are you an authorised service centre?", "No. Gün Teknik is an independent technical service and works on air conditioners of every brand. For units still under warranty or brand-new products, please contact the brand directly."),
    ("Do you also do cameras, alarms and installation work?", "Yes. From security cameras and alarms to curtain rails, TV wall mounts, light fittings, furniture and water heaters, we do every job that needs drilling, fixing and connecting."),
    ("Is the site survey free?", "Yes, the survey is free. We look on site and tell you a clear price."),
    ("Do you guarantee your work?", "Yes. Our workmanship has a 15-day warranty; materials are covered by the manufacturer's own warranty."),
]
LD = {"@context": "https://schema.org", "@graph": [
    {"@type": ["Electrician", "HVACBusiness"], "@id": SITE + "/#isletme", "name": "Gün Technic", "alternateName": ["Gün Teknik", "Gün Elektrik & Klima"],
     "url": SITE + "/index-en.html", "telephone": "+905446529486", "email": "info@gunelektrikklima.com", "foundingDate": "2010", "priceRange": "₺₺",
     "image": SITE + "/og-image.jpg",
     "description": "Licensed technical service for electrical, air conditioning, satellite dish, security system and installation work in Dalyan, Ortaca, Dalaman and Köyceğiz. 24/7 emergency service.",
     "knowsAbout": ["Electrical faults and wiring", "Air conditioning installation, servicing and gas refill", "Satellite dish installation", "Security cameras and alarm systems", "Installation work"],
     "address": {"@type": "PostalAddress", "addressLocality": "Ortaca", "addressRegion": "Muğla", "addressCountry": "TR"},
     "areaServed": [{"@type": "City", "name": n} for n in ("Ortaca", "Dalyan", "Dalaman", "Köyceğiz")],
     "openingHoursSpecification": {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "00:00", "closes": "23:59"},
     "sameAs": ["https://maps.google.com/?cid=10011209120991590362"]},
    {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in FAQ]},
    {"@type": "WebSite", "@id": SITE + "/#site", "url": SITE + "/index-en.html", "name": "Gün Technic", "inLanguage": "en"}]}

# ── Gövdedeki parçalar (bağlamıyla birlikte, birebir) ─────────────────────
PARCA = [
    # dil düğmesi: İngilizcede Türkçeye götürür
    ('<a class="lang" href="/index-en.html" hreflang="en" lang="en" aria-label="English">EN</a>',
     '<a class="lang" href="/" hreflang="tr" lang="tr" aria-label="Türkçe">TR</a>'),
    ('<span class="w">GÜN TEKNİK</span><span class="e" id="hE">Elektrik · Klima · Uydu Çanak · Güvenlik Sistemleri · Montaj</span>',
     '<span class="w">GÜN TEKNİK</span><span class="e" id="hE">Electrical · Air Con · Satellite · Security · Installation</span>'),
    ('Ortaca, Dalyan, Dalaman ve Köyceğiz\'de elektrik, klima, uydu çanak, güvenlik sistemleri ve montaj işleri. <em>7/24</em> geliyoruz; keşif ücretsiz, işçilik 15 gün garantili.',
     'Electrical, air conditioning, satellite, security systems and installation work in Dalyan, Ortaca, Dalaman and Köyceğiz. We come <em>24/7</em>; free site survey, 15-day workmanship warranty.'),
    ('Beş Branş, <span>Profesyonel Ekip</span>', 'Five Trades, <span>One Expert Team</span>'),
    ('Ölç<span>ü</span>m', 'Mea<span>su</span>re'),
    ('Saha <span>raporları</span>', 'Field <span>reports</span>'),
    ('Bölge<span>ler</span>', 'Are<span>as</span>'),
    ('Arıza <span>kaydı</span>', 'Job <span>ticket</span>'),
    ('Sık<br>sorul<span>an</span>', 'Fre<span>que</span>ntly<br>asked'),
    ('Yolumuz bir çırak defteriyle başladı.<span class="sub" id="shiftS">Gün Teknik\'in defteri · 2010</span>',
     'Our road began with an apprentice\'s notebook.<span class="sub" id="shiftS">Gün Teknik\'s notebook · 2010</span>'),
    ('<p id="mani">İyi yapılmış iş <span class="gz">görünmez:</span> <span class="kw" data-c="#E9FF3B">ışık</span> yanar, oda <span class="kw" data-c="#3FF2DF">serinler,</span> <span class="kw" data-c="#E6F2E8">yayın</span> gelir, <span class="kw" data-c="#E0541A">kamera</span> bekler, <span class="kw" data-c="#E9FF3B">raf</span> yerinde durur. Hepsi her gün, hiç düşünmeden <span class="ok">çalışır.</span></p>',
     '<p id="mani">Good work is <span class="gz">invisible:</span> the <span class="kw" data-c="#E9FF3B">light</span> comes on, the room <span class="kw" data-c="#3FF2DF">cools,</span> the <span class="kw" data-c="#E6F2E8">signal</span> arrives, the <span class="kw" data-c="#E0541A">camera</span> keeps watch, the <span class="kw" data-c="#E9FF3B">shelf</span> stays put. Every day, without a second thought, it all <span class="ok">just works.</span></p>'),
    ('<div class="hud">Şebeke · <b>0.0 V</b> · kesinti</div>', '<div class="hud">Mains · <b>0.0 V</b> · outage</div>'),
    ('ŞEBEKE · <b id="relV">0</b> V', 'MAINS · <b id="relV">0</b> V'),
    ('<span>5 kanal · <b id="hv">', '<span>5 channels · <b id="hv">'),
    ('<span>Kayıt no · <b id="fisNo">', '<span>Ticket no · <b id="fisNo">'),
    ('<div class="kv">Formu göndererek bilgilerinizin size dönüş yapılması amacıyla işlenmesini kabul edersiniz. <a href="/kvkk.html">KVKK Aydınlatma Metni</a></div>',
     '<div class="kv">By sending the form you agree that we use your details to get back to you. <a href="/kvkk.html">Privacy notice (KVKK, Turkish)</a></div>'),
    ('<a href="/gizlilik.html">Gizlilik ve çerezler</a>', '<a href="/gizlilik.html">Privacy &amp; cookies (Turkish)</a>'),
    ('<span><b>GÜN TEKNİK</b> · Ortaca · Dalyan · Dalaman · Köyceğiz · Muğla<br>© <span data-gt-yil>2026</span> Gün Teknik · <a href="/kvkk.html">KVKK</a>',
     '<span><b>GÜN TEKNİK</b> · Ortaca · Dalyan · Dalaman · Köyceğiz · Muğla, Türkiye<br>© <span data-gt-yil>2026</span> Gün Teknik · <a href="/kvkk.html">KVKK</a>'),
    ('Genel elektrik kesintisi: 186', 'Area-wide power cut: call 186'),
]
# Form seçenekleri: ERP'ye Türkçe değer gitsin, ekranda İngilizce görünsün
SECENEK = {
    "Elektrik Arıza": "Electrical fault", "Elektrik Tesisatı / Pano": "Wiring / fuse board", "Klima Bakımı / Temizlik": "AC servicing / cleaning",
    "Klima Arıza / Gaz Dolumu": "AC fault / gas refill", "Klima Montajı": "AC installation", "Uydu Çanak": "Satellite dish",
    "Güvenlik Kamerası / Alarm": "Security camera / alarm", "Montaj İşleri": "Installation work", "Diğer": "Other",
}

# ── Tek başına duran metinler (etiketler arası, birebir) ───────────────────
METIN = {
    "7/24 HİZMETİNİZDEYİZ": "AT YOUR SERVICE 24/7", "Hizmetler": "Services", "Süreç": "Process", "Bölgeler": "Areas", "Teklif": "Quote", "Hikâye": "Story",
    "IŞIK": "LIGHT", "SES": "SOUND", "Karanlıkta mı kaldınız?": "Left in the dark?",
    "Tüm arıza ve tamirat işleriniz için; 7/24 hizmetinizdeyiz. Genel elektrik kesintileri için lütfen 186 numarasını arayın.":
        "For every fault and repair, we are here 24/7. For area-wide power cuts, please call 186.",
    "0544 652 94 86": "+90 544 652 94 86",
    "Hemen ara": "Call now", "WhatsApp'tan yaz": "Message on WhatsApp", "Işıkları aç": "Lights on", "CH1 · Elektrik": "CH1 · Electrical",
    "Elektrikten klimaya, uydudan güvenliğe ve montaja; evin ve iş yerinin teknik işleri tek ekipten.":
        "From electrics to air conditioning, from satellite to security and installation: every technical job at home or at work, from one team.",
    # CH1
    "7/24 arıza": "24/7 faults", "Elektrik": "Electrical",
    "Arıza ve acil servisten yeni tesisata, panodan aydınlatmaya; evin ve iş yerinin bütün elektrik işleri.":
        "From faults and emergency call-outs to new wiring, from fuse boards to lighting: every electrical job at home or at work.",
    "Arıza ve acil servis": "Faults &amp; emergencies", "Tesisat": "Wiring", "Pano ve sigorta": "Fuse boards", "Topraklama ve ölçüm": "Earthing &amp; testing",
    "Aydınlatma": "Lighting", "Priz, anahtar, hat": "Sockets, switches, circuits", "Lisanslı · ustalık belgeli": "Licensed · master-certified",
    "Tüm liste +": "Full list +", "CH 01 · tüm liste": "CH 01 · full list", "Elektrik işleri": "Electrical work",
    "Elektrik arıza servisi": "Electrical fault finding", "Sigorta atması, kaçak akım": "Tripping breakers, earth leakage", "Tesisat yenileme": "Rewiring",
    "Kablo çekimi, hat ayırma": "Cable runs, new circuits", "Pano kurulumu": "Fuse board installation", "Kaçak akım rölesi": "RCD replacement",
    "Priz ve anahtar değişimi": "Socket and switch replacement", "LED ve iç aydınlatma": "LED and indoor lighting", "Avize bağlantısı": "Light fitting connection",
    "Bahçe aydınlatma": "Garden lighting", "Topraklama ölçümü": "Earth testing", "Akıllı ev altyapısı": "Smart home wiring",
    "İnşaat elektrik işleri": "Electrics for new builds", "Jeneratör ve UPS bağlantısı": "Generator and UPS connection",
    "Fabrika bakım onarım": "Commercial maintenance", "Elektrik proje ve taahhüt": "Electrical projects", "← Geri": "← Back",
    # CH2
    "Tüm markalar": "All brands", "Klima": "Air conditioning",
    "Montajdan bakıma, gaz dolumundan arızaya. Tüm markalar için özel servis; garanti ve sıfır ürün için doğrudan marka ile görüşünüz.":
        "Installation, servicing, gas refills and repairs. Independent service for all brands; for warranty or brand-new units please contact the brand directly.",
    "Montaj": "Installation", "Bakım ve temizlik": "Servicing &amp; cleaning", "Gaz dolumu": "Gas refill", "Arıza onarımı": "Repairs",
    "Söküm ve taşıma": "Removal &amp; relocation", "CH 02 · tüm liste": "CH 02 · full list", "Klima işleri": "Air conditioning work",
    "Split ve inverter montaj": "Split and inverter installation", "Bakım ve filtre temizliği": "Servicing and filter cleaning",
    "Gaz dolumu ve vakumlama": "Gas refill and vacuuming", "Su akıtma onarımı": "Water leak repair", "Anakart, motor değişimi": "PCB and fan motor replacement",
    "Kompresör değişimi": "Compressor replacement", "Arıza kodu çözümü": "Error code diagnosis", "Bakır boru, drenaj hattı": "Copper pipework, drain lines",
    "Dış ünite montajı": "Outdoor unit installation", "Söküm, taşıma, yeniden montaj": "Removal, relocation, refitting",
    "Kaset ve ticari klima": "Cassette and commercial units", "VRF ve havalandırma": "VRF and ventilation",
    "Daikin, Mitsubishi, Gree, Samsung, LG, Vestel, Arçelik, Beko, Bosch, Toshiba, Airfel, Fujiplus ve diğer tüm markalar. Yetkili servis değiliz.":
        "Daikin, Mitsubishi, Gree, Samsung, LG, Vestel, Arçelik, Beko, Bosch, Toshiba, Airfel, Fujiplus and every other brand. We are not an authorised service centre.",
    # CH3
    "Türksat 42°D": "Türksat 42°E", "Uydu çanak": "Satellite",
    "Çanak kurulumu, yön ayarı ve merkezi sistemler. Yayın gelmiyorsa yerinde ölçer, çözeriz.":
        "Dish installation, alignment and communal systems. No signal? We measure on site and fix it.",
    "Çanak kurulumu": "Dish installation", "Yön ayarı": "Alignment", "LNB değişimi": "LNB replacement", "Merkezi sistem": "Communal systems",
    "Uydu arızası": "Signal faults", "Ortaca: az 158,6° · el 45,0°": "Ortaca: az 158.6° · el 45.0°", "CH 03 · tüm liste": "CH 03 · full list",
    "Uydu": "Satellite", "Uydu çanak işleri": "Satellite work", "Çanak anten montajı": "Dish installation", "Türksat yön ayarı": "Türksat alignment",
    "Sinyal ölçümü": "Signal metering", "Kanal ayarlama": "Channel tuning", "Merkezi uydu sistemi": "Communal satellite system",
    "Multiswitch santral montajı": "Multiswitch installation", "Uydu arıza tespiti": "Satellite fault finding",
    # CH4
    "Kamera · alarm": "Camera · alarm", "Güvenlik sistemleri": "Security systems",
    "Kamera ve alarm sistemleri: yerleşim, kablolama, kayıt cihazı ve telefondan izleme kurulumu.":
        "Camera and alarm systems: placement, cabling, recorders and viewing on your phone.",
    "Güvenlik kamerası": "Security cameras", "Alarm sistemi": "Alarm systems", "Diafon": "Door entry", "Görüntülü diafon": "Video door entry",
    "Telefondan izleme": "Phone viewing", "CH 04 · tüm liste": "CH 04 · full list", "Güvenlik": "Security", "IP ve analog kamera": "IP and analogue cameras",
    "Kayıt cihazı (NVR/DVR)": "Recorders (NVR/DVR)", "Kamera kablolaması": "Camera cabling", "Hırsız alarm sistemi": "Burglar alarms",
    "Hareket ve kapı sensörü": "Motion and door sensors", "Diafon montajı": "Door entry installation", "Yangın alarm kablolama": "Fire alarm cabling",
    # CH5
    "Delme · dübel · bağlantı": "Drill · plug · fix", "Montaj işleri": "Installation work",
    "Delme, dübel, sabitleme ve bağlantı dahil; evdeki bütün montaj işleri tek seferde.":
        "Drilling, wall plugs, fixing and connecting included: every installation job at home in one visit.",
    "Korniş ve stor": "Curtain rails &amp; blinds", "TV askısı": "TV wall mounts", "Avize": "Light fittings", "Raf ve ayna": "Shelves &amp; mirrors",
    "Mobilya": "Furniture", "Demir ve ahşap": "Metal &amp; wood", "Şofben": "Water heaters", "CH 05 · tüm liste": "CH 05 · full list",
    "Korniş ve stor perde": "Curtain rails and blinds", "TV askı aparatı": "TV wall brackets", "Avize montajı": "Light fitting installation",
    "Tablo asma": "Picture hanging", "Mobilya montajı": "Furniture assembly", "Demir montaj işleri": "Metal fixing work", "Ahşap montaj işleri": "Wood fixing work",
    "Şofben montajı ve bağlantısı": "Water heater installation and connection", "Banyo aksesuarı": "Bathroom accessories",
    # CH6
    "CH 06 · listede yok mu?": "CH 06 · not on the list?", "Tüm teknik işleriniz için bize ulaşın.": "Get in touch for any technical job.",
    "Sorunu anlatın ya da fotoğrafını gönderin; yapabileceğimizi dürüstçe söyleriz.": "Describe the problem or send a photo; we'll honestly tell you what we can do.",
    "Kaydırın": "Scroll",
    # Süreç
    "— Süreç · devre": "— Process · circuit", "Arayın": "Call", "● Devre tamam": "● Circuit complete", "Arayın ya da yazın": "Call or message",
    "Telefon ya da WhatsApp. Sorunu dinleriz, gerekirse fotoğrafını isteriz; acil mi, sabahı bekleyebilir mi, birlikte karar veririz.":
        "Phone or WhatsApp. We listen, ask for a photo if needed, and decide together whether it's urgent or can wait until morning.",
    "Ücretsiz keşif": "Free site survey",
    "Dalyan ve Ortaca'ya bir saatte, Dalaman ve Köyceğiz'e iki saatte geliriz. Yerinde ölçer, sorunun kaynağını buluruz.":
        "We reach Dalyan and Ortaca within an hour, Dalaman and Köyceğiz within two. We measure on site and find the source of the problem.",
    "Net fiyat": "A clear price", "Ne yapılacağını ve kaça yapılacağını açıkça söyleriz. Siz onay vermeden işe başlamayız.":
        "We tell you exactly what needs doing and what it costs. Nothing starts until you approve.",
    "Temiz işçilik": "Clean workmanship", "Kabloyu düzgün döşer, cihazı sağlam bağlar, çalıştığımız yeri bulduğumuzdan temiz bırakırız.":
        "Neat cabling, solid fixings, and we leave the place cleaner than we found it.",
    "15 gün garanti": "15-day warranty", "İşçiliğimiz 15 gün garantilidir; malzemeler üreticinin kendi garantisi kapsamındadır.":
        "Our workmanship has a 15-day warranty; materials are covered by the manufacturer's own warranty.",
    # Ölçüm
    "Rakamlar kendini anlatır.": "The numbers speak for themselves.", "Yıllık tecrübe": "Years of experience", "Tamamlanan iş": "Jobs completed",
    "Acil servis": "Emergency service", "Google puanı": "Google rating",
    "Lisanslı ekip · ustalık belgeli elektrik · işçilik 15 gün garantili": "Licensed team · master-certified electrics · 15-day workmanship warranty",
    # Yorumlar
    "Google İşletme Profilimizdeki gerçek değerlendirmeler.": "Real reviews from our Google Business Profile.", "Yorumlar yükleniyor…": "Loading reviews…",
    # Bölgeler
    "Ortaca, Dalaman, Köyceğiz ve bağlı tüm mahalleler. Dalyan dahil.": "Ortaca, Dalaman, Köyceğiz and all their neighbourhoods, Dalyan included.",
    "Soğutma · salınım": "Cooling · swing", "Oda 40.0°C": "Room 40.0°C",
    "~1 saat": "~1 hour", "~2 saat": "~2 hours", "Şematik harita · varış süreleri yaklaşıktır": "Schematic map · arrival times are approximate",
    # Teklif
    "Formu doldurun, sizi arayalım. Keşif ücretsiz, teklif net.": "Fill in the form and we'll call you. Free survey, clear quote.",
    "Ücretsiz fiyat teklifi": "Free quote", "Adınız": "Your name", "Telefon": "Phone", "Hizmet türü": "Service", "Bölge": "Area", "Seçiniz…": "Choose…",
    "Açıklama (isteğe bağlı)": "Details (optional)", "Teklif iste, sizi arayalım": "Request a quote, we'll call you", "Işıkları kapatın": "Turn the lights off",
    # Manifesto
    "— Ölçüm 01 · kontrol kalemi": "— Measurement 01 · voltage tester",
    # SSS
    "Hangi bölgelere hizmet veriyorsunuz?": FAQ[0][0], "Ortaca, Dalaman, Köyceğiz ve bu ilçelere bağlı tüm mahallelere geliyoruz; Dalyan dahil.": FAQ[0][1],
    "Ne kadar sürede geliyorsunuz?": FAQ[1][0], "Dalyan ve Ortaca'ya 1 saat, Dalaman ve Köyceğiz'e 2 saat içinde ulaşmayı hedefliyoruz. 7/24 çalışıyoruz.": FAQ[1][1],
    "Elektrikler kesildi, sizi mi aramalıyım?": FAQ[2][0],
    "Kesinti sokak ya da mahalle genelindeyse dağıtım şirketinin arıza hattını (186) arayın. Elektrik yalnızca sizin evinizde ya da iş yerinizde yoksa bizi arayın.": FAQ[2][1],
    "Yetkili servis misiniz?": FAQ[3][0],
    "Hayır. Gün Teknik bağımsız, özel bir teknik servistir ve tüm marka klimalara hizmet verir. Garantisi devam eden ya da sıfır ürünler için doğrudan marka ile görüşünüz.": FAQ[3][1],
    "Kamera, alarm ve montaj işlerine de geliyor musunuz?": FAQ[4][0],
    "Evet. Güvenlik kamerası ve alarm kurulumundan korniş, TV askısı, avize, mobilya ve şofben montajına kadar delme, sabitleme ve bağlantı gerektiren işleri yapıyoruz.": FAQ[4][1],
    "Keşif ücretli mi?": FAQ[5][0], "Hayır, keşif ücretsizdir. Yerinde bakar, net fiyatı söyleriz.": FAQ[5][1],
    "Yaptığınız işe garanti veriyor musunuz?": FAQ[6][0],
    "Evet. İşçiliğimiz 15 gün garantilidir; kullanılan malzemeler üreticinin kendi garantisi kapsamındadır.": FAQ[6][1],
    # Son
    "— Devreyi kapatın": "— Close the circuit", "Bir telefon uzağınızdayız.": "We're one phone call away.", "Anahtarı kapatın": "Flip the switch",
    # Hizmet notları
    "Hizmet notları": "Service notes", "Bölgemizde yaptığımız işlerin ayrıntılı listesi.": "A detailed list of the work we do in our area.",
    "Elektrik hizmetleri": "Electrical services",
    "Klima hizmetleri": "Air conditioning services",
    "Uydu çanak hizmetleri": "Satellite dish services",
    "Acil mi? 7/24 hizmetinizdeyiz": "Urgent? We're here 24/7",
    "Dalyan ve Ortaca'ya 1 saat, Dalaman ve Köyceğiz'e 2 saat içinde sahadayız. Keşif ücretsiz, işçilik 15 gün garantili.":
        "We are on site within 1 hour in Dalyan and Ortaca, within 2 hours in Dalaman and Köyceğiz. Free survey, 15-day workmanship warranty.",
}
# Hizmet notlarındaki uzun metinler (başlıklarına göre)
NOT = {
    "Muğla ili genelinde Ortaca elektrikçi": "Electrician in Dalyan, Ortaca, Dalaman, Köyceğiz and İztuzu, across the Muğla region, with a 24/7 emergency electrician service. Our work: electrical fault finding, rewiring, cable runs, fuse board installation, tripping breaker repairs, RCDs, socket and switch replacement, LED lighting, light fitting installation, garden lighting, smart home wiring, earth testing, electrics for new builds, commercial maintenance, generator installation, UPS installation and electrical projects.",
    "Ortaca klima servisi": "Air conditioning service in Dalyan, Ortaca, Dalaman and Köyceğiz, 24/7. Our work: split and inverter AC installation, cassette AC servicing, VRF systems, pre-installation pipework, copper piping, gas refill, water leak repairs, PCB and motor replacement, compressor replacement, filter cleaning, remote control faults, outdoor unit installation, drain lines, removal and refitting, vacuuming, error code diagnosis, commercial air conditioning and ventilation. Independent service for Daikin, Mitsubishi, Gree, Samsung, LG, Vestel, Arçelik, Beko, Bosch, Toshiba, Airfel, Fujiplus and all other brands; we are not an authorised service centre, so for warranty or brand-new units please contact the brand directly.",
    "Ortaca uyducu olarak": "Satellite dish and TV installation in Dalyan, Ortaca, Dalaman and Köyceğiz. Our work: satellite dish installation, Türksat, Hotbird and Astra alignment, signal metering, communal satellite systems, LNB replacement, channel tuning, multiswitch installation and satellite fault finding.",
    "Ev, villa ve iş yerleri için güvenlik kamerası": "Security cameras and alarm systems for homes, villas and businesses. Our work: IP and analogue camera installation, recorders (NVR/DVR), camera cabling, phone viewing setup, burglar alarms, motion and door sensors, door entry and video door entry installation, fire alarm cabling.",
    "Ortaca, Dalyan, Dalaman ve Köyceğiz'de evdeki bütün montaj işlerinizi": "Every installation job at home in Dalyan, Ortaca, Dalaman and Köyceğiz: curtain rails and blinds, TV wall brackets, light fittings, shelves and mirrors, picture hanging, furniture assembly, metal and wood fixing work, water heater installation and connection, bathroom accessories. Drilling, wall plugs, fixing and connecting included.",
}
NOT_BASLIK = {"<summary>Güvenlik sistemleri</summary>": "<summary>Security systems</summary>", "<summary>Montaj işleri</summary>": "<summary>Installation work</summary>"}

# İngilizce sayfa bağlantıları: İngilizcesi olanlar İngilizceye, olmayanlar Türkçe sayfaya (TR notuyla)
BOLGE_NAV = """    <nav class="bol" aria-label="Area and service pages">
      <div class="bol-g"><a class="g" href="/landing/ortaca-elektrikci-en.html">Electrician</a><a href="/landing/dalyan-elektrikci-en.html">Dalyan electrician</a><a href="/landing/ortaca-elektrikci-en.html">Ortaca electrician</a><a href="/landing/dalaman-elektrikci-en.html">Dalaman electrician</a><a href="/landing/koycegiz-elektrikci-en.html">Köyceğiz electrician</a></div>
      <div class="bol-g"><a class="g" href="/landing/ortaca-klima-en.html">AC service</a><a href="/landing/dalyan-klima-en.html">Dalyan AC service</a><a href="/landing/ortaca-klima-en.html">Ortaca AC service</a><a href="/landing/dalaman-klima-en.html">Dalaman AC service</a><a href="/landing/koycegiz-klima-en.html">Köyceğiz AC service</a></div>
      <div class="bol-g"><a class="g" href="/landing/uydu-canak-anten-en.html">Satellite dish</a><a href="/landing/guvenlik-kamera.html" hreflang="tr">Security cameras (TR)</a><a href="/landing/montaj-isleri.html" hreflang="tr">Installation work (TR)</a><a href="/landing/villa-maintenance-package-en.html">Villa maintenance</a></div>
    </nav>"""

ATTR = {
    "Gün Teknik, başa dön": "Gün Teknik, back to top", "Bölümler": "Sections", "Işıkları kapat": "Lights off", "Sesi aç": "Sound on",
    "Ara: 0544 652 94 86": "Call: +90 544 652 94 86", "Işıklar kapalı": "Lights off", "Işıkları aç": "Lights on",
    "Rakamlarla Gün Teknik": "Gün Teknik in numbers", "Voltmetre: 230 volt": "Voltmeter: 230 volts", "Google yorumları": "Google reviews",
    "Hizmet bölgeleri: Dalyan, Ortaca, Dalaman, Köyceğiz": "Service areas: Dalyan, Ortaca, Dalaman, Köyceğiz", "Ücretsiz fiyat teklifi": "Free quote",
    "Adınız Soyadınız": "Your full name", "05__ ___ __ __": "Phone number with country code", "Sorunu veya isteğinizi kısaca yazın…": "Briefly describe the problem or what you need…",
    "Yaklaşımımız": "Our approach", "Sık sorulanlar": "Frequently asked questions", "Hikâyemize geçiş": "Into our story",
    "Gün Teknik'in hikâyesi": "Gün Teknik's story", "İletişim": "Contact", "Hizmet notları": "Service notes",
}


def cevir(h):
    """a.html'den üretilmiş Türkçe sayfayı İngilizceye çevirir."""
    for a, b in HEAD:
        assert a in h, "HEAD: " + a[:60]
        h = h.replace(a, b)
    h = re.sub(r'<script type="application/ld\+json">.*?</script>',
               lambda m: '<script type="application/ld+json">' + json.dumps(LD, ensure_ascii=False) + '</script>', h, count=1, flags=re.S)
    i = h.index('<body')
    bas, govde = h[:i], h[i:]
    for a, b in PARCA:
        assert a in govde, "PARCA: " + a[:60]
        govde = govde.replace(a, b)
    # kanal kartlarındaki Türkçe branş sitesi bağlantıları İngilizcede yok
    govde = re.sub(r'<a class="git" href="/landing/[^"]+">[^<]+</a>', '', govde)
    a = govde.index('    <nav class="bol"'); b = govde.index('</nav>', a) + len('</nav>')
    govde = govde[:a] + BOLGE_NAV + govde[b:]
    for tr, en in SECENEK.items():
        govde = govde.replace('<option>%s</option>' % tr, '<option value="%s">%s</option>' % (tr, en))
    for bas_, metin in NOT.items():
        govde, n = re.subn(r'(<p>)' + re.escape(bas_) + r'[^<]*(</p>)', lambda m: m.group(1) + metin + m.group(2), govde)
        assert n == 1, "NOT: " + bas_
    for a, b in NOT_BASLIK.items():
        assert a in govde, a
        govde = govde.replace(a, b)
    for tr, en in sorted(METIN.items(), key=lambda x: -len(x[0])):
        govde = re.sub(r'(>\s*)' + re.escape(tr) + r'(\s*<)', lambda m: m.group(1) + en + m.group(2), govde)
    for tr, en in ATTR.items():
        govde = re.sub(r'((?:aria-label|placeholder)=")' + re.escape(tr) + '"', lambda m: m.group(1) + en + '"', govde)
    # İngilizcede marka adı: Gün Technic (yalnızca "Gün" özel isim)
    bas = bas.replace("Gün Teknik", "Gün Technic").replace('"name": "Gün Technic", "alternateName": ["Gün Technic"', '"name": "Gün Technic", "alternateName": ["Gün Teknik"')
    govde = govde.replace("GÜN TEKNİK", "GÜN TECHNIC").replace("Gün Teknik", "Gün Technic")
    h = bas + govde
    # Çevrilmemiş Türkçe kalmasın
    kalan = []
    for m in re.finditer(r'>([^<>{}]*[ğüşıöçĞÜŞÖÇ][^<>{}]*)<', govde):
        t = m.group(1).strip()
        if t and _turkce(t):
            kalan.append(t)
    for m in re.finditer(r'(?:aria-label|placeholder)="([^"]*[ğüşıöçĞÜŞÖÇİ][^"]*)"', govde):
        if _turkce(m.group(1)):
            kalan.append(m.group(1))
    if kalan:
        raise SystemExit("Çevrilmemiş metin var (en.py):\n  " + "\n  ".join(sorted(set(kalan))))
    return h


# Türkçe harf içerse de çevrilmeyen özel adlar
OZEL_AD = ["GÜN TECHNIC", "Gün Technic", "Türkçe", "Köyceğiz", "Muğla", "Türksat", "Arçelik", "İztuzu", "Türkiye"]


def _turkce(t):
    for a in OZEL_AD:
        t = t.replace(a, "")
    return re.search("[ğüşıöçĞÜŞÖÇİ]", t) is not None
