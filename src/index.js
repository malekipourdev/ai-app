import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/**
 * Entry Point
 * Main entry point for the React application.
 * Renders the App component to the DOM and initializes the pathfinding visualizer.
 */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
