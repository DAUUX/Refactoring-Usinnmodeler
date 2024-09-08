import { Handle, Position } from 'reactflow';
import SistemProcess from "./SistemProcess";
import React from 'react';
import TypeNavigations from '../TypeNavigations';

function SistemProcessDiagram() {
  const [openNavigation, setOpenNavigation] = React.useState(false)
  
  const [anchorEl, setAnchorEl] = React.useState(null);
    
  const handleClick = (event) => {
    console.log(event)
    setAnchorEl(event.currentTarget);
    setOpenNavigation(true)
  };

  const handleClose = () => {
    setOpenNavigation(false);
    setAnchorEl(null)
  }

  return (
    <>
      <Handle type="target" position={Position.Left} isConnectable id='sistem-process-target-left'/>
      <Handle type="target" position={Position.Top} isConnectable id='sistem-process-target-top'/>
      <Handle type="target" position={Position.Right} isConnectable id='sistem-process-target-right'/>
      <Handle type="target" position={Position.Bottom} isConnectable id='sistem-process-target-bottom'/>
      <Handle type="source" position={Position.Left} id='sistem-process-source-left' onClick={(e) => handleClick(e)} />
      <Handle type="source" position={Position.Top} id='sistem-process-source-top' onClick={(e) => handleClick(e)}/>
      <Handle type="source" position={Position.Right} id='sistem-process-source-right' onClick={(e) => handleClick(e)}/>
      <Handle type="source" position={Position.Bottom} id='sistem-process-source-bottom' onClick={(e) => handleClick(e)}/>
      <SistemProcess />
      <TypeNavigations 
        edges={['query-data', 'unsucess-feedback', 'sucess-feedback', 'cancel-transition']} 
        onClose={() => handleClose()}
        open={openNavigation}
        anchor={anchorEl}
        close={() => handleClose()}
      />
    </>
  );
}

export default SistemProcessDiagram;
