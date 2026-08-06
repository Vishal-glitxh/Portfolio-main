export interface PipelineStep {
  id: string;
  name: string;
  status: "success" | "failure" | "running" | "skipped";
  durationSeconds: number;
  logs: string[];
}

export interface PipelineRun {
  runNumber: number;
  commitHash: string;
  commitMessage: string;
  branch: string;
  trigger: string;
  status: "success" | "failure" | "running" | "cancelled";
  startedAt: string;
  durationSeconds: number;
  steps: PipelineStep[];
}

export interface OperationalEnvironment {
  name: string;
  deploymentStage: "Local Development" | "Prototype" | "Planned Deployment" | "Production";
  status: "active" | "updating" | "inactive" | "planned";
  hostingProvider: string;
  deploymentStrategy: string;
  healthStatus: "healthy" | "degraded" | "offline" | "planned";
  version: string;
  lastDeployed: string;
  rollbackAvailability: "available" | "unavailable";
  url?: string;
}

export interface OperationalRollbackStrategy {
  strategyType: string;
  recoveryProcedure: string;
  previousStableVersion: string;
  backupPolicy: string;
  estimatedRecoveryTime: string;
}

export interface DeploymentPipeline {
  projectId: string;
  provider: "GitHub Actions" | "GitLab CI" | "Google Cloud Build" | "ArgoCD" | "Local DevRunner";
  maturityLevel: "Local Development" | "Prototype" | "Planned Deployment" | "Production";
  recentRuns: PipelineRun[];
  staging: OperationalEnvironment;
  production: OperationalEnvironment;
  rollbackStrategy: OperationalRollbackStrategy;
}
