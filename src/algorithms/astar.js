/**
 * A* (A-Star) Search Algorithm
 * Implements the A* pathfinding algorithm for grid-based navigation.
 * Combines the cost from start (g) and heuristic to goal (h) to find optimal paths efficiently.
 * Guarantees finding the shortest path when using an admissible heuristic.
 */

import { getNeighbors } from "../utils/gridUtils";
import {
  manhattanDistance,
  euclideanDistance,
  diagonalDistance,
} from "../utils/heuristics";

/**
 * Priority Queue implementation for A* algorithm
 * Maintains nodes sorted by their f(n) = g(n) + h(n) value
 */
class PriorityQueue {
  constructor() {
    // Array to store queue elements with their priorities (f-score values)
    this.elements = [];
  }

  // Add element to queue with given priority (f-score value)
  enqueue(element, priority) {
    // Create queue item with element and its priority
    const queueElement = { element, priority };

    // Find correct position to insert based on priority (lowest f-score first)
    let added = false;
    for (let i = 0; i < this.elements.length; i++) {
      // Insert before first element with higher priority
      if (queueElement.priority < this.elements[i].priority) {
        this.elements.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }

    // If not added yet, append to end (highest priority so far)
    if (!added) {
      this.elements.push(queueElement);
    }
  }

  // Remove and return element with lowest priority (f-score value)
  dequeue() {
    // Return the element (not the wrapper object)
    return this.elements.shift()?.element;
  }

  // Check if queue is empty
  isEmpty() {
    return this.elements.length === 0;
  }
}

/**
 * Get heuristic function based on string name
 * Returns the appropriate distance calculation function
 */
const getHeuristicFunction = (heuristicName) => {
  switch (heuristicName.toLowerCase()) {
    case "manhattan":
      return manhattanDistance;
    case "euclidean":
      return euclideanDistance;
    case "diagonal":
      return diagonalDistance;
    default:
      // Default to Manhattan distance for grid-based pathfinding
      return manhattanDistance;
  }
};

export const astar = (grid, startNode, endNode, heuristic = "manhattan") => {
  // Initialize array to track the order in which nodes are visited for animation
  const visitedNodesInOrder = [];

  // Get the heuristic function based on provided name
  const heuristicFunction = getHeuristicFunction(heuristic);

  // Create a priority queue for A* traversal - ordered by f(n) = g(n) + h(n)
  const priorityQueue = new PriorityQueue();

  // Initialize start node costs
  startNode.gScore = 0; // Cost from start to start is 0
  startNode.fScore = heuristicFunction(startNode, endNode); // f(start) = g(start) + h(start)

  // Add the start node to priority queue with its f-score
  priorityQueue.enqueue(startNode, startNode.fScore);

  // Continue searching while there are nodes in the priority queue
  while (!priorityQueue.isEmpty()) {
    // Dequeue the node with lowest f-score (g + h value)
    const currentNode = priorityQueue.dequeue();

    // Skip if already visited (might be added multiple times with different scores)
    if (currentNode.isVisited) continue;

    // Mark current node as visited to avoid revisiting
    currentNode.isVisited = true;

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

      // Skip if neighbor has already been visited
      if (neighbor.isVisited) continue;

      // Calculate tentative g-score (cost from start to neighbor through current node)
      // In a grid, movement cost is typically 1 for adjacent cells
      const tentativeGScore = currentNode.gScore + 1;

      // Check if this path to neighbor is better than any previous path
      if (tentativeGScore < neighbor.gScore) {
        // This path is better! Update neighbor's scores

        // Set current node as the previous node for path reconstruction
        neighbor.previousNode = currentNode;

        // Update g-score (actual cost from start to this neighbor)
        neighbor.gScore = tentativeGScore;

        // Calculate h-score (heuristic estimate from neighbor to goal)
        const hScore = heuristicFunction(neighbor, endNode);

        // Update f-score (total estimated cost: g + h)
        neighbor.fScore = neighbor.gScore + hScore;

        // Add neighbor to priority queue with its f-score
        // A* considers both actual cost g(n) and heuristic h(n)
        priorityQueue.enqueue(neighbor, neighbor.fScore);
      }
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
