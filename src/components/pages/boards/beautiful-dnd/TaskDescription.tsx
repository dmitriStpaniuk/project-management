import React, { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useTranslate } from 'components/languageContext/languageContext';
import { useAlerts } from 'components/SnackbarPanel';
import { useAppDispatch, useAppSelector } from 'store/store';
import styles from './Task.module.scss';
import { deleteColumnByIdThunk } from 'store/thunks/columnThunk';
import { TaskDataResponse } from 'services/taskServiceTypes';
type TaskProps = {
  task: TaskDataResponse;
  asigneeId: string | undefined;
  setTaskDescription: (e: boolean) => void;
};

export const TaskDescription = ({ task, asigneeId, setTaskDescription }: TaskProps) => {
  const users = useAppSelector((state) => state.user.allUsersList);
  const user = users?.find((user) => user.id === asigneeId);
  const closeTaskDescription = () => {
    setTaskDescription(false);
  };
  return (
    <Box className={styles.taskDescWrapper}>
      <Box className={styles.taskDescContent}>
        <Box>
          <Typography component="p" sx={{ textAlign: 'left' }}>
            Title:
          </Typography>

          <Typography component="p" sx={{ textAlign: 'left' }}>
            Description:
          </Typography>
          <Typography component="p" sx={{ textAlign: 'left' }}>
            Name
          </Typography>
          <Typography component="p" sx={{ textAlign: 'left' }}>
            Login
          </Typography>
        </Box>
        <Box>
          <Typography component="p" sx={{ textAlign: 'left' }}>
            {task.title}
          </Typography>
          <Typography component="p" sx={{ textAlign: 'left' }}>
            {task.description}
          </Typography>
          <Typography component="p" sx={{ textAlign: 'left' }}>
            {user?.name}
          </Typography>
          <Typography component="p" sx={{ textAlign: 'left' }}>
            {user?.login}
          </Typography>
        </Box>
      </Box>
      <Button
        className={styles.formButton}
        onClick={closeTaskDescription}
        variant={'outlined'}
        color="error"
      >
        Close
      </Button>
    </Box>
  );
};
