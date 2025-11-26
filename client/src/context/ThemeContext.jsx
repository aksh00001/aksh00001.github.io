import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [isDayMode, setIsDayMode] = useState(true); // true = day (animations on), false = night (animations off)

    const toggleTheme = () => {
        setIsDayMode(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDayMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
