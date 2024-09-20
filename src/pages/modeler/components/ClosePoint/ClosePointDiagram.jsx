import { Handle, NodeResizer, Position } from 'reactflow';
import ClosePoint from "./ClosePoint";
import TypeNavigations from '../TypeNavigations';
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
