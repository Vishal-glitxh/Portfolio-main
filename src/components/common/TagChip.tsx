import React from "react";

interface TagChipProps {
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

export const TagChip = React.memo(({ label, className = "", style }: TagChipProps) => {
  return (
    <span
      className={`tag-chip ${className}`}
      style={{
        fontSize: "9px",
        fontWeight: 700,
        color: "var(--color-accent-solid)",
        background: "var(--color-accent-subtle)",
        border: "1px solid var(--color-accent-border)",
        borderRadius: "var(--radius-pill)",
        padding: "2px 6px",
        display: "inline-block",
        whiteSpace: "nowrap",
        ...style
      }}
    >
      {label}
    </span>
  );
});

TagChip.displayName = "TagChip";
