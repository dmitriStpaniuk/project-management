import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { useTranslate } from 'components/languageContext/languageContext';
import { useAlerts } from 'components/SnackbarPanel';
import { useAppDispatch } from 'store/store';
import styles from './../../login/Login.module.scss';
import { addConfirmDeleteTaskFormCloseThunk } from 'store/thunks/formThunk';
import { deleteTaskByIdThunk } from 'store/thunks/taskThunk';

type ConfirmProps = {
  taskId: string;
  boardId: string;
  columnId: string;
};

export const ConfirmTaskRemoval = ({ boardId, columnId, taskId }: ConfirmProps) => {
  console.log(taskId);
  const addAlert = useAlerts();
  const dispatch = useAppDispatch();
  const successDeleteBoard = useTranslate('alerts.successDeleteBoard');
  const errorDeleteBoard = useTranslate('alerts.errorDeleteBoard');
  const submitBoardRequest = useTranslate('buttons.submit');
  const closeBoardCreateForm = useTranslate('buttons.close');
  const titleDeleteForm = useTranslate('form.confirmDeleteBoard');

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(e);
    try {
      await dispatch(deleteTaskByIdThunk(boardId, columnId, taskId));
      addAlert({ type: 'success', message: successDeleteBoard });
      dispatch(addConfirmDeleteTaskFormCloseThunk());
    } catch {
      addAlert({ type: 'error', message: errorDeleteBoard });
    }
  };
  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addConfirmDeleteTaskFormCloseThunk());
  };
  return (
    <Paper
      style={{
        width: '50%',
        padding: '40px 20px',
        display: 'grid',
        gridRowGap: '20px',
        justifyItems: 'center',
        position: 'absolute',
        zIndex: 3,
        left: '20%',
        top: '20%',
      }}
    >
      <Typography variant="h5" component="h5" sx={{ textAlign: 'center' }}>
        {titleDeleteForm}
      </Typography>

      <Button
        onClick={handleSubmit}
        className={styles.formButton}
        color="info"
        variant={'contained'}
      >
        {submitBoardRequest}
      </Button>
      <Button
        className={styles.formButton}
        onClick={handleCancel}
        variant={'outlined'}
        color="error"
      >
        {closeBoardCreateForm}
      </Button>
    </Paper>
  );
};
