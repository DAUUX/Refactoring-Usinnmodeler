import React from 'react';
import { SmoothStepEdge } from 'reactflow';
import MessageIcon from '@mui/icons-material/Message';
import ArrowHeadMarker from './ArrowHeadMarkerEnd';
import IconPosition from "./IconPosition";
import LabelEdge from "./LabelEdge";

export default function FeedbackUnsucess(props) {
  const { sourceX, sourceY, targetX, targetY, id, sourcePosition, targetPosition } = props;

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
        style={{ 
          stroke: 'black', 
          strokeWidth: 2, 
          strokeDasharray: '5,5' 
        }}
        markerEnd="url(#arrowhead)"
      />
      <LabelEdge 
        sourceX={sourceX} 
        sourceY={sourceY} 
        targetX={targetX} 
        targetY={targetY}
        id={id}
      /> 
      <IconPosition 
        sourceX={sourceX}
        sourceY={sourceY}
        targetX={targetX}
        targetY={targetY}
        icon={<MessageIcon color='black'/>}
      />
    </>
  );
}
