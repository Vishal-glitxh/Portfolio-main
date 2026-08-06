import React from "react";

interface StatusBadgeProps {
  status: string;
  type?: "success" | "warn" | "error" | "info" | "neutral";
  style?: React.CSSProperties;
}

export const StatusBadge = React.memo(({ status, type = "neutral", style }: StatusBadgeProps) => {
  const getColors = () => {
    switch (type) {
      case "success":
        return { bg: "rgba(92, 230, 176, 0.1)", text: "#5ce6b0", border: "1px solid rgba(92, 230, 176, 0.2)" };
      case "warn":
        return { bg: "rgba(255, 184, 108, 0.1)", text: "#ffb86c", border: "1px solid rgba(255, 184, 108, 0.2)" };
      case "error":
        return { bg: "rgba(255, 92, 92, 0.1)", text: "#ff5c5c", border: "1px solid rgba(255, 92, 92, 0.2)" };
      case "info":
        return { bg: "rgba(92, 176, 230, 0.1)", text: "#5cb0e6", border: "1px solid rgba(92, 176, 230, 0.2)" };
      default:
        return { bg: "rgba(255, 255, 255, 0.02)", text: "#adacac", border: "1px solid rgba(255, 255, 255, 0.05)" };
    }
  };

  const colors = getColors();

  return (
    <span
      style={{
        fontSize: "8px",
        fontWeight: 700,
        textTransform: "uppercase",
        padding: "2px 6px",
        borderRadius: "var(--radius-pill)",
        background: colors.bg,
        color: colors.text,
        border: colors.border,
        display: "inline-block",
        whiteSpace: "nowrap",
        ...style
      }}
    >
      {status}
    </span>
  );
});

StatusBadge.displayName = "StatusBadge";
