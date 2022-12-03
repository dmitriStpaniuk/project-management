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
import { AddTaskForm } from '../boardForms/AddTaskForm';
import { EditColumnForm } from '../boardForms/EditColumnForm';

type ColumnProps = {
  column: ColumnDataResponse;
  tasks: TaskDataResponse[];
  columnId: string;
};
export default function Column({ column, tasks, columnId }: ColumnProps) {
  const newTaskText = useTranslate('buttons.newTask');
  const { boardId } = useParams();
  const [confirmDeleteColumn, setConfirmDeleteColumn] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [editColumnName, setEditColumnName] = useState('');
  // const [columnId, setColumnId] = useState('');

  const hendleDeleteColumn = (e: React.MouseEvent) => {
    e.preventDefault();
    setConfirmDeleteColumn(true);
  };

  const handleNewTask = () => {
    setNewTask('start');
  };

  const handleEdit = () => {
    setEditColumnName('start');
  };

  return (
    <div className={styles.wrapper}>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            className={snapshot.isDraggingOver ? styles.dragactive : styles.nodragactive}
            id={columnId}
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
                      id={columnId}
                    />
                  ) : null}
                </div>
              </div>
              <hr className={styles.line}></hr>
            </div>
            <div className={styles.taskList} {...provided.droppableProps} ref={provided.innerRef}>
              {[...tasks]
                .sort((a, b) => a.order - b.order)
                .map((task, index) => (
                  <Task
                    task={task}
                    index={index}
                    key={task.id}
                    taskId={task.id}
                    columnId={columnId}
                    asigneeId={task.userId}
                  />
                ))}
              {provided.placeholder}
            </div>
            <button className={styles.newTask} onClick={handleNewTask} data-title={newTaskText}>
              +
            </button>
            {newTask ? (
              <AddTaskForm setNewTask={setNewTask} boardId={boardId} columnId={columnId} />
            ) : null}
            {editColumnName ? (
              <EditColumnForm
                setEditColumnName={setEditColumnName}
                boardId={boardId}
                columnId={columnId}
                order={column.order}
              />
            ) : null}
          </div>
        )}
      </Droppable>
    </div>
  );
}
