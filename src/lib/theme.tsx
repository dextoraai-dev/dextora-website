"use client";

import React, { createContext, useContext, useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "dextora_theme_preference";

let currentTheme: Theme = "light";
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function applyThemeToDOM(t: Theme) {
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    if (t === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }
}

function subscribeTheme(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
    if (saved === "light" || saved === "dark") {
      currentTheme = saved;
      applyThemeToDOM(saved);
      return saved;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = prefersDark ? "dark" : "light";
    currentTheme = initial;
    applyThemeToDOM(initial);
    return initial;
  } catch {
    applyThemeToDOM("light");
  }
  return currentTheme;
}

function getThemeServerSnapshot(): Theme {
  return "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const setTheme = useCallback((newTheme: Theme) => {
    currentTheme = newTheme;
    applyThemeToDOM(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // Storage unavailable
    }
    notify();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(currentTheme === "light" ? "dark" : "light");
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "light" as Theme,
      setTheme: () => {},
      toggleTheme: () => {},
    };
  }
  return context;
}
