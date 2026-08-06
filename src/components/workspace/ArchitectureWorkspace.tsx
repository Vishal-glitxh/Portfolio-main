import React, { useState } from "react";
import { FaProjectDiagram, FaLightbulb } from "react-icons/fa";
import { ProjectDetails, EngineeringEvidence } from "../../types";
import { AccordionItem } from "../common/AccordionItem";
import { ArchitectureVisualizer } from "../visualizers/ArchitectureVisualizer";

interface ArchitectureWorkspaceProps {
  project: ProjectDetails;
  evidence: EngineeringEvidence | undefined;
  expandedSections: Record<string, boolean>;
  toggleSection: (id: string) => void;
  highlightedSectionId: string | null;
}

export const ArchitectureWorkspace = React.memo(({
  project,
  evidence,
  expandedSections,
  toggleSection,
  highlightedSectionId
}: ArchitectureWorkspaceProps) => {
  const [expandedDecisionIndex, setExpandedDecisionIndex] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* 1. Architecture Visualizer */}
      <div 
        className={`explorer-section ${highlightedSectionId === "architecture-section" ? "highlight-glow" : ""}`} 
        id="architecture-section"
      >
        <div className="explorer-section-header">
          <FaProjectDiagram className="section-icon text-accent" />
          <h4>System Architecture</h4>
        </div>
        <ArchitectureVisualizer projectName={project.name} />
      </div>

      {/* 2. Collapsible Section: Engineering Decisions */}
      {evidence && evidence.engineeringDecisions.length > 0 && (
        <AccordionItem
          id="decisions"
          title="Engineering Decisions"
          isOpen={!!expandedSections.decisions}
          onToggle={() => toggleSection("decisions")}
          icon={<FaLightbulb className="section-icon text-accent" />}
          className={highlightedSectionId === "decisions" ? "highlight-glow" : ""}
        >
          <div className="accordion-decisions">
            {evidence.engineeringDecisions.map((item, idx) => {
              const isExpanded = expandedDecisionIndex === idx;
              return (
                <div className="accordion-item" key={idx}>
                  <button
                    className="accordion-trigger"
                    onClick={() => setExpandedDecisionIndex(isExpanded ? null : idx)}
                    aria-expanded={isExpanded}
                    aria-controls={`dec-content-${idx}`}
                    id={`dec-header-${idx}`}
                  >
                    <span>{item.decision}</span>
                    <span className="accordion-arrow">{isExpanded ? "▲" : "▼"}</span>
                  </button>
                  {isExpanded && (
                    <div 
                      id={`dec-content-${idx}`}
                      role="region"
                      aria-labelledby={`dec-header-${idx}`}
                      className="accordion-content"
                    >
                      <div className="decision-field">
                        <strong>Context:</strong> <span>{item.context}</span>
                      </div>
                      <div className="decision-field">
                        <strong>Reason:</strong> <span>{item.reason}</span>
                      </div>
                      <div className="decision-field">
                        <strong>Alternatives Considered:</strong> <span>{item.alternatives}</span>
                      </div>
                      <div className="decision-field">
                        <strong>Trade-offs:</strong> <span>{item.tradeoffs}</span>
                      </div>
                      <div className="decision-field">
                        <strong>Outcome:</strong> <span>{item.outcome}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </AccordionItem>
      )}
    </div>
  );
});

ArchitectureWorkspace.displayName = "ArchitectureWorkspace";
export default ArchitectureWorkspace;
