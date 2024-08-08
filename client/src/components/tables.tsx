import React, { useState } from 'react';
import { Filter } from '../types'; // tür tanımını içe aktar

interface TableProps {
  data: any[];
  headers: string[];
  onFilterChange: (filters: Record<string, Filter>) => void;
}

const Table: React.FC<TableProps> = ({ data, headers, onFilterChange }) => {
  const [filters, setFilters] = useState<Record<string, Filter>>({});
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [localFilters, setLocalFilters] = useState<Record<string, Filter>>({});

  const handleFilterChange = (header: string, value: string, type: 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | 'equals' | 'not_equals') => {
    const newFilter: Filter = { type, value };
    const newFilters = { ...filters, [header]: newFilter };
    setFilters(newFilters);
    onFilterChange(newFilters); // Filtreleri üst bileşene gönder
  };

  const handlePopupFilterChange = (header: string, value: string, type: 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | 'equals' | 'not_equals') => {
    const newFilter: Filter = { type, value };
    const newLocalFilters = { ...localFilters, [header]: newFilter };
    setLocalFilters(newLocalFilters);
  };

  const applyFilters = () => {
    setFilters(localFilters);
    onFilterChange(localFilters); // Filtreleri üst bileşene gönder
    setShowFilterPopup(false); // Pop-up'ı kapat
  };

  const clearFilter = (header: string) => {
    const newFilters = { ...filters };
    delete newFilters[header];
    setFilters(newFilters);
    onFilterChange(newFilters); // Filtreleri üst bileşene gönder
  };

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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded shadow-lg w-11/12 md:w-1/2 max-h-[80vh] overflow-y-auto">
            {/* Pop-up başlığı ve kapatma butonu */}
            <div className="sticky top-0 bg-white p-4 border-b z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Filtreleme Seçenekleri</h2>
                <button
                  className="text-gray-600 hover:text-gray-800 text-xl"
                  onClick={() => setShowFilterPopup(false)}
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Pop-up içeriği */}
            <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2">
              {headers.map((header, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-medium mb-2">{header}</h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <input
                      type="text"
                      placeholder="Değer girin..."
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      value={localFilters[header]?.value || ''}
                      onChange={(e) => handlePopupFilterChange(header, e.target.value, localFilters[header]?.type || 'contains')}
                    />
                    <select
                      className="border border-gray-300 rounded px-2 py-1 w-full md:w-auto"
                      value={localFilters[header]?.type || 'contains'}
                      onChange={(e) => handlePopupFilterChange(header, localFilters[header]?.value || '', e.target.value as 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | 'equals' | 'not_equals')}
                    >
                      <option value="contains">İçeren</option>
                      <option value="not_contains">İçermeyen</option>
                      <option value="starts_with">İle başlar</option>
                      <option value="ends_with">İle biter</option>
                      <option value="equals">Eşittir</option>
                      <option value="not_equals">Eşit değil</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* Butonlar */}
            <div className="sticky bottom-0 bg-white p-4 border-t z-10 flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={applyFilters}
              >
                Tamam
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => setShowFilterPopup(false)}
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filtreler alanı */}
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

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left text-gray-600 font-semibold">G</th>
            {headers.map((header, index) => (
              <th key={index} className="py-2 px-4 text-left text-gray-600 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {data.length === 0 ? (
            <tr className='bg-gray-50'>
              <td colSpan={headers.length + 1} className="py-4 text-center text-black">
                Filtrelemeye uygun veri bulunamadı
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <tr className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td>
                    <button
                      type="button"
                      className="py-1 px-2 text-blue-500 hover:text-blue-700"
                      onClick={() => toggleRowExpansion(rowIndex)}
                    >
                      {expandedRows.has(rowIndex) ? '-' : '+'}
                    </button>
                  </td>
                  {headers.map((header, cellIndex) => (
                    <td key={cellIndex} className={`py-2 px-4 text-gray-800`}>
                      {row[header]}
                    </td>
                  ))}
                </tr>
                {expandedRows.has(rowIndex) && (
                  <tr className="bg-gray-100">
                    <td colSpan={headers.length + 1} className="py-2 px-4">
                      <div className="block mt-2">
                        {headers.slice().map((header, cellIndex) => (
                          <div key={cellIndex} className="mb-2">
                            <strong>{header}:</strong> {row[header]}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
