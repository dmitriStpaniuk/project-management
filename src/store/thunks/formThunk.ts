import { formSlice } from 'store/slices/formSlice';
import { AppDispatch } from 'store/store';

export const addBoardFormOpenThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setAddBoard(true));
};
export const addBoardFormCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setAddBoard(false));
};
export const addFormBackgroundThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setFormBackground(true));
};
export const addFormBackgroundCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setFormBackground(false));
};
export const addConfirmDeleteBoardFormThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmDeleteBoard(true));
};
export const addConfirmDeleteBoardFormCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmDeleteBoard(false));
};
