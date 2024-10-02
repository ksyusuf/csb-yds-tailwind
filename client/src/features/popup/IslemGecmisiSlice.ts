// /client/src/features/popup/popupSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IslemGecmisiPopupState {
  isOpen: boolean;
  dataRowYibfNo: string;
}

const initialState: IslemGecmisiPopupState = {
  isOpen: false,
  dataRowYibfNo: ''
};

export const islemGecmisiSlice = createSlice({
  name: 'islemGecmisiPopup',
  initialState,
  reducers: {
    openIslemGecmisiPopup: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.dataRowYibfNo = action.payload;
    },
    closeIslemGecmisiPopup: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openIslemGecmisiPopup, closeIslemGecmisiPopup } = islemGecmisiSlice.actions;
export default islemGecmisiSlice.reducer;
