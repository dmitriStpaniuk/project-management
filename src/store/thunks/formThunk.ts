import { formSlice } from 'store/slices/formSlice';
import { AppDispatch } from 'store/store';

export const addBoardFormOpenThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setAddBoard(true));
};
export const addBoardFormCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setAddBoard(false));
};
export const addColumnFormOpenThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setAddColumn(true));
};
export const addColumnFormCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setAddColumn(false));
};
export const addFormModalThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setFormModal(true));
};
export const addFormModalCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setFormModal(false));
};
export const addConfirmDeleteBoardFormThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmDeleteBoard(true));
};
export const addConfirmDeleteBoardFormCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmDeleteBoard(false));
};
export const addConfirmEditBoardFormThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmEditBoard(true));
};
export const addConfirmEditBoardFormCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmEditBoard(false));
};
