import React from "react";
import { InfoCard } from "../common/InfoCard";
import { TagChip } from "../common/TagChip";
import { Divider } from "../common/Divider";
import { EngineeringDecision } from "../../types";

interface DecisionCardProps {
  decision: EngineeringDecision;
  isExpanded: boolean;
  onToggle: () => void;
}

export const DecisionCard = React.memo(({ decision, isExpanded, onToggle }: DecisionCardProps) => {
  return (
    <InfoCard
      title={decision.title}
      subtitle={decision.category}
      badge={
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {decision.difficulty && (
            <span style={{ fontSize: "8px", fontWeight: 700, color: decision.difficulty === "High" ? "#ff5c5c" : decision.difficulty === "Medium" ? "#ffb86c" : "#5ce6b0" }}>
              {decision.difficulty} Effort
            </span>
          )}
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
        <div><strong>Context:</strong> {decision.context}</div>
        <div><strong>Reasoning:</strong> {decision.reasoning}</div>
        {isExpanded && (
          <>
            <Divider />
            <div><strong>Outcome:</strong> {decision.outcome}</div>
            {decision.alternatives && decision.alternatives.length > 0 && (
              <div>
                <strong>Alternatives Considered:</strong>
                <ul style={{ margin: "4px 0 0 15px", padding: 0 }}>
                  {decision.alternatives.map((alt, idx) => <li key={idx}>{alt}</li>)}
                </ul>
              </div>
            )}
            {decision.tradeoffs && decision.tradeoffs.length > 0 && (
              <div>
                <strong>Tradeoffs:</strong>
                <ul style={{ margin: "4px 0 0 15px", padding: 0 }}>
                  {decision.tradeoffs.map((to, idx) => <li key={idx}>{to}</li>)}
                </ul>
              </div>
            )}
            {decision.tags && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "8px" }}>
                {decision.tags.map((tag) => <TagChip key={tag} label={tag} />)}
              </div>
            )}
          </>
        )}
      </div>
    </InfoCard>
  );
});

DecisionCard.displayName = "DecisionCard";
