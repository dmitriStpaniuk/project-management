import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FormInitialState = {
  formAddBoard: boolean;
  formAddColumn: boolean;
  formAddTask: boolean;
};
const initialState: FormInitialState = {
  formAddBoard: false,
  formAddColumn: false,
  formAddTask: false,
};
export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setAddBoard: (state, action: PayloadAction<boolean>) => {
      state.formAddBoard = action.payload;
    },
    setAddColumn: (state, action: PayloadAction<boolean>) => {
      state.formAddColumn = action.payload;
    },
    setAddTask: (state, action: PayloadAction<boolean>) => {
      state.formAddTask = action.payload;
    },
  },
});
