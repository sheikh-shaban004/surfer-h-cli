"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MonitorIcon, MoonIcon, SunIcon } from "@/components/common/icons";

interface ThemeToggleProps {
  collapsed?: boolean;
}

export default function ThemeToggle({ collapsed = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues by only showing after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={collapsed ? "flex flex-col space-y-1 h-[84px]" : "flex flex-row space-x-1 h-[28px]"}></div>;
  }

  const currentTheme = theme || "system";

  return (
    <div className={collapsed ? "flex flex-col space-y-1" : "flex flex-row space-x-1"}>
      <button
        onClick={() => setTheme("system")}
        className={`rounded-[3px] cursor-pointer p-1 text-[var(--gray-8)] transition-colors duration-200 hover:bg-[var(--gray-2)] ${
          currentTheme === "system" ? "bg-[var(--gray-3)]" : "bg-transparent"
        } `}
      >
        <MonitorIcon />
      </button>
      <button
        onClick={() => setTheme("light")}
        className={`rounded-[3px] cursor-pointer p-1 text-[var(--gray-8)] transition-colors duration-200 hover:bg-[var(--gray-2)] ${
          currentTheme === "light" ? "bg-[var(--gray-3)]" : "bg-transparent"
        } `}
      >
        <SunIcon />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`rounded-[3px] cursor-pointer p-1 text-[var(--gray-8)] transition-colors duration-200 hover:bg-[var(--gray-2)] ${
          currentTheme === "dark" ? "bg-[var(--gray-3)]" : "bg-transparent"
        } `}
      >
        <MoonIcon />
      </button>
    </div>
  );
}
