import { createContext, useContext, useState } from "react";

// Create Context
const DarkModeContext = createContext();

// Provider to wrap the app
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true); // default dark

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Hook to use in components
export const useDarkMode = () => useContext(DarkModeContext);
