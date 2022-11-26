import { Button, Container, Typography } from '@mui/material';
import { useTranslate } from 'components/languageContext/languageContext';
import React, { useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from 'store/store';
import { getAllUBoardsList } from 'store/thunks/boardThunk';
import { AddBoardForm } from './AddBoardForm';
import { BoardCard } from './BoardCard';

export default function Board() {
  const [popupFormAddBoard, setPopupFormAddBoard] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const allBoardsList = useAppSelector((state) => state.board.allBoardsList);
  const addBoardText = useTranslate('buttons.neweBoard');

  const handleClick = () => {
    setPopupFormAddBoard(true);
  };

  const allBoards = async () => {
    await dispatch(getAllUBoardsList());
  };

  useEffect(() => {
    allBoards();
  }, [handleClick]);
  return (
    <div style={{ minHeight: 'inherit', backgroundColor: '#f6f6f6' }}>
      <Container
        data-testid="boards"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'inherit',
          justifyContent: ' space-between',
          alignItems: 'center',
          paddingTop: '10px',
          paddingBottom: '20px',
        }}
      >
        <Typography variant="h2" component="h3" sx={{ textAlign: 'center' }}>
          Boards
        </Typography>
        {allBoardsList?.map((board) => (
          <BoardCard key={board.id} title={board.title} description={board.description} />
        ))}
        {popupFormAddBoard ? <AddBoardForm setPopupFormAddBoard={setPopupFormAddBoard} /> : null}
        <Button
          sx={{ width: '30%', fontSize: 12 }}
          variant="outlined"
          startIcon={<AiOutlineCheck />}
          onClick={handleClick}
        >
          {addBoardText}
        </Button>
      </Container>
    </div>
  );
}
