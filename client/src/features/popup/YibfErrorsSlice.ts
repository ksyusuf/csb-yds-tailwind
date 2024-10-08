// /client/src/features/popup/popupSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface YibfErrorsPopupState {
  isOpen: boolean;
  dataRow: Record<string, any> | null;
}

const initialState: YibfErrorsPopupState = {
  isOpen: false,
  dataRow: null
};

export const YibfErrorsPopupSlice = createSlice({
  name: 'YibfErrorsPopup',
  initialState,
  reducers: {
    openYibfErrorsPopup: (state, action: PayloadAction<Record<string, any>[]>) => {
      state.isOpen = true;
      state.dataRow = action.payload;
    },
    closeYibfErrorsPopup: (state) => {
      state.isOpen = false;
      state.dataRow = null;
    },
  },
});

export const { openYibfErrorsPopup, closeYibfErrorsPopup } = YibfErrorsPopupSlice.actions;
export default YibfErrorsPopupSlice.reducer;
