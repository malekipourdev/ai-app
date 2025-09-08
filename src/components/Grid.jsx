import React, { useState, useEffect, useCallback } from "react";
import Node from "./Node";
import { createGrid } from "../utils/gridUtils";

/**
 * Grid Component
 * Renders the main pathfinding grid with nodes that can be walls, start, end, or empty spaces.
 * Handles grid visualization and user interactions for setting up the pathfinding environment.
 */
const Grid = () => {
  // Grid dimensions - default 7x7 as requested
  const GRID_ROWS = 7;
  const GRID_COLS = 7;

  // Default start and goal positions
  const DEFAULT_START = { row: 1, col: 1 };
  const DEFAULT_GOAL = { row: 5, col: 5 };

  // State for the 2D grid array
  const [grid, setGrid] = useState([]);

  // State for start and goal node positions
  const [startNode, setStartNode] = useState(DEFAULT_START);
  const [goalNode, setGoalNode] = useState(DEFAULT_GOAL);

  // State for mouse interaction tracking
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isSettingStart, setIsSettingStart] = useState(false);
  const [isSettingGoal, setIsSettingGoal] = useState(false);

  // Initialize the grid when component mounts
  useEffect(() => {
    initializeGrid();
  }, []);

  // Function to create and initialize the grid with default start and goal
  const initializeGrid = () => {
    // Create a new grid using utility function
    const newGrid = createGrid(GRID_ROWS, GRID_COLS);

    // Set the start node properties
    newGrid[DEFAULT_START.row][DEFAULT_START.col].isStart = true;

    // Set the goal node properties (using isEnd from utils, mapping to isGoal)
    newGrid[DEFAULT_GOAL.row][DEFAULT_GOAL.col].isEnd = true;

    // Update the grid state
    setGrid(newGrid);
  };

  // Handle mouse down event on a node
  const handleMouseDown = useCallback(
    (row, col) => {
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

      // Otherwise, toggle wall state and start mouse press tracking
      setMouseIsPressed(true);
      toggleWall(row, col);
    },
    [grid]
  );

  // Handle mouse enter event (for dragging)
  const handleMouseEnter = useCallback(
    (row, col) => {
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

      // If mouse is pressed and not on start/goal, toggle wall
      if (mouseIsPressed) {
        const node = grid[row][col];
        if (!node.isStart && !node.isEnd) {
          toggleWall(row, col);
        }
      }
    },
    [mouseIsPressed, isSettingStart, isSettingGoal, grid]
  );

  // Handle mouse up event (end dragging)
  const handleMouseUp = useCallback(() => {
    // Reset all mouse interaction states
    setMouseIsPressed(false);
    setIsSettingStart(false);
    setIsSettingGoal(false);
  }, []);

  // Function to toggle wall state of a node
  const toggleWall = (row, col) => {
    // Create a copy of the grid for immutable state update
    const newGrid = grid.map((gridRow) => [...gridRow]);
    const node = newGrid[row][col];

    // Only toggle wall if node is not start or goal
    if (!node.isStart && !node.isEnd) {
      node.isWall = !node.isWall;
      setGrid(newGrid);
    }
  };

  // Function to move the start node to a new position
  const moveStartNode = (row, col) => {
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
    setStartNode({ row, col });
    setGrid(newGrid);
  };

  // Function to move the goal node to a new position
  const moveGoalNode = (row, col) => {
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
    setGoalNode({ row, col });
    setGrid(newGrid);
  };

  // Render the grid component
  return (
    <div className="grid-container">
      {/* Instructions for user interaction */}
      <div className="grid-instructions">
        <p>Click and drag to create walls (black)</p>
        <p>Drag the green start node or red goal node to move them</p>
      </div>

      {/* Main grid display */}
      <div
        className="grid"
        style={{
          display: "inline-block",
          border: "2px solid #333",
          padding: "5px",
          backgroundColor: "#f0f0f0",
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
