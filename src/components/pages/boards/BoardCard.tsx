import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useTranslate } from 'components/languageContext/languageContext';
import React, { useState } from 'react';
import { EditBoardForm } from './EditBoardForm';
type BoardCardProps = {
  title: string;
  description: string;
  id: string;
  setEditFormBoard: (id: string) => void;
};

export const BoardCard = ({ title, description, id, setEditFormBoard }: BoardCardProps) => {
  const editButton = useTranslate('buttons.editBoard');
  const deleteButton = useTranslate('buttons.deleteBoard');
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    setEditFormBoard(id);
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
        <Button variant="outlined" size="small">
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
