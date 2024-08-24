import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import OpenPoint from "./components/OpenPoint/OpenPoint";
import ClosePoint from "./components/ClosePoint/ClosePoint";
import SistemProcess from "./components/SistemProcess/SistemProcess";
import UserAction from "./components/UserAction/UserAction";
import AlertContent from "./components/AlertContent/AlertContent";
import ObrigatoryUserAction from "./components/ObrigatoryUserAction/ObrigatoryUserAction";
import ProgressIndicator from "./components/ProgressIndicator/ProgressIndicator";
import DataColection from "./components/DataColection/DataColection";
import PresentationUnity from "./components/PresentationUnity/PresentationUnity";
import PresentationUnityAcessible from "./components/PresentationUnityAcessible/PresentationUnityAcessible";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
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
          <Typography color={"#1082EC"}>Elementos de navegação</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item onDragStart={(event) => onDragStart(event, 'open-point')} draggable>
              <OpenPoint />
            </Grid>
            <Grid item>
              <Typography variant='body2' >Ponto de abertura</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1} alignItems="center" justifyContent="space-between">
            <Grid item onDragStart={(event) => onDragStart(event, 'close-point')} draggable>
              <ClosePoint />
            </Grid>
            <Grid item>
              <Typography variant='body2' >Ponto de encerramento</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1} alignItems="center" justifyContent="space-between">
            <Grid item onDragStart={(event) => onDragStart(event, 'presentation-unity')} draggable>
              <PresentationUnity />
            </Grid>
            <Grid item>
              <Typography variant='body2' >Unidade de Apresentação</Typography>
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
          <Typography color={"#1082EC"}>Elementos de interação</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} alignItems="center" mb={2} justifyContent="space-between" >
            <Grid item onDragStart={(event) => onDragStart(event, 'sistem-process')} draggable>
              <SistemProcess />
            </Grid>
            <Grid item>
              <Typography variant='body2' >Processo do sistema</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center"  justifyContent="space-between">
            <Grid item onDragStart={(event) => onDragStart(event, 'user-action')} draggable>
              <UserAction />
            </Grid>
            <Grid item>
              <Typography variant='body2' >Ação do Usuário</Typography>
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
          <Typography color={"#1082EC"}>Elementos de usabilidade</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} alignItems="center" mb={2} justifyContent="space-between">
            <Grid item onDragStart={(event) => onDragStart(event, 'presentation-unity-acessible')} draggable>
              <PresentationUnityAcessible />
            </Grid>
            <Grid item>
              <Typography variant='body2' >Unidade de Apresentação</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" mb={2} justifyContent="space-between">
            <Grid item onDragStart={(event) => onDragStart(event, 'data-colection')} draggable>
              <DataColection />
            </Grid>
            <Grid item>
              <Typography variant='body2' >Coleção de dados</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" mb={2} justifyContent="space-between">
            <Grid item onDragStart={(event) => onDragStart(event, 'alert-content')} draggable>
              <AlertContent />
            </Grid>
            <Grid item>
              <Typography variant='body2' >Conteúdo de Alerta</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" mb={2} justifyContent="space-between">
            <Grid item onDragStart={(event) => onDragStart(event, 'obg-user-action')} draggable>
              <ObrigatoryUserAction />
            </Grid>
            <Grid item>
              <Typography variant='body2' >Ação do Usuário Obrigatória</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item onDragStart={(event) => onDragStart(event, 'progress-indicator')} draggable>
              <ProgressIndicator />
            </Grid>
            <Grid item>
              <Typography variant='body2' >Indicador de progresso</Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}