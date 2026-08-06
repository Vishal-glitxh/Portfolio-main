import React, { ReactNode } from "react";

interface AccordionItemProps {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  headerRight?: ReactNode;
}

export const AccordionItem = React.memo(({ 
  id, 
  title, 
  isOpen, 
  onToggle, 
  icon, 
  children, 
  className = "",
  headerRight
}: AccordionItemProps) => {
  return (
    <div id={id} className={`explorer-section collapsible-section ${className}`}>
      <button 
        className="section-collapse-header"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
        id={`header-${id}`}
      >
        <span className="section-title-wrapper">
          {icon}
          <h4>{title}</h4>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {headerRight}
          <span className={`collapse-arrow-icon ${isOpen ? "open" : ""}`}>▼</span>
        </div>
      </button>
      <div 
        id={`panel-${id}`}
        role="region"
        aria-labelledby={`header-${id}`}
        className={`collapsible-content-wrapper ${isOpen ? "open" : ""}`}
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="section-content-inner">
          {children}
        </div>
      </div>
    </div>
  );
});

AccordionItem.displayName = "AccordionItem";
