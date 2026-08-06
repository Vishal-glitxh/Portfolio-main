import React from "react";
import { GlassCard } from "../common/GlassCard";
import { StatusBadge } from "../common/StatusBadge";
import { OperationalEnvironment } from "../../types";

interface PipelineCardProps {
  env: OperationalEnvironment;
}

export const PipelineCard = React.memo(({ env }: PipelineCardProps) => {
  const getStatusType = (status: string) => {
    if (status === "active") return "success";
    if (status === "updating") return "warn";
    return "error";
  };

  const getHealthType = (health: string) => {
    if (health === "healthy") return "success";
    if (health === "degraded") return "warn";
    return "error";
  };

  return (
    <GlassCard style={{ display: "flex", flexDirection: "column", gap: "10px", flex: "1 1 200px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#666" }}>{env.name}</span>
        <StatusBadge status={env.status} type={getStatusType(env.status)} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "10px", color: "#adacac" }}>
        <div>Provider: <strong style={{ color: "#ffffff" }}>{env.hostingProvider}</strong></div>
        <div>Strategy: <strong style={{ color: "#ffffff" }}>{env.deploymentStrategy}</strong></div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
          <span>Version: {env.version}</span>
          <span>Deployed: {env.lastDeployed}</span>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.03)", paddingTop: "8px", marginTop: "2px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "9px", color: "#666" }}>Health Status</span>
        <StatusBadge status={env.healthStatus} type={getHealthType(env.healthStatus)} />
      </div>
    </GlassCard>
  );
});

PipelineCard.displayName = "PipelineCard";
