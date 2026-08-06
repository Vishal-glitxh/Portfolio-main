import React, { useState } from "react";
import { FaFlask, FaListUl } from "react-icons/fa";
import { TestingStrategy, EngineeringEvidence } from "../../types";
import { AccordionItem } from "../common/AccordionItem";
import { TestSuiteCard } from "../cards/TestSuiteCard";
import { MetricSummaryCard } from "../cards/MetricSummaryCard";

interface QualityWorkspaceProps {
  testingStrategy: TestingStrategy | null | undefined;
  evidence: EngineeringEvidence | null | undefined;
  expandedSections: Record<string, boolean>;
  toggleSection: (id: string) => void;
  highlightedSectionId: string | null;
}

export const QualityWorkspace = React.memo(({
  testingStrategy,
  evidence,
  expandedSections,
  toggleSection,
  highlightedSectionId
}: QualityWorkspaceProps) => {
  const [expandedTestSuiteId, setExpandedTestSuiteId] = useState<string | null>(null);

  const avgCoverage = testingStrategy 
    ? Math.round(testingStrategy.testSuites.reduce((acc, curr) => acc + curr.coverage, 0) / testingStrategy.testSuites.length)
    : 0;

  const passedManualChecks = testingStrategy
    ? testingStrategy.manualQA.filter(q => q.status === "Passed").length
    : 0;

  const releasePercent = testingStrategy
    ? Math.round((testingStrategy.releaseChecklist.filter(r => r.completed).length / testingStrategy.releaseChecklist.length) * 100)
    : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* 1. Testing & Quality Assurance */}
      {testingStrategy && (
        <AccordionItem
          id="testing"
          title="Testing & Quality Assurance"
          isOpen={!!expandedSections.testing}
          onToggle={() => toggleSection("testing")}
          icon={<FaFlask className="section-icon text-accent" />}
          className={highlightedSectionId === "testing" ? "highlight-glow" : ""}
        >
          <div className="testing-qa-container" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            {/* Overview & Core Confidence */}
            <div className="testing-overview-row" style={{ display: "flex", flexWrap: "wrap", gap: "15px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "10px", padding: "16px" }}>
              <div style={{ flex: "1 1 300px" }}>
                <h5 style={{ margin: "0 0 8px 0", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--accentColor)" }}>Testing Strategy Overview</h5>
                <p style={{ margin: "0", fontSize: "11px", color: "#adacac", lineHeight: "1.5" }}>{testingStrategy.overview}</p>
              </div>
              <div style={{ flex: "0 0 160px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderLeft: "1px solid rgba(255,255,255,0.05)", paddingLeft: "15px" }}>
                <div className="release-pill completed" style={{ fontSize: "9px", background: "rgba(92, 230, 176, 0.1)", color: "#5ce6b0", padding: "3px 8px", borderRadius: "10px", fontWeight: 700, textTransform: "uppercase", marginBottom: "8px" }}>
                  Release Ready
                </div>
                <div style={{ fontSize: "32px", fontWeight: 800, color: "#ffffff", lineHeight: "1" }}>
                  {avgCoverage}%
                </div>
                <span style={{ fontSize: "9px", color: "#666", marginTop: "4px", textTransform: "uppercase", fontWeight: 700 }}>Avg Coverage</span>
              </div>
            </div>

            {/* Coverage Dashboard Bento Grid */}
            <div>
              <h5 style={{ margin: "0 0 12px 0", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accentColor)" }}>
                Coverage Dashboard
              </h5>
              <div className="coverage-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px" }}>
                {testingStrategy.testSuites.map((suite) => (
                  <div 
                    key={suite.id} 
                    style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "8px", padding: "12px", display: "flex", flexDirection: "column", gap: "4px" }}
                  >
                    <span style={{ fontSize: "8px", fontWeight: 700, textTransform: "uppercase", color: "#666" }}>{suite.category}</span>
                    <span style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff" }}>{suite.coverage}%</span>
                    <span style={{ fontSize: "9px", color: "#adacac" }}>{suite.passedTests}/{suite.totalTests} Passed</span>
                  </div>
                ))}
                <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "8px", padding: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "8px", fontWeight: 700, textTransform: "uppercase", color: "#666" }}>Manual QA</span>
                  <span style={{ fontSize: "16px", fontWeight: 800, color: "#5ce6b0" }}>100%</span>
                  <span style={{ fontSize: "9px", color: "#adacac" }}>{passedManualChecks} Checks Passed</span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "8px", padding: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "8px", fontWeight: 700, textTransform: "uppercase", color: "#666" }}>Accessibility</span>
                  <span style={{ fontSize: "16px", fontWeight: 800, color: "#5ce6b0" }}>100%</span>
                  <span style={{ fontSize: "9px", color: "#adacac" }}>Axe Compliant</span>
                </div>
              </div>
            </div>

            {/* Test Suites Accordion */}
            <div>
              <h5 style={{ margin: "0 0 12px 0", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accentColor)" }}>
                Test Suites Detail Logs
              </h5>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {testingStrategy.testSuites.map((suite) => (
                  <TestSuiteCard
                    key={suite.id}
                    suite={suite}
                    isExpanded={expandedTestSuiteId === suite.id}
                    onToggle={() => setExpandedTestSuiteId(expandedTestSuiteId === suite.id ? null : suite.id)}
                  />
                ))}
              </div>
            </div>

            {/* Browser Compatibility Matrix */}
            <div>
              <h5 style={{ margin: "0 0 12px 0", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accentColor)" }}>
                Browser Compatibility Matrix
              </h5>
              <div style={{ overflowX: "auto" }}>
                <table className="browser-matrix" style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <th style={{ textAlign: "left", padding: "8px", color: "#666" }}>Browser</th>
                      <th style={{ textAlign: "left", padding: "8px", color: "#666" }}>Version</th>
                      <th style={{ textAlign: "center", padding: "8px", color: "#666" }}>Desktop</th>
                      <th style={{ textAlign: "center", padding: "8px", color: "#666" }}>Mobile</th>
                      <th style={{ textAlign: "left", padding: "8px", color: "#666" }}>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testingStrategy.browserMatrix.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                        <td style={{ padding: "8px", fontWeight: 700, color: "#ffffff" }}>{item.browser}</td>
                        <td style={{ padding: "8px", color: "#adacac" }}>{item.version}</td>
                        <td style={{ padding: "8px", textAlign: "center" }}>
                          <span style={{ 
                            fontSize: "8px", 
                            padding: "2px 6px", 
                            borderRadius: "4px", 
                            background: item.desktop === "Supported" ? "rgba(92, 230, 176, 0.1)" : "rgba(255, 209, 92, 0.1)",
                            color: item.desktop === "Supported" ? "#5ce6b0" : "#ffd15c",
                            fontWeight: 700
                          }}>
                            {item.desktop === "Supported" ? "Supported" : "Partial"}
                          </span>
                        </td>
                        <td style={{ padding: "8px", textAlign: "center" }}>
                          <span style={{ 
                            fontSize: "8px", 
                            padding: "2px 6px", 
                            borderRadius: "4px", 
                            background: item.mobile === "Supported" ? "rgba(92, 230, 176, 0.1)" : item.mobile === "Not Applicable" ? "rgba(255,255,255,0.03)" : "rgba(255, 209, 92, 0.1)",
                            color: item.mobile === "Supported" ? "#5ce6b0" : item.mobile === "Not Applicable" ? "#666" : "#ffd15c",
                            fontWeight: 700
                          }}>
                            {item.mobile}
                          </span>
                        </td>
                        <td style={{ padding: "8px", color: "#adacac" }}>{item.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Manual QA Checklist */}
            <div>
              <h5 style={{ margin: "0 0 12px 0", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accentColor)" }}>
                Manual QA Checklist
              </h5>
              <div className="qa-checklist" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                {testingStrategy.manualQA.map((item) => (
                  <div key={item.id} style={{ display: "flex", gap: "10px", alignItems: "flex-start", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "8px", padding: "10px" }}>
                    <span style={{ color: item.status === "Passed" ? "#5ce6b0" : "#ffd15c" }}>✓</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#ffffff" }}>{item.title}</span>
                      <span style={{ fontSize: "10px", color: "#adacac" }}>{item.notes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Matrix Table */}
            <div>
              <h5 style={{ margin: "0 0 12px 0", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accentColor)" }}>
                Relational Risk Matrix
              </h5>
              <div style={{ overflowX: "auto" }}>
                <table className="risk-matrix" style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <th style={{ textAlign: "left", padding: "8px", color: "#666" }}>Risk Area</th>
                      <th style={{ textAlign: "center", padding: "8px", color: "#666" }}>Likelihood</th>
                      <th style={{ textAlign: "center", padding: "8px", color: "#666" }}>Impact</th>
                      <th style={{ textAlign: "left", padding: "8px", color: "#666" }}>Mitigation Strategy</th>
                      <th style={{ textAlign: "left", padding: "8px", color: "#666" }}>Owner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testingStrategy.risks.map((risk) => (
                      <tr key={risk.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                        <td style={{ padding: "8px", fontWeight: 700, color: "#ffffff" }}>{risk.title}</td>
                        <td style={{ padding: "8px", textAlign: "center", color: "#adacac" }}>{risk.likelihood}</td>
                        <td style={{ padding: "8px", textAlign: "center" }}>
                          <span style={{ 
                            fontSize: "8px", 
                            padding: "2px 6px", 
                            borderRadius: "4px", 
                            background: risk.impact === "Critical" ? "rgba(255, 92, 92, 0.15)" : risk.impact === "High" ? "rgba(255, 209, 92, 0.1)" : "rgba(92, 176, 230, 0.1)",
                            color: risk.impact === "Critical" ? "#ff5c5c" : risk.impact === "High" ? "#ffd15c" : "#5cb0e6",
                            fontWeight: 700
                          }}>
                            {risk.impact}
                          </span>
                        </td>
                        <td style={{ padding: "8px", color: "#adacac" }}>{risk.mitigation}</td>
                        <td style={{ padding: "8px", color: "#666" }}>{risk.owner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Release Readiness Checklist */}
            <div>
              <h5 style={{ margin: "0 0 12px 0", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--accentColor)" }}>
                Release Readiness Checklist
              </h5>
              <div className="release-readiness-row" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                <div style={{ flex: "1 1 250px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "8px" }}>
                  {testingStrategy.releaseChecklist.map((item) => (
                    <div key={item.id} style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "11px" }}>
                      <span style={{ color: item.completed ? "#5ce6b0" : "#666" }}>{item.completed ? "✓" : "○"}</span>
                      <span style={{ color: item.completed ? "#ffffff" : "#666" }}>{item.title}</span>
                    </div>
                  ))}
                </div>
                <div style={{ flex: "0 0 180px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderLeft: "1px solid rgba(255,255,255,0.05)", paddingLeft: "15px" }}>
                  <span style={{ fontSize: "10px", color: "#adacac", marginBottom: "5px" }}>Release Probability</span>
                  <span style={{ fontSize: "36px", fontWeight: 800, color: "#5ce6b0" }}>
                    {releasePercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AccordionItem>
      )}

      {/* 2. Collapsible Section: Project Metrics */}
      {evidence && evidence.metrics.length > 0 && (
        <AccordionItem
          id="metrics"
          title="Project Metrics"
          isOpen={!!expandedSections.metrics}
          onToggle={() => toggleSection("metrics")}
          icon={<FaListUl className="section-icon text-accent" />}
        >
          <div className="metrics-grid">
            {evidence.metrics.map((item, idx) => (
              <MetricSummaryCard
                key={idx}
                label={item.label}
                value={item.value}
                unit={item.unit}
                highlight={item.highlight}
              />
            ))}
          </div>
        </AccordionItem>
      )}
    </div>
  );
});

QualityWorkspace.displayName = "QualityWorkspace";
export default QualityWorkspace;
