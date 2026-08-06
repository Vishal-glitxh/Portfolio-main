import React, { useState } from "react";
import { FaCode, FaExclamationTriangle } from "react-icons/fa";
import { EngineeringNotebook, DebuggingJournal } from "../../types";
import { AccordionItem } from "../common/AccordionItem";
import { DecisionCard } from "../cards/DecisionCard";
import { DebugCard } from "../cards/DebugCard";
import { getDebugEntries } from "../../data/debuggingJournal";

interface EngineeringWorkspaceProps {
  notebook: EngineeringNotebook | undefined;
  journal: DebuggingJournal | undefined;
  expandedSections: Record<string, boolean>;
  toggleSection: (id: string) => void;
  highlightedSectionId: string | null;
}

export const EngineeringWorkspace = React.memo(({
  notebook,
  journal,
  expandedSections,
  toggleSection,
  highlightedSectionId
}: EngineeringWorkspaceProps) => {
  const [expandedDecisionId, setExpandedDecisionId] = useState<string | null>(null);
  const [expandedDebugId, setExpandedDebugId] = useState<string | null>(null);

  const debugEntries = journal ? getDebugEntries(journal.projectId) : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* 1. Engineering Notebook Collapsible Section */}
      {notebook && notebook.decisions.length > 0 && (
        <AccordionItem
          id="notebook"
          title="Engineering Notebook"
          isOpen={!!expandedSections.notebook}
          onToggle={() => toggleSection("notebook")}
          icon={<FaCode className="section-icon text-accent" />}
          className={highlightedSectionId === "notebook" ? "highlight-glow" : ""}
        >
          <div className="engineering-notebook-container">
            {notebook.summary && (
              <p className="notebook-summary" style={{ fontSize: "12px", color: "#adacac", marginBottom: "15px", lineHeight: "1.5" }}>
                {notebook.summary}
              </p>
            )}
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {notebook.decisions.map((decision) => (
                <DecisionCard
                  key={decision.id}
                  decision={decision}
                  isExpanded={expandedDecisionId === decision.id}
                  onToggle={() => setExpandedDecisionId(expandedDecisionId === decision.id ? null : decision.id)}
                />
              ))}
            </div>
          </div>
        </AccordionItem>
      )}

      {/* 2. Debugging Journal Collapsible Section */}
      {journal && debugEntries.length > 0 && (
        <AccordionItem
          id="journal"
          title="Debugging Journal"
          isOpen={!!expandedSections.journal}
          onToggle={() => toggleSection("journal")}
          icon={<FaExclamationTriangle className="section-icon text-accent" />}
          className={highlightedSectionId === "journal" ? "highlight-glow" : ""}
        >
          <div className="debugging-journal-container">
            {journal.title && (
              <p className="notebook-summary" style={{ fontSize: "12px", color: "#adacac", marginBottom: "15px", lineHeight: "1.5" }}>
                {journal.title}
              </p>
            )}
            
            <div className="debugging-timeline" style={{ position: "relative", paddingLeft: "15px" }}>
              <div className="timeline-connector-line" style={{ position: "absolute", top: 0, bottom: 0, left: "5px", width: "2px", background: "rgba(255,255,255,0.03)" }} />
              
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {debugEntries.map((entry) => (
                  <div key={entry.id} style={{ position: "relative", paddingLeft: "20px" }}>
                    <div className="timeline-node-marker" style={{ position: "absolute", left: "-18px", top: "14px", width: "12px", height: "12px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <span className={`node-marker-pulse severity-${entry.severity.toLowerCase()}`} style={{ width: "8px", height: "8px", borderRadius: "50%", boxShadow: `0 0 8px var(--accentColor)` }} />
                    </div>
                    <DebugCard
                      entry={entry}
                      isExpanded={expandedDebugId === entry.id}
                      onToggle={() => setExpandedDebugId(expandedDebugId === entry.id ? null : entry.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AccordionItem>
      )}
    </div>
  );
});

EngineeringWorkspace.displayName = "EngineeringWorkspace";
export default EngineeringWorkspace;
