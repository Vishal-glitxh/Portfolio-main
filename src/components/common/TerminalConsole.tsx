import React, { ReactNode } from "react";

interface TerminalConsoleProps {
  children: ReactNode;
  maxHeight?: string;
  headerRight?: ReactNode;
}

export const TerminalConsole = React.memo(({ 
  children, 
  maxHeight = "150px",
  headerRight
}: TerminalConsoleProps) => {
  return (
    <div 
      className="structured-log-terminal" 
      role="log"
      aria-live="polite"
      style={{
        background: "#050508",
        border: "1px solid var(--color-border-light)",
        borderRadius: "var(--radius-standard)",
        padding: "12px",
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        lineHeight: "1.4"
      }}
    >
      {headerRight && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px", borderBottom: "1px solid rgba(255,255,255,0.03)", paddingBottom: "4px" }}>
          {headerRight}
        </div>
      )}
      <div style={{ maxHeight, overflowY: "auto", display: "flex", flexDirection: "column", gap: "6px" }}>
        {children}
      </div>
    </div>
  );
});

TerminalConsole.displayName = "TerminalConsole";
