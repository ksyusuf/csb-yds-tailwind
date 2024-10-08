import { useDispatch, useSelector } from 'react-redux';
import { closeYibfErrorsPopup } from '../features/popup/YibfErrorsSlice';
import { RootState } from '../store/store';

function Popup() {
  const dispatch = useDispatch();
  const { isOpen, dataRow } = useSelector((state: RootState) => ({
    isOpen: state.YibfErrorsPopup.isOpen,
    dataRow: state.YibfErrorsPopup.dataRow,
  }));

  if (!isOpen || !dataRow) return null;

  let sorunlar = dataRow['YIBF-Errors'] as Record<string, any>;
  
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-h-[80vh] overflow-y-auto">
        <header className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 shadow p-2">
          <h2 className="text-xl font-semibold">
            {`Sorun Listesi (YİBF No : ${dataRow['Ana Bilgiler']['YİBF No']})`}
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
          {dataRow ? (
            <table className="border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left bg-gray-200 w-[200px]">Sorun Adı</th>
                  <th className="border p-2 text-left bg-gray-200">Sorun Başlangıç Tarihi</th>
                  <th className="border p-2 text-left bg-gray-200">Sorun Tipi</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(sorunlar) ? (
                  sorunlar.map((item, index) => (
                    <tr key={index}>
                      <td className="border p-2 w-[200px]">{(item as any)["Sorun Adı ve Tipi"][0]}</td>
                      <td className="border p-2">
                        {new Date((item as any)["Sorun Başlangıç Zamanı"]).toLocaleDateString("tr-TR", {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })} {new Date((item as any)["Sorun Başlangıç Zamanı"]).toLocaleTimeString("tr-TR", {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false
                        })}
                      </td>
                      <td className="border p-2">{(item as any)["Sorun Adı ve Tipi"][1]}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="border p-2 text-center">Hiç veri bulunamadı.</td>
                  </tr>
                )}
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
