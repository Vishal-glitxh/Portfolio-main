import { useWorkspace, WorkspaceTab } from "../contexts/WorkspaceContext";

export const useTabs = () => {
  const { activeTab, setActiveTab } = useWorkspace();
  
  const handleTabKeyDown = (e: React.KeyboardEvent, tabIds: readonly WorkspaceTab[]) => {
    const currentIndex = tabIds.indexOf(activeTab);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % tabIds.length;
      setActiveTab(tabIds[nextIndex]);
      document.getElementById(`tab-${tabIds[nextIndex]}`)?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + tabIds.length) % tabIds.length;
      setActiveTab(tabIds[prevIndex]);
      document.getElementById(`tab-${tabIds[prevIndex]}`)?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveTab(tabIds[0]);
      document.getElementById(`tab-${tabIds[0]}`)?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveTab(tabIds[tabIds.length - 1]);
      document.getElementById(`tab-${tabIds[tabIds.length - 1]}`)?.focus();
    }
  };

  return { activeTab, setActiveTab, handleTabKeyDown };
};
