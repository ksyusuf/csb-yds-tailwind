import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeIslemGecmisiPopup } from '../features/popup/IslemGecmisiSlice';
import { RootState } from '../store/store';

function Popup() {
  const dispatch = useDispatch();
  const { isOpen, dataRowYibfNo } = useSelector((state: RootState) => ({
    isOpen: state.islemGecmisiPopup.isOpen,
    dataRowYibfNo: state.islemGecmisiPopup.dataRowYibfNo,
  }));

  const [data, setData] = useState<any[]>([]); // Veri için bir state oluştur
  const [loading, setLoading] = useState(true); // Yükleniyor durumu

  useEffect(() => {
    if (!isOpen || dataRowYibfNo === null || typeof dataRowYibfNo !== 'number') return;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/data/log?log=${dataRowYibfNo}`);
        const dataIslemGecmisi = await response.json();
        setData(dataIslemGecmisi.data); // Veriyi state'e ata
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Yüklenmeyi tamamla
      }
    };

    fetchData();
  }, [isOpen, dataRowYibfNo]); // Bu parametreler değiştiğinde veri çek

  if (!isOpen) return null;

  if (loading) return <div>Yükleniyor...</div>; // Yüklenme durumu için basit bir gösterim

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {data.length > 0 ? `${data[0]['YİBF_NO']} No'lu YİBF İşlem Geçmişi` : 'YİBF Bilgisi Bulunamadı'}
          </h2>
          <button
            onClick={() => dispatch(closeIslemGecmisiPopup())}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            X
          </button>
        </div>
        <hr /><br />
        <div className="overflow-x-auto">
          {data.length > 0 ? (
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left bg-gray-200">YİBF NO</th>
                  <th className="border p-2 text-left bg-gray-200">İşlem Zamanı</th>
                  <th className="border p-2 text-left bg-gray-200">İşlem</th>
                  <th className="border p-2 text-left bg-gray-200">Denetim Elemanı</th>
                  <th className="border p-2 text-left bg-gray-200">YDK/LAB</th>
                  <th className="border p-2 text-left bg-gray-200">Gerçekleştiren</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="border p-2">{item.YİBF_NO}</td>
                    <td className="border p-2">{new Date(item["İşlem Zamanı"]).toLocaleString()}</td>
                    <td className="border p-2">{item["İşlem"]}</td>
                    <td className="border p-2">{item["Denetim Elemanı"] || '-'}</td>
                    <td className="border p-2">{item["YDK/LAB"] || '-'}</td>
                    <td className="border p-2">{item["Gerçekleştiren"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">Hiç veri bulunamadı.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Popup;
