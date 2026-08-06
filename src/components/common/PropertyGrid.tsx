import React, { ReactNode } from "react";

interface PropertyGridProps {
  children: ReactNode;
  columns?: string;
  gap?: string;
}

export const PropertyGrid = React.memo(({ 
  children, 
  columns = "repeat(auto-fit, minmax(200px, 1fr))",
  gap = "12px"
}: PropertyGridProps) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: columns, gap }}>
      {children}
    </div>
  );
});

PropertyGrid.displayName = "PropertyGrid";
