export const ExpertiseLevels = [
  "Expert",
  "Advanced",
  "Intermediate",
  "Learning"
] as const;

export type Expertise = typeof ExpertiseLevels[number];

export interface SkillMapping {
  id: string; // Unique stable identifier (e.g., "react")
  name: string;
  category: "Frontend Engineering" | "Backend Engineering" | "Databases" | "Artificial Intelligence" | "Native macOS Development" | "DevOps & Deployment" | "Tools & Productivity";
  expertise: Expertise;
  strength: number; // percentage
  projects: string[]; // Project IDs array references
  displayOrder: number;
  certifications?: string[];
  coursework?: string[];
  description?: string;
  isPrimary?: boolean;
  yearsOfExperience?: number;
}

export const skillsData: SkillMapping[] = [
  // 1. Frontend Engineering
  {
    id: "react",
    name: "React",
    category: "Frontend Engineering",
    expertise: "Expert",
    strength: 92,
    projects: ["portfolio", "idp"],
    displayOrder: 1,
    isPrimary: true,
    coursework: ["Web Application Architecture"],
    description: "Core library leveraged for custom dashboard systems, visualizer interfaces, and layout states."
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend Engineering",
    expertise: "Advanced",
    strength: 88,
    projects: [],
    displayOrder: 2,
    isPrimary: true,
    description: "React framework used for server-side layouts, routing architectures, and web apps."
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend Engineering",
    expertise: "Advanced",
    strength: 88,
    projects: ["portfolio"],
    displayOrder: 3,
    isPrimary: true,
    coursework: ["Software Engineering Standards"],
    description: "Used to build strongly typed components, interfaces, and state channels, ensuring build stability."
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    category: "Frontend Engineering",
    expertise: "Expert",
    strength: 90,
    projects: ["portfolio", "idp"],
    displayOrder: 4,
    description: "Utility-first CSS framework for rapid responsive styling implementations."
  },
  {
    id: "threejs",
    name: "Three.js",
    category: "Frontend Engineering",
    expertise: "Advanced",
    strength: 86,
    projects: ["portfolio"],
    displayOrder: 5,
    coursework: ["Computer Graphics & Rendering"],
    description: "WebGL interactive renders, custom GLTF character meshes, and responsive scroll cameras."
  },
  {
    id: "r3f",
    name: "React Three Fiber",
    category: "Frontend Engineering",
    expertise: "Advanced",
    strength: 84,
    projects: ["portfolio"],
    displayOrder: 6,
    description: "React wrapper interface binding Three.js coordinates inside standard virtual DOM components."
  },
  {
    id: "gsap",
    name: "GSAP Animations",
    category: "Frontend Engineering",
    expertise: "Expert",
    strength: 92,
    projects: ["portfolio"],
    displayOrder: 7,
    coursework: ["Interactive Design Patterns"],
    description: "Timeline orchestration, horizontal scroll sliding matrices, and smooth overlay panels."
  },
  {
    id: "framermotion",
    name: "Framer Motion",
    category: "Frontend Engineering",
    expertise: "Intermediate",
    strength: 82,
    projects: [],
    displayOrder: 8,
    description: "Declarative utility animating simple state switches and mount transitions."
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Frontend Engineering",
    expertise: "Expert",
    strength: 90,
    projects: ["portfolio", "idp"],
    displayOrder: 9,
    description: "Core scripting scripting language backing client DOM mechanics and interactive components."
  },
  {
    id: "html5",
    name: "HTML5",
    category: "Frontend Engineering",
    expertise: "Expert",
    strength: 95,
    projects: ["portfolio", "idp"],
    displayOrder: 10,
    description: "Standard markup foundation backing semantic browser nodes layouts."
  },
  {
    id: "css3",
    name: "CSS3",
    category: "Frontend Engineering",
    expertise: "Expert",
    strength: 92,
    projects: ["portfolio", "idp"],
    displayOrder: 11,
    description: "Styling rules managing layout layouts sheets, custom properties tokens, and media queries."
  },
  {
    id: "vite",
    name: "Vite",
    category: "Frontend Engineering",
    expertise: "Advanced",
    strength: 88,
    projects: ["portfolio"],
    displayOrder: 12,
    description: "Modern frontend tooling optimized for hot module replacements and fast bundles."
  },
  {
    id: "shadcnui",
    name: "Shadcn UI",
    category: "Frontend Engineering",
    expertise: "Advanced",
    strength: 86,
    projects: [],
    displayOrder: 13,
    description: "Highly accessible, clean dashboard component structures built on Radix primitives."
  },

  // 2. Backend Engineering
  {
    id: "python",
    name: "Python",
    category: "Backend Engineering",
    expertise: "Expert",
    strength: 95,
    projects: ["studycompanion"],
    displayOrder: 1,
    isPrimary: true,
    certifications: ["IBM AI Fundamentals"],
    coursework: ["Design & Analysis of Algorithms", "Object Oriented Programming"],
    description: "Primary scripting language used for machine learning modeling and data analytics pipelines."
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend Engineering",
    expertise: "Advanced",
    strength: 88,
    projects: ["idp"],
    displayOrder: 2,
    isPrimary: true,
    coursework: ["Distributed Web Computing"],
    description: "Runtime environment hosting asynchronous workspace APIs and database hooks."
  },
  {
    id: "expressjs",
    name: "Express.js",
    category: "Backend Engineering",
    expertise: "Advanced",
    strength: 86,
    projects: ["idp"],
    displayOrder: 3,
    description: "Backend framework handling API routing interfaces and access tokens verification."
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Backend Engineering",
    expertise: "Advanced",
    strength: 85,
    projects: [],
    displayOrder: 4,
    description: "High-performance Python backend server using Pydantic typing and native async loops."
  },
  {
    id: "flask",
    name: "Flask",
    category: "Backend Engineering",
    expertise: "Advanced",
    strength: 82,
    projects: [],
    displayOrder: 5,
    description: "Micro-framework used for spinning up simple backend models routes."
  },
  {
    id: "django",
    name: "Django",
    category: "Backend Engineering",
    expertise: "Intermediate",
    strength: 80,
    projects: [],
    displayOrder: 6,
    description: "Full-scale Python web backend handling built-in database administration dashboards."
  },
  {
    id: "restapis",
    name: "REST APIs",
    category: "Backend Engineering",
    expertise: "Advanced",
    strength: 90,
    projects: ["idp", "studycompanion"],
    displayOrder: 7,
    description: "Designing standard HTTP APIs routes delivering JSON payloads with correct verbs."
  },
  {
    id: "jwt",
    name: "JWT Authentication",
    category: "Backend Engineering",
    expertise: "Advanced",
    strength: 86,
    projects: ["idp"],
    displayOrder: 8,
    description: "Implementing JSON Web Token verification middleware profiles securing routes accesses."
  },
  {
    id: "prisma",
    name: "Prisma ORM",
    category: "Backend Engineering",
    expertise: "Advanced",
    strength: 84,
    projects: ["idp"],
    displayOrder: 9,
    description: "Database client generating strongly typed queries schemas mapped to relational columns."
  },

  // 3. Databases
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Databases",
    expertise: "Advanced",
    strength: 86,
    projects: [],
    displayOrder: 1,
    description: "Relational database utilizing SQL indexing schema structures and data integrity checks."
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "Databases",
    expertise: "Advanced",
    strength: 84,
    projects: [],
    displayOrder: 2,
    description: "Standard SQL relational database engine managing structured transactional query flows."
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Databases",
    expertise: "Intermediate",
    strength: 80,
    projects: ["studycompanion"],
    displayOrder: 3,
    coursework: ["Database Management Systems (DBMS)", "NoSQL Storage Models"],
    description: "NoSQL document storage optimized for text similarity index rankings and prep-question metadata."
  },
  {
    id: "sqlite",
    name: "SQLite",
    category: "Databases",
    expertise: "Advanced",
    strength: 84,
    projects: ["idp"],
    displayOrder: 4,
    coursework: ["Relational Database Design"],
    description: "Serverless SQL database engine mapped locally via Prisma schema models."
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "Databases",
    expertise: "Intermediate",
    strength: 82,
    projects: [],
    displayOrder: 5,
    description: "BaaS platform delivering instant PostgreSQL layers, OAuth validation, and listening triggers."
  },

  // 4. Artificial Intelligence
  {
    id: "nlp",
    name: "NLP & Semantic Search",
    category: "Artificial Intelligence",
    expertise: "Expert",
    strength: 90,
    projects: ["studycompanion"],
    displayOrder: 1,
    isPrimary: true,
    certifications: ["IBM AI Fundamentals"],
    coursework: ["Natural Language Processing", "Information Retrieval Systems"],
    description: "Specialized in sentence-transformer embeddings, tokenization, and cosine similarity conceptual overlays."
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "Artificial Intelligence",
    expertise: "Advanced",
    strength: 85,
    projects: [],
    displayOrder: 2,
    certifications: ["IBM AI Fundamentals"],
    coursework: ["Deep Learning & Neural Networks"],
    description: "Used for modeling deep learning classifiers and neural network architectures."
  },
  {
    id: "numpy",
    name: "NumPy",
    category: "Artificial Intelligence",
    expertise: "Advanced",
    strength: 88,
    projects: ["studycompanion"],
    displayOrder: 3,
    description: "Mathematical computing library handling vectors, tensors, and multi-dimensional matrices operations."
  },
  {
    id: "pandas",
    name: "Pandas",
    category: "Artificial Intelligence",
    expertise: "Advanced",
    strength: 86,
    projects: ["studycompanion"],
    displayOrder: 4,
    description: "Data manipulation toolkit loading tables datasets, parsing CSVs, and executing cleans loops."
  },
  {
    id: "rag",
    name: "RAG & LLM Integration",
    category: "Artificial Intelligence",
    expertise: "Advanced",
    strength: 88,
    projects: ["novaisland"],
    displayOrder: 5,
    description: "Retrieval-Augmented Generation schemas routing query context blocks to active context limits."
  },
  {
    id: "ollama",
    name: "Ollama",
    category: "Artificial Intelligence",
    expertise: "Advanced",
    strength: 88,
    projects: ["novaisland"],
    displayOrder: 6,
    description: "Local runner execution interface managing Llama/Gemma models directly on native devices."
  },
  {
    id: "openai",
    name: "OpenAI API",
    category: "Artificial Intelligence",
    expertise: "Advanced",
    strength: 88,
    projects: ["novaisland"],
    displayOrder: 7,
    description: "Connecting cloud models (GPT-4o) parsing json structures and chat loops."
  },
  {
    id: "geminiapi",
    name: "Gemini API",
    category: "Artificial Intelligence",
    expertise: "Advanced",
    strength: 88,
    projects: ["novaisland"],
    displayOrder: 8,
    description: "Google multimodal model interface handling context tokens searches."
  },
  {
    id: "claudeapi",
    name: "Claude API",
    category: "Artificial Intelligence",
    expertise: "Advanced",
    strength: 88,
    projects: ["novaisland"],
    displayOrder: 9,
    description: "Anthropic API models integration optimized for complex code-generation calls."
  },
  {
    id: "vectorembeddings",
    name: "Vector Embeddings",
    category: "Artificial Intelligence",
    expertise: "Advanced",
    strength: 88,
    projects: ["studycompanion", "novaisland"],
    displayOrder: 10,
    description: "Mathematical representation mapping concepts as high-dimensional coordinates weights vectors."
  },

  // 5. Native macOS Development
  {
    id: "swift",
    name: "Swift",
    category: "Native macOS Development",
    expertise: "Expert",
    strength: 92,
    projects: ["novaisland"],
    displayOrder: 1,
    isPrimary: true,
    coursework: ["Native macOS Application Development"],
    description: "Primary compiled systems language backing macOS window systems and native engine utilities."
  },
  {
    id: "swiftui",
    name: "SwiftUI",
    category: "Native macOS Development",
    expertise: "Expert",
    strength: 92,
    projects: ["novaisland"],
    displayOrder: 2,
    isPrimary: true,
    description: "Declarative framework used for building dynamic MacBook notch overlays and widgets panel layouts."
  },
  {
    id: "appkit",
    name: "AppKit",
    category: "Native macOS Development",
    expertise: "Advanced",
    strength: 86,
    projects: ["novaisland"],
    displayOrder: 3,
    description: "macOS system UI engine managing floating NSPanel configurations and mouse hover coordinate captures."
  },
  {
    id: "swiftconcurrency",
    name: "Swift Concurrency",
    category: "Native macOS Development",
    expertise: "Advanced",
    strength: 88,
    projects: ["novaisland"],
    displayOrder: 4,
    description: "Handling async/await tasks, threads management, and non-blocking tasks scheduling."
  },
  {
    id: "swiftactors",
    name: "Swift Actors",
    category: "Native macOS Development",
    expertise: "Advanced",
    strength: 88,
    projects: ["novaisland"],
    displayOrder: 5,
    description: "Isolating mutable state inside actors to prevent thread data races during database Keychain access."
  },
  {
    id: "mvvm",
    name: "MVVM Pattern",
    category: "Native macOS Development",
    expertise: "Advanced",
    strength: 90,
    projects: ["novaisland"],
    displayOrder: 6,
    description: "Separating UI layouts from database records models using observable view-model classes."
  },
  {
    id: "observation",
    name: "Observation Framework",
    category: "Native macOS Development",
    expertise: "Advanced",
    strength: 88,
    projects: ["novaisland"],
    displayOrder: 7,
    description: "Swift 6 macro-based reactive bindings refreshing SwiftUI panels on state changes."
  },
  {
    id: "spm",
    name: "Swift Package Manager",
    category: "Native macOS Development",
    expertise: "Advanced",
    strength: 88,
    projects: ["novaisland"],
    displayOrder: 8,
    description: "Dependency manager configuring libraries and packages inside native Xcode environments."
  },

  // 6. DevOps & Deployment
  {
    id: "git",
    name: "Git",
    category: "DevOps & Deployment",
    expertise: "Expert",
    strength: 92,
    projects: ["portfolio", "novaisland", "studycompanion", "idp"],
    displayOrder: 1,
    description: "Version control tool managing branch merges, commit hashes, and tag checkouts."
  },
  {
    id: "github",
    name: "GitHub",
    category: "DevOps & Deployment",
    expertise: "Expert",
    strength: 90,
    projects: ["portfolio", "novaisland", "studycompanion", "idp"],
    displayOrder: 2,
    description: "Remote code repository platform hosting pull request workflows and code review cycles."
  },
  {
    id: "githubactions",
    name: "GitHub Actions",
    category: "DevOps & Deployment",
    expertise: "Advanced",
    strength: 85,
    projects: ["portfolio", "novaisland"],
    displayOrder: 3,
    description: "CI/CD engine configuring pipeline workflows for compile checks, linting, and automated tests."
  },
  {
    id: "docker",
    name: "Docker",
    category: "DevOps & Deployment",
    expertise: "Intermediate",
    strength: 82,
    projects: [],
    displayOrder: 4,
    description: "Containerization tool isolation database runtimes and backend service configurations."
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "DevOps & Deployment",
    expertise: "Advanced",
    strength: 88,
    projects: ["portfolio"],
    displayOrder: 5,
    description: "Cloud hosting platform optimized for fast static deployments, Edge routes, and analytics."
  },
  {
    id: "render",
    name: "Render",
    category: "DevOps & Deployment",
    expertise: "Intermediate",
    strength: 84,
    projects: [],
    displayOrder: 6,
    description: "PaaS cloud environment optimized for spinning up database servers and backend node APIs."
  },
  {
    id: "netlify",
    name: "Netlify",
    category: "DevOps & Deployment",
    expertise: "Intermediate",
    strength: 82,
    projects: [],
    displayOrder: 7,
    description: "Static web deployment platform handling redirect rules, hooks, and serverless functions."
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "DevOps & Deployment",
    expertise: "Intermediate",
    strength: 82,
    projects: [],
    displayOrder: 8,
    description: "BaaS platform delivering real-time databases, auth states, and cloud files storage."
  },
  {
    id: "linuxcli",
    name: "Linux CLI",
    category: "DevOps & Deployment",
    expertise: "Advanced",
    strength: 84,
    projects: [],
    displayOrder: 9,
    description: "Bash/Zsh shell environments running commands pipelines, files scripts, and permissions fixes."
  },

  // 7. Tools & Productivity
  {
    id: "vscode",
    name: "VS Code",
    category: "Tools & Productivity",
    expertise: "Expert",
    strength: 92,
    projects: ["portfolio", "idp", "studycompanion"],
    displayOrder: 1,
    description: "Primary lightweight IDE configured with lint extensions and workspaces debugging configurations."
  },
  {
    id: "xcode",
    name: "Xcode",
    category: "Tools & Productivity",
    expertise: "Advanced",
    strength: 88,
    projects: ["novaisland"],
    displayOrder: 2,
    description: "Official Apple IDE backing Swift compiling, notarization, and layout debugging widgets."
  },
  {
    id: "cursorai",
    name: "Cursor AI",
    category: "Tools & Productivity",
    expertise: "Advanced",
    strength: 90,
    projects: ["portfolio", "novaisland"],
    displayOrder: 3,
    description: "AI code editor leveraging chat-guided development and fast inline changes."
  },
  {
    id: "figma",
    name: "Figma",
    category: "Tools & Productivity",
    expertise: "Intermediate",
    strength: 84,
    projects: [],
    displayOrder: 4,
    description: "UI/UX collaborative vector layout drawing and mockup assets creation tool."
  },
  {
    id: "postman",
    name: "Postman",
    category: "Tools & Productivity",
    expertise: "Advanced",
    strength: 86,
    projects: ["idp"],
    displayOrder: 5,
    description: "API testing interface sending mock requests and validating response payloads statuses."
  },
  {
    id: "npm",
    name: "npm",
    category: "Tools & Productivity",
    expertise: "Advanced",
    strength: 90,
    projects: ["portfolio", "idp"],
    displayOrder: 6,
    description: "Standard package registry configuring dependencies matrices inside package.json files."
  },
  {
    id: "pnpm",
    name: "pnpm",
    category: "Tools & Productivity",
    expertise: "Advanced",
    strength: 88,
    projects: [],
    displayOrder: 7,
    description: "Fast alternative package manager using content-addressable storage links saving local space."
  },
  {
    id: "homebrew",
    name: "Homebrew",
    category: "Tools & Productivity",
    expertise: "Advanced",
    strength: 86,
    projects: [],
    displayOrder: 8,
    description: "The missing package manager for macOS installing binaries, local packages, and tools."
  },
  {
    id: "lmstudio",
    name: "LM Studio",
    category: "Tools & Productivity",
    expertise: "Advanced",
    strength: 84,
    projects: ["novaisland"],
    displayOrder: 9,
    description: "Local GUI interface loading GGUF models weights and exposing API access ports."
  }
];

