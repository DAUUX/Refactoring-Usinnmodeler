import React, { useState, useEffect} from 'react';
import { EdgeLabelRenderer, useReactFlow, getSmoothStepPath, useEdges } from 'reactflow';

export default function EditableEdgeLabel({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, id }) {
  const { setEdges } = useReactFlow();
  const [text, setText] = useState('Clique para editar'); // Texto padrão
  const [isEditing, setIsEditing] = useState(false);
  const [labelXY, setLabelXY] = useState({
    x: 0,
    y: 0
  });
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });
  const [dragEndPosition, setDragEndPosition] = useState({ x: 0, y: 0 });
  const edges = useEdges();

  useEffect(() => {
    const edge = edges.find((edge) => edge.id === id);

    if (edge) {
      if (edge.label) {
        setText(edge.label);
      }

      if (edge.labelPosition) {
        setLabelXY(edge.labelPosition);
      }
    }
  }, [id]);

  const handleBlur = () => {
    if (text.length === 0) setText('Clique para editar');
    setIsEditing(false);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (text === 'Clique para editar') setText();
      setIsEditing(false);
    }
  };

  const handleDrag = (e) => {
    setDragEndPosition({ x: e.clientX, y: e.clientY });
  }

  const handleDragStart = (e) => {
    setDragStartPosition({ x: e.clientX, y: e.clientY });
  }

  const handleDragEnd = (e) => {
    setLabelXY((prev) => ({
      x: prev.x + (dragEndPosition.x - dragStartPosition.x),
      y: prev.y + (dragEndPosition.y - dragStartPosition.y)
    }));
  }

  useEffect(() => {
    if (labelXY) {
      setEdges((edges) =>
        edges.map((edge) =>
          edge.id === id
            ? {
                ...edge,
                label: text,
                labelPosition: labelXY,
              }
            : edge
        )
      );
    }
  }, [labelXY, text, id, setEdges]);

  const [_, labelXButton, labelYButton] = getSmoothStepPath({
    sourceX: sourceX,
    sourceY: sourceY,
    sourcePosition: sourcePosition,
    targetX: targetX,
    targetY: targetY,
    targetPosition: targetPosition,
  });

  return (
    <EdgeLabelRenderer>
      <div 
      className=''
      style={{
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${labelXButton}px,${labelYButton}px)`,
        zIndex: 10000,
      }}>
      </div>

      <div
        style={{
          position: 'absolute',
          transform: `translate(-50%, -50%) translate(${labelXY.x + ((sourceX + targetX) / 2)}px,${labelXY.y + (sourceY + targetY) / 2 + (Math.abs(targetY - sourceY) < 20 ? -20 : sourceY < targetY ? -20 : 20)}px)`,
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
        onDrag={handleDrag}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        draggable="true"
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
