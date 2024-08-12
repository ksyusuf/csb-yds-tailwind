import React from 'react';
import { Filter } from '../types';

interface FilterPopupProps {
  headers: string[];
  localFilters: Record<string, Filter>;
  handlePopupFilterChange: (header: string, value: string, type: Filter['type']) => void;
  applyFilters: () => void;
  closePopup: () => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({ headers, localFilters, handlePopupFilterChange, applyFilters, closePopup }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
    <div className="relative bg-white p-4 rounded shadow-lg w-11/12 md:w-1/2 max-h-[80vh] overflow-y-auto">
      <div className="sticky top-0 bg-white p-4 border-b z-10">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Filtreleme Seçenekleri</h2>
          <button
            className="text-gray-600 hover:text-gray-800 text-xl"
            onClick={closePopup}
          >
            &times;
          </button>
        </div>
      </div>

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
                onChange={(e) => handlePopupFilterChange(header, localFilters[header]?.value || '', e.target.value as Filter['type'])}
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

      <div className="sticky bottom-0 bg-white p-4 border-t z-10 flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={applyFilters}
        >
          Tamam
        </button>
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded"
          onClick={closePopup}
        >
          İptal
        </button>
      </div>
    </div>
  </div>
);

export default FilterPopup;
