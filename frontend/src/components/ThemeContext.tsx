import React, { createContext, useState, useEffect, ReactNode } from "react";

// Define a type for the theme
type Theme = "light" | "dark";

// Define the context value type
interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Function to get the initial theme from localStorage or system preference
const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");

    if (typeof storedPrefs === "string") {
      return storedPrefs as Theme; // Cast to Theme type
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");

    if (userMedia.matches) {
      return "dark";
    }
  }

  return "light";
};

// Create a context with an undefined initial value
export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Define the type for the ThemeProvider props
interface ThemeProviderProps {
  initialTheme?: Theme;
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ initialTheme, children }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Function to update the theme on the root element and in localStorage
  const rawSetTheme = (rawTheme: Theme) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === "dark";
    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(rawTheme);
    localStorage.setItem("color-theme", rawTheme);
  };

  // Apply the initial theme if passed as a prop
  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  // Apply the theme whenever it changes
  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
