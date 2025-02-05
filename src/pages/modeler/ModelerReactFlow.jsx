import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  ConnectionMode,
  MiniMap,
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
  reconnectEdge,
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
import useHistory from '../../hooks/useHistory';
import useKeyBindings from '../../hooks/useKeyBindings';

const getId = () => `id-${uuidv4()}`;

const ModelerReactFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const { currentEdge, setCurrentEdge } = useModeler();
  const [anchorPosition, setAnchorPosition] = useState(null);
  const [nameDiagram, setNameDiagram] = useState('');
  const [initialPosition, setInitialPosition] = useState(null);  
  const [oculteManipulationIcons, setOculteManipulationIcons] = useState(false);
  const { id } = useParams();

  const { getNodes } = useReactFlow();

  async function validPermissionForEdit() {        
    let user_id = JSON.parse(localStorage.getItem('user')).id;
    const diagram = await api.get(`/collaboration/${id}/${user_id}`);
    const collaboratorPermission = diagram.data.permission;
    collaboratorPermission === 1 ? setOculteManipulationIcons(true) : setOculteManipulationIcons(false);
}
  
  useEffect(() => {
    if (!!id) {
      const getDiagram = async () => {
        try {
          const res = await api.get(`/diagrams/${id}`);
          const { data } = res;
          setNameDiagram(data.name);
          const graph = JSON.parse(data.data);
          
          validPermissionForEdit();
          // Atualiza os nós desmarcando-os
          setNodes(
            graph.nodes.map((node) => ({
              ...node,
              selected: false, // Define 'selected' como false para todos os nós
            }))
          );
  
          setEdges(graph.edges); // Define as arestas diretamente
        } catch (error) {
          Toast("error", "Não foi possível recuperar o diagrama");
        }
      };
  
      getDiagram();
    }
  }, [id, setEdges, setNodes]);
  
  

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


  const getMousePosition = (event) => {
    if (!reactFlowWrapper.current || !reactFlowInstance) {
    return null;
    }

    // Obtém os limites do React Flow
    const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()

    // check if the dropped element is valid
    if (!reactFlowInstance || !reactFlowBounds) {
    return;
    }
    
    // Projeta a posição do mouse relativa ao fluxo
    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY
  });

    return position;
};

  const { addNode, removeNode, addEdge, removeEdge, enterPresentationUnit, exitPresentationUnit, undo, redo, duplicarNode,pasteNode, addToHistory, copyNode } = useHistory()

  const { handleUndo, handleRedo, handleDelete, handleCopy, handleCut, handlePaste } = useKeyBindings({removeNode, undo, redo, removeEdge, addNode, copyNode, duplicarNode, pasteNode, addToHistory,getMousePosition})


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

  const onReconnect = useCallback(
    (oldEdge, newConnection) => {
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
      setCurrentEdge("");
    }, 
    
    [],
  );

  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: currentEdge, reconnectable: 'target', label: "Clique para editar", labelPosition: {x: null, y: null} };

      addEdge(edge)
      setCurrentEdge("");
    },

    [addEdge, currentEdge, setCurrentEdge],
  );


  const isValidConnection = (connection) => {

    const nodeSource = nodes.find(nd => nd.id === connection.source);
    const nodeTarget = nodes.find(nd => nd.id === connection.target);

    let edge = {};
    if (currentEdge === "") {
      edge = edges.find(ed => (ed.source === nodeSource.id && ed.target === nodeTarget.id) || (ed.source === nodeSource.id && ed.sourceHandle === connection.sourceHandle))
    }
    else {
      edge = {"type": currentEdge};
    }

    if (!nodeSource || !nodeTarget) return false;
    if (!edge) return false;

    let sourceClause = false;
    let targetClause = false;

    if (nodeSource.type === "open-point") {
      sourceClause = edge.type === "navigation";
    }

    if (nodeTarget.type === "open-point") {
      targetClause = false;
    }

    if (nodeSource.type === "close-point") {
      sourceClause = false
    }

    if (nodeTarget.type === "close-point") {
      targetClause = edge.type === "navigation"
    }

    if (nodeSource.type === "user-action") {
      sourceClause =
        edge.type === "transition" ||
        edge.type === "cancel-transition" ||
        edge.type === "navigation"
    }

    if (nodeTarget.type === "user-action") {
      targetClause =
        edge.type === "transition" ||
        edge.type === "sucess-feedback" ||
        edge.type === "unsucess-feedback" ||
        edge.type === "query-data" ||
        edge.type === "cancel-transition" ||
        edge.type === "navigation"
    }

    if (nodeSource.type === 'sistem-process') {
      sourceClause = edge.type === 'sucess-feedback' ||
        edge.type === 'unsucess-feedback' ||
        edge.type === 'query-data' ||
        edge.type === 'cancel-transition' ||
        edge.type === "navigation"
    }

    if (nodeTarget.type === 'sistem-process') {
      targetClause =
        edge.type === "transition" ||
        edge.type === "query-data" ||
        edge.type === "navigation"
    }

    if (nodeSource.type === 'alert-content') {
      sourceClause = edge.type === 'sucess-feedback' ||
        edge.type === 'unsucess-feedback' ||
        edge.type === 'transition' ||
        edge.type === 'cancel-transition' ||
        edge.type === "navigation"
    }

    if (nodeTarget.type === 'alert-content') {
      targetClause = edge.type === 'sucess-feedback' ||
        edge.type === 'unsucess-feedback' ||
        edge.type === 'transition' ||
        edge.type === 'cancel-transition' ||
        edge.type === "navigation"
    }

    if (nodeSource.type === 'data-colection') {
      sourceClause = edge.type === 'query-data'
    }

    if (nodeTarget.type === 'data-colection') {
      targetClause = edge.type === 'query-data'
    }

    if (nodeSource.type === "obg-user-action") {
      sourceClause =
        edge.type === "transition" ||
        edge.type === "cancel-transition" ||
        edge.type === "navigation"
    }

    if (nodeTarget.type === "obg-user-action") {
      targetClause =
        edge.type === "transition" ||
        edge.type === "sucess-feedback" ||
        edge.type === "unsucess-feedback" ||
        edge.type === "query-data" ||
        edge.type === "cancel-transition" ||
        edge.type === "navigation"
    }

    if (nodeSource.type === 'progress-indicator') {
      sourceClause = edge.type === 'sucess-feedback' ||
        edge.type === 'unsucess-feedback' ||
        edge.type === 'query-data' ||
        edge.type === 'cancel-transition' ||
        edge.type === "navigation"
    }

    if (nodeTarget.type === 'progress-indicator') {
      targetClause =
        edge.type === "transition" ||
        edge.type === "query-data" ||
        edge.type === "navigation"
    }

    return sourceClause && targetClause
  };


  const onNodeDragStart = (event, node) => { 

  setInitialPosition(node.position);
};


  const onNodeDragStop = (event, node) => {

    if (
      initialPosition &&
      (initialPosition.x !== node.position.x || initialPosition.y !== node.position.y)
  ) {
      // Salva no histórico apenas se a posição mudou
      addToHistory({
          action: "movedNode",
          data: { id: node.id, position: node.position },
          previousPosition: initialPosition,
      });
  }
  setInitialPosition(null);


    setNodes((nodes) => {
      const currentNodes = nodes.map((item) => {
        if (item.id === node.id) {
          
          
          const updatedNode = nodes.find((targetNode) => {
            const { width, height, type, id } = targetNode;
            const { x, y } = targetNode.position;

            if (node.extent === 'parent') return false;
            if (node.type === "presentation-unity" || node.type === "presentation-unity-acessible") return false;
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

          if (updatedNode) {
            return enterPresentationUnit(node, updatedNode)
          }
        }
  
        return item;
      });

      const presentationNodes = currentNodes.filter(
        (node) =>
          node.type === 'presentation-unity' ||
          node.type === 'presentation-unity-acessible'
      );

      const otherNodes = currentNodes.filter(
        (node) =>
          node.type !== 'presentation-unity' &&
          node.type !== 'presentation-unity-acessible'
      );


      return [...presentationNodes, ...otherNodes];
    });
  };


  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      setNodes((nds) => nds.map(nd => ({ ...nd, selected: false })));

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

      if (
        type === 'user-action' ||
        type === 'alert-content' ||
        type === 'obg-user-action' ||
        type === 'progress-indicator'
      ) {
        newNode.data.name = '';
      }

      const parentNode = nodes.find((targetNode) => {
        const { width, height, type, id } = targetNode;
        const { x, y } = targetNode.position;

        if ((type === 'presentation-unity' || type === 'presentation-unity-acessible') &&
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
          extent: 'parent',
          position: {
            x: position.x - parentPosition.x,
            y: position.y - parentPosition.y,
          },
        };
      }
      //setNodes((nds) => [...nds, newNode]);
      if (newNode) addNode(newNode);
    },
    [addNode, nodes, reactFlowInstance, setNodes],
  );


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

      if (id) {
          await api.put(`diagrams/${id}`, {
          name,
          nodes,
          edges
        })
        Toast('success', 'Diagrama editado com sucesso.')
      }else {
          await api.post('diagrams', {
          name,
          nodes,
          edges
        })
        Toast('success', 'Diagrama criado com sucesso.')
      }

    } catch (error) {
      Toast('error', 'Não foi possivel criar diagrama.')
    }
  }


  
  const nodeClassName = (node) => node.type;

  return (
    <>
      <AppBarCustom 
      onDownload={() => onDownload()} 
      onSave={(name) => onSave(name)} 
      handleUndo={() => handleUndo()} 
      handleRedo={() => handleRedo()} 
      handleDelete={() => handleDelete()} 
      handleCopy={() => handleCopy()} 
      handleRecort={() => handleCut()} 
      handlePaste={() => handlePaste(true,true)} 
      name={nameDiagram}
      oculteManipulationIconsForReader={oculteManipulationIcons}
      diagram_id={id}/>
      <div className="dndflow">
        <div hidden={oculteManipulationIcons}>
          <Sidebar/>
        </div>
        <>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onReconnect={onReconnect}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeDragStart={onNodeDragStart}
              onNodeDragStop={onNodeDragStop}
              isValidConnection={isValidConnection}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              minZoom={0.2}
              maxZoom={4}
              connectionMode={ConnectionMode.Strict}
              className="react-flow-subflows-example"
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
                exitPresentationUnit()
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
