import { Box, Button, Container, Typography } from '@mui/material';
import { useTranslate } from 'components/languageContext/languageContext';
import React, { useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/store';
import { getAllUBoardsList } from 'store/thunks/boardThunk';
import { AddBoardForm } from './boardForms/AddBoardForm';
import { BoardCard } from './BoardCard';
import { EditBoardForm } from './boardForms/EditBoardForm';
import { WrapperWaiting } from 'components/utils/WrapperWaiting';

export default function Boards() {
  const [popupFormAddBoard, setPopupFormAddBoard] = useState(false);
  const [editFormBoardId, setEditFormBoard] = useState('');
  const dispatch = useAppDispatch();
  const allBoardsList = useAppSelector((state) => state.board.allBoardsList);
  const boardMainFetching = useAppSelector((state) => state.board.isBoardMainFetching);
  const addBoardText = useTranslate('buttons.neweBoard');
  const boardsTitle = useTranslate('links.boardsTitle');

  const handleClick = () => {
    setPopupFormAddBoard(true);
  };

  useEffect(() => {
    dispatch(getAllUBoardsList());
  }, [editFormBoardId, boardMainFetching]);

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
          {boardsTitle}
        </Typography>
        <Box
          display={'flex'}
          flexWrap={'wrap'}
          justifyContent={'center'}
          alignItems={'center'}
          sx={{ gap: 1 }}
        >
          {allBoardsList?.map((board) => (
            <Link key={board.id} to={board.id}>
              <BoardCard
                title={board.title}
                description={board.description}
                id={board.id}
                setEditFormBoard={setEditFormBoard}
              />
            </Link>
          ))}
        </Box>
        {popupFormAddBoard ? <AddBoardForm setPopupFormAddBoard={setPopupFormAddBoard} /> : null}
        {editFormBoardId ? (
          <EditBoardForm setEditFormBoard={setEditFormBoard} id={editFormBoardId} />
        ) : null}
        <Button
          sx={{ width: '30%', fontSize: 12 }}
          variant="contained"
          startIcon={<AiOutlineCheck />}
          onClick={handleClick}
        >
          {addBoardText}
        </Button>
      </Container>
    </div>
  );
}
