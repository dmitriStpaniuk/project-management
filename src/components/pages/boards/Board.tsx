import React, { useState } from 'react';
import { initialData } from './beautiful-dnd/initialData';
import Column from './beautiful-dnd/Column';
import styles from './Board.module.scss';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { TaskDataResponse } from 'services/taskServiceTypes';
import { ColumnDataResponse } from 'services/columnServiceTypes';

const Board = () => {
  // const state = initialData;
  const [state, setState] = useState(initialData);
  const [task, setTask] = useState<TaskDataResponse>();
  const [tasks, setTasks] = useState<Array<TaskDataResponse>>([]);
  const [CompletedTasks, setCompletedTasks] = useState<TaskDataResponse[]>([]);
  const handleTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      setTasks([...tasks, task]);
      setTask(undefined);
    }
  };
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const column = state.columns.find(
      (col) => col.id === destination.droppableId
    ) as ColumnDataResponse;
    const draggableTask = column.tasks.find((task) => task.id === draggableId) as TaskDataResponse;
    const newTasks = column.tasks;
    newTasks.splice(source.index, 1) as TaskDataResponse[];
    newTasks.splice(destination.index, 0, draggableTask);

    const newColumn = {
      ...column,
      tasks: newTasks,
    };
    const newColumns = state.columns;
    newColumns.splice(
      state.columns.findIndex((col) => col.id === newColumn.id),
      1,
      newColumn as ColumnDataResponse
    );
    const newState = {
      ...state,
      columns: newColumns,
    };
    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.board}>
        <div className={styles.wrapper}>
          {state.columns.map((columnX) => {
            const column = state.columns.find((col) => col.id === columnX.id) as ColumnDataResponse;
            return <Column key={columnX.id} column={column} tasks={column?.tasks} type="TASK" />;
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
