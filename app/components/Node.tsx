import React from "react";

interface NodeProps {
  row: number;
  col: number;
  isStart: boolean;
  isGoal: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath: boolean;
  cellSize?: number; // Dynamic cell size
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

/**
 * Node Component
 * Represents an individual cell in the pathfinding grid.
 * Can display different states: empty, wall, start point, end point, visited, or part of the final path.
 */
const Node: React.FC<NodeProps> = ({
  row,
  col,
  isStart,
  isGoal,
  isWall,
  isVisited,
  isPath,
  cellSize = 30, // Default size
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  // Determine the CSS class based on node state
  // Priority: start > goal > wall > path > visited > empty
  const getNodeClass = (): string => {
    if (isStart) return "node-start"; // Green for start node
    if (isGoal) return "node-goal"; // Red for goal node
    if (isWall) return "node-wall"; // Black for wall nodes
    if (isPath) return "node-path"; // Yellow for final path
    if (isVisited) return "node-visited"; // Light blue for visited nodes
    return "node-empty"; // White for empty nodes
  };

  // Helper function to get background color based on node state
  const getBackgroundColor = (): string => {
    if (isStart) return "#4CAF50"; // Green for start
    if (isGoal) return "#f44336"; // Red for goal
    if (isWall) return "#424242"; // Dark gray for walls
    if (isPath) return "#FFD54F"; // Golden yellow for path
    if (isVisited) return "#81C784"; // Light green for visited
    return "#FFFFFF"; // White for empty
  };

  // Helper function to get border color for better visual separation
  const getBorderColor = (): string => {
    if (isStart) return "#388E3C"; // Darker green border
    if (isGoal) return "#d32f2f"; // Darker red border
    if (isWall) return "#212121"; // Very dark border
    if (isPath) return "#FFC107"; // Orange border
    if (isVisited) return "#66BB6A"; // Medium green border
    return "#e0e0e0"; // Light gray border
  };

  // Helper function to determine if node should have an icon
  const getNodeIcon = (): string => {
    if (isStart) return "🏁"; // Flag for start
    if (isGoal) return "🎯"; // Target for goal
    return "";
  };

  return (
    <div
      className={`node ${getNodeClass()}`}
      id={`node-${row}-${col}`} // Unique ID for each node
      onMouseDown={() => onMouseDown(row, col)} // Handle mouse press for wall toggle/drag start
      onMouseEnter={() => onMouseEnter(row, col)} // Handle mouse drag over node
      onMouseUp={() => onMouseUp()} // Handle mouse release to end drag
      style={{
        // Enhanced inline styles for node appearance with dynamic sizing
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        border: `2px solid ${getBorderColor()}`,
        display: "flex",
        cursor: "pointer",
        backgroundColor: getBackgroundColor(),
        borderRadius: "4px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        transition: "all 0.1s ease",
        alignItems: "center",
        justifyContent: "center",
        fontSize: `${Math.max(10, cellSize * 0.4)}px`, // Dynamic font size
        fontWeight: "bold",
        userSelect: "none",
      }}
      title={`${isStart ? "Start" : isGoal ? "Goal" : isWall ? "Wall" : isPath ? "Path" : isVisited ? "Visited" : "Empty"} (${row}, ${col})`}
    >
      {getNodeIcon()}
    </div>
  );
};

export default Node;
