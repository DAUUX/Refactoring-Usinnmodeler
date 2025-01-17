import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import usinnModeler from "../../../../assets/icons/logo-min-blue.png";
import { AppBar, Toolbar, IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import './index.css'

// Icons
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';


const Navbar = ({name,  onSave, handleUndo, handleRedo, handleDelete, onDownload, handleCopy, handleRecort, handlePaste}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('Novo Diagrama');
  
  const navigate = useNavigate()

    useEffect(() => {
      if(name && name.length>0) {
        setValue(name);
      }
    }, [name]);

    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        setIsEditing(false);
      }
    };
  
    const handleBlur = () => {
      setIsEditing(false);
    };


   // Corrected useEffect for keydown
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key?.toLowerCase();
      switch (true) {
          case e.ctrlKey && key === "s":
            e.preventDefault();
            onSave(value);
            break;
          // Add more cases if needed
          default:
            break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [value, onSave]);
  return (
    <AppBar position="static" color="default" style={{background: '#A9A9A9'}}>
      <Toolbar>
        <div className="d-flex flex-column mb-4" style={{marginTop: 20, marginRight:30}}>
          <img src={usinnModeler} alt="logo USINN" onClick={() => navigate('/dashboard')}/>
        </div>
        {isEditing ? (
          <TextField
            value={value}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            onBlur={handleBlur}
            autoFocus
            variant="standard"
            />
        ) : (
            <span
            variant="h6"
            sx={{ flexGrow: 1 }}
            onClick={() => setIsEditing(true)}
            >
            {value}
            </span>
        )}
          
          
          <div className="icon-bar">
    <div className="icon-container">
        <IconButton color="inherit" className="icon-button" onClick={() => handleUndo()}>
            <UndoIcon />
        </IconButton>
        <div className="tooltip" style={{textAlign: 'center'}}>Desfazer <br/> <p className='tooltip-small'>Ctrl + Z</p></div>
    </div>

    <div className="icon-container">
        <IconButton color="inherit" className="icon-button" onClick={() => handleRedo()}>
            <RedoIcon />
        </IconButton>
        <div className="tooltip" style={{textAlign: 'center'}}>Refazer  <br/> <p className='tooltip-small'>Ctrl + Shift + Z</p></div>
    </div>

    <div className="icon-container">
        <IconButton color="inherit" className="icon-button" onClick={() => onSave(value)}>
            <SaveIcon />
        </IconButton>
        <div className="tooltip" style={{textAlign: 'center'}}>Salvar <br/> <p className='tooltip-small'>Ctrl + S</p></div>
    </div>

    <div className="icon-container">
        <IconButton color="inherit" className="icon-button" onClick={() => handleDelete()}>
            <DeleteOutlineIcon />
        </IconButton>
        <div className="tooltip" style={{textAlign: 'center'}}>Excluir<br /><p className='tooltip-small'>Backspace</p></div>
    </div>

    <div className="icon-container">
        <IconButton color="inherit" className="icon-button" onClick={() => handleRecort()}>
            <ContentCutIcon />
        </IconButton>
        <div className="tooltip" style={{textAlign: 'center'}}>Cortar<br /><p className='tooltip-small'>Ctrl + X</p></div>
    </div>

    <div className="icon-container">
        <IconButton color="inherit" className="icon-button" onClick={() => handleCopy()}>
            <ContentCopyIcon />
        </IconButton>
        <div className="tooltip" style={{textAlign: 'center'}}>Copiar<br /><p className='tooltip-small'>Ctrl + C</p></div>
    </div>

    <div className="icon-container">
        <IconButton color="inherit" className="icon-button" onClick={() => handlePaste()}>
            <ContentPasteIcon />
        </IconButton>
        <div className="tooltip " style={{textAlign: 'center'}}>Colar<br /><p className='tooltip-small'>Ctrl + V</p></div>
    </div>

    <div className="icon-container">
        <IconButton color="inherit" className="icon-button" onClick={() => onDownload()}>
            <DownloadIcon />
        </IconButton>
        <div className="tooltip" style={{textAlign: 'center'}}>Baixar</div>
    </div>
</div>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
