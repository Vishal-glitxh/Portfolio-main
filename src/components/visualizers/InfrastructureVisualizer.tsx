import React, { useState } from "react";
import { InfrastructureNode } from "../../types";

interface InfrastructureVisualizerProps {
  nodes: InfrastructureNode[];
}

export const InfrastructureVisualizer = React.memo(({ nodes }: InfrastructureVisualizerProps) => {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);

  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="infrastructure-visualizer" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <div className="diagram-viewport-container">
        <svg 
          viewBox={`0 0 ${Math.max(580, nodes.length * 135)} 120`} 
          className="architecture-svg"
          role="img"
          aria-label="Infrastructure deployment sequence flow diagram"
        >
          {/* Render Connections */}
          {nodes.map((node, idx) => {
            return node.connections.map((connId, connIdx) => {
              const targetIdx = nodes.findIndex(n => n.id === connId);
              if (targetIdx === -1) return null;
              const x1 = 70 + idx * 130;
              const y1 = 60;
              const x2 = 70 + targetIdx * 130;
              const y2 = 60;
              return (
                <g key={`${idx}-${connIdx}`}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} className="svg-conn-line" />
                  <line x1={x1} y1={y1} x2={x2} y2={y2} className="svg-conn-line-anim" />
                </g>
              );
            });
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
                aria-label={`Inspect infrastructure node: ${node.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedNodeIndex(idx);
                  }
                }}
              >
                <rect x={x - 60} y={y - 22} width="120" height="44" rx="6" className="svg-node-rect-shadow" />
                <rect x={x - 60} y={y - 22} width="120" height="44" rx="6" className="svg-node-rect" />
                <text x={x} y={y - 7} textAnchor="middle" className="svg-node-text-sub" style={{ fontSize: "8px", fill: "var(--accentColor)", fontWeight: 700 }}>
                  {node.type.toUpperCase()}
                </text>
                <text x={x} y={y + 5} textAnchor="middle" className="svg-node-text" style={{ fontSize: "9px" }}>
                  {node.title.length > 15 ? `${node.title.substring(0, 13)}...` : node.title}
                </text>
                <text x={x} y={y + 15} textAnchor="middle" className="svg-node-text-sub" style={{ fontSize: "7px", fill: "#555" }}>
                  {node.protocol}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {nodes[selectedNodeIndex] && (
        <div className="selected-node-detail-card" style={{ background: "rgba(194, 164, 255, 0.02)", border: "1px solid rgba(194, 164, 255, 0.15)", borderRadius: "8px", padding: "14px", marginTop: "5px" }}>
          <h5 style={{ margin: "0 0 6px 0", fontSize: "11px", fontWeight: 700, color: "#ffffff", textTransform: "uppercase" }}>
            {nodes[selectedNodeIndex].title} &bull; <span style={{ color: "var(--accentColor)" }}>{nodes[selectedNodeIndex].type}</span>
          </h5>
          <p style={{ margin: "0 0 6px 0", fontSize: "11px", color: "#adacac", lineHeight: "1.5" }}>
            <strong>Responsibilities:</strong> {nodes[selectedNodeIndex].responsibilities}
          </p>
          <p style={{ margin: "0 0 6px 0", fontSize: "11px", color: "#adacac", lineHeight: "1.5" }}>
            <strong>Communication Protocol:</strong> {nodes[selectedNodeIndex].protocol}
          </p>
          {nodes[selectedNodeIndex].failureHandling && (
            <p style={{ margin: "0 0 6px 0", fontSize: "11px", color: "#adacac", lineHeight: "1.5" }}>
              <strong>Fault Tolerance:</strong> {nodes[selectedNodeIndex].failureHandling}
            </p>
          )}
          <p style={{ margin: "0", fontSize: "11px", color: "#adacac", lineHeight: "1.5" }}>
            <strong>Horizontal Scaling:</strong> {nodes[selectedNodeIndex].scalingNotes}
          </p>
        </div>
      )}
    </div>
  );
});

InfrastructureVisualizer.displayName = "InfrastructureVisualizer";
