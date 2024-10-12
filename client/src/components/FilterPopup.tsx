import React, { useState } from 'react';
import { Filter, ColumnKey } from '../types';

interface FilterPopupProps {
  headers: ColumnKey[];
  localFilters: Filter[];
  handlePopupFilterChange: (header: ColumnKey, value: string, type: Filter['type']) => void;
  applyFilters: () => void;
  closePopup: () => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({ headers, localFilters, handlePopupFilterChange, applyFilters, closePopup }) => {
  const [filterValues, setFilterValues] = useState<Record<ColumnKey, { type: Filter['type']; value: string }>>(
    headers.reduce((acc, header) => {
      acc[header] = { type: 'contains', value: '' };
      return acc;
    }, {} as Record<ColumnKey, { type: Filter['type']; value: string }>)
  );

  const handleFilterChange = (header: ColumnKey, value: string, type: Filter['type']) => {
    setFilterValues(prev => ({
      ...prev,
      [header]: { type, value }
    }));
    handlePopupFilterChange(header, value, type); // Bu satırı güncelledim
  };

    // bu liste içeriği, sunucu tarafındaki içerik ile örtüşmelidir. henüz dinamiklik yok.
    const workStateOptions = [
      'Tümü',
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

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="relative bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 max-h-[80vh] flex flex-col">
          <div className="sticky top-0 bg-white mb-3 z-10">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Filtre Oluşturucu</h2>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closePopup}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
          </div>
          <hr />
          <div className="flex-1 overflow-y-auto">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-2 mb-2">
              {headers.map((header) => {
                const { type, value } = filterValues[header] || { type: 'contains', value: '' };
                return (
                  <div key={header} className="bg-gray-50 p-3 rounded border border-gray-300 shadow-sm">
                    <h3 className="font-medium mb-2 text-gray-700">{header}</h3>
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      {(() => {
                        if (header === 'Durum') {
                          return (
                            <>
                              <select
                                className="w-full h-8 px-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-blue-500"
                                value={value}
                                onChange={(e) => handleFilterChange(header, e.target.value, type)}
                              >
                                {workStateOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              <select
                                className="border border-gray-300 rounded px-2 py-1 w-full md:w-auto"
                                value={type}
                                onChange={(e) => handleFilterChange(header, value, e.target.value as Filter['type'])}
                              >
                                <option value="contains">İçeren</option>
                                <option value="not_contains">İçermeyen</option>
                                <option value="starts_with">İle başlar</option>
                                <option value="ends_with">İle biter</option>
                                <option value="equals">Eşittir</option>
                                <option value="not_equals">Eşit değil</option>
                              </select>
                            </>
                          );
                        } else if (header === 'Kısmi') {
                          return (
                            <>
                              <select
                                className="w-full h-8 px-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-blue-500"
                                value={value}
                                onChange={(e) => handleFilterChange(header, e.target.value, type)}
                              >
                                {['Tümü', 'Evet', 'Hayır'].map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              <select
                                className="border border-gray-300 rounded px-2 py-1 w-full md:w-auto"
                                value={type}
                                onChange={(e) => handleFilterChange(header, value, e.target.value as Filter['type'])}
                              >
                                <option value="contains">İçeren</option>
                                <option value="not_contains">İçermeyen</option>
                                <option value="starts_with">İle başlar</option>
                                <option value="ends_with">İle biter</option>
                                <option value="equals">Eşittir</option>
                                <option value="not_equals">Eşit değil</option>
                              </select>
                            </>
                          );
                        } else if (header === 'Sözleşme Tarihi') {
                          return (
                            <>
                              <input
                                type="date"
                                className="w-full h-8 px-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-blue-500"
                                value={value}
                                onChange={(e) => handleFilterChange(header, e.target.value, type)}
                              />
                              <select
                                className="border border-gray-300 rounded px-2 py-1 w-full md:w-auto"
                                value={type}
                                onChange={(e) => handleFilterChange(header, value, e.target.value as Filter['type'])}
                              >
                                <option value="contains">İçeren</option>
                                <option value="not_contains">İçermeyen</option>
                                <option value="starts_with">İle başlar</option>
                                <option value="ends_with">İle biter</option>
                                <option value="equals">Eşittir</option>
                                <option value="not_equals">Eşit değil</option>
                              </select>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <input
                                type="text"
                                placeholder="Değer girin..."
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                value={value}
                                onChange={(e) => handleFilterChange(header, e.target.value, type)}
                              />
                              <select
                                className="border border-gray-300 rounded px-2 py-1 w-full md:w-auto"
                                value={type}
                                onChange={(e) => handleFilterChange(header, value, e.target.value as Filter['type'])}
                              >
                                <option value="contains">İçeren</option>
                                <option value="not_contains">İçermeyen</option>
                                <option value="starts_with">İle başlar</option>
                                <option value="ends_with">İle biter</option>
                                <option value="equals">Eşittir</option>
                                <option value="not_equals">Eşit değil</option>
                              </select>
                            </>
                          );
                        }
                      })()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <hr />
          <div className="sticky bottom-0 bg-white mt-3 z-10 flex justify-end">
            <button onClick={() => {applyFilters()}} className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-cyan-600 border border-cyan-700 rounded-md shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 me-2" data-rounded="rounded-md" data-primary="cyan-600" data-primary-reset="{}">
            Filtrele
            </button>
            <button onClick={closePopup} className="px-5 py-2.5 font-medium bg-gray-50 hover:bg-gray-100 hover:text-cyan-600 text-gray-500 rounded-lg text-sm">
            İptal
            </button>
          </div>
        </div>
      </div>
    );
};

export default FilterPopup;
