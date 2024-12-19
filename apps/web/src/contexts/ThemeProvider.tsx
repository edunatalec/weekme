"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const THEME_KEY = "theme";

type Theme = "dark" | "light";

interface ThemeContextState {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextState | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const getSavedTheme = () =>
    (localStorage.getItem(THEME_KEY) ?? "dark") as Theme;

  useEffect(() => {
    const savedTheme = getSavedTheme();

    setTheme(savedTheme);

    if (savedTheme === "dark") {
      document.documentElement.classList.add(savedTheme);
    }

    document.documentElement.removeAttribute("data-theme-loading");
  }, []);

  const toggle = useCallback(() => {
    const savedTheme = getSavedTheme();
    const newTheme: Theme = savedTheme === "dark" ? "light" : "dark";

    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add(newTheme);
    } else {
      document.documentElement.classList.remove(savedTheme);
    }

    localStorage.setItem(THEME_KEY, newTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextState => {
  return useContext(ThemeContext)!;
};
