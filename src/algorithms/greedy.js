/**
 * Greedy Best-First Search Algorithm
 * Implements the Greedy pathfinding algorithm for grid-based navigation.
 * Uses heuristics to guide the search towards the goal without considering the cost so far.
 * Fast but not guaranteed to find the optimal path.
 */

import { getNeighbors } from "../utils/gridUtils";
import {
  manhattanDistance,
  euclideanDistance,
  diagonalDistance,
} from "../utils/heuristics";

/**
 * Priority Queue implementation for Greedy algorithm
 * Maintains nodes sorted by their heuristic value h(n)
 */
class PriorityQueue {
  constructor() {
    // Array to store queue elements with their priorities (heuristic values)
    this.elements = [];
  }

  // Add element to queue with given priority (heuristic value)
  enqueue(element, priority) {
    // Create queue item with element and its priority
    const queueElement = { element, priority };

    // Find correct position to insert based on priority (lowest heuristic first)
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

  // Remove and return element with lowest priority (heuristic value)
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

export const greedy = (grid, startNode, endNode, heuristic = "manhattan") => {
  // Initialize array to track the order in which nodes are visited for animation
  const visitedNodesInOrder = [];

  // Get the heuristic function based on provided name
  const heuristicFunction = getHeuristicFunction(heuristic);

  // Create a priority queue for Greedy traversal - ordered by heuristic value h(n)
  const priorityQueue = new PriorityQueue();

  // Calculate initial heuristic value for start node
  const startHeuristic = heuristicFunction(startNode, endNode);

  // Add the start node to priority queue with its heuristic value
  priorityQueue.enqueue(startNode, startHeuristic);

  // Continue searching while there are nodes in the priority queue
  while (!priorityQueue.isEmpty()) {
    // Dequeue the node with lowest heuristic value (closest to goal estimate)
    const currentNode = priorityQueue.dequeue();

    // Skip if already visited (might be added multiple times)
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

      // Set current node as the previous node for path reconstruction
      neighbor.previousNode = currentNode;

      // Calculate heuristic value h(n) for this neighbor (distance to goal estimate)
      const neighborHeuristic = heuristicFunction(neighbor, endNode);

      // Add neighbor to priority queue with its heuristic value
      // Greedy algorithm only considers h(n), not g(n) (cost so far)
      priorityQueue.enqueue(neighbor, neighborHeuristic);
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
