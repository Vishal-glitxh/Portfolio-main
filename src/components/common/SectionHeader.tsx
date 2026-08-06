import React, { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  icon?: ReactNode;
  actions?: ReactNode;
}

export const SectionHeader = React.memo(({ title, icon, actions }: SectionHeaderProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {icon}
        <h5 style={{ margin: 0, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accentColor)" }}>
          {title}
        </h5>
      </div>
      {actions}
    </div>
  );
});

SectionHeader.displayName = "SectionHeader";
