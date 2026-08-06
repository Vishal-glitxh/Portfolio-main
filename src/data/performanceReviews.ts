import { PerformanceSecurityReview } from "../types";

export const performanceReviews: Record<string, PerformanceSecurityReview> = {
  "novaisland": {
    projectId: "novaisland",
    metrics: [
      {
        id: "nova-metric-startup",
        title: "Target Startup Time",
        value: 20,
        unit: "ms",
        description: "Target speed to initialize coordinates maps and position background window handlers.",
        category: "Performance",
        highlight: true,
        benchmarkMethod: "AppKit Launch Logging",
        targetValue: 20
      },
      {
        id: "nova-metric-memory",
        title: "Expected Memory Budget",
        value: 15,
        unit: "MB",
        description: "Allocated RAM memory size target for continuous background idle execution.",
        category: "Memory",
        highlight: true,
        benchmarkMethod: "Xcode Memory Instruments",
        targetValue: 15
      },
      {
        id: "nova-metric-fps",
        title: "Design Goal FPS",
        value: 60,
        unit: "FPS",
        description: "Constant visual frame rate goal for notch spring expansion morph animations.",
        category: "Performance",
        benchmarkMethod: "Core Animation Diagnostic Frame Tool",
        targetValue: 60
      },
      {
        id: "nova-metric-latency",
        title: "Target Response Time",
        value: 1,
        unit: "ms",
        description: "Input tapping processing latency bounds before routing gestures to widgets.",
        category: "Performance",
        benchmarkMethod: "Swift Concurrency Telemetry Logs",
        targetValue: 2
      }
    ],
    security: {
      authentication: {
        title: "Keychain Service Storage",
        currentImplementation: "User token credentials and local AI service credentials keys are loaded exclusively from macOS Keychain Services.",
        riskLevel: "Low",
        mitigationStrategy: "Configure access-control lists restricting key read privileges to the NovaIsland application bundle."
      },
      authorization: {
        title: "Accessibility TCC Authorization",
        currentImplementation: "Intercepts notch pointer hovers and keys taps by requesting Accessibility access via TCC guidelines.",
        riskLevel: "Medium",
        mitigationStrategy: "Directs users cleanly to Settings pane and checks trust states using AppKit processes validation APIs."
      },
      inputValidation: {
        title: "Sandbox Privacy Strategy",
        currentImplementation: "Restricts all file system access using macOS App Sandbox constraints.",
        riskLevel: "Low",
        mitigationStrategy: "Isolate temporary files write directories to local App Container folders, avoiding shared spaces."
      },
      outputEncoding: {
        title: "Clipboard Privacy Filters",
        currentImplementation: "Active clipboard monitor filters out credentials and API keys via local regex schemas.",
        riskLevel: "Low",
        mitigationStrategy: "Local scan checks discard inputs containing security payloads before sending to AI context channels."
      },
      encryption: {
        title: "Local Model Isolation",
        currentImplementation: "Local Ollama prompt processing queries execute entirely offline on local network port channels.",
        riskLevel: "Low",
        mitigationStrategy: "Isolate prompt payload routing to 127.0.0.1, blocking external server traffic listeners."
      },
      secretManagement: {
        title: "Zero API Secret Policy",
        currentImplementation: "Maintains zero hardcoded keys or cloud databases credentials inside local code files.",
        riskLevel: "Low",
        mitigationStrategy: "Force all API connections configurations to pull keys from local user configurations storage."
      },
      apiSecurity: {
        title: "Security Keys checks",
        currentImplementation: "Validates all custom widgets prompt templates using strict strings escape checks.",
        riskLevel: "Low",
        mitigationStrategy: "Perform input parameter encoding to prevent shell injection vectors."
      },
      dependencyManagement: {
        title: "Zero-dependency Architecture",
        currentImplementation: "Engineered using native Swift 6 packages, avoiding third-party dependency vulnerabilities.",
        riskLevel: "Low",
        mitigationStrategy: "Audits native framework imports compile flags regularly to keep targets clean."
      },
      vulnerabilityMitigation: {
        title: "Entitlements validation",
        currentImplementation: "Uses strict App Sandbox configuration flags.",
        riskLevel: "Low",
        mitigationStrategy: "Disable standard scripting injections flags inside the target application entitlements."
      },
      monitoring: {
        title: "Local Logging Observer",
        currentImplementation: "Generates localized run stats tracking active widget crash instances.",
        riskLevel: "Low",
        mitigationStrategy: "Write trace outputs to sandbox container diagnostic streams."
      }
    },
    infrastructure: {
      nodes: [
        {
          id: "native-macos",
          title: "macOS Application Core",
          type: "Client",
          description: "AppDelegate controller managing main run loops and notch coordinates mapping.",
          protocol: "Native AppKit Event Loop",
          responsibilities: "Initializes controllers, manages app states, and intercepts display space shifts.",
          scalingNotes: "Constrained by main thread loops. Tasks are routed to background actors dynamically.",
          failureHandling: "Catches layout anomalies and force-resets notch coordinates maps.",
          connections: ["appkit-events", "swiftui-gui"]
        },
        {
          id: "appkit-events",
          title: "AppKit Event TAP monitor",
          type: "Monitoring",
          description: "Global event interceptor tracking hover vectors.",
          protocol: "macOS Accessibility APIs",
          responsibilities: "Captures pointer overlaps and forwards gestures to widget containers.",
          scalingNotes: "Operates asynchronously to prevent UI event loops blocks.",
          failureHandling: "Bypasses tracking triggers if accessibility permissions are revoked.",
          connections: ["swiftui-gui"]
        },
        {
          id: "swiftui-gui",
          title: "SwiftUI Widget Host",
          type: "Frontend",
          description: "Interactive cells panel hosting dynamic SwiftUI views.",
          protocol: "SwiftUI Environment Injection",
          responsibilities: "Renders battery levels, clipboard cards, and local AI prompts responses.",
          scalingNotes: "Uses lazy stacks layout grids to optimize redraw rendering operations.",
          failureHandling: "Collapses host panel if widget initialization anomalies occur.",
          connections: ["widget-registry", "ai-adapter"]
        },
        {
          id: "widget-registry",
          title: "Widget Framework Engine",
          type: "Backend",
          description: "Conforms active widgets to standard lifecycle protocols.",
          protocol: "Swift Protocol Delegates",
          responsibilities: "Maintains active widgets registry list and schedules update ticks.",
          scalingNotes: "Optimizes CPU loops by updating cell states only on data changes.",
          failureHandling: "Disables misbehaving plugins to prevent main panel crash loops.",
          connections: ["plugin-framework"]
        },
        {
          id: "ai-adapter",
          title: "AI Abstraction Adapters",
          type: "AI Layer",
          description: "Common adapter layer mapping to local or cloud LLM servers.",
          protocol: "Asynchronous HTTPS Streams",
          responsibilities: "Translates prompts structures, routes payloads, and returns tokens.",
          scalingNotes: "Utilizes async Swift tasks groups to support simultaneous query runs.",
          failureHandling: "Falls back to local Ollama models if external cloud APIs timeout.",
          connections: []
        },
        {
          id: "plugin-framework",
          title: "Plugin Sandbox Validator",
          type: "Backend",
          description: "Entitlements checker loading third-party widgets.",
          protocol: "Entitlements Signing verification",
          responsibilities: "Validates developer keys signature and restricts file access.",
          scalingNotes: "Applies macOS Sandbox rules to restrict individual plugin resources footprint.",
          failureHandling: "Blocks loading of unsigned or non-compliant widget bundles.",
          connections: []
        }
      ],
      futureImprovements: [
        "Transition dynamic updates monitoring to direct Swift Combine observers.",
        "Pre-allocate memory pools for local LLM token context buffers."
      ]
    }
  },
  "study-companion": {
    projectId: "study-companion",
    metrics: [
      {
        id: "study-metric-latency",
        title: "Vector Search Latency",
        value: 45,
        unit: "ms",
        description: "Duration to query sentence similarity matrices and return ranked study topics.",
        category: "AI",
        highlight: true,
        benchmarkMethod: "Autocannon Load Testing scripts",
        targetValue: 50,
        references: ["study-debug-02"]
      },
      {
        id: "study-metric-ingestion",
        title: "Document Ingestion Speed",
        value: 1.5,
        unit: "sec",
        description: "Average duration to chunk, parse, and generate vector arrays for a 10-page study notes PDF.",
        category: "Performance",
        highlight: true,
        benchmarkMethod: "Console Performance Timeline Profiling",
        targetValue: 2.0
      },
      {
        id: "study-metric-memory",
        title: "Memory usage per active upload",
        value: 120,
        unit: "MB",
        description: "RAM memory required to process text extraction stream buffers without main-thread blocks.",
        category: "Memory",
        benchmarkMethod: "Node.js process.memoryUsage() traces",
        targetValue: 150,
        references: ["study-debug-01"]
      }
    ],
    security: {
      authentication: {
        title: "Authentication",
        currentImplementation: "JWT-based session authentication with HTTPOnly cookies storage.",
        riskLevel: "Medium",
        mitigationStrategy: "Set short JWT expiry windows and enforce HTTPS only connections to block session hijacks."
      },
      authorization: {
        title: "Authorization",
        currentImplementation: "Verifies user ownership boundaries on course documents before queries execution.",
        riskLevel: "Medium",
        mitigationStrategy: "Enforce query validation filters matching request tokens directly to MongoDB document owner IDs."
      },
      inputValidation: {
        title: "Input Validation",
        currentImplementation: "Sanitizes PDF uploader metadata. Rejects mock PDF vectors and non-PDF MIME payloads.",
        riskLevel: "High",
        mitigationStrategy: "Integrate file parser validations to scan PDF headers, restricting processing to valid streams."
      },
      outputEncoding: {
        title: "Output Encoding",
        currentImplementation: "Sanitizes JSON outputs. Prevents XSS script injections inside practice question widgets.",
        riskLevel: "Medium",
        mitigationStrategy: "HTML-encode dynamic text outputs inside React cards before rendering elements."
      },
      encryption: {
        title: "Encryption",
        currentImplementation: "All API payloads use HTTPS TLS 1.3 connections. Cache collections database is unencrypted.",
        riskLevel: "Medium",
        mitigationStrategy: "Setup MongoDB database encryption at rest using AES-256 keys to secure stored document notes."
      },
      secretManagement: {
        title: "Secret Management",
        currentImplementation: "API secrets and database URLs are loaded from encrypted local environment (.env) files.",
        riskLevel: "Medium",
        mitigationStrategy: "Never hardcode secret credentials in source files. Migrate to Google Secrets Manager for production deployment."
      },
      apiSecurity: {
        title: "API Security",
        currentImplementation: "Express rate-limiter controls restricting users to a maximum of 60 requests per minute.",
        riskLevel: "High",
        mitigationStrategy: "Block malicious users using reverse proxy rate limit controls (Cloudflare/Nginx rules)."
      },
      dependencyManagement: {
        title: "Dependency Management",
        currentImplementation: "Package-lock locks npm packages version configurations. Routine audits track packages status.",
        riskLevel: "Medium",
        mitigationStrategy: "Run automated security checks using npm audit inside CI/CD test workflows."
      },
      vulnerabilityMitigation: {
        title: "Vulnerability Mitigation",
        currentImplementation: "Decoupled server setup isolates NLP engines from front-facing client interfaces.",
        riskLevel: "Medium",
        mitigationStrategy: "Run document text extraction actions inside containerized sandboxes with restricted disk space quotas."
      },
      monitoring: {
        title: "Monitoring",
        currentImplementation: "Server logs API call latencies and tracks MongoDB query times.",
        riskLevel: "Medium",
        mitigationStrategy: "Route logs to centralized tools (Winston logs + Datadog) to alert on memory heap usage spikes."
      }
    },
    infrastructure: {
      nodes: [
        {
          id: "react-client",
          title: "React Web Dashboard",
          type: "Frontend",
          description: "Web client showing vector similarity maps, heatmaps, and course uploads.",
          protocol: "HTTPS / JSON Payload API",
          responsibilities: "Renders visual data, tracks course uploads, handles JWT tokens storage.",
          scalingNotes: "Stateless client assets are served via global CDN edge caches for instant load times.",
          failureHandling: "Displays offline status indicators and caches unsaved practice questions locally.",
          connections: ["express-api"]
        },
        {
          id: "express-api",
          title: "Express Gateway API",
          type: "Backend",
          description: "Express web server validating JWT auth and database queries.",
          protocol: "HTTP API Gateway / TCP connections",
          responsibilities: "Validates inputs, controls upload rates, queries MongoDB collections database.",
          scalingNotes: "Stateless Express nodes scale horizontally behind a load balancer during peak schedules.",
          failureHandling: "Responds with 503 service unavailable codes and logs connection errors.",
          connections: ["sentence-transformers", "mongodb-db"]
        },
        {
          id: "sentence-transformers",
          title: "NLP Similarity Core",
          type: "AI Layer",
          description: "Local NLP calculation engine computing 768-dim conceptual vectors.",
          protocol: "REST API / Child Process IPC Channels",
          responsibilities: "Generates sentence embeddings, computes cosine similarity, predicts study topics.",
          scalingNotes: "Heavy CPU computation is isolated in worker threads. Scales horizontally as independent microservices.",
          failureHandling: "Falls back to cached similarity mapping indices if models fail to load.",
          connections: []
        },
        {
          id: "mongodb-db",
          title: "MongoDB Collection",
          type: "Database",
          description: "NoSQL document storage caching vectors, course notes, and generated question cards.",
          protocol: "MongoDB Database Connection protocols",
          responsibilities: "Indexes vector keys, caches question matches, updates document state variables.",
          scalingNotes: "Optimized with indices on course IDs. Scales via replica shards.",
          failureHandling: "Primary replica fails over automatically to secondary backup nodes under 10 seconds.",
          connections: []
        }
      ],
      futureImprovements: [
        "Migrate from local Sentence-Transformers to a dedicated FastAPI HuggingFace container.",
        "Store high-dimensional vectors inside a specialized vector database (Pinecone or Qdrant)."
      ]
    }
  },
  "idp": {
    projectId: "idp",
    metrics: [
      {
        id: "idp-metric-placement",
        title: "9-Box calculations latency",
        value: 2,
        unit: "ms",
        description: "Duration to compute 9-Box talent coordinates and map active employee nodes.",
        category: "Performance",
        highlight: true,
        benchmarkMethod: "Performance.now() timer metrics",
        targetValue: 5,
        references: ["idp-debug-01"]
      },
      {
        id: "idp-metric-seed",
        title: "Database Seed duration",
        value: 1.8,
        unit: "sec",
        description: "Time to populate local SQLite database tables with mock employees and skills.",
        category: "Database",
        benchmarkMethod: "Prisma CLI seed telemetry logs",
        targetValue: 3.0,
        references: ["idp-debug-02"]
      },
      {
        id: "idp-metric-integrity",
        title: "Referential Integrity index",
        value: 100,
        unit: "%",
        description: "Enforcement rate of foreign-key checks on employee skills relations.",
        category: "Reliability",
        highlight: true,
        benchmarkMethod: "SQLite constraint enforcement queries",
        targetValue: 100
      }
    ],
    security: {
      authentication: {
        title: "Authentication",
        currentImplementation: "Local development session setup. Basic mock credentials login simulation.",
        riskLevel: "Low",
        mitigationStrategy: "Transition to standard session frameworks (Passport.js/OAuth) before production rollout."
      },
      authorization: {
        title: "Authorization",
        currentImplementation: "Basic user role checks (HR Manager vs standard developer profile access).",
        riskLevel: "Medium",
        mitigationStrategy: "Integrate database-level Role-Based Access Control (RBAC) middleware checks."
      },
      inputValidation: {
        title: "Input Validation",
        currentImplementation: "Sanitizes employee assessment inputs and coordinate updates.",
        riskLevel: "Medium",
        mitigationStrategy: "Validate schema inputs using Zod objects before executing database operations."
      },
      outputEncoding: {
        title: "Output Encoding",
        currentImplementation: "Sanitizes SVG dashboard labels and text fields to prevent inline script executions.",
        riskLevel: "Low",
        mitigationStrategy: "Rely on React auto-escaping for JSX variables before rendering SVGs."
      },
      encryption: {
        title: "Encryption",
        currentImplementation: "All SQLite database files are stored locally in unencrypted spaces.",
        riskLevel: "Medium",
        mitigationStrategy: "Secure SQLite files using SQLCipher encryption wrappers in production systems."
      },
      secretManagement: {
        title: "Secret Management",
        currentImplementation: "Database paths and server ports are configured via local config variables.",
        riskLevel: "Low",
        mitigationStrategy: "Deploy using secure environmental parameters inside server containers."
      },
      apiSecurity: {
        title: "API Security",
        currentImplementation: "Prisma validation layers prevent raw SQL injections by using parameterized queries.",
        riskLevel: "Medium",
        mitigationStrategy: "Limit API exposure behind Nginx configuration rate limit policies."
      },
      dependencyManagement: {
        title: "Dependency Management",
        currentImplementation: "Locks versioning inside package-lock.json configurations.",
        riskLevel: "Medium",
        mitigationStrategy: "Configure dependency vulnerability checks (Snyk/Dependabot) inside repository workflows."
      },
      vulnerabilityMitigation: {
        title: "Vulnerability Mitigation",
        currentImplementation: "Standalone SQLite architecture isolates data pools.",
        riskLevel: "Low",
        mitigationStrategy: "Limit write operations to validated HR role users only."
      },
      monitoring: {
        title: "Monitoring",
        currentImplementation: "Basic console log outputs capturing route operations and DB queries.",
        riskLevel: "Low",
        mitigationStrategy: "Migrate log outputs to Winston tracking files to record data changes."
      }
    },
    infrastructure: {
      nodes: [
        {
          id: "svg-client",
          title: "SVG Dashboard client",
          type: "Frontend",
          description: "HR Dashboard client displaying employee coordinates mapping lists.",
          protocol: "HTTPS / API Route communication",
          responsibilities: "Renders interactive SVG grids, processes coordinate clicks, maps employee records.",
          scalingNotes: "Optimized with client-side state memoization. Visualizes 500+ employees dynamically.",
          failureHandling: "Displays fallback placeholders if DB connections drop.",
          connections: ["idp-server"]
        },
        {
          id: "idp-server",
          title: "Express Service API",
          type: "Backend",
          description: "Express API server managing talent records routing.",
          protocol: "HTTP JSON payloads / TCP",
          responsibilities: "Processes HR inputs, routes updates, executes Prisma query requests.",
          scalingNotes: "Runs on a single Node process locally. Easy to scale horizontally behind proxies.",
          failureHandling: "Responds with standard 500 internal errors and resets connection pools.",
          connections: ["prisma-sqlite"]
        },
        {
          id: "prisma-sqlite",
          title: "SQLite Database",
          type: "Database",
          description: "Relational database holding employees details, skills ratings, and course recommendations.",
          protocol: "SQLite direct filesystem connection protocol",
          responsibilities: "Enforces foreign key checks, indexes developer IDs, runs query queries.",
          scalingNotes: "Constrained by SQLite filesystem write locks. Fully suitable for local setups.",
          failureHandling: "Rollbacks database transactions automatically if operations fail.",
          connections: []
        }
      ],
      futureImprovements: [
        "Migrate SQLite database backend directly to Postgres for multi-user concurrent writes.",
        "Add automated database backup replication jobs to secure employee metrics histories."
      ]
    }
  },
  "portfolio": {
    projectId: "portfolio",
    metrics: [
      {
        id: "portfolio-metric-fps",
        title: "WebGL rendering speed",
        value: 60,
        unit: "FPS",
        description: "Constant rendering frame rate of the Three.js avatar model during mouse tracking updates.",
        category: "Performance",
        highlight: true,
        benchmarkMethod: "Three.js Stats viewport overlay",
        targetValue: 60,
        references: ["portfolio-debug-02"]
      },
      {
        id: "portfolio-metric-lcp",
        title: "Largest Contentful Paint",
        value: 1.1,
        unit: "sec",
        description: "Lighthouse core metric measuring duration until the main hero content is painted.",
        category: "Frontend",
        highlight: true,
        benchmarkMethod: "Google Lighthouse audit engines",
        targetValue: 1.5
      },
      {
        id: "portfolio-metric-bundle",
        title: "Initial bundle payload",
        value: 966,
        unit: "kB",
        description: "Total size of initial Javascript assets loaded during homepage entry.",
        category: "Memory",
        benchmarkMethod: "Vite build compiler output reports",
        targetValue: 1000,
        references: ["portfolio-debug-01"]
      }
    ],
    security: {
      authentication: {
        title: "Authentication",
        currentImplementation: "N/A. Static informational developer showcase portfolio. No login portal exists.",
        riskLevel: "Low",
        mitigationStrategy: "Ensure no authentication libraries or portals are exposed in client builds."
      },
      authorization: {
        title: "Authorization",
        currentImplementation: "N/A. Read-only informational website.",
        riskLevel: "Low",
        mitigationStrategy: "Maintain strictly read-only access controls to static web files."
      },
      inputValidation: {
        title: "Input Validation",
        currentImplementation: "Validates contact email input formats and limits message inputs lengths.",
        riskLevel: "Low",
        mitigationStrategy: "Sanitize form parameters at the edge to prevent script injections inside contact logs."
      },
      outputEncoding: {
        title: "Output Encoding",
        currentImplementation: "React auto-escapes all strings rendered inside components.",
        riskLevel: "Low",
        mitigationStrategy: "Avoid using unsafe methods like `dangerouslySetInnerHTML` for user inputs."
      },
      encryption: {
        title: "Encryption",
        currentImplementation: "All assets are served exclusively via HTTPS TLS 1.3.",
        riskLevel: "Low",
        mitigationStrategy: "Redirect all standard HTTP connection attempts automatically to HTTPS."
      },
      secretManagement: {
        title: "Secret Management",
        currentImplementation: "Analytics and telemetry tracker keys are injected via build-time parameters.",
        riskLevel: "Low",
        mitigationStrategy: "Expose only non-sensitive public analytics tokens inside client files."
      },
      apiSecurity: {
        title: "API Security",
        currentImplementation: "Third-party contact email integration rate limits inputs requests.",
        riskLevel: "Low",
        mitigationStrategy: "Enforce recaptcha validations to prevent automated spam bot submissions."
      },
      dependencyManagement: {
        title: "Dependency Management",
        currentImplementation: "Identical lock versioning locked inside package-lock.json configurations.",
        riskLevel: "Medium",
        mitigationStrategy: "Run automated security checks using npm audit inside CI/CD test workflows."
      },
      vulnerabilityMitigation: {
        title: "Vulnerability Mitigation",
        currentImplementation: "Served as pre-compiled static assets (Vite build dist bundle).",
        riskLevel: "Low",
        mitigationStrategy: "Disable standard directory browsing lists on edge CDN hosting nodes."
      },
      monitoring: {
        title: "Monitoring",
        currentImplementation: "Standard analytics dashboards tracking page impressions and loading events.",
        riskLevel: "Low",
        mitigationStrategy: "Review CDN access logs periodically to analyze unusual request bursts."
      }
    },
    infrastructure: {
      nodes: [
        {
          id: "web-browser",
          title: "Client web browser",
          type: "Client",
          description: "Recruiter Web browser loading static assets and running WebGL renders.",
          protocol: "HTTPS / TLS 1.3 / HTTP/2",
          responsibilities: "Executes React scripts, renders Three.js skeleton head-tracking, plays GSAP animations.",
          scalingNotes: "Client hardware runs calculations locally. Optimized to decrease memory leaks.",
          failureHandling: "Provides fallback rendering layers if Three.js canvas initialization fails.",
          connections: ["edge-cdn"]
        },
        {
          id: "edge-cdn",
          title: "Global Edge CDN",
          type: "Deployment",
          description: "Global CDN caching compiled Vite bundle files.",
          protocol: "HTTPS / CDN cache protocols",
          responsibilities: "Caches index files, serves scripts, redirects queries.",
          scalingNotes: "Scales globally across hundreds of edge locations to deliver sub-second response times.",
          failureHandling: "Reroutes traffic automatically to adjacent edge caching locations during server drops.",
          connections: []
        }
      ],
      futureImprovements: [
        "Pre-bake GLTF character textures to bypass real-time Three.js lighting calculations on mobile.",
        "Implement Service Worker caches to support completely offline browsing capability."
      ]
    }
  }
};

// Helper function to resolve performance reviews by project name or stable ID mapping
export const getPerformanceReview = (name: string): PerformanceSecurityReview | undefined => {
  const norm = name.toLowerCase();
  if (norm.includes("island")) return performanceReviews["novaisland"];
  if (norm.includes("companion")) return performanceReviews["study-companion"];
  if (norm.includes("platform") || norm.includes("idp")) return performanceReviews["idp"];
  if (norm.includes("portfolio")) return performanceReviews["portfolio"];
  return undefined;
};
