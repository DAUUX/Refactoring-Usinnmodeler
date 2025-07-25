import React from 'react';
import { Card, CardMedia } from '@mui/material';
import openPoint from './pontoDeFechamento.GIF';
import { useTranslation } from 'react-i18next';

function ClosePoint() {
  const { t } = useTranslation()

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="25"
        image={openPoint}
        alt={t("Ponto de Fechamento")}
      />
    </Card>
  );
}

export default ClosePoint;
