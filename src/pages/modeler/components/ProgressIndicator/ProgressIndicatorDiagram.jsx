import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { Grid } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './text-updater-node.css';
import TypeNavigations from '../TypeNavigations';
import { useModeler } from "../../../../context/modelerContext";

function ProgressIndicatorDiagram({ data, selected }) {

  const [name, setName] = useState(data.name)
  const textareaRef = useRef(null);
  const [minDimensions, setMinDimensions] = useState({ minWidth: 180, minHeight: 55 });
  
  const [ultimaseta, setUltimaseta] = React.useState("sucess-feedback"); // Estado elevado
  const { setCurrentEdge } = useModeler(); // Supondo que useModeler esteja disponível

  useEffect(() => {
    if (!!data.name.trim()) {
      setName(data.name)
    }
  }, [data.name])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      const { offsetHeight } = textareaRef.current;
      setMinDimensions((prev) => ({
        minWidth: prev.minWidth,
        minHeight: offsetHeight + 35,
      }));
    }
  }, [name, selected]);

  const onChange = (evt) => {
    setName(evt.target.value)
  }

  const inputElement = document.getElementById('text-input-user-action-diagram');

  inputElement && inputElement.addEventListener('blur', () => {
    data.name = name
  });

  const [openNavigation, setOpenNavigation] = React.useState(false);
  
  const [anchorEl, setAnchorEl] = React.useState(null);
    
  const handleClick = (event) => {
    console.log(event);
    setAnchorEl(event.currentTarget);
    setOpenNavigation(true);
  };

  const handleClose = () => {
    setOpenNavigation(false);
    setAnchorEl(null);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if(name.length === 0) setName('Indicador de Progresso')
    }
  };

  return (
    <div className="text-updater-node"
    style={{
      zIndex: 9999,
      width: '100%',
      height: '100%',
    }}>
      <Handle type="target" position={Position.Left} isConnectable id='progress-indicator-target-left'/>
      <Handle type="target" position={Position.Top} isConnectable id='progress-indicator-target-top'/>
      <Handle type="target" position={Position.Right} isConnectable id='progress-indicator-target-right'/>
      <Handle type="target" position={Position.Bottom} isConnectable id='progress-indicator-target-bottom'/>
      <Handle type="source" position={Position.Left} id='progress-indicator-source-left' onClick={(e) => handleClick(e)} onMouseEnter={(e) => {if (e.buttons === 0) {setCurrentEdge(ultimaseta);}}}/>
      <Handle type="source" position={Position.Top} id='progress-indicator-source-top' onClick={(e) => handleClick(e)} onMouseEnter={(e) => {if (e.buttons === 0) {setCurrentEdge(ultimaseta);}}}/>
      <Handle type="source" position={Position.Right} id='progress-indicator-source-right' onClick={(e) => handleClick(e)} onMouseEnter={(e) => {if (e.buttons === 0) {setCurrentEdge(ultimaseta);}}}/>
      <Handle type="source" position={Position.Bottom} id='progress-indicator-source-bottom' onClick={(e) => handleClick(e)} onMouseEnter={(e) => {if (e.buttons === 0) {setCurrentEdge(ultimaseta);}}}/>

      <TypeNavigations 
        edges={['sucess-feedback', 'unsucess-feedback', 'cancel-transition','query-data']} 
        onClose={() => handleClose()}
        open={openNavigation}
        anchor={anchorEl}
        close={() => handleClose()}
        setUltimaseta={setUltimaseta}
      />
      <Grid container justifyContent={"space-between"} flexDirection={"row"}>
        <Grid item xs={15}>
          <textarea 
            ref={textareaRef}
            id="text-input-user-action-diagram" 
            spellCheck="false" 
            placeholder="Indicador de Progresso" 
            onChange={onChange} 
            name="text" 
            className="nodrag" 
            value={name} 
            onKeyDown={handleKeyDown}
            rows={1}
            style={{ width: '100%', height: '100%', resize: 'none', padding: '5px', boxSizing: 'border-box' }}/>
        </Grid>
      </Grid>
      <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <AccessTimeIcon sx={{ color: '#000000' }} />
      </Grid>
    </div>
  );
}

export default ProgressIndicatorDiagram;
