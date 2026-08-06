export interface RichHighlight {
  title: string;
  desc: string;
}

export interface ArchitectureData {
  flow: string;
  components: string;
  pipeline: string;
  placeholderUrl?: string;
}

export interface ProjectDetails {
  name: string;
  status: "Live" | "Active Development" | "In Progress" | "Research";
  role: string;
  duration: string;
  summary: string;
  problem: string;
  solution: string;
  architectureData: ArchitectureData;
  categories: Record<string, string[]>;
  richHighlights: RichHighlight[];
  challenges: string;
  learnings: string;
  roadmap: string[];
  github: string;
  demo?: string;
  quickFacts: string[];
}
