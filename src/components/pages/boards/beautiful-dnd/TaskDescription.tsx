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
    <Box
      className={styles.taskDescWrapper}
      sx={{
        width: '50%',
        padding: '40px 20px',
        backgroundColor: '#fff',
        borderRadius: '4px',
        boxShadow:
          '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        display: 'grid',
        gridRowGap: '20px',
        justifyItems: 'center',
        position: 'absolute',
        zIndex: 5,
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
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
