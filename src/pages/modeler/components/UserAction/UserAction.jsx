import React from 'react';
import { Card, CardMedia } from '@mui/material';
import userAction from './acaoDoUsuario.GIF'

function UserAction() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="30"
        image={userAction}
      />
    </Card>
  );
}

export default UserAction;
