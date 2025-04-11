import * as React from 'react';
import { Handle, Position } from 'reactflow';
import OpenPoint from "./OpenPoint";
import TypeNavigations from "../TypeNavigations";
import { useModeler } from "../../../../context/modelerContext";

function OpenPointDiagram({ data }, props) {
  const [openNavigation, setOpenNavigation] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [ultimaseta, setUltimaseta] = React.useState("navigation"); // Estado elevado
  const { setCurrentEdge } = useModeler(); // Supondo que useModeler esteja disponível

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenNavigation(true);
  };

  const handleClose = () => {
    setOpenNavigation(false);
    setAnchorEl(null);
  };


  return (
    <>
      <OpenPoint />
      <Handle
        type="source"
        position={Position.Right}
        onClick={(e) => handleClick(e)}
        onMouseEnter={(e) => {if (e.buttons === 0) {setCurrentEdge(ultimaseta);}}}
        id='open-point-source-right'
      />
      <TypeNavigations
        edges={["navigation"]}
        open={openNavigation}
        anchor={anchorEl}
        close={handleClose}
        ultimaseta={ultimaseta} // Passa o estado como prop
        setUltimaseta={setUltimaseta} // Passa a função de atualização como prop
      />
    </>
  );
}

export default OpenPointDiagram;