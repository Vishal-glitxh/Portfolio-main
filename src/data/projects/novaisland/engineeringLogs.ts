import { EngineeringNotebook } from "../../../types";

export const novaislandLogs: EngineeringNotebook = {
  projectId: "novaisland",
  title: "NovaIsland Core Engineering decisions",
  summary: "Engineering decisions surrounding overlay windows, Swift Actors state isolation, multi-provider AI adapters, and native macOS framework tradeoffs.",
  decisions: [
    {
      id: "novaisland-decision-window",
      title: "Choosing NSPanel over NSWindow for overlay notch displays",
      context: "Positioning the dynamic island panel above active application spaces and full-screen windows without interrupting user workflows.",
      reasoning: "Standard NSWindows capture active keyboard focus and disappear when users transition between full-screen apps. Subclassing AppKit's NSPanel with `.nonactivatingPanel` and `.joinsAllSpaces` styles guarantees overlay visibility while leaving parent app cursor controls completely unaffected.",
      alternatives: [
        "Standard NSWindow (forces key window steals, causing input focus bugs)",
        "MenuBar Extra menu popover (lacks custom notch coordinate placement and spring morph animations)"
      ],
      tradeoffs: [
        "Requires bridging complex AppKit window coordinates systems to SwiftUI views environment context.",
        "Must override first responder queries manually to accept mouse events without stealing keyboard input focus."
      ],
      outcome: "Delivered a floating dynamic bar that works over full-screen apps and slides out cleanly on gesture hover.",
      category: "Window Engine",
      tags: ["AppKit", "NSPanel", "Notch Coordinates"],
      difficulty: "High"
    },
    {
      id: "novaisland-decision-architecture",
      title: "Separating Widget Engine from Window Engine",
      context: "Preventing dynamic UI modifications and updates from triggering main window frame re-evaluations.",
      reasoning: "Creating a protocol-oriented Widget Engine abstracts layout views. Individual widgets (Battery, Music, Calendar) conform to a `WidgetPlugin` delegate protocol, allowing the controller to re-draw widget cells in isolation without altering the NSPanel size metrics.",
      alternatives: [
        "Monolithic window state containing all widget rendering switches (causes massive re-render calculations cycles)",
        "Embedded web modules running inside local web frames (high CPU and memory overhead)"
      ],
      tradeoffs: [
        "Requires protocol-oriented view builders which limits direct ad-hoc visual modifications.",
        "Slightly increases initial file structure complexity."
      ],
      outcome: "Enabled developers to add new widgets and AI providers in isolation without modifications to the main window container.",
      category: "Architecture Design",
      tags: ["Extensibility", "Protocols", "Decoupling"],
      difficulty: "Medium"
    },
    {
      id: "novaisland-decision-ai-adapters",
      title: "Supporting multiple AI providers through a common abstraction layer",
      context: "Providing seamless switching between local Ollama offline models and cloud LLMs (OpenAI, Gemini, Claude).",
      reasoning: "By defining an `AIProviderAdapter` protocol, prompt construction and streaming payload parsers are standardized. The application interacts with a single unified adapter interface, allowing users to swap providers dynamically in the preferences panel.",
      alternatives: [
        "Single client provider binding (locks user to vendor limits)",
        "Direct ad-hoc integration blocks inside chat widgets views (causes code duplication)"
      ],
      tradeoffs: [
        "API features unique to single LLM providers (such as search tools or custom image uploads) must be bypassed or adapted.",
        "Requires custom settings mapping profiles for different API credentials."
      ],
      outcome: "Empowered recruiters to test offline Ollama speed and switch to OpenAI models for complex prompt workflows.",
      category: "AI Platform",
      tags: ["Ollama", "OpenAI", "Claude", "Adapters"],
      difficulty: "Medium"
    },
    {
      id: "novaisland-decision-actors",
      title: "Using Swift Actors for concurrency isolation",
      context: "Sharing mutable clipboard records, preferences variables, and token streams across background tasks.",
      reasoning: "Swift Actors enforce thread-safe state access by isolating properties and validating coordinate updates at compile-time. This eliminates race conditions and memory safety bugs without the overhead of manual mutex locks.",
      alternatives: [
        "Grand Central Dispatch (GCD) queues with barrier write checks (verbose, prone to priority inversions)",
        "Standard NSLocking blocks (risk of system thread deadlocks)"
      ],
      tradeoffs: [
        "Reading actor state values requires async contexts, requiring boilerplate Task wraps in synchronous views.",
        "Requires strict Sendable protocol conformance across shared models."
      ],
      outcome: "Completely eliminated multithreaded crash loops during rapid state refreshes and local AI streams.",
      category: "Concurrency",
      tags: ["Swift 6", "Actors", "Thread Safety"],
      difficulty: "High"
    }
  ]
};
