import React from 'react';
import styles from './Task.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import { TaskDataResponse } from 'services/taskServiceTypes';
import { BsTrash } from 'react-icons/bs';
import { TfiPencil } from 'react-icons/tfi';

type TaskProps = {
  task: TaskDataResponse;
  index: number;
  id: string;
};
export default function Task({ task, index, id }: TaskProps) {
  const handleEdit = () => {};
  const hendleDeleteColumn = () => {};
  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div
            className={!snapshot.isDragging ? styles.wrapper : styles.draggingOver}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {task.description}
            <div>
              <button className={styles.taskButton} onClick={handleEdit}>
                {<TfiPencil />}
              </button>
              <button className={styles.taskButton} onClick={hendleDeleteColumn}>
                {<BsTrash />}
              </button>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
}
