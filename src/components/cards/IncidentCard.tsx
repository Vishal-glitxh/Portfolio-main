import React from "react";
import { StatusBadge } from "../common/StatusBadge";
import { ObservabilityIncident } from "../../types";

interface IncidentCardProps {
  incident: ObservabilityIncident;
  isExpanded: boolean;
  onToggle: () => void;
}

export const IncidentCard = React.memo(({ incident, isExpanded, onToggle }: IncidentCardProps) => {
  return (
    <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "8px", overflow: "hidden" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          textAlign: "left",
          outline: "none"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <StatusBadge status={incident.severity} type={incident.severity === "Sev-1" ? "error" : "warn"} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#ffffff" }}>{incident.title}</span>
        </div>
        <span style={{ fontSize: "9px", color: "#666" }}>{isExpanded ? "▲" : "▼"}</span>
      </button>

      {isExpanded && (
        <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.03)", fontSize: "10px", color: "#adacac", display: "flex", flexDirection: "column", gap: "6px", lineHeight: "1.4" }}>
          <div><strong>Incident Problem:</strong> <span>{incident.problem}</span></div>
          <div><strong>Symptoms:</strong> <span>{incident.symptoms}</span></div>
          <div><strong>Root Cause:</strong> <span>{incident.rootCause}</span></div>
          <div><strong>Resolution:</strong> <span>{incident.resolution}</span></div>
          <div><strong>Verification:</strong> <span>{incident.verification}</span></div>
          <div><strong>Lessons Learned:</strong> <span>{incident.lessonsLearned}</span></div>
        </div>
      )}
    </div>
  );
});

IncidentCard.displayName = "IncidentCard";
