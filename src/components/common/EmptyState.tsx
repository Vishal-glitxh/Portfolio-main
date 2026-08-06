import React from "react";

interface EmptyStateProps {
  message: string;
}

export const EmptyState = React.memo(({ message }: EmptyStateProps) => (
  <div style={{ padding: "30px", textAlign: "center", color: "#666", fontSize: "11px" }}>
    {message}
  </div>
));

EmptyState.displayName = "EmptyState";
