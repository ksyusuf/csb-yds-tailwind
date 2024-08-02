import React, { useEffect, useState } from 'react';
import Table from './components/Table';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Veri çekme
        const response = await fetch('http://localhost:3001/api/data?count=10'); // 10 örnek veri al
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Yapı Denetim Sistemi</h1>
      <Table data={data} />
    </div>
  );
};

export default App;
