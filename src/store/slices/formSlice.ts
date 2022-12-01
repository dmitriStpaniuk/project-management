import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FormInitialState = {
  formAddBoard: boolean;
  formAddColumn: boolean;
  formAddTask: boolean;
  formBackground: boolean;
  confirmDeleteBoard: boolean;
};
const initialState: FormInitialState = {
  formAddBoard: false,
  formAddColumn: false,
  formAddTask: false,
  formBackground: false,
  confirmDeleteBoard: false,
};
export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setAddBoard: (state, action: PayloadAction<boolean>) => {
      state.formAddBoard = action.payload;
    },
    setConfirmDeleteBoard: (state, action: PayloadAction<boolean>) => {
      state.confirmDeleteBoard = action.payload;
    },
    setFormBackground: (state, action: PayloadAction<boolean>) => {
      state.formBackground = action.payload;
    },
    // setAddColumn: (state, action: PayloadAction<boolean>) => {
    //   state.formAddColumn = action.payload;
    // },
    // setAddTask: (state, action: PayloadAction<boolean>) => {
    //   state.formAddTask = action.payload;
    // },
  },
});
