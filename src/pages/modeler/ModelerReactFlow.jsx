import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  ConnectionMode,
  MiniMap,
  Background
} from 'reactflow';
import 'reactflow/dist/style.css';
import './customStyles.css';
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
  
  const {currentEdge } = useModeler();

  useEffect(() => {
    console.log("nodes => ", nodes)
  }, [currentEdge, nodes])
  
  const edgeTypes = useMemo(
      () => ({
        'transition': Transition,
        'navigation': NavigationDescription, // com descrição
        'sucess-feedback': FeedbackSucess, // com descrição
        'unsucess-feedback': FeedbackUnsucess, // com descrição
        'cancel-transition': CancelTransition, // com descrição
        'query-data': QueryData // com descrição
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
    },

    [setEdges, currentEdge],
  );

  const onNodeDragStop = (event, node) => {
    setNodes((nodes) => {
      return nodes.map((item) => {
        if (item.id === node.id) {
          // Verifica se o nó está dentro de outro nó de tipo específico
          const updatedNode = nodes.find((targetNode) => {
            const { width, height, type, id } = targetNode;
            const { x, y } = targetNode.position;
  
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
              draggable: false,
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
          label: `${type}-node`
        },
      };

      if (type === "user-action" || type === "alert-content" || type === "obg-user-action" || type === "progress-indicator") {
        newNode.data.name = ""
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

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
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            minZoom={0.2}
            maxZoom={4}
            connectionMode={ConnectionMode.Loose}
            className="react-flow-subflows-example"
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
