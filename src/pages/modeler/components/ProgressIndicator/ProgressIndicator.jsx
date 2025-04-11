import React from 'react';
import { Card, CardMedia } from '@mui/material';
import progressIndicator from './indicadorDeProgresso.GIF'

function ProgressIndicator() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="30"
        image={progressIndicator}
        alt="Indicador de Progresso"
      />
    </Card>
  );
}

export default ProgressIndicator;
