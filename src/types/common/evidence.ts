export interface OverviewDecision {
  decision: string;
  context: string;
  reason: string;
  alternatives: string;
  tradeoffs: string;
  outcome: string;
}

export interface Challenge {
  problem: string;
  rootCause: string;
  solution: string;
  technicalLearning: string;
  futurePrevention: string;
}

export interface Tradeoff {
  factor: string;
  chosen: string;
  alternative: string;
  rationale: string;
}

export interface ProjectMetric {
  label: string;
  value: string | number;
  unit?: string;
  icon?: string;
  highlight?: boolean;
}

export interface DeploymentNode {
  name: string;
  technology: string;
  category: "Client" | "Frontend" | "Backend" | "Database" | "AI Service" | "Cloud" | "External API";
  status: "Active" | "Planned" | "Deprecated";
  description?: string;
  icon?: string;
  color?: string;
}

export interface TimelineEvent {
  phase: "Research" | "Planning" | "Architecture" | "Prototype" | "MVP" | "Current" | "Future";
  date: string;
  description: string;
  status: "Completed" | "In Progress" | "Planned";
}

export interface RoadmapItem {
  title: string;
  priority: "High" | "Medium" | "Low";
  status: "Completed" | "In Progress" | "Planned";
  estimatedVersion: string;
  description: string;
}

export interface InterviewQuestion {
  question: string;
  answer: string;
}

export interface EngineeringEvidence {
  id: string;
  recruiterSummary: string;
  engineeringDecisions: OverviewDecision[];
  challenges: Challenge[];
  tradeoffs: Tradeoff[];
  metrics: ProjectMetric[];
  deployment: DeploymentNode[];
  timeline: TimelineEvent[];
  roadmap: RoadmapItem[];
  interviewQuestions: InterviewQuestion[];
  lessonsLearned: string[];
  keyAchievements: string[];
  references: string[];
}
