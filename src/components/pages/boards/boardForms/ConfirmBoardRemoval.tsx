import React, { useEffect } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { FormBoardInputText } from 'components/FormBoardInputText';
import { useTranslate } from 'components/languageContext/languageContext';
import { useAlerts } from 'components/SnackbarPanel';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateBoardData } from 'services/boardServiceTypes';
import { useAppDispatch, useAppSelector } from 'store/store';
import { deleteBoardByIdThunk, updateBoardThunk } from 'store/thunks/boardThunk';
import styles from './../../login/Login.module.scss';
import {
  addConfirmDeleteBoardFormCloseThunk,
  addFormBackgroundThunk,
} from 'store/thunks/formThunk';
type ConfirmProps = {
  // setConfirmDeleteBoard: (e: boolean) => void;
  id: string;
};

export const ConfirmBoardRemoval = ({ id }: ConfirmProps) => {
  const addAlert = useAlerts();
  const dispatch = useAppDispatch();
  const successDeleteBoard = useTranslate('alerts.successDeleteBoard');
  const errorDeleteBoard = useTranslate('alerts.errorDeleteBoard');
  const submitBoardRequest = useTranslate('buttons.submit');
  const closeBoardCreateForm = useTranslate('buttons.close');
  const titleDeleteForm = useTranslate('form.confirmDeleteBoard');
  useEffect(() => {
    dispatch(addFormBackgroundThunk());
  }, []);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addConfirmDeleteBoardFormCloseThunk());
    try {
      await dispatch(deleteBoardByIdThunk(id));
      addAlert({ type: 'success', message: successDeleteBoard });
    } catch {
      addAlert({ type: 'error', message: errorDeleteBoard });
    }
  };
  const handleCancel = (e: React.MouseEvent) => {
    dispatch(addConfirmDeleteBoardFormCloseThunk());
    e.preventDefault();
    // setConfirmDeleteBoard(false);
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
