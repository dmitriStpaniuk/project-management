import React, { useState } from 'react';
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

type ColumnProps = {
  column: ColumnDataResponse;
  tasks: TaskDataResponse[];
  columnId: string;
  index: number;
};
export default function Column({ column, tasks, columnId, index }: ColumnProps) {
  const newTaskText = useTranslate('buttons.newTask');
  const { boardId } = useParams();
  const [confirmDeleteColumn, setConfirmDeleteColumn] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [editColumnName, setEditColumnName] = useState('');

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
    <Draggable draggableId={columnId} index={index}>
      {(provided) => (
        <div className={styles.wrapper} {...provided.draggableProps} ref={provided.innerRef}>
          <div className={styles.columnHeader} {...provided.dragHandleProps}>
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
      )}
    </Draggable>
  );
}
