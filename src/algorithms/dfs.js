/**
 * Depth-First Search (DFS) Algorithm
 * Implements the DFS pathfinding algorithm for grid-based navigation.
 * Explores as far as possible along each branch before backtracking.
 * Not guaranteed to find the shortest path but guarantees finding a path if one exists.
 */

import { getNeighbors } from "../utils/gridUtils";

export const dfs = (grid, startNode, endNode) => {
  // Initialize array to track the order in which nodes are visited for animation
  const visitedNodesInOrder = [];

  // Create a stack for DFS traversal - LIFO (Last In, First Out)
  const stack = [];

  // Add the start node to the stack to begin the search
  stack.push(startNode);

  // Mark the start node as visited to avoid revisiting it
  startNode.isVisited = true;

  // Continue searching while there are nodes in the stack
  while (stack.length > 0) {
    // Pop the most recently added node from the stack (DFS behavior)
    const currentNode = stack.pop();

    // Add current node to visited order for animation purposes
    visitedNodesInOrder.push(currentNode);

    // Check if we've reached the goal node
    if (currentNode === endNode) {
      // Goal found! Reconstruct and return the path
      const path = reconstructPath(endNode);
      return { visitedNodesInOrder, path };
    }

    // Get all valid neighboring nodes (up, down, left, right)
    const neighbors = getNeighbors(currentNode, grid);

    // Process each neighbor node
    for (const neighbor of neighbors) {
      // Skip if neighbor is a wall - can't move through walls
      if (neighbor.isWall) continue;

      // Skip if neighbor has already been visited - avoid infinite loops
      if (neighbor.isVisited) continue;

      // Mark neighbor as visited to prevent revisiting
      neighbor.isVisited = true;

      // Set current node as the previous node for path reconstruction
      neighbor.previousNode = currentNode;

      // Add neighbor to stack for future exploration (DFS continues depth-first)
      stack.push(neighbor);
    }
  }

  // If we exit the loop without finding the goal, no path exists
  // Return empty path to indicate failure
  return { visitedNodesInOrder, path: [] };
};

/**
 * Helper function to reconstruct the path from start to end node
 * Traces back from end node to start node using previousNode references
 */
const reconstructPath = (endNode) => {
  // Initialize path array to store the final route
  const path = [];

  // Start from the end node and work backwards
  let currentNode = endNode;

  // Trace back through previous nodes until we reach the start (previousNode = null)
  while (currentNode !== null) {
    // Add current node to the beginning of path array
    path.unshift({
      row: currentNode.row,
      col: currentNode.col,
    });

    // Move to the previous node in the path
    currentNode = currentNode.previousNode;
  }

  // Return the complete path as array of coordinates
  return path;
};
