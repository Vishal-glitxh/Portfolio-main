export interface ObservabilityIndicator {
  name: string;
  target: string;
  measurementStrategy: string;
  designGoal: string;
  businessImpact: string;
  value: string;
  unit: string;
}

export interface ExpectedProfile {
  name: string;
  targetValue: string;
  currentPeak: string;
  unit: string;
  description: string;
}

export interface DistributedTraceSpan {
  id: string;
  service: string;
  operation: string;
  responsibility: string;
  durationMs: number;
  startOffsetMs: number;
  failurePoints: string[];
  retryStrategy: string;
  status: "success" | "error";
}

export interface IllustrativeLog {
  timestamp: string;
  severity: "INFO" | "WARN" | "ERROR";
  service: string;
  correlationId: string;
  message: string;
}

export interface ObservabilityIncident {
  id: string;
  title: string;
  severity: "Sev-1" | "Sev-2" | "Sev-3";
  timestamp: string;
  problem: string;
  symptoms: string;
  rootCause: string;
  resolution: string;
  verification: string;
  lessonsLearned: string;
}

export interface ObservabilityDashboard {
  projectId: string;
  indicators: ObservabilityIndicator[];
  expectedProfiles: ExpectedProfile[];
  traceSpans: DistributedTraceSpan[];
  logs: IllustrativeLog[];
  incidents: ObservabilityIncident[];
}
