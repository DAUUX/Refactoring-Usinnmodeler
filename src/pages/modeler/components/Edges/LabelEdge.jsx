import React, { useState, useCallback, useEffect } from 'react';
import { EdgeLabelRenderer, useEdges } from 'reactflow';

export default function EditableEdgeLabel({ sourceX, sourceY, targetX, targetY, id, onTest }) {
  const [text, setText] = useState('Clique para editar'); // Texto padrão
  const [isEditing, setIsEditing] = useState(false);
  const [labelXY, setLabelXY] = useState({
    x: (sourceX + targetX) / 2,
    y: (sourceY + targetY) / 2 + (Math.abs(targetY - sourceY) < 20 ? -20 : sourceY < targetY ? -20 : 20)
  });
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });
  const [dragEndPosition, setDragEndPosition] = useState({ x: 0, y: 0 });

  const [edges, setEdges] = useEdges();

  // console.log(edges);

  // const updateEdges = useCallback(() => {
  //   setEdges((prevEdges) =>
  //     prevEdges.map((edge) => {
  //       if (edge.id === id) {
  //         return {
  //           ...edge,
  //           label: text,
  //           labelPosition: labelXY,
  //         };
  //       }
  //       return edge;
  //     })
  //   );
  // }, [text, labelXY, setEdges]);

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
    onTest(id, text);
  }

  // useEffect(() => {
  //   if (text !== 'Clique para editar') {
  //     setEdges((oldEdges) => {
  //       oldEdges.map((edge) => {
  //         console.log(edge);
  //       })
  //     })
  //   }
  // }, [text, labelXY])

  return (
    <EdgeLabelRenderer>
      <div
        style={{
          position: 'absolute',
          transform: `translate(-50%, -50%) translate(${labelXY.x}px,${labelXY.y}px)`,
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
