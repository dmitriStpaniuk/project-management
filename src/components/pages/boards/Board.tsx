import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Column from './beautiful-dnd/Column';
import styles from './Board.module.scss';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { TaskDataResponse, UpdateTaskData } from 'services/taskServiceTypes';
import { ColumnDataResponse } from 'services/columnServiceTypes';
import { useTranslate } from 'components/languageContext/languageContext';
import { Container } from '@mui/system';
import CreateNewColumnForm from './boardForms/CreateNewColumnForm';
import { useAppDispatch, useAppSelector } from 'store/store';
import { getBoardByIdThunk } from 'store/thunks/boardThunk';
import { updateTaskThunk } from 'store/thunks/taskThunk';
import { boardSlice } from 'store/slices/boardSlice';

const Board = () => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const [newColumn, setNewColumn] = useState(false);
  const board = useAppSelector((state) => state.board.boardData);
  const columns = useAppSelector((state) => state.column);
  const tasks = useAppSelector((state) => state.task);

  useEffect(() => {
    async function fetchData() {
      if (boardId) {
        await dispatch(getBoardByIdThunk(boardId));
      }
    }
    fetchData();
  }, [boardId, newColumn, columns, tasks]);
  const newColumnText = useTranslate('buttons.newColumn');

  useEffect(() => {
    return () => {
      dispatch(boardSlice.actions.setBoardData(undefined));
    };
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const columns = board!.columns;
    const start = columns.find((col) => col.id === source.droppableId) as ColumnDataResponse;
    const finish = columns.find((col) => col.id === destination.droppableId) as ColumnDataResponse;
    if (start === finish) {
      const column = columns.find(
        (col) => col.id === destination.droppableId
      ) as ColumnDataResponse;
      const draggableTask = column.tasks.find(
        (task) => task.id === draggableId
      ) as TaskDataResponse;

      const taskData = {
        title: draggableTask.title,
        order: destination.index + 1,
        description: draggableTask.description,
        userId: draggableTask.userId,
        boardId: boardId,
        columnId: column.id,
      } as UpdateTaskData;
      if (boardId) dispatch(updateTaskThunk(boardId, column.id, draggableTask.id, taskData));
      return;
    }

    const startTasks = Array.from(start.tasks);
    const draggableTask = startTasks.find((task) => task.id === draggableId) as TaskDataResponse;

    const taskData = {
      title: draggableTask.title,
      order: destination.index + 1,
      description: draggableTask.description,
      userId: draggableTask.userId,
      boardId: boardId,
      columnId: finish.id,
    } as UpdateTaskData;
    if (boardId) dispatch(updateTaskThunk(boardId, start.id, draggableTask.id, taskData));
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
              {board?.columns
                ? [...board.columns]
                    .sort((a, b) => a.order - b.order)
                    .map((columnX) => {
                      const column = board?.columns.find(
                        (col) => col.id === columnX.id
                      ) as ColumnDataResponse;
                      return (
                        <Column
                          key={columnX.id}
                          column={column}
                          tasks={column.tasks}
                          columnId={column.id}
                        />
                      );
                    })
                : null}
              <div style={{ minWidth: '120px' }}>
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
