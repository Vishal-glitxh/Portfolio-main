import React from "react";
import { InfoCard } from "../common/InfoCard";
import { StatusBadge } from "../common/StatusBadge";
import { TagChip } from "../common/TagChip";
import { Divider } from "../common/Divider";
import { DebuggingEntry } from "../../types";

interface DebugCardProps {
  entry: DebuggingEntry;
  isExpanded: boolean;
  onToggle: () => void;
}

export const DebugCard = React.memo(({ entry, isExpanded, onToggle }: DebugCardProps) => {
  const getSeverityType = (sev: string) => {
    if (sev === "Critical") return "error";
    if (sev === "High") return "warn";
    if (sev === "Medium") return "info";
    return "neutral";
  };

  return (
    <InfoCard
      title={entry.title}
      subtitle={entry.category}
      badge={
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <StatusBadge status={entry.severity} type={getSeverityType(entry.severity)} />
          <button
            onClick={onToggle}
            style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "10px", outline: "none" }}
          >
            {isExpanded ? "▲" : "▼"}
          </button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div><strong>Problem:</strong> {entry.problem}</div>
        <div><strong>Symptoms:</strong> {entry.symptoms}</div>
        {isExpanded && (
          <>
            <Divider />
            <div><strong>Investigation:</strong> {entry.investigation}</div>
            <div><strong>Root Cause:</strong> {entry.rootCause}</div>
            <div><strong>Solution:</strong> {entry.solution}</div>
            <div><strong>Prevention:</strong> {entry.prevention}</div>
            <div><strong>Verification:</strong> {entry.verification}</div>
            <div><strong>Stability Impact:</strong> <span style={{ color: "#5ce6b0", fontWeight: 700 }}>{entry.impact}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", color: "#666", marginTop: "4px" }}>
              <span>Time spent: {entry.timeSpent}</span>
              {entry.resolvedInVersion && <span>Fixed in: {entry.resolvedInVersion}</span>}
            </div>
            {entry.technologies && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "8px" }}>
                {entry.technologies.map((t) => <TagChip key={t} label={t} />)}
              </div>
            )}
          </>
        )}
      </div>
    </InfoCard>
  );
});

DebugCard.displayName = "DebugCard";
