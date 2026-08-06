import React, { useState } from "react";
import { FaCheckCircle, FaRegCircle, FaCalendarAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ProjectTimeline } from "../../types";
import { GlassCard } from "../common/GlassCard";
import { TagChip } from "../common/TagChip";

interface DevelopmentTimelineCardProps {
  timeline: ProjectTimeline;
}

export const DevelopmentTimelineCard = React.memo(({ timeline }: DevelopmentTimelineCardProps) => {
  const [expandedStageId, setExpandedStageId] = useState<string | null>(
    timeline.stages.find(s => s.status === "active")?.id || timeline.stages[0]?.id || null
  );

  const handleStageClick = (stageId: string) => {
    setExpandedStageId(prev => (prev === stageId ? null : stageId));
  };

  const getPriorityStyle = (priority?: string) => {
    switch (priority) {
      case "High":
        return { background: "rgba(255, 92, 92, 0.1)", color: "#ff5c5c" };
      case "Medium":
        return { background: "rgba(255, 184, 108, 0.1)", color: "#ffb86c" };
      case "Low":
        return { background: "rgba(92, 176, 230, 0.1)", color: "#5cb0e6" };
      default:
        return { background: "rgba(255,255,255,0.05)", color: "#666" };
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const year = parts[0];
    const month = months[parseInt(parts[1], 10) - 1] || parts[1];
    const day = parseInt(parts[2], 10);
    return `${month} ${day}, ${year}`;
  };

  return (
    <div className="project-timeline-container" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* 1. Overall Progress Header Card */}
      <GlassCard style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h5 style={{ margin: "0", fontSize: "12px", fontWeight: 700, color: "#ffffff" }}>Engineering Progress</h5>
            <span style={{ fontSize: "10px", color: "#666" }}>Development stages track</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
            <span style={{ fontSize: "24px", fontWeight: 800, color: "var(--accentColor)" }}>
              {timeline.overallProgress}
            </span>
            <span style={{ fontSize: "12px", color: "var(--accentColor)", fontWeight: 700 }}>%</span>
          </div>
        </div>

        {/* Reusable Animated Progress Component */}
        <div style={{ height: "6px", background: "rgba(255,255,255,0.03)", borderRadius: "3px", position: "relative", overflow: "hidden" }}>
          <div 
            style={{ 
              width: `${timeline.overallProgress}%`, 
              height: "100%", 
              background: "var(--accentColor)", 
              borderRadius: "3px",
              boxShadow: "0 0 8px var(--accentColor)"
            }} 
          />
        </div>
      </GlassCard>

      {/* 2. Vertical Stages Stack */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "8px", paddingLeft: "10px" }}>
        {/* Node Track Line */}
        <div 
          style={{ 
            position: "absolute", 
            left: "21px", 
            top: "20px", 
            bottom: "20px", 
            width: "2px", 
            background: "linear-gradient(180deg, #5ce6b0 0%, var(--accentColor) 50%, rgba(255,255,255,0.05) 100%)",
            zIndex: 0 
          }} 
        />

        {timeline.stages.map((stage) => {
          const isCompleted = stage.status === "completed";
          const isActive = stage.status === "active";
          const isPlanned = stage.status === "planned";
          const isExpanded = expandedStageId === stage.id;

          return (
            <div 
              key={stage.id} 
              className={`timeline-stage-wrapper ${isActive ? "active" : ""}`}
              style={{ display: "flex", gap: "15px", zIndex: 1, position: "relative" }}
            >
              {/* Left Node Icon Column */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "24px", marginTop: "10px" }}>
                {isCompleted && (
                  <FaCheckCircle style={{ color: "#5ce6b0", fontSize: "14px", background: "#0a0a0f", borderRadius: "50%" }} />
                )}
                {isActive && (
                  <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "14px", height: "14px" }}>
                    <span 
                      className="status-badge-pulse active" 
                      style={{ 
                        position: "absolute", 
                        width: "14px", 
                        height: "14px", 
                        borderRadius: "50%", 
                        background: "var(--accentColor)", 
                        opacity: 0.4 
                      }} 
                    />
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ffffff", zIndex: 2 }} />
                  </div>
                )}
                {isPlanned && (
                  <FaRegCircle style={{ color: "#666", fontSize: "12px", background: "#0a0a0f", borderRadius: "50%" }} />
                )}
              </div>

              {/* Right Content Panel Column */}
              <div style={{ flex: 1 }}>
                <button
                  onClick={() => handleStageClick(stage.id)}
                  role="button"
                  aria-expanded={isExpanded}
                  aria-controls={`stage-desc-${stage.id}`}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: isActive ? "rgba(194, 164, 255, 0.04)" : "rgba(255,255,255,0.01)",
                    border: isExpanded 
                      ? "1px solid var(--accentColor)" 
                      : isActive 
                        ? "1px solid rgba(194, 164, 255, 0.15)" 
                        : "1px solid rgba(255,255,255,0.03)",
                    borderRadius: "8px",
                    padding: "12px 14px",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    outline: "none"
                  }}
                  className="timeline-stage-btn"
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: isActive ? "#ffffff" : isCompleted ? "#adacac" : "#666" }}>
                        {stage.title}
                      </span>
                      {isActive && (
                        <span 
                          style={{ 
                            fontSize: "8px", 
                            background: "rgba(194, 164, 255, 0.1)", 
                            color: "var(--accentColor)", 
                            padding: "2px 6px", 
                            borderRadius: "10px", 
                            fontWeight: 700, 
                            textTransform: "uppercase" 
                          }}
                        >
                          Active Phase
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      {stage.completionPercentage !== undefined && (
                        <span style={{ fontSize: "10px", fontWeight: 700, color: isCompleted ? "#5ce6b0" : "var(--accentColor)" }}>
                          {stage.completionPercentage}%
                        </span>
                      )}
                      <span style={{ fontSize: "9px", color: "#666" }}>
                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </div>
                  </div>

                  <p style={{ margin: "0", fontSize: "11px", color: isCompleted || isActive ? "#adacac" : "#666", lineHeight: "1.4" }}>
                    {stage.description}
                  </p>

                  {/* Stage Metadata Chips Row */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
                    {stage.startedAt && (
                      <span style={{ fontSize: "8px", padding: "1px 6px", borderRadius: "4px", background: "rgba(255,255,255,0.03)", color: "var(--accentColor)", fontWeight: 600 }}>
                        📅 {formatDate(stage.startedAt)} {stage.completedAt ? `– ${formatDate(stage.completedAt)}` : "– Present"}
                      </span>
                    )}

                    {stage.deliverables && stage.deliverables.length > 0 && (
                      <span style={{ fontSize: "8px", padding: "1px 6px", borderRadius: "4px", background: "rgba(255,255,255,0.03)", color: "#adacac", fontWeight: 600 }}>
                        📦 {stage.deliverables.length} Deliverable{stage.deliverables.length > 1 ? "s" : ""}
                      </span>
                    )}

                    {stage.priority && (
                      <span 
                        style={{ 
                          fontSize: "8px", 
                          padding: "1px 6px", 
                          borderRadius: "4px", 
                          fontWeight: 700,
                          ...getPriorityStyle(stage.priority)
                        }}
                      >
                        {stage.priority} Priority
                      </span>
                    )}
                    {stage.owner && (
                      <span style={{ fontSize: "8px", padding: "1px 6px", borderRadius: "4px", background: "rgba(255,255,255,0.03)", color: "#adacac", fontWeight: 600 }}>
                        Owner: {stage.owner}
                      </span>
                    )}
                    {stage.estimatedDuration && (
                      <span style={{ fontSize: "8px", padding: "1px 6px", borderRadius: "4px", background: "rgba(255,255,255,0.03)", color: "#adacac", fontWeight: 600 }}>
                        Duration: {stage.estimatedDuration}
                      </span>
                    )}
                  </div>
                </button>

                {/* Expandable Accordion Content */}
                {isExpanded && (
                  <div 
                    id={`stage-desc-${stage.id}`}
                    style={{
                      background: "rgba(255,255,255,0.01)",
                      border: "1px solid rgba(255,255,255,0.02)",
                      borderTop: "none",
                      borderRadius: "0 0 8px 8px",
                      padding: "14px",
                      fontSize: "11px",
                      color: "#adacac",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      animation: "fadeIn 0.2s ease",
                      marginTop: "-2px"
                    }}
                  >
                    {stage.notes && (
                      <div>
                        <strong style={{ color: "#ffffff", display: "block", marginBottom: "4px" }}>Engineering Notes:</strong>
                        <p style={{ margin: "0", lineHeight: "1.4" }}>{stage.notes}</p>
                      </div>
                    )}

                    {stage.deliverables && stage.deliverables.length > 0 && (
                      <div>
                        <strong style={{ color: "#ffffff", display: "block", marginBottom: "4px" }}>Key Deliverables:</strong>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                          {stage.deliverables.map((deliv, dIdx) => (
                            <TagChip key={dIdx} label={deliv} />
                          ))}
                        </div>
                      </div>
                    )}

                    {stage.dependencies && stage.dependencies.length > 0 && (
                      <div>
                        <strong style={{ color: "#ffffff", display: "block", marginBottom: "4px" }}>Dependencies:</strong>
                        <span style={{ fontSize: "10px", color: "#666" }}>{stage.dependencies.join(", ")}</span>
                      </div>
                    )}

                    {stage.lessonsLearned && stage.lessonsLearned.length > 0 && (
                      <div style={{ background: "rgba(194, 164, 255, 0.03)", borderLeft: "2px solid var(--accentColor)", padding: "10px", borderRadius: "0 6px 6px 0", marginTop: "4px" }}>
                        <strong style={{ color: "var(--accentColor)", display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                          💡 Lessons Learned:
                        </strong>
                        <ul style={{ margin: "0", paddingLeft: "15px", lineHeight: "1.4" }}>
                          {stage.lessonsLearned.map((lesson, lIdx) => (
                            <li key={lIdx}>{lesson}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Estimated Completion Metadata Target Card */}
      <GlassCard style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaCalendarAlt style={{ color: "var(--accentColor)", fontSize: "12px" }} />
          <div>
            <span style={{ fontSize: "8px", color: "#666", textTransform: "uppercase", fontWeight: 700 }}>Current Target Phase</span>
            <span style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#ffffff" }}>{timeline.currentPhase}</span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "8px", color: "#666", textTransform: "uppercase", fontWeight: 700 }}>Est Completion</span>
          <span style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#5ce6b0" }}>{timeline.estimatedCompletion}</span>
        </div>
      </GlassCard>
    </div>
  );
});

DevelopmentTimelineCard.displayName = "DevelopmentTimelineCard";
export default DevelopmentTimelineCard;
