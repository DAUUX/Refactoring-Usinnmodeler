import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import usinnModeler from "../../../../assets/icons/usinn-logo-big.png";
import { AppBar, Toolbar } from '@mui/material';
import { TextField } from '@mui/material';
import { useReactFlow } from 'reactflow';
import { Modal } from 'bootstrap';
import './index.css'



// Icons
import SaveIcon from '../../../../assets/icons/toolbar-save-icon.svg';
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
import agrupar from '../../../../assets/icons/toolbar-agrupar-icon.svg'
import desagrupar from '../../../../assets/icons/toolbar-desagrupar-icon.svg'
import QuestionIcon from './QuestionIcon';
import ShareDiagramModal from '../../../../components/ShareDiagramModal';
import Notifications from "../../../../components/Notifications"


const Navbar = ({name,  onSave, handleUndo, handleRedo, handleDelete, onDownload, handleCopy, handleRecort, handlePaste, deselectAll, selectAll, oculteManipulationIconsForReader, isOwner, diagram_id}) => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
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

  const openSharedModal = () => {
    const modal = new Modal(`#${shareModalId}`)          
    modal.show();
  }
  
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
            tabIndex="0"
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
                  InputProps={{style: { color: 'white' }}}
                  sx={{'& .MuiInput-underline:after': {borderBottomColor: 'white'}}}
                />
              ) : (
                <span
                  variant="h6"
                  sx={{ flexGrow: 1 }}
                  onClick={() => setIsEditing(true)}
                  tabIndex="0"
                >
                  {value}
                </span>
              )}
            </div>
            <p 
              className='h6'
              onClick={() => navigate('/dashboard/documentos')}
              style={{ cursor: 'pointer'  }}
              tabIndex="0"
            >{"Documentos > Meus documentos"}</p>
          </div>
        </div>
        <div className=" justify-content-end" id="modelerNavbarToggle">
            <div className="d-flex align-items-center py-3 py-lg-0">
                <span>
                    {diagram_id && isOwner &&
                        <button data-bs-target={`#${shareModalId}`} className="btn btn-light btn-sm order-last text-primary me-4" title="Compartilhar" onClick={openSharedModal}>
                            Compartilhar <i className="bi bi-share-fill fs-7"></i>
                        </button>
                    }
                </span>
                
                <span>
                  <div className="d-flex align-items-center gap-2">
                      <Notifications iconColor={'text-white'}/>
                      <UserProfile textColor = "white"/>
                  </div>
                </span>
            </div>
        </div>
      </div>

          

          <div className="down-funcions-bar w-100 " style={{ backgroundColor: 'white' }} hidden={oculteManipulationIconsForReader}>

            <div tabIndex="0" className="icon-container d-flex align-items-center pe-4" onClick={() => onSave(value)} style={{cursor: 'pointer', paddingLeft: '3em' }}>
                  <img 
                    src={SaveIcon} 
                    alt="Salvar diagrama" 
                    style={{ width: '24px', height: '24px', marginRight: '1em'}} 
                  />
                  
                <div className="tooltip" style={{textAlign: 'center',left:"55px" }}>
                <p className='m-0'>Salvar</p>
                <p className='tooltip-small'>Ctrl + S</p>
                </div>
            </div>

            <div tabIndex="0" className="icon-container d-flex align-items-center ps-3 pe-3" onClick={() => onDownload()} style={{cursor: 'pointer'}}>
              <img 
                src={exportDiagramIcon} 
                alt="Exportar este diagrama" 
                style={{ width: '20px', height: '20px', marginRight: '1em', marginBottom:'1px' }}     
              />
              <p className='' style={{ color: 'black', marginBottom:'0px' }}>Exportar diagrama</p>
            </div>

            <div tabIndex="0" className="icon-container d-flex align-items-center ps-3 pe-1" onClick={() => handleUndo()} style={{cursor: 'pointer'}}>
              <img 
                src={RedoIcon} 
                alt="Refazer ações" 
                style={{ width: '24px', height: '24px', marginRight: '1em',padding:'1px' }} 
                
              />
              <div className="tooltip" style={{textAlign: 'center'}}>Desfazer <br/> <p className='tooltip-small'>Ctrl + Z</p></div>
            </div>


            <div tabIndex="0" className="icon-container d-flex align-items-center ps-3 pe-1" onClick={() => handleRedo()} style={{cursor: 'pointer'}}>
              <img 
                src={UndoIcon} 
                alt="Desfazer ações" 
                style={{ width: '24px', height: '24px', marginRight: '1em',padding:'1px' }} 
                
              />
              <div className="tooltip" style={{textAlign: 'center'}}>Refazer  <br/> <p className='tooltip-small'>Ctrl + Shift + Z</p></div>
            </div>

            <div tabIndex="0" className="icon-container d-flex align-items-center ps-3 pe-1" onClick={() => deselectAll()} style={{cursor: 'pointer'}} >
              <img 
                  src={agrupar} 
                  alt="Selecionar tudo" 
                  style={{ width: '24px', height: '24px', marginRight: '1em',padding:'1px' }} 
                  
                />
                <div className="tooltip" style={{textAlign: 'center', left:"25px"}}>Desmarcar Tudo</div>
            </div>

            <div tabIndex="0" className="icon-container d-flex align-items-center ps-3 pe-1" onClick={() => selectAll()} style={{cursor: 'pointer'}}>
              <img 
                  src={desagrupar} 
                  alt="Desmarcar tudo" 
                  style={{ width: '24px', height: '24px', marginRight: '1em',padding:'1px' }} 
                  
                />
                <div className="tooltip" style={{textAlign: 'center', left:"25px"}}>Marcar Tudo</div>
            </div>

            <div tabIndex="0" className="icon-container d-flex align-items-center ps-3 pe-1" onClick={() => handleDelete()} style={{cursor: 'pointer'}}>
              <img 
                  src={DeleteOutlineIcon} 
                  alt="Excluir componentes" 
                  style={{ width: '24px', height: '24px', marginRight: '1em',padding:'1px' }} 
                  
                />
                <div className="tooltip" style={{textAlign: 'center', left:"25px"}}>Excluir<br /><p className='tooltip-small'>Delete</p></div>
            </div>

            <div tabIndex="0" className="icon-container d-flex align-items-center ps-3 pe-1 " onClick={() => handleRecort()} style={{cursor: 'pointer'}}>
              <img 
                    src={ContentCutIcon} 
                    alt="Cortar componentes" 
                    style={{ width: '24px', height: '24px', marginRight: '1em',padding:'1px' }} 
                    
                  />
                <div className="tooltip" style={{textAlign: 'center'}}>Cortar<br /><p className='tooltip-small'>Ctrl + X</p></div>
            </div>


            <div tabIndex="0" className="icon-container d-flex align-items-center ps-3 pe-1" onClick={() => handleCopy()} style={{cursor: 'pointer'}}>
              <img 
                      src={ContentCopyIcon} 
                      alt="Copiar componentes" 
                      style={{ width: '27px', height: '27px', marginRight: '1em' }} 
                      
              />
              <div className="tooltip" style={{textAlign: 'center'}}>Copiar<br /><p className='tooltip-small'>Ctrl + C</p></div>
            </div>

            <div tabIndex="0" className="icon-container d-flex align-items-center ps-4 pe-4" onClick={() => handlePaste()} style={{cursor: 'pointer'}}>
              <img 
                        src={ContentPasteIcon} 
                        alt="Colar componentes" 
                        style={{ width: '27px', height: '27px', marginBottom:'1px' }} 
                        
                />
              <div className="tooltip " style={{textAlign: 'center'}}>Colar<br /><p className='tooltip-small'>Ctrl + V</p></div>
            </div>

            <div tabIndex="0" className="icon-container d-flex align-items-center ps-3 pe-1" onClick={() => fitView({ duration: 300 })} style={{cursor: 'pointer'}}>
              <img 
                        src={fitview} 
                        alt="Ajustar o zoom" 
                        style={{ width: '20px', height: '20px', marginRight: '1em', marginBottom:'1px' }} 
                        
                />
              <div className="tooltip " style={{textAlign: 'center'}}>Ajustar visão<br /></div>
            </div>

            <div tabIndex="0" className="icon-container d-flex align-items-center ps-3 pe-1" onClick={() => zoomIn({ duration: 300 })} style={{cursor: 'pointer'}}>
              <img 
                        src={zoomIcon} 
                        alt="Zoom in" 
                        style={{ width: '20px', height: '20px', marginRight: '1em', marginBottom:'1px' }} 
                        
                />
              <div className="tooltip " style={{textAlign: 'center'}}>Ampliar<br /></div>
            </div>

            <div tabIndex="0" className="icon-container d-flex align-items-center ps-3 pe-1" onClick={() => zoomOut({ duration: 300 })} style={{cursor: 'pointer'}}>
              <img 
                        src={zoomOutIcon} 
                        alt="Zoom out" 
                        style={{ width: '20px', height: '20px', marginRight: '1em', marginBottom:'1px' }} 
                        
                />
              <div className="tooltip " style={{textAlign: 'center'}}>Diminuir zoom<br /></div>
            </div>

              <QuestionIcon/>

            <ShareDiagramModal id={shareModalId} diagram_id={diagram_id} />
              
          </div>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
