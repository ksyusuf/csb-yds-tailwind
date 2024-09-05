import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch , faLayerGroup, faPlug, faEllipsisVertical, faEquals, faNotEqual } from '@fortawesome/free-solid-svg-icons';

interface TableBodyProps {
  data: any[];
  headers: string[];
  expandedRows: Set<number>;
  toggleRowExpansion: (rowIndex: number) => void;
  columnWidths: Record<string, string>;
  visibleHeaders: string[];
  visibleHeadersCount: number;
}

const SettingsOptionsClass = "w-4 h-4 inline-block";
const filterOptions = [
  { text: 'İçeren', value: 'contains', icon: <FontAwesomeIcon icon={faLayerGroup} className={SettingsOptionsClass} /> },
  { text: 'İçermeyen', value: 'not_contains', icon: <FontAwesomeIcon icon={faPlug} className={SettingsOptionsClass} /> },
  { text: 'İle başlar', value: 'starts_with', icon: <FontAwesomeIcon icon={faPlug} className={SettingsOptionsClass} /> },
  { text: 'İle biter', value: 'ends_with', icon: <FontAwesomeIcon icon={faEllipsisVertical} className={SettingsOptionsClass} /> },
  { text: 'Eşittir', value: 'equals', icon: <FontAwesomeIcon icon={faEquals} className={SettingsOptionsClass} /> },
  { text: 'Eşit değil', value: 'not_equals', icon: <FontAwesomeIcon icon={faNotEqual} className={SettingsOptionsClass} /> },
];

// Varsayılan bir ikon tanımlıyoruz
const defaultIcon = <FontAwesomeIcon icon={faLayerGroup} className={SettingsOptionsClass} />;

const TableBody: React.FC<TableBodyProps> = ({ data, headers, expandedRows, toggleRowExpansion, columnWidths, visibleHeaders, visibleHeadersCount }) => {
  const [selectedFilter, setSelectedFilter] = useState<Record<string, { type: string }>>({});
  const [dropdowns, setDropdowns] = useState<Record<string, boolean>>({}); // Dropdown durumlarını yönetmek için

  // Dropdown açma-kapama fonksiyonu
  const toggleDropdown = (header: string) => {
    setDropdowns(prev => ({ ...prev, [header]: !prev[header] }));
  };

  const handleFilterChange = (header: string, option: { text: string; value: string }) => {
    setSelectedFilter(prev => ({ ...prev, [header]: { type: option.value } }));
    toggleDropdown(header); // Dropdown'ı kapat
  };

  const getSelectedIcon = (header: string) => {
    const selectedType = selectedFilter[header]?.type;
    const selectedOption = filterOptions.find(option => option.value === selectedType);
    return selectedOption ? selectedOption.icon : defaultIcon; // Eğer bir filtre seçilmemişse default icon gösterilir
  };

  let data_sliced 
  
  return (
    <tbody>
      {data.length === 0 ? (
        <tr className='bg-gray-50'>
          <td colSpan={visibleHeadersCount + 1} className="py-4 text-center text-black">
            Filtrelemeye uygun veri bulunamadı
          </td>
        </tr>
      ) : (
        data.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <tr className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
            <td className='text-center'>
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => toggleDropdown(headers[rowIndex])} // header indexine göre açılır
                >
                  {getSelectedIcon(headers[rowIndex])}
                </button>
                {dropdowns[headers[rowIndex]] && (
                  <div className="absolute bg-white shadow-md p-2">
                    {filterOptions.map((option, idx) => (
                      <div key={idx} className="p-1 hover:bg-gray-200 cursor-pointer text-left" onClick={() => handleFilterChange(headers[rowIndex], option)}>
                        {option.icon} <span className="ml-2">{option.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </td>
              <td className='text-center'>
                <button
                  type="button"
                  className={`${columnWidths["id"]} p-2 hover:text-blue-700 break-words`}
                  onClick={() => toggleRowExpansion(rowIndex)}
                >
                  {expandedRows.has(rowIndex) ? '-' : '+'}
                </button>
              </td>
              {headers.map((header, cellIndex) => (
                header !== 'İşlemler' && visibleHeaders.includes(header) && ( // "no" header'ı pas geç
                  <td
                    key={cellIndex}
                    className={`${columnWidths[header]} p-2 text-left text-gray-600 break-words`}
                  >
                    {row[header]}
                  </td>
                )
              ))}

            </tr>
            {expandedRows.has(rowIndex) && (
            <tr className="bg-gray-100">
                <td colSpan={visibleHeadersCount+1} className="py-2 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* İlk yarı */}
                    <div className="space-y-2">
                    {headers.slice(0, Math.ceil(headers.length / 2)).map((header, cellIndex) => (
                        <div key={cellIndex} className="p-2 border bg-white rounded">
                        <strong>{header}:</strong> {row[header]}
                        </div>
                    ))}
                    </div>
                    {/* İkinci yarı */}
                    <div className="space-y-2">
                    {headers.slice(Math.ceil(headers.length / 2)).map((header, cellIndex) => (
                        <div key={cellIndex + Math.ceil(headers.length / 2)} className="p-2 border bg-white rounded">
                        <strong>{header}:</strong> {row[header]}
                        </div>
                    ))}
                    </div>
                </div>
                </td>
            </tr>
            )}
          </React.Fragment>
      ))
    )}
  </tbody>
);
};

export default TableBody;
