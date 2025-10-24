import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </StrictMode>
);