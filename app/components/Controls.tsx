import React from "react";

// Interface for animation control props
interface ControlsProps {
  // Algorithm selection and execution
  selectedAlgorithm: string;
  onAlgorithmChange: (algorithm: string) => void;

  // Animation control states
  isPlaying: boolean;
  isPaused: boolean;
  canStepForward: boolean;
  canStepBackward: boolean;

  // Animation control functions
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;

  // Speed control
  animationSpeed: number;
  onSpeedChange: (speed: number) => void;

  // Grid size control
  gridSize: number;
  onGridSizeChange: (size: number) => void;

  // Heuristic selection for informed algorithms
  selectedHeuristic: string;
  onHeuristicChange: (heuristic: string) => void;
}

/**
 * Controls Component
 * Provides user interface controls for the pathfinding visualizer.
 * Includes buttons to select algorithms, start/stop visualization, clear grid, and adjust speed.
 */
const Controls: React.FC<ControlsProps> = ({
  selectedAlgorithm,
  onAlgorithmChange,
  isPlaying,
  isPaused,
  canStepForward,
  canStepBackward,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onReset,
  animationSpeed,
  onSpeedChange,
  gridSize,
  onGridSizeChange,
  selectedHeuristic,
  onHeuristicChange,
}) => {
  // Available pathfinding algorithms
  const algorithms = [
    { value: "dfs", label: "Depth-First Search (DFS)" },
    { value: "bfs", label: "Breadth-First Search (BFS)" },
    { value: "ucs", label: "Uniform Cost Search (UCS)" },
    { value: "greedy", label: "Greedy Best-First" },
    { value: "astar", label: "A* Search" },
  ];

  // Available heuristic functions for informed algorithms
  const heuristics = [
    { value: "manhattan", label: "Manhattan Distance" },
    { value: "euclidean", label: "Euclidean Distance" },
    { value: "diagonal", label: "Diagonal Distance" },
  ];

  // Check if current algorithm supports heuristics
  const supportsHeuristics =
    selectedAlgorithm === "greedy" || selectedAlgorithm === "astar";

  return (
    <div
      style={{
        padding: "25px",
        backgroundColor: "white",
        borderRadius: "12px",
        marginBottom: "20px",
        border: "1px solid #e1e8ed",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "900px",
      }}
    >
      {/* Header section with title */}
      <h3
        style={{
          margin: "0 0 25px 0",
          color: "#2c3e50",
          textAlign: "center",
          fontSize: "1.3rem",
          fontWeight: "600",
        }}
      >
        ⚙️ Algorithm Controls
      </h3>

      {/* Algorithm selection section */}
      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#495057",
          }}
        >
          Select Algorithm:
        </label>
        {/* Algorithm dropdown selector */}
        <select
          value={selectedAlgorithm}
          onChange={(e) => onAlgorithmChange(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ced4da",
            borderRadius: "4px",
            fontSize: "14px",
            backgroundColor: "white",
          }}
        >
          {algorithms.map((algorithm) => (
            <option key={algorithm.value} value={algorithm.value}>
              {algorithm.label}
            </option>
          ))}
        </select>
      </div>

      {/* Grid size control section */}
      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#495057",
          }}
        >
          Grid Size: {gridSize}x{gridSize}
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "12px", color: "#6c757d" }}>5x5</span>
          <input
            type="range"
            min="5"
            max="20"
            step="1"
            value={gridSize}
            onChange={(e) => onGridSizeChange(Number(e.target.value))}
            style={{
              flex: 1,
              height: "6px",
              borderRadius: "3px",
              background: "#ddd",
              outline: "none",
            }}
            title="Adjust grid size"
          />
          <span style={{ fontSize: "12px", color: "#6c757d" }}>20x20</span>
        </div>
      </div>

      {/* Heuristic selection (only for informed algorithms) */}
      {supportsHeuristics && (
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#495057",
            }}
          >
            Select Heuristic:
          </label>
          {/* Heuristic dropdown selector */}
          <select
            value={selectedHeuristic}
            onChange={(e) => onHeuristicChange(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ced4da",
              borderRadius: "4px",
              fontSize: "14px",
              backgroundColor: "white",
            }}
          >
            {heuristics.map((heuristic) => (
              <option key={heuristic.value} value={heuristic.value}>
                {heuristic.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Animation control buttons section */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Play button - starts or resumes animation */}
        <button
          onClick={onPlay}
          disabled={isPlaying}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: isPlaying ? "#6c757d" : "#28a745",
            color: "white",
            cursor: isPlaying ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            opacity: isPlaying ? 0.6 : 1,
          }}
          title="Start pathfinding animation"
        >
          ▶️ Play
        </button>

        {/* Pause button - pauses current animation */}
        <button
          onClick={onPause}
          disabled={!isPlaying || isPaused}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: !isPlaying || isPaused ? "#6c757d" : "#ffc107",
            color: "white",
            cursor: !isPlaying || isPaused ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            opacity: !isPlaying || isPaused ? 0.6 : 1,
          }}
          title="Pause pathfinding animation"
        >
          ⏸️ Pause
        </button>

        {/* Step forward button - advance animation by one step */}
        <button
          onClick={onStepForward}
          disabled={!canStepForward}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: !canStepForward ? "#6c757d" : "#17a2b8",
            color: "white",
            cursor: !canStepForward ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            opacity: !canStepForward ? 0.6 : 1,
          }}
          title="Step forward one frame"
        >
          ⏭️ Step +
        </button>

        {/* Step backward button - go back one step in animation */}
        <button
          onClick={onStepBackward}
          disabled={!canStepBackward}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: !canStepBackward ? "#6c757d" : "#17a2b8",
            color: "white",
            cursor: !canStepBackward ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            opacity: !canStepBackward ? 0.6 : 1,
          }}
          title="Step backward one frame"
        >
          ⏮️ Step -
        </button>

        {/* Reset button - clear all animation and start over */}
        <button
          onClick={onReset}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#dc3545",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
          }}
          title="Reset grid and clear animation"
        >
          🔄 Reset
        </button>
      </div>

      {/* Animation speed control section */}
      <div style={{ marginBottom: "10px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#495057",
          }}
        >
          Animation Speed: {animationSpeed}ms delay
        </label>
        {/* Speed slider - controls delay between animation frames */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "12px", color: "#6c757d" }}>Fast</span>
          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={animationSpeed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            style={{
              flex: 1,
              height: "6px",
              borderRadius: "3px",
              background: "#ddd",
              outline: "none",
            }}
            title="Adjust animation speed"
          />
          <span style={{ fontSize: "12px", color: "#6c757d" }}>Slow</span>
        </div>
      </div>

      {/* Legend section explaining node colors and states */}
      <div
        style={{
          borderTop: "1px solid #dee2e6",
          paddingTop: "15px",
          marginTop: "15px",
        }}
      >
        <h4
          style={{ margin: "0 0 10px 0", color: "#495057", fontSize: "16px" }}
        >
          Legend:
        </h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "8px",
            fontSize: "12px",
          }}
        >
          {/* Start node indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "#4CAF50",
                border: "1px solid #ccc",
              }}
            ></div>
            <span>Start</span>
          </div>
          {/* Goal node indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "#f44336",
                border: "1px solid #ccc",
              }}
            ></div>
            <span>Goal</span>
          </div>
          {/* Wall node indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "#000000",
                border: "1px solid #ccc",
              }}
            ></div>
            <span>Wall</span>
          </div>
          {/* Visited node indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "#81C784",
                border: "1px solid #ccc",
              }}
            ></div>
            <span>Visited</span>
          </div>
          {/* Path node indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "#FFEB3B",
                border: "1px solid #ccc",
              }}
            ></div>
            <span>Path</span>
          </div>
          {/* Empty node indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #ccc",
              }}
            ></div>
            <span>Empty</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
