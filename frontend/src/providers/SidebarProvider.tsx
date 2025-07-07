"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export const SidebarContext = createContext<{
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}>({
  isCollapsed: false,
  setIsCollapsed: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export default function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState<boolean | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    setIsCollapsed(savedState === "true");
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isCollapsed !== null) {
      localStorage.setItem("sidebarCollapsed", isCollapsed.toString());
    }
  }, [isCollapsed]);

  if (!isLoaded) {
    return <div style={{ display: "none" }} />;
  }

  return (
    <SidebarContext.Provider
      value={{ isCollapsed: isCollapsed || false, setIsCollapsed }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
