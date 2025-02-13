import React, { useState } from 'react';
import { NodeResizer } from 'reactflow';
import Seta from "./seta.png";

function Subflow({ id, data, selected }) {
  const [isEditing, setIsEditing] = useState(false); 
  const [text, setText] = useState('Unidade de apresentação'); 

  const handleBlur = () => {
    if (text.length > 50 || text.length < 2)  {
      setText('Unidade de apresentação')
    }
    setIsEditing(false); 
  };

  const handleChange = (e) => {
    setText(e.target.value); 
  };

  const handleClick = () => {
      setIsEditing(true); 
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (text.length > 50 || text.length < 2)  {
        setText('Unidade de apresentação')
      }
      setIsEditing(false);
    }
  };

  return (
    <div
      style={{
        width:'100%',
        height:'100%',
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
        <span style={{width:500, height:300}}>
          <>
            {isEditing ? (
              <input
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={text}
                autoFocus
                title='O número de caracteres deve ser entre 2 e 50'
                style={{ position: 'absolute', top: 10, marginLeft: 10 }}
                onKeyDown={handleKeyDown} 
              />
            ) : (
              <span
                style={{ position: 'absolute', top: 10, marginLeft: 10}}
                onClick={handleClick}
              >
                {text} <img width={20} src={Seta} alt="unidade de apresentação"/>
              </span>
            )}
            
          </>
        </span>
      </div>
      <NodeResizer
        isVisible={selected}
        minWidth={500}
        minHeight={300}
      />
    </div>
  );
}

export default Subflow;
