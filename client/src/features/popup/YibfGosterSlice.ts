// /client/src/features/popup/popupSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
  isOpen: boolean;
  dataRow: any[] | null;
}

const initialState: PopupState = {
  isOpen: false,
  dataRow: null
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openPopup: (state, action: PayloadAction<any[]>) => {
      state.isOpen = true;
      state.dataRow = action.payload;
    },
    closePopup: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
