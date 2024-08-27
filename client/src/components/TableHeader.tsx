import React, { useState, useEffect, useCallback  } from 'react';
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
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers, columnWidths, visibleHeaders, applyFilters, handlePopupFilterChange }) => {

  const [selectedFilter, setSelectedFilter] = useState<{ [key: string]: { value: string; type: Filter['type'] } }>({});
  const [dropdownVisible, setDropdownVisible] = useState<{ [key: string]: boolean }>({});
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const [filterValues, setFilterValues] = useState<Record<ColumnKey, { type: Filter['type']; value: string }>>(
    headers.reduce((acc, header) => {
      acc[header] = { type: 'contains', value: '' };
      return acc;
    }, {} as Record<ColumnKey, { type: Filter['type']; value: string }>)
  );

  const handleFilterChange = (header: ColumnKey, value: string, type: Filter['type']) => {
    console.log('Filter change:', { header, value, type });
    setFilterValues(prev => ({
      ...prev,
      [header]: { type, value }
    }));
    handlePopupFilterChange(header, value, type); // Bu satırı güncelledim
  };

  const handleFilterOptionClick = (header: ColumnKey, type: Filter['type']) => {
    handleFilterChange(header, selectedFilter[header]?.value || '', type);
    setDropdownVisible(prev => ({
      ...prev,
      [header]: false
    }));
  };

  
  const handleInputChange = useCallback((header: ColumnKey, value: string) => {
    console.log('Karakter basıldı.', header, "value:", value);

    // Clear any existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set the filter value and type in state
    setSelectedFilter(prev => ({
      ...prev,
      [header]: { value, type: prev[header]?.type || 'contains' }
    }));

    // Call the filter change handler
    handleFilterChange(header, value, selectedFilter[header]?.type || 'contains');
    console.log('Filter change üst:', { header, value });
    handlePopupFilterChange(header, value, selectedFilter[header]?.type || 'contains');
    
    // Set a new timeout for applying filters
    const timeout = setTimeout(() => {
      console.log('apply filtering.', header, value);
      applyFilters();
    }, 1000); // Debounce input changes

    setSearchTimeout(timeout);
    
  }, [searchTimeout, selectedFilter, handleFilterChange, applyFilters, handlePopupFilterChange]);
  


  const toggleDropdown = (header: ColumnKey) => {
    setDropdownVisible(prev => ({
      ...prev,
      [header]: !prev[header]
    }));
  };
  
  useEffect(() => {
    // Cleanup the timeout on component unmount or when searchTimeout changes
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]); // Dependency array ensures the cleanup runs when searchTimeout changes
  

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
      <tr className="bg-gray-100 border-b">
        <th className={`${columnWidths["id"]} p-2 text-blue-500 hover:text-blue-700 break-words`}></th>
        {headers.map((header, index) => (
          visibleHeaders.includes(header) && (
            <th
              key={index}
              className={`${columnWidths[header]} p-2 text-left text-gray-600 font-semibold break-words`}
            >
              {header}
            </th>
          )
        ))}
      </tr>
      <tr className="bg-gray-50 border-b">
        <th className={`${columnWidths["id"]} p-2`}></th>
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
                  value={selectedFilter[header]?.value || ''}
                  onChange={(e) => handleInputChange(header, e.target.value)}
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
