import React, { useState } from "react";
import { FaShieldAlt, FaRoute, FaFlask } from "react-icons/fa";
import { 
  PerformanceSecurityReview, 
  DeploymentPipeline, 
  ObservabilityDashboard 
} from "../../types";
import { AccordionItem } from "../common/AccordionItem";
import { TerminalConsole } from "../common/TerminalConsole";
import { SecurityCard } from "../cards/SecurityCard";
import { PipelineCard } from "../cards/PipelineCard";
import { IncidentCard } from "../cards/IncidentCard";
import { PipelineVisualizer } from "../visualizers/PipelineVisualizer";
import { TraceVisualizer } from "../visualizers/TraceVisualizer";
import { InfrastructureVisualizer } from "../visualizers/InfrastructureVisualizer";

interface OperationsWorkspaceProps {
  perfReview: PerformanceSecurityReview | null | undefined;
  pipeline: DeploymentPipeline | null | undefined;
  observability: ObservabilityDashboard | null | undefined;
  expandedSections: Record<string, boolean>;
  toggleSection: (id: string) => void;
  highlightedSectionId: string | null;
}

export const OperationsWorkspace = React.memo(({
  perfReview,
  pipeline,
  observability,
  expandedSections,
  toggleSection,
  highlightedSectionId
}: OperationsWorkspaceProps) => {
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [selectedLogLevel, setSelectedLogLevel] = useState<"ALL" | "INFO" | "WARN" | "ERROR">("ALL");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* 1. Performance & Security Review */}
      {perfReview && (
        <AccordionItem
          id="performance"
          title="Performance & Security Review"
          isOpen={!!expandedSections.performance}
          onToggle={() => toggleSection("performance")}
          icon={<FaShieldAlt className="section-icon text-accent" />}
          className={highlightedSectionId === "performance" ? "highlight-glow" : ""}
        >
          <div className="performance-security-container" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            {/* Performance Overview */}
            <div className="perf-sub-section">
              <h5 style={{ margin: "0 0 12px 0", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accentColor)" }}>
                Performance Overview
              </h5>
              <div className="performance-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
                {perfReview.metrics.map((metric) => (
                  <div 
                    key={metric.id} 
                    className={`metric-card ${metric.highlight ? "highlighted" : ""}`}
                    role="article"
                    style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "10px", padding: "14px", display: "flex", flexDirection: "column", gap: "6px", boxSizing: "border-box" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="metric-label" style={{ fontSize: "8px", fontWeight: 700, textTransform: "uppercase", color: "#666", letterSpacing: "0.5px" }}>{metric.category}</span>
                      {metric.benchmarkMethod && (
                        <span style={{ fontSize: "8px", color: "#555", background: "rgba(255,255,255,0.02)", padding: "1px 4px", borderRadius: "3px" }}>
                          {metric.benchmarkMethod}
                        </span>
                      )}
                    </div>
                    <h6 className="metric-title" style={{ fontSize: "11px", fontWeight: 700, margin: "0", color: "#ffffff" }}>{metric.title}</h6>
                    <div className="metric-value-row" style={{ display: "flex", alignItems: "baseline" }}>
                      <span className="metric-val" style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff" }}>{metric.value}</span>
                      {metric.unit && <span className="metric-unit" style={{ fontSize: "10px", color: "var(--accentColor)", marginLeft: "4px" }}>{metric.unit}</span>}
                      {metric.targetValue && (
                        <span style={{ fontSize: "9px", color: "#555", marginLeft: "10px" }}>
                          Target: {metric.targetValue}{metric.unit}
                        </span>
                      )}
                    </div>
                    <p className="metric-description" style={{ fontSize: "11px", color: "#adacac", margin: "0", lineHeight: "1.4" }}>{metric.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Review */}
            <div className="perf-sub-section">
              <h5 style={{ margin: "0 0 12px 0", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accentColor)" }}>
                Security Review
              </h5>
              <div className="security-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
                {Object.entries(perfReview.security).map(([key, item]) => (
                  <SecurityCard key={key} item={item} />
                ))}
              </div>
            </div>

            {/* Infrastructure Overview */}
            <div className="perf-sub-section">
              <h5 style={{ margin: "0 0 12px 0", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accentColor)" }}>
                Infrastructure Overview
              </h5>
              <InfrastructureVisualizer nodes={perfReview.infrastructure.nodes} />
            </div>
          </div>
        </AccordionItem>
      )}

      {/* 2. CI/CD & Deployment Pipeline */}
      {pipeline && (
        <AccordionItem
          id="pipeline"
          title="CI/CD & Deployment Pipeline"
          isOpen={!!expandedSections.pipeline}
          onToggle={() => toggleSection("pipeline")}
          icon={<FaRoute className="section-icon text-accent" />}
          className={highlightedSectionId === "pipeline" ? "highlight-glow" : ""}
        >
          <div className="pipeline-container" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            {/* Pipeline Run Overview */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "15px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "8px", padding: "15px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>
                    Run #{pipeline.recentRuns[0].runNumber}
                  </span>
                  <span className={`status-badge-pulse ${pipeline.recentRuns[0].status === "success" ? "success" : "failed"}`} style={{ width: "8px", height: "8px" }} />
                  <span style={{ fontSize: "9px", textTransform: "uppercase", fontWeight: 700, color: pipeline.recentRuns[0].status === "success" ? "#5ce6b0" : "#ff5c5c" }}>
                    {pipeline.recentRuns[0].status}
                  </span>
                </div>
                <p style={{ fontSize: "11px", color: "#adacac", margin: 0 }}>
                  {pipeline.recentRuns[0].commitMessage} (<code>{pipeline.recentRuns[0].commitHash}</code>)
                </p>
              </div>
              <div style={{ display: "flex", gap: "15px", fontSize: "10px", color: "#666" }}>
                <div>
                  <span style={{ display: "block", textTransform: "uppercase", fontWeight: 700, fontSize: "8px" }}>Provider</span>
                  <span style={{ color: "#ffffff", fontWeight: 600 }}>{pipeline.provider}</span>
                </div>
                <div>
                  <span style={{ display: "block", textTransform: "uppercase", fontWeight: 700, fontSize: "8px" }}>Duration</span>
                  <span style={{ color: "#ffffff", fontWeight: 600 }}>{pipeline.recentRuns[0].durationSeconds}s</span>
                </div>
                <div>
                  <span style={{ display: "block", textTransform: "uppercase", fontWeight: 700, fontSize: "8px" }}>Branch</span>
                  <span style={{ color: "#ffffff", fontWeight: 600 }}>{pipeline.recentRuns[0].branch}</span>
                </div>
              </div>
            </div>

            {/* Pipeline Stage Tracker */}
            <PipelineVisualizer pipeline={pipeline} />

            {/* Environment Maturity Levels */}
            <div>
              <h5 style={{ margin: "0 0 12px 0", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accentColor)" }}>
                Environment Maturity & Controls
              </h5>
              <div className="environments-grid" style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                <PipelineCard env={pipeline.staging} />
                <PipelineCard env={pipeline.production} />
              </div>
            </div>

            {/* Operational Rollback Strategy */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "8px", padding: "15px" }}>
              <h5 style={{ margin: "0 0 12px 0", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accentColor)" }}>
                Operational Rollback & Recovery Strategy
              </h5>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "11px", color: "#adacac" }}>
                <div>
                  <strong>Strategy Type:</strong> <span>{pipeline.rollbackStrategy.strategyType}</span>
                </div>
                <div>
                  <strong>Recovery Procedure:</strong> <p style={{ margin: "4px 0 0 0", color: "#888", lineHeight: "1.4" }}>{pipeline.rollbackStrategy.recoveryProcedure}</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "5px" }}>
                  <div>
                    <span style={{ display: "block", color: "#666", fontSize: "8px", textTransform: "uppercase", fontWeight: 700 }}>Previous Stable Version</span>
                    <span style={{ color: "#ffffff", fontWeight: 600 }}>{pipeline.rollbackStrategy.previousStableVersion}</span>
                  </div>
                  <div>
                    <span style={{ display: "block", color: "#666", fontSize: "8px", textTransform: "uppercase", fontWeight: 700 }}>Backup Policy</span>
                    <span style={{ color: "#ffffff", fontWeight: 600 }}>{pipeline.rollbackStrategy.backupPolicy}</span>
                  </div>
                  <div>
                    <span style={{ display: "block", color: "#666", fontSize: "8px", textTransform: "uppercase", fontWeight: 700 }}>Est. Recovery Time</span>
                    <span style={{ color: "#5ce6b0", fontWeight: 600 }}>{pipeline.rollbackStrategy.estimatedRecoveryTime}</span>
                  </div>
                  <div>
                    <span style={{ display: "block", color: "#666", fontSize: "8px", textTransform: "uppercase", fontWeight: 700 }}>Rollback System</span>
                    <span style={{ color: pipeline.production.rollbackAvailability === "available" ? "#5ce6b0" : "#ff5c5c", fontWeight: 600 }}>
                      {pipeline.production.rollbackAvailability === "available" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionItem>
      )}

      {/* 3. Production Observability Design */}
      {observability && (
        <AccordionItem
          id="observability"
          title="Production Observability Design"
          isOpen={!!expandedSections.observability}
          onToggle={() => toggleSection("observability")}
          icon={<FaFlask className="section-icon text-accent" />}
          className={highlightedSectionId === "observability" ? "highlight-glow" : ""}
        >
          <div className="observability-container" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            {/* SLOs & Error Budgets */}
            <div>
              <h5 style={{ margin: "0 0 12px 0", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accentColor)" }}>
                Service Level Objectives (SLOs)
              </h5>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                {observability.indicators.map((indicator, idx) => (
                  <div 
                    key={idx}
                    style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "8px", padding: "12px", display: "flex", flexDirection: "column", gap: "6px" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "11px", fontWeight: 800, color: "#ffffff" }}>{indicator.name}</span>
                      <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--accentColor)" }}>
                        {indicator.value}{indicator.unit}
                      </span>
                    </div>
                    <div style={{ fontSize: "9px", color: "#adacac" }}>
                      <strong>Target:</strong> <span>{indicator.target}</span>
                    </div>
                    <div style={{ fontSize: "9px", color: "#888", borderTop: "1px solid rgba(255,255,255,0.03)", paddingTop: "4px", marginTop: "2px", lineHeight: "1.4" }}>
                      <strong>Strategy:</strong> <span>{indicator.measurementStrategy}</span>
                    </div>
                    <div style={{ fontSize: "9px", color: "#888", lineHeight: "1.4" }}>
                      <strong>Design Goal:</strong> <span>{indicator.designGoal}</span>
                    </div>
                    <div style={{ fontSize: "9px", color: "#adacac", lineHeight: "1.4" }}>
                      <strong>Impact:</strong> <span>{indicator.businessImpact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Profiles Grid */}
            <div>
              <h5 style={{ margin: "0 0 12px 0", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accentColor)" }}>
                Operational Resource Profiles
              </h5>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                {observability.expectedProfiles.map((profile, idx) => (
                  <div 
                    key={idx}
                    style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "8px", padding: "10px", display: "flex", flexDirection: "column", gap: "4px" }}
                  >
                    <span style={{ fontSize: "8px", fontWeight: 700, textTransform: "uppercase", color: "#666" }}>{profile.name}</span>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>{profile.targetValue}</span>
                      <span style={{ fontSize: "9px", color: "#666" }}>Peak: {profile.currentPeak}</span>
                    </div>
                    <span style={{ fontSize: "9px", color: "#adacac", lineHeight: "1.3", marginTop: "2px" }}>{profile.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Distributed Trace Visualizer */}
            <TraceVisualizer traceSpans={observability.traceSpans} />

            {/* Illustrative Logs Terminal */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <h5 style={{ margin: 0, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accentColor)" }}>
                  Illustrative Log Stream
                </h5>
                
                {/* Filters */}
                <div style={{ display: "flex", gap: "4px" }}>
                  {(["ALL", "ERROR", "WARN", "INFO"] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLogLevel(level)}
                      style={{
                        background: selectedLogLevel === level ? "rgba(194,164,255,0.1)" : "none",
                        border: selectedLogLevel === level ? "1px solid var(--accentColor)" : "1px solid transparent",
                        borderRadius: "4px",
                        color: selectedLogLevel === level ? "#ffffff" : "#666",
                        fontSize: "8px",
                        fontWeight: 700,
                        padding: "2px 6px",
                        cursor: "pointer",
                        outline: "none",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Log output log list */}
              <TerminalConsole>
                {observability.logs
                  .filter(log => selectedLogLevel === "ALL" || log.severity === selectedLogLevel)
                  .map((log, idx) => {
                    const colorMap = {
                      INFO: "#5ce6b0",
                      WARN: "#ffb86c",
                      ERROR: "#ff5c5c"
                    };
                    return (
                      <div key={idx} style={{ display: "flex", gap: "8px", borderBottom: "1px solid rgba(255,255,255,0.02)", paddingBottom: "4px" }}>
                        <span style={{ color: "#666" }}>[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                        <span style={{ color: colorMap[log.severity], fontWeight: 700 }}>{log.severity}</span>
                        <span style={{ color: "#999" }}>[{log.service}]</span>
                        <span style={{ color: "#666" }}>({log.correlationId})</span>
                        <span style={{ color: "#ffffff" }}>{log.message}</span>
                      </div>
                    );
                  })}
              </TerminalConsole>
            </div>

            {/* Incidents Post-Mortems Timeline */}
            <div>
              <h5 style={{ margin: "0 0 12px 0", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accentColor)" }}>
                Incident Response & Post-Mortem Reviews
              </h5>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {observability.incidents.map((incident) => (
                  <IncidentCard
                    key={incident.id}
                    incident={incident}
                    isExpanded={selectedIncidentId === incident.id}
                    onToggle={() => setSelectedIncidentId(selectedIncidentId === incident.id ? null : incident.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </AccordionItem>
      )}
    </div>
  );
});

OperationsWorkspace.displayName = "OperationsWorkspace";
export default OperationsWorkspace;
