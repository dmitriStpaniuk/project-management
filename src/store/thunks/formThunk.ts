import { formSlice } from 'store/slices/formSlice';
import { AppDispatch } from 'store/store';

export const addBoardFormOpenThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setAddBoard(true));
};
export const addBoardFormCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setAddBoard(false));
};
