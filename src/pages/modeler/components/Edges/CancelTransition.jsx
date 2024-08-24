import React from 'react';
import { BaseEdge, getStraightPath } from 'reactflow';

export default function CancelTransition(props) {
  const { sourceX, sourceY, targetX, targetY, id } = props;
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

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
        <g transform={`translate(${sourceX}, ${sourceY})`}>
          <svg
            x={targetX - sourceX - 20}
            y={targetY - sourceY - 30} 
            width="20" 
            height="20" 
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </g>
      </svg>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: 'black', strokeWidth: 2 }}
        markerEnd="url(#arrowhead)"
      />
    </>
  );
}
