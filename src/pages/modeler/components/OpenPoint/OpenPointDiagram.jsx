import * as React from 'react';
import { Handle, Position } from 'reactflow';
import OpenPoint from "./OpenPoint";
import TypeNavigations from "../TypeNavigations";

function OpenPointDiagram({ data }, props) {
  const [openNavigation, setOpenNavigation] = React.useState(false)
  
  const [anchorEl, setAnchorEl] = React.useState(null);
    
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <OpenPoint />
      <Handle type="source" position={Position.Right}/>
      <TypeNavigations 
        nodeName={"OpenPointDiagram"} 
        onChange={() => {
          data.ref.current = "navigation"
        }}
        onClose={() => setOpenNavigation(false)}
        open={openNavigation}
        anchor={anchorEl}
        close={() => setAnchorEl(null)}
      />
    </>
  );
}

export default OpenPointDiagram;
