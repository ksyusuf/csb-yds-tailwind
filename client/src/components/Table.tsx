import React from 'react';

interface TableProps {
  data: any[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th>G</th>
            {headers.map((header, index) => (
              <th key={index} className="py-2 px-4 text-left text-gray-600 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <th className="py-2 px-4 text-gray-800">G</th>
              {headers.map((header, cellIndex) => (
                <td key={cellIndex} className="py-2 px-4 text-gray-800">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
