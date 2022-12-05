import { Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import {
  addBoardFormCloseThunk,
  addColumnFormCloseThunk,
  addConfirmDeleteBoardFormCloseThunk,
  addConfirmDeleteColumnFormCloseThunk,
  addConfirmEditBoardFormCloseThunk,
  addConfirmEditColumnFormCloseThunk,
  addFormModalCloseThunk,
  addFormModalThunk,
} from 'store/thunks/formThunk';

export default function FormModal() {
  const dispatch = useAppDispatch();
  const formAddBoard = useAppSelector((state) => state.form.formAddBoard);
  const confirmDeleteBoard = useAppSelector((state) => state.form.confirmDeleteBoard);
  const confirmEditBoard = useAppSelector((state) => state.form.confirmEditBoard);
  const confirmDeleteColumn = useAppSelector((state) => state.form.confirmDeleteColumn);
  const confirmEditColumn = useAppSelector((state) => state.form.confirmEditColumn);
  const formAddColumn = useAppSelector((state) => state.form.formAddColumn);
  const formAddTask = useAppSelector((state) => state.form.formAddTask);

  const openModal =
    formAddBoard ||
    formAddColumn ||
    confirmDeleteBoard ||
    confirmEditBoard ||
    formAddTask ||
    confirmDeleteColumn ||
    confirmEditColumn;
  // console.log(openModal);
  //   //   console.log(confirmEditBoard);
  useEffect(() => {
    openModal ? dispatch(addFormModalThunk()) : dispatch(addFormModalCloseThunk());
  }, [openModal]);
  const close = () => {
    formAddBoard ? dispatch(addBoardFormCloseThunk()) : null;
    confirmDeleteBoard ? dispatch(addConfirmDeleteBoardFormCloseThunk()) : null;
    confirmEditBoard ? dispatch(addConfirmEditBoardFormCloseThunk()) : null;
    formAddColumn ? dispatch(addColumnFormCloseThunk()) : null;
    confirmDeleteColumn ? dispatch(addConfirmDeleteColumnFormCloseThunk()) : null;
    confirmEditColumn ? dispatch(addConfirmEditColumnFormCloseThunk()) : null;

    dispatch(addFormModalCloseThunk());
  };
  return (
    <Paper
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#0000009e',
        position: 'absolute',
        zIndex: 2,
      }}
      onClick={close}
    />
  );
}
