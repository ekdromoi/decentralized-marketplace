import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { STORAGE_KEY, THEME_KEY } from "@/constant";

type Theme = (typeof THEME_KEY)[keyof typeof THEME_KEY];

interface ThemeContext {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContext | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY.THEME);
    return stored === THEME_KEY.LIGHT || stored === THEME_KEY.DARK
      ? stored
      : THEME_KEY.DARK;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(THEME_KEY.LIGHT, THEME_KEY.DARK);
    root.classList.add(theme);
    localStorage.setItem(STORAGE_KEY.THEME, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) =>
      prev === THEME_KEY.DARK ? THEME_KEY.LIGHT : THEME_KEY.DARK
    );

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
