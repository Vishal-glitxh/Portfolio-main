export interface DebuggingEntry {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "Resolved" | "Monitoring" | "Known Issue";
  problem: string;
  symptoms: string;
  investigation: string;
  rootCause: string;
  solution: string;
  prevention: string;
  impact: string; // Measurable performance/stability improvement
  timeSpent: string;
  technologies: string[];
  tags: string[];
  date?: string; // Chronological timeline context
  category: "Performance" | "Backend" | "Frontend" | "AI" | "Database" | "Security" | "Infrastructure" | "Accessibility";
  difficulty: "Easy" | "Medium" | "Hard" | "Research";
  relatedDecisionId?: string; // Links back to Engineering Notebook decisions
  resolvedInVersion?: string; // Version the issue was fixed
  relatedMetricId?: string; // Metric ID showing verification impact
  verification?: string; // Verification method (testing, profiling, etc.)
  references?: string[]; // Cross-navigation links
}

export interface DebuggingJournal {
  projectId: "novaisland" | "study-companion" | "idp" | "portfolio";
  title?: string;
  entries: DebuggingEntry[];
}
