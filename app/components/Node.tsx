import React from "react";

interface NodeProps {
  row: number;
  col: number;
  isStart: boolean;
  isGoal: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath: boolean;
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
    if (isWall) return "#000000"; // Black for walls
    if (isPath) return "#FFEB3B"; // Yellow for path
    if (isVisited) return "#81C784"; // Light green for visited
    return "#FFFFFF"; // White for empty
  };

  return (
    <div
      className={`node ${getNodeClass()}`}
      id={`node-${row}-${col}`} // Unique ID for each node
      onMouseDown={() => onMouseDown(row, col)} // Handle mouse press for wall toggle/drag start
      onMouseEnter={() => onMouseEnter(row, col)} // Handle mouse drag over node
      onMouseUp={() => onMouseUp()} // Handle mouse release to end drag
      style={{
        // Inline styles for node appearance
        width: "25px",
        height: "25px",
        border: "1px solid #ccc",
        display: "inline-block",
        cursor: "pointer",
        backgroundColor: getBackgroundColor(),
      }}
    />
  );
};

export default Node;
