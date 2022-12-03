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
import { useParams } from 'react-router-dom';
import { User } from 'services/userServiceTypes';
import { getUserById } from 'services/userService';

type TaskProps = {
  task: TaskDataResponse;
  index: number;
  taskId: string;
  columnId: string;
  asigneeId?: string;
};
export default function Task({ task, index, taskId, columnId, asigneeId }: TaskProps) {
  const dispatch = useAppDispatch();
  const { boardId } = useParams() as { boardId: string };
  const [selectedAsigneeId, setSelectedAsigneeId] = useState('');
  const [asignee, setAsignee] = useState<User | null>(null);

  const taskData = {
    title: task.title,
    order: task.order,
    description: task.description,
    userId: selectedAsigneeId,
    boardId: boardId,
    columnId: columnId,
  };

  useEffect(() => {
    if (boardId && columnId && selectedAsigneeId)
      dispatch(updateTaskThunk(boardId, columnId, taskId, taskData));
  }, [selectedAsigneeId]);

  useEffect(() => {
    if (asigneeId) {
      getUserById(asigneeId).then(setAsignee);
    }
  }, [asigneeId]);

  const handleEdit = () => {};

  const hendleDeleteColumn = () => {};

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
                <ListAllUserFromTask setSelectedAsigneeId={setSelectedAsigneeId} />
              </div>
            </div>
            <div>
              <Typography>{asignee?.name}</Typography>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
}
