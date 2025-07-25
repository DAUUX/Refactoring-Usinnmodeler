import React from 'react';
import { Card, CardMedia } from '@mui/material';
import presentationUnity from './unidadeApresentacaoSA.GIF';
import { useTranslation } from 'react-i18next';

function PresentationUnityAcessible() {
  const { t } = useTranslation();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="30"
        image={presentationUnity}
        alt={t("Unidade de Apresentação (Sempre Acessível)")}
      />
    </Card>
  );
}

export default PresentationUnityAcessible;
