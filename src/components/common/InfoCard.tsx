import React, { ReactNode } from "react";
import { GlassCard } from "./GlassCard";

interface InfoCardProps {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  style?: React.CSSProperties;
}

export const InfoCard = React.memo(({ 
  title, 
  subtitle, 
  badge, 
  children, 
  footer,
  style 
}: InfoCardProps) => {
  return (
    <GlassCard style={{ display: "flex", flexDirection: "column", gap: "10px", ...style }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-primary)" }}>{title}</span>
          {subtitle && <span style={{ fontSize: "9px", color: "var(--text-secondary)" }}>{subtitle}</span>}
        </div>
        {badge}
      </div>
      <div style={{ fontSize: "11px", color: "var(--text-secondary)", lineHeight: "1.4" }}>
        {children}
      </div>
      {footer && (
        <div style={{ borderTop: "1px solid var(--color-border-subtle)", paddingTop: "8px", marginTop: "4px" }}>
          {footer}
        </div>
      )}
    </GlassCard>
  );
});

InfoCard.displayName = "InfoCard";
