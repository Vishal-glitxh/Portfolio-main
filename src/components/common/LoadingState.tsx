import React from "react";

export const LoadingState = React.memo(() => (
  <div style={{ padding: "40px", display: "flex", justifyContent: "center", alignItems: "center", color: "var(--accentColor)", fontSize: "12px", gap: "8px" }}>
    <span className="spinner" style={{ width: "16px", height: "16px", border: "2px solid currentColor", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin 1s linear infinite" }} />
    <span>Loading Engineering Evidence...</span>
  </div>
));

LoadingState.displayName = "LoadingState";
