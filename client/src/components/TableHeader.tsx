import React, { useState, useCallback, useRef, useEffect } from 'react';
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
  AddSelectListItemFilter: (header: ColumnKey, value: string, type: Filter['type']) => void;
  // Sıralama işlemleri için
  onSort: (column: ColumnKey, direction: 'asc' | 'desc' | 'default') => void;
  sortColumn: ColumnKey | null;
  sortDirection: 'asc' | 'desc' | 'default';
}

const TableHeader: React.FC<TableHeaderProps> = ({
  headers,
  localFilters,
  columnWidths,
  visibleHeaders,
  handlePopupFilterChange,
  applyFilters,
  AddSelectListItemFilter,
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
    const value = filterValues[header]?.value || '';
    handleFilterChange(header, value, type);
    setDropdownVisible({
      [header]: false
    });
    setSelectedFilter({
      [header]: { value, type: type || 'contains' }
    });
    console.log(filterValues[header])
    if (value !== ''){
      AddSelectListItemFilter(header, value, type)
    }
    // console.log(selectedFilter)
    // bunu yazdırınca bir önceki filtre tipini yazıyor konsola. fakat çalışırken
    // fakat çalışırken doğru filtreleme türünü alıyor.
    // TODO: hangi sütunlar ListFilter şekline olacak ona göre bir liste oluştur ver.
  };

  // Dropdown referansları
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // Dışa tıklama kontrolü
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    // Eğer tıklanan yer dropdown'ların içi değilse kapat
    if (!Object.values(dropdownRefs.current).some(ref => ref && ref.contains(target))) {
      setDropdownVisible({});
    }
  };
  useEffect(() => {
    // mouse'un tıklama olaylarını inceler.
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
  }, [applyFilters]);

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

  const filterOptionsClass = "w-3 h-3 inline-block";
  const filterOptions = [
    { text: 'İçeren', value: 'contains' as Filter['type'], icon: <FontAwesomeIcon icon={faSearch} className={filterOptionsClass} /> },
    { text: 'İçermeyen', value: 'not_contains' as Filter['type'], icon: <FontAwesomeIcon icon={faTimes} className={filterOptionsClass} /> },
    { text: 'İle başlar', value: 'starts_with' as Filter['type'], icon: <FontAwesomeIcon icon={faArrowRight} className={filterOptionsClass} /> },
    { text: 'İle biter', value: 'ends_with' as Filter['type'], icon: <FontAwesomeIcon icon={faArrowLeft} className={filterOptionsClass} /> },
    { text: 'Eşittir', value: 'equals' as Filter['type'], icon: <FontAwesomeIcon icon={faEquals} className={filterOptionsClass} /> },
    { text: 'Eşit değil', value: 'not_equals' as Filter['type'], icon: <FontAwesomeIcon icon={faNotEqual} className={filterOptionsClass} /> },
  ];

  // bu liste içeriği, sunucu tarafındaki içerik ile örtüşmelidir. henüz dinamiklik yok.
  const workStateOptions = [
    'Tümü',
    'Ön Kayıt',
    'İdare Onayı Bekleyen (Dağıtım)',
    'Dağıtım Bekleyen',
    'Ruhsat Başvuru Bekleyen',
    'Ruhsat Bekleyen',
    'Güncel',
    'Küme Onayı Bekleyen',
    'Ruhsat Redli',
    'Ruhsat Redli (Ceza Sonucu)',
    'Ruhsat Redli (Belge Geri Alınma)',
    'Fesihli Tespitsiz',
    'Fesihli Tespitsiz (Ceza Sebebiyle)',
    'Fesihli Tespitsiz (Belge Geri Alınma)',
    'Fesihli Tespitsiz (YİAM)',
    'Fesihli Tespitli',
    'Devir Başvurusu Bekleyen (Fesihli)',
    'Devir Onayı Bekleyen (Fesihli)',
    'Dağıtım Bekleyen (Fesihli)',
    'Veri Aktarımı Bekleyen (Fesihli)',
    'Devir Başvurusu Bekleyen (Kısmi)',
    'Devir Onayı Bekleyen (Kısmi)',
    'Dağıtım Bekleyen (Kısmi)',
    'Yanan Yıkılan',
    'Ruhsat İptali',
    'YİBF İptal',
    'Kısmi Bitmiş',
    'Bitmiş',
    'Migrasyon Ham',
    'Migrasyon Ham Ruhsat',
    'Migrasyon İşlenmiş',
    'Migrasyon Fesihli Eksik Müellif',
    'Migrasyon Fesihli Eksik Ruhsat',
    'Güçlendirme İmalatı Başvuru Bekleyen',
    'Güçlendirme İmalatı Onay Bekleyen',
    'Güçlendirme İptal'
  ];

  const getSelectedIcon = (header: ColumnKey) => {
    const selectedType = selectedFilter[header]?.type;
    const selectedOption = filterOptions.find(option => option.value === selectedType);
    return selectedOption ? selectedOption.icon : <FontAwesomeIcon icon={faSearch} className="w-3 h-3 inline-block" />;
  };

  const setSelectedSelectList = (header: ColumnKey, value: string) => {
    // ayrı bir prop olarak bu filtreyi göndermeyi tercih ediyorum.
    // bu kontrolü filterPop-up için de yapmak iyi olabilir.
    AddSelectListItemFilter(header, value, 'equals' as Filter['type'])
    // alttaki ile, aktif olarak hangi filtrenin seçildiğini input list input içerisinde görüyorum.
    setInputValues(prev => ({
      ...prev,
      [header]: value
    }));
    // alttakini koymamın sebebi, listeden filtre seçtikten sonra filtre tipini değiştirdiğimde
    // aynı içeriğin filtre türünü değiştirmek.
    // bu sadece listFilter tipindeki filtrelerde olacak. çalıştı. :like:
    setFilterValues(prev => ({
      ...prev,
      [header]: { type: 'contains', value: value }
    }));
  };

  return (
    <thead>
      <tr className="bg-gray-200 border-b">
        <th
          colSpan={2}
          key="İşlemler"
          className={'w-[40px] pt-2 text-center text-gray-600 font-semibold text-sm'}
        >
          İşlem
        </th>
        {headers.map((header, index) => (
          visibleHeaders.includes(header) && (
            <th
              key={index}
              className={`${columnWidths[header]} pl-2 pt-2 text-left text-gray-600 font-semibold break-words text-sm`}
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
                  // TODO: açılan dropdown'ı table üzerinde yap. 1-2 satır olduğunda dropdown tablonun
                  // içerisinde alt kısmı görünmüyor. scroll yaparak erişiliyor. ertelendi.
                  <div className="absolute top-full text-left mt-1 bg-white border border-gray-300 rounded shadow-lg"
                  ref={el => dropdownRefs.current[header] = el}
                  // tıklanan noktanın dropdown olduğunu hafızaya alır
                    >
                    <ul className="list-none p-2 m-0">
                      {filterOptions.map((option) => (
                        <li
                          key={option.text}
                          className="p-1 hover:bg-gray-200 cursor-pointer text-sm flex items-center"
                          onClick={() => handleFilterOptionClick(header, option.value)}
                        >
                          <div>{option.icon}</div>
                          <div className='ml-2'>{option.text}</div>
                          
                          
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* KOŞULLU RENDERING */}
                {(() => {
                let sutun_genisligi_metin_esleme = parseInt(columnWidths[header].match(/(\d+)/)?.[0] || '0', 10)/10
                if (header === 'Durum') {
                  return (
                    <select
                      className="w-[72px] h-8 px-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-blue-500"
                      value={inputValues[header] || ''}
                      onChange={(e) => setSelectedSelectList(header, e.target.value)}
                    >
                      {workStateOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  );
                } else if (header === 'Kısmi') {
                  return (
                    <select
                      className="w-[30px] h-8 px-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-blue-500"
                      value={inputValues[header] || ''}
                      onChange={(e) => setSelectedSelectList(header, e.target.value)}
                    >
                      {['Tümü', 'Evet', 'Hayır'].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  );
                } else if (header === 'Sözleşme Tarihi') {
                  return (
                    <div className="flex items-center">
                      <input
                        type="date"
                        className={`w-[${sutun_genisligi_metin_esleme+50}px] h-8 px-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-blue-500`}
                        value={inputValues[header] || ''}
                        onChange={(e) => setSelectedSelectList(header, e.target.value)}
                      />
                    </div>
                  );
                  
                } else {
                  return (
                    <input
                      type="text"
                      placeholder="Ara"
                      className="w-full h-8 px-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-blue-500"
                      value={inputValues[header] || ''}
                      onChange={(e) => handleInputChange(header, e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, header)}
                    />
                  );
                }
              })()}
              </div>
            </th>
          )
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
