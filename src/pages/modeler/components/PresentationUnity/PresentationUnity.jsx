import React from 'react';
import { Card, CardMedia } from '@mui/material';
import presentationUnity from './objetivoDoUsuario.GIF'

function PresentationUnity() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="30"
        image={presentationUnity}
        alt="Unidade de Apresentação"
      />
    </Card>
  );
}

export default PresentationUnity;
