import React from 'react';
import styles from './Task.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import { TaskDataResponse } from 'services/taskServiceTypes';

type TaskProps = {
  task: TaskDataResponse;
  index: number;
  id: string;
};
export default function Task({ task, index, id }: TaskProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          className={!snapshot.isDragging ? styles.wrapper : styles.draggingOver}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.description}
        </div>
      )}
    </Draggable>
  );
}
