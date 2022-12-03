import { Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import {
  addBoardFormCloseThunk,
  addConfirmDeleteBoardFormCloseThunk,
  addConfirmEditBoardFormCloseThunk,
  addFormBackgroundCloseThunk,
} from 'store/thunks/formThunk';

export default function FormBackground() {
  const dispatch = useAppDispatch();
  const formAddBoard = useAppSelector((state) => state.form.formAddBoard);
  const formAddColumn = useAppSelector((state) => state.form.formAddColumn);
  const confirmDeleteBoard = useAppSelector((state) => state.form.confirmDeleteBoard);
  const confirmEditBoard = useAppSelector((state) => state.form.confirmEditBoard);

  const closeAll = formAddBoard || formAddColumn || confirmDeleteBoard || confirmEditBoard;

  useEffect(() => {
    !closeAll ? dispatch(addFormBackgroundCloseThunk()) : null;
  }, [closeAll]);
  const close = () => {
    formAddBoard ? dispatch(addBoardFormCloseThunk()) : null;
    confirmDeleteBoard ? dispatch(addConfirmDeleteBoardFormCloseThunk()) : null;
    confirmEditBoard ? dispatch(addConfirmEditBoardFormCloseThunk()) : null;
    dispatch(addFormBackgroundCloseThunk());
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
