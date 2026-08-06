import React from "react";
import { GlassCard } from "./GlassCard";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
}

export const MetricCard = React.memo(({ label, value, unit = "", highlight = false }: MetricCardProps) => {
  return (
    <GlassCard 
      className={highlight ? "highlighted" : ""}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        borderColor: highlight ? "var(--color-accent-solid)" : undefined
      }}
    >
      <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
        <span style={{ fontSize: "28px", fontWeight: 800, color: "var(--text-primary)" }}>{value}</span>
        {unit && <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500 }}>{unit}</span>}
      </div>
    </GlassCard>
  );
});

MetricCard.displayName = "MetricCard";
