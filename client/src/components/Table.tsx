import React, { useState } from 'react';
import { Filter } from '../types'; // tür tanımını içe aktar

interface TableProps {
  data: any[];
  onFilterChange: (filters: Record<string, Filter>) => void;
}

const Table: React.FC<TableProps> = ({ data, onFilterChange }) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];
  const [filters, setFilters] = useState<Record<string, Filter>>({});

  const handleFilterChange = (header: string, value: string, type: 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | 'equals' | 'not_equals') => {
    const newFilter: Filter = { type, value };
    const newFilters = { ...filters, [header]: newFilter };
    setFilters(newFilters);
    onFilterChange(newFilters); // Filtreleri üst bileşene gönder
  };

  const handleKeyDown = (header: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Enter tuşunun formu göndermesini engelle
      const inputElement = e.target as HTMLInputElement;
      const value = inputElement.value;
      const selectElement = inputElement.previousElementSibling as HTMLSelectElement;
      const type = selectElement.value as 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | 'equals' | 'not_equals';
      handleFilterChange(header, value, type);
    }
  };

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className='py-2 px-4 text-left text-gray-600 font-semibold'>G</th>
            {headers.map((header, index) => (
              <th key={index} className={`py-2 px-4 text-left text-gray-600 font-semibold ${index > 1 ? '' : ''}`}>
                {header}
                <div className="flex items-center mt-1">
                  <select
                    className="border border-gray-300 rounded px-2 py-1 mr-2"
                    defaultValue="contains"
                  >
                    <option value="contains">İçeren</option>
                    <option value="not_contains">İçermeyen</option>
                    <option value="starts_with">İle başlar</option>
                    <option value="ends_with">İle biter</option>
                    <option value="equals">Eşittir</option>
                    <option value="not_equals">Eşit değil</option>
                  </select>
                  <input
                    type="text"
                    placeholder={`Filter ${header}`}
                    className="border border-gray-300 rounded px-2 py-1"
                    value={filters[header]?.value || ''}
                    onChange={(e) => handleFilterChange(header, e.target.value, (e.target.previousElementSibling as HTMLSelectElement).value as 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | 'equals' | 'not_equals')}
                    onKeyDown={(e) => handleKeyDown(header, e)}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <th><input type="checkbox" className='peer'></input></th>
              {headers.map((header, cellIndex) => (
                <td key={cellIndex} className={`py-2 px-4 text-gray-800 ${cellIndex > 1 ? '' : ''}`}>
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
