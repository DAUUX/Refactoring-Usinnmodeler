import React from 'react';
import { Card, CardMedia } from '@mui/material';
import alertContent from './alertaDeNotificacao.png';
import { useTranslation } from 'react-i18next';

function AlertContent() {
  const { t } = useTranslation();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="30"
        image={alertContent}
        alt={t("Conteúdo de Alerta")}
      />
    </Card>
  );
}

export default AlertContent;
