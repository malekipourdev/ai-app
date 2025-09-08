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

// Uniform Cost Search (UCS) implementation
export const ucs: AlgorithmFunction = (grid, startNode, endNode) => {
  const visitedNodesInOrder: NodeType[] = [];
  const unvisited: NodeType[] = [];

  // Initialize distances
  for (const row of grid) {
    for (const node of row) {
      node.distance = Infinity;
    }
  }

  startNode.distance = 0;
  unvisited.push(startNode);

  while (unvisited.length > 0) {
    // Sort by distance and get the closest node
    unvisited.sort((a, b) => a.distance - b.distance);
    const currentNode = unvisited.shift()!;

    if (currentNode.isWall) continue;

    // If we've reached the end, return path
    if (currentNode === endNode) {
      return { visitedNodesInOrder, path: reconstructPath(endNode) };
    }

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (!neighbor.isWall && !neighbor.isVisited) {
        const newDistance = currentNode.distance + 1;
        if (newDistance < neighbor.distance) {
          neighbor.distance = newDistance;
          neighbor.previousNode = currentNode;
          if (!unvisited.includes(neighbor)) {
            unvisited.push(neighbor);
          }
        }
      }
    }
  }

  return { visitedNodesInOrder, path: [] };
};

// Greedy Best-First Search implementation
export const greedy: AlgorithmFunction = (
  grid,
  startNode,
  endNode,
  heuristic = "manhattan"
) => {
  const visitedNodesInOrder: NodeType[] = [];
  const unvisited: NodeType[] = [startNode];

  while (unvisited.length > 0) {
    // Sort by heuristic distance to goal
    unvisited.sort((a, b) => {
      const hA = getHeuristicDistance(a, endNode, heuristic);
      const hB = getHeuristicDistance(b, endNode, heuristic);
      return hA - hB;
    });

    const currentNode = unvisited.shift()!;

    if (currentNode.isWall) continue;

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === endNode) {
      return { visitedNodesInOrder, path: reconstructPath(endNode) };
    }

    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (
        !neighbor.isWall &&
        !neighbor.isVisited &&
        !unvisited.includes(neighbor)
      ) {
        neighbor.previousNode = currentNode;
        unvisited.push(neighbor);
      }
    }
  }

  return { visitedNodesInOrder, path: [] };
};

// A* Search implementation
export const astar: AlgorithmFunction = (
  grid,
  startNode,
  endNode,
  heuristic = "manhattan"
) => {
  const visitedNodesInOrder: NodeType[] = [];
  const openSet: NodeType[] = [startNode];

  // Initialize scores
  for (const row of grid) {
    for (const node of row) {
      node.gScore = Infinity;
      node.fScore = Infinity;
    }
  }

  startNode.gScore = 0;
  startNode.fScore = getHeuristicDistance(startNode, endNode, heuristic);

  while (openSet.length > 0) {
    // Get node with lowest fScore
    openSet.sort((a, b) => a.fScore - b.fScore);
    const currentNode = openSet.shift()!;

    if (currentNode.isWall) continue;

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === endNode) {
      return { visitedNodesInOrder, path: reconstructPath(endNode) };
    }

    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (neighbor.isWall || neighbor.isVisited) continue;

      const tentativeGScore = currentNode.gScore + 1;

      if (tentativeGScore < neighbor.gScore) {
        neighbor.previousNode = currentNode;
        neighbor.gScore = tentativeGScore;
        neighbor.fScore =
          neighbor.gScore + getHeuristicDistance(neighbor, endNode, heuristic);

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return { visitedNodesInOrder, path: [] };
};

// Heuristic distance calculation
function getHeuristicDistance(
  nodeA: NodeType,
  nodeB: NodeType,
  heuristic: string
): number {
  const dx = Math.abs(nodeA.row - nodeB.row);
  const dy = Math.abs(nodeA.col - nodeB.col);

  switch (heuristic) {
    case "manhattan":
      return dx + dy;
    case "euclidean":
      return Math.sqrt(dx * dx + dy * dy);
    case "diagonal":
      return Math.max(dx, dy);
    default:
      return dx + dy; // Default to Manhattan
  }
}
