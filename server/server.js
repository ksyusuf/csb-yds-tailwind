const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// CORS ayarları
app.use(cors());
app.use(express.json()); // JSON verileri işlemek için


function generateRandomData(count) {
    const cities = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Mersin', 'Kayseri'];
    const heatingSystems = ['Merkezi ısıtma kalorifer', 'Bina içi kalorifer', 'Kat kaloriferi', 'Soba', 'Doğalgaz sobası', 'Klima', 'Diğer'];
    const heatingFuels = ['Katı yakıt', 'Fuel-oil', 'Doğalgaz', 'LPG', 'Elektrik', 'Güneş', 'Termal', 'Rüzgar', 'Diğer'];
    const hotWaterSources = ['Termosifon', 'Şofben', 'Güneş Kolektörü', 'Kombi', 'Müşterek', 'Diğer'];
    const hotWaterFuels = ['Doğalgaz', 'LPG', 'Fuel-Oil', 'Elektrik', 'Katı yakıt', 'Termal', 'Diğer'];
    const waterSources = ['Şehir suyu', 'Kuyu suyu', 'Pınar suyu', 'Taşıma suyu', 'Diğer'];
    const wasteWaterTypes = ['Kanalizasyon', 'Foseptik', 'Diğer'];
    const installations = ['Arıtma', 'Baz istasyonu', 'Doğalgaz', 'Elektrik', 'Haberleşme', 'Pissu', 'Temiz su', 'Hidrofor', 'Jenerator', 'Paratoner', 'Yangın tesisatı', 'Diğer'];
    const commonAreas = ['Asansör', 'Bekçi kulübesi', 'Açık otopark', 'Kapalı otopark', 'Kapıcı dairesi', 'Kömürlük', 'Ortak depo', 'Sığınak', 'Su deposu', 'Yangın merdiveni', 'Yüzme havuzu', 'Diğer'];
    const wallMaterials = ['Briket', 'Tuğla', 'Taş', 'Ahşap', 'Kerpiç', 'Gazbeton', 'Beton blok', 'Hafif panel', 'Bims', 'Diğer'];
    const floorTypes = ['Plak kiriş', 'Mantar döşeme', 'Asmolen', 'Ahşap', 'Hazır yapı elemanı', 'Kaset Döşeme', 'Diğer'];
    const workStateOptions = [
        'Ön Kayıt',
        'İdare Onayı Bekleyen (Dağıtım)',
        'Dağıtım Bekleyen',
        'Ruhsat Başvuru Bekleyen',
        'Ruhsat Bekleyen',
        'Güncel',
        'Küme Onayı Bekleyen',
        'Ruhsat Redli',
        'Ruhsat Redli (Ceza Sonucu)',
        'Ruhsat Redli (Belge Geri Alınma)',
        'Fesihli Tespitsiz',
        'Fesihli Tespitsiz (Ceza Sebebiyle)',
        'Fesihli Tespitsiz (Belge Geri Alınma)',
        'Fesihli Tespitsiz (YİAM)',
        'Fesihli Tespitli',
        'Devir Başvurusu Bekleyen (Fesihli)',
        'Devir Onayı Bekleyen (Fesihli)',
        'Dağıtım Bekleyen (Fesihli)',
        'Veri Aktarımı Bekleyen (Fesihli)',
        'Devir Başvurusu Bekleyen (Kısmi)',
        'Devir Onayı Bekleyen (Kısmi)',
        'Dağıtım Bekleyen (Kısmi)',
        'Yanan Yıkılan',
        'Ruhsat İptali',
        'YİBF İptal',
        'Kısmi Bitmiş',
        'Bitmiş',
        'Migrasyon Ham',
        'Migrasyon Ham Ruhsat',
        'Migrasyon İşlenmiş',
        'Migrasyon Fesihli Eksik Müellif',
        'Migrasyon Fesihli Eksik Ruhsat',
        'Güçlendirme İmalatı Başvuru Bekleyen',
        'Güçlendirme İmalatı Onay Bekleyen',
        'Güçlendirme İptal'
      ];
    const yapiDenetimFirmalari = [
        "Güven Yapı Denetim Ltd. Şti.",
        "Proje Kontrol Yapı Denetim Ltd. Şti.",
        "Kalite Yapı Denetim Ltd. Şti.",
        "İnşaat Güvencesi Yapı Denetim Ltd. Şti.",
        "Yapı İzleme Denetim Ltd. Şti.",
        "Teknik Denetim Yapı Denetim Ltd. Şti.",
        "Yapı Standartları Denetim Ltd. Şti.",
        "İnşaat Denetim Sistemleri Ltd. Şti.",
        "Proje Güvenliği Yapı Denetim Ltd. Şti.",
        "Denetim Yapı Denetim Ltd. Şti.",
        "Stratejik Yapı Denetim Ltd. Şti.",
        "Kalite Kontrol Yapı Denetim Ltd. Şti.",
        "Yapı Güvencesi Denetim Ltd. Şti.",
        "İnşaat İzleme Yapı Denetim Ltd. Şti.",
        "Proje Denetim Ofisi Ltd. Şti.",
        "Yapı Sertifikasyon Denetim Ltd. Şti.",
        "Güvenilir Yapı Denetim Ltd. Şti.",
        "Proje Yönetim Yapı Denetim Ltd. Şti.",
        "İnşaat Denetim Uzmanları Ltd. Şti.",
        "Mühendislik Yapı Denetim Ltd. Şti."
      ];
      const isBasliklari = [
        "MAVİ YAPI - A BLOK",
        "YILDIZ A.Ş. İSTİNAT DUVARI",
        "MAVİ YAPI - B BLOK",
        "ALİ KARA İSTİNAT DUVARI",
        "ALİ KARA VE HİSS.",
        "AHMET DEMİR VİLLA",
        "AYŞE GÜL VİLLA",
        "MEHMET KAYA VİLLA",
        "ZEYNEP ALTUN HAVUZ",
        "MUSTAFA YILMAZ İSTİNAT DUVARI",
        "SELİN TUNA VİLLA",
        "HÜSEYİN ÇELİK VİLLA",
        "FATMA YAVUZ VİLLA",
        "OĞUZ KORU VİLLA",
        "DİDEM KARA İSTİNAT DUVARI",
        "EGE YAPI - D BLOK",
        "SİNAN BAHÇE",
        "GÖKÇE KAPI VİLLA",
        "KÜBRA YAPI - E BLOK"
      ];
      const istanbulBelediyeler = [
        "Adalar",
        "Arnavutköy",
        "Ataşehir",
        "Avcılar",
        "Bağcılar",
        "Bahçelievler",
        "Bakırköy",
        "Bayrampaşa",
        "Beşiktaş",
        "Beyoğlu",
        "Büyükçekmece",
        "Çatalca",
        "Esenler",
        "Esenyurt",
        "Eyüpsultan",
        "Fatih",
        "Gaziosmanpaşa",
        "Güngören",
        "Kadıköy",
        "Kağıthane",
        "Kartal",
        "Maltepe",
        "Pendik",
        "Sancaktepe",
        "Sarıyer",
        "Silivri",
        "Şile",
        "Tuzla",
        "Ümraniye",
        "Üsküdar",
        "Zeytinburnu"
      ];
      
    const getRandomDate = () => {
    const start = new Date(2020, 0, 1).getTime();
    const end = Date.now();
    const randomDate = new Date(start + Math.random() * (end - start));
    return `${randomDate.toLocaleDateString('tr-TR')}`;
    };

    let data = [];

    for (let i = 1; i <= count; i++) {
        let ilgili_idare_ve_ilce = istanbulBelediyeler[Math.floor(Math.random() * istanbulBelediyeler.length)]
        // ilgili ilçeye ilgili idare bakar.
        let userData = {
            "YIBF-Ozellik": {
                "Yibf-Turu": ["Küme YİBF", "Eklenti YİBF", "Normal"][Math.floor(Math.random() * 3)]
            },
            "Ana Bilgiler": {
                "YİBF No": Math.floor(10000000 + Math.random() * 9000),
                "Yapı Denetim Kuruluşu": yapiDenetimFirmalari[Math.floor(Math.random() * yapiDenetimFirmalari.length)],
                "Yapı Denetim Adres": `Yapı Denetim Adres ${i}`,
                "Yapı Denetim Telefon": `0${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
                "İlgili İdare": ilgili_idare_ve_ilce,
                "İl": cities[0],
                "Durum": workStateOptions[Math.floor(Math.random() * workStateOptions.length)],
                "İş Başlık": isBasliklari[Math.floor(Math.random() * isBasliklari.length)],
                "Sözleşme Tarihi": getRandomDate(),
                "Dağıtım Tarihi": `Dağıtım Tarihi ${i}`,
                "Ruhsat Tarihi": `Ruhsat Tarihi ${i}`,
                "Ruhsat No": Math.floor(100 + Math.random() * 900),
                "Bitirme Tarihi": `Bitirme Tarihi ${i}`,
                "Ruhsat Ret Tarihi": `Ruhsat Ret Tarihi ${i}`,
                "Ruhsat Ret Nedeni": `Ruhsat Ret Nedeni ${i}`,
                "BKS Referans No": `BKS Referans No ${i}`,
                "Sanayii Sitesi": Math.random() >= 0.5 ? 'Evet' : 'Hayır',
                // ------                
                "Kısmi": Math.random() >= 0.5 ? 'Evet' : 'Hayır',
                "Seviye": `${Math.floor(Math.random() * 100) + 1}%`,
                "Kalan Alan (m²)": Math.floor(Math.random() * 10000) + 1000,
                "Yapı İnşaat Alanı (m²)": Math.floor(Math.random() * 5000) + 500,
                "İlçe": ilgili_idare_ve_ilce,
                "Mahalle/Köy": `Mahalle/Köy ${i}`,
                "Birim Fiyat": Math.random() * 1000 + 100,
                "Yapı Sınıfı": ["1A","1B","1C","2A","2B","2C","3A","3B","3C","4A","4B","4C",][Math.floor(Math.random() * 12)],
                "Küme Yapı Mı?": Math.random() < 0.5 ? 'Evet' : 'Hayır',
                "Eklenti": Math.random() < 0.5 ? 'Evet' : 'Hayır',
                "Güçlendirme": `Güçlendirme ${i}`,
                "Güçlendirme (Ruhsat)": `Güçlendirme (Ruhsat) ${i}`,
                "GES": Math.random() >= 0.5 ? 'Evet' : 'Hayır'
            },
            "Yapı Bilgileri": {
                "Taşıyıcı Sistem": `Taşıyıcı Sistem ${i}`,
                "Ruhsat Veriliş Amacı": `Ruhsat Veriliş Amacı ${i}`,
                "Yapı Sınıfı": `Yapı Sınıfı ${i}`,
                "Kat Adet": Math.floor(Math.random() * 10) + 1,
                "Kısmi İnşaat": `Kısmi İnşaat ${i}`,
                "Yapı Toplam Alan (m²)": Math.floor(Math.random() * 10000) + 1000,
                "Yapı İnşaat Alan (m²)": Math.floor(Math.random() * 5000) + 500,
                "Kalan Alan (m²)": Math.floor(Math.random() * 5000) + 500,
                "Mahalle": `Mahalle ${i}`,
                "Yapı Adresi": `Yapı Adresi ${i}`,
                "Cadde Sokak": `Cadde Sokak ${i}`,
                "Köy": `Köy ${i}`,
                "Ada": Math.floor(1000 + Math.random() * 9000),
                "Parsel": Math.floor(10 + Math.random() * 90),
                "Pafta": Math.floor(1 + Math.random() * 10),
                "Birim Fiyat": Math.random() * 1000 + 100
            },
            "Yapı Sahibi Bilgileri": {
                "Yapı Sahibi Adı": `Yapı Sahibi Adı ${i}`,
                "Yapı Sahibi Soyadı": `Yapı Sahibi Soyadı ${i}`,
                "Yapı Sahibi Adres": `Yapı Sahibi Adres ${i}`,
                "Yapı Sahibi Telefon": `05${Math.floor(Math.random() * 900000000 + 100000000)}`,
                "Hissedar Var Mı?": Math.random() < 0.5 ? 'Evet' : 'Hayır'
            },
            "Sözleşme Bilgileri": {
                "Ay": `Ay ${i}`,
                "Sözleşme Bedel Beyan (24 Ay)": (Math.random() * 50000).toFixed(2),
                "Sözleşme Bedel Oranı": `${Math.random() * 100}%`
            },
            "Müteahhit Bilgileri": {
                "Müteahhit Ünvan": `Müteahhit Ünvan ${i}`,
                "Müteahhit Kayıt No": Math.floor(100000 + Math.random() * 900000)
            },
            "Şantiye Şefi Bilgileri": {
                "Şantiye Şefi Ad": `Şantiye Şefi Ad ${i}`,
                "Şantiye Şefi Soyad": `Şantiye Şefi Soyad ${i}`
            },
            "Yapı Teknik Özellikleri": {
                "Isıtma Sistemi": heatingSystems[Math.floor(Math.random() * heatingSystems.length)],
                "Isıtma Yakıt Cinsi": heatingFuels[Math.floor(Math.random() * heatingFuels.length)],
                "Sıcak Su Temin Şekli": hotWaterSources[Math.floor(Math.random() * hotWaterSources.length)],
                "Sıcak Su Yakıt Cinsi": hotWaterFuels[Math.floor(Math.random() * hotWaterFuels.length)],
                "İçme Suyu": waterSources[Math.floor(Math.random() * waterSources.length)],
                "Atık Su": wasteWaterTypes[Math.floor(Math.random() * wasteWaterTypes.length)],
                "Tesisatlar": installations[Math.floor(Math.random() * installations.length)],
                "Ortak Kullanım Alanları": commonAreas[Math.floor(Math.random() * commonAreas.length)],
                "Duvar Dolgu Maddesi": wallMaterials[Math.floor(Math.random() * wallMaterials.length)],
                "Döşeme": floorTypes[Math.floor(Math.random() * floorTypes.length)]
            }
        };
        data.push(userData);
    }

    return data;
}

// Döngü ile ilgili json içerisindeki tüm key'leri arar.
function findNestedValue(obj, key) {
    /// bu fonksiyon, gelen json verisinin içerisindeki tüm keylerde arama yapar.
    /// yani bir json geldi ve bunun iç içe bir yapısı var.
    /// ben bunun içerisindeki tüm keyleri gezip buluyorum
    /// ve bu benim filtreleme yapmamı kolaylaştırıyor.
    if (obj.hasOwnProperty(key)) {
        return obj[key];
    }
    for (const k in obj) {
        if (typeof obj[k] === 'object' && obj[k] !== null) {
            const found = findNestedValue(obj[k], key);
            if (found) return found;
        }
    }
    return null;
}

const data = generateRandomData(65);

function generateTransactionHistory(data, transactionCount) {
    const transactionHistory = [];
    const transactionTypes = [
        "Bakanlık ve İlgili idare payı ödemesi",
        "Beton Firması Kayıt",
        "Dağıtım İptali",
        "Denetçi Adayı Belge Başvurusu",
        "Denetçi Adayı Evrak Bilgileri Güncelleme",
        "Denetçi Adayı Komisyon Onayı",
        "Denetçi Adayı Komisyon Reddi",
        "Denetçi Adayı Kayıt",
        "Denetçi Belgesi Yazdırma",
        "Denetçi Bilgilerinde Güncelleme",
        "Denetçi Ceza Kesin Mahkeme Kararı",
        "Denetçi Cezalandırılması",
        "Denetçi Cezasının Kaldırılması",
        "Denetçi İzin Belgesi Geri Verildi",
        "Denetçi İzin Belgesi Geri Alma",
        "Denetçi İzin Belgesi İptali",
        "Denetçi İzin Belgesi İptalini Kaldırma",
        "Denetçinin Ceza Bilgilerinin Güncellenmesi",
        "Denetçinin LAB'da İşe Başlaması",
        "Denetçinin LAB'dan İstifası",
        "Denetçinin YDK'da İşe Başlaması",
        "Denetçinin YDK'dan İstifası",
        "Denetçi Vefatı",
        "Denetim Bilgisinde Güncelleme",
        "Denetimden Men Güncelleme",
        "Denetimden Men Kesin Mahkeme Kararı",
        "Denetim Faaliyetinden Men Etme",
        "Denetim Faaliyetinden Men Kaldırma",
        "Eleman Bilgilerinde Güncelleme",
        "Elemanın LAB'da İşe Başlaması",
        "Elemanın LAB'dan İstifası",
        "Fesihli YIBF Bilgisinin İlgili İdarece Düzeltilmesi (Veri göçü)",
        "Güçlendirme İmalatı İzin Başvurusu",
        "Güçlendirme İmalatı İzin Onayı",
        "Güçlendirme İmalatı İzin Onayı Güncellemesi",
        "Güçlendirme İmalatı İzin Reddi",
        "Güçlendirme Tutanağı",
        "Hakedis Bilgilerinde Güncelleme",
        "Hazır Beton Firması Başvuru Onayı",
        "Hazır Beton Firması Başvuru Reddi",
        "İş Bitirme Kararı",
        "İş Bitirme Talebi",
        "İş Bitirme Talebi Ödeme",
        "İş Yeri Teslim Tutanağı",
        "KE Ceza Bilgilerinin Güncellenmesi",
        "KE Ceza Kesin Mahkeme Kararı",
        "Kişi Bilgisi Güncelleme",
        "Kontör Bilgilerinde Güncelleme",
        "Kontör Açıklama",
        "Kontrol Elemanı Bilgilerinde Güncelleme",
        "Kontrol Elemanı Cezalandırılması",
        "Kontrol Elemanı Cezasının Kaldırılması",
        "Kontrol Elemanı'nın YDK'da İşe Başlaması",
        "Kontrol Elemanı'nın YDK'dan İstifası",
        "Kontrol Elemanı Vefatı",
        "Kullanıcı Bilgilerinde Güncelleme",
        "Kullanıcıdan Rol Silme",
        "Kullanıcı Giriş Engelleme İptali",
        "Kullanıcı Girişi Engelleme",
        "Kullanıcı Rol Bilgilerinde Güncelleme",
        "Kullanıcı Şifre Unutma",
        "Kullanıcı Sistem Çıkışı",
        "Kullanıcı Sistem Girişi",
        "Kullanıcı Sistem Girişi (Geçici Parola)",
        "Kullanıcı Sistem Girişi (Rol Değiştirerek)",
        "Kullanıcıya Rol Ekleme",
        "Kullanıcı Yeni Kayıt",
        "LAB Bilgilerinde Güncelleme",
        "LAB Ceza Kesin Mahkeme Kararı",
        "LAB Ceza Sebebiyet Denetçi",
        "LAB Ceza Sebebiyet Denetim Elemanı Çıkartma",
        "LAB'dan Kurucu Silinmesi",
        "LAB'ın Tasfiye Edilmesi",
        "LAB İzin Belgesi Askıdan İndirme",
        "LAB İzin Belgesi Askıya Alma",
        "LAB İzin Belgesi İptali",
        "LAB İzin Belgesi İptalini Kaldırma",
        "LAB Kür Kapasite Bilgilerinde Güncelleme",
        "LAB Kür Kapasite Bilgisi Kaydetme",
        "LAB Kür Kapasite Detay Bilgilerinde Güncelleme",
        "LAB Kür Kapasite Detay Bilgisi Kaydetme",
        "Laboratuvara Yeni Kurucu Kaydı",
        "Laboratuvar'da Kurucu Bilgilerinde Güncelleme",
        "Laboratuvar'dan Kurucu Silinmesi",
        "Laboratuvar Elemanı Vefatı",
        "Laboratuvar Kurucu Ekle",
        "Laboratuvar Kurucu Güncelle",
        "Laboratuvar Test Raporu",
        "Laboratuvar Test Raporu Güncelleme",
        "LAB Sözleşme Feshi",
        "LAB Teminat Bilgisi Güncelleme",
        "LAB Teminat Bilgisi Kaydetme",
        "LAB Teminat İptal Bilgisi Güncelleme",
        "LAB Teminat İptal Bilgisi Kaydetme",
        "LAB Yeni Rapor İşlemleri Engelinin Kaldırılması",
        "LAB Yeni Rapor İşlemlerinin Engellenmesi",
        "M2 ve Sorun Kontrolü",
        "Müellif Bilgi Güncelleme",
        "Numune Toplama İstasyonu İzin Belgesi İptal Edilmesi",
        "Numune Toplama İstasyonu İzin Belgesi Pasifin Kaldırılması",
        "Numune Toplama İstasyonu İzin Belgesi Pasif Yapılması",
        "Rol Pasif Yapma İşlemi",
        "Ruhsat/Devir Öncesi Yapı Grubu Değişikliği",
        "Şirket Müdürü Bilgilerinde Güncelleme",
        "Şirket Müdürü'nün LAB'da İşe Başlaması",
        "Şirket Müdürü'nün LAB'dan İstifası",
        "Şirket Müdürü'nün YDK'da İşe Başlaması",
        "Şantiye Şefi Bilgilerinin Güncellenmesi",
        "Şantiye Şefi Vefatı",
        "Şirket Müdürü'nün YDK'dan İstifası",
        "Yapı Malz. Denetçisi Kimya Müh.'ne Çalışma Engeli Konulması",
        "Yapı Malz. Denetçisi Kimya Müh.'ne Konulan Çalışma Engelinin Kaldırılması",
        "Yasaklı Ekleme",
        "Yasaklı Güncelleme",
        "Yasaklılık Kaldırma",
        "YDK Adayı Evrak Bilgileri Güncelleme",
        "YDK Adayı İzin Belgesi Başvurusu",
        "YDK Adayı Kayıt",
        "YDK Adayı Komisyon Onayı",
        "YDK Adayı Komisyon Reddi",
        "YDK Bilgilerinde Güncelleme",
        "YDK Bilgilerinde Güncelleme - İstanbul Dağıtım Bölge Bilgileri",
        "YDK Ceza Bilgilerinin Güncellenmesi",
        "YDK Ceza Kesin Mahkeme Kararı",
        "YDK Cezalandırılması",
        "YDK Ceza Sebebiyet Denetçi",
        "YDK Ceza Sebebiyet Denetim Elemanı Çıkartma",
        "YDK Ceza Sebebiyet YIBF",
        "YDK Cezasının Kaldırılması",
        "YDK'da Kurucu Bilgilerinde Güncelleme",
        "YDK'dan Kurucu Silinmesi",
        "YDK Hesabina Kontör Ekleme",
        "YDK İzin Belgesi Geri Alma",
        "YDK İzin Belgesi Geri Verme",
        "YDK İzin Belgesi İptali",
        "YDK İzin Belgesi İptalini Kaldırma",
        "YDK İzin Belgesi Yazdırma",
        "YDK Kontör Düşümü",
        "YDK Kontör İade",
        "YDK'nin Tasfiye Edilmesi",
        "YDK'nin yeni YİBF ve Devralma işlemleri engelinin kaldırılması",
        "YDK'nin yeni YİBF ve Devralma işlemlerinin engellenmesi",
        "YDK'ya Riskli Yapı Tespit Lisansı verilmesi",
        "YDK'ya Yeni Kurucu Kaydı",
        "Yeni Kontrol Elemanı Kayıt",
        "Yeni YİBF Kayıt",
        "Yeni YKE Kayıt",
        "YİBF %20 İndirim Uygulandı",
        "YİBF Devralma Reddi Belge Geri Alma",
        "YİBF Devralma Reddi Belge İptali",
        "YİBF Devralma Reddi Tasfiye",
        "YİBF Ruhsat Reddi Belge Geri Alma",
        "YİBF Ruhsat Reddi Belge İptali",
        "YİBF Ruhsat Reddi Tasfiye",
        "YİBF %75 İndirim İptal Edildi",
        "YİBF Bilgileri Güncellemesinin (Sehven Tipinde) YDK Bilgilendirmesi",
        "YİBF Bilgilerinde Güncelleme",
        "YİBF Bilgisinde düzeltmenin İlgili İdarece onaylanması (Veri göçü)",
        "YİBF Bilgisinin YDK tarafından düzeltilmesi (Veri göçü)",
        "YİBF Birim Fiyat Güncelleme",
        "YİBF'den Şantiye Şefi Zorunluluğunun Kaldırılması",
        "YİBF Devir Başvuru Talebi",
        "YİBF Devralma Başvurusu",
        "YİBF'de Yeterli Denetim Elemanı Görevlendirilmemiş",
        "YİBF'e Denetim Bilgisi Girişi",
        "YİBF'e Hazır Beton Dökümü",
        "YİBF'e Müellif Eklenmesi",
        "YİBF Fesih Hakediş Seviye Tespit Girişi",
        "YİBF Fesih Hakediş Seviye Tespit Onayı",
        "YİBF Fesih Hakediş Seviye Tespit Talebi",
        "YİBF Fesih İşlemi",
        "YİBF Fesih İşlemi (YDK Cezalandırılması Sonucu)",
        "YİBF Hakediş Bedeli Ödemesi",
        "YİBF Hakediş Bedeli Ödeme Talebi",
        "YİBF Hakediş Seviye Tespit Onayı",
        "YİBF Hakediş Seviye Tespit Talebi",
        "YİBF Havuza Gönderildi",
        "YİBF Hazır Beton Dökümü Güncelleme",
        "YİBF İlgili İdare Devralma Onayı İptali",
        "YİBF İlgili İdare Devralma Reddi",
        "YİBF İlgili İdare Ruhsat Onayı",
        "YİBF İdare Onayına Gönderildi",
        "YİBF İlgili İdare Devralma Onayı",
        "YİBF İlgili İdare Ruhsat Onayı İptali",
        "YİBF İlgili İdare Ruhsat Reddi",
        "YİBF İlgili İdare Ruhsat Reddi (YDK Cezalandırılması Sonucu)",
        "YİBF İptali",
        "YİBF Kümeden Çıkarıldı",
        "YİBF Küme Onayı İptal Edildi",
        "YİBF Küme Onayına Gönderildi",
        "YİBF Kümeye Eklendi",
        "YİBF Müellife İade Edildi",
        "YİBF Ruhsat Başvurusu",
        "YİBF Ruhsat Başvurusu Yapılmamış",
        "YİBF Ruhsat Güncellemesi",
        "YİBF Sözleşme Bedel Oranı Güncelleme",
        "YİBF'te Denetçi Görevlendirilmesi",
        "YİBF'te Kontrol Elemanı Görevlendirilmesi",
        "YİBF'ten Denetçi Sorumluluğunun Kalkması",
        "YİBF'ten Kontrol Elemanının Sorumluluğunun Kalkması",
        "YİBF'ten Müellif Çıkarılması",
        "YİBF'ten Şantiye Şefinin Ayrılması",
        "YİBF'ten Şantiye Şefinin Ayrılması (MUY)",
        "YİBF'ten YKE Sorumluluğunun Kalkması",
        "YİBF'te Şantiye Şefi Görevlendirilmesi",
        "YİBF'te YKE Görevlendirilmesi",
        "YİBF Veri Aktarımı",
        "YİBF YDK Atanması",
        "YİBF YDK'ya gönderilen Devir Onayı Bilgilendirmesi",
        "YİBF YDK'ya gönderilen Ruhsat Onayı Bilgilendirmesi",
        "YİBF Yılsonu Hakediş Seviye Tespit Onayı",
        "YİBF Yılsonu Hakediş Seviye Tespit Talebi",
        "YKE Bilgilerinde Güncelleme",
        "YKE Ceza Bilgilerinin Güncellenmesi",
        "YKE Ceza Kesin Mahkeme Kararı",
        "YKE Cezalandırılması",
        "YKE Cezasının Kaldırılması",
        "YKE'nin YDK'da İşe Başlaması",
        "YKE'nin YDK'dan İstifası",
        "YKE Vefatı"
    ];
    const rastgeleIsimler = [
        "Ali Yılmaz",
        "Elif Demir",
        "Mehmet Çelik",
        "Zeynep Arslan",
        "Emre Koç",
        "Fatma Şahin",
        "Oğuzhan Polat",
        "Aylin Korkmaz",
        "Burak Kaplan",
        "Derya Özdemir",
        "Canan Aydın",
        "Serkan Kılıç",
        "Merve Yıldız",
        "Hüseyin Akman",
        "Gamze Uçar",
        "Tuna Başar",
        "Ceren Kurt",
        "Umut Sezer",
        "Seda Arı",
        "Kaan Tekin"
    ];

    data.forEach(entry => {
        const yapiDenetimFirmalari = [
            "Güven Yapı Denetim Ltd. Şti.",
            "Proje Kontrol Yapı Denetim Ltd. Şti.",
            "Kalite Yapı Denetim Ltd. Şti.",
            "İnşaat Güvencesi Yapı Denetim Ltd. Şti.",
            "Yapı İzleme Denetim Ltd. Şti.",
            "Teknik Denetim Yapı Denetim Ltd. Şti.",
            "Yapı Standartları Denetim Ltd. Şti.",
            "İnşaat Denetim Sistemleri Ltd. Şti.",
            "Proje Güvenliği Yapı Denetim Ltd. Şti.",
            "Denetim Yapı Denetim Ltd. Şti.",
            "Stratejik Yapı Denetim Ltd. Şti.",
            "Kalite Kontrol Yapı Denetim Ltd. Şti.",
            "Yapı Güvencesi Denetim Ltd. Şti.",
            "İnşaat İzleme Yapı Denetim Ltd. Şti.",
            "Proje Denetim Ofisi Ltd. Şti.",
            "Yapı Sertifikasyon Denetim Ltd. Şti.",
            "Güvenilir Yapı Denetim Ltd. Şti.",
            "Proje Yönetim Yapı Denetim Ltd. Şti.",
            "İnşaat Denetim Uzmanları Ltd. Şti.",
            "Mühendislik Yapı Denetim Ltd. Şti."
          ];
        const yibfNo = entry["Ana Bilgiler"]["YİBF No"];
        
        for (let i = 0; i < transactionCount; i++) {
            const transactionRecord = {
                "YİBF_NO": yibfNo,
                "İşlem Zamanı": new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)), // Son 1 yıl içinde rastgele bir tarih
                "İşlem": transactionTypes[Math.floor(Math.random() * transactionTypes.length)],
                "Denetim Elemanı": Math.random() < 0.4 ? null : `Denetim Elemanı ${Math.floor(Math.random() * 100)}`,
                "YDK/LAB": Math.random() < 0.5 ? null : yapiDenetimFirmalari[Math.floor((yibfNo % 10) /10 * yapiDenetimFirmalari.length)],
                // YDK için ilgili yibf no kullanılarak o yibf'e özgü rastgele yapı denetim ataması taklit ettik.
                "Gerçekleştiren": rastgeleIsimler[Math.floor(Math.random() * rastgeleIsimler.length)]
            };
            transactionHistory.push(transactionRecord);
        }
    });

    return transactionHistory;
}

const transactionHistory = generateTransactionHistory(data, 90); // Her biri için 90 işlem

function SorunUretici(data, SorunSayisi) {
    const SorunListesi = [];
    const yibf_sorun_tipi = [
        ["YİBF Şantiye Şefi Eksik", "Kritik"],
        ["YİBF Makine Proje Müellif Bilgileri Eksik", "Normal"],
        ["YİBF Elektrik Proje Müellif Bilgileri Eksik", "Normal"]
    ];
  
    data.forEach(entry => {
        const yibfNo = entry["Ana Bilgiler"]["YİBF No"];
        
        for (let i = 0; i < SorunSayisi; i++) {
            const SorunKaydi = {
                "YİBF_NO": yibfNo,
                "Sorun Başlangıç Zamanı": new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)), // Son 1 yıl içinde rastgele bir tarih
                "Sorun Adı ve Tipi": yibf_sorun_tipi[Math.floor(Math.random() * yibf_sorun_tipi.length)],
            };
            SorunListesi.push(SorunKaydi);
        }
    });

    return SorunListesi;
}

const YIBF_Sorunlari = SorunUretici(data, 2);

// Filtreleme işlemi için veri sağlayan endpoint
app.get('/api/data', (req, res) => {
    let filteredData;
    let filteredSortedData;
    let filteredSortedSlicedData;
    const filters = req.query.filters ? JSON.parse(req.query.filters) : [];
    
    if (filters.length > 0) {
        filteredData = data.filter(item => {
            return filters.every(filter => {
                // item içindeki tüm alanlarda (keylerde) filtreleme yapılacak
                const value = findNestedValue(item, filter.Column) ? 
                            findNestedValue(item, filter.Column).toString().toLowerCase() : '';
                const filterValue = filter.value.toLowerCase();

                switch (filter.type) {
                    case 'contains':
                        return value.includes(filterValue);
                    case 'not_contains':
                        return !value.includes(filterValue);
                    case 'starts_with':
                        return value.startsWith(filterValue);
                    case 'ends_with':
                        return value.endsWith(filterValue);
                    case 'equals':
                        return value === filterValue;
                    case 'not_equals':
                        return value !== filterValue;
                    default:
                        return true;
                }
            });
        });
    }else{
        filteredData = data;
    }

    // sayfalama yapmadan önce gelen veriyi isteğe göre sıralayalım.
    const sortColumn = JSON.parse(req.query.sorting)['column'];
    const sortDirection = JSON.parse(req.query.sorting)['direction'];
    
    function findValueByKey(obj, key) {
        // bu fonksiyon, filtrelenmiş veriyi sıralarken sıralama yapılması istenen
        // keyi json içerisindeki tüm seviyelerde arayıp bulur.
        if (obj.hasOwnProperty(key)) {
            return obj[key];
        }
        for (let k in obj) {
            if (typeof obj[k] === 'object' && obj[k] !== null) {
                let found = findValueByKey(obj[k], key);
                if (found !== undefined) {
                    return found;
                }
            }
        }
        return undefined;
    }
    
    function Sorting(data, sortColumn, sortDirection) {
        // bu fonksiyon gelen veri ve sıralama bilgileri ile veriyi sıralayıp geri döndürür.
        if (!sortColumn || sortDirection === 'default') return data;
        const sorted = [...data].sort((a, b) => {
            const aValue = findValueByKey(a, sortColumn);
            const bValue = findValueByKey(b, sortColumn);
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    }

    if( sortColumn != null ){
        // eğer sıralama isteği varsa sıralayacak
        filteredSortedData = Sorting(filteredData, sortColumn, sortDirection);
    }else{
        filteredSortedData = filteredData;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    filteredSortedSlicedData = filteredSortedData.slice(startIndex, endIndex);

    // Yanıtı gönder
    res.json({
        data: filteredSortedSlicedData,
        // toplam sayfa sayısı için dilimlenmeden önce total data sayısı lazım
        total: filteredData.length
    });
});

app.get('/api/data/log', (req, res) => {
    const dataID = req.query.log;
    const filteredData = transactionHistory.filter(item => item.YİBF_NO === Number(dataID));

    // verileri tarihe göre yeniden eskiye sıralayalım.
    const filteredDataSorted = filteredData.sort((a, b) => {
        return new Date(b["İşlem Zamanı"]) - new Date(a["İşlem Zamanı"]);
    });

    // sayfalama için
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const filteredDataSliced = filteredData.slice(startIndex, endIndex);

    // Yanıtı gönder
    res.json({
        data: filteredDataSliced,
        total: filteredDataSorted.length
    });
});

app.get('/api/data/yibfError', (req, res) => {
    const dataID = req.query.yibfError;
    const filteredErrors = YIBF_Sorunlari.filter(item => item.YİBF_NO === Number(dataID));

    // verileri tarihe göre yeniden eskiye sıralayalım.
    const filteredErrorsSorted = filteredErrors.sort((a, b) => {
        return new Date(b["Sorun Başlangıç Zamanı"]) - new Date(a["Sorun Başlangıç Zamanı"]);
    });

    // sayfalama için
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const filteredErrorsSliced = filteredErrors.slice(startIndex, endIndex);

    // Yanıtı gönder
    res.json({
        data: filteredErrorsSliced,
        total: filteredErrorsSorted.length
    });
});




app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
