import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls
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
import CustomEdge from "./CustomEdge";
import './index.css';


let id = 0;
const getId = () => `dndnode_${id++}`;

const ModelerReactFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  const currentEdgeTypeRef = useRef(null)

  useEffect(() => {
    console.log("current edge => ", currentEdgeTypeRef)
  }, [currentEdgeTypeRef.current])
  
  const edgeTypes = useMemo(
      () => ({
        'navigation': CustomEdge,
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
      "progress-indicator": ProgressIndicatorDiagram
    }),
  [],
);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onConnect = useCallback(
    (connection) => {
      console.log(connection, 22)
      const edge = { ...connection, type: currentEdgeTypeRef.current,  };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

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
          ref: currentEdgeTypeRef
        },
      };

      if (type === "user-action" || type === "alert-content" || type === "obg-user-action" || type === "progress-indicator") {
        newNode.data.name = ""
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

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
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            minZoom={0.2}
            maxZoom={4}
            connectionMode='loose'
          >
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default ModelerReactFlow;
