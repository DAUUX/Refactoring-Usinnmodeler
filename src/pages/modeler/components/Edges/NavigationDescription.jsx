import React, { useState } from 'react';
import { SmoothStepEdge } from 'reactflow';
import ArrowHeadMarker from './ArrowHeadMarkerEnd';
import LabelEdge from "./LabelEdge";

export default function Navigation(props) {
  const { sourceX, sourceY, targetX, targetY, id, targetPosition, sourcePosition } = props;

  return (
    <>
      <ArrowHeadMarker />
      <SmoothStepEdge
        id={id}
        sourceX={sourceX}
        sourceY={sourceY}
        targetX={targetX}
        targetY={targetY}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
        style={{ stroke: 'black', strokeWidth: 2 }}
        markerEnd="url(#arrowhead)"
      />
      <LabelEdge 
        sourceX={sourceX} 
        sourceY={sourceY} 
        targetX={targetX} 
        targetY={targetY}
      />
    </>
  );
}
