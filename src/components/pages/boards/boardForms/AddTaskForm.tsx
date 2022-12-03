import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { FormBoardInputText } from 'components/FormBoardInputText';
import { useTranslate } from 'components/languageContext/languageContext';
import { useAlerts } from 'components/SnackbarPanel';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateBoardData } from 'services/boardServiceTypes';
import { useAppDispatch, useAppSelector } from 'store/store';
import styles from './../../login/Login.module.scss';
import { createNewTaskThunk } from 'store/thunks/taskThunk';
import { CreateTaskData } from 'services/taskServiceTypes';

type FormProps = {
  setNewTask: (x: string) => void;
  boardId?: string;
  columnId: string;
};

function isCreateTaskData(
  val: CreateTaskData | (Omit<CreateTaskData, 'userId'> & { id?: string })
): val is CreateTaskData {
  return (val as CreateTaskData).userId !== undefined;
}

export const AddTaskForm = ({ setNewTask, boardId, columnId }: FormProps) => {
  const addAlert = useAlerts();
  const dispatch = useAppDispatch();
  const successEditBoard = useTranslate('alerts.successEditBoard');
  const errorEditBoard = useTranslate('alerts.errorEditBoard');
  const nameBoard = useTranslate('form.boardName');
  const descriptionBoard = useTranslate('form.boardDescriptoon');
  const submitBoardRequest = useTranslate('buttons.submit');
  const closeBoardCreateForm = useTranslate('buttons.close');
  const titleBoardCreateForm = useTranslate('buttons.editBoard');
  // const valueInputTaskCard = useAppSelector((state) => state.task.taskMain);
  // const value = valueInputTaskCard?.find((task) => task.id === id);
  const user = useAppSelector((state) => state.user.user);

  const methods = useForm({
    defaultValues: { title: '', description: '' },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: CreateBoardData) => {
    const userData = { ...data, userId: user?.id };
    try {
      if (boardId && isCreateTaskData(userData)) {
        await dispatch(createNewTaskThunk(boardId, columnId, userData));
      }
      addAlert({ type: 'success', message: successEditBoard });
      setNewTask('');
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
        <FormBoardInputText name="description" label={descriptionBoard} type="multiline" />
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
          setNewTask('');
        }}
        variant={'outlined'}
        color="error"
      >
        {closeBoardCreateForm}
      </Button>
    </Paper>
  );
};
