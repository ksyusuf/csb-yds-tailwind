// /client/src/features/popup/popupSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface YibfErrorsPopupState {
  isOpen: boolean;
  dataRowYibfNo: string;
}

const initialState: YibfErrorsPopupState = {
  isOpen: false,
  dataRowYibfNo: ''
};

export const YibfErrorsPopupSlice = createSlice({
  name: 'YibfErrorsPopup',
  initialState,
  reducers: {
    openYibfErrorsPopup: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.dataRowYibfNo = action.payload;
    },
    closeYibfErrorsPopup: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openYibfErrorsPopup, closeYibfErrorsPopup } = YibfErrorsPopupSlice.actions;
export default YibfErrorsPopupSlice.reducer;
