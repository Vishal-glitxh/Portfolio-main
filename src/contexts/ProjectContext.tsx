import { createContext, useContext, useState, ReactNode } from "react";

interface ProjectContextType {
  selectedProject: string | null;
  isExplorerOpen: boolean;
  openProject: (projectId: string) => void;
  closeProject: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isExplorerOpen, setIsExplorerOpen] = useState<boolean>(false);

  const openProject = (projectId: string) => {
    setSelectedProject(projectId);
    setIsExplorerOpen(true);
  };

  const closeProject = () => {
    setIsExplorerOpen(false);
    // Project ID is kept temporarily to allow transition exit animations to finish
  };

  return (
    <ProjectContext.Provider value={{ selectedProject, isExplorerOpen, openProject, closeProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
