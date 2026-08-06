import { ProjectKnowledgeWorkspace } from "../types";

export const assistantData: Record<string, ProjectKnowledgeWorkspace> = {
  novaisland: {
    projectId: "novaisland",
    documents: [
      {
        id: "nova-doc-1",
        title: "Why SwiftUI & AppKit over Electron?",
        summary: "Performance, memory footprints, and native macOS API access.",
        keywords: ["swiftui", "appkit", "electron", "performance", "memory", "native", "macos", "battery"],
        tags: ["Architecture", "Performance"],
        body: "NovaIsland was built natively using SwiftUI and AppKit instead of Electron to ensure minimal CPU and memory footprints. Electron packages ship a full Node runtime and Chromium engine, consuming 100MB+ of idle RAM and draining MacBook batteries. In contrast, NovaIsland runs on just 12MB of idle RAM and under 0.05% CPU. Additionally, native AppKit bridges are required to tap into macOS workspaces, custom system hotkeys, and floating NSPanel screen layers.",
        citations: [
          { label: "Engineering Decisions", targetTab: "engineering", targetSectionId: "decisions" },
          { label: "Performance Metrics", targetTab: "operations", targetSectionId: "performance" }
        ],
        category: "Architecture",
        suggestedFollowUps: ["How does the Widget Engine work?", "How is performance maintained?"]
      },
      {
        id: "nova-doc-2",
        title: "Explain the NSPanel focus stealing incident",
        summary: "Post-mortem review of text input focus lockups.",
        keywords: ["incident", "nspanel", "focus", "key window", "debugging", "first responder"],
        tags: ["Debugging", "Window Engine"],
        body: "During development, clicking text inputs inside the hover panel caused active parent apps (like Xcode) to lose active key window status. The root cause was that macOS default text fields call becomeFirstResponder, forcing the parent panel to capture key status. The resolution involved custom AppKit overrides preventing the panel from capturing system key loops and handling inputs asynchronously through local coordinators.",
        citations: [
          { label: "Debugging Journal", targetTab: "engineering", targetSectionId: "journal" },
          { label: "Incident History", targetTab: "operations", targetSectionId: "observability" }
        ],
        category: "Debugging",
        suggestedFollowUps: ["Why SwiftUI & AppKit over Electron?", "How are plugins designed?"]
      },
      {
        id: "nova-doc-3",
        title: "How does the Widget Engine work?",
        summary: "Protocol-driven extensible rendering lifecycle.",
        keywords: ["widget", "engine", "protocol", "lifecycle", "rendering", "registry", "extensible"],
        tags: ["Architecture", "Extensibility"],
        body: "The Widget Engine operates on a protocol-driven framework. Every widget (Battery, clipboard, downloads, weather) conforms to a WidgetPlugin protocol that defines lifecycle hooks (onLoad, onUpdate, onDestroy) and SwiftUI views layouts. A central WidgetRegistry coordinates refresh ticks and updates active views dynamically without re-rendering the outer dynamic island container.",
        citations: [
          { label: "System Architecture", targetTab: "architecture", targetSectionId: "architecture-section" },
          { label: "Widget Lifecycle QA", targetTab: "qa", targetSectionId: "testing" }
        ],
        category: "Architecture",
        suggestedFollowUps: ["How are plugins designed?", "Why SwiftUI & AppKit over Electron?"]
      },
      {
        id: "nova-doc-4",
        title: "How are plugins designed?",
        summary: "Sandbox-validated third-party extensibility.",
        keywords: ["plugins", "sdk", "sandbox", "extensibility", "security", "custom widgets"],
        tags: ["Security", "Developer Tools"],
        body: "Plugins are compiled as standalone binary bundles matching the NovaIsland Plugin SDK protocols. To ensure security, the main application runs them inside macOS sandbox restrictions. The PluginEngine validates signatures at boot, restricts filesystem accessibility, and passes system events via read-only bridging proxies.",
        citations: [
          { label: "Plugin Security Reviews", targetTab: "operations", targetSectionId: "performance" },
          { label: "Testing Strategy", targetTab: "qa", targetSectionId: "testing" }
        ],
        category: "FAQ",
        suggestedFollowUps: ["How does the Widget Engine work?", "Explain the NSPanel focus stealing incident."]
      }
    ]
  },
  "study-companion": {
    projectId: "study-companion",
    documents: [
      {
        id: "study-doc-1",
        title: "Why did you implement Blue-Green deployments?",
        summary: "Cloud Run serverless traffic splitting strategy.",
        keywords: ["blue-green", "cloud run", "deployment", "strategy", "traffic", "revert", "rollback"],
        tags: ["CI/CD", "Operations"],
        body: "Cloud Run supports immediate revision traffic redirection, allowing us to perform Blue-Green switches. This minimizes cold starts and guarantees 0-downtime during major tag updates. If health status checks fail, VPC rollback commands redirect 100% traffic instantly back to previous revisions.",
        citations: [
          { label: "Deployment Strategy", targetTab: "operations", targetSectionId: "pipeline" }
        ],
        category: "Architecture",
        suggestedFollowUps: ["Tell me about the AI flashcard generation latency.", "Explain the OAuth interceptor memory leak."]
      },
      {
        id: "study-doc-2",
        title: "Tell me about the AI flashcard generation latency",
        summary: "Latency objectives and OpenAI API tracing.",
        keywords: ["latency", "ai", "flashcard", "embeddings", "openai", "trace", "slow"],
        tags: ["Performance", "AI"],
        body: "Flashcard latency is designed for < 180ms response goals. We utilize OpenTelemetry traces across serverless instances to log bottlenecks. When OpenAI semantic embeddings lookup exceeds limits, we fall back to a local search index to keep operations fast.",
        citations: [
          { label: "Observability Traces", targetTab: "operations", targetSectionId: "observability" }
        ],
        category: "Performance",
        suggestedFollowUps: ["Why did you implement Blue-Green deployments?", "Explain the OAuth interceptor memory leak."]
      },
      {
        id: "study-doc-3",
        title: "Explain the OAuth interceptor memory leak",
        summary: "OAuth helper connection leak post-mortem.",
        keywords: ["incident", "leak", "memory", "oauth", "interceptor", "axios", "sev-2"],
        tags: ["Debugging", "Quality"],
        body: "Axios client helper memory leaked on container instances, triggering container evictions every 15 minutes. The root cause was that OAuth interceptors added token refresh callbacks continuously without recycling stale handlers. The fix involved cleaning up Axios hooks on token success/failure.",
        citations: [
          { label: "Debugging Journal", targetTab: "engineering", targetSectionId: "journal" },
          { label: "Incident post-mortem", targetTab: "operations", targetSectionId: "observability" }
        ],
        category: "Debugging",
        suggestedFollowUps: ["Tell me about the AI flashcard generation latency.", "Why did you implement Blue-Green deployments?"]
      }
    ]
  },
  idp: {
    projectId: "idp",
    documents: [
      {
        id: "idp-doc-1",
        title: "How is Terraform state managed and locked?",
        summary: "IP configurations and state file concurrency rules.",
        keywords: ["terraform", "state", "locking", "gcs", "bucket", "concurrency"],
        tags: ["Infrastructure", "Operations"],
        body: "Terraform state files are stored in a version-controlled Google Cloud Storage (GCS) bucket. State locking is enforced via GCS backend configurations to prevent concurrent modifications during CI runner execution blocks, securing infrastructure alignments.",
        citations: [
          { label: "Deployment Architecture", targetTab: "architecture", targetSectionId: "deployment" }
        ],
        category: "Architecture",
        suggestedFollowUps: ["Explain the firewall rules route collision.", "What security checks run in CI?"]
      },
      {
        id: "idp-doc-2",
        title: "Explain the firewall rules route collision",
        summary: "State logs firewall sync post-mortem.",
        keywords: ["incident", "firewall", "route", "collision", "drift", "terraform", "sev-3"],
        tags: ["Debugging", "Operations"],
        body: "Out-of-band manual modification of gateway route firewalls caused IP configuration collisions in Terraform apply state logs, throwing 503 errors on sandboxes. The resolution involved running 'tf refresh' to sync active status and applying state rules repairs.",
        citations: [
          { label: "Debugging Journal", targetTab: "engineering", targetSectionId: "journal" },
          { label: "Incident post-mortem", targetTab: "operations", targetSectionId: "observability" }
        ],
        category: "Debugging",
        suggestedFollowUps: ["How is Terraform state managed and locked?", "What security checks run in CI?"]
      },
      {
        id: "idp-doc-3",
        title: "What security checks run in CI?",
        summary: "Pipeline terraform scanning details.",
        keywords: ["security", "ci", "checks", "tflint", "tfsec", "scanner"],
        tags: ["Testing", "Security"],
        body: "Every staging commit triggers Terraform validation, syntax linting via tflint, and static vulnerability scanning using tfsec to detect public port openings, default passwords, and unencrypted disk variables before deployment.",
        citations: [
          { label: "CI/CD Pipeline", targetTab: "operations", targetSectionId: "pipeline" }
        ],
        category: "Testing",
        suggestedFollowUps: ["Explain the firewall rules route collision.", "How is Terraform state managed and locked?"]
      }
    ]
  },
  portfolio: {
    projectId: "portfolio",
    documents: [
      {
        id: "port-doc-1",
        title: "How is page load latency optimized?",
        summary: "Vercel edge caching and static bundle optimizations.",
        keywords: ["latency", "optimize", "edge", "caching", "fcp", "bundle", "size"],
        tags: ["Performance", "Quality"],
        body: "Page load latency is optimized below 100ms targets. The entire case studies datasets are bundled inside the lazy-loaded ProjectExplorer JS chunk, keeping the home page bundle size under 151KB. Static assets are served from Vercel Edge CDN caches, resulting in an FCP paint of 42ms.",
        citations: [
          { label: "Performance review", targetTab: "operations", targetSectionId: "performance" }
        ],
        category: "Performance",
        suggestedFollowUps: ["Explain the CDN cache invalidation delay.", "How are releases validated?"]
      },
      {
        id: "port-doc-2",
        title: "Explain the CDN cache invalidation delay",
        summary: "Regional CDN cache purge delay post-mortem.",
        keywords: ["incident", "cdn", "cache", "purge", "firebase", "invalidation", "sev-3"],
        tags: ["Debugging", "Operations"],
        body: "Old static bundles remained cached in APAC regions due to Firebase API sync delays. The resolution involved manually purging the cache ID via Firebase Hosting console and shifting to content-hashed javascript asset filenames to bypass caches.",
        citations: [
          { label: "Debugging Journal", targetTab: "engineering", targetSectionId: "journal" },
          { label: "Incident post-mortem", targetTab: "operations", targetSectionId: "observability" }
        ],
        category: "Debugging",
        suggestedFollowUps: ["How is page load latency optimized?", "How are releases validated?"]
      },
      {
        id: "port-doc-3",
        title: "How are releases validated?",
        summary: "Firebase deployment checking checks.",
        keywords: ["release", "validation", "lint", "build", "accessibility", "seo", "checks"],
        tags: ["Testing", "Quality"],
        body: "Releases are validated through pre-commit hooks executing lint validations, production build bundles, accessibility compliance via Axe-core audits, and SEO meta verification. Deployments are pushed to preview hosting paths first.",
        citations: [
          { label: "Testing Strategy", targetTab: "qa", targetSectionId: "testing" }
        ],
        category: "Testing",
        suggestedFollowUps: ["How is page load latency optimized?", "Explain the CDN cache invalidation delay."]
      }
    ]
  }
};

export const getKnowledgeWorkspace = (projectId: string): ProjectKnowledgeWorkspace | null => {
  return assistantData[projectId] || null;
};
