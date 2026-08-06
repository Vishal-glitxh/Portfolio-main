import { ProjectDetails } from "../types";

export const projectData: Record<string, ProjectDetails> = {
  "NovaIsland": {
    name: "NovaIsland",
    status: "Active Development",
    role: "macOS Software Engineer & AI Systems Developer",
    duration: "Jan 2026 - Present",
    summary: "NovaIsland is a premium native macOS productivity platform that transforms the MacBook notch into an intelligent workspace combining AI assistance, productivity widgets, developer tools, and deep macOS integrations through a modular engine-based architecture.",
    problem: "Existing notch utilities mostly replicate the iPhone Dynamic Island while providing only simple widgets such as battery indicators or media controls. They lack AI-powered workflows, native desktop interactions, and plugin extensibility.",
    solution: "NovaIsland introduces an AI-first productivity platform for macOS that combines native SwiftUI experiences, intelligent widgets, multiple LLM providers, developer tooling, and plugin extensibility inside a Dynamic Island-inspired interface.",
    architectureData: {
      flow: "Application Layer monitors notch interactions -> Window Engine positions NSPanel -> Interaction Engine dispatches events to active Widget Engine -> AI Engine queries local Ollama or cloud models.",
      components: "Application Layer Coordinator, AppKit Window Engine (NSPanel), SwiftUI Widget Engine, System Integration Agents, Local AI Provider Adapters.",
      pipeline: "Cursor Hover Event -> Window Expand -> Load Widget state -> Render SwiftUI layouts -> System Pasteboard polling -> Local LLM generation."
    },
    categories: {
      "Languages & Core": ["Swift 6", "SwiftUI", "AppKit", "Swift Concurrency", "Observation"],
      "AI & Integration": ["Ollama", "OpenAI", "Gemini", "Claude"],
      "APIs & SDK": ["MediaPlayer", "EventKit", "AVFoundation", "UserNotifications", "ScreenCaptureKit"]
    },
    richHighlights: [
      { title: "Non-activating NSPanel Panel", desc: "Floats over full-screen spaces without stealing active application keyboard focus." },
      { title: "Swift Concurrency Actors", desc: "Isolates mutable state across async threads to prevent background CPU/RAM race conditions." },
      { title: "Local AI Integration Engine", desc: "Adapts prompt pipelines for Ollama local models and external cloud LLMs." }
    ],
    challenges: "Building a non-intrusive floating dynamic overlay that interfaces with native AppKit APIs without stealing active keyboard focus or draining system batteries.",
    learnings: "Deepened knowledge of native AppKit window subclassing, Core Animation spring models, Swift Concurrency actor isolation, and macOS accessibility APIs.",
    roadmap: [
      "Plugin SDK: Extensibility layer allowing custom third-party widgets.",
      "Vision Pro Companion: Spatial dynamic island synchronization over local network.",
      "Apple Intelligence Integration: Custom semantic prompts routing via local Siri systems."
    ],
    github: "https://github.com/Vishal-glitxh",
    demo: undefined,
    quickFacts: [
      "Native macOS app (Swift 6 & SwiftUI)",
      "Under 12MB idle memory footprint",
      "Zero-downtime background execution"
    ]
  },
  "AI Study Companion": {
    name: "AI Study Companion",
    status: "In Progress",
    role: "AI & NLP Developer",
    duration: "Mar 2026 - Present",
    summary: "An AI-powered study companion that predicts likely examination questions using intelligent document analysis.",
    problem: "Suboptimal prep cycles due to student difficulties in identifying key exam topics, historical patterns, and core study points from raw course documents.",
    solution: "Engineered a Semantic-Match-Engine using NLP high-dimensional embeddings and cosine similarity to map and extract recurring conceptual patterns.",
    architectureData: {
      flow: "PDF study materials uploaded -> Text extraction & chunking -> Embeddings generated -> Cosine similarity comparisons -> Pattern extraction -> Question Generation.",
      components: "Sentence-Transformer pipeline, Similarity Matrix Node, React prep dashboard, MongoDB database storage.",
      pipeline: "Raw Document text -> Vector chunks -> 768-dim Embeddings -> Similarity scoring matrix -> Predicted topic array."
    },
    categories: {
      "Languages & Frameworks": ["Python", "React", "Node.js"],
      "AI & Data Science": ["NLP", "Sentence-Transformers", "Semantic Search"],
      "Database": ["MongoDB", "Mongoose ORM"]
    },
    richHighlights: [
      { title: "Cosine Similarity Engine", desc: "Calculates conceptual overlaps between courses using high-dimensional dot product." },
      { title: "768-dim Embeddings model", desc: "Leveraged Sentence-Transformers for semantic parsing of course content." },
      { title: "MongoDB Vector Storage", desc: "Optimized database collections containing pre-computed question similarity scores." }
    ],
    challenges: "Optimizing the latency of similarity matrix computations on large PDF text inputs within the React frontend.",
    learnings: "Mastered high-dimensional vector embeddings, semantic search mathematics, and document parsing techniques in Python.",
    roadmap: [
      "Integrate local LLM for automated summary generation.",
      "Add interactive flashcard generation based on predicted topics.",
      "Implement multi-format file uploads (PPTX, DOCX, audio transcribing)."
    ],
    github: "https://github.com/Vishal-glitxh",
    demo: undefined,
    quickFacts: [
      "Semantic parsing accuracy >85%",
      "Supports multiple PDF course uploads",
      "Generates prep topic predictions under 2s"
    ]
  },
  "Intelligent Development Platform (IDP)": {
    name: "Intelligent Development Platform (IDP)",
    status: "In Progress",
    role: "Full-Stack & Analytics Engineer",
    duration: "May 2026 - Present",
    summary: "An employee development platform for skills mapping and talent visualization.",
    problem: "Difficulty for organizations to track individual developer potential, map capability matrices, and outline clear performance-growth paths.",
    solution: "Constructed an analytics dashboard utilizing a 9-Box Talent Matrix grid mapping performance and potential nodes to calculate developer progress.",
    architectureData: {
      flow: "Competency surveys received -> Analytics engine processes skills matrices -> 9-Box potential coordinates calculated -> Recommended tracks pushed to employee dashboard.",
      components: "Node.js API servers, Python analytics service, React talent visualization canvas, SQLite/Prisma ORM.",
      pipeline: "Skills assessment data -> Core potential matrices -> 9-Box mapping engine -> Recommended learning pathway."
    },
    categories: {
      "Languages & Backend": ["Node.js", "Python", "Express.js"],
      "Frontend": ["React", "CSS Grid", "Canvas Data Visualizations"],
      "Database & ORM": ["SQLite", "Prisma ORM"]
    },
    richHighlights: [
      { title: "9-Box Talent Matrix Analytics", desc: "Placements algorithm mapping performance score vectors against growth potential indices." },
      { title: "Skills Density Heatmap", desc: "Custom SVG grid rendering team competency coverage in real-time." },
      { title: "Prisma Database Relations", desc: "Clean SQLite relational schemas resolving employee, skills, and course connections." }
    ],
    challenges: "Aggregating multidimensional skills assessment surveys into single coordinate scores on the 9-Box matrix.",
    learnings: "Gained experience in employee competency modeling, interactive analytics, and full-stack API integration.",
    roadmap: [
      "Add AI-powered skill recommendation based on industry trends.",
      "Integrate automated employee feedback pipelines.",
      "Implement predictive analytics for talent retention trends."
    ],
    github: "https://github.com/Vishal-glitxh",
    demo: undefined,
    quickFacts: [
      "Interactive SVG heatmaps",
      "Generates 9-Box matrices instantly",
      "Personalized course recommendations"
    ]
  },
  "Personal Portfolio": {
    name: "Personal Portfolio",
    status: "Live",
    role: "Frontend & 3D Interaction Developer",
    duration: "Jul 2026 - Present",
    summary: "A personal portfolio featuring a 3D avatar that tracks user scroll and mouse movement.",
    problem: "Displaying complex engineering skills and projects in a static, unengaging format.",
    solution: "Integrated React Three Fiber canvas elements and GSAP ScrollSmoother pipelines with pixel-perfect layouts.",
    architectureData: {
      flow: "Viewport mouse movement & scroll updates -> GSAP ScrollSmoother interpolator -> Three.js skeleton bone rotators -> Camera position matrix updates.",
      components: "React Three Fiber WebGL canvas, decrypter loader node, GSAP ScrollSmoother wrapper, Portal-based overlay module.",
      pipeline: "Mouse coordinates/scroll offset -> GSAP Lerp -> Skeleton bone rotation matrix -> WebGL renderer paint."
    },
    categories: {
      "Languages & Typings": ["TypeScript", "JavaScript"],
      "3D Rendering": ["Three.js", "React Three Fiber", "GLTF loaders"],
      "Animations & Styles": ["GSAP", "ScrollTrigger", "ScrollSmoother", "CSS Grid"]
    },
    richHighlights: [
      { title: "3D Canvas Model Renderer", desc: "Features custom GLTF asset loading and skeleton bone coordinate rotations." },
      { title: "GSAP Lerping timelines", desc: "Coordinates camera Zoom and avatar positions with scroll track positions." },
      { title: "React Portal overlay Console", desc: "Lazy-loaded accessible console code-split from core page bundle." }
    ],
    challenges: "Achieving smooth rendering rates (>60FPS) on mobile viewports while running Three.js lighting and canvas operations.",
    learnings: "Acquired experience with WebGL canvas optimization, browser layout paints, and accessible keyboard focus traps.",
    roadmap: [
      "Add interactive chat assistant matching developer profile.",
      "Support theme switcher (Cyberpunk neon vs Sleek minimalist dark).",
      "Optimize model load size using custom Draco geometry compression."
    ],
    github: "https://github.com/Vishal-glitxh",
    demo: "https://vishalsuhas.com",
    quickFacts: [
      "Locks body scroll on panels",
      "Vite Code-splitting split chunks",
      "Maintains constant 60FPS"
    ]
  }
};
