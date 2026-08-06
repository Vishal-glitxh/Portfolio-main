import { EngineeringNotebook } from "../types";
import { novaislandLogs } from "./projects/novaisland/engineeringLogs";
import { studyCompanionLogs } from "./projects/study-companion/engineeringLogs";
import { idpLogs } from "./projects/idp/engineeringLogs";
import { portfolioLogs } from "./projects/portfolio/engineeringLogs";

export const engineeringLogs: Record<string, EngineeringNotebook> = {
  novaisland: novaislandLogs,
  "study-companion": studyCompanionLogs,
  idp: idpLogs,
  portfolio: portfolioLogs
};

export const getNotebookByProjectName = (name: string): EngineeringNotebook | undefined => {
  const norm = name.toLowerCase();
  if (norm.includes("island")) return engineeringLogs["novaisland"];
  if (norm.includes("companion")) return engineeringLogs["study-companion"];
  if (norm.includes("platform") || norm.includes("idp")) return engineeringLogs["idp"];
  if (norm.includes("portfolio")) return engineeringLogs["portfolio"];
  return undefined;
};
