import React from 'react';
import { Card, CardMedia } from '@mui/material';
import alertContent from './alertaDeNotificacao.png'

function AlertContent() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="30"
        image={alertContent}
        alt="Conteúdo de Alerta"
      />
    </Card>
  );
}

export default AlertContent;
