import React, { useState, useEffect } from 'react';
import { Handle, NodeResizer, Position } from 'reactflow';
import { Grid } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './text-updater-node.css';
import TypeNavigations from '../TypeNavigations';


function ProgressIndicatorDiagram({ data, selected }) {

  const [name, setName] = useState(data.name)

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
      <Handle type="source" position={Position.Left} id='progress-indicator-source-left' onClick={(e) => handleClick(e)} />
      <Handle type="source" position={Position.Top} id='progress-indicator-source-top' onClick={(e) => handleClick(e)}/>
      <Handle type="source" position={Position.Right} id='progress-indicator-source-right' onClick={(e) => handleClick(e)}/>
      <Handle type="source" position={Position.Bottom} id='progress-indicator-source-bottom' onClick={(e) => handleClick(e)}/>
      <TypeNavigations 
        edges={['query-data', 'unsucess-feedback', 'sucess-feedback', 'cancel-transition']} 
        onClose={() => handleClose()}
        open={openNavigation}
        anchor={anchorEl}
        close={() => handleClose()}
      />
      <Grid container justifyContent={"space-between"} flexDirection={"row"}>
        <Grid item xs={10}>
          <input id="text-input-user-action-diagram" spellCheck="false" placeholder="Indicador de Progresso" onChange={onChange} name="text" className="nodrag" value={name} />
        </Grid>
      </Grid>
      <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <AccessTimeIcon sx={{ color: '#000000' }} />
      </Grid>
      <NodeResizer
        isVisible={selected}
        minWidth={180}
        minHeight={55}
      />
    </div>
  );
}

export default ProgressIndicatorDiagram;
