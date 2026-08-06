export interface ArchNode {
  label: string;
  desc: string;
  x: number;
  y: number;
}

export interface ArchConnection {
  from: number;
  to: number;
}

export interface ArchView {
  nodes: ArchNode[];
  connections: ArchConnection[];
}

export interface ProjectArchData {
  flow: ArchView;
  components: ArchView;
  pipeline: ArchView;
}

export const architectureDiagrams: Record<string, ProjectArchData> = {
  "NovaIsland": {
    flow: {
      nodes: [
        { label: "NovaIsland", desc: "NSApplication coordinator subclass that bootstraps run loops and system notification observers.", x: 50, y: 50 },
        { label: "Application Layer", desc: "Coordinates app-level delegates, boots background tasks, and loads configuration states.", x: 120, y: 50 },
        { label: "Window Engine", desc: "Manages floating NSPanel layout coordinates, notch alignments, and visibility states.", x: 190, y: 50 },
        { label: "Interaction Engine", desc: "Intercepts keyboard/mouse inputs and delegates gestures events to active widget views.", x: 260, y: 50 },
        { label: "Animation Engine", desc: "Interpolates spring morphing transitions when active widget panes expand or collapse.", x: 330, y: 50 },
        { label: "Widget Engine", desc: "Loops through widget view registries and triggers SwiftUI view rendering cycles dynamically.", x: 400, y: 50 },
        { label: "System Integration Layer", desc: "Listens to native observers (Battery, Pasteboard, MediaPlayer) and updates reactive properties.", x: 470, y: 50 },
        { label: "AI Platform", desc: "Adapts prompt payloads, formats messages data, and streams local/cloud LLM completions.", x: 540, y: 50 },
        { label: "Plugin Framework", desc: "Evaluates third-party Swift plugins code signatures and renders custom view templates safely.", x: 610, y: 50 },
        { label: "Settings & Preferences", desc: "Manages persistent configurations, hotkey bindings, and user profile calibrations.", x: 680, y: 50 }
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
        { from: 4, to: 5 },
        { from: 5, to: 6 },
        { from: 6, to: 7 },
        { from: 7, to: 8 },
        { from: 8, to: 9 }
      ]
    },
    components: {
      nodes: [
        { label: "NovaIsland", desc: "AppDelegate coordinator class holding the global window routing delegates.", x: 50, y: 50 },
        { label: "Application Layer", desc: "AppEnvironment class injecting shared configurations variables natively via Observation.", x: 120, y: 50 },
        { label: "Window Engine", desc: "IslandPanel custom subclass of NSPanel configuring screen visibility layers.", x: 190, y: 50 },
        { label: "Interaction Engine", desc: "GlobalEventTap and AppKit tracking monitors intercepting coordinate inputs.", x: 260, y: 50 },
        { label: "Animation Engine", desc: "SwiftUI Animation wrappers configuring spring damping parameters.", x: 330, y: 50 },
        { label: "Widget Engine", desc: "WidgetRegistry class coordinating rendering lifecycles delegates.", x: 400, y: 50 },
        { label: "System Integration Layer", desc: "ClipboardMonitor, BatteryObserver, and MediaPlayerService managers.", x: 470, y: 50 },
        { label: "AI Platform", desc: "OllamaClient connector and OpenAI API proxy adapter layers.", x: 540, y: 50 },
        { label: "Plugin Framework", desc: "WidgetPlugin Swift protocol definition and SandboxValidator manager.", x: 610, y: 50 },
        { label: "Settings & Preferences", desc: "UserDefaultsStore manager serializing local preference state structures.", x: 680, y: 50 }
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
        { from: 4, to: 5 },
        { from: 5, to: 6 },
        { from: 6, to: 7 },
        { from: 7, to: 8 },
        { from: 8, to: 9 }
      ]
    },
    pipeline: {
      nodes: [
        { label: "NovaIsland", desc: "Loads persistent environment assets and binds the system event loops.", x: 50, y: 50 },
        { label: "Application Layer", desc: "Validates system-level accessibility permissions and signing credentials profiles.", x: 120, y: 50 },
        { label: "Window Engine", desc: "Computes notch screen coordinates offsets and positions the floating NSPanel window.", x: 190, y: 50 },
        { label: "Interaction Engine", desc: "Intercepts keystroke shortcuts and gesture taps on window edges.", x: 260, y: 50 },
        { label: "Animation Engine", desc: "Applies physics transforms morphing layout containers dynamically.", x: 330, y: 50 },
        { label: "Widget Engine", desc: "Injects sub-views states into active templates and coordinates frames redrawing.", x: 400, y: 50 },
        { label: "System Integration Layer", desc: "Monitors pasteboard text updates and tracks music player state triggers asynchronously.", x: 470, y: 50 },
        { label: "AI Platform", desc: "Constructs prompts context payloads, routes requests, and returns text tokens.", x: 540, y: 50 },
        { label: "Plugin Framework", desc: "Loads developer plugins binaries, checks entitlements, and hosts dynamic cells.", x: 610, y: 50 },
        { label: "Settings & Preferences", desc: "Stores new notch offset coordinates and writes new hotkeys configs.", x: 680, y: 50 }
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
        { from: 4, to: 5 },
        { from: 5, to: 6 },
        { from: 6, to: 7 },
        { from: 7, to: 8 },
        { from: 8, to: 9 }
      ]
    },
  },
  "AI Study Companion": {
    flow: {
      nodes: [
        { label: "PDF Document Upload", desc: "Student uploads PDF study notes, syllabus guidelines, or book chapters.", x: 60, y: 50 },
        { label: "NLP Text Parser", desc: "Python script processing text chunking, cleaning, and tokenization blocks.", x: 220, y: 50 },
        { label: "Similarity Engine", desc: "Sentence-Transformer calculating cosine similarity mapping index coefficients.", x: 380, y: 50 },
        { label: "Question Generation", desc: "React Dashboard showing similarity score rating matches and generated cards.", x: 540, y: 50 }
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 }
      ]
    },
    components: {
      nodes: [
        { label: "React Prep Frontend", desc: "User prep dashboard rendering course uploads, match heatmaps, and practice cards.", x: 60, y: 50 },
        { label: "Express API Backend", desc: "Handles document uploads, queries, and user state storage.", x: 220, y: 50 },
        { label: "Sentence-Transformers", desc: "High-dimensional NLP embedder creating 768-dim semantic vectors.", x: 380, y: 50 },
        { label: "MongoDB Collections", desc: "NoSQL DB collections containing vectors, courses, and generated prep topics.", x: 540, y: 50 }
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 }
      ]
    },
    pipeline: {
      nodes: [
        { label: "Raw Document Stream", desc: "Ingests unstructured document files from client react uploaders.", x: 60, y: 50 },
        { label: "Vector Embeddings", desc: "Converts text chunks into 768-dimensional float arrays.", x: 220, y: 50 },
        { label: "Similarity Scoring", desc: "Computes similarity dot products against reference curriculum nodes.", x: 380, y: 50 },
        { label: "Prep Cards Output", desc: "Generates sample exam questions mapped to high-overlap categories.", x: 540, y: 50 }
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 }
      ]
    }
  },
  "Intelligent Development Platform (IDP)": {
    flow: {
      nodes: [
        { label: "Assessment Inputs", desc: "Employee completes competency matrices surveys and skills forms.", x: 60, y: 50 },
        { label: "Skills Aggregator", desc: "API service calculating performance ratings and potential weight factors.", x: 220, y: 50 },
        { label: "9-Box Grid Mapping", desc: "Analytics node mapping coordinate parameters to place employees on the matrix.", x: 380, y: 50 },
        { label: "Learning Recommendations", desc: "Pushes personalized course plans based on talent shortage maps.", x: 540, y: 50 }
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 }
      ]
    },
    components: {
      nodes: [
        { label: "SVG Visualization Client", desc: "Interactive SVG 9-Box grid rendering employee growth coordinates in real-time.", x: 60, y: 50 },
        { label: "Express Node Server", desc: "REST API endpoints routing employee forms, competency weights, and courses.", x: 220, y: 50 },
        { label: "Python Analytics Service", desc: "Gathers workforce data and compiles skills density matrices.", x: 380, y: 50 },
        { label: "Prisma & SQLite DB", desc: "SQLite database handling relationships between employees, skills, and coursework.", x: 540, y: 50 }
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 }
      ]
    },
    pipeline: {
      nodes: [
        { label: "Workforce Survey Stream", desc: "Collects competency evaluation grades from employee profiles.", x: 60, y: 50 },
        { label: "9-Box Coordinate Solver", desc: "Maps performance against growth potential vectors.", x: 220, y: 50 },
        { label: "Shortage Analysis Grid", desc: "Compiles shortage density heatmaps for organizations.", x: 380, y: 50 },
        { label: "Course Plan Dispatcher", desc: "Selects personalized course recommendations matching talent gaps.", x: 540, y: 50 }
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 }
      ]
    }
  },
  "Personal Portfolio": {
    flow: {
      nodes: [
        { label: "Viewport Interactions", desc: "Tracks mouse movement vector and window scroll offset coordinates.", x: 60, y: 50 },
        { label: "GSAP Lerp Timelines", desc: "Interpolates updates smoothly to prevent sudden layout jumps.", x: 220, y: 50 },
        { label: "Skeleton Rotations", desc: "Calculates bone quaternion offsets to direct character mesh.", x: 380, y: 50 },
        { label: "R3F WebGL Frame", desc: "Triggers React Three Fiber WebGL updates to paint the avatar frame.", x: 540, y: 50 }
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 }
      ]
    },
    components: {
      nodes: [
        { label: "React DOM UI Layers", desc: "A11y portals, bento tags, horizontal grids, and fixed header interfaces.", x: 60, y: 50 },
        { label: "GSAP Scroll Wrapper", desc: "ScrollSmoother and ScrollTrigger plugins driving animations.", x: 220, y: 50 },
        { label: "R3F WebGL Canvas", desc: "Renders lighting setups, camera viewports, and custom shaders.", x: 380, y: 50 },
        { label: "GLTF Bone Controller", desc: "Decrypted GLTF 3D model parsing skeleton rotations.", x: 540, y: 50 }
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 }
      ]
    },
    pipeline: {
      nodes: [
        { label: "Event Listeners Stream", desc: "Polls active scroll offset values and pointer hover client positions.", x: 60, y: 50 },
        { label: "GSAP Lerper Node", desc: "Filters coordinate fluctuations and smooths position data.", x: 220, y: 50 },
        { label: "Bone Quaternion Solver", desc: "Translates coordinates into Euler angles for head-tracking.", x: 380, y: 50 },
        { label: "WebGL GPU Render Paint", desc: "Draws updated bones matrices onto WebGL canvas frame.", x: 540, y: 50 }
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 }
      ]
    }
  }
};
