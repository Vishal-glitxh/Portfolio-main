import { DeploymentPipeline } from "../types";

export const pipelineData: Record<string, DeploymentPipeline> = {
  novaisland: {
    projectId: "novaisland",
    provider: "GitHub Actions",
    maturityLevel: "Production",
    recentRuns: [
      {
        runNumber: 84,
        commitHash: "a8b417e",
        commitMessage: "feat: integrate Multi-provider AI adapters & settings controller",
        branch: "main",
        trigger: "push",
        status: "success",
        startedAt: "2026-08-01T14:32:00Z",
        durationSeconds: 185,
        steps: [
          { id: "commit", name: "Developer Commit", status: "success", durationSeconds: 0, logs: ["Commit: a8b417e", "Author: vishalsuhas", "Branch: main"] },
          { id: "source", name: "Source Control", status: "success", durationSeconds: 3, logs: ["Fetch refs/heads/main", "Local HEAD: a8b417e"] },
          { id: "build", name: "Swift Build", status: "success", durationSeconds: 45, logs: ["xcodebuild -scheme NovaIsland -configuration Release", "Swift compilation success.", "Link binary output targets."] },
          { id: "lint", name: "SwiftLint check", status: "success", durationSeconds: 12, logs: ["swiftlint", "Lint checked successfully. 0 warnings. 0 errors."] },
          { id: "tests", name: "Unit Tests", status: "success", durationSeconds: 35, logs: ["swift test", "85 tests passed.", "100% test targets resolved."] },
          { id: "archive", name: "Create Archive", status: "success", durationSeconds: 25, logs: ["xcodebuild -archivePath NovaIsland.xcarchive", "Archive created successfully."] },
          { id: "signing", name: "Code Signing", status: "success", durationSeconds: 15, logs: ["codesign --sign 'Developer ID Application: Vishal Suhas'", "Binary signed successfully."] },
          { id: "notarize", name: "Notarization check", status: "success", durationSeconds: 40, logs: ["xcrun altool --notarize-app", "Notarization approved. Ticket stapled."] },
          { id: "beta", name: "Beta Release", status: "success", durationSeconds: 10, logs: ["Sparkle appcast deployment success.", "Beta feed XML updated."] }
        ]
      }
    ],
    staging: {
      name: "Staging Release Feed (Sparkle)",
      deploymentStage: "Planned Deployment",
      status: "active",
      hostingProvider: "macOS App Store (Beta Channel)",
      deploymentStrategy: "Sparkle Beta Feed",
      healthStatus: "healthy",
      version: "v1.0.0-beta2",
      lastDeployed: "2026-08-01T12:00:00Z",
      rollbackAvailability: "available",
      url: "https://novaisland.com/beta/feed.xml"
    },
    production: {
      name: "Production Store Release",
      deploymentStage: "Production",
      status: "active",
      hostingProvider: "macOS App Store / Direct Download",
      deploymentStrategy: "Phased Release (10% increments)",
      healthStatus: "healthy",
      version: "v1.0.0",
      lastDeployed: "2026-08-05T14:32:00Z",
      rollbackAvailability: "available",
      url: "https://novaisland.com/appstore"
    },
    rollbackStrategy: {
      strategyType: "Sparkle Revert Feed Rollback",
      recoveryProcedure: "The updates channel client checks appcast feeds. If a released build crashes, the XML updates feed redirects local client prompts back to the previous stable binary release version.",
      previousStableVersion: "v1.0.0-beta1",
      backupPolicy: "Automatic sandboxed Application Container backup files stored in local user preferences space.",
      estimatedRecoveryTime: "Instant app restart on local down-grade verification"
    }
  },
  "study-companion": {
    projectId: "study-companion",
    provider: "Google Cloud Build",
    maturityLevel: "Production",
    recentRuns: [
      {
        runNumber: 94,
        commitHash: "a4b8c9d",
        commitMessage: "fix: resolve token refresh expiry leak in OAuth interceptor",
        branch: "main",
        trigger: "push",
        status: "success",
        startedAt: "2026-08-03T09:15:00Z",
        durationSeconds: 215,
        steps: [
          { id: "commit", name: "Developer Commit", status: "success", durationSeconds: 0, logs: ["Commit: a4b8c9d12093847aaef12b", "Author: vishalsuhas", "Branch: main"] },
          { id: "source", name: "Source Control", status: "success", durationSeconds: 3, logs: ["git clone --depth=1 repo", "Fetching main branch..."] },
          { id: "deps", name: "Dependency Installation", status: "success", durationSeconds: 35, logs: ["npm install --legacy-peer-deps", "Added 432 packages in 32s"] },
          { id: "lint", name: "Lint", status: "success", durationSeconds: 12, logs: ["npm run lint", "All source files linted cleanly."] },
          { id: "types", name: "Type Check", status: "success", durationSeconds: 20, logs: ["npm run typecheck", "Types resolved with 0 compiler errors."] },
          { id: "tests", name: "Unit Tests", status: "success", durationSeconds: 45, logs: ["jest --passWithNoTests", "84 test cases completed.", "All unit assertions passed."] },
          { id: "build", name: "Build", status: "success", durationSeconds: 65, logs: ["gcloud builds submit --tag gcr.io/study-companion/api:v1.0.4", "Docker layers cached.", "Image pushed to Google Container Registry."] },
          { id: "artifact", name: "Artifact", status: "success", durationSeconds: 15, logs: ["Successfully registered gcr.io/study-companion/api:v1.0.4", "Vulnerability scan: 0 critical, 2 low."] },
          { id: "deploy", name: "Deployment", status: "success", durationSeconds: 12, logs: ["gcloud run deploy companion-api --image gcr.io/study-companion/api:v1.0.4 --region us-central1", "Service deployed to Cloud Run.", "Staging URL activated for routing validation."] },
          { id: "verify", name: "Health Verification", status: "success", durationSeconds: 8, logs: ["Smoke testing Cloud Run endpoint...", "Status 200 returned.", "Health checks reporting 100% active endpoints."] }
        ]
      }
    ],
    staging: {
      name: "Staging Service (Cloud Run)",
      deploymentStage: "Production",
      status: "active",
      hostingProvider: "Google Cloud Run",
      deploymentStrategy: "Direct Traffic Switch",
      healthStatus: "healthy",
      version: "v1.0.4-rc2",
      lastDeployed: "2026-08-03T08:50:00Z",
      rollbackAvailability: "available",
      url: "https://staging-api-companion.a.run.app"
    },
    production: {
      name: "Production Service (Cloud Run)",
      deploymentStage: "Production",
      status: "active",
      hostingProvider: "Google Cloud Run",
      deploymentStrategy: "Blue-Green (Immediate revision shift)",
      healthStatus: "healthy",
      version: "v1.0.4",
      lastDeployed: "2026-08-03T09:20:00Z",
      rollbackAvailability: "available",
      url: "https://api.study-companion.com"
    },
    rollbackStrategy: {
      strategyType: "VPC Cloud Run Revision Revert",
      recoveryProcedure: "Manual or automated gcloud run command redirecting traffic percentage back to previous revisions: `gcloud run services update-traffic --to-revisions=v1-0-3=100`.",
      previousStableVersion: "v1.0.3",
      backupPolicy: "Firestore scheduled exports every 12 hours to multi-region GCS bucket.",
      estimatedRecoveryTime: "Less than 10 seconds"
    }
  },
  idp: {
    projectId: "idp",
    provider: "GitLab CI",
    maturityLevel: "Planned Deployment",
    recentRuns: [
      {
        runNumber: 42,
        commitHash: "e3d2c1b",
        commitMessage: "chore: compile production terraform module definitions",
        branch: "staging",
        trigger: "push",
        status: "success",
        startedAt: "2026-08-05T10:00:00Z",
        durationSeconds: 310,
        steps: [
          { id: "commit", name: "Developer Commit", status: "success", durationSeconds: 0, logs: ["Commit: e3d2c1b423f01928", "Author: vishalsuhas", "Branch: staging"] },
          { id: "source", name: "Source Control", status: "success", durationSeconds: 5, logs: ["Cloning repository in GitLab Runner...", "Checking out branch staging..."] },
          { id: "deps", name: "Dependency Installation", status: "success", durationSeconds: 40, logs: ["terraform init", "Downloading provider plugins...", "Terraform has been successfully initialized!"] },
          { id: "lint", name: "Lint", status: "success", durationSeconds: 15, logs: ["terraform fmt -check", "Linting verified: all terraform manifests aligned."] },
          { id: "types", name: "Type Check", status: "success", durationSeconds: 18, logs: ["terraform validate", "Terraform configuration is valid!"] },
          { id: "tests", name: "Unit Tests", status: "success", durationSeconds: 65, logs: ["tflint", "0 issues found.", "tfsec", "No critical security risks identified."] },
          { id: "build", name: "Build", status: "success", durationSeconds: 85, logs: ["terraform plan -out=tfplan", "Plan: 8 resources to add, 0 to change, 0 to destroy."] },
          { id: "artifact", name: "Artifact", status: "success", durationSeconds: 30, logs: ["Uploading tfplan to secure state bucket...", "Artifact stored in gs://idp-terraform-state/tfplan-staging"] },
          { id: "deploy", name: "Deployment", status: "success", durationSeconds: 42, logs: ["terraform apply tfplan-staging", "Apply complete! Resources: 8 added, 0 changed, 0 destroyed."] },
          { id: "verify", name: "Health Verification", status: "success", durationSeconds: 10, logs: ["Performing terraform outputs health verification...", "Outputs verified successfully."] }
        ]
      }
    ],
    staging: {
      name: "Staging Infrastructure Sandbox",
      deploymentStage: "Planned Deployment",
      status: "active",
      hostingProvider: "Google Cloud Platform (GCP)",
      deploymentStrategy: "Terraform Apply",
      healthStatus: "healthy",
      version: "v0.9.1-tf",
      lastDeployed: "2026-08-05T10:10:00Z",
      rollbackAvailability: "available",
      url: "https://staging-idp.gcp.internal"
    },
    production: {
      name: "Production Enterprise Infrastructure",
      deploymentStage: "Planned Deployment",
      status: "planned",
      hostingProvider: "Google Cloud Platform (GCP)",
      deploymentStrategy: "Canary Rollout (Targeted VPC Groups)",
      healthStatus: "planned",
      version: "v1.0.0-planned",
      lastDeployed: "Never",
      rollbackAvailability: "unavailable"
    },
    rollbackStrategy: {
      strategyType: "Infrastructure State Rollback",
      recoveryProcedure: "Restore the previous Terraform tfstate file from version-controlled storage bucket, and apply plan to recreate components.",
      previousStableVersion: "v0.9.0-tf",
      backupPolicy: "Terraform State lock via Cloud Storage, GCS bucket versioning enabled with lifecycle policies.",
      estimatedRecoveryTime: "Less than 5 minutes"
    }
  },
  portfolio: {
    projectId: "portfolio",
    provider: "GitHub Actions",
    maturityLevel: "Planned Deployment",
    recentRuns: [],
    staging: {
      name: "Staging Preview (Vercel)",
      deploymentStage: "Planned Deployment",
      status: "planned",
      hostingProvider: "Vercel",
      deploymentStrategy: "Pull Request Previews",
      healthStatus: "planned",
      version: "Not deployed",
      lastDeployed: "Not verified",
      rollbackAvailability: "unavailable",
    },
    production: {
      name: "Production Release (Vercel)",
      deploymentStage: "Production",
      status: "active",
      hostingProvider: "Vercel",
      deploymentStrategy: "Direct Rollout (Instant caching updates)",
      healthStatus: "planned",
      version: "Not verified",
      lastDeployed: "Not verified",
      rollbackAvailability: "unavailable",
      url: "https://vishalsuhas-dev.vercel.app"
    },
    rollbackStrategy: {
      strategyType: "Vercel Version Rollback",
      recoveryProcedure: "Select a verified previous deployment in the Vercel dashboard after confirming project access.",
      previousStableVersion: "Not verified",
      backupPolicy: "Configure release retention in the hosting project.",
      estimatedRecoveryTime: "Not verified"
    }
  }
};

export const getPipelineData = (projectId: string): DeploymentPipeline | null => {
  return pipelineData[projectId] || null;
};
