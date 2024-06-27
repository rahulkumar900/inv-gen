
"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { StyleSheet } from "@react-pdf/renderer";

// Define the styles for different components
import themes from "./theme";

type Theme = (typeof themes)[keyof typeof themes];

const ThemeContext = createContext<Theme | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  component: keyof typeof themes;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  component,
}) => {
  return (
    <ThemeContext.Provider value={themes[component]}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
