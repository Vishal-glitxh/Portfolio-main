import React, { ReactNode } from "react";

interface TimelineItemProps {
  dotColor?: string;
  header: ReactNode;
  children: ReactNode;
}

export const TimelineItem = React.memo(({ 
  dotColor = "var(--accentColor)", 
  header, 
  children 
}: TimelineItemProps) => {
  return (
    <div style={{ display: "flex", gap: "12px", position: "relative" }}>
      <div 
        style={{
          width: "9px",
          height: "9px",
          borderRadius: "50%",
          background: dotColor,
          zIndex: 1,
          marginTop: "4px",
          border: "2px solid #000"
        }}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
        {header}
        <div style={{ fontSize: "11px", color: "var(--text-secondary)", lineHeight: "1.4" }}>
          {children}
        </div>
      </div>
    </div>
  );
});

TimelineItem.displayName = "TimelineItem";
