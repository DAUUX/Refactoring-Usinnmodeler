import React, {useEffect, useState} from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { TextField } from '@mui/material';
import usinnModeler from "../../../../assets/icons/logo-min-blue.png";
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';

const Navbar = ({onDownload, onSave, name}) => {
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
            
        <IconButton color="inherit" onClick={() => onSave(value)}>
            <SaveIcon style={{color: 'white'}} />
        </IconButton>

        <IconButton color="inherit" onClick={() => onDownload()}>
            <DownloadIcon style={{color: 'white'}} />
        </IconButton>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
