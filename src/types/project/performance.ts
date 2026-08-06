export interface PerformanceMetric {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  description: string;
  category: "Performance" | "Scalability" | "Reliability" | "Memory" | "AI" | "Database" | "Frontend" | "Backend";
  highlight?: boolean;
  benchmarkMethod?: string; // e.g. Chrome DevTools, Lighthouse, React Profiler
  targetValue?: string | number; // target performance goals
  references?: string[]; // related decision/bug trace links
}

export interface SecurityItem {
  title: string;
  currentImplementation: string;
  riskLevel: "Low" | "Medium" | "High";
  mitigationStrategy: string;
  references?: string[];
}

export interface SecurityReview {
  authentication: SecurityItem;
  authorization: SecurityItem;
  inputValidation: SecurityItem;
  outputEncoding: SecurityItem;
  encryption: SecurityItem;
  secretManagement: SecurityItem;
  apiSecurity: SecurityItem;
  dependencyManagement: SecurityItem;
  vulnerabilityMitigation: SecurityItem;
  monitoring: SecurityItem;
}

export interface InfrastructureNode {
  id: string;
  title: string;
  type: "Client" | "Frontend" | "Backend" | "Database" | "AI Layer" | "Deployment" | "Monitoring";
  description: string;
  protocol: string; // e.g. HTTPS, WebSocket, local IPC
  responsibilities: string;
  scalingNotes: string;
  failureHandling?: string; // automatic retries, fallbacks, recovery
  connections: string[]; // target node ids
}

export interface InfrastructureReview {
  frontend?: string;
  backend?: string;
  aiLayer?: string;
  database?: string;
  storage?: string;
  deployment?: string;
  monitoring?: string;
  nodes: InfrastructureNode[];
  futureImprovements?: string[];
}

export interface PerformanceSecurityReview {
  projectId: "novaisland" | "study-companion" | "idp" | "portfolio";
  metrics: PerformanceMetric[];
  security: SecurityReview;
  infrastructure: InfrastructureReview;
}
