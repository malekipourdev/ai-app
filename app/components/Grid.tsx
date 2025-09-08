import React, { useState, useEffect, useCallback } from "react";
import Node from "./Node";
import {
  createGrid,
  generateRandomObstacles,
  clearObstacles,
  generateMaze,
  validatePath,
} from "../utils/gridUtils";
import type { NodeType } from "../utils/gridUtils";

// Interface for Grid component props
interface GridProps {
  // Grid state and updates
  grid?: NodeType[][];
  onGridChange?: (grid: NodeType[][]) => void;

  // Start and goal positions
  startNode?: { row: number; col: number };
  goalNode?: { row: number; col: number };
  onStartNodeChange?: (position: { row: number; col: number }) => void;
  onGoalNodeChange?: (position: { row: number; col: number }) => void;

  // Obstacle generation controls
  obstacleMode?: "manual" | "random" | "maze";
  obstacleDensity?: number;
  obstacleSeed?: number;

  // Interaction controls
  isInteractionDisabled?: boolean;
}

/**
 * Grid Component
 * Renders the main pathfinding grid with nodes that can be walls, start, end, or empty spaces.
 * Handles grid visualization and user interactions for setting up the pathfinding environment.
 */
const Grid: React.FC<GridProps> = ({
  grid: externalGrid,
  onGridChange,
  startNode: externalStartNode,
  goalNode: externalGoalNode,
  onStartNodeChange,
  onGoalNodeChange,
  obstacleMode = "manual",
  obstacleDensity = 0.3,
  obstacleSeed = 42,
  isInteractionDisabled = false,
}) => {
  // Grid dimensions - default 7x7 as requested
  const GRID_ROWS = 7;
  const GRID_COLS = 7;

  // Default start and goal positions
  const DEFAULT_START = { row: 1, col: 1 };
  const DEFAULT_GOAL = { row: 5, col: 5 };

  // Internal state (used when no external grid is provided)
  const [internalGrid, setInternalGrid] = useState<NodeType[][]>([]);
  const [internalStartNode, setInternalStartNode] = useState(DEFAULT_START);
  const [internalGoalNode, setInternalGoalNode] = useState(DEFAULT_GOAL);

  // State for mouse interaction tracking
  const [mouseIsPressed, setMouseIsPressed] = useState<boolean>(false);
  const [isSettingStart, setIsSettingStart] = useState<boolean>(false);
  const [isSettingGoal, setIsSettingGoal] = useState<boolean>(false);

  // Use external or internal state
  const grid = externalGrid || internalGrid;
  const startNode = externalStartNode || internalStartNode;
  const goalNode = externalGoalNode || internalGoalNode;

  // Initialize the grid when component mounts
  useEffect(() => {
    if (!externalGrid) {
      initializeGrid();
    }
  }, [externalGrid]);

  // Update grid when obstacle parameters change
  useEffect(() => {
    if (grid.length > 0 && obstacleMode !== "manual") {
      generateObstacles();
    }
  }, [obstacleMode, obstacleDensity, obstacleSeed]);

  // Function to create and initialize the grid with default start and goal
  const initializeGrid = (): void => {
    // Create a new grid using utility function
    const newGrid = createGrid(GRID_ROWS, GRID_COLS);

    // Set the start node properties
    newGrid[DEFAULT_START.row][DEFAULT_START.col].isStart = true;

    // Set the goal node properties (using isEnd from utils, mapping to isGoal)
    newGrid[DEFAULT_GOAL.row][DEFAULT_GOAL.col].isEnd = true;

    // Update the grid state
    updateGrid(newGrid);
  };

  // Function to generate obstacles based on current mode
  const generateObstacles = (): void => {
    if (grid.length === 0) return;

    let newGrid: NodeType[][];

    switch (obstacleMode) {
      case "random":
        // Generate random obstacles with specified density and seed
        newGrid = generateRandomObstacles(
          grid,
          obstacleDensity,
          obstacleSeed,
          startNode,
          goalNode
        );
        break;

      case "maze":
        // Generate maze pattern using seed
        newGrid = generateMaze(grid, obstacleSeed, startNode, goalNode);
        break;

      case "manual":
      default:
        // Clear all obstacles for manual mode
        newGrid = clearObstacles(grid);
        break;
    }

    // Ensure start and goal nodes are properly set
    newGrid[startNode.row][startNode.col].isStart = true;
    newGrid[startNode.row][startNode.col].isWall = false;
    newGrid[goalNode.row][goalNode.col].isEnd = true;
    newGrid[goalNode.row][goalNode.col].isWall = false;

    // Validate that a path exists (optional - for user feedback)
    const pathExists = validatePath(newGrid, startNode, goalNode);
    if (!pathExists && obstacleMode !== "manual") {
      console.warn("Generated obstacles may block all paths to goal");
    }

    updateGrid(newGrid);
  };

  // Function to update grid state (internal or external)
  const updateGrid = (newGrid: NodeType[][]): void => {
    if (onGridChange) {
      // Update external grid
      onGridChange(newGrid);
    } else {
      // Update internal grid
      setInternalGrid(newGrid);
    }
  };

  // Function to update start node position
  const updateStartNode = (position: { row: number; col: number }): void => {
    if (onStartNodeChange) {
      onStartNodeChange(position);
    } else {
      setInternalStartNode(position);
    }
  };

  // Function to update goal node position
  const updateGoalNode = (position: { row: number; col: number }): void => {
    if (onGoalNodeChange) {
      onGoalNodeChange(position);
    } else {
      setInternalGoalNode(position);
    }
  };

  // Handle mouse down event on a node
  const handleMouseDown = useCallback(
    (row: number, col: number): void => {
      // Skip interaction if disabled (during animation)
      if (isInteractionDisabled) return;

      const node = grid[row][col];

      // Check if clicking on start node to move it
      if (node.isStart) {
        setIsSettingStart(true);
        return;
      }

      // Check if clicking on goal node to move it
      if (node.isEnd) {
        setIsSettingGoal(true);
        return;
      }

      // Otherwise, toggle wall state and start mouse press tracking (only in manual mode)
      if (obstacleMode === "manual") {
        setMouseIsPressed(true);
        toggleWall(row, col);
      }
    },
    [grid, isInteractionDisabled, obstacleMode]
  );

  // Handle mouse enter event (for dragging)
  const handleMouseEnter = useCallback(
    (row: number, col: number): void => {
      // Skip interaction if disabled
      if (isInteractionDisabled) return;

      // If setting start node, move it to current position
      if (isSettingStart) {
        moveStartNode(row, col);
        return;
      }

      // If setting goal node, move it to current position
      if (isSettingGoal) {
        moveGoalNode(row, col);
        return;
      }

      // If mouse is pressed and not on start/goal, toggle wall (only in manual mode)
      if (mouseIsPressed && obstacleMode === "manual") {
        const node = grid[row][col];
        if (!node.isStart && !node.isEnd) {
          toggleWall(row, col);
        }
      }
    },
    [
      mouseIsPressed,
      isSettingStart,
      isSettingGoal,
      grid,
      isInteractionDisabled,
      obstacleMode,
    ]
  );

  // Handle mouse up event (end dragging)
  const handleMouseUp = useCallback((): void => {
    // Reset all mouse interaction states
    setMouseIsPressed(false);
    setIsSettingStart(false);
    setIsSettingGoal(false);
  }, []);

  // Function to toggle wall state of a node
  const toggleWall = (row: number, col: number): void => {
    // Create a copy of the grid for immutable state update
    const newGrid = grid.map((gridRow) => [...gridRow]);
    const node = newGrid[row][col];

    // Only toggle wall if node is not start or goal
    if (!node.isStart && !node.isEnd) {
      node.isWall = !node.isWall;
      updateGrid(newGrid);
    }
  };

  // Function to move the start node to a new position
  const moveStartNode = (row: number, col: number): void => {
    // Create a copy of the grid
    const newGrid = grid.map((gridRow) => [...gridRow]);

    // Clear previous start node
    newGrid[startNode.row][startNode.col].isStart = false;

    // Set new start node (clear wall state if present)
    const newStartNode = newGrid[row][col];
    newStartNode.isStart = true;
    newStartNode.isWall = false;
    newStartNode.isEnd = false; // Ensure it's not also the goal

    // Update state
    updateStartNode({ row, col });
    updateGrid(newGrid);
  };

  // Function to move the goal node to a new position
  const moveGoalNode = (row: number, col: number): void => {
    // Create a copy of the grid
    const newGrid = grid.map((gridRow) => [...gridRow]);

    // Clear previous goal node
    newGrid[goalNode.row][goalNode.col].isEnd = false;

    // Set new goal node (clear wall state if present)
    const newGoalNode = newGrid[row][col];
    newGoalNode.isEnd = true;
    newGoalNode.isWall = false;
    newGoalNode.isStart = false; // Ensure it's not also the start

    // Update state
    updateGoalNode({ row, col });
    updateGrid(newGrid);
  };

  // Render the grid component
  return (
    <div className="grid-container">
      {/* Instructions for user interaction */}
      <div className="grid-instructions">
        <p>
          {obstacleMode === "manual"
            ? "Click and drag to create walls (black)"
            : `Obstacle Mode: ${obstacleMode} (Density: ${(obstacleDensity * 100).toFixed(0)}%)`}
        </p>
        <p>Drag the green start node or red goal node to move them</p>
        {obstacleMode !== "manual" && (
          <p style={{ fontSize: "12px", color: "#666" }}>
            Seed: {obstacleSeed} | Path exists:{" "}
            {validatePath(grid, startNode, goalNode) ? "Yes" : "No"}
          </p>
        )}
      </div>

      {/* Main grid display */}
      <div
        className="grid"
        style={{
          display: "inline-block",
          border: "2px solid #333",
          padding: "5px",
          backgroundColor: "#f0f0f0",
          opacity: isInteractionDisabled ? 0.7 : 1,
          pointerEvents: isInteractionDisabled ? "none" : "auto",
        }}
        onMouseLeave={handleMouseUp} // End drag if mouse leaves grid
      >
        {/* Map through each row of the grid */}
        {grid.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid-row"
            style={{
              display: "flex",
              height: "25px",
            }}
          >
            {/* Map through each node in the row */}
            {row.map((node, colIndex) => (
              <Node
                key={`${rowIndex}-${colIndex}`} // Unique key for each node
                row={rowIndex}
                col={colIndex}
                isStart={node.isStart}
                isGoal={node.isEnd} // Map isEnd to isGoal for Node component
                isWall={node.isWall}
                isVisited={node.isVisited}
                isPath={node.isPath}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend for node colors */}
      <div
        className="grid-legend"
        style={{ marginTop: "10px", fontSize: "14px" }}
      >
        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "#4CAF50",
                border: "1px solid #ccc",
              }}
            ></div>
            Start
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "#f44336",
                border: "1px solid #ccc",
              }}
            ></div>
            Goal
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "#000000",
                border: "1px solid #ccc",
              }}
            ></div>
            Wall
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "#81C784",
                border: "1px solid #ccc",
              }}
            ></div>
            Visited
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "#FFEB3B",
                border: "1px solid #ccc",
              }}
            ></div>
            Path
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #ccc",
              }}
            ></div>
            Empty
          </span>
        </div>
      </div>
    </div>
  );
};

export default Grid;
