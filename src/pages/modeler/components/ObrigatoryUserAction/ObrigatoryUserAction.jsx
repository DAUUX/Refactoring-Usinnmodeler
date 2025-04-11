import React from 'react';
import { Card, CardMedia } from '@mui/material';
import obrigatoryUserAction from './acaoDoUsuarioObrigatoria.GIF'

function ObrigatoryUserAction() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="30"
        image={obrigatoryUserAction}
        alt="Ação do Usuário (Obrigatória)"
      />
    </Card>
  );
}

export default ObrigatoryUserAction;
