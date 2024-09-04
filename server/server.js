const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// CORS ayarları
app.use(cors());
app.use(express.json()); // JSON verileri işlemek için

// Rasgele veri oluşturma fonksiyonu
function generateRandomData(count) {
    let data = [];
    for (let i = 1; i <= count; i++) {
        let userData = {
            id: i,
            "No.": `${i}`,
            "YİBF No": Math.floor(10000000 + Math.random() * 9000), // 8 haneli sayı
            "İl": [
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
            ][Math.floor(Math.random() * [
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
            ].length)],
            "İlgili İdare": `İlgili İdareili ili  ${i}`,
            "Ada": Math.floor(1000 + Math.random() * 9000), // 4 haneli sayı
            "Parsel": Math.floor(10 + Math.random() * 90), // 2 haneli sayı
            "İş Başlık": `İş Başlık ${i}+${i}+${i}`,
            "Yapı Denetim Kuruluşu": `Yapı Denetim Kuruluşu ${i}`,
            "İşin Durumu": `İşin Durumu ${i}`,
            "Kısmi": `Kısmi ${i}`,
            "Seviye": Math.floor(Math.random() * 10) + 1,
            "Sözleşme Tarihi": `Sözleşme Tarihi ${i}`,
            "Kalan Alan (m²)": Math.floor(Math.random() * 10000) + 1000,
            "Yapı İnşaat Alanı (m²)": Math.floor(Math.random() * 5000) + 500,
            "İlçe": `İlçe ${i}`,
            "Mahalle/Köy": `Mahalle/Köy ${i}`,
            "Birim Fiyat": Math.random() * 1000 + 100,
            "BKS Referans No": `BKS Referans No ${i}`,
            "Ruhsat Tarihi": `Ruhsat Tarihi ${i}`,
            "Yapı Sınıfı": `Yapı Sınıfı ${i}`,
            "Yapı Toplam Alanı (m²)": Math.floor(Math.random() * 8000) + 2000,
            "Küme Yapı Mı?": Math.random() < 0.5 ? 'Evet' : 'Hayır',
            "Eklenti": `Eklenti ${i}`,
            "Sanayi Sitesi": `Sanayi Sitesi ${i}`,
            "Güçlendirme": `Güçlendirme ${i}`,
            "Güçlendirme (Ruhsat)": `Güçlendirme (Ruhsat) ${i}`,
            "GES": Math.random() < 0.3 ? 'Evet' : 'Hayır',
            "İşlemler": `İşlem ${i}`
        };

        data.push(userData);
    }
    return data;
}

const data = generateRandomData(65);

// Filtreleme işlemi için veri sağlayan endpoint
app.get('/api/data', (req, res) => {
    const count = parseInt(req.query.count) || 10; // Varsayılan olarak 10 veri
    const filters = req.query.filters ? JSON.parse(req.query.filters) : [];

    let filteredData = data;

    // Filtreleri her biri için uygulama
    if (filters.length > 0) {
        filteredData = data.filter(item => {
            return filters.every(filter => {
                const value = item[filter.Column] ? item[filter.Column].toString().toLowerCase() : '';
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
    }

    // sayfalama yapmdan önce gelen veriyi isteğe göre sıralayalım.
    const sortColumn = JSON.parse(req.query.sorting)['column'];
    const sortDirection = JSON.parse(req.query.sorting)['direction'];

    function Sorting(data, sortColumn, sortDirection){
        if (!sortColumn) return data;
        if (sortDirection === 'default') return data; // sorting default ise sıralama iptal.
    
        const sorted = [...data].sort((a, b) => {
          const aValue = a[sortColumn];
          const bValue = b[sortColumn];
          if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
          return 0;
        });
    
        return sorted;
    };

    if( sortColumn != null ){
        // eğer sıralama isteği varsa sıralayacak
        filteredData = Sorting(filteredData, sortColumn, sortDirection);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    filteredDataSliced = filteredData.slice(startIndex, endIndex);

    // Başlıkları belirle
    const headers = Object.keys(data[0] || {});
    
    // Yanıtı gönder
    res.json({
        headers: headers,
        data: filteredDataSliced,
        total: filteredData.length
    });
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
