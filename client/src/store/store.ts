// /client/src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import popupReducer from '../features/popup/YibfGosterSlice';

// Store'u yapılandırın
export const store = configureStore({
  reducer: {
    popup: popupReducer,
    // Diğer reducer'larınızı buraya ekleyin
  },
});

// RootState ve AppDispatch türlerini tanımlayın
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
