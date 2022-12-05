import { Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import {
  addBoardFormCloseThunk,
  addColumnFormCloseThunk,
  addConfirmDeleteBoardFormCloseThunk,
  addConfirmEditBoardFormCloseThunk,
  addFormModalCloseThunk,
  addFormModalThunk,
} from 'store/thunks/formThunk';

export default function FormModal() {
  const dispatch = useAppDispatch();
  const formAddBoard = useAppSelector((state) => state.form.formAddBoard);
  const formAddColumn = useAppSelector((state) => state.form.formAddColumn);
  const formAddTask = useAppSelector((state) => state.form.formAddTask);
  const confirmDeleteBoard = useAppSelector((state) => state.form.confirmDeleteBoard);
  const confirmEditBoard = useAppSelector((state) => state.form.confirmEditBoard);

  const openAll =
    formAddBoard || formAddColumn || confirmDeleteBoard || confirmEditBoard || formAddTask;

  useEffect(() => {
    openAll ? dispatch(addFormModalThunk()) : dispatch(addFormModalCloseThunk());
  }, [openAll]);
  const close = () => {
    formAddBoard ? dispatch(addBoardFormCloseThunk()) : null;
    formAddColumn ? dispatch(addColumnFormCloseThunk()) : null;
    confirmDeleteBoard ? dispatch(addConfirmDeleteBoardFormCloseThunk()) : null;
    confirmEditBoard ? dispatch(addConfirmEditBoardFormCloseThunk()) : null;
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
