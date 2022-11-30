import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import styles from './Column.module.scss';
import { ColumnDataResponse } from 'services/columnServiceTypes';
import { TaskDataResponse } from 'services/taskServiceTypes';
import { height } from '@mui/system';
import { useTranslate } from 'components/languageContext/languageContext';
import { BsTrash } from 'react-icons/bs';
import { TfiPencil } from 'react-icons/tfi';
import { useParams } from 'react-router-dom';
import { deleteColumnByIdThunk } from 'store/thunks/columnThunk';
import { deleteColumnById } from 'services/columnService';
import { useAppDispatch } from 'store/store';
import { ConfirmColumnRemoval } from '../boardForms/ConfirmColumnRemoval';

type ColumnProps = {
  column: ColumnDataResponse;
  tasks: TaskDataResponse[];
  id: string;
};
export default function Column({ column, tasks, id }: ColumnProps) {
  const newTaskText = useTranslate('buttons.newTask');
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const [confirmDeleteColumn, setConfirmDeleteColumn] = useState(false);
  const hendleDelateColumn = (e: React.MouseEvent) => {
    e.preventDefault();
    setConfirmDeleteColumn(true);
  };

  const handleNewTask = () => {};
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
                  <button className={styles.columnHeaderButton}>{<TfiPencil />}</button>
                  <button className={styles.columnHeaderButton} onClick={hendleDelateColumn}>
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
