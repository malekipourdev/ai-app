/**
 * Grid Utility Functions
 * Collection of helper functions for grid management and pathfinding operations.
 * Includes grid creation, node manipulation, and pathfinding helper functions.
 */

export interface NodeType {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath: boolean;
  distance: number;
  previousNode: NodeType | null;
  gScore: number;
  fScore: number;
}

/**
 * Creates an initial grid with default node properties
 */
export const createGrid = (rows: number, cols: number): NodeType[][] => {
  const grid: NodeType[][] = [];
  for (let row = 0; row < rows; row++) {
    const currentRow: NodeType[] = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

/**
 * Creates a single node with default properties
 */
export const createNode = (row: number, col: number): NodeType => {
  return {
    row,
    col,
    isStart: false,
    isEnd: false,
    isWall: false,
    isVisited: false,
    isPath: false,
    distance: Infinity,
    previousNode: null,
    gScore: Infinity,
    fScore: Infinity,
  };
};

/**
 * Gets valid neighboring nodes for pathfinding algorithms
 */
export const getNeighbors = (
  node: NodeType,
  grid: NodeType[][]
): NodeType[] => {
  const neighbors: NodeType[] = [];
  const { row, col } = node;
  const directions = [
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
  ];

  directions.forEach(([dRow, dCol]) => {
    const newRow = row + dRow;
    const newCol = col + dCol;

    if (
      newRow >= 0 &&
      newRow < grid.length &&
      newCol >= 0 &&
      newCol < grid[0].length
    ) {
      neighbors.push(grid[newRow][newCol]);
    }
  });

  return neighbors;
};

/**
 * Reconstructs the shortest path from start to end node
 */
export const getPath = (endNode: NodeType): NodeType[] => {
  const path: NodeType[] = [];
  let currentNode: NodeType | null = endNode;

  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return path;
};

/**
 * Resets the grid for a new pathfinding operation
 */
export const resetGrid = (grid: NodeType[][]): NodeType[][] => {
  return grid.map((row) =>
    row.map((node) => ({
      ...node,
      isVisited: false,
      isPath: false,
      distance: Infinity,
      previousNode: null,
      gScore: Infinity,
      fScore: Infinity,
    }))
  );
};

/**
 * Seeded Random Number Generator
 * Creates a deterministic pseudo-random number generator using a seed
 * This ensures reproducible obstacle patterns for the same seed
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    // Initialize seed with given value
    this.seed = seed % 2147483647;
    // Ensure seed is not zero for proper randomness
    if (this.seed <= 0) this.seed += 2147483646;
  }

  /**
   * Generate next random number between 0 and 1
   * Uses Linear Congruential Generator algorithm for deterministic results
   */
  next(): number {
    // Apply LCG formula: (a * seed) % m
    this.seed = (this.seed * 16807) % 2147483647;
    // Return normalized value between 0 and 1
    return (this.seed - 1) / 2147483646;
  }
}

/**
 * Generate random obstacles on the grid based on density and seed
 * Creates walls randomly while preserving start and goal nodes
 */
export const generateRandomObstacles = (
  grid: NodeType[][],
  density: number,
  seed: number,
  startPos: { row: number; col: number },
  goalPos: { row: number; col: number }
): NodeType[][] => {
  // Clamp density between 0.0 and 1.0 to ensure valid range
  const clampedDensity = Math.max(0.0, Math.min(1.0, density));

  // Create seeded random number generator for reproducible results
  const random = new SeededRandom(seed);

  // Create a copy of the grid to avoid mutating the original
  const newGrid = grid.map((row) => row.map((node) => ({ ...node })));

  // Clear all existing walls first
  for (let row = 0; row < newGrid.length; row++) {
    for (let col = 0; col < newGrid[row].length; col++) {
      newGrid[row][col].isWall = false;
    }
  }

  // Iterate through each cell and randomly place obstacles
  for (let row = 0; row < newGrid.length; row++) {
    for (let col = 0; col < newGrid[row].length; col++) {
      // Skip start node - never block the starting position
      if (row === startPos.row && col === startPos.col) {
        continue;
      }

      // Skip goal node - never block the destination
      if (row === goalPos.row && col === goalPos.col) {
        continue;
      }

      // Generate random number and compare with density threshold
      const randomValue = random.next();

      // If random value is less than density, place an obstacle
      if (randomValue < clampedDensity) {
        newGrid[row][col].isWall = true;
      }
    }
  }

  return newGrid;
};

/**
 * Clear all obstacles from the grid
 * Removes all walls while preserving start and goal nodes
 */
export const clearObstacles = (grid: NodeType[][]): NodeType[][] => {
  // Create a copy of the grid to avoid mutating the original
  const newGrid = grid.map((row) => row.map((node) => ({ ...node })));

  // Iterate through each cell and remove walls
  for (let row = 0; row < newGrid.length; row++) {
    for (let col = 0; col < newGrid[row].length; col++) {
      // Clear wall state while preserving other properties
      newGrid[row][col].isWall = false;
    }
  }

  return newGrid;
};

/**
 * Generate a maze pattern using recursive backtracking algorithm
 * Creates a solvable maze with guaranteed path from start to goal
 */
export const generateMaze = (
  grid: NodeType[][],
  seed: number,
  startPos: { row: number; col: number },
  goalPos: { row: number; col: number }
): NodeType[][] => {
  // Create seeded random number generator
  const random = new SeededRandom(seed);

  // Create a copy of the grid
  const newGrid = grid.map((row) => row.map((node) => ({ ...node })));

  // Initialize all cells as walls except start and goal
  for (let row = 0; row < newGrid.length; row++) {
    for (let col = 0; col < newGrid[row].length; col++) {
      // Start and goal remain clear
      if (
        (row === startPos.row && col === startPos.col) ||
        (row === goalPos.row && col === goalPos.col)
      ) {
        newGrid[row][col].isWall = false;
      } else {
        // All other cells become walls initially
        newGrid[row][col].isWall = true;
      }
    }
  }

  // Maze generation using simple random removal
  // For educational purposes - creates interesting but not perfect mazes
  const totalCells = newGrid.length * newGrid[0].length;
  const cellsToOpen = Math.floor(totalCells * 0.3); // Open 30% of cells

  for (let i = 0; i < cellsToOpen; i++) {
    // Pick random cell coordinates
    const randomRow = Math.floor(random.next() * newGrid.length);
    const randomCol = Math.floor(random.next() * newGrid[0].length);

    // Skip if it's start or goal
    if (
      (randomRow === startPos.row && randomCol === startPos.col) ||
      (randomRow === goalPos.row && randomCol === goalPos.col)
    ) {
      continue;
    }

    // Open this cell (remove wall)
    newGrid[randomRow][randomCol].isWall = false;
  }

  return newGrid;
};

/**
 * Validate that a path exists between start and goal
 * Uses a simple flood-fill algorithm to check connectivity
 */
export const validatePath = (
  grid: NodeType[][],
  startPos: { row: number; col: number },
  goalPos: { row: number; col: number }
): boolean => {
  // Create a visited array to track flood-fill progress
  const visited: boolean[][] = grid.map((row) => row.map(() => false));

  // Stack for depth-first flood fill
  const stack: { row: number; col: number }[] = [startPos];
  visited[startPos.row][startPos.col] = true;

  // Directions for 4-way connectivity (up, down, left, right)
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // Perform flood fill from start position
  while (stack.length > 0) {
    const current = stack.pop()!;

    // Check if we reached the goal
    if (current.row === goalPos.row && current.col === goalPos.col) {
      return true; // Path exists
    }

    // Explore all neighboring cells
    for (const [dRow, dCol] of directions) {
      const newRow = current.row + dRow;
      const newCol = current.col + dCol;

      // Check bounds
      if (
        newRow >= 0 &&
        newRow < grid.length &&
        newCol >= 0 &&
        newCol < grid[0].length
      ) {
        // Check if cell is passable and not visited
        if (!grid[newRow][newCol].isWall && !visited[newRow][newCol]) {
          visited[newRow][newCol] = true;
          stack.push({ row: newRow, col: newCol });
        }
      }
    }
  }

  // Goal not reached - no path exists
  return false;
};
