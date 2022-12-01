import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useTranslate } from 'components/languageContext/languageContext';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import { addConfirmDeleteBoardFormThunk } from 'store/thunks/formThunk';
import { ConfirmBoardRemoval } from './boardForms/ConfirmBoardRemoval';

type BoardCardProps = {
  title: string;
  description: string;
  id: string;
  setEditFormBoard: (id: string) => void;
};

export const BoardCard = ({ title, description, id, setEditFormBoard }: BoardCardProps) => {
  const dispatch = useAppDispatch();

  const editButton = useTranslate('buttons.editBoard');
  const deleteButton = useTranslate('buttons.deleteBoard');
  // const [confirmDelete, setConfirmDeleteBoard] = useState(false);
  const confirmDeleteBoard = useAppSelector((state) => state.form.confirmDeleteBoard);
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    setEditFormBoard(id);
  };
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    // setConfirmDeleteBoard(true);
    dispatch(addConfirmDeleteBoardFormThunk());
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
      {confirmDeleteBoard ? <ConfirmBoardRemoval id={id} /> : null}
    </>
  );
  return (
    <>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
    </>
  );
};
