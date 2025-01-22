import { useEffect, useRef, useCallback } from "react";
import { useReactFlow } from "reactflow";

export default function useKeyBindings({
    removeNode,
    undo,
    redo,
    removeEdge,
    copyNode,
    duplicarNode,
    pasteNode,
    getMousePosition,
    }) {
    const { getNodes, getEdges } = useReactFlow();
    const copiedDataRef = useRef({ node: null, children: [] });

    const mousePositionRef = useRef({ x: 0, y: 0 });

    // Atualizar posição do mouse em eventos de movimento
    useEffect(() => {
        const updateMousePosition = (e) => {
        mousePositionRef.current = getMousePosition(e);
        
        };

        document.addEventListener("mousemove", updateMousePosition);
        return () => {
        document.removeEventListener("mousemove", updateMousePosition);
        };
    }, [getMousePosition]);

    // Functions wrapped in useCallback
    const handleUndo = useCallback(() => {
        undo();
    }, [undo]);


    const handleRedo = useCallback(() => {
        redo();
    }, [redo]);


    const handleDelete = useCallback(() => {
        const selectedNodes = getNodes().filter((node) => node.selected);

        if (selectedNodes.length === 1) {
            removeNode(selectedNodes[0]);
        } else if (selectedNodes.length > 1) {
            removeNode(selectedNodes);
        }else{
            const selectedEdge = getEdges().find((edge) => edge.selected);
            if (selectedEdge) {
            removeEdge(selectedEdge);
            }
        }
        




    }, [getNodes, getEdges, removeNode, removeEdge]);


    const handleCut = useCallback(() => {
        const selectedNodes = getNodes().filter((node) => node.selected);

        if (selectedNodes.length === 1) {
            copiedDataRef.current = copyNode(selectedNodes[0], true);
        } else if (selectedNodes.length > 1) {
            copiedDataRef.current = copyNode(selectedNodes,true);
        };
    }, [getNodes, copyNode]);


    const handleDuplicate = useCallback(() => {
        const selectedNode = getNodes().find((node) => node.selected);
        if (selectedNode) {
        duplicarNode(selectedNode);
        }
    }, [getNodes, duplicarNode]);


    const handleCopy = useCallback(() => {
        const selectedNodes = getNodes().filter((node) => node.selected);

        if (selectedNodes.length === 1) {
            copiedDataRef.current = copyNode(selectedNodes[0]);
        } else if (selectedNodes.length > 1) {
            copiedDataRef.current = copyNode(selectedNodes);
        };
        
    }, [copyNode, getNodes]);
    

    const handlePaste = useCallback(
        ( e, navbar = false) => {
            pasteNode(copiedDataRef, mousePositionRef, navbar)
        },
        [pasteNode]
    );


    // Keyboard handler
    useEffect(() => {
        const handleKeyDown = (e) => {
        const key = e.key?.toLowerCase();
        switch (true) {
            case e.ctrlKey && !e.shiftKey && key === "z":
            e.preventDefault();
            handleUndo();
            break;
            case e.ctrlKey && e.shiftKey && key === "z":
            e.preventDefault();
            handleRedo();
            break;
            case key === "delete" || key === "backspace":
            e.preventDefault();
            handleDelete();
            break;
            case e.ctrlKey && key === "d":
            e.preventDefault();
            handleDuplicate();
            break;
            case e.ctrlKey && key === "c":
            e.preventDefault();
            handleCopy();
            break;
            case e.ctrlKey && key === "x":
            e.preventDefault();
            handleCut();
            break
            case e.ctrlKey && key === "v":
            e.preventDefault();
            handlePaste(e);
            break;
            default:
            break;
        }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
        document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleUndo, handleRedo, handleDelete, handleDuplicate, handleCopy, handlePaste, handleCut]);

    return {
        handleUndo,
        handleRedo,
        handleDelete,
        handleDuplicate,
        handleCopy,
        handleCut,
        handlePaste,
    };
}
