import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FormInitialState = {
  formAddBoard: boolean;
  formAddColumn: boolean;
  formAddTask: boolean;
  formBackground: boolean;
  confirmDeleteBoard: boolean;
  confirmDeleteTask: boolean;
  confirmEditBoard: boolean;
};
const initialState: FormInitialState = {
  formAddBoard: false,
  formAddColumn: false,
  formAddTask: false,
  formBackground: false,
  confirmDeleteBoard: false,
  confirmDeleteTask: false,
  confirmEditBoard: false,
};
export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setAddBoard: (state, action: PayloadAction<boolean>) => {
      state.formAddBoard = action.payload;
    },
    setConfirmEditBoard: (state, action: PayloadAction<boolean>) => {
      state.confirmEditBoard = action.payload;
    },
    setConfirmDeleteBoard: (state, action: PayloadAction<boolean>) => {
      state.confirmDeleteBoard = action.payload;
    },
    setConfirmDeleteTask: (state, action: PayloadAction<boolean>) => {
      state.confirmDeleteTask = action.payload;
    },
    setFormBackground: (state, action: PayloadAction<boolean>) => {
      state.formBackground = action.payload;
    },
  },
});
