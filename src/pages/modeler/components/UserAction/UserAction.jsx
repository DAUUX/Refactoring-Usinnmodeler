import React from 'react';
import { Card, CardMedia } from '@mui/material';
import userAction from './acaoDoUsuario.GIF';
import { useTranslation } from 'react-i18next';

function UserAction() {
  const { t } = useTranslation();
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="30"
        image={userAction}
        alt={t("Ação do Usuário")}
      />
    </Card>
  );
}

export default UserAction;
