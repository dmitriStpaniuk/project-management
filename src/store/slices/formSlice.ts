import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FormInitialState = {
  formAddBoard: boolean;
  formAddColumn: boolean;
  formAddTask: boolean;
  formModal: boolean;
  confirmDeleteBoard: boolean;
  confirmEditBoard: boolean;
};
const initialState: FormInitialState = {
  formAddBoard: false,
  formAddColumn: false,
  formAddTask: false,
  formModal: false,
  confirmDeleteBoard: false,
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
    setFormModal: (state, action: PayloadAction<boolean>) => {
      state.formModal = action.payload;
    },
    setAddColumn: (state, action: PayloadAction<boolean>) => {
      state.formAddColumn = action.payload;
    },
    // setAddTask: (state, action: PayloadAction<boolean>) => {
    //   state.formAddTask = action.payload;
    // },
  },
});
