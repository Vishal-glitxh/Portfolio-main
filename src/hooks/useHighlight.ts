import { useWorkspace } from "../contexts/WorkspaceContext";

export const useHighlight = () => {
  const { highlightedSectionId, triggerHighlight } = useWorkspace();
  return { highlightedSectionId, triggerHighlight };
};
