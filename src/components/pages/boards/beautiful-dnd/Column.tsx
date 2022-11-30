import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import styles from './Column.module.scss';
import { ColumnDataResponse } from 'services/columnServiceTypes';
import { TaskDataResponse } from 'services/taskServiceTypes';
import { useTranslate } from 'components/languageContext/languageContext';
import { BsTrash } from 'react-icons/bs';
import { TfiPencil } from 'react-icons/tfi';
import { useParams } from 'react-router-dom';
import { ConfirmColumnRemoval } from '../boardForms/ConfirmColumnRemoval';

type ColumnProps = {
  column: ColumnDataResponse;
  tasks: TaskDataResponse[];
  id: string;
  setEditColumnName: (x: string) => void;
  setColumnId: (x: string) => void;
};
export default function Column({ column, tasks, id, setEditColumnName, setColumnId }: ColumnProps) {
  const newTaskText = useTranslate('buttons.newTask');
  const { boardId } = useParams();
  const [confirmDeleteColumn, setConfirmDeleteColumn] = useState(false);

  const hendleDeleteColumn = (e: React.MouseEvent) => {
    e.preventDefault();
    setConfirmDeleteColumn(true);
  };

  const handleNewTask = () => {};
  const handleEdit = () => {
    setEditColumnName('start');
    setColumnId(id);
  };
  return (
    <div className={styles.wrapper}>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className={snapshot.isDraggingOver ? styles.dragactive : styles.nodragactive}
            id={id}
          >
            <div className={styles.columnHeader}>
              <div className={styles.columnHeaderContext}>
                <h3 className={styles.title}>{column.title}</h3>
                <div>
                  <button className={styles.columnHeaderButton} onClick={handleEdit}>
                    {<TfiPencil />}
                  </button>
                  <button className={styles.columnHeaderButton} onClick={hendleDeleteColumn}>
                    {<BsTrash />}
                  </button>
                  {confirmDeleteColumn ? (
                    <ConfirmColumnRemoval
                      setConfirmDeleteColumn={setConfirmDeleteColumn}
                      boardId={boardId as string}
                      id={id}
                    />
                  ) : null}
                </div>
              </div>
              <hr className={styles.line}></hr>
            </div>
            <div className={styles.taskList} {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Task task={task} index={index} key={task.id} id={task.id} />
              ))}
              {provided.placeholder}
            </div>
            <button className={styles.newTask} onClick={handleNewTask} data-title={newTaskText}>
              +
            </button>
          </div>
        )}
      </Droppable>
    </div>
  );
}
