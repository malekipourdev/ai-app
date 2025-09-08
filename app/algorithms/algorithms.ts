import type { NodeType } from "../utils/gridUtils";

// Algorithm result interface
export interface AlgorithmResult {
  visitedNodesInOrder: NodeType[];
  path: { row: number; col: number }[];
}

// Algorithm function type
export type AlgorithmFunction = (
  grid: NodeType[][],
  startNode: NodeType,
  endNode: NodeType,
  heuristic?: string
) => AlgorithmResult;

// Simple DFS implementation for demonstration
export const dfs: AlgorithmFunction = (grid, startNode, endNode) => {
  const visitedNodesInOrder: NodeType[] = [];
  const stack: NodeType[] = [startNode];
  startNode.isVisited = true;

  while (stack.length > 0) {
    const currentNode = stack.pop()!;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === endNode) {
      return { visitedNodesInOrder, path: reconstructPath(endNode) };
    }

    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (!neighbor.isWall && !neighbor.isVisited) {
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        stack.push(neighbor);
      }
    }
  }

  return { visitedNodesInOrder, path: [] };
};

// Simple BFS implementation
export const bfs: AlgorithmFunction = (grid, startNode, endNode) => {
  const visitedNodesInOrder: NodeType[] = [];
  const queue: NodeType[] = [startNode];
  startNode.isVisited = true;

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === endNode) {
      return { visitedNodesInOrder, path: reconstructPath(endNode) };
    }

    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (!neighbor.isWall && !neighbor.isVisited) {
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    }
  }

  return { visitedNodesInOrder, path: [] };
};

// Helper function to get neighbors (simplified)
function getNeighbors(node: NodeType, grid: NodeType[][]): NodeType[] {
  const neighbors: NodeType[] = [];
  const { row, col } = node;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (const [dRow, dCol] of directions) {
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
  }

  return neighbors;
}

// Helper function to reconstruct path
function reconstructPath(endNode: NodeType): { row: number; col: number }[] {
  const path: { row: number; col: number }[] = [];
  let currentNode: NodeType | null = endNode;

  while (currentNode !== null) {
    path.unshift({ row: currentNode.row, col: currentNode.col });
    currentNode = currentNode.previousNode;
  }

  return path;
}
