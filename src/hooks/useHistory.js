import  { useCallback, useRef, useState } from "react";
import { useReactFlow } from "reactflow";
import { v4 as uuid } from "uuid";
import { v4 as uuidv4 } from 'uuid';

export default function useHistory() {
    const [history, setHistory] = useState([]);
    const currentIndex = useRef(-1);
    const { setNodes, getNodes, setEdges, getEdges } = useReactFlow();

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
    
            if (!Array.isArray(node)) {
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
                    return [
                        ...prevEdges,
                        ...edges.map((edge) => ({
                            ...edge,
                            id: uuid(), // Gera um novo ID para cada edge
                        })),
                    ];
                });
    
                if (shouldAddToHistory) {
                    addToHistory({
                        action: "addNode",
                        data: node,
                        children: updatedChildren,
                        edges: edges.map((edge) => ({
                            ...edge,
                            id: uuid(), // Gera um novo ID para histórico também
                        })),
                    });
                }
            } else {
                setNodes((prevNodes) => {
                    return [...prevNodes, ...node];
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
            let nodes =[]

            if(!Array.isArray(node)){// Caso seja só um nó
                if (node.type === "presentation-unity" || node.type === "presentation-unity-acessible" ) {
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
            }else{
                nodes = node

                setNodes((prevNodes) => {
                    // Filtra prevNodes removendo os nós que estão presentes em nodesOnDelete
                    return prevNodes.filter((node) => 
                        !nodes.some((nodeToDelete) => nodeToDelete.id === node.id)
                    );
                });
                setEdges((prevEdges) => {
                    // Coletar as arestas conectadas ao nó antes de removê-las
                    connectedEdges = prevEdges.filter(
                        (edge) => edge.source === node.id || edge.target === node.id
                    );
    
                    return prevEdges.filter(
                        (edge) => edge.source !== node.id && edge.target !== node.id
                    );
                });

                if(shouldAddToHistory){
                addToHistory({
                    action: "removeNode",
                    data: nodes
                })
                }
            }
        },
        [addToHistory, setNodes, setEdges]
    ); //* Remove Nó
    

    const addEdge = useCallback(
        (edge, shouldAddToHistory = true) => {
            if (edge) {
            // Adiciona um id único à aresta
            const edgeWithId = { ...edge, id: uuid() };
            
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
        [addToHistory, setNodes, setEdges, getNodes]
    ); //* Duplica Nó
    

    const pasteNode = useCallback(
        (copiedDataRef, mousePositionRef, Navbar) => {
            const { node, children, edges } = copiedDataRef.current;
            
            const position = mousePositionRef.current;
    
            if (!node) {
                return;
            }
    
            if (!Array.isArray(node)) {

                if(Navbar){
                    position.x = node.positionAbsolute.x + 50
                    position.y = node.positionAbsolute.y + 50
                }

                // Cria um mapeamento entre o ID original e o novo ID
                const idMap = {};
    
                // Gera um novo ID para o nó principal e adiciona ao mapeamento
                const newNodeId = uuid();
                idMap[node.id] = newNodeId;
    
                // Atualiza o nó principal com a nova posição e novo ID
                const newNode = {
                    ...node,
                    id: newNodeId,
                    position: {
                        x: position.x,
                        y: position.y,
                    },
                };
    
                // Duplicar os filhos com novos IDs, ajustar posições e adicionar ao mapeamento
                const duplicatedChildren = children.map((childNode) => {
                    const newChildId = uuid();
                    idMap[childNode.id] = newChildId;
    
                    return {
                        ...childNode,
                        id: newChildId, // Novo ID para cada filho
                        position: {
                            x: childNode.position.x + 20, // Ajuste de posição para evitar sobreposição
                            y: childNode.position.y + 20,
                        },
                        parentId: newNodeId, // Ajusta o parentId para o novo ID do nó principal
                    };
                });
    
                // Duplicar as arestas, gerando novos IDs e ajustando os IDs de source e target
                const duplicatedEdges = edges.map((edge) => {
                    const newEdgeId = uuid();
                    const newSource = idMap[edge.source] || edge.source;
                    const newTarget = idMap[edge.target] || edge.target;
    
                    return {
                        ...edge,
                        id: newEdgeId, // Novo ID para a aresta
                        source: newSource,
                        target: newTarget,
                    };
                });
    
                // Define todos os nós como não selecionados
                setNodes((prevNodes) =>
                    prevNodes.map((node) => ({
                        ...node,
                        selected: false, // Define o campo 'selected' como falso
                    }))
                );
                
                // Atualiza os nós com o novo nó principal e filhos duplicados
                setNodes((prevNodes) => [
                    // Primeiro, define todos os nós como não selecionados
                    ...prevNodes.map((node) => ({
                        ...node,
                        selected: false, // Define o campo 'selected' como falso
                        })),
                    // Adiciona o novo nó duplicado
                    newNode,
                    // Adiciona os filhos duplicados
                    ...duplicatedChildren,
                ]);
                
    
                // Atualiza as arestas
                setEdges((prevEdges) => [
                    ...prevEdges.map((edge) => ({
                        ...edge, // Mantém todas as propriedades da aresta
                        selected: false, // Define o campo 'selected' como false
                    })),
                    ...duplicatedEdges.map((edge) => ({
                        ...edge, // Mantém todas as propriedades da aresta
                        selected: false, // Define o campo 'selected' como false
                    }))
                ]);

                addToHistory({
                    action: "addNode",
                    data: newNode,
                    children: duplicatedChildren,
                    edges:duplicatedEdges
                });
                
            } else {
                // Lógica para duplicar os nós quando "node" for uma lista
                if(Navbar){
                    position.x = node[0].positionAbsolute.x + 50
                    position.y = node[0].positionAbsolute.y + 50
                }

                // Pega a posição do primeiro nó e calcula o vetor de deslocamento
                const firstNode = node[0];  // Considera o primeiro nó da lista
                const deltaX = position.x - firstNode.position.x;
                const deltaY = position.y - firstNode.position.y;

                // Duplicação dos nós
                const duplicatedNodes = node.map((n) => {
                    const { parentId, extent, ...rest } = n; // Remove 'parentId' e 'extent'
                    return {
                        ...rest,
                        id: uuid(), // Gera um novo ID para cada nó
                        position: {
                            x: n.positionAbsolute.x + deltaX, // Aplica o deslocamento no X
                            y: n.positionAbsolute.y + deltaY, // Aplica o deslocamento no Y
                        },
                    };
                });                

                // Atualiza o mapeamento de ids antigos para novos
                const nodeIdMap = node.reduce((acc, n, index) => {
                    // O mapeamento irá pegar o ID antigo e mapear para o novo ID
                    acc[n.id] = duplicatedNodes[index].id;
                    return acc;
                }, {});


                // Duplicação das arestas, atualizando os IDs das conexões
                const duplicatedEdges = edges.map((edge) => {
                    // Atualiza as arestas com os novos IDs mapeados
                    const newSource = nodeIdMap[edge.source] || edge.source;
                    const newTarget = nodeIdMap[edge.target] || edge.target;

                    return {
                        ...edge,
                        source: newSource,  // Atualiza o source
                        target: newTarget,  // Atualiza o target
                        id: uuid(),         // Gera um novo ID para cada aresta
                    };
                });


                // Atualiza os nós no estado
                setNodes((prevNodes) => [
                    ...prevNodes.map((node) => ({
                        ...node, // Mantém todas as propriedades da aresta
                        selected: false, // Define o campo 'selected' como false
                    })),
                    ...duplicatedNodes, // Adiciona os nós duplicados
                ]);

                // Atualiza as arestas no estado
                setEdges((prevEdges) => [
                    ...prevEdges.map((edge) => ({
                        ...edge, // Mantém todas as propriedades da aresta
                        selected: false, // Define o campo 'selected' como false
                    })),
                    ...duplicatedEdges, // Adiciona as arestas duplicadas
                ]);
                
                addToHistory({
                    action: "addNode",
                    data: duplicatedNodes,
                    children: true,
                    edges:duplicatedEdges
                });
            
            }
        },
        [addToHistory, setEdges, setNodes]
    );
    
    
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
    
    const copyNode = useCallback(
        (nodes, cut) =>{
            if(!Array.isArray(nodes)){
                
                const children =
                nodes.type === "presentation-unity" || nodes.type === "presentation-unity-acessible"
                ? getNodes().filter((node) => node.parentId === nodes.id)
                : [];
            
                // Filtrar as arestas que conectam os filhos do nó
                const childEdges = getEdges().filter((edge) => {
                    // Verifica se tanto o source quanto o target são filhos do nó
                    const isSourceChild = children.some((child) => child.id === edge.source);
                    const isTargetChild = children.some((child) => child.id === edge.target);
                    
                    // Aresta é válida se ambos source e target forem filhos
                    return isSourceChild && isTargetChild;
                });
            
                // Criar um mapeamento entre o id original e o id duplicado para as arestas
                const nodeIdMap = { [nodes.id]: uuid() }; // Mapeia o ID do nó original para um novo ID
            
                // Duplicar os filhos com novos IDs
                const duplicatedChildren = children.map((child) => {
                    const newChild = { ...child, id: uuid() }; // Gera um novo ID para cada filho
                    nodeIdMap[child.id] = newChild.id; // Mapeia o ID original do filho para o novo ID
                    return newChild;
                });
            
                // Duplicar as arestas entre os filhos, ajustando os ids
                const copiedChildEdges = childEdges.map((edge) => {
                    const newEdge = {
                    ...edge,
                    id: uuid(), // Gera um novo id para a aresta
                    source: nodeIdMap[edge.source] || edge.source, // Ajusta o source para o novo id
                    target: nodeIdMap[edge.target] || edge.target  // Ajusta o target para o novo id
                    };
            
                    return newEdge;
                });
                


                if(cut){
                    removeNode(nodes)
                }

                
                return { node: { ...nodes, id: nodeIdMap[nodes.id] }, children: duplicatedChildren, edges: copiedChildEdges };
            
            }else{
                const duplicatedNodes = nodes.map((node) => ({
                    ...node,
                    id: uuid(), // Modifica o id para garantir que ele seja único
                }));
                
                // Criar um mapeamento entre o id original e o id duplicado para as arestas
                const nodeIdMap = nodes.reduce((map, node, index) => {
                    map[node.id] = duplicatedNodes[index].id;
                    return map;
                }, {});
                
                // Filtrar os nós selecionados
                const selectedNodes = nodes.filter((node) => node.selected); // Filtra os nós que estão selecionados
                
                // Filtrar as arestas que conectam somente os nós selecionados
                const duplicatedEdges = getEdges()
                    .filter((edge) => 
                        // Verifica se tanto o source quanto o target da aresta são nós selecionados
                        selectedNodes.some((node) => node.id === edge.source) &&
                        selectedNodes.some((node) => node.id === edge.target)
                    )
                    .map((edge) => ({
                        ...edge,
                        id: uuid(), // Gera um novo ID único para a aresta
                        source: nodeIdMap[edge.source] || edge.source, // Ajusta o source para o novo id
                        target: nodeIdMap[edge.target] || edge.target, // Ajusta o target para o novo id
                    }));


                if(cut){
                    removeNode(nodes)
                }
                
                return { node: duplicatedNodes, children: [], edges: duplicatedEdges };
            }


        },[getEdges, getNodes, removeNode]
    );

    const undo = useCallback(() => {
        const canUndo = currentIndex.current > -1;
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

    return { addNode, removeNode, addEdge, removeEdge, enterPresentationUnit, exitPresentationUnit, duplicarNode,pasteNode, undo, redo, addToHistory, recordMove, copyNode };
}