import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { ThemeContext, type Theme } from "./theme";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === "undefined") return "dark";
        const stored = localStorage.getItem("theme") as Theme | null;
        if (stored) return stored;
        // fallback to body class if present
        if (typeof document !== "undefined" && document.body.classList.contains("dark")) return "dark";
        // fallback to OS preference
        if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
        return "dark";
    });

    useEffect(() => {
        try {
            localStorage.setItem("theme", theme);
        } catch (e) {
            console.warn("Impossible d’enregistrer le thème dans localStorage.:", e);
        }
        if (typeof document !== "undefined") {
            document.body.classList.toggle("dark", theme === "dark");
            document.body.classList.toggle("light", theme === "light");
        }
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
