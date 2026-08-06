import React, { ReactNode } from "react";

interface TimelineProps {
  children: ReactNode;
}

export const Timeline = React.memo(({ children }: TimelineProps) => {
  return (
    <div className="debugging-timeline" style={{ display: "flex", flexDirection: "column", gap: "12px", position: "relative", paddingLeft: "10px" }}>
      <div style={{ position: "absolute", left: "14px", top: "5px", bottom: "5px", width: "1px", background: "rgba(255,255,255,0.05)" }} />
      {children}
    </div>
  );
});

Timeline.displayName = "Timeline";
