import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useReactFlow } from 'reactflow';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Seta from "./seta.png";

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

  return (
    <div
      style={{
        width: isMinimized ? 230 : 500,
        height: isMinimized ? 50 : 300,
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
        border: '2px solid #999',
        borderRadius: '10px',
        position: 'relative',
        overflow: 'hidden'
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
              {text} <img width={20} src={Seta}/>
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
    </div>
  );
}

export default Subflow;
