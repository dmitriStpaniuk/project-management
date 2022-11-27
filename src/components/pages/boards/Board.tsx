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
