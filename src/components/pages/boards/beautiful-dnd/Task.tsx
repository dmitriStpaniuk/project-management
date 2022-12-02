import React, { useEffect, useState } from 'react';
import styles from './Task.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import { TaskDataResponse } from 'services/taskServiceTypes';
import { BsTrash } from 'react-icons/bs';
import { TfiPencil } from 'react-icons/tfi';
import ListAllUserFromTask from '../ListAllUserFromTask';
import { useAppDispatch, useAppSelector } from 'store/store';
import { Typography } from '@mui/material';
import { updateTaskThunk } from 'store/thunks/taskThunk';

type TaskProps = {
  task: TaskDataResponse;
  index: number;
  taskId: string;
};
export default function Task({ task, index, taskId }: TaskProps) {
  const dispatch = useAppDispatch();
  const handleEdit = () => {};
  const hendleDeleteColumn = () => {};

  const [nameUser, setNameUser] = useState('');

  const allUsers = useAppSelector((state) => state.user.allUsersList);

  const currentUser = allUsers?.find((user) => user.login === nameUser);

  const taskData = {
    title: task.title,
    order: task.order,
    description: task.description,
    userId: currentUser?.id,
    boardId: task.boardId,
    columnId: task.columnId,
  };

  const userNameForTask = useAppSelector((state) => state.task.taskMain?.userId);
  console.log(taskData);

  useEffect(() => {
    if (task.boardId && task.columnId)
      dispatch(updateTaskThunk(task.boardId, task.columnId, taskId, taskData));
  }, [currentUser]);

  return (
    <>
      <Draggable draggableId={taskId} index={index}>
        {(provided, snapshot) => (
          <div
            className={!snapshot.isDragging ? styles.wrapper : styles.draggingOver}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className={styles.content_wrapper}>
              {task.title}
              <div className={styles.button_wrapper}>
                <button className={styles.taskButton} onClick={handleEdit}>
                  {<TfiPencil />}
                </button>
                <button className={styles.taskButton} onClick={hendleDeleteColumn}>
                  {<BsTrash />}
                </button>
                <ListAllUserFromTask setNameUser={setNameUser} />
              </div>
            </div>
            <div>
              <Typography>{nameUser}</Typography>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
}
