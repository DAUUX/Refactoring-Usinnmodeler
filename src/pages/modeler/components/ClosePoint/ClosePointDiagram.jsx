import { Handle, Position } from 'reactflow';
import ClosePoint from "./ClosePoint";

function ClosePointDiagram({ data, isConnectable }) {

  return (
    <>
      <Handle type="target" position={Position.Left} isConnectable />
      <ClosePoint />
    </>
  );
}

export default ClosePointDiagram;
