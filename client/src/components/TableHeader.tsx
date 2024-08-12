import React from 'react';

interface TableHeaderProps {
  headers: string[];
  columnWidths: Record<string, string>;
  visibleHeaders: string[]; // Added prop for visible headers
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers, columnWidths, visibleHeaders }) => (
  <thead>
    <tr className="bg-gray-100 border-b">
      <th className={`${columnWidths["id"]} p-2 text-blue-500 hover:text-blue-700break-words`}>G</th>
      {headers.map((header, index) => (
        visibleHeaders.includes(header) && ( // Conditionally render based on visibility
          <th
            key={index}
            className={`${columnWidths[header]} p-2 text-left text-gray-600 font-semibold break-words`}
          >
            {header}
          </th>
        )
      ))}
    </tr>
  </thead>
);

export default TableHeader;
