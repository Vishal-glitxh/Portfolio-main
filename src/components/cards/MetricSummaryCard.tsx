import React from "react";
import { GlassCard } from "../common/GlassCard";

interface MetricSummaryCardProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
}

export const MetricSummaryCard = React.memo(({ label, value, unit = "", highlight = false }: MetricSummaryCardProps) => {
  return (
    <GlassCard 
      className={highlight ? "highlighted" : ""}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 15px",
        borderColor: highlight ? "var(--color-accent-solid)" : undefined
      }}
    >
      <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
        <span style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-primary)" }}>{value}</span>
        {unit && <span style={{ fontSize: "9px", color: "var(--text-secondary)" }}>{unit}</span>}
      </div>
    </GlassCard>
  );
});

MetricSummaryCard.displayName = "MetricSummaryCard";
