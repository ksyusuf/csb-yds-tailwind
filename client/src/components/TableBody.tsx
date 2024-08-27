import React from 'react';

interface TableBodyProps {
  data: any[];
  headers: string[];
  expandedRows: Set<number>;
  toggleRowExpansion: (rowIndex: number) => void;
  columnWidths: Record<string, string>;
  visibleHeaders: string[]; // Added prop for visible headers
  visibleHeadersCount: number;
}

const TableBody: React.FC<TableBodyProps> = ({ data, headers, expandedRows, toggleRowExpansion, columnWidths, visibleHeaders, visibleHeadersCount }) => (
  <tbody>
    {data.length === 0 ? (
      <tr className='bg-gray-50'>
        <td colSpan={headers.length + 1} className="py-4 text-center text-black">
          Filtrelemeye uygun veri bulunamadı
        </td>
      </tr>
    ) : (
      data.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
            <tr className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td>
                <button
                  type="button"
                  className={`${columnWidths["id"]} p-2 hover:text-blue-700 break-words`}
                  onClick={() => toggleRowExpansion(rowIndex)}
                >
                  {expandedRows.has(rowIndex) ? '-' : '+'}
                </button>
              </td>
              {headers.map((header, cellIndex) => (
                visibleHeaders.includes(header) && ( // Conditionally render based on visibility
                  <td key={cellIndex}
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

export default TableBody;
