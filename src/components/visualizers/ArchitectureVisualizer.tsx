import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { architectureDiagrams } from "../../data/architectureData";

interface ArchitectureVisualizerProps {
  projectName: string;
}

export const ArchitectureVisualizer = React.memo(({ projectName }: ArchitectureVisualizerProps) => {
  const [activeTab, setActiveTab] = useState<"flow" | "components" | "pipeline">("flow");
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);

  const diagram = architectureDiagrams[projectName];

  useEffect(() => {
    setSelectedNodeIndex(0);

    gsap.fromTo(".diagram-anim",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );
  }, [activeTab]);

  if (!diagram) return null;

  const currentView = diagram[activeTab];
  const selectedNode = currentView.nodes[selectedNodeIndex];
  const nodeWidth = Math.max(128, ...currentView.nodes.map(node => node.label.length * 8 + 24));
  const gap = 24;
  const padding = 10;
  const diagramWidth = padding * 2 + currentView.nodes.length * (nodeWidth + gap) - gap;
  const nodeLeft = (index: number) => padding + index * (nodeWidth + gap);

  return (
    <div className="architecture-visualizer">
      {/* View Selector Tabs */}
      <div className="visualizer-tabs">
        {(["flow", "components", "pipeline"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`visualizer-tab-btn ${activeTab === tab ? "active" : ""}`}
            aria-label={`Switch to ${tab} view`}
          >
            {tab === "flow" ? "System Flow" : tab === "components" ? "Core Components" : "Data Pipeline"}
          </button>
        ))}
      </div>

      {/* SVG Diagram Viewport */}
      <div key={activeTab} className="diagram-viewport-container diagram-anim">
        <svg
          viewBox={`0 0 ${diagramWidth} 100`}
          width={diagramWidth}
          height="100"
          className="architecture-svg"
        >
          {/* Render Connections */}
          {currentView.connections.map((conn, idx) => {
            const fromNode = currentView.nodes[conn.from];
            const toNode = currentView.nodes[conn.to];
            return (
              <g key={idx}>
                <line
                  x1={nodeLeft(conn.from) + nodeWidth}
                  y1={fromNode.y}
                  x2={nodeLeft(conn.to)}
                  y2={toNode.y}
                  className="svg-conn-line"
                />
                <line
                  x1={nodeLeft(conn.from) + nodeWidth}
                  y1={fromNode.y}
                  x2={nodeLeft(conn.to)}
                  y2={toNode.y}
                  className="svg-conn-line-anim"
                />
              </g>
            );
          })}

          {/* Render Node Blocks */}
          {currentView.nodes.map((node, idx) => {
            const isSelected = selectedNodeIndex === idx;
            return (
              <g
                key={idx}
                onClick={() => setSelectedNodeIndex(idx)}
                className={`svg-node-group ${isSelected ? "selected" : ""}`}
                role="button"
                aria-pressed={isSelected}
                tabIndex={0}
                aria-label={`Inspect component: ${node.label}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedNodeIndex(idx);
                  }
                }}
              >
                <rect
                  x={nodeLeft(idx)}
                  y={node.y - 20}
                  width={nodeWidth}
                  height="40"
                  rx="6"
                  className="svg-node-rect-shadow"
                />
                <rect
                  x={nodeLeft(idx)}
                  y={node.y - 20}
                  width={nodeWidth}
                  height="40"
                  rx="6"
                  className="svg-node-rect"
                />
                <text
                  x={nodeLeft(idx) + nodeWidth / 2}
                  y={node.y + 4}
                  textAnchor="middle"
                  className="svg-node-text"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Node Detail Description Panel */}
      {selectedNode && (
        <div className="selected-node-detail-card diagram-anim">
          <h5>{selectedNode.label}</h5>
          <p>{selectedNode.desc}</p>
        </div>
      )}
    </div>
  );
});

ArchitectureVisualizer.displayName = "ArchitectureVisualizer";
export default ArchitectureVisualizer;
