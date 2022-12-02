import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Column from './beautiful-dnd/Column';
import styles from './Board.module.scss';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { UpdateTaskData } from 'services/taskServiceTypes';
import { ColumnDataResponse } from 'services/columnServiceTypes';
import { useTranslate } from 'components/languageContext/languageContext';
import { Container } from '@mui/system';
import CreateNewColumnForm from './boardForms/CreateNewColumnForm';
import { useAppDispatch, useAppSelector } from 'store/store';
import { getBoardByIdThunk, updateBoard, updateBoardThunk } from 'store/thunks/boardThunk';
import { EditColumnForm } from './boardForms/EditColumnForm';
import { getAllUColumnsListThunk, updateColumnThunk } from 'store/thunks/columnThunk';
import { updateTaskThunk } from 'store/thunks/taskThunk';

const Board = () => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const [newColumn, setNewColumn] = useState(false);
  const board = useAppSelector((state) => state.board.boardData);
  const columns = useAppSelector((state) => state.column);
  // const currentEditableColumnOrder = board?.columns.find((col) => col.id === columnId)?.order;

  useEffect(() => {
    async function fetchData() {
      if (boardId) {
        await dispatch(getBoardByIdThunk(boardId));
      }
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
    const columns = board!.columns;
    const start = columns.find((col) => col.id === source.droppableId) as ColumnDataResponse;
    const finish = columns.find((col) => col.id === destination.droppableId) as ColumnDataResponse;
    if (start === finish) {
      const column = columns.find(
        (col) => col.id === destination.droppableId
      ) as ColumnDataResponse;
      const draggableTask = column.tasks[source.index];
      const newTasks = Array.from(column.tasks);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, draggableTask);

      const taskData = {
        title: draggableTask.title,
        order: destination.index,
        description: draggableTask.description,
        userId: draggableTask.userId,
        boardId: boardId,
        columnId: column.id,
      } as UpdateTaskData;
      if (boardId) dispatch(updateTaskThunk(boardId, column.id, draggableTask.id, taskData));
      const newColumn = {
        ...start,
        tasks: newTasks,
      };
      const newColumns = Array.from(columns);
      newColumns.splice(
        columns.findIndex((col) => col.id === newColumn.id),
        1,
        newColumn
      );

      const newState = {
        ...board!,
        columns: newColumns,
      };
      dispatch(updateBoard(newState));
      return;
    }

    const startTasks = Array.from(start.tasks);
    const draggableTask = startTasks[source.index];
    startTasks.splice(source.index, 1);
    const newStart = {
      ...start,
      tasks: startTasks,
    };

    const finishTasks = Array.from(finish.tasks);
    finishTasks.splice(destination.index, 0, draggableTask);
    const newFinish = {
      ...finish,
      tasks: finishTasks,
    };

    const newColumns = Array.from(columns);
    const startIndex = columns.findIndex((col) => col.id === start.id);
    const finishIndex = columns.findIndex((col) => col.id === finish.id);
    newColumns.splice(startIndex, 1, newStart);
    newColumns.splice(finishIndex, 1, newFinish);
    const newState = {
      ...board!,
      columns: newColumns,
    };
    dispatch(updateBoard(newState));
    // dispatch(updateBoardThunk(boardId!, newState));
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
                  <Column
                    key={columnX.id}
                    column={column}
                    tasks={column.tasks}
                    columnId={column.id}
                  />
                );
              })}
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
