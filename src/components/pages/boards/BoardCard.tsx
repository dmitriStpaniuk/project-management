import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useTranslate } from 'components/languageContext/languageContext';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import {
  addConfirmDeleteBoardFormThunk,
  addConfirmEditBoardFormThunk,
  addFormBackgroundThunk,
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
  const confirmDeleteBoard = useAppSelector((state) => state.form.confirmDeleteBoard);
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    setEditFormBoard(id);
    dispatch(addConfirmEditBoardFormThunk());
    dispatch(addFormBackgroundThunk());
  };
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addConfirmDeleteBoardFormThunk());
    dispatch(addFormBackgroundThunk());
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
      {confirmDeleteBoard ? <ConfirmBoardRemoval id={id} /> : null}
    </>
  );
};
