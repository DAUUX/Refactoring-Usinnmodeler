import React from 'react';
import { Card, CardMedia } from '@mui/material';
import openPoint from './pontoDeFechamento.GIF'

function ClosePoint() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="25"
        image={openPoint}
        alt="ponto de fechamento"
      />
    </Card>
  );
}

export default ClosePoint;
