import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

// Create context with a default value and proper type
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define props for the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
}

// Theme provider component
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const toggleTheme = (): void => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

// Example component using the theme
const ThemedComponent = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  const themeStyles: React.CSSProperties = {
    backgroundColor: isDarkTheme ? '#333' : '#fff',
    color: isDarkTheme ? '#fff' : '#333',
    padding: '20px'
  };

  return (
    <div style={themeStyles}>
      <h1>Themed Component</h1>
      <p>This component uses the current theme from context.</p>
      <button onClick={toggleTheme}>
        Switch to {isDarkTheme ? 'Light' : 'Dark'} Theme
      </button>
    </div>
  );
};

export default ThemedComponent;
