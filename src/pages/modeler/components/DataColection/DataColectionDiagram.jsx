import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Handle, Position } from 'reactflow';
import './text-updater-node.css';
import TypeNavigations from '../TypeNavigations';
import { useModeler } from "../../../../context/modelerContext";


function DataColection({ data, id, selected }) {
  // Sincronizar o estado local com os dados fornecidos pelo React Flow
  const [name, setName] = useState(data.name || '');
  const [fields, setFields] = useState(data.fields || [{ name: '' }]);
  const [isEditing, setIsEditing] = useState(true);
  
  const [ultimaseta, setUltimaseta] = React.useState("query-data"); // Estado elevado
  const { setCurrentEdge } = useModeler(); // Supondo que useModeler esteja disponível

  // Atualizar o nome no estado global do nó
  useEffect(() => {
    data.name = name;
  }, [name, data]);

  // Atualizar os campos no estado global do nó
  useEffect(() => {
    data.fields = fields;
  }, [fields, data]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFieldChange = (index, e) => {
    const updatedFields = [...fields];
    updatedFields[index].name = e.target.value;
    setFields(updatedFields);
  };

  const addField = () => {
    setFields([...fields, { name: '' }]);
  };

  const handleDeleteField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const handleBlur = () => {
    if (fields.every(field => field.name.trim() === '')) {
      setIsEditing(false);
    }
  };

  const [openNavigation, setOpenNavigation] = React.useState(false)
  
  const [anchorEl, setAnchorEl] = React.useState(null);
    
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenNavigation(true)
  };

  const handleClose = () => {
    setOpenNavigation(false);
    setAnchorEl(null)
  }


  return (
    <div className='text-updater-node'
    style={{
      zIndex: 9999,
      width: '100%',
      height: '100%',
    }}>
      <Handle type="target" position={Position.Left} isConnectable id='data-colection-target-left'/>
      <Handle type="target" position={Position.Top} isConnectable id='data-colection-target-top'/>
      <Handle type="target" position={Position.Right} isConnectable id='data-colection-target-right'/>
      <Handle type="target" position={Position.Bottom} isConnectable id='data-colection-target-bottom'/>
      <Handle type="source" position={Position.Left} id='data-colection-source-left' onClick={(e) => handleClick(e)} onMouseEnter={(e) => {if (e.buttons === 0) {setCurrentEdge(ultimaseta);}}}/>
      <Handle type="source" position={Position.Top} id='data-colection-source-top' onClick={(e) => handleClick(e)} onMouseEnter={(e) => {if (e.buttons === 0) {setCurrentEdge(ultimaseta);}}}/>
      <Handle type="source" position={Position.Right} id='data-colection-source-right' onClick={(e) => handleClick(e)} onMouseEnter={(e) => {if (e.buttons === 0) {setCurrentEdge(ultimaseta);}}}/>
      <Handle type="source" position={Position.Bottom} id='data-colection-source-bottom' onClick={(e) => handleClick(e)} onMouseEnter={(e) => {if (e.buttons === 0) {setCurrentEdge(ultimaseta);}}}/>
      <TypeNavigations 

        edges={['query-data']} 
        onClose={() => handleClose()}
        open={openNavigation}
        anchor={anchorEl}
        close={() => handleClose()}
        setUltimaseta={setUltimaseta}
      />
      <Box 
        sx={{ 
          border: '1px solid #000', 
          borderRadius: 1, 
          width: '100%', 
          height: '100%', 
          backgroundColor: '#fff', 
          margin: '0 auto', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center' 
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            width: '100%', 
            justifyContent: 'center',
            marginBottom: 1.5,
            backgroundColor: '#f0f0f0',
            padding: 1,
            borderRadius: '4px',
            borderBottom: '1px solid black' 
          }}
        >
          <TextField
            value={name}
            onChange={handleNameChange}
            variant="outlined"
            size="small"
            fullWidth
            multiline
            placeholder="Coleção de dados"
            sx={{ 
              fontSize: 12, 
              textAlign: 'center', 
              backgroundColor: '#f0f0f0',
            }}
            inputProps={{ 
              style: { 
                textAlign: 'center' 
              }
            }} 
            onFocus={() => setIsEditing(true)}
            onBlur={handleBlur}
          />
        </Box>

        <Box sx={{ width: '90%', marginTop: 1.5 }}>
          {fields.map((field, index) => (
            <Box 
              key={index} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: 1,
                position: 'relative' 
              }}
            >
              <TextField
                value={field.name}
                onChange={(e) => handleFieldChange(index, e)}
                variant="outlined"
                size="small"
                placeholder="Dados"
                multiline
                sx={{ 
                  width: '100%',
                  fontSize: 12, 
                  textAlign: 'center', 
                  backgroundColor: '#fff' 
                }}
                inputProps={{ style: { textAlign: 'center' } }} 
                onFocus={() => setIsEditing(true)}
                onBlur={handleBlur}
              />
              {isEditing && fields.length > 1 && (
                <IconButton 
                  size="small" 
                  color="secondary" 
                  onClick={() => handleDeleteField(index)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>

        {isEditing && (
          <Box sx={{ textAlign: 'center', marginTop: 1.5 }}>
            <IconButton onClick={addField} size="small" color="primary">
              <AddIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default DataColection;
