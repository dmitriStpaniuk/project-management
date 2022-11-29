import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBoardById } from 'services/boardService';
import Column from './beautiful-dnd/Column';
import styles from './Board.module.scss';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { TaskDataResponse } from 'services/taskServiceTypes';
import { ColumnDataResponse } from 'services/columnServiceTypes';
import { useTranslate } from 'components/languageContext/languageContext';
import { Container } from '@mui/system';
import CreateNewColumnForm from './boardForms/CreateNewColumnForm';
import { useAppDispatch, useAppSelector } from 'store/store';
import { BoardDataResponse } from 'services/boardServiceTypes';
import { getBoardByIdThunk, updateBoard } from 'store/thunks/boardThunk';
import { useDispatch } from 'react-redux';

const Board = () => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const [newColumn, setNewColumn] = useState(false);
  // const boardFetching = useAppSelector((state) => state.board);
  const board = useAppSelector((state) => state.board.boardData);
  const columns = useAppSelector((state) => state.column);

  useEffect(() => {
    async function fetchData() {
      if (boardId) await dispatch(getBoardByIdThunk(boardId));
    }
    fetchData();
  }, [boardId, newColumn, columns]);

  const newColumnText = useTranslate('buttons.newColumn');

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const start = board!.columns.find((col) => col.id === source.droppableId) as ColumnDataResponse;
    const finish = board!.columns.find(
      (col) => col.id === destination.droppableId
    ) as ColumnDataResponse;
    if (start === finish) {
      const column = board!.columns.find(
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
      const newColumns = board!.columns;
      newColumns.splice(
        board!.columns.findIndex((col) => col.id === newColumn.id),
        1,
        newColumn as ColumnDataResponse
      );
      const newState = {
        ...board!,
        columns: newColumns,
      };
      dispatch(updateBoard(newState));
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

    const newColumns = board!.columns;
    const startIndex = board!.columns.findIndex((col) => col.id === start.id);
    const finishIndex = board!.columns.findIndex((col) => col.id === finish.id);
    newColumns.splice(startIndex, 1, newStart);
    newColumns.splice(finishIndex, 1, newFinish);
    const newState = {
      ...board!,
      columns: newColumns,
    };
    dispatch(updateBoard(newState));
  };
  const handleNewColumn = () => {
    setNewColumn(true);
  };
  return (
    <div className={styles.board}>
      <Container sx={{ paddingRight: { sm: '0', md: '0', xs: '0' } }}>
        <div className={styles.boardHeader}>
          <h1 className={styles.title}>{board?.title}</h1>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.relativeWrapper}>
            <div className={styles.wrapper}>
              {board?.columns.map((columnX) => {
                const column = board?.columns.find(
                  (col) => col.id === columnX.id
                ) as ColumnDataResponse;
                return (
                  <Column key={columnX.id} column={column} tasks={column.tasks} id={column.id} />
                );
              })}
              <div style={{ minWidth: '220px' }}>
                <button
                  className={styles.newColumn}
                  onClick={handleNewColumn}
                  data-title={newColumnText}
                >
                  +
                </button>
              </div>
              {newColumn ? <CreateNewColumnForm setNewColumn={setNewColumn} id={boardId} /> : null}
            </div>
          </div>
        </DragDropContext>
      </Container>
    </div>
  );
};

export default Board;
