import React, { createContext, useState, useContext } from 'react';

const ModelerContext = createContext();

export const ModelerProvider = ({ children }) => {
    const [currentEdge, setCurrentEdge] = useState("");

    return (
        <ModelerContext.Provider value={{ currentEdge, setCurrentEdge }}>
            {children}
        </ModelerContext.Provider>
    );
};

export const useModeler = () => {
    return useContext(ModelerContext);
};