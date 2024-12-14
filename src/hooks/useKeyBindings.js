import { useEffect, useRef, useState } from "react";
import { useReactFlow } from "reactflow";
import { v4 as uuid } from "uuid";

export default function useKeyBindings({ removeNode, undo, redo, removeEdge, addNode, duplicarNode, addToHistory }) {
const { setNodes, getNodes, getEdges } = useReactFlow();
const copiedDataRef = useRef({ node: null, children: [] }); // Ref para armazenar o nó e seus filhos copiados



useEffect(() => {
    const handleKeyDown = (e) => {
        const key = e.key?.toLowerCase();

    switch (true) {
        case e.ctrlKey && !e.shiftKey && key === "z": { //* Ctrl + Z = Desfazer
            e.preventDefault(); // Desativa o comportamento padrão
            undo(); 
            break;
        }

        case e.ctrlKey && e.shiftKey && key === "z": { //* Ctrl + Shift + Z = Refazer
            e.preventDefault(); // Desativa o comportamento padrão
            redo(); 
            break;
        }

        case key === "delete" || key === "backspace": { //* Apagar NODE(Nó) or EDGE(Seta) 
        e.preventDefault(); // Desativa o comportamento padrão de React Flow
        const selectedNode = getNodes().find((node) => node.selected);
        if (selectedNode) {
            removeNode(selectedNode);
            break;
        }

        const selectedEdge = getEdges().find((edge) => edge.selected);
        if (selectedEdge) {
            if (selectedEdge.id) {
            removeEdge(selectedEdge);
            } else {
            console.error("Erro: A aresta selecionada não possui um ID:", selectedEdge);
            }
            break;
        }
        break;
        }

        case e.ctrlKey && key === "d": { //* Duplicar Elemento
            e.preventDefault();
            const selectedNode = getNodes().find((node) => node.selected);
        
            if (!selectedNode) return;
        
            duplicarNode(selectedNode)
            break;
        }
        

        case e.ctrlKey && key === "c": { //* Copiar Elemento
            e.preventDefault();
            const selectedNode = getNodes().find((node) => node.selected);
            if (selectedNode) {
                const children = (selectedNode.type === "presentation-unity" || selectedNode.type === "presentation-unity-acessible")
                ? getNodes().filter((node) => node.parentId === selectedNode.id)
                : [];
                
                copiedDataRef.current = { node: selectedNode, children }; // Atualiza a ref com o nó e os filhos copiados
            }

            break;
        }


        case e.ctrlKey && key === "x": { //* Cortar Elemento 
            e.preventDefault();
            
            const selectedNode = getNodes().find((node) => node.selected);
            if (selectedNode) {
                const children = (selectedNode.type === "presentation-unity" || selectedNode.type === "presentation-unity-acessible")
                    ? getNodes().filter((node) => node.parentId === selectedNode.id)
                    : [];
                
                copiedDataRef.current = { node: selectedNode, children }; // Armazena o nó copiado e seus filhos
        
                // Remove o nó (e filhos) da lista de nós
                setNodes((prevNodes) => {
                    const newNodes = prevNodes.filter((node) => node.id !== selectedNode.id);
                    
                    // Remove filhos, se houver
                    if (children.length > 0) {
                        const childrenIds = children.map((childNode) => childNode.id);
                        return newNodes.filter((node) => !childrenIds.includes(node.id));
                    }
        
                    return newNodes;
                });
        
                // Adiciona ao histórico a remoção do nó
                addToHistory({
                    action: "removeNode",
                    data: selectedNode,
                    ...(children.length > 0 && { children }),  // Inclui os filhos, se houver
                });
            }
            break;
        }
        

        case e.ctrlKey && key === "v": { //* Colar Elemento
            e.preventDefault();
            
            setNodes((prevNodes) => {
                // Acessa a versão mais recente de copiedData usando o useRef
                const { node, children } = copiedDataRef.current;
        
                if (!node) return prevNodes; // Verifica se há algo copiado
        
                const newNode = {
                    ...node,
                    id: uuid(), // Gera um novo ID para o nó copiado
                    position: {
                        x: node.position?.x + 40, // Desloca a posição para evitar sobreposição
                        y: node.position?.y + 40,
                    },
                    selected: true, // Marca o nó como selecionado
                };
        
                // Adiciona o nó copiado à lista de nós
                const newNodes = [...prevNodes, newNode];
        
                let duplicatedChildren = []; // Inicializa a variável para armazenar os filhos duplicados
        
                // Se o tipo do nó for "presentation-unity" ou "presentation-unity-acessible", cola os filhos também
                if (node.type === "presentation-unity" || node.type === "presentation-unity-acessible") {
                    duplicatedChildren = children.map((childNode) => ({
                        ...childNode,
                        id: uuid(),
                        position: {
                            x: childNode.position?.x, // Desloca a posição para evitar sobreposição
                            y: childNode.position?.y,
                        },
                        parentId: newNode.id, // Atribui o novo ID do nó copiado como parentId
                        selected: false,
                    }));
        
                    newNodes.push(...duplicatedChildren);
                }
        
                // Adiciona ao histórico a adição do nó e seus filhos (se houver)
                addToHistory({
                    action: "addNode",
                    data: newNode,
                    ...(duplicatedChildren.length > 0 && { children: duplicatedChildren }), // Inclui os filhos, se houver
                });
        
                return newNodes;
            });
            break;
        }
        
        

        default:
        break;
    }
    };



    
    document.addEventListener("keydown", handleKeyDown);
    return () => {
    document.removeEventListener("keydown", handleKeyDown);
    };
}, [getNodes, getEdges, removeNode, removeEdge, setNodes, undo, redo]);

return null;
}