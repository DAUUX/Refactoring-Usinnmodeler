import { useEffect, useRef, useCallback } from "react";
import { useReactFlow } from "reactflow";

export default function useKeyBindings({
    removeNode,
    undo,
    redo,
    removeEdge,
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
        const selectedNode = getNodes().find((node) => node.selected);
        if (selectedNode) {
        removeNode(selectedNode);
        return;
        }



        const selectedEdge = getEdges().find((edge) => edge.selected);
        if (selectedEdge) {
        removeEdge(selectedEdge);
        }
    }, [getNodes, getEdges, removeNode, removeEdge]);


    const handleRecort = useCallback(() => {
        const selectedNode = getNodes().find((node) => node.selected);
        if (selectedNode) {
        const children =
            selectedNode.type === "presentation-unity" ||
            selectedNode.type === "presentation-unity-acessible"
            ? getNodes().filter((node) => node.parentId === selectedNode.id)
            : [];

        const connectedEdges = getEdges().filter(
            (edge) =>
            edge.source === selectedNode.id || edge.target === selectedNode.id
        );

        const childEdges = getEdges().filter((edge) =>
            children.some(
            (child) => child.id === edge.source || child.id === edge.target
            )
        );

        const copiedEdges = [...connectedEdges, ...childEdges].map((edge) => ({
            ...edge,
            source: children.find((child) => child.id === edge.source)
            ? edge.source
            : edge.source === selectedNode.id
            ? selectedNode.id
            : edge.source,
            target: children.find((child) => child.id === edge.target)
            ? edge.target
            : edge.target === selectedNode.id
            ? selectedNode.id
            : edge.target,
        }));
        removeNode(selectedNode, children, true)
        copiedDataRef.current = { node: selectedNode, children, edges: copiedEdges };
        }
    }, [getNodes, getEdges, removeNode]);


    const handleDuplicate = useCallback(() => {
        const selectedNode = getNodes().find((node) => node.selected);
        if (selectedNode) {
        duplicarNode(selectedNode);
        }
    }, [getNodes, duplicarNode]);


    const handleCopy = useCallback(() => {
        const selectedNode = getNodes().find((node) => node.selected);
        if (selectedNode) {
        const children =
            selectedNode.type === "presentation-unity" ||
            selectedNode.type === "presentation-unity-acessible"
            ? getNodes().filter((node) => node.parentId === selectedNode.id)
            : [];

        const connectedEdges = getEdges().filter(
            (edge) =>
            edge.source === selectedNode.id || edge.target === selectedNode.id
        );

        const childEdges = getEdges().filter((edge) =>
            children.some(
            (child) => child.id === edge.source || child.id === edge.target
            )
        );

        const copiedEdges = [...connectedEdges, ...childEdges].map((edge) => ({
            ...edge,
            source: children.find((child) => child.id === edge.source)
            ? edge.source
            : edge.source === selectedNode.id
            ? selectedNode.id
            : edge.source,
            target: children.find((child) => child.id === edge.target)
            ? edge.target
            : edge.target === selectedNode.id
            ? selectedNode.id
            : edge.target,
        }));

        copiedDataRef.current = { node: selectedNode, children, edges: copiedEdges };
        }
    }, [getNodes, getEdges]);


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
            handleRecort();
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
    }, [handleUndo, handleRedo, handleDelete, handleDuplicate, handleCopy, handlePaste, handleRecort]);

    return {
        handleUndo,
        handleRedo,
        handleDelete,
        handleDuplicate,
        handleCopy,
        handleRecort,
        handlePaste,
    };
}
