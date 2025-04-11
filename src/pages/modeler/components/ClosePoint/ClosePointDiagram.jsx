import { Handle, Position } from 'reactflow';
import ClosePoint from "./ClosePoint";
import React from 'react';

function ClosePointDiagram({ data, isConnectable, selected }) {

  return (
    <>
      <ClosePoint />
      <Handle type="target" position={Position.Left} isConnectable/>
    </>
  );
}

export default ClosePointDiagram;
