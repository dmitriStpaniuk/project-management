import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useTranslate } from 'components/languageContext/languageContext';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import {
  addConfirmDeleteBoardFormCloseThunk,
  addConfirmDeleteBoardFormThunk,
  addConfirmEditBoardFormThunk,
  addFormModalThunk,
} from 'store/thunks/formThunk';
import { ConfirmBoardRemoval } from './boardForms/ConfirmBoardRemoval';

type BoardCardProps = {
  title: string;
  description: string;
  id: string;
  setEditFormBoard: (id: string) => void;
  setConfirmDeleteBoard: (id: string) => void;
};

export const BoardCard = ({ title, description, id, setEditFormBoard }: BoardCardProps) => {
  const dispatch = useAppDispatch();
  const editButton = useTranslate('buttons.editBoard');
  const deleteButton = useTranslate('buttons.deleteBoard');
  const [confirmDeleteBoard, setConfirmDeleteBoard] = useState(false);
  const confirmDeleteBoardInState = useAppSelector((state) => state.form.confirmDeleteBoard);
  useEffect(() => {
    confirmDeleteBoard
      ? dispatch(addConfirmDeleteBoardFormThunk())
      : dispatch(addConfirmDeleteBoardFormCloseThunk());
  }, [confirmDeleteBoard]);
  useEffect(() => {
    !confirmDeleteBoardInState ? setConfirmDeleteBoard(false) : null;
  }, [confirmDeleteBoardInState]);
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    setEditFormBoard(id);
    dispatch(addConfirmEditBoardFormThunk());
  };
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    setConfirmDeleteBoard(true);
  };
  const card = (
    <>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'center',
        }}
      >
        <Button variant="outlined" size="small" onClick={handleEdit}>
          {editButton}
        </Button>
        <Button variant="outlined" size="small" onClick={handleDelete}>
          {deleteButton}
        </Button>
      </CardActions>
    </>
  );
  return (
    <>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
      {confirmDeleteBoard ? (
        <ConfirmBoardRemoval setConfirmDeleteBoard={setConfirmDeleteBoard} id={id} />
      ) : null}
    </>
  );
};
