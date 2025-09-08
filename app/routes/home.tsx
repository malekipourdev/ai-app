import type { Route } from "./+types/home";
import React, { useState, useCallback, useRef, useEffect } from "react";
import Grid from "../components/Grid";
import Controls from "../components/Controls";
import StatsPanel from "../components/StatsPanel";
import LanguageSelector from "../components/LanguageSelector";
import { createGrid, resetGrid } from "../utils/gridUtils";
import type { NodeType } from "../utils/gridUtils";
import { dfs, bfs } from "../algorithms/algorithms";
import type { AlgorithmResult } from "../algorithms/algorithms";
import { useLanguage } from "../i18n/LanguageContext";

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
  // Language and RTL support
  const { t, isRTL } = useLanguage();

  // Grid state management
  const [grid, setGrid] = useState<NodeType[][]>([]);
  const [gridSize, setGridSize] = useState(7);
  const [startNode, setStartNode] = useState({ row: 1, col: 1 });
  const [goalNode, setGoalNode] = useState({ row: 5, col: 5 });

  // Algorithm control state
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("dfs");
  const [selectedHeuristic, setSelectedHeuristic] = useState("manhattan");

  // Animation control state
  const [isPlaying, setIsPlaying] = useState(false);
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

  // Start animation when playing and visitedNodes are available
  useEffect(() => {
    if (isPlaying && visitedNodes.length > 0 && currentStep === 0) {
      // Start the animation after a small delay to ensure state is properly set
      const timer = setTimeout(() => {
        animateStep();
      }, 10);

      return () => clearTimeout(timer);
    }
  }, [isPlaying, visitedNodes.length, currentStep]);

  // Initialize or reset the grid to default state
  const initializeGrid = useCallback(() => {
    // Create a new grid with current size
    const newGrid = createGrid(gridSize, gridSize);

    // Set start and goal nodes (adjust positions if they're outside new grid bounds)
    const adjustedStartRow = Math.min(startNode.row, gridSize - 1);
    const adjustedStartCol = Math.min(startNode.col, gridSize - 1);
    const adjustedGoalRow = Math.min(goalNode.row, gridSize - 1);
    const adjustedGoalCol = Math.min(goalNode.col, gridSize - 1);

    newGrid[adjustedStartRow][adjustedStartCol].isStart = true;
    newGrid[adjustedGoalRow][adjustedGoalCol].isEnd = true;

    // Update start and goal positions if they were adjusted
    if (
      adjustedStartRow !== startNode.row ||
      adjustedStartCol !== startNode.col
    ) {
      setStartNode({ row: adjustedStartRow, col: adjustedStartCol });
    }
    if (adjustedGoalRow !== goalNode.row || adjustedGoalCol !== goalNode.col) {
      setGoalNode({ row: adjustedGoalRow, col: adjustedGoalCol });
    }

    setGrid(newGrid);
  }, [gridSize, startNode.row, startNode.col, goalNode.row, goalNode.col]);

  // Initialize grid on component mount and when grid size changes
  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

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
        return t.dfs;
      case "bfs":
        return t.bfs;
      case "ucs":
        return t.ucs;
      case "greedy":
        return t.greedy;
      case "astar":
        return t.astar;
      default:
        return t.unknownAlgorithm;
    }
  }, [selectedAlgorithm, t]);

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

        // Continue animation
        animateStep();

        return nextStep;
      });
    }, animationSpeed);
  }, [visitedNodes, finalPath, animationSpeed]);

  // Start pathfinding animation
  const handlePlay = useCallback(() => {
    if (!isPlaying) {
      // Execute algorithm and get results
      const result = executeAlgorithm();

      if (result.visitedNodesInOrder.length > 0) {
        setIsPlaying(true);
        setCurrentStep(0);
        setIsComplete(false);
        // Animation will start automatically via useEffect when visitedNodes updates
      }
    }
  }, [isPlaying, executeAlgorithm]);

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

  // Reset everything to initial state
  const handleReset = useCallback(() => {
    setIsPlaying(false);
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

  // Handle grid size change
  const handleGridSizeChange = useCallback((newSize: number) => {
    setGridSize(newSize);

    // Adjust start and goal positions for new grid size
    const newStartNode = {
      row: Math.min(1, newSize - 2),
      col: Math.min(1, newSize - 2),
    };
    const newGoalNode = {
      row: Math.min(newSize - 2, Math.max(newSize - 2, 1)),
      col: Math.min(newSize - 2, Math.max(newSize - 2, 1)),
    };

    setStartNode(newStartNode);
    setGoalNode(newGoalNode);

    // Reset the visualization when grid size changes
    setIsPlaying(false);
    setCurrentStep(0);
    setIsComplete(false);
    setVisitedNodes([]);
    setFinalPath([]);
    setExecutionTime(0);

    if (animationTimer.current) {
      clearTimeout(animationTimer.current);
    }
  }, []);

  // Calculate statistics for display
  const stats = {
    pathLength: finalPath.length,
    nodesVisited: visitedNodes.length,
    executionTime,
    algorithmName: getAlgorithmName(),
    algorithmKey: selectedAlgorithm,
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
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        fontFamily: isRTL ? "Tahoma, Arial, sans-serif" : "Inter, sans-serif",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      {/* Language Selector */}
      <LanguageSelector />

      <header
        style={{
          textAlign: "center",
          padding: "20px 0 30px 0",
          backgroundColor: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            color: "#2c3e50",
            fontSize: "2.5rem",
            marginBottom: "10px",
            fontWeight: "600",
          }}
        >
          🔍 {t.title}
        </h1>
        <p
          style={{
            color: "#7f8c8d",
            fontSize: "1.1rem",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          {t.subtitle}
        </p>
      </header>

      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
          padding: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Controls component with all animation controls */}
        <Controls
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmChange={setSelectedAlgorithm}
          isPlaying={isPlaying}
          onPlay={handlePlay}
          onReset={handleReset}
          animationSpeed={animationSpeed}
          onSpeedChange={setAnimationSpeed}
          gridSize={gridSize}
          onGridSizeChange={handleGridSizeChange}
          selectedHeuristic={selectedHeuristic}
          onHeuristicChange={setSelectedHeuristic}
        />

        {/* Grid component with obstacle generation support */}
        <Grid
          grid={grid}
          onGridChange={setGrid}
          startNode={startNode}
          goalNode={goalNode}
          onStartNodeChange={setStartNode}
          onGoalNodeChange={setGoalNode}
          isInteractionDisabled={isPlaying || isComplete}
        />

        {/* Statistics panel with comprehensive metrics */}
        <StatsPanel
          stats={stats}
          currentStep={currentStep}
          totalSteps={visitedNodes.length}
          isAnimating={isPlaying}
        />
      </main>
    </div>
  );
}
