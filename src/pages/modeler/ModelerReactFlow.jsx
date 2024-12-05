import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  ConnectionMode,
  MiniMap,
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './components/Sidebar';
import OpenPointDiagram from "./components/OpenPoint/OpenPointDiagram";
import ClosePointDiagram from "./components/ClosePoint/ClosePointDiagram";
import SistemProcessDiagram from "./components/SistemProcess/SistemProcessDiagram";
import UserActionDiagram from "./components/UserAction/UserActionDiagram";
import AlertContentDiagram from "./components/AlertContent/AlertContentDiagram";
import ObrigatoryUserActionDiagram from "./components/ObrigatoryUserAction/ObrigatoryUserActionDiagram";
import ProgressIndicatorDiagram from "./components/ProgressIndicator/ProgressIndicatorDiagram";
import DataColectionDiagram from "./components/DataColection/DataColectionDiagram";
import Transition from "./components/Edges/Transition";
import NavigationDescription from "./components/Edges/NavigationDescription";
import FeedbackSucess from "./components/Edges/FeedbackSucess";
import FeedbackUnsucess from "./components/Edges/FeedbackUnsucess";
import CancelTransition from "./components/Edges/CancelTransition";
import QueryData from "./components/Edges/QueryData";
import PresentationUnity from "./components/PresentationUnity/PresentationUnityDiagram";
import PresentationUnityAcessibleDiagram from "./components/PresentationUnityAcessible/PresentationUnityAcessibleDiagram";
import { useModeler } from "../../context/modelerContext";
import { v4 as uuidv4 } from 'uuid';
import { toPng } from 'html-to-image';
import { Button, Popover } from '@mui/material';
import AppBarCustom from "./components/AppBar";
import './index.css';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { Toast } from '../../components/Toast';

const getId = () => `id-${uuidv4()}`;

const ModelerReactFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodesOnDelete, setNodesOnDele] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const {currentEdge, setCurrentEdge } = useModeler();
  const [anchorPosition, setAnchorPosition] = useState(null);
  const [nameDiagram, setNameDiagram] = useState('');

  const { id } = useParams();

  const { getNodes } = useReactFlow();
  
  useEffect(() => {
    console.log(nodes, '------', edges)
  }, [nodes])
  useEffect(() => {
    if(!!id){
      try {
        const getDiagram = async () => {
          const res = await api.get(`/diagrams/${id}`);
          const {data} = res;
          console.log(data.name);
          setNameDiagram(data.name);
          const graph = JSON.parse(data.data);
          setNodes(graph.nodes);
          setEdges(graph.edges);
        }
  
        getDiagram();
        
      } catch (error) {
        Toast('error', 'Não foi possivel recuperar diagrama');
      }
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(nodesOnDelete)) {
      setNodes((prevNodes) => {
        return  [...new Set([...prevNodes, ...nodesOnDelete])]
      });
    } else {
      console.error('nodesOnDelete não é um array:', nodesOnDelete);
    }
  }, [nodesOnDelete]);

  const handleContextMenu = (event) => {
    event.preventDefault(); 
    setAnchorPosition({
      top: event.clientY,
      left: event.clientX,
    });
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  useEffect(() => {
    const wrapper = reactFlowWrapper.current;

    if (wrapper) {
      wrapper.addEventListener('contextmenu', handleContextMenu);
    }

    return () => {
      if (wrapper) {
        wrapper.removeEventListener('contextmenu', handleContextMenu);
      }
    };
  }, []);

  const edgeTypes = useMemo(
      () => ({
        'transition': Transition,
        'navigation': NavigationDescription, 
        'sucess-feedback': FeedbackSucess, 
        'unsucess-feedback': FeedbackUnsucess, 
        'cancel-transition': CancelTransition, 
        'query-data': QueryData 
      }),
    [],
  );

  const nodeTypes = useMemo(
    () => ({
        "open-point": OpenPointDiagram,
        "close-point": ClosePointDiagram,
        "sistem-process": SistemProcessDiagram,
        "user-action": UserActionDiagram,
        "alert-content": AlertContentDiagram,
        "obg-user-action": ObrigatoryUserActionDiagram,
        "progress-indicator": ProgressIndicatorDiagram,
        "data-colection": DataColectionDiagram,
        "presentation-unity": PresentationUnity,
        "presentation-unity-acessible": PresentationUnityAcessibleDiagram
      }),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: currentEdge };

      setEdges((eds) => addEdge(edge, eds));
      setCurrentEdge("");
    },

    [setEdges, currentEdge],
  );

  const isValidConnection = (connection) => {
    
    const nodeSource = nodes.find(nd => nd.id === connection.source);
    const nodeTarget = nodes.find(nd => nd.id === connection.target);

    if(!nodeSource || !nodeTarget) return false;
    if(currentEdge.length === 0) return false; 

    let sourceClause = false;
    let targetClause = false;
    
    if(nodeSource.type === "open-point") {
      sourceClause = currentEdge === "navigation";
    }

    if(nodeTarget.type === "open-point") {
      targetClause = false;
    }

    if(nodeSource.type === "close-point") {
      sourceClause = false
    }

    if(nodeTarget.type === "close-point") {
      targetClause = currentEdge === "navigation"
    }

    if(nodeSource.type === "presentation-unity") { // Aplica a funcionalidade Emitir
      sourceClause = currentEdge === "navigation";
    }

    if(nodeTarget.type === "presentation-unity") {// Aplica a funcionalidade de receber
      targetClause = currentEdge === "navigation";
    }

    if(nodeSource.type === "presentation-unity-acessible") { // Aplica a funcionalidade Emitir
      sourceClause = currentEdge === "navigation";
    }

    if(nodeTarget.type === "presentation-unity-acessible") {// Aplica a funcionalidade de receber
      targetClause = currentEdge === "navigation";
    }

    if(nodeSource.type === "user-action") { //Aplica a funcionalidade Emitir
      sourceClause = 
        currentEdge === "transition" || 
        currentEdge === "cancel-transition" || 
        currentEdge === "query-data" || 
        currentEdge === "navigation"
    }

    if(nodeTarget.type === "user-action") { // Aplica a funcionalidade de receber
      targetClause = 
        currentEdge === "transition" || 
        currentEdge === "sucess-feedback" || 
        currentEdge === "unsucess-feedback" || 
        currentEdge === "query-data" ||
        currentEdge === "cancel-transition"
    }

    if(nodeSource.type === 'sistem-process') {
      sourceClause = currentEdge === 'sucess-feedback' ||
      currentEdge === 'unsucess-feedback' ||
      currentEdge === 'query-data' ||
      currentEdge === 'cancel-transition' ||
      currentEdge === "navigation"
    }

    if(nodeTarget.type === 'sistem-process') {
      targetClause = 
        currentEdge === "transition" || 
        currentEdge === "query-data"
    }

    if(nodeSource.type === 'alert-content') {
      sourceClause = currentEdge === 'sucess-feedback' ||
      currentEdge === 'unsucess-feedback' ||
      currentEdge === 'transition' ||
      currentEdge === 'cancel-transition'
    }

    if(nodeTarget.type === 'alert-content') {
      targetClause = currentEdge === 'sucess-feedback' ||
      currentEdge === 'unsucess-feedback' ||
      currentEdge === 'transition' ||
      currentEdge === 'cancel-transition'
    }

    if(nodeSource.type === 'data-colection') {
      sourceClause = currentEdge === 'query-data'
    }

    if(nodeTarget.type === 'data-colection') {
      targetClause = currentEdge === 'query-data'
    }

    if(nodeSource.type === "obg-user-action") {
      sourceClause = 
        currentEdge === "transition" || 
        currentEdge === "cancel-transition"
    }

    if(nodeTarget.type === "obg-user-action") {
      targetClause = 
        currentEdge === "transition" || 
        currentEdge === "sucess-feedback" || 
        currentEdge === "unsucess-feedback" || 
        currentEdge === "query-data" ||
        currentEdge === "cancel-transition" 
    }

    if(nodeSource.type === 'progress-indicator') {
      sourceClause = currentEdge === 'sucess-feedback' ||
      currentEdge === 'unsucess-feedback' ||
      currentEdge === 'query-data' ||
      currentEdge === 'cancel-transition'
    }

    if(nodeTarget.type === 'progress-indicator') {
      targetClause = 
        currentEdge === "transition" || 
        currentEdge === "query-data"
    }

    return sourceClause && targetClause
  };

  const excludedTypes = ["open-point", "close-point", "data-colection","user-action","presentation-unity"]; // Adicione outros tipos que não devem ser contidos na Unidade de Apresentação

  const onNodeDragStop = (event, node) => {
    setNodes((nodes) => {
      const updatedNodes = nodes.map((item) => {
        if (item.id === node.id) {
          if (excludedTypes.includes(node.type)) {
            return { ...node }; // Retorna o nó
          }
  
          const parentCandidate = nodes.find((targetNode) => {
            const { width, height, type, id } = targetNode;
            const { x, y } = targetNode.position;
            
            console.log("EXEMPLO: " + JSON.stringify(targetNode, null, 2));
  
            if (
              (type === "presentation-unity" || type === "presentation-unity-acessible") &&
              node.position.x > x &&
              node.position.x < x + width &&
              node.position.y > y &&
              node.position.y < y + height &&
              node.id !== id
            ) {
              return true;
            }
  
            return false;
          });
  
          if (parentCandidate) {
            const {
              id,
              position: { x, y },
            } = parentCandidate;
  
            return {
              ...node,
              parentId: id,
              extent: "parent",
              position: {
                x: node.position.x - x,
                y: node.position.y - y,
              },
            };
          }
        }
  
        return item;
      });
  
      const presentationNodes = updatedNodes.filter(
        (node) =>
          node.type === "presentation-unity" || node.type === "presentation-unity-acessible"
      );
  
      const otherNodes = updatedNodes.filter(
        (node) =>
          node.type !== "presentation-unity" && node.type !== "presentation-unity-acessible"
      );
  
      return [...presentationNodes, ...otherNodes];
    });
  };
  
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
  
      const type = event.dataTransfer.getData("application/reactflow");
  
      if (!type) {
        return;
      }
  
      setNodes((nds) => nds.map((nd) => ({ ...nd, selected: false })));
  
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
  
      let newNode = {
        id: getId(),
        type,
        position,
        data: {
          label: `${type}-node`,
        },
        dragging: true,
      };
  
      if (["user-action", "alert-content", "obg-user-action", "progress-indicator"].includes(type)) {
        newNode.data.name = "";
      }
      

      
      if (!excludedTypes.includes(type)) {
        const parentNode = nodes.find((targetNode) => {
          const { width, height, type, id } = targetNode;
          const { x, y } = targetNode.position;
  
          if (
            (type === "presentation-unity" || type === "presentation-unity-acessible") &&
            position.x > x &&
            position.x < x + width &&
            position.y > y &&
            position.y < y + height &&
            newNode.id !== id
          ) {
            return true;
          }
  
          return false;
        });
  
        if (parentNode) {
          const { id, position: parentPosition } = parentNode;
          newNode = {
            ...newNode,
            parentId: id,
            extent: "parent",
            position: {
              x: position.x - parentPosition.x,
              y: position.y - parentPosition.y,
            },
          };
        }
      }
  
      setNodes((nds) => [...nds, newNode]);
    },
    [reactFlowInstance]
  );
  

  const onNodesDelete = (nodesToBeDeleted) => {
    const presentationUnity = nodesToBeDeleted.find(nd => nd.type === "presentation-unity" || nd.type === "presentation-unity-acessible");
    if(presentationUnity){
      nodes.map(nd => {
        if(nd.parentId === presentationUnity.id) {
          delete nd.parentId
          delete nd.extent
        }
      })
      
      if(presentationUnity.type === "presentation-unity"){
        const otherNodes = nodesToBeDeleted.filter(nd => nd.type !== "presentation-unity").map(nd => {
          delete nd.parentId
          delete nd.extent
          return nd
        });
        setNodesOnDele(otherNodes);
      }else {
        const otherNodes = nodesToBeDeleted.filter(nd => nd.type !== "presentation-unity-acessible").map(nd => {
          delete nd.parentId
          delete nd.extent
          return nd
        });
        setNodesOnDele(otherNodes);
      }
    }
  }

  const nodeClassName = (node) => node.type;

  const onDownload = () => {
    
    function downloadImage(dataUrl) {
      const a = document.createElement('a');
    
      a.setAttribute('download', 'usin-modeler.png');
      a.setAttribute('href', dataUrl);
      a.click();
    }

    const imageWidth = 1024;
    const imageHeight = 768;

    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
    );

    toPng(document.querySelector('.react-flow__viewport'), {
      backgroundColor: 'white',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(downloadImage);
  }

  const onSave = async (name) => {
    try {
      
      if(id) {
        const res = await api.put(`diagrams/${id}`, {
          name,
          nodes,
          edges
        })
        Toast('success', 'Diagrama editado com sucesso.')
      }else {
        console.log('asdfo[aisjdfasdiofk')
        const res = await api.post('diagrams', {
          name,
          nodes,
          edges
        })
        console.log(res)
        Toast('success', 'Diagrama criado com sucesso.')
      }
  
    } catch (error) {
        Toast('error', 'Não foi possivel criar diagrama.')
    }
  }

  return (
    <>
      <AppBarCustom onDownload={() => onDownload()} onSave={(name) => onSave(name)} name={nameDiagram}/>
      <div className="dndflow">
        <Sidebar />
        <>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeDragStop={onNodeDragStop}
              isValidConnection={isValidConnection}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              minZoom={0.2}
              maxZoom={4}
              connectionMode={ConnectionMode.Strict}
              className="react-flow-subflows-example"
              onNodesDelete={onNodesDelete}
            >
              <Controls />
              <MiniMap zoomable pannable nodeClassName={nodeClassName} />
            </ReactFlow>
          </div>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={() => setOpen(false)}
            anchorReference="anchorPosition"
            anchorPosition={anchorPosition}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Button 
              onClick={() => {
                setNodes(nodes.map(nd => {
                  if(!!(nd.parentId) && !!(nd.extent) && nd.selected) {
                    delete nd.parentId
                    delete nd.extent
                    nd.position.y = nd.position.y+200
                    return nd;
                  }
                  return nd;
                }))
              }}
              sx={{
                fontSize: 12,       
                color: 'black',      
                padding: '10px 20px', 
              }}>
                Desagrupar
            </Button>
          </Popover>
        </>
      </div>
    </>
  );
};

export default ModelerReactFlow;
