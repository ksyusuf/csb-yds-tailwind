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
    <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-h-[80vh] flex flex-col">
        <header className="flex justify-between items-center mb-4 sticky">
          <h2 className="text-xl font-semibold">
            {`Sorun Listesi (YİBF No : ${dataRow['Ana Bilgiler']['YİBF No']})`}
          </h2>
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="top-left-modal"
          onClick={() => dispatch(closeYibfErrorsPopup())}
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span className="sr-only">Close modal</span>
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
