import React from "react";
import { FaExclamationTriangle, FaHistory, FaRoute, FaInfoCircle } from "react-icons/fa";
import { ProjectDetails, EngineeringEvidence, ProjectTimeline } from "../../types";
import { AccordionItem } from "../common/AccordionItem";
import { DevelopmentTimelineCard } from "../cards/DevelopmentTimelineCard";

interface OverviewWorkspaceProps {
  project: ProjectDetails;
  evidence: EngineeringEvidence | undefined;
  timeline: ProjectTimeline | undefined;
  expandedSections: Record<string, boolean>;
  toggleSection: (id: string) => void;
  highlightedSectionId: string | null;
}

export const OverviewWorkspace = React.memo(({ 
  project, 
  evidence, 
  timeline,
  expandedSections, 
  toggleSection,
  highlightedSectionId
}: OverviewWorkspaceProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* 1. Collapsible Section: Project Summary */}
      <AccordionItem
        id="summary"
        title="Project Brief & Summary"
        isOpen={!!expandedSections.summary}
        onToggle={() => toggleSection("summary")}
        icon={<FaInfoCircle className="section-icon text-accent" />}
        className={highlightedSectionId === "summary" ? "highlight-glow" : ""}
      >
        <div className="summary-card-inner">
          <p className="recruiter-highlight-p" style={{ fontSize: "11px", color: "var(--accentColor)", fontWeight: 700, margin: "0 0 10px 0" }}>
            Recruiter Summary: {evidence?.recruiterSummary}
          </p>
          <div className="project-brief-row" style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <div className="summary-subcard" style={{ flex: "1 1 200px" }}>
              <h5>The Problem</h5>
              <p>{project.problem}</p>
            </div>
            <div className="summary-subcard" style={{ flex: "1 1 200px" }}>
              <h5>The Solution</h5>
              <p>{project.solution}</p>
            </div>
          </div>
        </div>
      </AccordionItem>

      {/* 2. Collapsible Section: Challenges Timeline */}
      {evidence && evidence.challenges.length > 0 && (
        <AccordionItem
          id="challenges"
          title="Engineering Challenges"
          isOpen={!!expandedSections.challenges}
          onToggle={() => toggleSection("challenges")}
          icon={<FaExclamationTriangle className="section-icon text-accent" />}
          className={highlightedSectionId === "challenges" ? "highlight-glow" : ""}
        >
          <div className="challenges-timeline">
            <div className="timeline-track" />
            {evidence.challenges.map((item, idx) => (
              <div className="challenge-timeline-card" key={idx}>
                <div className="challenge-marker">
                  <span className="pulse-marker-dot" />
                </div>
                <div className="challenge-details-box">
                  <h5>Problem: {item.problem}</h5>
                  <p><strong>Root Cause:</strong> {item.rootCause}</p>
                  <p><strong>Solution:</strong> {item.solution}</p>
                  <p><strong>Technical Learning:</strong> {item.technicalLearning}</p>
                  <p><strong>Future Prevention:</strong> {item.futurePrevention}</p>
                </div>
              </div>
            ))}
          </div>
        </AccordionItem>
      )}

      {/* 3. Collapsible Section: Project Development Timeline */}
      {timeline && (
        <AccordionItem
          id="timeline"
          title="Project Development Timeline"
          isOpen={!!expandedSections.timeline}
          onToggle={() => toggleSection("timeline")}
          icon={<FaHistory className="section-icon text-accent" />}
          className={highlightedSectionId === "timeline" ? "highlight-glow" : ""}
        >
          <DevelopmentTimelineCard timeline={timeline} />
        </AccordionItem>
      )}

      {/* 4. Collapsible Section: Future Roadmap */}
      {evidence && evidence.roadmap.length > 0 && (
        <AccordionItem
          id="roadmap"
          title="Future Roadmap"
          isOpen={!!expandedSections.roadmap}
          onToggle={() => toggleSection("roadmap")}
          icon={<FaRoute className="section-icon text-accent" />}
          className={highlightedSectionId === "roadmap" ? "highlight-glow" : ""}
        >
          <div className="roadmap-milestones-grid">
            {evidence.roadmap.map((item, idx) => (
              <div className="roadmap-milestone-card" key={idx}>
                <div className="roadmap-card-header">
                  <span className="roadmap-box-title">{item.title}</span>
                  <span className={`roadmap-priority-tag ${item.priority.toLowerCase()}`}>
                    {item.priority}
                  </span>
                </div>
                <p className="roadmap-desc">{item.description}</p>
                <div className="roadmap-card-footer">
                  <span className="roadmap-est-ver">Est: {item.estimatedVersion}</span>
                  <span className={`roadmap-status-dot ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </AccordionItem>
      )}
    </div>
  );
});

OverviewWorkspace.displayName = "OverviewWorkspace";
export default OverviewWorkspace;
