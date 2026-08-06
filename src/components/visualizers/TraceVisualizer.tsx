import React, { useState } from "react";
import { DistributedTraceSpan } from "../../types";

interface TraceVisualizerProps {
  traceSpans: DistributedTraceSpan[];
}

export const TraceVisualizer = React.memo(({ traceSpans }: TraceVisualizerProps) => {
  const [hoveredTraceSpanId, setHoveredTraceSpanId] = useState<string | null>(null);

  return (
    <div>
      <h5 style={{ margin: "0 0 12px 0", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accentColor)" }}>
        Request Lifecycle trace (Jaeger Style)
      </h5>
      <p style={{ fontSize: "10px", color: "#666", marginTop: "-6px", marginBottom: "15px" }}>
        Hover over a trace span bar to view its specific failure points and retry strategy.
      </p>
      
      <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "8px", padding: "15px", display: "flex", flexDirection: "column", gap: "8px" }}>
        {traceSpans.map((span) => {
          const isHovered = hoveredTraceSpanId === span.id;
          return (
            <div 
              key={span.id}
              onMouseEnter={() => setHoveredTraceSpanId(span.id)}
              onMouseLeave={() => setHoveredTraceSpanId(null)}
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px" }}>
                <span style={{ fontWeight: 700, color: "#ffffff" }}>{span.service} - {span.operation}</span>
                <span style={{ color: "#888" }}>{span.durationMs}ms</span>
              </div>
              
              {/* Horizontal Gantt Bar */}
              <div style={{ height: "14px", background: "rgba(255,255,255,0.03)", borderRadius: "4px", position: "relative", width: "100%", overflow: "hidden" }}>
                <div 
                  style={{
                    position: "absolute",
                    left: `${(span.startOffsetMs / 180) * 100}%`,
                    width: `${(span.durationMs / 180) * 100}%`,
                    height: "100%",
                    background: isHovered ? "var(--accentColor)" : "rgba(194, 164, 255, 0.4)",
                    borderRadius: "4px",
                    transition: "background 0.2s ease"
                  }}
                />
              </div>

              {/* Hover details */}
              {isHovered && (
                <div style={{ fontSize: "9px", color: "#adacac", background: "rgba(0,0,0,0.2)", padding: "8px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: "2px", marginTop: "2px" }}>
                  <div><strong>Responsibility:</strong> {span.responsibility}</div>
                  <div><strong>Potential Failure Points:</strong> {span.failurePoints.join(", ")}</div>
                  <div><strong>Retry Strategy:</strong> {span.retryStrategy}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

TraceVisualizer.displayName = "TraceVisualizer";
