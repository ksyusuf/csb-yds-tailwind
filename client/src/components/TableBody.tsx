import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faBarsStaggered, faCalendarDays, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { openPopup } from '../features/popup/YibfGosterSlice';
import { openIslemGecmisiPopup } from '../features/popup/IslemGecmisiSlice';

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
const rowOptions = [
  { text: 'YİBF Göster', value: 'show_yibf', icon: <FontAwesomeIcon icon={faBarsStaggered} className={SettingsOptionsClass} /> },
  { text: 'İşlem Tarihçesi', value: 'row_logging', icon: <FontAwesomeIcon icon={faCalendarDays} className={SettingsOptionsClass} /> },
  { text: 'Sorun Göster', value: 'show_error', icon: <FontAwesomeIcon icon={faTriangleExclamation} className={SettingsOptionsClass} /> }
];

// Varsayılan bir ikon tanımlıyoruz
const defaultIcon = <FontAwesomeIcon icon={faLayerGroup} className={SettingsOptionsClass} />;

const TableBody: React.FC<TableBodyProps> = ({
  data, headers, expandedRows, toggleRowExpansion, columnWidths, visibleHeaders, visibleHeadersCount
}) => {
  const [selectedFilter] = useState<Record<string, { type: string }>>({});
  const [dropdowns, setDropdowns] = useState<Record<string, boolean>>({});
  const dispatch = useDispatch();
  
  // Dropdown referansları
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Dışa tıklama kontrolü
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    // Eğer tıklanan yer dropdown'ların içi değilse kapat
    if (!Object.values(dropdownRefs.current).some(ref => ref && ref.contains(target))) {
      setDropdowns({});
    }
  };

  useEffect(() => {
    // mouse'un tıklama olaylarını inceler.
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Dropdown açma-kapama fonksiyonu
  const toggleDropdown = (header: string) => {
    setDropdowns(prev => ({ ...prev, [header]: !prev[header] }));
  };

  const handleSettingsChange = (row: any[], option: { text: string, value: string }, header: string) => {
    if (option.value === "show_yibf") {
      dispatch(openPopup(row));
    }else if (option.value === 'row_logging'){
      // gelen satır bilgisinde YİBF No'ya erişebilmek için tür dönüşümü yapıp öyle erişiyorum.
      const rowJSON = row as Record<string, any>; // İlk öğeyi nesne olarak alıyoruz
      const rowYibfNo = rowJSON['Ana Bilgiler']['YİBF No'];
      dispatch(openIslemGecmisiPopup(rowYibfNo));
    }
    // buraya diğer işlemler de eklenecek.
    toggleDropdown(header);
  };

  function getValueForHeader(json: any, header: string) {
    // ilgili header değerinin gelen veri json içerisindeki değerini bulur getirir.
    let value = "";
    for (const section in json) {
      
      if (json[section][header] !== undefined) {
        value = json[section][header];
        break;
      }
    }
    return value;
  }

  const setSelectProccessPopup = (header: string) => {
    const selectedType = selectedFilter[header]?.type;
    const selectedOption = rowOptions.find(option => option.value === selectedType);
    return selectedOption ? selectedOption.icon : defaultIcon;
  };

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
            <tr className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
            <td className='text-center'>
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => toggleDropdown(headers[rowIndex])} // header indexine göre açılır
                >
                  {setSelectProccessPopup(headers[rowIndex])}
                </button>
                {dropdowns[headers[rowIndex]] && (
                  <div
                    ref={el => dropdownRefs.current[headers[rowIndex]] = el}
                    // tıklanan noktanın dropdown olduğunu hafızaya alır
                    className="absolute bg-white shadow-md p-2 mt-2 bg-white border border-gray-300 rounded shadow-lg"
                  >
                    {rowOptions.map((option, idx) => (
                      <div
                        key={idx}
                        className="p-1 hover:bg-gray-200 cursor-pointer text-left"
                        onClick={() => handleSettingsChange(row, option, headers[rowIndex])}
                      >
                        {option.icon} <span className="ml-2">{option.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </td>
              <td className='text-center'>
                <button
                  type="button"
                  className='hover:text-blue-700'
                  onClick={() => toggleRowExpansion(rowIndex)}
                >
                  {expandedRows.has(rowIndex) ? '-' : '+'}
                </button>
              </td>
              {headers.map((header, cellIndex) => (
                visibleHeaders.includes(header) && ( // "no" header'ı pas geç
                  <td
                    key={cellIndex}
                    className={`${columnWidths[header]} p-2 text-left text-gray-600 break-words`}
                  >
                    {getValueForHeader(row, headers[cellIndex])}
                  </td>
                )
              ))}

            </tr>
            {expandedRows.has(rowIndex) && (
            <tr className="bg-gray-100">
                <td colSpan={visibleHeadersCount+2} className="py-2 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* İlk yarı */}
                    <div className="space-y-2">
                    {headers.slice(0, Math.ceil(headers.length / 2)).map((header, cellIndex) => (
                        <div key={cellIndex} className="p-2 border bg-white rounded">
                        <strong>{header}:</strong> {getValueForHeader(row, headers[cellIndex])}
                        </div>
                    ))}
                    </div>
                    {/* İkinci yarı */}
                    <div className="space-y-2">
                    {headers.slice(Math.ceil(headers.length / 2)).map((header, cellIndex) => (
                        <div key={cellIndex + Math.ceil(headers.length / 2)} className="p-2 border bg-white rounded">
                        <strong>{header}:</strong> {getValueForHeader(row, headers[cellIndex + Math.ceil(headers.length / 2)])}
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
