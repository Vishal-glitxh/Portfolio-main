export interface TimelineStage {
  id: string;
  title: string;
  description: string;
  status: "completed" | "active" | "planned";
  progress?: number;
  startedAt?: string;
  completedAt?: string;
  notes?: string;
  deliverables?: string[];
  dependencies?: string[];
  lessonsLearned?: string[];
  priority?: "High" | "Medium" | "Low";
  owner?: string;
  estimatedDuration?: string;
  completionPercentage?: number;
}

export interface ProjectTimeline {
  projectId: string;
  overallProgress: number;
  estimatedCompletion: string;
  currentPhase: string;
  stages: TimelineStage[];
}
