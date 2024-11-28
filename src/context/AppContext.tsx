"use client"

import React, { createContext, useState, useContext, ReactNode } from "react";

interface Tool {
  id: number;
  title: string;
  slug_link: string;
  image: string;
  image_alt: string;
}

interface AppContextType {
  tools: Tool[];
  setTools: React.Dispatch<React.SetStateAction<Tool[]>>;
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
  activeTool: Tool | null;
  setActiveTool: React.Dispatch<React.SetStateAction<Tool | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [activeItem, setActiveItem] = useState<string>("W3era Tools");
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  return (
    <AppContext.Provider
      value={{
        tools,
        setTools,
        activeItem,
        setActiveItem,
        activeTool,
        setActiveTool,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
