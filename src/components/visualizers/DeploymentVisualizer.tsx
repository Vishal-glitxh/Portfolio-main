import React, { useState } from "react";
import { DeploymentNode } from "../../types";

interface DeploymentVisualizerProps {
  nodes: DeploymentNode[];
}

export const DeploymentVisualizer = React.memo(({ nodes }: DeploymentVisualizerProps) => {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);

  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="deployment-visualizer">
      <div className="diagram-viewport-container">
        <svg 
          viewBox={`0 0 ${Math.max(580, nodes.length * 135)} 120`} 
          className="architecture-svg"
          role="img"
          aria-label="Deployment pipeline stage visualizer flow diagram"
        >
          {/* Render Connections */}
          {nodes.map((_, idx) => {
            if (idx === nodes.length - 1) return null;
            const x1 = 70 + idx * 130;
            const y1 = 60;
            const x2 = 70 + (idx + 1) * 130;
            const y2 = 60;
            return (
              <g key={idx}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} className="svg-conn-line" />
                <line x1={x1} y1={y1} x2={x2} y2={y2} className="svg-conn-line-anim" />
              </g>
            );
          })}

          {/* Render Node Blocks */}
          {nodes.map((node, idx) => {
            const x = 70 + idx * 130;
            const y = 60;
            const isSelected = selectedNodeIndex === idx;
            return (
              <g 
                key={idx} 
                onClick={() => setSelectedNodeIndex(idx)}
                className={`svg-node-group ${isSelected ? "selected" : ""}`}
                role="button"
                tabIndex={0}
                aria-label={`Inspect deployment component: ${node.name}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedNodeIndex(idx);
                  }
                }}
              >
                <rect x={x - 60} y={y - 20} width="120" height="40" rx="6" className="svg-node-rect-shadow" />
                <rect x={x - 60} y={y - 20} width="120" height="40" rx="6" className="svg-node-rect" />
                <text x={x} y={y - 4} textAnchor="middle" className="svg-node-text-sub" style={{ fontSize: "7px", fill: "var(--accentColor)", fontWeight: 700 }}>
                  {node.category.toUpperCase()}
                </text>
                <text x={x} y={y + 6} textAnchor="middle" className="svg-node-text" style={{ fontSize: "9px" }}>
                  {node.name.length > 15 ? `${node.name.substring(0, 13)}...` : node.name}
                </text>
                <text x={x} y={y + 14} textAnchor="middle" className="svg-node-text-sub" style={{ fontSize: "7px", fill: "#555" }}>
                  {node.technology}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {nodes[selectedNodeIndex] && (
        <div className="selected-node-detail-card" style={{ background: "rgba(194, 164, 255, 0.02)", border: "1px solid rgba(194, 164, 255, 0.15)", borderRadius: "8px", padding: "14px", marginTop: "5px" }}>
          <h5 style={{ margin: "0 0 6px 0", fontSize: "11px", fontWeight: 700, color: "#ffffff", textTransform: "uppercase" }}>
            {nodes[selectedNodeIndex].name} &bull; <span style={{ color: "var(--accentColor)" }}>{nodes[selectedNodeIndex].category}</span>
          </h5>
          <p style={{ margin: "0 0 6px 0", fontSize: "11px", color: "#adacac", lineHeight: "1.5" }}>
            <strong>Technology Stack:</strong> {nodes[selectedNodeIndex].technology}
          </p>
          {nodes[selectedNodeIndex].description && (
            <p style={{ margin: "0", fontSize: "11px", color: "#adacac", lineHeight: "1.5" }}>
              <strong>Description:</strong> {nodes[selectedNodeIndex].description}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

DeploymentVisualizer.displayName = "DeploymentVisualizer";
