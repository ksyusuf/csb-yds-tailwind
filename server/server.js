const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// CORS ayarları
app.use(cors());

// Rasgele veri oluşturma fonksiyonu
function generateRandomData(count) {
    let data = [];
    for (let i = 1; i <= count; i++) {
        let userData = {
            id: i,
            "No.:": `${i}`,
            "YİBF No": `Yİ${i+50}BF N${i+50}o{i+50} İBF N${i+50}`,
            "İl": `İlasdasdsad ${i}+${i}+${i}`,
            "İlgili İdare": `İlgili İdareili ili  ${i}`,
            "Ada": `Ada ${i}`,
            "Parsel": `Parsel ${i}${i}${i}`,
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

// Veri sağlayan endpoint
app.get('/api/data', (req, res) => {
    const count = parseInt(req.query.count) || 10; // Varsayılan olarak 10 veri
    const data = generateRandomData(count);
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
