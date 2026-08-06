import { ObservabilityDashboard } from "../types";

export const observabilityData: Record<string, ObservabilityDashboard> = {
  novaisland: {
    projectId: "novaisland",
    indicators: [
      {
        name: "Notch Alignment Latency",
        target: "< 2ms",
        measurementStrategy: "Core Animation sync loops telemetry metrics calculation.",
        designGoal: "< 1ms",
        businessImpact: "Guarantees the Dynamic Island expands or slides without layout stutters.",
        value: "0.4",
        unit: "ms"
      },
      {
        name: "Idle CPU Utilization",
        target: "< 0.1%",
        measurementStrategy: "System process CPU monitor tracking threads usage.",
        designGoal: "0.05% CPU",
        businessImpact: "Prevents background battery drain on MacBook devices.",
        value: "0.04",
        unit: "%"
      },
      {
        name: "Memory Footprint",
        target: "< 15 MB",
        measurementStrategy: "Xcode Heap Analyzer and task_info sandboxed memory counters.",
        designGoal: "12 MB",
        businessImpact: "Maintains low memory footprint for background applications.",
        value: "12.4",
        unit: "MB"
      }
    ],
    expectedProfiles: [
      { name: "CPU Utilization", targetValue: "Avg 0.05%", currentPeak: "0.1%", unit: "%", description: "Target resource bounds for the native Swift background process." },
      { name: "Memory Footprint", targetValue: "Avg 12 MB", currentPeak: "15 MB", unit: "MB", description: "Native Heap memory consumption profile during active widget morphs." },
      { name: "Widget Refresh Latency", targetValue: "Avg 0.8ms", currentPeak: "1.2ms", unit: "ms", description: "Swift SwiftUI redraw duration during widget updates." }
    ],
    traceSpans: [
      { id: "sp-1", service: "Window Engine", operation: "Window Hover Detection", responsibility: "Detects pointer entering notch coordinates and expands panel frame bounds.", durationMs: 2, startOffsetMs: 0, failurePoints: ["Notch coordinates misalignment"], retryStrategy: "Recalculate screen dimensions bounds", status: "success" },
      { id: "sp-2", service: "Interaction Engine", operation: "Event Tap Capture", responsibility: "Intercepts mouse gestures and delegates focus coordinates to active widget controllers.", durationMs: 1, startOffsetMs: 2, failurePoints: ["Permissions tap revoked"], retryStrategy: "Request TCC credentials check", status: "success" },
      { id: "sp-3", service: "Widget Engine", operation: "Widget Lifecycle Start", responsibility: "Loads SwiftUI widget layouts and binds state observers.", durationMs: 5, startOffsetMs: 3, failurePoints: ["Plugin validation failed"], retryStrategy: "Collapse views and display placeholders", status: "success" },
      { id: "sp-4", service: "System Integration Layer", operation: "Pasteboard Scan", responsibility: "Monitors clipboard copy changes and filters key signatures.", durationMs: 3, startOffsetMs: 8, failurePoints: ["Clipboard read lock"], retryStrategy: "Skip frame check and queue next tick", status: "success" },
      { id: "sp-5", service: "AI Platform", operation: "Prompt Template Render", responsibility: "Appends system prompt context rules to current widget input strings.", durationMs: 2, startOffsetMs: 11, failurePoints: ["Context bloat exceeds token limits"], retryStrategy: "Truncate oldest history lines", status: "success" },
      { id: "sp-6", service: "AI Platform", operation: "Ollama Stream Init", responsibility: "Establishes local port socket connection to fetch model completion stream.", durationMs: 15, startOffsetMs: 13, failurePoints: ["Ollama port connection timeout"], retryStrategy: "Retry socket call or fallback to cloud adapters", status: "success" }
    ],
    logs: [
      { timestamp: "2026-08-06T03:30:12Z", severity: "INFO", service: "WindowEngine", correlationId: "ws-panel-01", message: "Notch frame calculated: (x: 540, y: 0, w: 200, h: 32)" },
      { timestamp: "2026-08-06T03:30:14Z", severity: "INFO", service: "WidgetEngine", correlationId: "ws-widget-02", message: "Battery widget state changed: 88% charging" },
      { timestamp: "2026-08-06T03:30:16Z", severity: "WARN", service: "SystemIntegration", correlationId: "ws-system-03", message: "Event Tap permissions verification: AXIsProcessTrusted() == false, prompting user" },
      { timestamp: "2026-08-06T03:30:18Z", severity: "INFO", service: "AIPlatform", correlationId: "ws-ai-04", message: "Ollama local API connection established on port 11434" }
    ],
    incidents: [
      {
        id: "inc-1",
        title: "Accessibility Permission Loop on signing key change",
        severity: "Sev-2",
        timestamp: "2026-08-01T14:15:00Z",
        problem: "Tester application repeatedly prompts for Accessibility permissions even if approved.",
        symptoms: "AXIsProcessTrusted() returned false, event taps failed to activate, and system settings prompts repeated.",
        rootCause: "TCC invalidates permission registries if application signature keys change during debug restarts.",
        resolution: "Pinned consistent Developer ID signature profiles inside the active build scheme.",
        verification: "Warm restarts no longer trigger access prompts, and event taps initialize immediately.",
        lessonsLearned: "Cryptographic signature validation must remain consistent during development to prevent local security reset blocks."
      }
    ]
  },
  "study-companion": {
    projectId: "study-companion",
    indicators: [
      {
        name: "API Availability",
        target: ">= 99.5%",
        measurementStrategy: "Cloud Run diagnostic check queries run every 30 seconds.",
        designGoal: "99.8% Availability",
        businessImpact: "Ensures users can save study notes, download files, and request flashcards.",
        value: "99.88",
        unit: "%"
      },
      {
        name: "Response Latency",
        target: "< 250ms",
        measurementStrategy: "Server response duration logged per HTTP request in Cloud Run logs.",
        designGoal: "< 180ms Latency",
        businessImpact: "Allows immediate card flipping and smooth markdown transitions.",
        value: "142",
        unit: "ms"
      },
      {
        name: "Error Budget Remaining",
        target: "> 25.0%",
        measurementStrategy: "Allowed 30-day API crash quota remaining before release lock.",
        designGoal: "75.0% Error Budget Remaining",
        businessImpact: "Keeps development pace stable without compromising API reliability.",
        value: "82.5",
        unit: "%"
      }
    ],
    expectedProfiles: [
      { name: "CPU Utilization", targetValue: "Max 30%", currentPeak: "45%", unit: "%", description: "Expected CPU consumption profile per active Cloud Run serverless instance." },
      { name: "Memory Consumption", targetValue: "Max 512 MB", currentPeak: "712 MB", unit: "MB", description: "Container memory allocation limits for serverless node runtime instances." },
      { name: "Requests Throughput", targetValue: "120 req/sec", currentPeak: "180 req/sec", unit: "req/s", description: "Average expected user traffic volume handled during peak study hours." }
    ],
    traceSpans: [
      { id: "sp-1", service: "Browser", operation: "Request Flashcard", responsibility: "Dispatches HTTP GET request to flashcard api endpoint.", durationMs: 10, startOffsetMs: 0, failurePoints: ["Network offline"], retryStrategy: "Immediate browser retry", status: "success" },
      { id: "sp-2", service: "React App", operation: "Render Loader", responsibility: "Displays loading skeleton while background fetch completes.", durationMs: 5, startOffsetMs: 10, failurePoints: ["Render lag"], retryStrategy: "None", status: "success" },
      { id: "sp-3", service: "API Gateway", operation: "Forward Request", responsibility: "Routes API payload to target Cloud Run companion container.", durationMs: 12, startOffsetMs: 15, failurePoints: ["Gateway timeout"], retryStrategy: "Retry twice", status: "success" },
      { id: "sp-4", service: "Cloud Run API", operation: "Query Database", responsibility: "Fetches flashcard items from PostgreSQL database based on study deck ID.", durationMs: 65, startOffsetMs: 27, failurePoints: ["DB Connection pool full"], retryStrategy: "Connection retry with backoff", status: "success" },
      { id: "sp-5", service: "PostgreSQL DB", operation: "Select Queries", responsibility: "Executes index scan query on deck cards table.", durationMs: 35, startOffsetMs: 92, failurePoints: ["Query deadlock"], retryStrategy: "Re-run query on lock timeout", status: "success" },
      { id: "sp-6", service: "AI Embedding Engine", operation: "Fetch Embeddings", responsibility: "Validates card text semantics against cache index.", durationMs: 28, startOffsetMs: 127, failurePoints: ["API timeout"], retryStrategy: "Fallback to keyword search index", status: "success" }
    ],
    logs: [
      { timestamp: "2026-08-03T09:16:12Z", severity: "INFO", service: "AuthService", correlationId: "c-482f1b", message: "Token verification complete for user usr_491" },
      { timestamp: "2026-08-03T09:16:18Z", severity: "WARN", service: "FlashcardAPI", correlationId: "c-482f1b", message: "AI vector lookup exceeded expected latency threshold (180ms)" },
      { timestamp: "2026-08-03T09:16:22Z", severity: "WARN", service: "PostgreSQL", correlationId: "c-482f1b", message: "PostgreSQL connection pool utilization reached 95%" }
    ],
    incidents: [
      {
        id: "inc-2",
        title: "OAuth interceptor token refresh memory leak",
        severity: "Sev-2",
        timestamp: "2026-08-03T08:30:00Z",
        problem: "OAuth client helper memory leaked on container instances, triggering container evictions.",
        symptoms: "Containers restarted every 15 minutes, causing response latency to spike to 2.5 seconds.",
        rootCause: "Axios interceptor added refresh token callbacks on every api request without removing stale handlers.",
        resolution: "Cleaned up Axios interceptors on token success/failure and configured memory limit warnings.",
        verification: "Tested memory profiling for 2 hours; memory stayed stable below 256MB.",
        lessonsLearned: "Always unmount interceptor hooks when recycling token authorization wrappers."
      }
    ]
  },
  idp: {
    projectId: "idp",
    indicators: [
      {
        name: "Sandbox Availability",
        target: ">= 99.0%",
        measurementStrategy: "Terraform outputs checks run daily against active sandbox zones.",
        designGoal: "99.5% Availability",
        businessImpact: "Ensures developer teams can spin up sandbox zones on-demand.",
        value: "99.50",
        unit: "%"
      },
      {
        name: "Deploy Duration",
        target: "< 500s",
        measurementStrategy: "Total duration calculated from GitLab CI runner execution times.",
        designGoal: "< 360s Build Duration",
        businessImpact: "Speeds up infrastructure updates and keeps pull-request verification quick.",
        value: "310",
        unit: "s"
      },
      {
        name: "Error Budget Remaining",
        target: "> 30.0%",
        measurementStrategy: "Allowed pipeline failure budget before blocking branch merges.",
        designGoal: "70.0% Error Budget Remaining",
        businessImpact: "Maintains stability of workspace modules and pipeline configurations.",
        value: "90.0",
        unit: "%"
      }
    ],
    expectedProfiles: [
      { name: "CPU Utilization", targetValue: "Avg 20%", currentPeak: "35%", unit: "%", description: "Target resource profile of internal GCE gateway proxy instances." },
      { name: "Memory Consumption", targetValue: "Avg 1.0 GB", currentPeak: "1.5 GB", unit: "GB", description: "Active system memory allocation per workspace build runner." },
      { name: "Throughput", targetValue: "24 deployments", currentPeak: "35 deployments", unit: "runs/day", description: "Expected daily deployment runs triggered by developer staging commits." }
    ],
    traceSpans: [
      { id: "sp-1", service: "Browser", operation: "Request Infra Spin", responsibility: "Dispatches HTTP POST to launch internal sandbox workspace.", durationMs: 15, startOffsetMs: 0, failurePoints: ["Network timed out"], retryStrategy: "Immediate request retry", status: "success" },
      { id: "sp-2", service: "React App", operation: "Register Loader", responsibility: "Updates dashboard UI to show workspace building state.", durationMs: 10, startOffsetMs: 15, failurePoints: ["State sync failure"], retryStrategy: "State reconcile", status: "success" },
      { id: "sp-3", service: "API Gateway", operation: "Auth Verification", responsibility: "Verifies user permissions before triggering Cloud Build API.", durationMs: 25, startOffsetMs: 25, failurePoints: ["Token invalid", "Auth timeout"], retryStrategy: "Auth redirect", status: "success" },
      { id: "sp-4", service: "Cloud Build API", operation: "Trigger Build Runner", responsibility: "Launches GitLab CI terraform runner containers in sandbox VPC.", durationMs: 85, startOffsetMs: 50, failurePoints: ["No active runner nodes"], retryStrategy: "Wait and poll next runner", status: "success" },
      { id: "sp-5", service: "Terraform Apply", operation: "Infra Deploy", responsibility: "Provisions sandbox resources (Compute instances, firewall keys).", durationMs: 145, startOffsetMs: 135, failurePoints: ["IP quota reached", "VPC collision"], retryStrategy: "Auto-rollback state configuration", status: "success" }
    ],
    logs: [
      { timestamp: "2026-08-05T10:01:12Z", severity: "INFO", service: "GitLabRunner", correlationId: "c-104b2a", message: "Fetching environment credentials from vault successfully" },
      { timestamp: "2026-08-05T10:01:18Z", severity: "WARN", service: "TerraformApply", correlationId: "c-104b2a", message: "Terraform drift detected: Security group firewalls updated out-of-band" },
      { timestamp: "2026-08-05T10:01:25Z", severity: "ERROR", service: "GCPAPI", correlationId: "c-104b2a", message: "Resource creation error: API quota limits reached on region us-east1" }
    ],
    incidents: [
      {
        id: "inc-3",
        title: "Terraform firewall rules drift causing route collision",
        severity: "Sev-3",
        timestamp: "2026-08-05T09:10:00Z",
        problem: "Dev sandboxes could not communicate with internal APIs, throwing 503 errors.",
        symptoms: "Staging build pipeline failed during Terraform state apply verification tests.",
        rootCause: "Out-of-band manual modification of gateway firewall routes caused IP configuration collisions in state logs.",
        resolution: "Ran tf refresh to sync status and applied automated state repairs.",
        verification: "Terraform plan confirmed 0 resource differences; routes resolved successfully.",
        lessonsLearned: "Always lock out-of-band infrastructure modifications using IAM permission layers."
      }
    ]
  },
  portfolio: {
    projectId: "portfolio",
    indicators: [
      {
        name: "CDN Availability",
        target: ">= 99.99%",
        measurementStrategy: "Public prober health checks run every 5 minutes.",
        designGoal: "100.0% CDN Availability",
        businessImpact: "Ensures the portfolio is reachable instantly by recruiters globally.",
        value: "100.00",
        unit: "%"
      },
      {
        name: "Page Load Time (FCP)",
        target: "< 100ms",
        measurementStrategy: "First Contentful Paint speed tracked in user browser audits.",
        designGoal: "< 80ms FCP Paint",
        businessImpact: "Keeps initial loading fast, preventing bounce rates during review sessions.",
        value: "42",
        unit: "ms"
      },
      {
        name: "Error Budget Remaining",
        target: "> 40.0%",
        measurementStrategy: "Allowed 30-day website request failures remaining.",
        designGoal: "90.0% Error Budget Remaining",
        businessImpact: "Guarantees zero downtime for target layout templates.",
        value: "100.0",
        unit: "%"
      }
    ],
    expectedProfiles: [
      { name: "CPU utilization", targetValue: "Avg 2%", currentPeak: "5%", unit: "%", description: "CPU processing limits for Edge layout calculations." },
      { name: "Memory Consumption", targetValue: "Max 128 MB", currentPeak: "92 MB", unit: "MB", description: "Target static bundle size limits per Vercel Edge instance." },
      { name: "Requests Throughput", targetValue: "10 req/sec", currentPeak: "42 req/sec", unit: "req/s", description: "Average expected recruiter visits handled without network degradation." }
    ],
    traceSpans: [
      { id: "sp-1", service: "Browser", operation: "Request Page", responsibility: "Queries local DNS and dispatches HTTP GET requests to page domain.", durationMs: 5, startOffsetMs: 0, failurePoints: ["Local network offline"], retryStrategy: "Retry page load", status: "success" },
      { id: "sp-2", service: "Vercel CDN Edge", operation: "Cache Check", responsibility: "Checks Edge server cache for index.html static assets.", durationMs: 8, startOffsetMs: 5, failurePoints: ["CDN cache miss"], retryStrategy: "Fetch assets from origin bucket", status: "success" },
      { id: "sp-3", service: "Firebase Origin", operation: "Fetch HTML", responsibility: "Returns static html content when requested by CDN.", durationMs: 25, startOffsetMs: 13, failurePoints: ["Origin bucket timeout"], retryStrategy: "Retry from secondary region GCS", status: "success" },
      { id: "sp-4", service: "Browser Render", operation: "Paint Bundle", responsibility: "Executes static javascript bundles and draws glass panels.", durationMs: 15, startOffsetMs: 38, failurePoints: ["CSS parsing error"], retryStrategy: "None", status: "success" }
    ],
    logs: [
      { timestamp: "2026-08-06T03:31:12Z", severity: "INFO", service: "CDNEdge", correlationId: "c-002f1a", message: "Edge cache status: HIT for path /index.html" },
      { timestamp: "2026-08-06T03:31:18Z", severity: "WARN", service: "ViteBuild", correlationId: "c-002f1a", message: "CSS compilation warning: media query syntax fallback triggered" },
      { timestamp: "2026-08-06T03:31:25Z", severity: "ERROR", service: "FirebaseHosting", correlationId: "c-002f1a", message: "Cache invalidation hook timed out: Retrying request" }
    ],
    incidents: [
      {
        id: "inc-4",
        title: "CDN cache invalidation latency after build tagging",
        severity: "Sev-3",
        timestamp: "2026-08-05T12:00:00Z",
        problem: "Old portfolio details remained cached for certain regions, causing visual mismatches.",
        symptoms: "Updated workspace tabs did not render on client browsers in APAC zones.",
        rootCause: "Firebase cache purge hook was delayed due to regional API sync timeouts.",
        resolution: "Manually triggered cache invalidation via Firebase console and set Cache-Control headers.",
        verification: "Confirmed new layouts rendered cleanly in all regions via browser proxy tools.",
        lessonsLearned: "Use content-hashed JS asset file names to bypass CDN invalidation delays."
      }
    ]
  }
};

export const getObservabilityData = (projectId: string): ObservabilityDashboard | null => {
  return observabilityData[projectId] || null;
};
