import React from "react";
import { GlassCard } from "../common/GlassCard";
import { TagChip } from "../common/TagChip";
import { StatusBadge } from "../common/StatusBadge";
import { TestSuite } from "../../types";

interface TestSuiteCardProps {
  suite: TestSuite;
  isExpanded: boolean;
  onToggle: () => void;
}

export const TestSuiteCard = React.memo(({ suite, isExpanded, onToggle }: TestSuiteCardProps) => {
  const passRate = Math.round((suite.passedTests / suite.totalTests) * 100);

  return (
    <GlassCard style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#ffffff" }}>{suite.title}</span>
          <StatusBadge status={suite.category} type="info" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, color: "#5ce6b0" }}>{passRate}% Pass</span>
          <button
            onClick={onToggle}
            style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "10px", outline: "none" }}
          >
            {isExpanded ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ height: "4px", background: "rgba(255,255,255,0.03)", borderRadius: "2px", position: "relative", overflow: "hidden" }}>
        <div style={{ width: `${passRate}%`, height: "100%", background: "#5ce6b0", borderRadius: "2px" }} />
      </div>

      {isExpanded && (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "10px", color: "#adacac", borderTop: "1px solid rgba(255,255,255,0.03)", paddingTop: "8px", marginTop: "2px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Total tests: {suite.totalTests}</span>
            <span>Passed: {suite.passedTests} | Failed: {suite.failedTests}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Coverage: <strong style={{ color: "#ffffff" }}>{suite.coverage}%</strong></span>
            <span>Verify cmd: <code style={{ fontFamily: "var(--font-mono)", color: "var(--accentColor)" }}>{suite.verificationCommand}</code></span>
          </div>
          <div style={{ marginTop: "4px" }}><strong>Notes:</strong> {suite.notes}</div>
          {suite.technologies && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "6px" }}>
              {suite.technologies.map(tech => <TagChip key={tech} label={tech} />)}
            </div>
          )}
        </div>
      )}
    </GlassCard>
  );
});

TestSuiteCard.displayName = "TestSuiteCard";
