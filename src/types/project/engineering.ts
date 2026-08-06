export interface EngineeringDecision {
  id: string;
  title: string;
  context: string;
  reasoning: string;
  alternatives: string[];
  tradeoffs: string[];
  outcome: string;
  category?: string;
  tags?: string[];
  difficulty?: "Low" | "Medium" | "High";
}

export interface EngineeringNotebook {
  projectId: "novaisland" | "study-companion" | "idp" | "portfolio";
  title?: string;
  summary?: string;
  decisions: EngineeringDecision[];
}
