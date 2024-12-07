import React from 'react';
import { getStraightPath, SmoothStepEdge } from 'reactflow';
import LabelEdge from "./LabelEdge";
import ArrowHeadMarkerStartEnd from "./ArrowHeadMarkerStartEnd";
export default function Navigation(props) {
  const { sourceX, sourceY, targetX, targetY, id, sourcePosition, targetPosition } = props;
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <ArrowHeadMarkerStartEnd />
      <SmoothStepEdge
        id={id}
        path={edgePath}
        style={{ stroke: 'black', strokeWidth: 2 }}
        sourceX={sourceX}
        sourceY={sourceY}
        targetX={targetX}
        targetY={targetY}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
        markerStart="url(#arrowhead-start)"
        markerEnd="url(#arrowhead-end)"
      />
      <LabelEdge 
        sourceX={sourceX} 
        sourceY={sourceY} 
        targetX={targetX} 
        targetY={targetY}
        id={id}
      />
    </>
  );
}
