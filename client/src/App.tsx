import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import { Filter, ColumnKey } from './types'; // Tür tanım dosyasından içe aktar
import Pagination from './components/Pagination';
import { Provider } from 'react-redux';
import { store } from './store/store';
import YibfGoster from './components/YibfGoster';
import IslemGecmisi from './components/IslemGecmisi';
import YibfErrors from './components/YibfErrors';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]); // Güncellenmiş filtre tipi
  // sayfalama için ilgili değişkenler
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // sıralama işlemleri için
  const [sortingDict, setSortingSet] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Filtreleri query string olarak dönüştür
        const filtersQuery = filters.length > 0 ? `filters=${encodeURIComponent(JSON.stringify(filters))}` : '';
        const response = await fetch(`http://localhost:3001/api/data?${filtersQuery}&page=${currentPage}&limit=${itemsPerPage}&sorting=${encodeURIComponent(JSON.stringify(sortingDict))}`);
        const result = await response.json();
        setData(result.data);
        setTotalItems(result.total);
        
        // headers ve data'yı al
        setData(result.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    // bu parametrelerden biri değiştiğinde veri tekrar çekilir.
  }, [filters, currentPage, itemsPerPage, sortingDict]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const setSorting = (column: ColumnKey, direction: 'asc' | 'desc' | 'default') => {
    const sortingDict = {"column": column, "direction": direction}
    setSortingSet(sortingDict);
  };

  return (
    <Provider store={store}>
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-300 mr-2">
          <img src="/yds-logo.png" alt="YDS" className="h-full w-full object-cover" />
        </div>
          <h1 className="text-2xl font-bold">Yapıya İlişkin Bilgi Formu Listesi</h1>
      </div>
      <Table
            data={data}
            onFilterChange={setFilters}
            onSorting={setSorting} />
      <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            />
      <YibfGoster />
      <IslemGecmisi />
      <YibfErrors />
    </div>
    </Provider>
  );
};

export default App;
