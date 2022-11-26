import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useTranslate } from 'components/languageContext/languageContext';
import React from 'react';
type BoardCardProps = {
  title: string;
  description: string;
};

export const BoardCard = ({ title, description }: BoardCardProps) => {
  const editButton = useTranslate('buttons.editBoard');
  const deleteButton = useTranslate('buttons.deleteBoard');
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
        <Button size="small">{editButton}</Button>
        <Button size="small">{deleteButton}</Button>
      </CardActions>
    </>
  );
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};
