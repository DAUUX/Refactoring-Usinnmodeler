import React from 'react';
import { Card, CardMedia } from '@mui/material';
import dataColection from './colecaoDados.gif'

function DataColection() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="40"
        image={dataColection}
      />
    </Card>
  );
}

export default DataColection;
