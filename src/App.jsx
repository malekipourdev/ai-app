import React from "react";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import StatsPanel from "./components/StatsPanel";

/**
 * Main App Component
 * Root component that orchestrates the pathfinding visualizer application.
 * Manages the overall layout and coordinates between Grid, Controls, and StatsPanel components.
 */
const App = () => {
  return (
    <div className="app">
      <header>
        <h1>Pathfinding Visualizer</h1>
      </header>

      <main>
        <Controls />
        <Grid />
        <StatsPanel />
      </main>
    </div>
  );
};

export default App;
