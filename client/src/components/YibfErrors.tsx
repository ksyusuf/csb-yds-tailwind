import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeYibfErrorsPopup } from '../features/popup/YibfErrorsSlice';
import { RootState } from '../store/store';
import Pagination from './Pagination';


function Popup() {
  const dispatch = useDispatch();
  const { isOpen, dataRowYibfNo } = useSelector((state: RootState) => ({
    isOpen: state.YibfErrorsPopup.isOpen,
    dataRowYibfNo: state.YibfErrorsPopup.dataRowYibfNo,
  }));

  const [data, setData] = useState<any[]>([]); // Veri için bir state oluştur
  const [loading, setLoading] = useState(true); // Yükleniyor durumu
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    
    if (!isOpen || dataRowYibfNo === null || typeof dataRowYibfNo !== 'number') return;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/data/yibfError?yibfError=${dataRowYibfNo}&page=${currentPage}&limit=${itemsPerPage}`);
        const dataIslemGecmisi = await response.json();
        setData(dataIslemGecmisi.data); // Veriyi state'e ata
        setTotalItems(dataIslemGecmisi.total);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Yüklenmeyi tamamla
      }
    };
    fetchData();
  }, [isOpen, dataRowYibfNo, currentPage, itemsPerPage]); // Bu parametreler değiştiğinde veri çek

  if (!isOpen) return null;

  if (loading) return <div>Yükleniyor...</div>; // Yüklenme durumu için basit bir gösterim

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-h-[80vh] overflow-y-auto">
        <header className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 shadow p-2">
          <h2 className="text-xl font-semibold">
            {data.length > 0 ? `Sorun Listesi (YİBF No : ${data[0]['YİBF_NO']})` : 'YİBF Bilgisi Bulunamadı.'}
          </h2>
          <button
            onClick={() => dispatch(closeYibfErrorsPopup())}
            className="text-gray-800 bg-gradient-to-r from-red-200 to-pink-100 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            X
          </button>
        </header>
        <hr /><br />
        <div className="overflow-x-auto">
          {data.length > 0 ? (
            <table className="border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left bg-gray-200 w-[200px]">Sorun Adı</th>
                  <th className="border p-2 text-left bg-gray-200">Sorun Başlangıç Tarihi</th>
                  <th className="border p-2 text-left bg-gray-200">Sorun Tipi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    
                    <td className="border p-2 w-[200px]">{item["Sorun Adı ve Tipi"][0]}</td>
                    <td className="border p-2">
                      {new Date(item["Sorun Başlangıç Zamanı"]).toLocaleDateString("tr-TR", {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })} {new Date(item["Sorun Başlangıç Zamanı"]).toLocaleTimeString("tr-TR", {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      })}
                    </td>
                    <td className="border p-2">{item["Sorun Adı ve Tipi"][1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">Hiç veri bulunamadı.</p>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
    </div>

  );
}

export default Popup;
