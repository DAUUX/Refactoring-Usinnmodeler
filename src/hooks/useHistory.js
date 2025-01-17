import  { useCallback, useRef, useState } from "react";
import { useReactFlow } from "reactflow";
import { v4 as uuid } from "uuid";
import { v4 as uuidv4 } from 'uuid';

export default function useHistory() {
    const [history, setHistory] = useState([]);
    const currentIndex = useRef(-1);

    const { setNodes, getNodes, setEdges } = useReactFlow();

    const addToHistory = useCallback(
        (newState) => {
          // Garante que history é sempre um array válido
          const newHistory = Array.isArray(history) ? [...history] : [];
          
          // Garante que não há problemas de índice
          const validIndex = currentIndex.current >= 0 ? currentIndex.current + 1 : 0;
          
          const slicedHistory = newHistory.slice(0, validIndex); // Corta até o índice correto
          slicedHistory.push(newState);
          
          setHistory(slicedHistory); // Atualiza o histórico
          currentIndex.current = validIndex; // Atualiza o índice de forma segura
        },
        [history]
    ); //! Histórico de alterações
    

    const addNode = useCallback(
        (node, children, edges = [], shouldAddToHistory = true) => {
            if (!node) return;
    
            // Garantir que children seja sempre um array
            const updatedChildren = Array.isArray(children)
                ? children.map((child) => ({
                        ...child,
                        parentId: node.id,
                    }))
                : []; // Se não for um array, trata como array vazio
    
            setNodes((prevNodes) => {
                return [...prevNodes, node, ...updatedChildren];
            });
    
            setEdges((prevEdges) => {
                return [...prevEdges, ...edges];
            });
    
            if (shouldAddToHistory) {
                addToHistory({
                    action: "addNode",
                    data: node,
                    children: updatedChildren,
                    edges:edges
                });
            }
        },
        [addToHistory, setNodes, setEdges]
    ); //* Adiciona Nó
    

    const removeNode = useCallback(
        (node, children, shouldAddToHistory = true) => {
            if (!node) return;
    
            let childrenData = [];
            let connectedEdges = [];
    
            // Caso o nó seja dos tipos específicos
            if (node.type === "presentation-unity" || node.type === "presentation-unity-acessible") {
                setNodes((prevNodes) => {
                    // Coletar os filhos antes de remover o nó
                    if (children) {
                        childrenData = prevNodes.filter((prevNode) => prevNode.parentId === node.id);
                    }
    
                    return prevNodes.map((prevNode) => {
                            if (prevNode.parentId === node.id) {
                                const updatedPosition = {
                                    x: prevNode.position.x + (node.position?.x || 0),
                                    y: prevNode.position.y + (node.position?.y || 0),
                                };
    
                                // Se existem filhos, remove o nó, caso contrário, ajusta a posição
                                if (children) {
                                    return null; // Exclui o nó ao retornar null
                                }
    
                                const { parentId, extent, ...rest } = prevNode;
                                return { ...rest, position: updatedPosition };
                            }
                            return prevNode;
                        })
                        .filter((prevNode) => prevNode !== null && prevNode.id !== node.id); // Filtra os nós removidos
                });
    
                setEdges((prevEdges) => {
                    // Coletar as arestas conectadas ao nó antes de removê-las
                    connectedEdges = prevEdges.filter(
                        (edge) => edge.source === node.id || edge.target === node.id
                    );
    
                    // Atualiza as arestas para remover as conexões com o nó excluído
                    return prevEdges.filter(
                        (edge) => edge.source !== node.id && edge.target !== node.id
                    );
                });
            } else {
                // Caso o nó não seja dos tipos acima, remove diretamente o nó e as arestas
                setNodes((prevNodes) => prevNodes.filter((prevNode) => prevNode.id !== node.id));
    
                setEdges((prevEdges) => {
                    // Coletar as arestas conectadas ao nó antes de removê-las
                    connectedEdges = prevEdges.filter(
                        (edge) => edge.source === node.id || edge.target === node.id
                    );
    
                    return prevEdges.filter(
                        (edge) => edge.source !== node.id && edge.target !== node.id
                    );
                });
            }
    
            // Registra a remoção no histórico
            if (shouldAddToHistory) {
                addToHistory({
                    action: "removeNode",
                    data: node,
                    children: childrenData, // Inclui os filhos no histórico
                    edges: connectedEdges, // Inclui as arestas conectadas no histórico
                });
            }
        },
        [addToHistory, setNodes, setEdges]
    ); //* Remove Nó
    

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
    ); //* Adicona Seta

        
    const removeEdge = useCallback(
        (edge, shouldAddToHistory = true) => {
            if (edge) {
                // Gera um ID para a aresta caso ela não tenha
                if (!edge) {
                    edge.id = uuidv4();
                }
    
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
    ); //* Remove Seta
    

    const enterPresentationUnit = useCallback(
        (node, updatedNode, shouldAddToHistory = true) => {
            if (node && updatedNode) {
                const { id, extent, position, undeRedo } = updatedNode;
    
    
                if (shouldAddToHistory) {
                    addToHistory({
                        action: "enterPresentationUnit",
                        data: node,
                    });
                }
    
                if (undeRedo) {
                    setNodes((prevNodes) =>
                        prevNodes.map((nd) => {
                            if (nd.id === node.id) {
                                return {
                                    ...nd,
                                    parentId: id,
                                    extent: extent,
                                    positionAbsolute: { ...position },
                                };
                            }
                            return nd;
                        })
                    );
                } else {
                    return {
                        ...node,
                        parentId: id,
                        extent: "parent",
                        position: {
                            x: node.position.x - position.x,
                            y: node.position.y - position.y,
                        },
                    };
                }
            }
        },
        [addToHistory, setNodes]
    ); //* Nó entra na Unidade de Apresentação
    

    const exitPresentationUnit = useCallback(
        (node, shouldAddToHistory = true) => {
            let updatedNode;
            let originalNode = node;
    
            setNodes((prevNodes) =>
                prevNodes.map((nd) => {
                    if (node) {
                        if (nd.id === node.id) {
                            delete nd.parentId;
                            delete nd.extent;
                            nd.position = node.position;
                            nd.positionAbsolute = node.positionAbsolute;
                            updatedNode = nd;
                            return nd;
                        }
                    } else {
                        if (!!nd.parentId && !!nd.extent && nd.selected) {
                            originalNode = {
                                id: nd.parentId,
                                extent: nd.extent,
                                position: nd.positionAbsolute,
                                undeRedo: true,
                            };
                            delete nd.parentId;
                            delete nd.extent;
                            updatedNode = nd;
                            return nd;
                        }
                    }
    
                    return nd;
                })
            );
    
            if (!node && shouldAddToHistory) {
                addToHistory({
                    action: "exitPresentationUnit",
                    data: updatedNode,
                    originalNode: originalNode,
                });
            }
        },
        [addToHistory, setNodes]
    ); //* Nó sai da Unidade de Apresentação
    

    const duplicarNode = useCallback(
        (selectedNode, shouldAddToHistory = true) => {
            if (!selectedNode) return;
    
            let duplicatedNode = null;
            let duplicatedChildren = [];
            let duplicatedEdges = [];
    
            // Primeiro, cria o nó duplicado
            duplicatedNode = {
                ...selectedNode,
                id: uuid(),
                position: {
                    x: selectedNode.position.x + 40,
                    y: selectedNode.position.y + 40,
                },
                selected: true,
            };
    
            // Se necessário, duplica os filhos
            if (
                selectedNode.type === "presentation-unity" ||
                selectedNode.type === "presentation-unity-acessible"
            ) {
                duplicatedChildren = getNodes()
                    .filter((node) => node.parentId === selectedNode.id)
                    .map((childNode) => ({
                        ...childNode,
                        id: uuid(),
                        position: {
                            x: childNode.position.x,
                            y: childNode.position.y,
                        },
                        parentId: duplicatedNode.id,
                        selected: false,
                    }));
            }
    
            // Gera as arestas duplicadas
            setEdges((prevEdges) => {
                const connectedEdges = prevEdges.filter(
                    (edge) =>
                        edge.source === selectedNode.id || edge.target === selectedNode.id
                );
    
                const childEdges = prevEdges.filter((edge) =>
                    duplicatedChildren.some(
                        (child) => child.id === edge.source || child.id === edge.target
                    )
                );
    
                duplicatedEdges = [...connectedEdges, ...childEdges].map((edge) => {
                    const newSource =
                        edge.source === selectedNode.id
                            ? duplicatedNode.id
                            : duplicatedChildren.find((child) => child.id === edge.source)?.id ||
                            edge.source;
    
                    const newTarget =
                        edge.target === selectedNode.id
                            ? duplicatedNode.id
                            : duplicatedChildren.find((child) => child.id === edge.target)?.id ||
                            edge.target;
    
                    return {
                        ...edge,
                        id: uuid(),
                        source: newSource,
                        target: newTarget,
                    };
                });
    
                return [...prevEdges, ...duplicatedEdges];
            });
    
            // Atualiza os nós
            setNodes((prevNodes) => [
                ...prevNodes.map((node) =>
                    node.selected ? { ...node, selected: false } : node
                ),
                duplicatedNode,
                ...duplicatedChildren,
            ]);
    
            // Adiciona ao histórico
            if (shouldAddToHistory) {
                addToHistory({
                    action: "addNode",
                    data: duplicatedNode,
                    children: duplicatedChildren,
                    edges: duplicatedEdges,
                });
            }
        },
        [addToHistory, setNodes, setEdges, setNodes, getNodes]
    ); //* Duplica Nó
    
    const pasteNode = useCallback(
        (copiedDataRef, mousePositionRef, shouldAddToHistory = true) => {
            const { node, children, edges } = copiedDataRef.current;
            if (!node) {
                console.warn("Nenhum dado copiado disponível para colar.");
                return;
            }

            const position = mousePositionRef.current;

            // Gera um novo ID para o nó principal
            const newNodeId = uuid();

            // Atualiza o nó principal com o novo ID e posição
            const newNode = {
                ...node,
                id: newNodeId,
                position: {
                    x: position.x,
                    y: position.y,
                },
            };
            
            // Remove explicitamente parentId e target, se existirem no objeto original
            delete newNode.parentId;
            //delete newNode.target;
            delete newNode.extent;
            

            // Duplica os filhos com novos IDs e ajusta as posições
            const duplicatedChildren = children.map((childNode) => ({
                ...childNode,
                id: uuid(),
                position: {
                    x: childNode.position.x,
                    y: childNode.position.y,
                },
                parentId: newNodeId,
            }));

            // Duplica as arestas conectando aos novos IDs
            const duplicatedEdges = edges.map((edge) => {
                const newSource =
                    edge.source === node.id
                        ? newNodeId // Substitui pelo novo ID do nó principal
                        : duplicatedChildren.find((child) => child.id === edge.source)?.id || edge.source;

                const newTarget =
                    edge.target === node.id
                        ? newNodeId // Substitui pelo novo ID do nó principal
                        : duplicatedChildren.find((child) => child.id === edge.target)?.id || edge.target;

                return {
                    ...edge,
                    id: uuid(), // Gera um novo ID para a aresta
                    source: newSource,
                    target: newTarget,
                };
            });

            
            // Adiciona o nó, filhos e arestas ao sistema
            setEdges((prevEdges) => [...prevEdges, ...duplicatedEdges]);

            // Atualiza os nós
            setNodes((prevNodes) => [
                ...prevNodes.map((node) =>
                    node.selected ? { ...node, selected: false } : node
                ),
                newNode,
                ...duplicatedChildren,
            ]);

            addToHistory({
                action: "addNode",
                data: newNode,
                children: duplicatedChildren,
                edges: duplicatedEdges,
            });
        },
        [setEdges, setNodes, addToHistory]
    ); //* Cola o Nó

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
    }, [setNodes]); //* Movimenta o Nó
    

    const recordMove = useCallback(
        (nodeData) => {
            setNodes((prevNodes) => {
                const nodeToMove = prevNodes.find((node) => node.id === nodeData.id);
                if (!nodeToMove) return prevNodes;
    
                addToHistory({
                    action: "movedNode",
                    data: { id: nodeData.id, position: nodeData.position },
                    previousPosition: nodeToMove.position
                });
    
                return prevNodes.map((node) =>
                    node.id === nodeData.id
                        ? { ...node, position: nodeData.position }
                        : node
                );
            });
        },
        [addToHistory, setNodes]
    ); //* Regista os Movimentos
    
    const undo = useCallback(() => {
        const canUndo = currentIndex.current > -1;
        console.log("now history"+currentIndex.current+" : " + JSON.stringify(history[currentIndex.current], null, 2));
        if (canUndo) {
    
            // Movendo o índice para o anterior
            const { action, data, children, previousPosition, originalNode, edges } = history[currentIndex.current] || {};
            currentIndex.current -= 1; // Decrementa para o índice anterior
    
            if (!action || !data) return; // Verifica valores válidos
    
            // eslint-disable-next-line default-case
            switch (action) {
                case "addNode": {
                    removeNode(data, children, false); // Executa a remoção
                    break;
                }
                case "removeNode": {
                    addNode(data, children, edges, false); // Executa a adição
                    break;
                }
                case "addEdge": {
                    removeEdge(data, false); // Executa a remoção de aresta
                    break;
                }
                case "removeEdge": {
                    addEdge(data, false); // Executa a adição de aresta
                    break;
                }
                case "movedNode": {
                    movedNode({ ...data, previousPosition }, true); // Movimenta o nó
                    break;
                }
                case "enterPresentationUnit": {
                    exitPresentationUnit(data); // Sai da unidade de apresentação
                    break;
                }
                case "exitPresentationUnit": {
                    enterPresentationUnit(data, originalNode); // Entra na unidade de apresentação
                    break;
                }
            }
        }
    }, [addEdge, addNode, enterPresentationUnit, exitPresentationUnit, history, movedNode, removeEdge, removeNode]);
       //* Ctrl + Z Desfazer

    const redo = useCallback(() => {
        const canRedo = currentIndex.current < history.length - 1;
        console.log("now history"+currentIndex.current+" : " + JSON.stringify(history[currentIndex.current], null, 2));
        if (canRedo) {
            currentIndex.current += 1; // Incrementa para o próximo índice
    
            const { action, data, children, previousPosition, originalNode, edges } = history[currentIndex.current] || {};
            if (!action || !data) return; // Verifica valores válidos
    
            // eslint-disable-next-line default-case
            switch (action) {
                case "addNode": {
                    addNode(data, children, edges, false); // Executa a adição
                    break;
                }
                case "addEdge": {
                    addEdge(data, false); // Executa a adição de aresta
                    break;
                }
                case "removeNode": {
                    removeNode(data, false); // Executa a remoção
                    break;
                }
                case "removeEdge": {
                    removeEdge(data, false); // Executa a remoção de aresta
                    break;
                }
                case "movedNode": {
                    movedNode({ ...data, previousPosition }, false); // Movimenta o nó
                    break;
                }
                case "enterPresentationUnit": {
                    enterPresentationUnit(data, originalNode); // Entra na unidade de apresentação
                    break;
                }
                case "exitPresentationUnit": {
                    exitPresentationUnit(data); // Sai da unidade de apresentação
                    break;
                }
            }
        }
    }, [addEdge, addNode, enterPresentationUnit, exitPresentationUnit, history, movedNode, removeEdge, removeNode]);
       //* Ctrl + shift + Z Refazer

    return { addNode, removeNode, addEdge, removeEdge, enterPresentationUnit, exitPresentationUnit, duplicarNode,pasteNode, undo, redo, addToHistory, recordMove };
}