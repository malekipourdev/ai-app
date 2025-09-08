/**
 * Breadth-First Search (BFS) Algorithm
 * Implements the BFS pathfinding algorithm for grid-based navigation.
 * Explores all nodes at the current depth before moving to nodes at the next depth.
 * Guarantees finding the shortest path in unweighted grids.
 */

import { getNeighbors } from "../utils/gridUtils";

export const bfs = (grid, startNode, endNode) => {
  // Initialize array to track the order in which nodes are visited for animation
  const visitedNodesInOrder = [];

  // Create a queue for BFS traversal - FIFO (First In, First Out)
  const queue = [];

  // Add the start node to the queue to begin the search
  queue.push(startNode);

  // Mark the start node as visited to avoid revisiting it
  startNode.isVisited = true;

  // Initialize distance from start node (for shortest path guarantee)
  startNode.distance = 0;

  // Continue searching while there are nodes in the queue
  while (queue.length > 0) {
    // Dequeue the first node from the queue (BFS behavior - level by level)
    const currentNode = queue.shift();

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

      // Set distance from start node (current distance + 1)
      neighbor.distance = currentNode.distance + 1;

      // Add neighbor to queue for future exploration (BFS continues level by level)
      queue.push(neighbor);
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
