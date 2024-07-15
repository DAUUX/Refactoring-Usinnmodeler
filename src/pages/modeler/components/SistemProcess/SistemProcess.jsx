import React from 'react';
import { Card, CardMedia } from '@mui/material';
import processSistem from './processoDoSistema.GIF'

function SistemProcess() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="25"
        image={processSistem}
      />
    </Card>
  );
}

export default SistemProcess;
