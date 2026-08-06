import { useWorkspace } from "../contexts/WorkspaceContext";

export const useAccordion = () => {
  const { expandedSections, toggleSection, setSectionExpanded } = useWorkspace();
  return { expandedSections, toggleSection, setSectionExpanded };
};
