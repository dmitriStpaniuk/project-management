import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import styles from './Column.module.scss';
import { ColumnDataResponse } from 'services/columnServiceTypes';
import { TaskDataResponse } from 'services/taskServiceTypes';
type ColumnProps = {
  column: ColumnDataResponse;
  tasks: TaskDataResponse[];
  type: 'TASK';
};
export default function Column({ column, tasks }: ColumnProps) {
  return (
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          className={snapshot.isDraggingOver ? styles.dragactive : styles.wrapper}
          id={column?.id}
        >
          <div className={styles.taskList} {...provided.droppableProps} ref={provided.innerRef}>
            <h3 className={styles.title}>{column?.title}</h3>
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
