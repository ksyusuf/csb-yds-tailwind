import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import { Filter } from './types'; // Tür tanım dosyasından içe aktar

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [filters, setFilters] = useState<Record<string, Filter>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filtersQuery = Object.keys(filters).length > 0 ? `&filters=${encodeURIComponent(JSON.stringify(filters))}` : '';
        const response = await fetch(`http://localhost:3001/api/data?count=10${filtersQuery}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filters]); // Filters değiştiğinde veri tekrar çekilir

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Yapı Denetim Sistemi</h1>
      <Table data={data} onFilterChange={setFilters} />
    </div>
  );
};

export default App;
