import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '../features/popup/YibfGosterSlice';
import { RootState } from '../store/store';

const KEYS_TO_DISPLAY = {
  "Ana Bilgiler": [
    "YİBF No",
    "Yapı Denetim",
    "Yapı Denetim Adres",
    "Yapı Denetim Telefon",
    "İdare",
    "İl",
    "Durum",
    "İş Başlık",
    "Sözleşme Tarihi",
    "Dağıtım Tarihi",
    "Ruhsat Tarihi",
    "Ruhsat No",
    "Bitirme Tarihi",
    "Ruhsat Ret Tarihi",
    "Ruhsat Ret Nedeni",
    "BKS Referans No",
    "Sanayii Sitesi"
  ],
  "Yapı Bilgileri": [
    "Taşıyıcı Sistem",
    "Ruhsat Veriliş Amacı",
    "Yapı Sınıfı",
    "Kat Adet",
    "Kısmi İnşaat",
    "Yapı Toplam Alan (m2)",
    "Yapı İnşaat Alan (m2)",
    "Kalan Alan (m2)",
    "Mahalle",
    "Yapı Adresi",
    "Cadde Sokak",
    "Köy",
    "Ada",
    "Parsel",
    "Pafta",
    "Birim Fiyat"
  ],
  "Yapı Sahibi Bilgileri": [
    "Yapı Sahibi Adı",
    "Yapı Sahibi Soyadı",
    "Yapı Sahibi Adres",
    "Yapı Sahibi Telefon",
    "Hissedar Var Mı?"
  ],
  "Sözleşme Bilgileri": [
    "Ay",
    "Sözleşme Bedel Beyan (24 Ay)",
    "Sözleşme Bedel Oranı"
  ],
  "Müteahhit Bilgileri": [
    "Müteahhit Ünvan",
    "Müteahhit Kayıt No"
  ],
  "Şantiye Şefi Bilgileri": [
    "Şantiye Şefi Ad",
    "Şantiye Şefi Soyad"
  ]
};

function Popup() {
  const dispatch = useDispatch();
  const { isOpen, dataRow } = useSelector((state: RootState) => ({
    isOpen: state.popup.isOpen,
    dataRow: state.popup.dataRow,
  }));

  if (!isOpen) return null;

  if (dataRow === null || typeof dataRow !== 'object') {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            HATA
          </h2>
          <button
            onClick={() => dispatch(closePopup())}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            X
          </button>
      </div>
      <br/>
          <h2 className="text-xl font-semibold">Popup Title</h2>
          <p>No data available</p>
          <button
            onClick={() => dispatch(closePopup())}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            X
          </button>
        </div>
      </div>
    );
  }

  // Veriyi filtrele. yibf görüntüleme kısmında görüntülenecek özelliklere göre filtrelenir.
  const filteredData = Object.entries(KEYS_TO_DISPLAY).reduce((acc, [section, keys]) => {
    const sectionData = dataRow[section as keyof typeof dataRow];
    if (sectionData) {
      const filteredDetails = keys.reduce((detailsAcc, key) => {
        detailsAcc[key] = sectionData[key] !== undefined ? sectionData[key] : '';
        return detailsAcc;
      }, {} as Record<string, any>);

      acc[section] = filteredDetails;
    }
    return acc;
  }, {} as Record<string, Record<string, any>>);

  // Find the maximum width for keys
  const maxKeyWidth = Math.max(...Object.values(KEYS_TO_DISPLAY).flat().map(key => key.length));

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {filteredData["Ana Bilgiler"]["YİBF No"]} No'lu YİBF Bilgisi
        </h2>
        <button
          onClick={() => dispatch(closePopup())}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          X
        </button>
      </div>
      <hr/><br/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(filteredData).map(([section, details]) => (
          <div key={section} className="space-y-2">
            <h3 className="text-xl">{section}</h3>
            <hr/>
            <div className="space-y-1">
              {Object.entries(details).map(([key, value]) => (
                <div key={key} className="flex">
                  <div
                    className="font-semibold"
                    style={{ minWidth: `${maxKeyWidth * 8}px`, fontSize: '0.875rem' }}
                  >
                    {key}:
                  </div>
                  <div
                    className="ml-2"
                    style={{ fontSize: '0.875rem' }}
                  >
                    {value !== '' ? value : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
        
      </div>
    </div>
  );
}

export default Popup;