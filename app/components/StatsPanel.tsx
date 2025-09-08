import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

// Interface for algorithm execution statistics
interface StatsProps {
  pathLength: number;
  nodesVisited: number;
  executionTime: number;
  algorithmName: string;
  algorithmKey: string;
  heuristicUsed?: string;
  isComplete: boolean;
  pathFound: boolean;
}

// Interface for StatsPanel props
interface StatsPanelProps {
  stats: StatsProps;
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
  // Language and RTL support
  const { t, isRTL } = useLanguage();

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
      return t.noPathFound;
    } else {
      return t.readyToStartPathfinding;
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
        padding: "25px",
        backgroundColor: "white",
        borderRadius: "12px",
        marginTop: "20px",
        border: "1px solid #e1e8ed",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "900px",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      {/* Header section with algorithm info */}
      <div style={{ marginBottom: "25px", textAlign: "center" }}>
        <h3
          style={{
            margin: "0 0 15px 0",
            color: "#2c3e50",
            fontSize: "1.3rem",
            fontWeight: "600",
          }}
        >
          📊 {t.stats}
        </h3>
        {/* Current algorithm display */}
        <div
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#34495e",
            marginBottom: "8px",
            padding: "8px 16px",
            backgroundColor: "#ecf0f1",
            borderRadius: "6px",
            display: "inline-block",
          }}
        >
          {stats.algorithmName}
          {stats.heuristicUsed && (
            <span
              style={{
                fontSize: "14px",
                fontWeight: "400",
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
            {t.pathLength}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#6c757d",
              marginTop: "3px",
            }}
          >
            {stats.pathLength === 0 ? t.noPathFound : "Nodes in optimal path"}
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
            {t.nodesExplored}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#6c757d",
              marginTop: "3px",
            }}
          >
            {t.totalNodesExamined}
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
            {t.efficiencyRatio}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#6c757d",
              marginTop: "3px",
            }}
          >
            {t.pathLengthOverNodesExplored}
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
            {t.executionTime}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#6c757d",
              marginTop: "3px",
            }}
          >
            {t.algorithmRuntime}
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
          {t.algorithmCharacteristics}:
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
              {t.complete}:
            </span>
            <span
              style={{
                color: getAlgorithmProperty(stats.algorithmKey, "complete", t)
                  ? "#28a745"
                  : "#dc3545",
                fontWeight: "bold",
              }}
            >
              {getAlgorithmProperty(stats.algorithmKey, "complete", t)
                ? t.yes
                : t.no}
            </span>
          </div>
          {/* Optimality indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: "bold", color: "#495057" }}>
              {t.optimal}:
            </span>
            <span
              style={{
                color: getAlgorithmProperty(stats.algorithmKey, "optimal", t)
                  ? "#28a745"
                  : "#ffc107",
                fontWeight: "bold",
              }}
            >
              {getAlgorithmProperty(stats.algorithmKey, "optimal", t)
                ? t.yes
                : t.maybe}
            </span>
          </div>
          {/* Time complexity indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: "bold", color: "#495057" }}>
              {t.timeComplexity}:
            </span>
            <span style={{ color: "#17a2b8", fontWeight: "bold" }}>
              {getAlgorithmProperty(stats.algorithmKey, "timeComplexity", t)}
            </span>
          </div>
          {/* Space complexity indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: "bold", color: "#495057" }}>
              {t.spaceComplexity}:
            </span>
            <span style={{ color: "#17a2b8", fontWeight: "bold" }}>
              {getAlgorithmProperty(stats.algorithmKey, "spaceComplexity", t)}
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
function getAlgorithmProperty(
  algorithmKey: string,
  property: string,
  t: any
): any {
  const algorithms: Record<string, Record<string, any>> = {
    dfs: {
      complete: false,
      optimal: false,
      timeComplexity: "O(b^m)",
      spaceComplexity: "O(bm)",
    },
    bfs: {
      complete: true,
      optimal: true,
      timeComplexity: "O(b^d)",
      spaceComplexity: "O(b^d)",
    },
    ucs: {
      complete: true,
      optimal: true,
      timeComplexity: "O(b^d)",
      spaceComplexity: "O(b^d)",
    },
    greedy: {
      complete: false,
      optimal: false,
      timeComplexity: "O(b^m)",
      spaceComplexity: "O(bm)",
    },
    astar: {
      complete: true,
      optimal: true,
      timeComplexity: "O(b^d)",
      spaceComplexity: "O(b^d)",
    },
  };

  return algorithms[algorithmKey]?.[property] || t.unknown;
}

export default StatsPanel;
