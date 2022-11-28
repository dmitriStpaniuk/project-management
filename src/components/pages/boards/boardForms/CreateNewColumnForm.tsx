import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { FormBoardInputText } from 'components/FormBoardInputText';
import { useTranslate } from 'components/languageContext/languageContext';
import { useAlerts } from 'components/SnackbarPanel';
import { FormProvider, useForm } from 'react-hook-form';
import { useAppDispatch } from 'store/store';
import styles from './../../login/Login.module.scss';
import { createNewColumnThunk } from 'store/thunks/columnThunk';
import { CreateColumnData } from 'services/columnServiceTypes';

type FormProps = {
  setNewColumn: (x: boolean) => void;
  id?: string;
};

const CreateNewColumnForm = ({ setNewColumn, id }: FormProps) => {
  const addAlert = useAlerts();
  const dispatch = useAppDispatch();
  const successEditBoard = useTranslate('alerts.successCreateColumn');
  const errorEditBoard = useTranslate('alerts.errorCreateColumn');
  const nameBoard = useTranslate('form.boardName');
  const submitBoardRequest = useTranslate('buttons.submit');
  const closeBoardCreateForm = useTranslate('buttons.close');
  const titleBoardCreateForm = useTranslate('buttons.editBoard');

  const methods = useForm({
    defaultValues: { title: '' },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: CreateColumnData) => {
    try {
      if (id) await dispatch(createNewColumnThunk(id, data));
      addAlert({ type: 'success', message: successEditBoard });
      setNewColumn(false);
    } catch {
      addAlert({ type: 'error', message: errorEditBoard });
    }
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
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Typography variant="h4" component="h4">
        {titleBoardCreateForm}
      </Typography>
      <FormProvider {...methods}>
        <FormBoardInputText name="title" label={nameBoard} type="text" />
      </FormProvider>

      <Button
        onClick={handleSubmit(onSubmit)}
        className={styles.formButton}
        color="info"
        variant={'contained'}
        disabled={isSubmitting}
      >
        {submitBoardRequest}
      </Button>
      <Button
        className={styles.formButton}
        onClick={() => {
          setNewColumn(false);
        }}
        variant={'outlined'}
        color="error"
      >
        {closeBoardCreateForm}
      </Button>
    </Paper>
  );
};

export default CreateNewColumnForm;
