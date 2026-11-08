import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-700.css";
import "@fontsource/dm-serif-display/latin-400.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { StartupBoundary } from "./components/StartupBoundary";
import "./styles.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StartupBoundary>
      <App />
    </StartupBoundary>
  </React.StrictMode>,
);
