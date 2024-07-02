// ColorContext.jsx
import React, { createContext, useState, useContext } from 'react';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
    const [headerColor, setHeaderColor] = useState('#3FC7B8');
    const [footerColor, setFooterColor] = useState('#3FC7B8');
    const [backgroundColor, setBackgroundColor] = useState('#3FC7B8');

    const value = { headerColor, footerColor, backgroundColor,
        setHeaderColor, setFooterColor, setBackgroundColor }

    return (
        <ColorContext.Provider value={value}>
            {children}
        </ColorContext.Provider>
    );
};

export const useColor = () => useContext(ColorContext);
