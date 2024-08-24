import React from 'react';
import { BaseEdge, getStraightPath } from 'reactflow';

export default function QueryData(props) {
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
            x={targetX - sourceX - 30} 
            y={targetY - sourceY - 40} 
            width="30" 
            height="30" 
            viewBox="0 0 30 30"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="1" y="1" width="28" height="28" rx="5" ry="5" />
            <line x1="1" y1="15" x2="29" y2="15" />
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
