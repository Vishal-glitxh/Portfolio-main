import React, { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const GlassCard = React.memo(({ children, className = "", style }: GlassCardProps) => {
  return (
    <div 
      className={`glass-card ${className}`} 
      style={{
        background: "var(--color-bg-panel)",
        border: "1px solid var(--color-border-light)",
        borderRadius: "var(--radius-standard)",
        padding: "15px",
        backdropFilter: "var(--glass-blur)",
        ...style
      }}
    >
      {children}
    </div>
  );
});

GlassCard.displayName = "GlassCard";
