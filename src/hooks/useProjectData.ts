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

export const useProjectData = (projectName: string) => {
  const project = projectData[projectName];
  const evidence = engineeringEvidenceData[projectName];
  const notebook = getNotebookByProjectName(projectName);
  const journal = getJournalByProjectName(projectName);
  const perfReview = getPerformanceReview(projectName);
  const testingStrategy = getTestingStrategy(projectName);
  const pipeline = getPipelineData(projectName);
  const observability = getObservabilityData(projectName);
  const assistant = getKnowledgeWorkspace(projectName);
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
