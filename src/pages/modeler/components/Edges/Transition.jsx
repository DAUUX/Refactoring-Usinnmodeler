import React from 'react';
import { BaseEdge, getStraightPath } from 'reactflow';

export default function Navigation(props) {
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
            id="arrowhead-start"
            markerWidth="10"
            markerHeight="7"
            refX="0"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="10 0, 0 3.5, 10 7" fill="black" />
          </marker>
          <marker
            id="arrowhead-end"
            markerWidth="10"
            markerHeight="7"
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
        markerStart="url(#arrowhead-start)"
        markerEnd="url(#arrowhead-end)"
      />
    </>
  );
}
