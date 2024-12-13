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
    (node, shouldAddToHistory = true) => {
        if (node) setNodes((prevNodes) => prevNodes.concat(node));
        if (shouldAddToHistory)
        addToHistory({
            action: "addNode",
            data: node,
        });
        },[addToHistory, setNodes]
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
        if (!node) return; // Retorna imediatamente se o nó for inválido.
    
        // Se o nó for do tipo "presentation-unity" ou "presentation-unity-acessible"
        if (node.type === "presentation-unity" || node.type === "presentation-unity-acessible") {
            // Atualiza os nós existentes para remover as dependências deste nó
            setNodes((prevNodes) => 
            prevNodes.map((prevNode) => {
                if (prevNode.parentId === node.id) {
                // Remove a associação pai-filho e a propriedade extent
                const updatedNode = { ...prevNode };
                delete updatedNode.parentId;
                delete updatedNode.extent;
                return updatedNode;
                }
                return prevNode;
            }).filter((prevNode) => prevNode.id !== node.id) // Remove o nó atual da lista
            );
        } else {
            // Caso contrário, remove apenas o nó específico
            setNodes((prevNodes) => 
            prevNodes.filter((prevNode) => prevNode.id !== node.id)
            );
        }
    
        // Adiciona a ação ao histórico, se necessário
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


    const undo = useCallback(() => {
    const canUndo = currentIndex.current > -1;
    if (canUndo) {
        const { action, data } = history[currentIndex.current] || {};
        currentIndex.current -= 1;
        // eslint-disable-next-line default-case
        switch (action) {
        case "addNode": {
            removeNode(data, false);
            break;
        }
        case "addEdge": {
            removeEdge(data, false);
            break;
        }
        case "removeNode": {
            addNode(data, false);
            break;
        }
        case "removeEdge": {
            addEdge(data, false);
            break;
        }
        }
    }
    }, [addEdge, addNode, history, removeEdge, removeNode]);

    const redo = useCallback(() => {
    const canRedo = currentIndex.current < history.length - 1;
    if (canRedo) {
        currentIndex.current += 1;
        const { action, data } = history[currentIndex.current] || {};
        // eslint-disable-next-line default-case
        switch (action) {
        case "addNode": {
            addNode(data, false);
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
        }
    }
    }, [addEdge, addNode, history, removeEdge, removeNode]);

  return { addNode, removeNode, addEdge, removeEdge, undo, redo };
}