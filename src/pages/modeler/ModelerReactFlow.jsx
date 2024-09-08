import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  ConnectionMode,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar';
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
import { useModeler } from "../../context/modelerContext";
import PresentationUnity from "./components/PresentationUnity/PresentationUnityDiagram";
import PresentationUnityAcessibleDiagram from "./components/PresentationUnityAcessible/PresentationUnityAcessibleDiagram";

import './index.css';

let id = 0;
const getId = () => `dndnode_${id++}`;

const ModelerReactFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodesOnDelete, setNodesOnDele] = useState([])
  
  const {currentEdge, setCurrentEdge } = useModeler();

  useEffect(() => {console.log(nodes, 121212)}, [nodes])
  useEffect(() => {
    if (Array.isArray(nodesOnDelete)) {
      // Unir as listas se nodesOnDelete for um array
      setNodes((prevNodes) => {
        console.log(prevNodes, 6666)
        return  [...new Set([...prevNodes, ...nodesOnDelete])]
      
      });
    } else {
      console.error('nodesOnDelete não é um array:', nodesOnDelete);
    }
  }, [nodesOnDelete]);

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

    if(nodeSource.type === "user-action") {
      sourceClause = 
        currentEdge === "transition" || 
        currentEdge === "cancel-transition" ||
        currentEdge === "navigation"
    }

    if(nodeTarget.type === "user-action") {
      targetClause = 
        currentEdge === "transition" || 
        currentEdge === "sucess-feedback" || 
        currentEdge === "unsucess-feedback" || 
        currentEdge === "query-data" ||
        currentEdge === "cancel-transition" ||
        currentEdge === "navigation"
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
        currentEdge === "query-data" ||
        currentEdge === "navigation"
    }

    if(nodeSource.type === 'alert-content') {
      sourceClause = currentEdge === 'sucess-feedback' ||
      currentEdge === 'unsucess-feedback' ||
      currentEdge === 'transition' ||
      currentEdge === 'cancel-transition' ||
      currentEdge === "navigation"
    }

    if(nodeTarget.type === 'alert-content') {
      targetClause = currentEdge === 'sucess-feedback' ||
      currentEdge === 'unsucess-feedback' ||
      currentEdge === 'transition' ||
      currentEdge === 'cancel-transition' ||
      currentEdge === "navigation"  
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
        currentEdge === "cancel-transition" ||
        currentEdge === "navigation"
    }

    if(nodeTarget.type === "obg-user-action") {
      targetClause = 
        currentEdge === "transition" || 
        currentEdge === "sucess-feedback" || 
        currentEdge === "unsucess-feedback" || 
        currentEdge === "query-data" ||
        currentEdge === "cancel-transition" ||
        currentEdge === "navigation"
    }

    if(nodeSource.type === 'progress-indicator') {
      sourceClause = currentEdge === 'sucess-feedback' ||
      currentEdge === 'unsucess-feedback' ||
      currentEdge === 'query-data' ||
      currentEdge === 'cancel-transition' ||
      currentEdge === "navigation"
    }

    if(nodeTarget.type === 'progress-indicator') {
      targetClause = 
        currentEdge === "transition" || 
        currentEdge === "query-data" ||
        currentEdge === "navigation"
    }

    return sourceClause && targetClause
  };

  const onNodeDragStop = (event, node) => {
    setNodes((nodes) => {
      const currentNodes =  nodes.map((item) => {
        if (item.id === node.id) {
          
          
          const updatedNode = nodes.find((targetNode) => {
            const { width, height, type, id } = targetNode;
            const { x, y } = targetNode.position;
            
            if(node.extent === 'parent') return false;
            if(node.type === "presentation-unity" || node.type === "presentation-unity-acessible") return false;
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
            const { id, position: { x, y } } = updatedNode;
            return {
              ...node,
              parentId: id,
              extent: 'parent',
              position: {
                x: node.position.x - x,
                y: node.position.y - y,
              },
            };
          }
        }
  
        // Retorna o nó original sem alterações
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
  
      setNodes((nds) => {
        const parentNode = nds.find((targetNode) => {
          const { width, height, type, id } = targetNode;
          const { x, y } = targetNode.position;
  
          if (
            (type === 'presentation-unity' || type === 'presentation-unity-acessible') &&
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
  
        return nds.concat(newNode);
      });
    },
    [reactFlowInstance],
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

  return (
    <div className="dndflow">
      <Sidebar />
      <ReactFlowProvider>
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
      </ReactFlowProvider>
    </div>
  );
};

export default ModelerReactFlow;
