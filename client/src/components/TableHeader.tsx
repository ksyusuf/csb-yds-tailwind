import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faArrowRight, faArrowLeft, faEquals, faNotEqual } from '@fortawesome/free-solid-svg-icons';
import { Filter, ColumnKey } from '../types';

interface TableHeaderProps {
  headers: ColumnKey[];
  columnWidths: Record<string, string>;
  visibleHeaders: string[];
  localFilters: Filter[];
  handlePopupFilterChange: (header: ColumnKey, value: string, type: Filter['type']) => void;
  applyFilters: () => void;
  onSort: (column: ColumnKey, direction: 'asc' | 'desc' | 'default') => void; // Added for sorting
  sortColumn: ColumnKey | null; // Added for sorting
  sortDirection: 'asc' | 'desc' | 'default'; // Added for sorting
}

const TableHeader: React.FC<TableHeaderProps> = ({
  headers,
  localFilters,
  columnWidths,
  visibleHeaders,
  handlePopupFilterChange,
  applyFilters,
  onSort,
  sortColumn,
  sortDirection
}) => {
  const [selectedFilter, setSelectedFilter] = useState<{ [key: string]: { value: string; type: Filter['type'] } }>({});
  const [dropdownVisible, setDropdownVisible] = useState<{ [key: string]: boolean }>({});
  const [inputValues, setInputValues] = useState<Record<ColumnKey, string>>(
    headers.reduce((acc, header) => {
      acc[header] = '';
      return acc;
    }, {} as Record<ColumnKey, string>)
  );
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
    handlePopupFilterChange(header, value, type);
  };

  const handleFilterOptionClick = (header: ColumnKey, type: Filter['type']) => {
    handleFilterChange(header, filterValues[header]?.value || '', type);
    setDropdownVisible(prev => ({
      ...prev,
      [header]: false
    }));
  };

  const handleInputChange = (header: ColumnKey, value: string) => {
    setInputValues(prev => ({
      ...prev,
      [header]: value
    }));
    setSelectedFilter(prev => ({
      ...prev,
      [header]: { value, type: prev[header]?.type || 'contains' }
    }));
    handleFilterChange(header, value, filterValues[header]?.type || 'contains');
    setFilterValues(prev => ({
      ...prev,
      [header]: { type: prev[header]?.type || 'contains', value }
    }));
  };

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>, header: ColumnKey) => {
    if (e.key === 'Enter') {
      applyFilters();
      setInputValues(prev => ({
        ...prev,
        [header]: ''
      }));
      setFilterValues(prev => ({
        ...prev,
        [header]: { type: 'contains', value: '' }
      }));
    }
  }, [filterValues, handleFilterChange, applyFilters]);

  const toggleDropdown = (header: ColumnKey) => {
    setDropdownVisible(prev => ({
      ...prev,
      [header]: !prev[header]
    }));
  };

  const handleSort = (column: ColumnKey) => {
    const direction = (sortColumn === column && sortDirection === 'asc' ? 'desc' : (sortColumn === column && sortDirection === 'desc' ? 'default' : 'asc'));
    onSort(column, direction);
  };

  const filterOptionsClass = "w-3 h-3 inline-block mr-2";
  const filterOptions = [
    { text: 'İçeren', value: 'contains' as Filter['type'], icon: <FontAwesomeIcon icon={faSearch} className={filterOptionsClass} /> },
    { text: 'İçermeyen', value: 'not_contains' as Filter['type'], icon: <FontAwesomeIcon icon={faTimes} className={filterOptionsClass} /> },
    { text: 'İle başlar', value: 'starts_with' as Filter['type'], icon: <FontAwesomeIcon icon={faArrowRight} className={filterOptionsClass} /> },
    { text: 'İle biter', value: 'ends_with' as Filter['type'], icon: <FontAwesomeIcon icon={faArrowLeft} className={filterOptionsClass} /> },
    { text: 'Eşittir', value: 'equals' as Filter['type'], icon: <FontAwesomeIcon icon={faEquals} className={filterOptionsClass} /> },
    { text: 'Eşit değil', value: 'not_equals' as Filter['type'], icon: <FontAwesomeIcon icon={faNotEqual} className={filterOptionsClass} /> },
  ];
  
  const getSelectedIcon = (header: string) => {
    const selectedType = selectedFilter[header]?.type;
    const selectedOption = filterOptions.find(option => option.text.toLowerCase().replace(' ', '_') === selectedType);
    return selectedOption ? selectedOption.icon : <FontAwesomeIcon icon={faSearch} className="w-3 h-3 inline-block" />;
  };

  return (
    <thead>
      <tr className="bg-gray-200 border-b">
      <th
            colSpan={2}
            key="İşlemler"
            className={'w-[40px] text-center text-gray-600 font-semibold text-sm'}
          >
            İşlem
          </th>

        {headers.map((header, index) => (
          visibleHeaders.includes(header) && (
            <th
              key={index}
              className={`${columnWidths[header]} p-2 text-left text-gray-600 font-semibold break-words text-sm`}
            >
              <button onClick={() => handleSort(header)} className="flex items-center">
                {header}
                {sortColumn === header && (sortDirection === 'asc' ? ' ▼' : sortDirection === 'desc' ? ' ▲' : '')}
              </button>
            </th>
          )
        ))}
      </tr>
      <tr className="bg-gray-200 border-b">
        <th className='w-[20px]'></th>
        <th className='w-[10px]'></th>
        {headers.map((header, index) => (
          visibleHeaders.includes(header) && (
            <th
              key={index}
              className={`${columnWidths[header]} p-2 relative`}
            >
              <div className="flex items-center">
                <button
                  className="text-gray-600 hover:text-gray-800 mr-2"
                  onClick={() => toggleDropdown(header)}
                >
                  {getSelectedIcon(header)}
                </button>
                {dropdownVisible[header] && (
                  <div className="absolute top-full text-left w-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg">
                    <ul className="list-none p-2 m-0">
                      {filterOptions.map((option) => (
                        <li
                          key={option.text}
                          className="p-1 hover:bg-gray-200 cursor-pointer text-sm flex items-center"
                          onClick={() => handleFilterOptionClick(header, option.value)}
                        >
                          {option.icon}
                          {option.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Ara"
                  className="w-full h-8 px-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-blue-500"
                  value={inputValues[header] || ''}
                  onChange={(e) => handleInputChange(header, e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, header)}
                />
              </div>
            </th>
          )
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
