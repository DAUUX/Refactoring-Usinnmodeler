import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Grid } from "@mui/material";
import './text-updater-node.css';
import TypeNavigations from '../TypeNavigations';

import { useModeler } from "../../../../context/modelerContext";


function UserActionDiagram({ data, selected }) {

  const [name, setName] = useState(data.name);
  const [openNavigation, setOpenNavigation] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const textareaRef = useRef(null);

  const [, setMinDimensions] = useState({ minWidth: 180, minHeight: 60 });
  const [ultimaseta, setUltimaseta] = React.useState("navigation"); // Estado elevado
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
    
  const handleClick = (event) => {
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
        <PersonOutlineOutlinedIcon sx={{ color: '#000000' }} />
      </Grid>
      <Handle
        type="target"
        position={Position.Bottom}
        isConnectable
        id='user-action-target-bottom'
      />
      <Handle
        type="target"
        position={Position.Right}
        isConnectable
        id='user-action-target-right'
      />
      <Handle 
        type="target" 
        position={Position.Top} 
        isConnectable 
        id='user-action-target-top'
        />
      <Handle 
        type="target" 
        position={Position.Left} 
        isConnectable 
        id='user-action-target-left'
        />
      <Handle
        type="source" 
        position={Position.Bottom}
        onClick={(e) => handleClick(e)} 
        id='user-action-source-bottom'
        onMouseEnter={(e) => {if (e.buttons === 0) {setCurrentEdge(ultimaseta);}}}
      />
      <Handle
        type="source"
        position={Position.Right}
        onClick={(e) => handleClick(e)} 
        id='user-action-source-right'
        onMouseEnter={(e) => {if (e.buttons === 0) {setCurrentEdge(ultimaseta);}}}
      />
      <Handle 
        type="source"
        position={Position.Top}
        onClick={(e) => handleClick(e)}
        id='user-action-source-top'
        onMouseEnter={(e) => {if (e.buttons === 0) {setCurrentEdge(ultimaseta);}}}
      />
      <Handle 
        type="source"
        position={Position.Left} 
        onClick={(e) => handleClick(e)}
        id='user-action-source-left'
        onMouseEnter={(e) => {if (e.buttons === 0) {setCurrentEdge(ultimaseta);}}}
      />
      <TypeNavigations 
        edges={['navigation','transition', 'cancel-transition', 'query-data']} 
        onClose={() => handleClose()}
        open={openNavigation}
        anchor={anchorEl}
        close={() => handleClose()}
        setUltimaseta={setUltimaseta}
      />
    </div>
  );
}

export default UserActionDiagram;
