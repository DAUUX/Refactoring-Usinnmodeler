import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { Grid } from "@mui/material";
import './text-updater-node.css';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import TypeNavigations from '../TypeNavigations';

function ObrigatoryUserActionDiagram({ data }) {

  const [name, setName] = useState(data.name);
  const [isEditing, setIsEditing] = useState(true);
  const [openNavigation, setOpenNavigation] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  useEffect(() => {
    if (!!data.name.trim()) {
      setName(data.name)
    }
  }, [data.name])

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
      setIsEditing(false);
    }
  };

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} isConnectable id='sistem-process-target-left'/>
      <Handle type="target" position={Position.Top} isConnectable id='sistem-process-target-top'/>
      <Handle type="target" position={Position.Right} isConnectable id='sistem-process-target-right'/>
      <Handle type="target" position={Position.Bottom} isConnectable id='sistem-process-target-bottom'/>
      <Handle type="source" position={Position.Left} id='sistem-process-source-left' onClick={(e) => handleClick(e)} />
      <Handle type="source" position={Position.Top} id='sistem-process-source-top' onClick={(e) => handleClick(e)}/>
      <Handle type="source" position={Position.Right} id='sistem-process-source-right' onClick={(e) => handleClick(e)}/>
      <Handle type="source" position={Position.Bottom} id='sistem-process-source-bottom' onClick={(e) => handleClick(e)}/>
      <TypeNavigations 
        edges={['transition', 'cancel-transition', 'navigation','query-data']} 
        onClose={() => handleClose()}
        open={openNavigation}
        anchor={anchorEl}
        close={() => handleClose()}
      />
      <Grid container justifyContent={"space-between"} flexDirection={"row"}>
      {
            isEditing ?
            <input 
              id="text-input-user-action-diagram" 
              spellCheck="false" 
              placeholder="Ação do Usuário" 
              onChange={onChange} 
              name="text" 
              className="nodrag" 
              value={name} 
              onKeyDown={handleKeyDown}/> :
            <span onClick={() => setIsEditing(true)} style={{minWidth: 150}}>{name}</span>
          }
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
