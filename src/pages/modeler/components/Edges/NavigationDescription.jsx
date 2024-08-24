import React, { useState } from 'react';
import { BaseEdge, getStraightPath, EdgeLabelRenderer, getSmoothStepPath } from 'reactflow';

export default function Navigation(props) {
  const { sourceX, sourceY, targetX, targetY, id } = props;
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const [text, setText] = useState('Clique para editar'); // Texto padrão
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = () => {
    if(text.length === 0) setText('Clique para editar')
    setIsEditing(false);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if(text.length === 0) setText('Clique para editar')
      setIsEditing(false);
    }
  };

  return (
    <>
      <svg>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="10"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="black" />
          </marker>
        </defs>
      </svg>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: 'black', strokeWidth: 2 }}
        markerEnd="url(#arrowhead)"
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY-10}px)`,
            fontSize: 12,
            pointerEvents: 'all', // Ativar interações do usuário
            background: isEditing ? 'white' : 'transparent',
            padding: isEditing ? '2px 4px' : '0',
            border: isEditing ? '1px solid black' : 'none',
            borderRadius: '4px',
            boxShadow: isEditing ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none',
            cursor: isEditing ? 'text' : 'pointer',
            maxWidth: '150px', 
            wordWrap: 'break-word', 
            whiteSpace: isEditing ? 'nowrap' : 'normal',
            overflow: 'hidden', 
          }}
          className="nodrag nopan"
          onClick={handleClick} 
        >
          {isEditing ? (
            <textarea
              type="text"
              placeholder='descrição'
              value={text}
              onChange={(e) => setText(e.target.value)} 
              onBlur={handleBlur}
              autoFocus 
              onKeyDown={handleKeyDown}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
              }}
            />
          ) : (
            <span>{text}</span>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
