import { createContext, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Always use dark theme for professional look
  const darkMode = true;
  
  // Apply theme class to body on initial render
  useEffect(() => {
    document.body.classList.add('dark');
    
    // Clean up function
    return () => {
      document.body.classList.remove('dark');
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 