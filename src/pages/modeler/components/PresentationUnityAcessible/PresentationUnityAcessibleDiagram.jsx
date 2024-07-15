import { useCallback, useState, useEffect } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Grid } from "@mui/material";
import './text-updater-node.css';


function PresentationUnityAcessibleDiagram({ data }) {

  const [name, setName] = useState(data.name)

  useEffect(() => {
    if (!!data.name.trim()) {
      setName(data.name)
    }
  }, [data.name])

  const onChange = (evt) => {
    setName(evt.target.value)
  }

  const inputElement = document.getElementById('text-input-user-action-diagram');

  inputElement && inputElement.addEventListener('blur', () => {
    data.name = name
  });

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable />
      <Handle type="target" position={Position.Left} isConnectable />
      <Grid container justifyContent={"space-between"} flexDirection={"row"}>
        <Grid item xs={10}>
          <input id="text-input-user-action-diagram" spellCheck="false" placeholder="Ação do Usuário" onChange={onChange} name="text" className="nodrag" value={name} />
        </Grid>
      </Grid>
      <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <PersonOutlineOutlinedIcon sx={{ color: '#000000' }} />
      </Grid>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable
      />
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable
      />
    </div>
  );
}

export default PresentationUnityAcessibleDiagram;
