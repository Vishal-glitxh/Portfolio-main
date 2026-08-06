import { TestingStrategy } from "../types";

export const testingStrategies: Record<string, TestingStrategy> = {
  "novaisland": {
    projectId: "novaisland",
    overview: "Comprehensive verification plan covering the native Window Engine operations, SwiftUI layouts, AppKit event tap performance, Swift Concurrency thread safety, and multi-provider AI adapter integrations.",
    testSuites: [
      {
        id: "nova-suite-01",
        title: "Widget Lifecycle Unit Tests",
        category: "Unit",
        coverage: 95,
        totalTests: 45,
        passedTests: 45,
        failedTests: 0,
        skippedTests: 0,
        technologies: ["Swift XCTest", "SwiftUI Views Mocking"],
        verificationCommand: "swift test --filter WidgetLifecycleTests",
        notes: "Verifies widget protocol conformance, activation states, registry insertions, and memory cleanups."
      },
      {
        id: "nova-suite-02",
        title: "Window Engine Concurrency Integration",
        category: "Integration",
        coverage: 92,
        totalTests: 30,
        passedTests: 30,
        failedTests: 0,
        skippedTests: 0,
        technologies: ["Swift Concurrency", "AppKit Mock delegates"],
        verificationCommand: "swift test --filter WindowEngineTests",
        notes: "Verifies thread-safety of NSPanel space animations under concurrent hover event loops."
      },
      {
        id: "nova-suite-03",
        title: "Sandbox Memory Allocation Profiling",
        category: "Performance",
        coverage: 88,
        totalTests: 10,
        passedTests: 10,
        failedTests: 0,
        skippedTests: 0,
        technologies: ["Xcode Instruments Leak Profiler", "task_info APIs"],
        verificationCommand: "xcodebuild test -scheme NovaIsland -destination 'platform=macOS'",
        notes: "Profiles heap size allocations under macOS App Sandbox constraints."
      }
    ],
    browserMatrix: [
      {
        browser: "Intel Macs (macOS 14.0+)",
        version: "Supported",
        desktop: "Supported",
        mobile: "Not Applicable",
        notes: "Optimized coordinate loops using legacy AppKit window hooks."
      },
      {
        browser: "Apple Silicon (macOS 14.0+)",
        version: "Supported",
        desktop: "Supported",
        mobile: "Not Applicable",
        notes: "Native arm64 binary execution running at under 0.05% idle CPU."
      },
      {
        browser: "Multiple Displays",
        version: "Supported",
        desktop: "Supported",
        mobile: "Not Applicable",
        notes: "Notch coordinates alignment automatically coordinates with focused display screens."
      },
      {
        browser: "Dark Mode Theme",
        version: "Supported",
        desktop: "Supported",
        mobile: "Not Applicable",
        notes: "UI theme components match system styling dynamically."
      },
      {
        browser: "Light Mode Theme",
        version: "Supported",
        desktop: "Supported",
        mobile: "Not Applicable",
        notes: "Standard high-contrast text rendering profiles."
      },
      {
        browser: "Reduced Motion Mode",
        version: "Supported",
        desktop: "Supported",
        mobile: "Not Applicable",
        notes: "Spring morph scale switches automatically to simple fade transitions."
      },
      {
        browser: "VoiceOver Accessibility",
        version: "Supported",
        desktop: "Supported",
        mobile: "Not Applicable",
        notes: "Accessibility labels coordinates mapped for all active widget buttons."
      }
    ],
    manualQA: [
      {
        id: "nova-qa-01",
        title: "Notch Position Calibrations",
        status: "Passed",
        notes: "Verifies that notch coordinates calculate correctly on different MacBook display sizes."
      },
      {
        id: "nova-qa-02",
        title: "LLM API Key Keyring Triggers",
        status: "Passed",
        notes: "Confirms credentials load safely from macOS Keychain without exposing plain-text keys."
      },
      {
        id: "nova-qa-03",
        title: "Event Tap Permissions Request",
        status: "Passed",
        notes: "Verifies that the application redirects users to System Preferences Accessibility pane cleanly."
      }
    ],
    risks: [
      {
        id: "nova-risk-01",
        title: "Focus Activation Loop deadlock",
        likelihood: "Low",
        impact: "High",
        mitigation: "Implement non-activating panels avoiding steals.",
        owner: "Window Engineer"
      },
      {
        id: "nova-risk-02",
        title: "LLM API Rate limit blocks",
        likelihood: "Medium",
        impact: "Medium",
        mitigation: "Local Ollama fallback models support.",
        owner: "AI Engineer"
      }
    ],
    releaseChecklist: [
      {
        id: "nova-rel-01",
        title: "Production binaries signed & notarized",
        completed: true,
        notes: "Signed with Apple Developer ID certificate."
      },
      {
        id: "nova-rel-02",
        title: "App Store Sandbox entitlement verified",
        completed: true,
        notes: "Passed local sandboxing checks."
      },
      {
        id: "nova-rel-03",
        title: "H.I.G. Design compliance verified",
        completed: true,
        notes: "Animation spring parameters verified."
      }
    ]
  },
  "study-companion": {
    projectId: "study-companion",
    overview: "Backend testing focusing on stream processing uploads, vector search similarity matching accuracy, JWT-based cookie security, and rate limit gateways.",
    testSuites: [
      {
        id: "study-suite-01",
        title: "Express Gateway API Tests",
        category: "Unit",
        coverage: 91,
        totalTests: 35,
        passedTests: 35,
        failedTests: 0,
        skippedTests: 0,
        technologies: ["Mocha", "Chai", "Supertest"],
        verificationCommand: "npm run test:unit",
        notes: "Verifies JWT sessions verification, API gateway upload rate limits, and PDF file parsing size boundaries."
      },
      {
        id: "study-suite-02",
        title: "Vector Ingestion Pipeline Tests",
        category: "Integration",
        coverage: 87,
        totalTests: 18,
        passedTests: 17,
        failedTests: 0,
        skippedTests: 1,
        technologies: ["Jest", "MongoDB In-Memory Server"],
        verificationCommand: "npm run test:integration",
        notes: "Mock-computes Sentence embedding matrices, tests database indices, and checks document relational updates."
      },
      {
        id: "study-suite-03",
        title: "Complete Dashboard User Journey",
        category: "End-to-End",
        coverage: 80,
        totalTests: 10,
        passedTests: 10,
        failedTests: 0,
        skippedTests: 0,
        technologies: ["Cypress", "Mock LLM endpoint"],
        verificationCommand: "npx cypress run",
        notes: "Simulates user uploading a mock PDF note document, loading concepts maps nodes, and requesting a quiz generation."
      }
    ],
    browserMatrix: [
      {
        browser: "Chrome",
        version: "v126+",
        desktop: "Supported",
        mobile: "Supported",
        notes: "Optimal rendering and similarity map drawing speeds."
      },
      {
        browser: "Firefox",
        version: "v125+",
        desktop: "Supported",
        mobile: "Supported",
        notes: "No rendering issues reported. Grid layout scales correctly."
      },
      {
        browser: "Safari",
        version: "v17+",
        desktop: "Supported",
        mobile: "Supported",
        notes: "GPU acceleration enabled. COS similarity maps render at 60FPS."
      },
      {
        browser: "Edge",
        version: "v126+",
        desktop: "Supported",
        mobile: "Supported",
        notes: "Standard Chromium features support."
      }
    ],
    manualQA: [
      {
        id: "study-qa-01",
        title: "Drag and Drop Course Notes",
        status: "Passed",
        notes: "Verified dropzone handles various document layouts and rejects non-PDF types immediately."
      },
      {
        id: "study-qa-02",
        title: "Theme Toggle Persistence",
        status: "Passed",
        notes: "Ensures selected color schemes persist on database document refresh steps."
      },
      {
        id: "study-qa-03",
        title: "Responsive Canvas Scale checks",
        status: "Passed",
        notes: "Vector maps dynamically contract on small screen bounds without overlapping detail badges."
      }
    ],
    risks: [
      {
        id: "study-risk-01",
        title: "HuggingFace API timeout bottlenecks",
        likelihood: "High",
        impact: "High",
        mitigation: "Local cache backups mapping generated embeddings parameters to avoid query repeats.",
        owner: "Data Engineer"
      },
      {
        id: "study-risk-02",
        title: "Buffer overflow on very large files",
        likelihood: "Medium",
        impact: "High",
        mitigation: "Limits files sizes at gateway layer to 15MB, using stream extraction.",
        owner: "Security Architect"
      }
    ],
    releaseChecklist: [
      {
        id: "study-rel-01",
        title: "API rate limits enabled",
        completed: true,
        notes: "Set to 60 requests/min per IP address."
      },
      {
        id: "study-rel-02",
        title: "Database index maps active",
        completed: true,
        notes: "Indices created on owner user IDs and similarity weights."
      },
      {
        id: "study-rel-03",
        title: "Secrets variables hidden",
        completed: true,
        notes: "Credentials isolated inside production environments."
      }
    ]
  },
  "idp": {
    projectId: "idp",
    overview: "Database migration schema locks, foreign keys integrity, dynamic mobile SVG scaling calculations, and express HR dashboard routing tests.",
    testSuites: [
      {
        id: "idp-suite-01",
        title: "Talent Grid Map Computations",
        category: "Unit",
        coverage: 96,
        totalTests: 50,
        passedTests: 50,
        failedTests: 0,
        skippedTests: 0,
        technologies: ["Jest", "React Testing Library"],
        verificationCommand: "npm run test:unit",
        notes: "Validates 9-Box talent matrix coordinate mapping positions, salary average math, and user filter logic."
      },
      {
        id: "idp-suite-02",
        title: "Prisma Relational Constraints",
        category: "Integration",
        coverage: 92,
        totalTests: 15,
        passedTests: 15,
        failedTests: 0,
        skippedTests: 0,
        technologies: ["Supertest", "Prisma Mock client"],
        verificationCommand: "npm run test:integration",
        notes: "Verifies relational integrity, foreign key cascading deletion steps, and schema migration constraints."
      }
    ],
    browserMatrix: [
      {
        browser: "Chrome",
        version: "v126+",
        desktop: "Supported",
        mobile: "Supported",
        notes: "Fluid vector calculations on responsive dashboards."
      },
      {
        browser: "Firefox",
        version: "v125+",
        desktop: "Supported",
        mobile: "Supported",
        notes: "Sufficient performance bounds."
      },
      {
        browser: "Safari",
        version: "v17+",
        desktop: "Supported",
        mobile: "Supported",
        notes: "Ensured CSS viewport scaling adjustments prevent SVG horizontal clips on Safari."
      },
      {
        browser: "Edge",
        version: "v126+",
        desktop: "Supported",
        mobile: "Supported",
        notes: "Fully supported Chromium standards."
      }
    ],
    manualQA: [
      {
        id: "idp-qa-01",
        title: "HR Filters toggling",
        status: "Passed",
        notes: "Selecting specific employee departments updates active employee markers instantly."
      },
      {
        id: "idp-qa-02",
        title: "Employee details drawer display",
        status: "Passed",
        notes: "Selecting employee node slides in employee panel smoothly without breaking viewport focus."
      },
      {
        id: "idp-qa-03",
        title: "SQLite seeding test sequences",
        status: "Passed",
        notes: "Checked databases seeding inserts employees records in correct sequential relational orders."
      }
    ],
    risks: [
      {
        id: "idp-risk-01",
        title: "SQLite file locks concurrency bottlenecks",
        likelihood: "Medium",
        impact: "Medium",
        mitigation: "Strict WAL (Write-Ahead Logging) database execution configuration setups.",
        owner: "Database Architect"
      },
      {
        id: "idp-risk-02",
        title: "Layout clipping on narrow viewports",
        likelihood: "Low",
        impact: "Medium",
        mitigation: "Configure fluid viewBox values on all dynamic SVG graphics nodes.",
        owner: "Frontend Lead"
      }
    ],
    releaseChecklist: [
      {
        id: "idp-rel-01",
        title: "Prisma schema migrations locked",
        completed: true,
        notes: "Schema structure tagged and migrated successfully."
      },
      {
        id: "idp-rel-02",
        title: "SQLite db path verified",
        completed: true,
        notes: "Database path parameters set correctly inside env configurations."
      },
      {
        id: "idp-rel-03",
        title: "HR manager role validations active",
        completed: true,
        notes: "Checked credential validation rules for critical admin paths."
      }
    ]
  },
  "portfolio": {
    projectId: "portfolio",
    overview: "Static bundling footprint limits, responsive WebGL canvas head-tracking triggers, GSAP scroll sliders transitions, and accessibility compliance.",
    testSuites: [
      {
        id: "port-suite-01",
        title: "Component Rendering Tests",
        category: "Unit",
        coverage: 95,
        totalTests: 15,
        passedTests: 15,
        failedTests: 0,
        skippedTests: 0,
        technologies: ["Vitest", "React Testing Library"],
        verificationCommand: "npm run test",
        notes: "Verifies React context managers loading, Navbar visibility states, and Project Explorer detail panels renders."
      },
      {
        id: "port-suite-02",
        title: "Accessibilityaxe Compliance",
        category: "Accessibility",
        coverage: 100,
        totalTests: 12,
        passedTests: 12,
        failedTests: 0,
        skippedTests: 0,
        technologies: ["axe-core", "Lighthouse accessibility checks"],
        verificationCommand: "npm run test:a11y",
        notes: "Ensures contrast compliance ratios are met, keyboard tab focus indicators are visible, and ARIA labels are active."
      },
      {
        id: "port-suite-03",
        title: "Initial bundle load limits",
        category: "Performance",
        coverage: 90,
        totalTests: 3,
        passedTests: 3,
        failedTests: 0,
        skippedTests: 0,
        technologies: ["Lighthouse metrics", "Vite build reports"],
        verificationCommand: "npm run build && node scripts/check_bundle.js",
        notes: "Verifies that initial chunk assets stay under 1MB limits and dynamic modules code-split properly."
      }
    ],
    browserMatrix: [
      {
        browser: "Chrome",
        version: "v126+",
        desktop: "Supported",
        mobile: "Supported",
        notes: "Optimal Three.js avatar rendering speed and click coordination mapping."
      },
      {
        browser: "Firefox",
        version: "v125+",
        desktop: "Supported",
        mobile: "Supported",
        notes: "Ensured CSS relative coordinates offsets line up with target pointer events."
      },
      {
        browser: "Safari",
        version: "v17+",
        desktop: "Supported",
        mobile: "Supported",
        notes: "GPU acceleration enabled. GSAP timelines translate panels smoothly without reflow lags."
      },
      {
        browser: "Edge",
        version: "v126+",
        desktop: "Supported",
        mobile: "Supported",
        notes: "Standard Chromium features support."
      }
    ],
    manualQA: [
      {
        id: "port-qa-01",
        title: "Recruiter Panel Toggle trigger",
        status: "Passed",
        notes: "Slide animations enter smoothly and focus shifts cleanly to details forms inputs."
      },
      {
        id: "port-qa-02",
        title: "Three.js fallback checks",
        status: "Passed",
        notes: "Disabling WebGL renders clean static avatar graphics cards without breaking layout flows."
      },
      {
        id: "port-qa-03",
        title: "Responsive layout wraps",
        status: "Passed",
        notes: "Double checked layout columns wrap clean on small screens down to 320px wide."
      }
    ],
    risks: [
      {
        id: "port-risk-01",
        title: "WebGL context crash under memory stress",
        likelihood: "Low",
        impact: "High",
        mitigation: "Listens for webglcontextlost events to free resources and fall back to static image assets.",
        owner: "Graphics Lead"
      },
      {
        id: "port-risk-02",
        title: "GSAP scroll triggers lagging on safari mobile",
        likelihood: "Medium",
        impact: "Medium",
        mitigation: "Forced transform hardware acceleration overrides on interactive panels scroll areas.",
        owner: "Frontend Lead"
      }
    ],
    releaseChecklist: [
      {
        id: "port-rel-01",
        title: "Production build compiles",
        completed: true,
        notes: "Vite build outputs files cleanly."
      },
      {
        id: "port-rel-02",
        title: "Lighthouse audit >95%",
        completed: true,
        notes: "Achieved 98% SEO, 100% accessibility, and 96% performance."
      },
      {
        id: "port-rel-03",
        title: "Axe compliance checked",
        completed: true,
        notes: "Zero accessibility violations found on dynamic pages."
      }
    ]
  }
};

// Helper function to resolve testing strategies by project name or stable ID mapping
export const getTestingStrategy = (name: string): TestingStrategy | undefined => {
  const norm = name.toLowerCase();
  if (norm.includes("island")) return testingStrategies["novaisland"];
  if (norm.includes("companion")) return testingStrategies["study-companion"];
  if (norm.includes("platform") || norm.includes("idp")) return testingStrategies["idp"];
  if (norm.includes("portfolio")) return testingStrategies["portfolio"];
  return undefined;
};
