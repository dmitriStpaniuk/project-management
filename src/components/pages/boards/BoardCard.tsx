import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useTranslate } from 'components/languageContext/languageContext';
import { useAlerts } from 'components/SnackbarPanel';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import { deleteBoardByIdThunk } from 'store/thunks/boardThunk';
type BoardCardProps = {
  title: string;
  description: string;
  id: string;
  setEditFormBoard: (id: string) => void;
};

export const BoardCard = ({ title, description, id, setEditFormBoard }: BoardCardProps) => {
  const addAlert = useAlerts();
  const dispatch = useAppDispatch();
  const editButton = useTranslate('buttons.editBoard');
  const deleteButton = useTranslate('buttons.deleteBoard');
  const successDeleteBoard = useTranslate('alerts.successDeleteBoard');
  const errorDeleteBoard = useTranslate('alerts.errorDeleteBoard');

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    setEditFormBoard(id);
  };
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await dispatch(deleteBoardByIdThunk(id));
      addAlert({ type: 'success', message: successDeleteBoard });
    } catch {
      addAlert({ type: 'error', message: errorDeleteBoard });
    }
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
    </>
  );
};
