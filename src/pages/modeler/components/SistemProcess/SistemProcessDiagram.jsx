import { Handle, Position } from 'reactflow';
import SistemProcess from "./SistemProcess";

function SistemProcessDiagram() {

  return (
    <>
      <Handle type="target" position={Position.Left} isConnectable />
      <Handle type="target" position={Position.Top} isConnectable />
      <Handle type="target" position={Position.Right} isConnectable />
      <Handle type="target" position={Position.Bottom} isConnectable />
      <SistemProcess />
    </>
  );
}

export default SistemProcessDiagram;
