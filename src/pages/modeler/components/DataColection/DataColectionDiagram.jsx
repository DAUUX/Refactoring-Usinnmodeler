import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Handle, Position } from 'reactflow';
import './text-updater-node.css';

function DataColection({ data, id }) {
  // Sincronizar o estado local com os dados fornecidos pelo React Flow
  const [name, setName] = useState(data.name || '');
  const [fields, setFields] = useState(data.fields || [{ name: '' }]);
  const [isEditing, setIsEditing] = useState(true);

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

  return (
    <>
      <Handle type="target" position={Position.Top} isConnectable />
      <Handle type="target" position={Position.Left} isConnectable />
      <Box 
        sx={{ 
          border: '1px solid #000', 
          borderRadius: 1, 
          width: 170, 
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
                sx={{ 
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
      
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable
      />
    </>
  );
}

export default DataColection;
