import React, { useState, useEffect } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import FilterPopup from './FilterPopup';
import useWindowWidth from '../Hooks/useWindowWidth';
import useFilters from '../Hooks/useFilters';
import { Filter, ColumnKey } from '../types';

interface TableProps {
  data: any[];
  onFilterChange: (filters: Filter[]) => void;
  onSorting: (column: ColumnKey, direction: 'asc' | 'desc' | 'default') => void;
}


export const headers: ColumnKey[] = [
  "YİBF No",
  "İl",
  "İlgili İdare",
  "Ada",
  "Parsel",
  "İş Başlık",
  "Yapı Denetim Kuruluşu",
  "Durum",
  "Kısmi",
  "Seviye",
  "Sözleşme Tarihi",
  "Kalan Alan (m²)",
  "Yapı İnşaat Alanı (m²)",
  "İlçe",
  "Mahalle/Köy",
  "Birim Fiyat",
  "BKS Referans No" ,
  "Ruhsat Tarihi",
  "Yapı Sınıfı",
  "Yapı Toplam Alan (m²)",
  "Küme Yapı Mı?",
  "Eklenti",
  "Sanayii Sitesi",
  "Güçlendirme",
  "Güçlendirme (Ruhsat)",
  "GES"
]

const columnWidths = {
  "YİBF No": "w-[80px]",
  "İl": "w-[80px]",
  "İlgili İdare": "w-[115px]",
  "Ada": "w-[60px]",
  "Parsel": "w-[60px]",
  "İş Başlık": "w-[150px]",
  "Yapı Denetim Kuruluşu": "w-[170px]",
  "Durum": "w-[110px]",
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
  "Sanayii Sitesi": "w-[150px]",
  "Güçlendirme": "w-[150px]",
  "Güçlendirme (Ruhsat)": "w-[150px]",
  "GES": "w-[80px]"
};

const Table: React.FC<TableProps> = ({ data, onFilterChange, onSorting }) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [sortColumn, setSortColumn] = useState<ColumnKey | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | 'default'>('asc');

  const {
    filters,
    localFilters,
    showFilterPopup,
    setShowFilterPopup,
    handlePopupFilterChange,
    applyFilters,
    AddSelectListItemFilter,
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
    const visibleWidth = windowWidth - 50;
    const visibleCount = Math.floor(visibleWidth / (totalWidth / headers.length));
    setVisibleHeadersCount(visibleCount);
    setVisibleHeaders(headers.slice(0, visibleCount));
  }, [windowWidth, headers]);

  const handleSort = (column: ColumnKey, direction: 'asc' | 'desc' | 'default') => {
    // eğer 3. bir durum olursa burada sütunu id ye göre ayarlayacağız bu kadar.
    setSortColumn(column);
    setSortDirection(direction);
    onSorting(column, direction); // sıralama bilgilerini üst bileşene gönder.
  };

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
              <span
                key={index}
                className={`text-gray-800 px-3 py-1 rounded flex items-center ${data.length === 0 ? 'bg-red-200' : 'bg-gray-200'}`}
              >
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
            AddSelectListItemFilter={AddSelectListItemFilter}
            onSort={handleSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
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
