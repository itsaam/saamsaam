// File: `src/components/ThemeToggle.tsx`
import type { MouseEvent } from "react";
import { useTheme } from "../contexts/theme";
import "../styles/ThemeToggle.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleTheme();
  };

  return (
    <button
      className={`theme-toggle ${theme}`}
      onClick={handleClick}
      aria-label="Toggle theme"
      type="button"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}