import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './i18n'
import "./index.css";

// import App from './App.tsx'
import AppRouter from "./router/index.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
