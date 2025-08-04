import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDark: boolean;
  isSystemMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isSystemMode, setIsSystemMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (saved === 'dark' || saved === 'light') {
      setIsDark(saved === 'dark');
      setIsSystemMode(false);
    } else {
      setIsDark(mediaQuery.matches);
      setIsSystemMode(true);
    }

    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (isSystemMode) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [isSystemMode]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      if (!isSystemMode) {
        localStorage.setItem('theme', 'dark');
      }
    } else {
      document.documentElement.classList.remove('dark');
      if (!isSystemMode) {
        localStorage.setItem('theme', 'light');
      }
    }
  }, [isDark, isSystemMode]);

  const toggleTheme = () => {
    if (isSystemMode) {
      // Currently in system mode, switch to light
      setIsSystemMode(false);
      setIsDark(false);
      localStorage.setItem('theme', 'light');
    } else if (isDark) {
      // Currently in dark mode, switch to system
      setIsSystemMode(true);
      const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(systemIsDark);
      localStorage.removeItem('theme');
    } else {
      // Currently in light mode, switch to dark
      setIsSystemMode(false);
      setIsDark(true);
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, isSystemMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};