import React, { useState, useEffect } from 'react';
import { Handle, Position, NodeResizeControl } from 'reactflow';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Grid } from "@mui/material";
import './text-updater-node.css';
import TypeNavigations from '../TypeNavigations';


function UserActionDiagram({ data }) {

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
      />
      <Handle
        type="source"
        position={Position.Right}
        onClick={(e) => handleClick(e)} 
        id='user-action-source-right'
      />
      <Handle 
        type="source"
        position={Position.Top}
        onClick={(e) => handleClick(e)}
        id='user-action-source-top'
      />
      <Handle 
        type="source"
        position={Position.Left} 
        onClick={(e) => handleClick(e)}
        id='user-action-source-left'
      />
      <TypeNavigations 
        edges={['transition', 'cancel-transition', 'navigation', 'query-data']} 
        onClose={() => handleClose()}
        open={openNavigation}
        anchor={anchorEl}
        close={() => handleClose()}
      />
    </div>
  );
}

export default UserActionDiagram;
