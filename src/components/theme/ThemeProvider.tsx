import React, { createContext, useContext, useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children?: React.ReactNode;
  defaultTheme?: Theme;
}

const ThemeProvider = ({
  children = <div>Theme provider content</div>,
  defaultTheme = "light",
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme preference is stored in localStorage
    const savedTheme = localStorage.getItem("asl-theme");
    return (savedTheme as Theme) || defaultTheme;
  });

  useEffect(() => {
    // Update the document class when theme changes
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Save theme preference to localStorage
    localStorage.setItem("asl-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ThemeToggle component for easy access
export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon size={20} className="text-gray-800" />
      ) : (
        <Sun size={20} className="text-yellow-300" />
      )}
    </button>
  );
};

export default ThemeProvider;
