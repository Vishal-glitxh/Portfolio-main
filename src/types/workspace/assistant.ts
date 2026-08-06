export interface KnowledgeCitation {
  label: string;
  targetTab: "overview" | "architecture" | "engineering" | "operations" | "qa";
  targetSectionId?: string;
  targetItemId?: string;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  summary: string;
  body: string;
  keywords: string[];
  tags: string[];
  citations: KnowledgeCitation[];
  category: "Architecture" | "Debugging" | "Performance" | "Testing" | "FAQ";
  suggestedFollowUps: string[];
}

export interface ProjectKnowledgeWorkspace {
  projectId: string;
  documents: KnowledgeDocument[];
}
