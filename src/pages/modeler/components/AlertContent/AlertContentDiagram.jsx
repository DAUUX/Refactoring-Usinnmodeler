import React, { useState, useEffect } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Grid } from "@mui/material";
import './text-updater-node.css';
import TypeNavigations from '../TypeNavigations';


function AlertContentDiagram({ data, selected }) {

  const [name, setName] = useState(data.name)

  useEffect(() => {
    if (!!data.name.trim()) {
      setName(data.name)
    }
  }, [data.name])

  const inputElement = document.getElementById('text-input-user-action-diagram');

  inputElement && inputElement.addEventListener('blur', () => {
    data.name = name
  });

  const onChange = (evt) => {
    setName(evt.target.value)
  }

  const [openNavigation, setOpenNavigation] = React.useState(false)
  
  const [anchorEl, setAnchorEl] = React.useState(null);
    
  const handleClick = (event) => {
    console.log(event)
    setAnchorEl(event.currentTarget);
    setOpenNavigation(true)
  };

  const handleClose = () => {
    setOpenNavigation(false);
    setAnchorEl(null)
  }


  return (
    <div 
    className="text-updater-node" 
    style={{
      zIndex: 9999,
      width: '100%',
      height: '100%',
    }}>
      <Grid container justifyContent={"space-between"} flexDirection={"row"}>
        <Grid item xs={10}>
          <input 
            id="text-input-user-action-diagram" 
            spellCheck="false" 
            placeholder="Conteúdo de Alerta" 
            onChange={onChange} 
            name="text" 
            className="nodrag" 
            value={name} 
            style={{ width: '100%', height: '100%', resize: 'none', padding: '5px', boxSizing: 'border-box' }}/>
        </Grid>
      </Grid>
      <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <WarningAmberIcon sx={{ color: '#000000' }} />
      </Grid>
      <NodeResizer
        isVisible={selected}
        minWidth={200}
        minHeight={60}
      />
      <Handle type="target" position={Position.Left} isConnectable id='alert-content-target-left'/>
      <Handle type="target" position={Position.Top} isConnectable id='alert-content-target-top'/>
      <Handle type="target" position={Position.Right} isConnectable id='alert-content-target-right'/>
      <Handle type="target" position={Position.Bottom} isConnectable id='alert-content-target-bottom'/>
      <Handle type="source" position={Position.Left} id='alert-content-source-left' onClick={(e) => handleClick(e)} />
      <Handle type="source" position={Position.Top} id='alert-content-source-top' onClick={(e) => handleClick(e)}/>
      <Handle type="source" position={Position.Right} id='alert-content-source-right' onClick={(e) => handleClick(e)}/>
      <Handle type="source" position={Position.Bottom} id='alert-content-source-bottom' onClick={(e) => handleClick(e)}/>
      <TypeNavigations 
        edges={['navigation','transition', 'unsucess-feedback', 'sucess-feedback', 'cancel-transition']} 
        onClose={() => handleClose()}
        open={openNavigation}
        anchor={anchorEl}
        close={() => handleClose()}
      />
    </div>
  );
}

export default AlertContentDiagram;
