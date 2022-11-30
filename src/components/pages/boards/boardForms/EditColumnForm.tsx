import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { FormBoardInputText } from 'components/FormBoardInputText';
import { useTranslate } from 'components/languageContext/languageContext';
import { useAlerts } from 'components/SnackbarPanel';
import { FormProvider, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/store';
import styles from './../../login/Login.module.scss';
import { updateColumnThunk } from 'store/thunks/columnThunk';
import { CreateColumnData } from 'services/columnServiceTypes';

type FormProps = {
  setEditColumnName: (x: string) => void;
  boardId?: string;
  columnId: string;
};

export const EditColumnForm = ({ setEditColumnName, boardId, columnId }: FormProps) => {
  const addAlert = useAlerts();
  const dispatch = useAppDispatch();
  const successEditBoard = useTranslate('alerts.successEditBoard');
  const errorEditBoard = useTranslate('alerts.errorEditBoard');
  const nameBoard = useTranslate('form.boardName');
  const submitBoardRequest = useTranslate('buttons.submit');
  const closeBoardCreateForm = useTranslate('buttons.close');
  const titleBoardCreateForm = useTranslate('buttons.editBoard');
  const valueInputBoardCard = useAppSelector((state) => state.board.boardData);
  const value = valueInputBoardCard?.columns.find((column) => column.id === columnId);

  const methods = useForm({
    defaultValues: { title: value?.title || '' },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (columnData: CreateColumnData) => {
    try {
      console.log(boardId, columnId, columnData);
      if (boardId) await dispatch(updateColumnThunk(boardId, columnId, columnData));
      addAlert({ type: 'success', message: successEditBoard });
      setEditColumnName('');
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
        left: '20%',
        top: '20%',
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
          setEditColumnName('');
        }}
        variant={'outlined'}
        color="error"
      >
        {closeBoardCreateForm}
      </Button>
    </Paper>
  );
};