import React, { useState } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { FormBoardInputText } from 'components/FormBoardInputText';
import { useTranslate } from 'components/languageContext/languageContext';
import { useAlerts } from 'components/SnackbarPanel';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateBoardData } from 'services/boardServiceTypes';
import { useAppDispatch } from 'store/store';
import { updateBoardThunk } from 'store/thunks/boardThunk';
import styles from './../../login/Login.module.scss';
type ConfirmProps = {
  setConfirmDeleteBoard: (e: boolean) => void;
};

export const ConfirmBoardRemoval = ({ setConfirmDeleteBoard }: ConfirmProps) => {
  const addAlert = useAlerts();
  const dispatch = useAppDispatch();
  const successEditBoard = useTranslate('alerts.successEditBoard');
  const errorEditBoard = useTranslate('alerts.errorEditBoard');
  const nameBoard = useTranslate('form.boardName');
  const descriptionBoard = useTranslate('form.boardDescriptoon');
  const submitBoardRequest = useTranslate('buttons.submit');
  const closeBoardCreateForm = useTranslate('buttons.close');
  const titleDeleteForm = useTranslate('form.confirmDelete');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    setConfirmDeleteBoard(false);
  };
  return (
    <Paper
      style={{
        width: '50%',
        padding: '20px',
        display: 'grid',
        gridRowGap: '20px',
        justifyItems: 'center',
        position: 'absolute',
        zIndex: 5,
        left: '20%',
        top: '20%',
      }}
    >
      <Typography variant="h4" component="h4">
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
