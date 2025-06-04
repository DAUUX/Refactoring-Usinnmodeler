import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import OpenPoint from "../OpenPoint/OpenPoint";
import ClosePoint from "../ClosePoint/ClosePoint";
import SistemProcess from "../SistemProcess/SistemProcess";
import UserAction from "../UserAction/UserAction";
import AlertContent from "../AlertContent/AlertContent";
import ObrigatoryUserAction from "../ObrigatoryUserAction/ObrigatoryUserAction";
import ProgressIndicator from "../ProgressIndicator/ProgressIndicator";
import DataColection from "../DataColection/DataColection";
import PresentationUnity from "../PresentationUnity/PresentationUnity";
import PresentationUnityAcessible from "../PresentationUnityAcessible/PresentationUnityAcessible";
import { useTranslation } from 'react-i18next';

export default function Sidebar() {
  const { t } = useTranslation();
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={{
      width: '30vw'
    }}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color='primary' />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography color={"#13528E"}>{t("Elementos de Navegação")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item onDragStart={(event) => onDragStart(event, 'open-point')} draggable>
              <OpenPoint />
            </Grid>
            <Grid item>
              <Typography variant='body2' >{t("Ponto de Abertura")}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1} alignItems="center" justifyContent="space-between">
            <Grid item onDragStart={(event) => onDragStart(event, 'close-point')} draggable>
              <ClosePoint />
            </Grid>
            <Grid item>
              <Typography variant='body2' >{t("Ponto de Fechamento")}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1} alignItems="center" justifyContent="space-between">
            <Grid item onDragStart={(event) => onDragStart(event, 'presentation-unity')} draggable>
              <PresentationUnity />
            </Grid>
            <Grid item>
              <Typography variant='body2' >{t("Unidade de apresentação")}</Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color='primary' />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography color={"#13528E"}>{t("Elementos de Interação")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} alignItems="center" mb={2} justifyContent="space-between" >
            <Grid item onDragStart={(event) => onDragStart(event, 'sistem-process')} draggable>
              <SistemProcess />
            </Grid>
            <Grid item>
              <Typography variant='body2' >{t("Processo do Sistema")}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center"  justifyContent="space-between">
            <Grid item onDragStart={(event) => onDragStart(event, 'user-action')} draggable>
              <UserAction />
            </Grid>
            <Grid item>
              <Typography variant='body2' >{t("Ação do Usuário")}</Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color='primary' />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography color={"#13528E"}>{t("Elementos de Usabilidade")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} alignItems="center" mb={2} justifyContent="space-between">
            <Grid item onDragStart={(event) => onDragStart(event, 'presentation-unity-acessible')} draggable>
              <PresentationUnityAcessible />
            </Grid>
            <Grid item>
              <Typography variant='body2' >{t("Unidade de apresentação")}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" mb={2} justifyContent="space-between">
            <Grid item onDragStart={(event) => onDragStart(event, 'data-colection')} draggable>
              <DataColection />
            </Grid>
            <Grid item>
              <Typography variant='body2' >{t("Coleção de dados")}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" mb={2} justifyContent="space-between">
            <Grid item onDragStart={(event) => onDragStart(event, 'alert-content')} draggable>
              <AlertContent />
            </Grid>
            <Grid item>
              <Typography variant='body2' >{t("Conteúdo de Alerta")}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" mb={2} justifyContent="space-between">
            <Grid item onDragStart={(event) => onDragStart(event, 'obg-user-action')} draggable>
              <ObrigatoryUserAction />
            </Grid>
            <Grid item>
              <Typography variant='body2' >{t("Ação do Usuário (Obrigatória)")}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item onDragStart={(event) => onDragStart(event, 'progress-indicator')} draggable>
              <ProgressIndicator />
            </Grid>
            <Grid item>
              <Typography variant='body2' >{t("Indicador de Progresso")}</Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}