import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { Grid } from "@mui/material";
import './text-updater-node.css';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import TypeNavigations from '../TypeNavigations';

function ObrigatoryUserActionDiagram({ data, selected }) {

  const [name, setName] = useState(data.name);
  const [openNavigation, setOpenNavigation] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const textareaRef = useRef(null);
  const [minDimensions, setMinDimensions] = useState({ minWidth: 200, minHeight: 60 });

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

  const handleClick = (event) => {
    console.log(event)
    setAnchorEl(event.currentTarget);
    setOpenNavigation(true)
  };

  const handleClose = () => {
    setOpenNavigation(false);
    setAnchorEl(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if(name.length === 0) setName('Ação do usuário')
    }
  };

  return (
    <div className="text-updater-node"
    style={{
      zIndex: 9999,
      width: '100%',
      height: '100%',
    }}>
      <Handle type="target" position={Position.Left} isConnectable id='sistem-process-target-left'/>
      <Handle type="target" position={Position.Top} isConnectable id='sistem-process-target-top'/>
      <Handle type="target" position={Position.Right} isConnectable id='sistem-process-target-right'/>
      <Handle type="target" position={Position.Bottom} isConnectable id='sistem-process-target-bottom'/>
      <Handle type="source" position={Position.Left} id='sistem-process-source-left' onClick={(e) => handleClick(e)} />
      <Handle type="source" position={Position.Top} id='sistem-process-source-top' onClick={(e) => handleClick(e)}/>
      <Handle type="source" position={Position.Right} id='sistem-process-source-right' onClick={(e) => handleClick(e)}/>
      <Handle type="source" position={Position.Bottom} id='sistem-process-source-bottom' onClick={(e) => handleClick(e)}/>
      <TypeNavigations 
        edges={['transition', 'cancel-transition', 'navigation']} 
        onClose={() => handleClose()}
        open={openNavigation}
        anchor={anchorEl}
        close={() => handleClose()}
      />
      <Grid container justifyContent={"space-between"} flexDirection={"row"}>
        <textarea 
            ref={textareaRef}
            id="text-input-user-action-diagram" 
            spellCheck="false" 
            placeholder="Ação do Usuário" 
            onChange={onChange} 
            name="text" 
            className="nodrag" 
            value={name} 
            onKeyDown={handleKeyDown}
            rows={1}
            style={{width: '100%', resize: 'none'}}
          />
      </Grid>
      <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <>
          <PersonOutlineIcon sx={{ color: "#000", marginRight: 0.5 }} />
          <PriorityHighIcon fontSize='2' sx={{
            color: "#000",
            position: "absolute",
          }} />
        </>
      </Grid>
    </div>
  );
}

export default ObrigatoryUserActionDiagram;
