import React from 'react';
import { Card, CardMedia } from '@mui/material';
import obrigatoryUserAction from './acaoDoUsuarioObrigatoria.GIF';
import { useTranslation } from 'react-i18next';

function ObrigatoryUserAction() {
  const { t } = useTranslation();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="30"
        image={obrigatoryUserAction}
        alt={t("Ação do Usuário (Obrigatória)")}
      />
    </Card>
  );
}

export default ObrigatoryUserAction;
