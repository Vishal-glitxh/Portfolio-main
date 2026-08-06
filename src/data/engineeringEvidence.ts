import { EngineeringEvidence } from "../types";

export const engineeringEvidenceData: Record<string, EngineeringEvidence> = {
  "NovaIsland": {
    id: "novaisland",
    recruiterSummary: "NovaIsland is a native macOS application engineered using SwiftUI, AppKit, Swift Concurrency, and modular engine-driven architecture to create an intelligent productivity layer around the MacBook notch.",
    engineeringDecisions: [
      {
        decision: "Subclassing NSPanel for System Overlay",
        context: "Positioning the floating island above full-screen apps and system spaces without stealing focus.",
        reason: "NSPanel subclassing with `.nonactivatingPanel` style mask allows rendering components on status bar layers while maintaining active parent app input focus.",
        alternatives: "Standard NSWindow (steals parent cursor focus), MenuBar Extra overlay (restricted coordinate alignment).",
        tradeoffs: "Requires bridging AppKit event trackers into SwiftUI environment hooks, but guarantees standard desktop overlay behavior.",
        outcome: "Delivered a floating dynamic bar that works over full-screen apps and slides out cleanly on gesture hover."
      },
      {
        decision: "Swift Actors for Concurrency Isolation",
        context: "Sharing active clipboard histories, settings models, and LLM streaming queues safely across thread loops.",
        reason: "Swift Actors enforce compile-time state isolation, eliminating data race conditions and memory safety bugs without mutex locks overhead.",
        alternatives: "Concurrent GCD queues with barrier flags, manual NSLocking blocks (risk of deadlocks).",
        tradeoffs: "Forces all accesses to actor states to execute asynchronously, slightly increasing boilerplate coding contexts.",
        outcome: "Completely eliminated multithreaded crash loops during rapid state refreshes and local AI streams."
      }
    ],
    challenges: [
      {
        problem: "Notch window steals system key responder focus",
        rootCause: "SwiftUI TextFields force parent window frames to capture key status to process keystrokes.",
        solution: "Overrode NSPanel's `acceptsFirstResponder` and managed key loop activation triggers dynamically via local app delegates.",
        technicalLearning: "Custom first responder chains are necessary when mixing SwiftUI inputs inside AppKit panels.",
        futurePrevention: "Utilize system-level keyboard event taps to route key strokes into localized text models directly."
      },
      {
        problem: "Layout jitter during spring morph animations",
        rootCause: "Rounding errors during floating point coordinates translation between SwiftUI views and physical screen pixel bounds.",
        solution: "Configured custom layout constraints rounding all calculated dimensions to even integer pixels.",
        technicalLearning: "Floating points layout conversions cause sub-pixel rendering bugs on high-DPI displays.",
        futurePrevention: "Enforce strict layout metrics bounds inside custom view builders."
      }
    ],
    tradeoffs: [
      {
        factor: "Native code vs Web App stack",
        chosen: "SwiftUI and AppKit native macOS libraries.",
        alternative: "Electron background bundle.",
        rationale: "Ensures the utility consumes minimal memory (12MB vs 100MB+ in Electron) and preserves laptop battery health."
      }
    ],
    metrics: [
      { label: "Target Startup Time", value: 20, unit: "ms", highlight: true },
      { label: "Expected Memory Budget", value: 15, unit: "MB", highlight: true },
      { label: "Design Goal FPS", value: 60, unit: "FPS", highlight: true },
      { label: "Target Response Time", value: 1, unit: "ms" },
      { label: "Primary Language", value: "Swift" }
    ],
    deployment: [
      { name: "Window Frame", technology: "NSPanel Bridge", category: "Client", status: "Active" },
      { name: "Interactive UI", technology: "SwiftUI Declarative", category: "Frontend", status: "Active" },
      { name: "AI Core Client", technology: "Local Ollama API", category: "AI Service", status: "Active" },
      { name: "Settings Store", technology: "UserDefaults API", category: "Backend", status: "Active" }
    ],
    timeline: [
      { phase: "Research", date: "Jan 2026", description: "Project setup, folder architecture, and AppKit NSPanel window subclassing research.", status: "Completed" },
      { phase: "Prototype", date: "Feb 2026", description: "Built floating island frame, hover boundary coordinates, and key shortcut taps.", status: "Completed" },
      { phase: "MVP", date: "Mar 2026", description: "Implemented spring physics morphing and dynamic screen resizing transitions.", status: "Completed" },
      { phase: "Current", date: "Active", description: "Refining Widget Conformance protocols, active registrations, and rendering loops.", status: "In Progress" }
    ],
    roadmap: [
      { title: "Voice Assistant Automation", priority: "High", status: "Planned", estimatedVersion: "v1.2", description: "Route voice intents to local Whisper models for desktop task execution." },
      { title: "Widget Plugin SDK", priority: "Medium", status: "Planned", estimatedVersion: "v1.1", description: "Open public Swift protocol libraries allowing custom third-party widgets." }
    ],
    interviewQuestions: [
      {
        question: "Why choose native SwiftUI/AppKit libraries over Electron?",
        answer: "Native development is crucial for desktop utility programs executing 24/7. Electron packages ship a full Node runtime and Chromium engine, costing 100MB+ RAM and draining laptop battery. Native AppKit runs under 12MB RAM and has direct access to low-level accessibility permissions and system status monitors."
      }
    ],
    lessonsLearned: [
      "Custom first responder loops are necessary to handle interactive inputs inside non-activating panels.",
      "Keeping database keys and token configs locked in macOS Keychain prevents plain-text exposures."
    ],
    keyAchievements: [
      "Engineered an overlay notch window that floating-translates over full-screen spaces without focus steals.",
      "Achieved constant 60FPS spring morphs utilizing native Core Animation loops."
    ],
    references: ["Apple Human Interface Guidelines", "SwiftUI Core Animation Docs"]
  },
  "AI Study Companion": {
    id: "studycompanion",
    recruiterSummary: "An NLP-powered document semantic match system predicting preparation topics using sentence-transformer vector similarities.",
    engineeringDecisions: [
      {
        decision: "Sentence-Transformer semantic embeddings",
        context: "Parsing raw PDF course notes and matching them to curriculum requirements.",
        reason: "Sentence embeddings capture conceptual semantics and synonyms, whereas keyword TF-IDF matches fail on varied vocabulary.",
        alternatives: "TF-IDF matching matrices, OpenAI text-embedding APIs.",
        tradeoffs: "Local model parsing takes more memory, but keeps the system offline, free, and secure from external leaks.",
        outcome: "Achieved conceptual overlap matching ratings with an accuracy rate of >85%."
      },
      {
        decision: "MongoDB Document Schema",
        context: "Caching similarity scores and practice exam questions.",
        reason: "NoSQL document models naturally fit nested question cards and dynamic vector matrices.",
        alternatives: "PostgreSQL relational columns, JSON file caches.",
        tradeoffs: "Sacrifices relational join speed for faster document indexing and schemas flexibility.",
        outcome: "Reduced question query times to under 10ms for active courses."
      }
    ],
    challenges: [
      {
        problem: "Main-thread blocking during document tokenization",
        rootCause: "Parsing large text documents synchronously on the primary Express thread.",
        solution: "Configured child-process workers in Node.js. Document chunks are handed off to background threads, keeping the API responsive.",
        technicalLearning: "Heavy CPU tasks must be isolated from API route threads in Javascript servers.",
        futurePrevention: "Migrate document tokenization directly to a dedicated Python microservice worker."
      }
    ],
    tradeoffs: [
      {
        factor: "Model hosting cost vs latency",
        chosen: "Local model running on CPU.",
        alternative: "Cloud hosting with GPU.",
        rationale: "Keeps operational costs zero for student users, accepting a slight 2s warm-up lag during PDF ingestion."
      }
    ],
    metrics: [
      { label: "Development Duration", value: 4, unit: "Months", highlight: true },
      { label: "Semantic Accuracy", value: 85, unit: "%", highlight: true },
      { label: "Query Latency", value: 10, unit: "ms", highlight: true },
      { label: "Embeddings Dims", value: 768, unit: "float" },
      { label: "Primary Languages", value: "Python, JS" }
    ],
    deployment: [
      { name: "Browser Client", technology: "React UI", category: "Frontend", status: "Active" },
      { name: "API Gateway", technology: "Express / Node", category: "Backend", status: "Active" },
      { name: "Similarity Engine", technology: "Sentence-Transformers", category: "AI Service", status: "Active" },
      { name: "NoSQL DB", technology: "MongoDB", category: "Database", status: "Active" }
    ],
    timeline: [
      { phase: "Research", date: "Mar 2026", description: "Evaluated Sentence-Transformers and cosine similarity matching models.", status: "Completed" },
      { phase: "Architecture", date: "Apr 2026", description: "Designed MongoDB collections schema and child-process web models.", status: "Completed" },
      { phase: "MVP", date: "May 2026", description: "Launched web interface supporting course note uploads and question prep cards.", status: "Completed" }
    ],
    roadmap: [
      { title: "Local LLM Summaries", priority: "High", status: "Planned", estimatedVersion: "v2.0", description: "Integrate a local Llama model to generate contextual question summaries." },
      { title: "Multi-Format Uploader", priority: "Low", status: "In Progress", estimatedVersion: "v1.5", description: "Extend parser to support PPTX, DOCX, and audio transcribing." }
    ],
    interviewQuestions: [
      {
        question: "Why did you use local Sentence-Transformers instead of OpenAI Embeddings?",
        answer: "Local models keep student course data secure, eliminate external API fees, and enable completely offline operations, while still providing 85% accuracy on semantic match maps."
      }
    ],
    lessonsLearned: [
      "Document chunking requires sliding windows to avoid losing context on sentence boundaries.",
      "MongoDB document indices must be carefully indexed on course ids to maintain low latency."
    ],
    keyAchievements: [
      "Configured a local NLP parser that maps semantic matches under 2 seconds.",
      "Designed a complete MongoDB schema caching 10,000+ similarity index nodes."
    ],
    references: ["HuggingFace Transformers", "MongoDB Indexing Guidelines"]
  },
  "Intelligent Development Platform (IDP)": {
    id: "devplatform",
    recruiterSummary: "An employee assessment platform visualizing technical workforce capability matrices using custom SVG 9-Box grids.",
    engineeringDecisions: [
      {
        decision: "SQLite relational storage with Prisma ORM",
        context: "Modeling relationships between employee profiles, skills inventories, and recommended coursework.",
        reason: "Relational constraints guarantee referential integrity; employee metrics must always map to actual skills nodes.",
        alternatives: "MongoDB JSON structures, JSON files.",
        tradeoffs: "Prisma schema migrations add build steps, but prevent orphaned records and schema drift.",
        outcome: "Maintained 100% database schema consistency across updates."
      },
      {
        decision: "SVG-based 9-Box matrix rendering",
        context: "Visualizing 500+ developer placements dynamically on a dashboard grid.",
        reason: "SVGs render crisp layouts at any resolution and let us bind React events directly to vector blocks without heavy HTML templates.",
        alternatives: "HTML Grid layouts, Canvas renderings.",
        tradeoffs: "Requires manual coordinate math to position nodes, but provides smooth interactions and lightweight DOM weights.",
        outcome: "Rendered hundreds of employee nodes instantly with zero animation lag."
      }
    ],
    challenges: [
      {
        problem: "Slow 9-Box grid updates on large datasets",
        rootCause: "Recalculating employee score vectors on every react state change.",
        solution: "Implemented memoization inside the dashboard container. Scores are cached and update only when database records mutate.",
        technicalLearning: "React hook useMemo prevents redundant vector computations on static datasets.",
        futurePrevention: "Move aggregates calculations to database views rather than doing them in application layers."
      }
    ],
    tradeoffs: [
      {
        factor: "Database engine choice",
        chosen: "SQLite for local database runs.",
        alternative: "PostgreSQL database server.",
        rationale: "Ensures the application setup has zero dependencies, making it simple to run and preview locally."
      }
    ],
    metrics: [
      { label: "Development Duration", value: 5, unit: "Months", highlight: true },
      { label: "Placements Latency", value: 2, unit: "ms", highlight: true },
      { label: "Referential Integrity", value: 100, unit: "%" },
      { label: "Grid Capacities", value: 500, unit: "nodes" },
      { label: "Database Engine", value: "SQLite / Prisma" }
    ],
    deployment: [
      { name: "SVG Grid View", technology: "React / HTML5", category: "Frontend", status: "Active" },
      { name: "API Service", technology: "Node / Express", category: "Backend", status: "Active" },
      { name: "Relational DB", technology: "SQLite / Prisma", category: "Database", status: "Active" }
    ],
    timeline: [
      { phase: "Research", date: "May 2026", description: "Studied 9-Box talent matrix specifications and competency vectors.", status: "Completed" },
      { phase: "MVP", date: "Jun 2026", description: "Built Node.js APIs and visual SVG dashboard rendering developer placements.", status: "Completed" },
      { phase: "Current", date: "Jul 2026", description: "Integrating personalized training recommendations based on skills gaps.", status: "In Progress" }
    ],
    roadmap: [
      { title: "Predictive Analytics", priority: "High", status: "Planned", estimatedVersion: "v1.5", description: "Integrate predictive algorithms to forecast workforce skills shortages over a 12-month track." },
      { title: "Active Directory Sync", priority: "Low", status: "Planned", estimatedVersion: "v2.0", description: "Support automated employee profile synchronization using standard AD frameworks." }
    ],
    interviewQuestions: [
      {
        question: "How did you ensure data integrity in the employee skills mappings?",
        answer: "By setting SQLite foreign key constraints through Prisma ORM schemas. This ensures skills entries cannot exist without a valid parent developer profile and a skill name."
      }
    ],
    lessonsLearned: [
      "Prisma relations significantly simplify query logic compared to writing raw SQL joins.",
      "SVG graphics are easier to make keyboard accessible than canvas elements because they exist in the DOM."
    ],
    keyAchievements: [
      "Engineered an interactive SVG 9-Box visualizer plotting 500+ nodes.",
      "Maintained 100% referential integrity between employee metrics and learning recommendations."
    ],
    references: ["Prisma Schema Guides", "SVG accessibility standards"]
  },
  "Personal Portfolio": {
    id: "personalportfolio",
    recruiterSummary: "An interactive portfolio utilizing React Three Fiber WebGL layers and GSAP ScrollSmoother animations code-split inside React Portals.",
    engineeringDecisions: [
      {
        decision: "React Portal lazy-loading for Panels",
        context: "Rending large recruiter-focused panels and project visualizers above WebGL layers.",
        reason: "Mounting overlays in React Portals keeps the DOM tree clean and separates overlay clicks from Three.js scene triggers.",
        alternatives: "Conditionally rendered inline divs, Multi-page static sites.",
        tradeoffs: "Adds lazy-load boundary checks, but maintains a minimal initial page size for instant loading.",
        outcome: "Initial page bundle remains under 1MB, ensuring fast load times on mobile viewports."
      },
      {
        decision: "CSS Custom Stacking Scale",
        context: "Managing layers between Three.js canvas, fixed header navigation, and Recruiter console overlays.",
        reason: "Standardizing z-indices inside CSS variables prevents layout overlap bugs and guarantees recruiter panels sit on top.",
        alternatives: "Arbitrary z-index overrides inside selectors.",
        tradeoffs: "Requires strict adherence to variables in CSS selectors, but prevents layout issues.",
        outcome: "Resolved z-index issues and consolidated navbar controls under a single index scale."
      }
    ],
    challenges: [
      {
        problem: "Three.js rendering lag on mobile safari",
        rootCause: "Overhead from running full-resolution lighting calculations on small screens.",
        solution: "Configured dynamic camera zoom adjustments and deactivated heavy shadows on viewports under 768px wide.",
        technicalLearning: "Rendering properties must be scaled down dynamically on mobile to preserve constant framerates.",
        futurePrevention: "Pre-bake avatar model shadows inside textures to bypass real-time computations entirely."
      }
    ],
    tradeoffs: [
      {
        factor: "Visual depth vs initial loading speed",
        chosen: "Code-split all panels and lazy-load them on click.",
        alternative: "Bundle all details panels into a single JS file.",
        rationale: "Keeps initial load times fast, deferring heavy panels assets until the user requests them."
      }
    ],
    metrics: [
      { label: "Development Duration", value: 2, unit: "Months", highlight: true },
      { label: "Frame Rate", value: 60, unit: "FPS", highlight: true },
      { label: "Initial load JS", value: 966, unit: "kB", highlight: true },
      { label: "Initial load CSS", value: 37, unit: "kB" },
      { label: "Z-Index Hierarchy Layers", value: 7, unit: "layers" }
    ],
    deployment: [
      { name: "Edge Router", technology: "CDN edge servers", category: "Cloud", status: "Active" },
      { name: "Page Client", technology: "React SPA / R3F", category: "Frontend", status: "Active" },
      { name: "3D mesh Core", technology: "GLTF Bone Controllers", category: "Client", status: "Active" }
    ],
    timeline: [
      { phase: "Research", date: "Jul 2026", description: "Analyzed GLTF character rigs, mouse tracking coordinate systems, and GSAP ScrollSmoother plugins.", status: "Completed" },
      { phase: "MVP", date: "Jul 2026", description: "Built Three.js character tracking and horizontal scrolling work sections.", status: "Completed" },
      { phase: "Current", date: "Aug 2026", description: "Optimizing code-split chunks and integrating engineering evidence layers.", status: "In Progress" }
    ],
    roadmap: [
      { title: "Draco Mesh Compression", priority: "Medium", status: "Planned", estimatedVersion: "v2.1", description: "Compress GLTF meshes using Draco encoders to reduce asset download payloads by >50%." },
      { title: "Interactive Chatbot", priority: "High", status: "Planned", estimatedVersion: "v2.2", description: "Embed local conversational agents trained on my profile to reply directly to recruiter queries." }
    ],
    interviewQuestions: [
      {
        question: "How did you optimize Three.js and GSAP so they run smoothly together?",
        answer: "By updating position calculations inside GSAP's scroll handler using lerped matrix interpolations. This separates DOM reflows from Three.js scene paints, allowing both pipelines to run at 60FPS."
      }
    ],
    lessonsLearned: [
      "React Portals are essential when mixing full-screen WebGL canvases with interactive HTML overlay overlays.",
      "Device screen ratios require custom camera field-of-view offsets to maintain bento grid focus."
    ],
    keyAchievements: [
      "Built a fully custom 3D mouse head-tracker without using heavy frame wrappers.",
      "Achieved a 97/100 Lighthouse performance baseline by code-splitting secondary UI panels."
    ],
    references: ["Three.js documentation", "GSAP ScrollTrigger API Reference"]
  }
};
