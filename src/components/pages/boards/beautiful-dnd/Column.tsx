import React, { useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
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
import { useAppDispatch, useAppSelector } from 'store/store';
import {
  addConfirmDeleteColumnFormCloseThunk,
  addConfirmDeleteColumnFormThunk,
  addConfirmEditColumnFormCloseThunk,
  addConfirmEditColumnFormThunk,
  addTaskFormOpenThunk,
} from 'store/thunks/formThunk';

type ColumnProps = {
  column: ColumnDataResponse;
  tasks: TaskDataResponse[];
  columnId: string;
  index: number;
};
export default function Column({ column, tasks, columnId, index }: ColumnProps) {
  const dispatch = useAppDispatch();
  const newTaskText = useTranslate('buttons.newTask');
  const { boardId } = useParams();
  const [newTask, setNewTask] = useState('');
  const [editColumnName, setEditColumnName] = useState('');
  const [confirmEditColumn, setConfirmEditColumn] = useState(false);
  const [confirmDeleteColumn, setConfirmDeleteColumn] = useState(false);
  const confirmDeleteColumnInState = useAppSelector((state) => state.form.confirmDeleteColumn);
  const confirmEditColumnInState = useAppSelector((state) => state.form.confirmEditColumn);
  useEffect(() => {
    confirmDeleteColumn
      ? dispatch(addConfirmDeleteColumnFormThunk())
      : dispatch(addConfirmDeleteColumnFormCloseThunk());
  }, [confirmDeleteColumn]);
  useEffect(() => {
    !confirmDeleteColumnInState ? setConfirmDeleteColumn(false) : null;
  }, [confirmDeleteColumnInState]);
  useEffect(() => {
    confirmEditColumn
      ? dispatch(addConfirmEditColumnFormThunk())
      : dispatch(addConfirmEditColumnFormCloseThunk());
  }, [confirmEditColumn]);
  useEffect(() => {
    !confirmEditColumnInState ? setConfirmEditColumn(false) : null;
  }, [confirmEditColumnInState]);
  const formAddTask = useAppSelector((state) => state.form.formAddTask);
  const hendleDeleteColumn = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setConfirmDeleteColumn(true);
  };

  const handleNewTask = () => {
    setNewTask('start');
    dispatch(addTaskFormOpenThunk());
  };

  const handleEdit = () => {
    setEditColumnName('start');
    setConfirmEditColumn(true);
  };

  return (
    <Draggable draggableId={columnId} index={index}>
      {(provided, snapshot) => (
        <div
          className={snapshot.draggingOver ? styles.columnDraggingOver : styles.wrapper}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            className={styles.columnHeader}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
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
                    boardId={boardId as string}
                    setConfirmDeleteColumn={setConfirmDeleteColumn}
                    columnId={column.id}
                  />
                ) : null}
              </div>
            </div>
            <hr className={styles.line}></hr>
          </div>
          <Droppable droppableId={columnId} type="task">
            {(provided, snapshot) => (
              <div
                className={snapshot.isDraggingOver ? styles.dragactive : styles.nodragactive}
                id={columnId}
              >
                <div className={styles.tasksWrapper}>
                  <div
                    className={styles.taskList}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
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
                </div>
                <button className={styles.newTask} onClick={handleNewTask} data-title={newTaskText}>
                  +
                </button>
                {newTask && formAddTask ? (
                  <AddTaskForm setNewTask={setNewTask} boardId={boardId} columnId={columnId} />
                ) : null}
                {confirmEditColumn ? (
                  <EditColumnForm
                    setEditColumnName={setEditColumnName}
                    setConfirmEditColumn={setConfirmEditColumn}
                    boardId={boardId}
                    columnId={columnId}
                    order={column.order}
                  />
                ) : null}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
