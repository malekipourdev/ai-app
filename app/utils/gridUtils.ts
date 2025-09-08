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
