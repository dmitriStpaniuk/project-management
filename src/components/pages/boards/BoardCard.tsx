import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useTranslate } from 'components/languageContext/languageContext';
import React, { useState } from 'react';
import { EditBoardForm } from './EditBoardForm';
type BoardCardProps = {
  title: string;
  description: string;
  id: string;
};

export const BoardCard = ({ title, description, id }: BoardCardProps) => {
  const [editFormBoard, setEditFormBoard] = useState<boolean>(false);
  const editButton = useTranslate('buttons.editBoard');
  const deleteButton = useTranslate('buttons.deleteBoard');
  const handleEdit = () => {
    setEditFormBoard(true);
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
      <CardActions>
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
      {editFormBoard ? <EditBoardForm setEditFormBoard={setEditFormBoard} id={id} /> : null}
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
    </>
  );
};
