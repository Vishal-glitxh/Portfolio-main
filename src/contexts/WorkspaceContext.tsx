import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { KnowledgeCitation } from "../types";

export type WorkspaceTab = "overview" | "architecture" | "engineering" | "operations" | "qa" | "assistant";

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  citations?: KnowledgeCitation[];
}

interface WorkspaceContextType {
  activeTab: WorkspaceTab;
  setActiveTab: (tab: WorkspaceTab) => void;
  expandedSections: Record<string, boolean>;
  toggleSection: (sectionId: string) => void;
  setSectionExpanded: (sectionId: string, expanded: boolean) => void;
  highlightedSectionId: string | null;
  triggerHighlight: (sectionId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider = ({ 
  children, 
  projectName, 
  projectNameFriendly 
}: { 
  children: ReactNode; 
  projectName: string;
  projectNameFriendly: string;
}) => {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("overview");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    summary: true,
    notebook: true,
    journal: true,
    performance: true,
    testing: true,
    decisions: true,
    challenges: true,
    metrics: true,
    deployment: true,
    timeline: true,
    roadmap: true,
    pipeline: true,
    observability: true
  });
  const [highlightedSectionId, setHighlightedSectionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Initialize chat when project changes
  useEffect(() => {
    setChatMessages([
      {
        id: "welcome",
        sender: "assistant",
        text: `Hello! I am your Engineering Knowledge Assistant for ${projectNameFriendly || projectName}. Ask me anything about this project's architecture, decisions, debugging, operations, or testing strategies.`
      }
    ]);
    setSearchQuery("");
  }, [projectName, projectNameFriendly]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const setSectionExpanded = (sectionId: string, expanded: boolean) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: expanded
    }));
  };

  const triggerHighlight = (sectionId: string) => {
    setHighlightedSectionId(sectionId);
    setTimeout(() => {
      setHighlightedSectionId(null);
    }, 2000);
  };

  return (
    <WorkspaceContext.Provider value={{
      activeTab,
      setActiveTab,
      expandedSections,
      toggleSection,
      setSectionExpanded,
      highlightedSectionId,
      triggerHighlight,
      searchQuery,
      setSearchQuery,
      chatMessages,
      setChatMessages,
      isTyping,
      setIsTyping
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};
