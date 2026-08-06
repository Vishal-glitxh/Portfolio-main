import React from "react";
import { InfoCard } from "../common/InfoCard";
import { StatusBadge } from "../common/StatusBadge";
import { SecurityItem } from "../../types";

interface SecurityCardProps {
  item: SecurityItem;
}

export const SecurityCard = React.memo(({ item }: SecurityCardProps) => {
  return (
    <InfoCard
      title={item.title}
      badge={<StatusBadge status={item.riskLevel} type={item.riskLevel === "High" ? "error" : item.riskLevel === "Medium" ? "warn" : "success"} />}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div><strong>Current Design:</strong> {item.currentImplementation}</div>
        <div style={{ color: "#ffd15c" }}><strong>Mitigation:</strong> {item.mitigationStrategy}</div>
      </div>
    </InfoCard>
  );
});

SecurityCard.displayName = "SecurityCard";
