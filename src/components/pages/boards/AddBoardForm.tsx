import { Button, Paper, Typography } from '@mui/material';
import { FormBoardInputText } from 'components/FormBoardInputText';
import { useTranslate } from 'components/languageContext/languageContext';
import { useAlerts } from 'components/SnackbarPanel';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateBoardData } from 'services/boardServiceTypes';
import { useAppDispatch } from 'store/store';
import { createNewBoardThunk } from 'store/thunks/boardThunk';
import styles from './../login/Login.module.scss';

type FormProps = {
  setPopupFormAddBoard: (x: boolean) => void;
};

export const AddBoardForm = ({ setPopupFormAddBoard }: FormProps) => {
  const addAlert = useAlerts();
  const dispatch = useAppDispatch();
  const successCreateBoard = useTranslate('alerts.successCreateBoard');
  const errorCreateBoard = useTranslate('alerts.errorCreateBoard');
  const nameBoard = useTranslate('form.boardName');
  const descriptionBoard = useTranslate('form.boardDescriptoon');
  const submitBoardRequest = useTranslate('buttons.submit');
  const closeBoardCreateForm = useTranslate('buttons.close');
  const titleBoardCreateForm = useTranslate('form.titleCreateBoard');

  const methods = useForm({
    defaultValues: { title: '', description: '' },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: CreateBoardData) => {
    console.log(data);
    try {
      await dispatch(createNewBoardThunk(data));
      addAlert({ type: 'success', message: successCreateBoard });
      setPopupFormAddBoard(false);
      // navigate('/boards');
    } catch {
      addAlert({ type: 'error', message: errorCreateBoard });
    }
  };

  return (
    // <div className={styles.wrapper}>
    <Paper
      style={{
        width: '50%',
        padding: '20px',
        display: 'grid',
        gridRowGap: '20px',
        justifyItems: 'center',
        position: 'absolute',
        top: '20%',
      }}
    >
      <Typography variant="h4" component="h4">
        {titleBoardCreateForm}
      </Typography>
      <FormProvider {...methods}>
        <FormBoardInputText name="title" label={nameBoard} type="text" />
        <FormBoardInputText name="description" label={descriptionBoard} type="text" />
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
          setPopupFormAddBoard(false);
        }}
        variant={'outlined'}
        color="error"
      >
        {closeBoardCreateForm}
      </Button>
    </Paper>
    // </div>
  );
};
