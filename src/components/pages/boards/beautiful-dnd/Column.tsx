import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import styles from './Column.module.scss';
import { ColumnDataResponse } from 'services/columnServiceTypes';
import { TaskDataResponse } from 'services/taskServiceTypes';
import { height } from '@mui/system';
type ColumnProps = {
  column: ColumnDataResponse;
  tasks: TaskDataResponse[];
  id: string;
};
export default function Column({ column, tasks, id }: ColumnProps) {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div className={snapshot.isDraggingOver ? styles.dragactive : styles.wrapper} id={id}>
          <div className={styles.columnHeader}>
            <h3 className={styles.title}>{column.title}</h3>
            <hr className={styles.line}></hr>
          </div>
          <div className={styles.taskList} {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Task task={task} index={index} key={task.id} id={task.id} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
