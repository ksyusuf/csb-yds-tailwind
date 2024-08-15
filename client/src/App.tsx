import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import { Filter } from './types'; // Tür tanım dosyasından içe aktar

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]); // Güncellenmiş filtre tipi

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Filtreleri query string olarak dönüştür
        const filtersQuery = filters.length > 0 ? `&filters=${encodeURIComponent(JSON.stringify(filters))}` : '';
        console.log(filters);
        const response = await fetch(`http://localhost:3001/api/data?count=10${filtersQuery}`);
        const result = await response.json();
        
        // headers ve data'yı al
        setHeaders(result.headers || []);
        setData(result.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filters]); // Filters değiştiğinde veri tekrar çekilir

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Yapı Denetim Sistemi</h1>
      <Table data={data} headers={headers} onFilterChange={setFilters} />
    </div>
  );
};

export default App;
