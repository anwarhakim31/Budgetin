import React, { createContext, useContext, useEffect, useState } from "react";

const DarkmodeContext = createContext();

export const useDarkMode = () => {
  return useContext(DarkmodeContext);
};

const DarkmodeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setIsDark(JSON.parse(savedTheme));
    }
  }, []);

  const handleToggleIsDark = () => {
    setIsDark((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <DarkmodeContext.Provider value={{ isDark, handleToggleIsDark }}>
      {children}
    </DarkmodeContext.Provider>
  );
};

export default DarkmodeProvider;
