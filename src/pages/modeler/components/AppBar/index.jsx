import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import usinnModeler from "../../../../assets/icons/usinn-logo-big.png";
import { AppBar, Toolbar, IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import './index.css'



// Icons
import SaveIcon from '../../../../assets/icons/toolbar-save-icon.svg';
import DownloadIcon from '@mui/icons-material/Download';
import UndoIcon from '../../../../assets/icons/toolbar-redo-icon.svg';
import RedoIcon from '../../../../assets/icons/toolbar-undo-icon.svg';
import DeleteOutlineIcon from '../../../../assets/icons/toolbar-trash-icon.svg';
import ContentCutIcon from '../../../../assets/icons/toolbar-tesoura-icon.svg';
import ContentCopyIcon from '../../../../assets/icons/toolbar-copy-icon.svg';
import ContentPasteIcon from '../../../../assets/icons/toolbar-paste-icon.svg';
import UserProfile from '../../../../components/UserProfile';
import fitview from '../../../../assets/icons/toolbar-fitview-icon.svg'
import zoomIcon from '../../../../assets/icons/toolbar-zoom-icon.svg'
import zoomOutIcon from '../../../../assets/icons/toolbar-zoom-out-icon.svg'
import exportDiagramIcon from '../../../../assets/icons/toolbar-export-icon.svg'
import questionIcon from '../../../../assets/icons/toolbar-question-icon.svg' 
import agrupar from '../../../../assets/icons/toolbar-agrupar-icon.svg'
import desagrupar from '../../../../assets/icons/toolbar-desagrupar-icon.svg'
import ShareDiagramModal from '../../../../components/ShareDiagramModal';


const Navbar = ({name,  onSave, handleUndo, handleRedo, handleDelete, onDownload, handleCopy, handleRecort, handlePaste, oculteManipulationIconsForReader, isOwner, diagram_id}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('Novo Diagrama');
  const [shareModalId] = useState('ShareDiagramModal');
  
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
    <AppBar position="static" style={{marginBottom: "2px"}} >
      <Toolbar className='d-flex flex-column bg-primary p-0'>
        
      <div className='up-funcions d-flex align-items-center justify-content-between w-100 px-4'>

        <div className="title-diagram d-flex align-items-center" style={{ marginTop: 20,marginBottom:10, marginRight: 30 }}>
          <img
            className='h1 img-fluid'
            src={usinnModeler}
            alt="logo USINN"
            onClick={() => navigate('/dashboard')}
            style={{ marginRight: 20, width: '50px',cursor: 'pointer'  }} // Espaço entre a imagem e o texto
          />
          <div className='d-flex flex-column h4 mb-0'>
            <div className='mb-2'>
              {isEditing && !oculteManipulationIconsForReader ? (
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
            </div>
            <p className='h6'
            onClick={() => navigate('/dashboard/documentos')}
            style={{ cursor: 'pointer'  }}
            >{"Documentos > Meus documentos"}</p>
          </div>
        </div>
        <div className=" justify-content-end" id="modelerNavbarToggle">
            <div className="d-flex align-items-center py-3 py-lg-0">
                <span>
                    {diagram_id && isOwner &&
                        <button data-bs-toggle="modal" data-bs-target={`#${shareModalId}`} className="btn btn-light btn-sm order-last text-primary me-4" title="Compartilhar">
                            Compartilhar <i className="bi bi-share-fill fs-7"></i>
                        </button>
                    }
                </span>
                
                <span className='user-profile text-clor-white' color='white' style={{ color: 'white' }}>
                    <UserProfile textColor = "white"/>
                </span>
            </div>
        </div>
      </div>

          

          <div className="down-funcions-bar w-100 " style={{ backgroundColor: 'white' }} hidden={oculteManipulationIconsForReader}>

            <div className="icon-container d-flex align-items-center pe-4" onClick={() => onSave(value)} style={{cursor: 'pointer', paddingLeft: '3em' }}>
                  <img 
                    src={SaveIcon} 
                    alt="Salvar" 
                    style={{ width: '24px', height: '24px', marginRight: '1em' }} 
                  />
        
                <p className='' style={{ color: 'black', marginBottom:'0px' }}>Salvar</p>
                <div className="tooltip" style={{textAlign: 'center'}}>Salvar <br/> <p className='tooltip-small'>Ctrl + S</p></div>
            </div>

            <div className="icon-container d-flex align-items-center ps-3 pe-3" onClick={() => onDownload()} style={{cursor: 'pointer'}}>
              <img 
                        src={exportDiagramIcon} 
                        alt="Exportar" 
                        style={{ width: '20px', height: '20px', marginRight: '1em', marginBottom:'1px' }}     
                />
                <p className='' style={{ color: 'black', marginBottom:'0px' }}>Exportar diagrama</p>
            </div>

            <div className="icon-container-NoBorder d-flex align-items-center ps-3 pe-1" onClick={() => handleUndo()} style={{cursor: 'pointer'}}>
              <img 
                src={RedoIcon} 
                alt="Refazer" 
                style={{ width: '24px', height: '24px', marginRight: '1em',padding:'1px' }} 
                
              />
              <div className="tooltip" style={{textAlign: 'center'}}>Desfazer <br/> <p className='tooltip-small'>Ctrl + Z</p></div>
            </div>


            <div className="icon-container d-flex align-items-center ps-3 pe-1" onClick={() => handleRedo()} style={{cursor: 'pointer'}}>
              <img 
                src={UndoIcon} 
                alt="Desfazer" 
                style={{ width: '24px', height: '24px', marginRight: '1em',padding:'1px' }} 
                
              />
              <div className="tooltip" style={{textAlign: 'center'}}>Refazer  <br/> <p className='tooltip-small'>Ctrl + Shift + Z</p></div>
            </div>

            <div className="icon-container-NoBorder d-flex align-items-center ps-4 pe-0" >
              <img 
                  src={agrupar} 
                  alt="Agrupar" 
                  style={{ width: '24px', height: '24px', marginRight: '1em',padding:'1px' }} 
                  
                />
            </div>

            <div className="icon-container d-flex align-items-center ps-4 pe-3" >
              <img 
                  src={desagrupar} 
                  alt="Agrupar" 
                  style={{ width: '24px', height: '24px', marginRight: '1em',padding:'1px' }} 
                  
                />
            </div>

            <div className="icon-container-NoBorder d-flex align-items-center ps-4" onClick={() => handleDelete()} style={{cursor: 'pointer'}}>
              <img 
                  src={DeleteOutlineIcon} 
                  alt="Excluir" 
                  style={{ width: '24px', height: '24px', marginRight: '1em',padding:'1px' }} 
                  
                />
                <div className="tooltip" style={{textAlign: 'center'}}>Excluir<br /><p className='tooltip-small'>Backspace</p></div>
            </div>

            <div className="icon-container-NoBorder d-flex align-items-center ps-4" onClick={() => handleRecort()} style={{cursor: 'pointer'}}>
              <img 
                    src={ContentCutIcon} 
                    alt="Cortar" 
                    style={{ width: '24px', height: '24px', marginRight: '1em',padding:'1px' }} 
                    
                  />
                <div className="tooltip" style={{textAlign: 'center'}}>Cortar<br /><p className='tooltip-small'>Ctrl + X</p></div>
            </div>


            <div className="icon-container-NoBorder d-flex align-items-center ps-4" onClick={() => handleCopy()} style={{cursor: 'pointer'}}>
              <img 
                      src={ContentCopyIcon} 
                      alt="Copiar" 
                      style={{ width: '27px', height: '27px', marginRight: '1em' }} 
                      
              />
              <div className="tooltip" style={{textAlign: 'center'}}>Copiar<br /><p className='tooltip-small'>Ctrl + C</p></div>
            </div>

            <div className="icon-container d-flex align-items-center ps-4" onClick={() => handlePaste()} style={{cursor: 'pointer'}}>
              <img 
                        src={ContentPasteIcon} 
                        alt="Colar" 
                        style={{ width: '27px', height: '27px', marginBottom:'1px' }} 
                        
                />
              <div className="tooltip " style={{textAlign: 'center'}}>Colar<br /><p className='tooltip-small'>Ctrl + V</p></div>
            </div>

            <div className="icon-container-NoBorder d-flex align-items-center ps-4">
              <img 
                        src={fitview} 
                        alt="Ajustar visão" 
                        style={{ width: '20px', height: '20px', marginRight: '1em', marginBottom:'1px' }} 
                        
                />
              <div className="tooltip " style={{textAlign: 'center'}}>Ajustar visão<br /></div>
            </div>

            <div className="icon-container-NoBorder d-flex align-items-center ps-3">
              <img 
                        src={zoomIcon} 
                        alt="Ampliar" 
                        style={{ width: '20px', height: '20px', marginRight: '1em', marginBottom:'1px' }} 
                        
                />
              <div className="tooltip " style={{textAlign: 'center'}}>Ampliar<br /></div>
            </div>

            <div className="icon-container d-flex align-items-center ps-3 pe-3">
              <img 
                        src={zoomOutIcon} 
                        alt="Ampliar" 
                        style={{ width: '20px', height: '20px', marginRight: '1em', marginBottom:'1px' }} 
                        
                />
              <div className="tooltip " style={{textAlign: 'center'}}>Diminuir zoom<br /></div>
            </div>

            <div className="icon-container d-flex align-items-center ps-4 pe-2">
              <img 
                        src={questionIcon} 
                        alt="Ampliar" 
                        style={{ width: '20px', height: '20px', marginRight: '1em', marginBottom:'1px' }} 
                        
                />
            </div>

            <ShareDiagramModal id={shareModalId} diagram_id={diagram_id} />
              
          </div>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
