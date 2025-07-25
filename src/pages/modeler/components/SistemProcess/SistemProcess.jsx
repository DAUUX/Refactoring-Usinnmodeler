import React from 'react';
import { Card, CardMedia } from '@mui/material';
import processSistem from './processoDoSistema.GIF';
import { useTranslation } from 'react-i18next';

function SistemProcess() {
  const { t } = useTranslation();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="25"
        image={processSistem}
        alt={t("Processo do Sistema")}
      />
    </Card>
  );
}

export default SistemProcess;
