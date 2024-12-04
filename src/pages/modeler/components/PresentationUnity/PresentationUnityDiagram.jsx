import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TypeNavigations from '../TypeNavigations';

function Subflow({ id, data }) {
  const [isEditing, setIsEditing] = useState(false); 
  const [text, setText] = useState('Unidade de apresentação'); 
  const [isMinimized, setIsMinimized] = useState(false); 
  const { getNode, setNodes } = useReactFlow();

  const handleBlur = () => {
    setIsEditing(false); 
  };

  const handleChange = (e) => {
    setText(e.target.value); 
  };

  const handleClick = () => {
    if(!isMinimized) {
      setIsEditing(true); 
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    setNodes((nds) => 
      nds.map((n) => {
        if (n.parentId === id) {
          return {
            ...n,
            hidden: !isMinimized, 
          };
        }
        return n;
      })
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const [openNavigation, setOpenNavigation] = React.useState(false)
  
  const [anchorEl, setAnchorEl] = React.useState(null);
    
  const handleClickLine = (event) => {
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
      style={{
        width: isMinimized ? 230 : 500,
        height: isMinimized ? 50 : 300,
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
        border: '2px solid #999',
        borderRadius: '10px',
        position: 'relative',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <>
          {isEditing ? (
            <input
              type="text"
              value={text}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
              style={{ position: 'absolute', top: 10, marginLeft: 40 }}
              onKeyDown={handleKeyDown} 
            />
          ) : (
            <span
              style={{ position: 'absolute', top: 10, marginLeft: 40}}
              onClick={handleClick}
            >
              {text}
            </span>
          )}
        </>
        <Button 
          onClick={toggleMinimize} 
          style={{
            minWidth: 'auto', // Para ajustar o tamanho do botão ao ícone
          }}
        >
          {isMinimized ? <AddIcon /> : <RemoveIcon />}
        </Button>
      </div>
      {isMinimized &&(      
      <>
      <Handle type="target" position={Position.Left} isConnectable id='alert-content-target-left'/>
      <Handle type="target" position={Position.Top} isConnectable id='alert-content-target-top'/>
      <Handle type="target" position={Position.Right} isConnectable id='alert-content-target-right'/>
      <Handle type="target" position={Position.Bottom} isConnectable id='alert-content-target-bottom'/>
      <Handle type="source" position={Position.Left} id='alert-content-source-left' onClick={(e) => handleClickLine(e)} />
      <Handle type="source" position={Position.Top} id='alert-content-source-top' onClick={(e) => handleClickLine(e)}/>
      <Handle type="source" position={Position.Right} id='alert-content-source-right' onClick={(e) => handleClickLine(e)}/>
      <Handle type="source" position={Position.Bottom} id='alert-content-source-bottom' onClick={(e) => handleClickLine(e)}/>
      <TypeNavigations 
        edges={['navigation']} 
        onClose={() => handleClose()}
        open={openNavigation}
        anchor={anchorEl}
        close={() => handleClose()}
      />
      </>
      
    )}



    </div>
  );
}

export default Subflow;
