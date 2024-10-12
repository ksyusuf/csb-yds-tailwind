import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeIslemGecmisiPopup } from '../features/popup/IslemGecmisiSlice';
import { RootState } from '../store/store';
import Pagination from '../components/Pagination';


function Popup() {
  const dispatch = useDispatch();
  const { isOpen, dataRowYibfNo } = useSelector((state: RootState) => ({
    isOpen: state.islemGecmisiPopup.isOpen,
    dataRowYibfNo: state.islemGecmisiPopup.dataRowYibfNo,
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
        const response = await fetch(`http://localhost:3001/api/data/log?log=${dataRowYibfNo}&page=${currentPage}&limit=${itemsPerPage}`);
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
    <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-h-[80vh] flex flex-col">
        <header className="flex justify-between items-center mb-4 sticky">
          <h2 className="text-xl font-semibold">
            {data.length > 0 ? `YİBF No: ${data[0]['YİBF_NO']}  - İşlem Tarihçesi` : 'YİBF Bilgisi Bulunamadı.'}
          </h2>
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="top-left-modal"
                onClick={() => dispatch(closeIslemGecmisiPopup())}
                >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
        </header>
        <hr />
        <div className="overflow-x-auto">
          {data.length > 0 ? (
            <table className="border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left bg-gray-200">İşlem Zamanı</th>
                  <th className="border p-2 text-left bg-gray-200 w-[200px]">İşlem</th>
                  <th className="border p-2 text-left bg-gray-200">Denetim Elemanı</th>
                  <th className="border p-2 text-left bg-gray-200 w-[120px]">YDK/LAB</th>
                  <th className="border p-2 text-left bg-gray-200">YİBF NO</th>
                  <th className="border p-2 text-left bg-gray-200">Gerçekleştiren</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="border p-2">
                      {new Date(item["İşlem Zamanı"]).toLocaleDateString("tr-TR", {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })} {new Date(item["İşlem Zamanı"]).toLocaleTimeString("tr-TR", {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      })}
                    </td>
                    <td className="border p-2 w-[200px]">{item["İşlem"]}</td>
                    <td className="border p-2">{item["Denetim Elemanı"] || '-'}</td>
                    <td className="border p-2 w-[120px]">{item["YDK/LAB"] || '-'}</td>
                    <td className="border p-2">{item.YİBF_NO}</td>
                    <td className="border p-2">{item["Gerçekleştiren"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">Hiç veri bulunamadı.</p>
          )}
        </div>
        <hr />
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
