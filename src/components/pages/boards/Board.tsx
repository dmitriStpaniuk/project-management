import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBoardById } from 'services/boardService';
import { BoardDataResponse } from 'services/boardServiceTypes';

const Board = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState<BoardDataResponse | null>(null);

  useEffect(() => {
    if (boardId) getBoardById(boardId).then(setBoard);
  }, [boardId]);
  return (
    <div>
      <div>Id: {boardId}</div>
      {JSON.stringify(board)}
    </div>
  );
};

export default Board;
import React, { useState } from 'react';
import { initialData } from './beautiful-dnd/initialData';
import Column from './beautiful-dnd/Column';
import styles from './Board.module.scss';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { TaskDataResponse } from 'services/taskServiceTypes';
import { ColumnDataResponse } from 'services/columnServiceTypes';

const Board = () => {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const start = state.columns.find((col) => col.id === source.droppableId) as ColumnDataResponse;
    const finish = state.columns.find(
      (col) => col.id === destination.droppableId
    ) as ColumnDataResponse;
    if (start === finish) {
      const column = state.columns.find(
        (col) => col.id === destination.droppableId
      ) as ColumnDataResponse;
      const draggableTask = column.tasks.find(
        (task) => task.id === draggableId
      ) as TaskDataResponse;
      const newTasks = column.tasks;
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, draggableTask);
      const newColumn = {
        ...start,
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
      return;
    }

    const startTasks = start.tasks;
    const draggableTask = startTasks[source.index];
    startTasks.splice(source.index, 1);
    const newStart = {
      ...start,
      tasks: startTasks,
    };

    const finishTasks = finish.tasks;
    finishTasks.splice(destination.index, 0, draggableTask);
    const newFinish = {
      ...finish,
      tasks: finishTasks,
    };

    const newColumns = state.columns;
    const startIndex = state.columns.findIndex((col) => col.id === start.id);
    const finishIndex = state.columns.findIndex((col) => col.id === finish.id);
    newColumns.splice(startIndex, 1, newStart);
    newColumns.splice(finishIndex, 1, newFinish);
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
            return <Column key={columnX.id} column={column} tasks={column.tasks} id={column.id} />;
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
