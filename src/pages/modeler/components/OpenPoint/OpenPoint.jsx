import React from 'react';
import { Card, CardMedia } from '@mui/material';
import openPoint from './pontoDeAbertura.GIF'
function OpenPoint() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="25"
        image={openPoint}
      />
    </Card>
  );
}

export default OpenPoint;
