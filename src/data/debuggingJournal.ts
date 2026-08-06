import { DebuggingJournal, DebuggingEntry } from "../types";

export const debuggingJournals: Record<string, DebuggingJournal> = {
  "novaisland": {
    projectId: "novaisland",
    title: "NovaIsland Core Debugging Logs",
    entries: [
      {
        id: "nova-debug-01",
        title: "NSPanel activation conflicts and active key window steals",
        severity: "Critical",
        status: "Resolved",
        problem: "Clicking text inputs inside the hover panel steals active focus from the parent macOS app, causing active text selections to break.",
        symptoms: "Parent window applications (e.g. Xcode, Chrome) lose active key status, active inputs lose cursor focus, and the Dynamic Island window becomes the primary key window.",
        investigation: "Hooked into NSApplicationDelegate window events. Discovered that the style mask `.nonactivatingPanel` is overridden when active text fields call `becomeFirstResponder`.",
        rootCause: "An incorrect window subclass initialization. SwiftUI text fields force the host NSPanel to capture key status to handle keystrokes, which breaks standard global helper overlays behavior.",
        solution: "Implemented custom AppKit text field subclasses overriding acceptsFirstResponder and managing key status through an independent helper window host.",
        prevention: "Added automated focus tracking scripts checking active parent key status on click.",
        impact: "Zero parent window focus steals and seamless keyboard input routing into Ollama chat widget.",
        timeSpent: "16 Hours",
        technologies: ["AppKit", "NSPanel", "SwiftUI"],
        tags: ["Window Management", "First Responder", "macOS Focus"],
        date: "Mar 10, 2026",
        category: "Frontend",
        difficulty: "Hard",
        resolvedInVersion: "v1.0.4",
        verification: "Automated integration scripts checking active parent app key state on panel clicks."
      },
      {
        id: "nova-debug-02",
        title: "SwiftUI notch spring morphing alignment offset glitches",
        severity: "Medium",
        status: "Resolved",
        problem: "Expanding widgets causes the dynamic island frame to misalign from the MacBook notch center line, causing visual layout offsets.",
        symptoms: "Expanding the calendar or clipboard widget results in a 1px to 2px offset layout jitter, breaking symmetry with the physical camera housing.",
        investigation: "Recorded frame redraw ticks during morph animations. Found that core window coordinate conversions in NSScreen use floating float metrics, whereas physical notch bounds are integer pixels.",
        rootCause: "Rounding errors during coordinate translation between SwiftUI point systems and AppKit pixel screens.",
        solution: "Implemented custom coordinates rounding extensions forcing all frame calculations to align strictly to even integer boundaries.",
        prevention: "Wrote unit tests validating screen resolution translation bounds.",
        impact: "Symmetrical spring transitions on expansions without pixel layout jitter.",
        timeSpent: "8 Hours",
        technologies: ["SwiftUI", "AppKit", "NSScreen"],
        tags: ["Animation", "Spring Physics", "Coordinate Systems"],
        date: "Mar 18, 2026",
        category: "Frontend",
        difficulty: "Medium",
        resolvedInVersion: "v1.0.8",
        verification: "Standard coordinates bounds checks and manual visual verification on multiple screens."
      },
      {
        id: "nova-debug-03",
        title: "Global accessibility API permissions checks fail on warm restart",
        severity: "High",
        status: "Resolved",
        problem: "The application fails to detect active accessibility permission authorization on restart, prompting the user repeatedly.",
        symptoms: "System queries report AXIsProcessTrusted() == false even when NovaIsland is checked in macOS Security & Privacy preferences.",
        investigation: "Audited active bundle signature hashes on runtime. Discovered that the app binary signature changes when temporary debug certificates are updated during updates.",
        rootCause: "macOS TCC (Transparency, Consent, and Control) invalidates permissions registers if the binary bundle signature changes.",
        solution: "Configured developer signature certificate pinning in Build Settings, ensuring consistent cryptographic signing on restarts.",
        prevention: "Configured automated shell checks validating signature hashes during CI builds.",
        impact: "Eliminated prompt loops for local testers and developers.",
        timeSpent: "12 Hours",
        technologies: ["Swift 6", "macOS TCC", "Signing Certificates"],
        tags: ["Security", "Permissions", "Accessibility APIs"],
        date: "Apr 02, 2026",
        category: "Accessibility",
        difficulty: "Hard",
        resolvedInVersion: "v1.1.2",
        verification: "Automated check verifying AXIsProcessTrusted() resolves true across application restarts."
      }
    ]
  },
  "study-companion": {
    projectId: "study-companion",
    title: "AI Study Companion Debugging Logs",
    entries: [
      {
        id: "study-debug-01",
        title: "Node.js Buffer overflow on processing large syllabi notes",
        severity: "High",
        status: "Resolved",
        problem: "The Express web server crashes when a user uploads PDFs larger than 15MB.",
        symptoms: "API gateway returns a 502 Bad Gateway response, and terminal outputs an 'Out of Memory: Javascript Heap Limit' crash message.",
        investigation: "Analyzed memory footprints using node-inspector during parser actions. Found that the text-extractor loaded the entire file buffer into memory synchronously, holding all parsed tokens in active memory.",
        rootCause: "Processing the entire PDF document buffer in a single synchronous function call without streaming or garbage collection intervals.",
        solution: "Refactored the parser to use Node.js streams and process the PDF page-by-page. Parsed text chunks are written to disk storage before embedding.",
        prevention: "Added file upload size validation limits at the API gateway tier and integrated stream parsing pipelines.",
        impact: "Express server memory consumption remains stable under 150MB, allowing simultaneous processing of documents up to 50MB.",
        timeSpent: "10 Hours",
        technologies: ["Node.js", "Express", "Streams API"],
        tags: ["Buffer Overflow", "Memory Leak", "Streams"],
        date: "Apr 18, 2026",
        category: "Infrastructure",
        difficulty: "Hard",
        relatedDecisionId: "companion-db-cache",
        resolvedInVersion: "v1.2.0",
        relatedMetricId: "companion-metric-memory",
        verification: "Memory profile traces using Chrome DevTools with mock PDF payloads up to 40MB.",
        references: ["companion-db-cache"]
      },
      {
        id: "study-debug-02",
        title: "Embedding lookup lag during concurrent study searches",
        severity: "High",
        status: "Resolved",
        problem: "Similarity matching queries take up to 8 seconds when multiple users search skills maps simultaneously.",
        symptoms: "Frontend cards display infinite loading circles, and HTTP connection timeout warnings are logged at the API layer.",
        investigation: "Audited database metrics. Identified that Sentence-Transformer calculations were blocking the Node event loop, causing queries to stack up sequentially.",
        rootCause: "Executing CPU-heavy vector calculations in Node's main single-threaded execution loop without multi-processing delegates.",
        solution: "Migrated the similarity calculation calculations to a separate background child process in Express using worker threads.",
        prevention: "Configured connection pools and cached calculated similarity matrices in MongoDB documents.",
        impact: "Query response latency was reduced from 8,200ms to 45ms, and the API throughput capacity was increased by 10x.",
        timeSpent: "18 Hours",
        technologies: ["Node.js Worker Threads", "MongoDB Indexing", "Python Server"],
        tags: ["Latency", "Event Loop", "Worker Threads"],
        date: "May 02, 2026",
        category: "Performance",
        difficulty: "Hard",
        relatedDecisionId: "companion-embeddings",
        resolvedInVersion: "v1.3.1",
        relatedMetricId: "companion-metric-latency",
        verification: "Benchmarked using Autocannon load testing scripts simulating 50 concurrent query users.",
        references: ["companion-embeddings"]
      }
    ]
  },
  "idp": {
    projectId: "idp",
    title: "Intelligent Development Platform Debugging Logs",
    entries: [
      {
        id: "idp-debug-01",
        title: "SVG clipping issues on mobile safari viewports",
        severity: "Medium",
        status: "Resolved",
        problem: "The interactive 9-Box SVG grid gets cropped horizontally on iPhones and iPads.",
        symptoms: "The right-most employee grids and details buttons are inaccessible, and the viewport scroll locks up.",
        investigation: "Inspected layouts using Safari Web Inspector. Discovered that the SVG had static width and height attributes that failed to scale with standard CSS relative bounds.",
        rootCause: "The SVG used `width='600' height='400'` attributes instead of using a fluid responsive `viewBox` combined with CSS relative width percentage tags.",
        solution: "Replaced static dimensions with a responsive `viewBox='0 0 600 400'` and styled the element with `width: 100%; height: auto;` in the stylesheet.",
        prevention: "Set responsive styling checks as a build lint rule and verified viewport layouts across multiple device presets.",
        impact: "Achieved 100% fluid vector scaling on all screens down to 320px wide without clipping layout sections.",
        timeSpent: "4 Hours",
        technologies: ["HTML5 SVG", "CSS relative styles", "Safari Web Inspector"],
        tags: ["SVG clipping", "Responsive Layout", "Mobile Viewport"],
        date: "Jun 14, 2026",
        category: "Accessibility",
        difficulty: "Easy",
        relatedDecisionId: "idp-svg-render",
        resolvedInVersion: "v1.1.2",
        relatedMetricId: "idp-metric-scaling",
        verification: "Cross-device manual testing using BrowserStack simulation profiles.",
        references: ["idp-svg-render"]
      },
      {
        id: "idp-debug-02",
        title: "Prisma schema relation constraints violations on seed",
        severity: "High",
        status: "Resolved",
        problem: "Database seeding crashes when inserting mock skills inventories records.",
        symptoms: "Prisma Client returns a 'P2003 Foreign key constraint failed' migration error during script executions.",
        investigation: "Traced the mock dataset generation loops. Found that the seeding script attempted to insert employee skills evaluations before parent employee user records were generated.",
        rootCause: "Asynchronous mock data generation did not guarantee sequential insertion order for foreign-key relational databases.",
        solution: "Wrapped the data seeding script in a sequential `async/await` transaction promise chain, seeding employee records first before skills models.",
        prevention: "Integrated database-level relational seeding scripts using transaction steps to prevent orphaned record crashes.",
        impact: "Seeding script runs smoothly under 2 seconds without database integrity failures.",
        timeSpent: "5 Hours",
        technologies: ["Prisma ORM", "SQLite Database", "TypeScript"],
        tags: ["Foreign Key", "Database Seeding", "Asynchronous Promise"],
        date: "Jun 28, 2026",
        category: "Database",
        difficulty: "Medium",
        relatedDecisionId: "idp-orm-relational",
        resolvedInVersion: "v1.1.5",
        relatedMetricId: "idp-metric-integrity",
        verification: "Executed seed reset command CLI sequences validation loops.",
        references: ["idp-orm-relational"]
      }
    ]
  },
  "portfolio": {
    projectId: "portfolio",
    title: "Portfolio WebGL & Scroll Debugging Logs",
    entries: [
      {
        id: "portfolio-debug-01",
        title: "WebGL head-tracking canvas overlap with header menu",
        severity: "High",
        status: "Resolved",
        problem: "Recruiters cannot click mobile navigation links when the Three.js canvas layer is active.",
        symptoms: "Clicking the mobile navbar hamburger triggers mouse coordinate rotations in the Three.js avatar instead of opening the menu.",
        investigation: "Inspected pointer-events properties on the canvas overlay container. Found that the WebGL canvas div had a z-index of 999 which masked navbar link elements.",
        rootCause: "Lack of z-index stacking variables and improper placement of the WebGL canvas inside the DOM tree relative to overlay layers.",
        solution: "Structured standard CSS stacking variables, mounted overlay modals inside React Portals outside the root container, and set `pointer-events: none` on the canvas overlay.",
        prevention: "Mandated standard CSS z-index variables and isolated canvas events triggers in separate wrappers.",
        impact: "Resolved overlay click blocking issues and restored 100% accessibility to navigation elements.",
        timeSpent: "8 Hours",
        technologies: ["Three.js WebGL", "CSS pointer-events", "React Portals"],
        tags: ["Z-Index Overlap", "Event Bubbling", "Layering"],
        date: "Jul 15, 2026",
        category: "Frontend",
        difficulty: "Medium",
        relatedDecisionId: "portfolio-z-index",
        resolvedInVersion: "v2.0.2",
        relatedMetricId: "portfolio-metric-zindex",
        verification: "Manual accessibility audits and device taps check on pointer coordinates.",
        references: ["portfolio-z-index"]
      },
      {
        id: "portfolio-debug-02",
        title: "WebGL frame drops during panel slide-in timelines",
        severity: "High",
        status: "Resolved",
        problem: "The 3D model stutter-lags when the recruiter toggle panel slides in.",
        symptoms: "Framerate drops from 60FPS to 32FPS during panel entrances on Safari browsers.",
        investigation: "Profiled rendering pipelines using Chrome DevTools Performance tab. Found that the slide-in animation animated CSS `width` and `left` properties, triggering browser layout reflow calculations on every frame.",
        rootCause: "Animating CSS layout properties (`width`, `left`, `margin`) forcing the browser to recalculate the position of all DOM nodes during animations.",
        solution: "Refactored the panel slide GSAP timeline to use CSS `transform: translateX()` and `opacity` properties, which run on GPU threads.",
        prevention: "Established design directives prohibiting the animation of layout properties, enforcing transform animations.",
        impact: "Maintained constant 60FPS animations on panel slide-in timelines across Safari and Chrome mobile browsers.",
        timeSpent: "12 Hours",
        technologies: ["Chrome DevTools", "GSAP timelines", "CSS GPU hardware acceleration"],
        tags: ["Frame Drops", "Reflow/Repaint", "GSAP Optimization"],
        date: "Jul 28, 2026",
        category: "Performance",
        difficulty: "Hard",
        relatedDecisionId: "portfolio-portals",
        resolvedInVersion: "v2.0.5",
        relatedMetricId: "portfolio-metric-fps",
        verification: "Performance profiling using Chrome rendering panel tools tracking frame rate grids.",
        references: ["portfolio-portals"]
      }
    ]
  }
};

// Helper function to resolve debugging journals by project name or stable ID mapping
export const getJournalByProjectName = (name: string): DebuggingJournal | undefined => {
  const norm = name.toLowerCase();
  if (norm.includes("island")) return debuggingJournals["novaisland"];
  if (norm.includes("companion")) return debuggingJournals["study-companion"];
  if (norm.includes("platform") || norm.includes("idp")) return debuggingJournals["idp"];
  if (norm.includes("portfolio")) return debuggingJournals["portfolio"];
  return undefined;
};

// Helper to retrieve debug entries directly by stable project ID
export const getDebugEntries = (projectId: string): DebuggingEntry[] => {
  const journal = debuggingJournals[projectId];
  return journal ? journal.entries : [];
};
