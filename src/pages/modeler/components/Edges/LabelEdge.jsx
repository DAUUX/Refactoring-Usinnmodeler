import React, { useState } from 'react';
import { EdgeLabelRenderer } from 'reactflow';

export default function EditableEdgeLabel({ sourceX, sourceY, targetX, targetY }) {
  const [text, setText] = useState('Clique para editar'); // Texto padrão
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = () => {
    if (text.length === 0) setText('Clique para editar');
    setIsEditing(false);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (text.length === 0) setText('Clique para editar');
      setIsEditing(false);
    }
  };

  const labelX = (sourceX + targetX) / 2;
  const labelY = (sourceY + targetY) / 2;

  const offsetY = 
    Math.abs(targetY - sourceY) < 20 ? -20 : sourceY < targetY ? -20 : 20;

  return (
    <EdgeLabelRenderer>
      <div
        style={{
          position: 'absolute',
          transform: `translate(-50%, -50%) translate(${labelX}px,${labelY + offsetY}px)`,
          fontSize: 12,
          pointerEvents: 'all',
          background: '#DFDFDF',
          padding: isEditing ? '2px 4px' : '0',
          border: isEditing ? '1px solid black' : 'none',
          borderRadius: '4px',
          boxShadow: isEditing ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none',
          cursor: isEditing ? 'text' : 'pointer',
          maxWidth: '150px',
          wordWrap: 'break-word',
          whiteSpace: isEditing ? 'nowrap' : 'normal',
          overflow: 'hidden',
          textAlign: 'center',
          zIndex: 9999
        }}
        className="nodrag nopan"
        onClick={handleClick}
      >
        {isEditing ? (
          <textarea
            type="text"
            placeholder="descrição"
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
          <span style={{ zIndex: 10 }}>{text}</span>
        )}
      </div>
    </EdgeLabelRenderer>
  );
}
