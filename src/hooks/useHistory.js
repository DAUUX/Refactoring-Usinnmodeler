import  { useCallback, useRef, useState } from "react";
import { useReactFlow } from "reactflow";
import { v4 as uuid } from "uuid";

export default function useHistory() {
    const [history, setHistory] = useState([]);
    const currentIndex = useRef(-1);

    const { setNodes, setEdges } = useReactFlow();

    const addToHistory = useCallback(
        (newState) => {
            const newHistory = [...history].slice(0, currentIndex.current + 1);
            newHistory.push(newState);
            setHistory(newHistory);
            currentIndex.current += 1;
        },[history]
    );

    const addNode = useCallback(
        (node, children = [], shouldAddToHistory = true) => {
            if (!node) return; // Retorna imediatamente se o nó for inválido.
    
            setNodes((prevNodes) => {
                // Se houver filhos, atualiza para associá-los ao nó pai
                const updatedChildren = children.map((child) => ({
                    ...child,
                    parentId: node.id, // Define o nó atual como pai
                }));
    
                // Adiciona o nó pai e, se existirem, os filhos ao estado
                return [...prevNodes, node, ...updatedChildren];
            });
    
            if (shouldAddToHistory) {
                // Adiciona ao histórico, incluindo filhos se existirem
                addToHistory({
                    action: "addNode",
                    data: node,
                    ...(children.length > 0 && { children }), // Inclui `children` somente se não estiver vazio
                });
            }
        },
        [addToHistory, setNodes]
    );
    
    const addEdge = useCallback(
    (edge, shouldAddToHistory = true) => {
        if (edge) {
        // Adiciona um id único à aresta
        const edgeWithId = { ...edge, id: edge.id || uuid() };
        
        setEdges((prevEdges) => prevEdges.concat(edgeWithId));

        if (shouldAddToHistory) {
            addToHistory({
            action: "addEdge",
            data: edgeWithId,
            });
        }
        }
    },
    [addToHistory, setEdges]
    );

    const removeNode = useCallback(
        (node, shouldAddToHistory = true) => {
        if (!node) return; 

        if (node.type === "presentation-unity" || node.type === "presentation-unity-acessible") {
            setNodes((prevNodes) => 
            prevNodes.map((prevNode) => {
                if (prevNode.parentId === node.id) {

                    const updatedNode = { ...prevNode };
                    delete updatedNode.parentId;
                    delete updatedNode.extent;
                    return updatedNode;
                }
                return prevNode;
            }).filter((prevNode) => prevNode.id !== node.id) 
            );
        } else {

            setNodes((prevNodes) => 
            prevNodes.filter((prevNode) => prevNode.id !== node.id)
            );
        }

        if (shouldAddToHistory) {
            addToHistory({
            action: "removeNode",
            data: node,
            });
        }
        },
        [addToHistory, setNodes]
    );

    const removeEdge = useCallback(
    (edge, shouldAddToHistory = true) => {
        if (edge) {
        console.log(`Removendo aresta com ID: ${edge.id}`);
        
        setEdges((prevEdges) =>
            prevEdges.filter((prevEdge) => prevEdge.id !== edge.id)
        );

        if (shouldAddToHistory) {
            addToHistory({
            action: "removeEdge",
            data: edge,
            });
        }
        }
    },
    [addToHistory, setEdges]
    );

    const duplicarNode = useCallback((selectedNode, shouldAddToHistory = true) => {
        setNodes((prevNodes) => {
            if (!selectedNode) return prevNodes; // Retorna os nós inalterados se nenhum nó for fornecido
            
            var duplicatedChildren = null

            const newNodes = [
                ...prevNodes.map((node) =>
                    node.selected ? { ...node, selected: false } : node
                ),
            ];
    
            const duplicatedNode = {
                ...selectedNode,
                id: uuid(),
                position: {
                    x: selectedNode.position.x + 40,
                    y: selectedNode.position.y + 40,
                },
                selected: true,
            };
    
            newNodes.push(duplicatedNode);
    
            // Duplica os filhos se o tipo do nó for "presentation-unity" ou "presentation-unity-acessible"
            if (
                selectedNode.type === "presentation-unity" ||
                selectedNode.type === "presentation-unity-acessible"
            ) {
                const childNodes = prevNodes.filter(
                    (node) => node.parentId === selectedNode.id
                );
                duplicatedChildren = childNodes.map((childNode) => ({
                    ...childNode,
                    id: uuid(),
                    position: {
                        x: childNode.position.x,
                        y: childNode.position.y,
                    },
                    parentId: duplicatedNode.id,
                    selected: false,
                }));
    
                newNodes.push(...duplicatedChildren);
            }

            if (    !(selectedNode.type === "presentation-unity"    ||   selectedNode.type === "presentation-unity-acessible")){
                addToHistory({
                    action: "addNode",
                    data: duplicatedNode
                });
            }else{
                addToHistory({
                    action: "addNode",
                    data: duplicatedNode,
                    children: duplicatedChildren
                });
            }
    
            return newNodes;
        });
    }, [addToHistory, setNodes]);



    const movedNode = useCallback((nodeData, isUndo = true) => {
        const { id, position, previousPosition } = nodeData;

        setNodes((nodes) =>
            nodes.map((node) =>
                node.id === id
                    ? {
                        ...node,
                        position: isUndo ? previousPosition : position, // Aplica a posição correta
                    }
                    : node
            )
        );
    }, []);
    
    



    
    const recordMove = useCallback(
        (nodeData) => {
            setNodes((prevNodes) => {
                const nodeToMove = prevNodes.find((node) => node.id === nodeData.id);
                if (!nodeToMove) return prevNodes;
    
                addToHistory({
                    action: "movedNode",
                    data: { id: nodeData.id, position: nodeData.position },
                    previousPosition: nodeToMove.position, 
                    timestamp: new Date().toISOString(),
                });
    
                return prevNodes.map((node) =>
                    node.id === nodeData.id
                        ? { ...node, position: nodeData.position }
                        : node
                );
            });
        },
        [addToHistory, setNodes]
    );
    
    




    // AAAAAAAAAAAAAAAAAAAAAA
    
    const undo = useCallback(() => {
    const canUndo = currentIndex.current > -1;
    if (canUndo) {
        const { action, data, children, previousPosition } = history[currentIndex.current] || {};
        currentIndex.current -= 1;

        if (!action || !data) return; // Verifica valores válidos
        
        // eslint-disable-next-line default-case
        switch (action) {
        case "addNode": {
            removeNode(data,  false);
            break;
        }
        case "addEdge": {
            removeEdge(data, false);
            break;
        }
        case "removeNode": {
            addNode(data, children,  false);
            break;
        }
        case "removeEdge": {
            addEdge(data, false);
            break;
        }
        case "movedNode": {
            movedNode({ ...data, previousPosition }, true);
            break;
        }
        
        }
    }
    }, [addEdge, addNode, history, removeEdge, removeNode]);

    const redo = useCallback(() => {
    const canRedo = currentIndex.current < history.length - 1;
    if (canRedo) {
        currentIndex.current += 1;
        const { action, data, children, previousPosition  } = history[currentIndex.current] || {};
        
        if (!action || !data) return; // Verifica valores válidos
        // eslint-disable-next-line default-case
        switch (action) {
        case "addNode": {
            addNode(data, children, false);
            break;
        }
        case "addEdge": {
            addEdge(data, false);
            break;
        }
        case "removeNode": {
            removeNode(data, false);
            break;
        }
        case "removeEdge": {
            removeEdge(data, false);
            break;
        }
        case "movedNode": {
            movedNode(data, false);
            break;
        }

        
        }
    }
    }, [addEdge, addNode, history, removeEdge, removeNode]);

    return { addNode, removeNode, addEdge, removeEdge, duplicarNode, undo, redo, addToHistory, recordMove };
}