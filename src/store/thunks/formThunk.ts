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
export const addConfirmDeleteTaskFormThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmDeleteTask(true));
};
export const addConfirmDeleteTaskFormCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmDeleteTask(false));
};
export const addConfirmEditBoardFormThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmEditBoard(true));
};
export const addConfirmEditBoardFormCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmEditBoard(false));
};
