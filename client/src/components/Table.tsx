import React, { useState, useEffect } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import FilterPopup from './FilterPopup';
import useWindowWidth from '../Hooks/useWindowWidth';
import useFilters from '../Hooks/useFilters';
import { Filter, ColumnKey } from '../types';

interface TableProps {
  data: any[];
  headers: ColumnKey[];
  onFilterChange: (filters: Filter[]) => void; // Güncellenmiş filtre tipi
}

const columnWidths = {
  // Örnek sütun genişlikleri
  "id": "w-[30px]",
  "No.": "w-[40px]",
  "YİBF No": "w-[65px]",
  "İl": "w-[70px]",
  "İlgili İdare": "w-[100px]",
  "Ada": "w-[50px]",
  "Parsel": "w-[50px]",
  "İş Başlık": "w-[100px]",
  "Yapı Denetim Kuruluşu": "w-[150px]",
  "İşin Durumu": "w-[100px]",
  "Kısmi": "w-[80px]",
  "Seviye": "w-[60px]",
  "Sözleşme Tarihi": "w-[120px]",
  "Kalan Alan (m²)": "w-[120px]",
  "Yapı İnşaat Alanı (m²)": "w-[120px]",
  "İlçe": "w-[150px]",
  "Mahalle/Köy": "w-[150px]",
  "Birim Fiyat": "w-[100px]",
  "BKS Referans No": "w-[150px]",
  "Ruhsat Tarihi": "w-[120px]",
  "Yapı Sınıfı": "w-[120px]",
  "Yapı Toplam Alanı (m²)": "w-[150px]",
  "Küme Yapı Mı?": "w-[80px]",
  "Eklenti": "w-[150px]",
  "Sanayi Sitesi": "w-[150px]",
  "Güçlendirme": "w-[150px]",
  "Güçlendirme (Ruhsat)": "w-[150px]",
  "GES": "w-[80px]",
  "İşlemler": "w-[150px]"
};

const Table: React.FC<TableProps> = ({ data, headers, onFilterChange }) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const {
    filters,
    localFilters,
    showFilterPopup,
    setShowFilterPopup,
    handlePopupFilterChange,
    applyFilters,
    clearFilter
  } = useFilters(onFilterChange);

  const toggleRowExpansion = (rowIndex: number) => {
    setExpandedRows(prev => {
      const newExpandedRows = new Set(prev);
      if (newExpandedRows.has(rowIndex)) {
        newExpandedRows.delete(rowIndex);
      } else {
        newExpandedRows.add(rowIndex);
      }
      return newExpandedRows;
    });
  };

  const windowWidth = useWindowWidth();
  const [visibleHeaders, setVisibleHeaders] = useState<string[]>([]);
  const [visibleHeadersCount, setVisibleHeadersCount] = useState<number>(0);

  useEffect(() => {
    const totalWidth = Object.values(columnWidths).reduce(
      (acc, width) => acc + parseInt(width.replace('w-[', '').replace('px]', ''), 10),
      0
    );
    const visibleWidth = windowWidth - 50; // To account for padding and scroll bar
    // Hesaplanan toplam genişlik ve görünür genişlik kullanılarak sütun sayısını hesaplayın
    const visibleCount = Math.floor(visibleWidth / (totalWidth / headers.length));
    setVisibleHeadersCount(visibleCount);
    setVisibleHeaders(headers.slice(0, visibleCount));
  }, [windowWidth, headers]);
  
  const getFilterTypeLabel = (type: Filter['type']) => {
    switch (type) {
      case 'contains':
        return 'İçeren';
      case 'not_contains':
        return 'İçermeyen';
      case 'starts_with':
        return 'İle Başlar';
      case 'ends_with':
        return 'İle Biter';
      case 'equals':
        return 'Eşittir';
      case 'not_equals':
        return 'Eşit Değil';
      default:
        return 'Bilinmeyen';
    }
  };

  return (
    <>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowFilterPopup(true)}
        >
          Filtrele
        </button>
      </div>

      {showFilterPopup && (
        <FilterPopup
          headers={headers}
          localFilters={localFilters}
          handlePopupFilterChange={handlePopupFilterChange}
          applyFilters={applyFilters}
          closePopup={() => setShowFilterPopup(false)}
        />
      )}

      <div className="mb-4">
        {filters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.map((filter, index) => (
              <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded flex items-center">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => clearFilter(filter)}
                >
                  &times;
                </button>
                <span className="ml-2">
                  <strong>{filter.Column}:</strong> {filter.value} <em>({getFilterTypeLabel(filter.type)})</em>
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full table-fixed border-collapse">
          <TableHeader
            headers={headers}
            columnWidths={columnWidths}
            visibleHeaders={visibleHeaders}
            handlePopupFilterChange={handlePopupFilterChange}
            localFilters={localFilters}
            applyFilters={applyFilters}
          />
          <TableBody
            data={data}
            headers={headers}
            expandedRows={expandedRows}
            toggleRowExpansion={toggleRowExpansion}
            columnWidths={columnWidths}
            visibleHeaders={visibleHeaders}
            visibleHeadersCount={visibleHeadersCount}
          />
        </table>
      </div>
    </>
  );
};

export default Table;
