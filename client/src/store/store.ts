// /client/src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import popupReducer from '../features/popup/YibfGosterSlice';
import islemGecmisiReducer from '../features/popup/IslemGecmisiSlice';
import YibfErrorsReducer from '../features/popup/YibfErrorsSlice';

// Store'u yapılandırın
export const store = configureStore({
  reducer: {
    YibfGosterPopup: popupReducer,
    islemGecmisiPopup: islemGecmisiReducer,
    YibfErrorsPopup: YibfErrorsReducer
    // Diğer reducer'larınızı buraya ekleyin
  },
});

// RootState ve AppDispatch türlerini tanımlayın
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
