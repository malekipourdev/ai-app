/**
 * Heuristic Functions
 * Collection of heuristic functions used by pathfinding algorithms like A* and Greedy.
 * Provides different distance calculation methods for estimating cost to goal.
 */

/**
 * Manhattan Distance Heuristic
 * Calculates the Manhattan distance between two nodes (sum of absolute differences).
 * Suitable for grid-based movement with 4-directional movement (no diagonal).
 */
export const manhattanDistance = (nodeA, nodeB) => {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
};

/**
 * Euclidean Distance Heuristic
 * Calculates the straight-line distance between two nodes.
 * Suitable for movement allowing any direction.
 */
export const euclideanDistance = (nodeA, nodeB) => {
  const dx = nodeA.row - nodeB.row;
  const dy = nodeA.col - nodeB.col;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Diagonal Distance Heuristic
 * Calculates distance allowing diagonal movement.
 * Suitable for 8-directional movement.
 */
export const diagonalDistance = (nodeA, nodeB) => {
  const dx = Math.abs(nodeA.row - nodeB.row);
  const dy = Math.abs(nodeA.col - nodeB.col);
  return Math.max(dx, dy);
};
