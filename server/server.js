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

    let data = [];

    for (let i = 1; i <= count; i++) {
        let userData = {
            "Ana Bilgiler": {
                "YİBF No": Math.floor(10000000 + Math.random() * 9000),
                "Yapı Denetim Kuruluşu": `Yapı Denetim Kuruluşu ${i}`,
                "Yapı Denetim Adres": `Yapı Denetim Adres ${i}`,
                "Yapı Denetim Telefon": `0${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
                "İlgili İdare": `İlgili İdareili ili  ${i}`,
                "İl": cities[Math.floor(Math.random() * cities.length)],
                "Durum": `İşin Durumu ${i}`,
                "İş Başlık": `İş Başlık ${i}+${i}+${i}`,
                "Sözleşme Tarihi": `Sözleşme Tarihi ${i}`,
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
                "Seviye": Math.floor(Math.random() * 10) + 1,
                "Kalan Alan (m²)": Math.floor(Math.random() * 10000) + 1000,
                "Yapı İnşaat Alanı (m²)": Math.floor(Math.random() * 5000) + 500,
                "İlçe": `İlçe ${i}`,
                "Mahalle/Köy": `Mahalle/Köy ${i}`,
                "Birim Fiyat": Math.random() * 1000 + 100,
                "Yapı Sınıfı": `Yapı Sınıfı ${i}`,
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



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
