const columnTitles = {
    "yibfno": "YİBF No",
    "il": "İl",
    "ilgiliidare": "İlgili İdare",
    "ada": "Ada",
    "parsel": "Parsel",
    "isbaslik": "İş Başlık",
    "yapidenetimkurulusu": "Yapı Denetim Kuruluşu",
    "isindurumu": "İşin Durumu",
    "kismi": "Kısmi",
    "seviye": "Seviye",
    "sozlesmetarihi": "Sözleşme Tarihi",
    "kalanalanm2": "Kalan Alan (m²)",
    "yapiinsaatalanim2": "Yapı İnşaat Alanı (m²)",
    "ilce": "İlçe",
    "mahallekoy": "Mahalle/Köy",
    "birimfiyat": "Birim Fiyat",
    "bksreferansno": "BKS Referans No",
    "ruhattarihi": "Ruhsat Tarihi",
    "yapisinifi": "Yapı Sınıfı",
    "yapitoplamalanim2": "Yapı Toplam Alanı (m²)",
    "kumeyapimi": "Küme Yapı Mı?",
    "eklenti": "Eklenti",
    "sanayisitesi": "Sanayi Sitesi",
    "guclendirme": "Güçlendirme",
    "guclendirmeruhsat": "Güçlendirme (Ruhsat)",
    "ges": "GES"
};



// Şantiye verisi üretme fonksiyonu (YİBF No'yu benzersiz anahtar olarak kullanıyoruz)
function generateRandomData(count) {
    let data = [];
    let generatedYIBF = new Set(); // Benzersiz YİBF No'ları tutan set

    for (let i = 1; i <= count; i++) {
        let yibfNo;
        // Benzersiz YİBF No üretilene kadar döngü
        do {
            yibfNo = Math.floor(10000000 + Math.random() * 90000000); // 8 haneli benzersiz sayı
        } while (generatedYIBF.has(yibfNo));
        
        generatedYIBF.add(yibfNo); // YİBF No'yu set'e ekleyerek benzersizliğini garanti altına al

        let userData = {
            "yibfno": yibfNo, // Benzersiz YİBF No
            "il": [
                'İstanbul',
                'Ankara',
                'İzmir',
                'Bursa',
                'Antalya',
                'Adana',
                'Konya',
                'Gaziantep',
                'Mersin',
                'Kayseri'
            ][Math.floor(Math.random() * 10)],
            "ilgiliidare": `İlgili İdareili ili ${i}`,
            "ada": Math.floor(1000 + Math.random() * 9000), // 4 haneli sayı
            "parsel": Math.floor(10 + Math.random() * 90), // 2 haneli sayı
            "isbaslik": `İş Başlık ${i}+${i}+${i}`,
            "yapidenetimkurulusu": `Yapı Denetim Kuruluşu ${i}`,
            "isindurumu": `İşin Durumu ${i}`,
            "kismi": `Kısmi ${i}`,
            "seviye": Math.floor(Math.random() * 10) + 1,
            "sozlesmetarihi": `Sözleşme Tarihi ${i}`,
            "kalanalanm2": Math.floor(Math.random() * 10000) + 1000,
            "yapiinsaatalanim2": Math.floor(Math.random() * 5000) + 500,
            "ilce": `İlçe ${i}`,
            "mahallekoy": `Mahalle/Köy ${i}`,
            "birimfiyat": Math.random() * 1000 + 100,
            "bksreferansno": `BKS Referans No ${i}`,
            "ruhattarihi": `Ruhsat Tarihi ${i}`,
            "yapisinifi": `Yapı Sınıfı ${i}`,
            "yapitoplamalanim2": Math.floor(Math.random() * 8000) + 2000,
            "kumeyapimi": Math.random() < 0.5 ? 'Evet' : 'Hayır',
            "eklenti": `Eklenti ${i}`,
            "sanayisitesi": `Sanayi Sitesi ${i}`,
            "guclendirme": `Güçlendirme ${i}`,
            "guclendirmeruhsat": `Güçlendirme (Ruhsat) ${i}`,
            "ges": Math.random() < 0.3 ? 'Evet' : 'Hayır',
            "issues": [] // Şantiyeye ait sorunlar buraya eklenecek
        };

        data.push(userData);
    }
    return data;
}


// Sorunlar (Issues) üretme fonksiyonu
function generateIssues(issueCount) {
    let issues = [];
    for (let i = 1; i <= issueCount; i++) {
        issues.push({
            "issueid": i, // Sorun ID
            "description": `Sorun ${i} açıklaması`
        });
    }
    return issues;
}

// Şantiyelere sorunları ilişkilendirme (Many-to-Many) fonksiyonu
function assignIssuesToSites(sites, issues) {
    let siteIssueRelation = [];
    sites.forEach(site => {
        let issueCount = Math.floor(Math.random() * issues.length); // Şantiyeye kaç sorun atanacak
        let assignedIssues = new Set();
        
        // Rastgele sorun ataması
        for (let i = 0; i < issueCount; i++) {
            let randomIssue = issues[Math.floor(Math.random() * issues.length)];
            if (!assignedIssues.has(randomIssue.issueid)) {
                site.issues.push(randomIssue.issueid); // Şantiyeye sorun ekleniyor
                siteIssueRelation.push({
                    "yibfno": site["yibfno"], // YİBF No'yu kullanarak ilişki kur
                    "issueid": randomIssue.issueid
                });
                assignedIssues.add(randomIssue.issueid); // Aynı sorunun tekrar eklenmesini önler
            }
        }
    });
    return siteIssueRelation;
}

// Kullanım örneği
let sites = generateRandomData(10); // 10 şantiye oluştur
let issues = generateIssues(5); // 5 sorun oluştur
let siteIssueRelation = assignIssuesToSites(sites, issues); // Şantiyelere sorunları ata

console.log(sites); // Şantiyeler ve atanmış sorunlar
console.log(issues); // Sorunlar listesi
console.log(siteIssueRelation); // Many-to-Many ilişkileri
