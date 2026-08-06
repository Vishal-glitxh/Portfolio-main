import React, { useState } from "react";
import { DeploymentPipeline } from "../../types";
import { TerminalConsole } from "../common/TerminalConsole";

interface PipelineVisualizerProps {
  pipeline: DeploymentPipeline;
}

export const PipelineVisualizer = React.memo(({ pipeline }: PipelineVisualizerProps) => {
  const [selectedPipelineStepId, setSelectedPipelineStepId] = useState<string | null>(null);

  const activeRun = pipeline.recentRuns[0];
  if (!activeRun) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {/* Pipeline Stage Tracker */}
      <div>
        <h5 style={{ margin: "0 0 12px 0", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accentColor)" }}>
          Pipeline Execution Stages
        </h5>
        <p style={{ fontSize: "10px", color: "#666", marginTop: "-6px", marginBottom: "12px" }}>
          Click on any stage node to view its execution logs in the terminal viewer.
        </p>
        
        {/* Horizontally scrollable timeline steps */}
        <div style={{ display: "flex", overflowX: "auto", paddingBottom: "10px", gap: "10px", alignItems: "center" }}>
          {activeRun.steps.map((step, idx) => {
            const isSelected = selectedPipelineStepId === step.id;
            return (
              <div 
                key={step.id} 
                style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
              >
                <button
                  onClick={() => setSelectedPipelineStepId(selectedPipelineStepId === step.id ? null : step.id)}
                  style={{
                    background: isSelected ? "rgba(194,164,255,0.1)" : "rgba(255,255,255,0.02)",
                    border: isSelected ? "1px solid var(--accentColor)" : "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "4px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                    outline: "none"
                  }}
                >
                  <span style={{ fontSize: "8px", fontWeight: 700, color: "#666", textTransform: "uppercase" }}>
                    Stage {idx + 1}
                  </span>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#ffffff" }}>
                    {step.name}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                    <span className={`status-dot ${step.status}`} style={{ width: "5px", height: "5px" }} />
                    <span style={{ fontSize: "9px", color: "#adacac" }}>{step.durationSeconds}s</span>
                  </div>
                </button>
                
                {idx < activeRun.steps.length - 1 && (
                  <div style={{ width: "20px", height: "1px", background: "rgba(255,255,255,0.1)", margin: "0 5px" }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Terminal Log Viewer */}
      {selectedPipelineStepId && (() => {
        const step = activeRun.steps.find(s => s.id === selectedPipelineStepId);
        if (!step) return null;
        return (
          <TerminalConsole
            headerRight={
              <div style={{ display: "flex", width: "100%", justifyContent: "space-between", color: "#adacac" }}>
                <span style={{ color: "#ffffff", fontWeight: 700 }}>{step.name} Execution Logs</span>
                <span>exit code: 0</span>
              </div>
            }
          >
            {step.logs.map((log, lIdx) => (
              <div key={lIdx} style={{ color: "#5ce6b0" }}>$ {log}</div>
            ))}
          </TerminalConsole>
        );
      })()}
    </div>
  );
});

PipelineVisualizer.displayName = "PipelineVisualizer";
