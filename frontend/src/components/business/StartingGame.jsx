import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [isGameStarted, setIsGameStarted] = useState(false);

    return (
        <GameContext.Provider value={{ isGameStarted, setIsGameStarted }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);
