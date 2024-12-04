import * as React from 'react';
import { Handle, Position } from 'reactflow';
import OpenPoint from "./OpenPoint";
import TypeNavigations from "../TypeNavigations";

function OpenPointDiagram({ data }, props) {
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
      <OpenPoint />
      <Handle 
        type="source" 
        position={Position.Right} 
        onClick={(e) => handleClick(e)} 
      />
      <TypeNavigations 
        edges={['navigation']} 
        onClose={() => handleClose()}
        open={openNavigation}
        anchor={anchorEl}
        close={() => handleClose()}
        parent="none"
      />
    </>
  );
}

export default OpenPointDiagram;
