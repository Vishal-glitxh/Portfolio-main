import { projectData } from "../data/projectData";
import { engineeringEvidenceData } from "../data/engineeringEvidence";
import { getNotebookByProjectName } from "../data/engineeringLogs";
import { getJournalByProjectName } from "../data/debuggingJournal";
import { getPerformanceReview } from "../data/performanceReviews";
import { getTestingStrategy } from "../data/testingStrategies";
import { getPipelineData } from "../data/pipelineData";
import { getObservabilityData } from "../data/observabilityData";
import { getKnowledgeWorkspace } from "../data/assistantData";
import { getProjectTimeline } from "../data/projectTimelines";

const projectIds: Record<string, string> = {
  NovaIsland: "novaisland",
  "AI Study Companion": "study-companion",
  "Intelligent Development Platform (IDP)": "idp",
  "Personal Portfolio": "portfolio",
};

export const useProjectData = (projectName: string) => {
  const projectId = projectIds[projectName] || projectName;
  const project = projectData[projectName];
  const evidence = engineeringEvidenceData[projectName];
  const notebook = getNotebookByProjectName(projectName);
  const journal = getJournalByProjectName(projectName);
  const perfReview = getPerformanceReview(projectName);
  const testingStrategy = getTestingStrategy(projectName);
  const pipeline = getPipelineData(projectId);
  const observability = getObservabilityData(projectId);
  const assistant = getKnowledgeWorkspace(projectId);
  const timeline = getProjectTimeline(projectName);

  return {
    project,
    evidence,
    notebook,
    journal,
    perfReview,
    testingStrategy,
    pipeline,
    observability,
    assistant,
    timeline
  };
};
