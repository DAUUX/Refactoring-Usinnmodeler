import React from 'react';
import { getStraightPath, SmoothStepEdge } from 'reactflow';
import ArrowHeadMarker from './ArrowHeadMarkerEnd';
import IconPosition from "./IconPosition";
import MessageIcon from '@mui/icons-material/Message';
import LabelEdge from "./LabelEdge";

export default function FeedbackSucess(props) {
  const { sourceX, sourceY, targetX, targetY, id, sourcePosition, targetPosition } = props;
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

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
