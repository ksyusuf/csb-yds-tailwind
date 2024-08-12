import React, { useState, useEffect } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import FilterPopup from './FilterPopup';
import useWindowWidth from '../Hooks/useWindowWidth';
import useFilters from '../Hooks/useFilters';
import { Filter } from '../types';

interface TableProps {
  data: any[];
  headers: string[];
  onFilterChange: (filters: Record<string, Filter>) => void;
}

const columnWidths = {
  // Örnek sütun genişlikleri
  "id": "w-[50px]",
  "No.:": "w-[70px]",
  "YİBF No": "w-[150px]",
  "İl": "w-[150px]",
  "İlgili İdare": "w-[200px]",
  "Ada": "w-[100px]",
  "Parsel": "w-[120px]",
  "İş Başlık": "w-[200px]",
  "Yapı Denetim Kuruluşu": "w-[200px]",
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

  useEffect(() => {
    const totalWidth = Object.values(columnWidths).reduce((acc, width) => acc + parseInt(width.replace('px', ''), 10), 0);
    const visibleWidth = windowWidth - 50; // To account for padding and scroll bar
    const visibleCount = Math.floor(visibleWidth / 130); // Assuming average column width is 100px

    setVisibleHeaders(headers.slice(0, visibleCount));
  }, [windowWidth, headers, columnWidths]);

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
        {Object.keys(filters).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(filters).map((header) => (
              <span key={header} className="bg-gray-200 text-gray-800 px-3 py-1 rounded flex items-center">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => clearFilter(header)}
                >
                  &times;
                </button>
                <span className="ml-2">{header}: {filters[header].value} ({filters[header].type})</span>
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
            visibleHeaders={visibleHeaders} />
          <TableBody
            data={data}
            headers={headers}
            expandedRows={expandedRows}
            toggleRowExpansion={toggleRowExpansion}
            columnWidths={columnWidths}
            visibleHeaders={visibleHeaders}
          />
        </table>
      </div>
    </>
  );
};

export default Table;
