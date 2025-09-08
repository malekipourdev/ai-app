import React from "react";

// Interface for algorithm execution statistics
interface AlgorithmStats {
  pathLength: number;
  nodesVisited: number;
  executionTime: number;
  algorithmName: string;
  heuristicUsed?: string;
  isComplete: boolean;
  pathFound: boolean;
}

// Interface for StatsPanel props
interface StatsPanelProps {
  stats: AlgorithmStats;
  currentStep: number;
  totalSteps: number;
  isAnimating: boolean;
}

/**
 * StatsPanel Component
 * Displays statistics and information about the pathfinding algorithm execution.
 * Shows metrics like nodes visited, path length, execution time, and algorithm details.
 */
const StatsPanel: React.FC<StatsPanelProps> = ({
  stats,
  currentStep,
  totalSteps,
  isAnimating,
}) => {
  // Calculate efficiency ratio (path length / nodes visited)
  // Lower ratio indicates more efficient pathfinding
  const efficiencyRatio =
    stats.nodesVisited > 0
      ? ((stats.pathLength / stats.nodesVisited) * 100).toFixed(1)
      : "0.0";

  // Calculate animation progress percentage
  const progressPercentage =
    totalSteps > 0 ? ((currentStep / totalSteps) * 100).toFixed(1) : "0.0";

  // Get status message based on current state
  const getStatusMessage = (): string => {
    if (isAnimating) {
      return "Animation in progress...";
    } else if (stats.isComplete && stats.pathFound) {
      return "Path found successfully!";
    } else if (stats.isComplete && !stats.pathFound) {
      return "No path exists to goal";
    } else {
      return "Ready to start pathfinding";
    }
  };

  // Get status color based on current state
  const getStatusColor = (): string => {
    if (isAnimating) {
      return "#17a2b8"; // Blue for in progress
    } else if (stats.isComplete && stats.pathFound) {
      return "#28a745"; // Green for success
    } else if (stats.isComplete && !stats.pathFound) {
      return "#dc3545"; // Red for failure
    } else {
      return "#6c757d"; // Gray for ready
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        marginTop: "20px",
        border: "1px solid #e9ecef",
        minWidth: "800px",
      }}
    >
      {/* Header section with algorithm info */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <h3 style={{ margin: "0 0 10px 0", color: "#495057" }}>
          Algorithm Statistics
        </h3>
        {/* Current algorithm display */}
        <div
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#495057",
            marginBottom: "5px",
          }}
        >
          {stats.algorithmName}
          {stats.heuristicUsed && (
            <span
              style={{
                fontSize: "14px",
                fontWeight: "normal",
                color: "#6c757d",
              }}
            >
              {" "}
              (Heuristic: {stats.heuristicUsed})
            </span>
          )}
        </div>
        {/* Status indicator */}
        <div
          style={{
            fontSize: "14px",
            color: getStatusColor(),
            fontWeight: "bold",
          }}
        >
          {getStatusMessage()}
        </div>
      </div>

      {/* Progress section (only shown during animation) */}
      {(isAnimating || stats.isComplete) && (
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <span style={{ fontSize: "14px", color: "#495057" }}>
              Animation Progress:
            </span>
            <span
              style={{ fontSize: "14px", fontWeight: "bold", color: "#495057" }}
            >
              {currentStep} / {totalSteps} ({progressPercentage}%)
            </span>
          </div>
          {/* Progress bar */}
          <div
            style={{
              width: "100%",
              height: "10px",
              backgroundColor: "#e9ecef",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercentage}%`,
                height: "100%",
                backgroundColor: getStatusColor(),
                transition: "width 0.3s ease",
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Main statistics grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        {/* Path Length Card */}
        <div
          style={{
            padding: "15px",
            backgroundColor: "white",
            borderRadius: "6px",
            border: "1px solid #dee2e6",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#28a745",
              marginBottom: "5px",
            }}
          >
            {stats.pathLength}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#6c757d",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Path Length
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#6c757d",
              marginTop: "3px",
            }}
          >
            {stats.pathLength === 0 ? "No path found" : "Nodes in optimal path"}
          </div>
        </div>

        {/* Nodes Visited Card */}
        <div
          style={{
            padding: "15px",
            backgroundColor: "white",
            borderRadius: "6px",
            border: "1px solid #dee2e6",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#17a2b8",
              marginBottom: "5px",
            }}
          >
            {stats.nodesVisited}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#6c757d",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Nodes Explored
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#6c757d",
              marginTop: "3px",
            }}
          >
            Total nodes examined
          </div>
        </div>

        {/* Efficiency Ratio Card */}
        <div
          style={{
            padding: "15px",
            backgroundColor: "white",
            borderRadius: "6px",
            border: "1px solid #dee2e6",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#ffc107",
              marginBottom: "5px",
            }}
          >
            {efficiencyRatio}%
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#6c757d",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Efficiency Ratio
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#6c757d",
              marginTop: "3px",
            }}
          >
            Path length / nodes explored
          </div>
        </div>

        {/* Execution Time Card */}
        <div
          style={{
            padding: "15px",
            backgroundColor: "white",
            borderRadius: "6px",
            border: "1px solid #dee2e6",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#dc3545",
              marginBottom: "5px",
            }}
          >
            {stats.executionTime.toFixed(2)}ms
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#6c757d",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Execution Time
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#6c757d",
              marginTop: "3px",
            }}
          >
            Algorithm runtime
          </div>
        </div>
      </div>

      {/* Algorithm characteristics section */}
      <div
        style={{
          padding: "15px",
          backgroundColor: "white",
          borderRadius: "6px",
          border: "1px solid #dee2e6",
        }}
      >
        <h4
          style={{
            margin: "0 0 10px 0",
            color: "#495057",
            fontSize: "16px",
          }}
        >
          Algorithm Characteristics:
        </h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "10px",
            fontSize: "13px",
          }}
        >
          {/* Completeness indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: "bold", color: "#495057" }}>
              Complete:
            </span>
            <span
              style={{
                color: getAlgorithmProperty(stats.algorithmName, "complete")
                  ? "#28a745"
                  : "#dc3545",
                fontWeight: "bold",
              }}
            >
              {getAlgorithmProperty(stats.algorithmName, "complete")
                ? "Yes"
                : "No"}
            </span>
          </div>
          {/* Optimality indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: "bold", color: "#495057" }}>
              Optimal:
            </span>
            <span
              style={{
                color: getAlgorithmProperty(stats.algorithmName, "optimal")
                  ? "#28a745"
                  : "#ffc107",
                fontWeight: "bold",
              }}
            >
              {getAlgorithmProperty(stats.algorithmName, "optimal")
                ? "Yes"
                : "Maybe"}
            </span>
          </div>
          {/* Time complexity indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: "bold", color: "#495057" }}>
              Time Complexity:
            </span>
            <span style={{ color: "#17a2b8", fontWeight: "bold" }}>
              {getAlgorithmProperty(stats.algorithmName, "timeComplexity")}
            </span>
          </div>
          {/* Space complexity indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: "bold", color: "#495057" }}>
              Space Complexity:
            </span>
            <span style={{ color: "#17a2b8", fontWeight: "bold" }}>
              {getAlgorithmProperty(stats.algorithmName, "spaceComplexity")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Helper function to get algorithm properties for display
 * Returns characteristics of different pathfinding algorithms
 */
function getAlgorithmProperty(algorithmName: string, property: string): any {
  const algorithms: Record<string, Record<string, any>> = {
    "Depth-First Search (DFS)": {
      complete: false,
      optimal: false,
      timeComplexity: "O(b^m)",
      spaceComplexity: "O(bm)",
    },
    "Breadth-First Search (BFS)": {
      complete: true,
      optimal: true,
      timeComplexity: "O(b^d)",
      spaceComplexity: "O(b^d)",
    },
    "Uniform Cost Search (UCS)": {
      complete: true,
      optimal: true,
      timeComplexity: "O(b^d)",
      spaceComplexity: "O(b^d)",
    },
    "Greedy Best-First": {
      complete: false,
      optimal: false,
      timeComplexity: "O(b^m)",
      spaceComplexity: "O(bm)",
    },
    "A* Search": {
      complete: true,
      optimal: true,
      timeComplexity: "O(b^d)",
      spaceComplexity: "O(b^d)",
    },
  };

  return algorithms[algorithmName]?.[property] || "Unknown";
}

export default StatsPanel;
