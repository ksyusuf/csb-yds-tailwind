// types.d.ts

// Sütun adlarını tanımlayan bir type
// filtreleme yaparken bu çok işimize yarayacak.
export type ColumnKey = 
  | 'No.:'
  | 'YİBF No'
  | 'İl'
  | 'İlgili İdare'
  | 'Ada'
  | 'Parsel'
  | 'İş Başlık'
  | 'Yapı Denetim Kuruluşu'
  | 'İşin Durumu'
  | 'Kısmi'
  | 'Seviye'
  | 'Sözleşme Tarihi'
  | 'Kalan Alan (m²)'
  | 'Yapı İnşaat Alanı (m²)'
  | 'İlçe'
  | 'Mahalle/Köy'
  | 'Birim Fiyat'
  | 'BKS Referans No'
  | 'Ruhsat Tarihi'
  | 'Yapı Sınıfı'
  | 'Yapı Toplam Alanı (m²)'
  | 'Küme Yapı Mı?'
  | 'Eklenti'
  | 'Sanayi Sitesi'
  | 'Güçlendirme'
  | 'Güçlendirme (Ruhsat)'
  | 'GES'
  | 'İşlemler';

// Filter arayüzü
export interface Filter {
  Column: ColumnKey; // Bu alan, sütun anahtarlarını destekler
  type: 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | 'equals' | 'not_equals';
  value: string;
}
