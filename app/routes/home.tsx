import type { Route } from "./+types/home";
import React, { useState, useCallback, useRef, useEffect } from "react";
import Grid from "../components/Grid";
import Controls from "../components/Controls";
import StatsPanel from "../components/StatsPanel";
import { createGrid, resetGrid } from "../utils/gridUtils";
import type { NodeType } from "../utils/gridUtils";
import { dfs, bfs } from "../algorithms/algorithms";
import type { AlgorithmResult } from "../algorithms/algorithms";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pathfinding Visualizer" },
    {
      name: "description",
      content: "Interactive Pathfinding Algorithm Visualizer",
    },
  ];
}

export default function Home() {
  // Grid state management
  const [grid, setGrid] = useState<NodeType[][]>([]);
  const [startNode, setStartNode] = useState({ row: 1, col: 1 });
  const [goalNode, setGoalNode] = useState({ row: 5, col: 5 });

  // Obstacle generation state
  const [obstacleMode, setObstacleMode] = useState<
    "manual" | "random" | "maze"
  >("manual");
  const [obstacleDensity, setObstacleDensity] = useState(0.3);
  const [obstacleSeed, setObstacleSeed] = useState(42);

  // Algorithm control state
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("dfs");
  const [selectedHeuristic, setSelectedHeuristic] = useState("manhattan");

  // Animation control state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(100);

  // Algorithm execution state
  const [visitedNodes, setVisitedNodes] = useState<NodeType[]>([]);
  const [finalPath, setFinalPath] = useState<{ row: number; col: number }[]>(
    []
  );
  const [isComplete, setIsComplete] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);

  // Animation timer reference
  const animationTimer = useRef<NodeJS.Timeout | null>(null);

  // Initialize grid on component mount
  useEffect(() => {
    initializeGrid();
  }, []);

  // Initialize or reset the grid to default state
  const initializeGrid = useCallback(() => {
    // Create a new 7x7 grid
    const newGrid = createGrid(7, 7);

    // Set start and goal nodes
    newGrid[startNode.row][startNode.col].isStart = true;
    newGrid[goalNode.row][goalNode.col].isEnd = true;

    setGrid(newGrid);
  }, [startNode.row, startNode.col, goalNode.row, goalNode.col]);

  // Get algorithm function based on selected algorithm
  const getAlgorithmFunction = useCallback(() => {
    switch (selectedAlgorithm) {
      case "dfs":
        return dfs;
      case "bfs":
        return bfs;
      // Add more algorithms as they become available
      default:
        return dfs;
    }
  }, [selectedAlgorithm]);

  // Get human-readable algorithm name
  const getAlgorithmName = useCallback(() => {
    switch (selectedAlgorithm) {
      case "dfs":
        return "Depth-First Search (DFS)";
      case "bfs":
        return "Breadth-First Search (BFS)";
      case "ucs":
        return "Uniform Cost Search (UCS)";
      case "greedy":
        return "Greedy Best-First";
      case "astar":
        return "A* Search";
      default:
        return "Unknown Algorithm";
    }
  }, [selectedAlgorithm]);

  // Execute the selected pathfinding algorithm
  const executeAlgorithm = useCallback(() => {
    // Reset grid to clean state
    const cleanGrid = resetGrid(grid);

    // Find start and end nodes in clean grid
    const start = cleanGrid[startNode.row][startNode.col];
    const end = cleanGrid[goalNode.row][goalNode.col];

    // Record execution start time
    const startTime = performance.now();

    // Execute the algorithm
    const algorithmFunction = getAlgorithmFunction();
    const result: AlgorithmResult = algorithmFunction(cleanGrid, start, end);

    // Record execution end time
    const endTime = performance.now();
    setExecutionTime(endTime - startTime);

    // Store results for animation
    setVisitedNodes(result.visitedNodesInOrder);
    setFinalPath(result.path);
    setGrid(resetGrid(cleanGrid)); // Reset visual state

    return result;
  }, [grid, startNode, goalNode, getAlgorithmFunction]);

  // Start pathfinding animation
  const handlePlay = useCallback(() => {
    if (!isPlaying) {
      // Execute algorithm and get results
      const result = executeAlgorithm();

      if (result.visitedNodesInOrder.length > 0) {
        setIsPlaying(true);
        setIsPaused(false);
        setCurrentStep(0);
        setIsComplete(false);

        // Start animation loop
        animateStep();
      }
    }
  }, [isPlaying, executeAlgorithm]);

  // Animate one step of the pathfinding process
  const animateStep = useCallback(() => {
    animationTimer.current = setTimeout(() => {
      setCurrentStep((prevStep) => {
        const nextStep = prevStep + 1;

        // Update grid visualization
        if (nextStep <= visitedNodes.length) {
          setGrid((prevGrid) => {
            const newGrid = prevGrid.map((row) => [...row]);

            // Mark nodes as visited up to current step
            for (let i = 0; i < nextStep; i++) {
              const node = visitedNodes[i];
              if (node && !node.isStart && !node.isEnd) {
                newGrid[node.row][node.col].isVisited = true;
              }
            }

            return newGrid;
          });
        }

        // Check if animation is complete
        if (nextStep >= visitedNodes.length) {
          setIsComplete(true);
          setIsPlaying(false);

          // Show final path
          if (finalPath.length > 0) {
            setTimeout(() => showFinalPath(), 500);
          }

          return nextStep;
        }

        // Continue animation if not paused
        if (!isPaused) {
          animateStep();
        }

        return nextStep;
      });
    }, animationSpeed);
  }, [visitedNodes, finalPath, animationSpeed, isPaused]);

  // Display the final path on the grid
  const showFinalPath = useCallback(() => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);

      // Mark path nodes
      finalPath.forEach((pathNode) => {
        if (
          !newGrid[pathNode.row][pathNode.col].isStart &&
          !newGrid[pathNode.row][pathNode.col].isEnd
        ) {
          newGrid[pathNode.row][pathNode.col].isPath = true;
        }
      });

      return newGrid;
    });
  }, [finalPath]);

  // Pause animation
  const handlePause = useCallback(() => {
    setIsPaused(true);
    if (animationTimer.current) {
      clearTimeout(animationTimer.current);
    }
  }, []);

  // Step forward one frame
  const handleStepForward = useCallback(() => {
    if (currentStep < visitedNodes.length && !isPlaying) {
      setCurrentStep(currentStep + 1);

      // Update grid for this step
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => [...row]);
        const node = visitedNodes[currentStep];

        if (node && !node.isStart && !node.isEnd) {
          newGrid[node.row][node.col].isVisited = true;
        }

        return newGrid;
      });
    }
  }, [currentStep, visitedNodes, isPlaying]);

  // Step backward one frame
  const handleStepBackward = useCallback(() => {
    if (currentStep > 0 && !isPlaying) {
      setCurrentStep(currentStep - 1);

      // Update grid for this step
      setGrid((prevGrid) => {
        const newGrid = resetGrid(prevGrid);

        // Re-apply visited nodes up to new current step
        for (let i = 0; i < currentStep - 1; i++) {
          const node = visitedNodes[i];
          if (node && !node.isStart && !node.isEnd) {
            newGrid[node.row][node.col].isVisited = true;
          }
        }

        return newGrid;
      });
    }
  }, [currentStep, visitedNodes, isPlaying]);

  // Reset everything to initial state
  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentStep(0);
    setIsComplete(false);
    setVisitedNodes([]);
    setFinalPath([]);
    setExecutionTime(0);

    if (animationTimer.current) {
      clearTimeout(animationTimer.current);
    }

    initializeGrid();
  }, [initializeGrid]);

  // Calculate statistics for display
  const stats = {
    pathLength: finalPath.length,
    nodesVisited: visitedNodes.length,
    executionTime,
    algorithmName: getAlgorithmName(),
    heuristicUsed:
      selectedAlgorithm === "greedy" || selectedAlgorithm === "astar"
        ? selectedHeuristic
        : undefined,
    isComplete,
    pathFound: finalPath.length > 0,
  };

  return (
    <div
      className="app"
      style={{ padding: "20px", fontFamily: "Inter, sans-serif" }}
    >
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#333", fontSize: "2.5rem", marginBottom: "10px" }}>
          Pathfinding Visualizer
        </h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>
          Visualize different pathfinding algorithms in action
        </p>
      </header>

      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Controls component with all animation controls */}
        <Controls
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmChange={setSelectedAlgorithm}
          isPlaying={isPlaying}
          isPaused={isPaused}
          canStepForward={currentStep < visitedNodes.length && !isPlaying}
          canStepBackward={currentStep > 0 && !isPlaying}
          onPlay={handlePlay}
          onPause={handlePause}
          onStepForward={handleStepForward}
          onStepBackward={handleStepBackward}
          onReset={handleReset}
          animationSpeed={animationSpeed}
          onSpeedChange={setAnimationSpeed}
          selectedHeuristic={selectedHeuristic}
          onHeuristicChange={setSelectedHeuristic}
          obstacleMode={obstacleMode}
          onObstacleModeChange={setObstacleMode}
          obstacleDensity={obstacleDensity}
          onObstacleDensityChange={setObstacleDensity}
          obstacleSeed={obstacleSeed}
          onObstacleSeedChange={setObstacleSeed}
        />

        {/* Grid component with obstacle generation support */}
        <Grid
          grid={grid}
          onGridChange={setGrid}
          startNode={startNode}
          goalNode={goalNode}
          onStartNodeChange={setStartNode}
          onGoalNodeChange={setGoalNode}
          obstacleMode={obstacleMode}
          obstacleDensity={obstacleDensity}
          obstacleSeed={obstacleSeed}
          isInteractionDisabled={isPlaying || isComplete}
        />

        {/* Statistics panel with comprehensive metrics */}
        <StatsPanel
          stats={stats}
          currentStep={currentStep}
          totalSteps={visitedNodes.length}
          isAnimating={isPlaying && !isPaused}
        />
      </main>
    </div>
  );
}
