import { ProjectTimeline } from "../types";
import { novaislandTimeline } from "./projects/novaisland/timelineData";
import { studyCompanionTimeline } from "./projects/study-companion/timelineData";
import { idpTimeline } from "./projects/idp/timelineData";
import { portfolioTimeline } from "./projects/portfolio/timelineData";

export const projectTimelines: Record<string, ProjectTimeline> = {
  novaisland: novaislandTimeline,
  "study-companion": studyCompanionTimeline,
  idp: idpTimeline,
  portfolio: portfolioTimeline
};

export const getProjectTimeline = (name: string): ProjectTimeline | undefined => {
  const norm = name.toLowerCase();
  if (norm.includes("island")) return projectTimelines["novaisland"];
  if (norm.includes("companion")) return projectTimelines["study-companion"];
  if (norm.includes("platform") || norm.includes("idp")) return projectTimelines["idp"];
  if (norm.includes("portfolio")) return projectTimelines["portfolio"];
  return undefined;
};
