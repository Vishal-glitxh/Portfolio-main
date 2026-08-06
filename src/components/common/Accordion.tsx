import React, { ReactNode } from "react";

interface AccordionProps {
  children: ReactNode;
  className?: string;
}

export const Accordion = React.memo(({ children, className = "" }: AccordionProps) => {
  return (
    <div className={`accordion-container ${className}`} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {children}
    </div>
  );
});

Accordion.displayName = "Accordion";
