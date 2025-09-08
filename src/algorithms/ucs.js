/**
 * Uniform Cost Search (UCS) Algorithm
 * Implements the UCS pathfinding algorithm for grid-based navigation.
 * Explores nodes based on the lowest cumulative cost from the start node.
 * Guarantees finding the optimal path in weighted grids.
 */

import { getNeighbors } from "../utils/gridUtils";

/**
 * Priority Queue implementation for UCS algorithm
 * Maintains nodes sorted by their cost (distance from start)
 */
class PriorityQueue {
  constructor() {
    // Array to store queue elements with their priorities
    this.elements = [];
  }

  // Add element to queue with given priority (cost)
  enqueue(element, priority) {
    // Create queue item with element and its priority
    const queueElement = { element, priority };

    // Find correct position to insert based on priority (lowest cost first)
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

  // Remove and return element with lowest priority (cost)
  dequeue() {
    // Return the element (not the wrapper object)
    return this.elements.shift()?.element;
  }

  // Check if queue is empty
  isEmpty() {
    return this.elements.length === 0;
  }
}

export const ucs = (grid, startNode, endNode) => {
  // Initialize array to track the order in which nodes are visited for animation
  const visitedNodesInOrder = [];

  // Create a priority queue for UCS traversal - ordered by cumulative cost
  const priorityQueue = new PriorityQueue();

  // Initialize distance from start node to 0
  startNode.distance = 0;

  // Add the start node to priority queue with cost 0
  priorityQueue.enqueue(startNode, 0);

  // Continue searching while there are nodes in the priority queue
  while (!priorityQueue.isEmpty()) {
    // Dequeue the node with lowest cumulative cost (UCS behavior)
    const currentNode = priorityQueue.dequeue();

    // Skip if already visited (might be added multiple times with different costs)
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

      // Calculate new cost to reach this neighbor (current cost + movement cost)
      // In a grid, movement cost is typically 1 for adjacent cells
      const newCost = currentNode.distance + 1;

      // Update neighbor if we found a cheaper path to it
      if (newCost < neighbor.distance) {
        // Update distance with new cheaper cost
        neighbor.distance = newCost;

        // Set current node as the previous node for path reconstruction
        neighbor.previousNode = currentNode;

        // Add neighbor to priority queue with its cumulative cost
        priorityQueue.enqueue(neighbor, newCost);
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
