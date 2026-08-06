import React, { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { FaTimes } from "react-icons/fa";

import { WorkspaceProvider, useWorkspace } from "../contexts/WorkspaceContext";
import { useProjectData, useFocusTrap, useKeyboardNavigation } from "../hooks";
import { 
  WorkspaceLayout,
  OverviewWorkspace,
  ArchitectureWorkspace,
  EngineeringWorkspace,
  OperationsWorkspace,
  QualityWorkspace,
  AssistantWorkspace
} from "./workspace";
import { trackProjectOpened, trackArchitectureViewed, trackProjectClosed } from "./utils/analytics";
import { useScrollLock } from "./utils/useScrollLock";
import { KnowledgeDocument, KnowledgeCitation } from "../types";

import "./styles/ProjectExplorer.css";

interface ProjectExplorerProps {
  projectName: string;
  onClose: () => void;
}

const ProjectExplorerInner = ({ projectName, onClose }: ProjectExplorerProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const {
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
  } = useProjectData(projectName);

  const {
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
  } = useWorkspace();

  const handleClose = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: onClose
    });
    tl.to(panelRef.current, {
      x: "100%",
      opacity: 0,
      duration: 0.4,
      ease: "power3.in"
    }, 0);
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    }, 0);
  }, [onClose]);

  // Hook 1: Escape key modal close
  useKeyboardNavigation("Escape", handleClose, true);

  // Hook 2: Focus Trap containment
  useFocusTrap(panelRef, true);

  // Hook 3: Custom Scroll Lock state
  useScrollLock(
    Boolean(projectName),
    () => trackProjectOpened(projectName),
    () => trackProjectClosed(projectName)
  );

  // Entry transitions
  useEffect(() => {
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 0.6, duration: 0.3, ease: "power2.out" }
    );

    gsap.fromTo(panelRef.current,
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
    );

    const elements = panelRef.current?.querySelectorAll(
      ".explorer-section, .sidebar-card, .explorer-chip, .explorer-btn"
    );
    if (elements && elements.length > 0) {
      gsap.fromTo(elements,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.03, ease: "power2.out", delay: 0.2 }
      );
    }

    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [projectName]);

  // Chat scroll anchor alignment
  useEffect(() => {
    if (activeTab === "assistant") {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isTyping, activeTab]);

  const scrollToArchitecture = () => {
    trackArchitectureViewed(project.name);
    setActiveTab("architecture");
    setTimeout(() => {
      const archSection = panelRef.current?.querySelector("#architecture-section");
      if (archSection) {
        archSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const handleCitationClick = (citation: KnowledgeCitation) => {
    setActiveTab(citation.targetTab);
    if (citation.targetSectionId) {
      setSectionExpanded(citation.targetSectionId, true);
      triggerHighlight(citation.targetSectionId);
      setTimeout(() => {
        const el = document.getElementById(citation.targetSectionId!);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);
    }
  };

  const handleQuestionTrigger = (doc: KnowledgeDocument) => {
    if (isTyping) return;
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user" as const,
      text: doc.title
    };
    setChatMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    const delay = Math.min(1200, Math.max(300, doc.body.length * 3));
    setTimeout(() => {
      const assistantMsg = {
        id: `assistant-${Date.now()}`,
        sender: "assistant" as const,
        text: doc.body,
        citations: doc.citations
      };
      setChatMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handleSearchSubmit = () => {
    if (!searchQuery.trim() || isTyping) return;
    const query = searchQuery.toLowerCase().trim();
    const match = assistant?.documents.find(doc => 
      doc.title.toLowerCase().includes(query) || 
      doc.keywords.some((k: string) => k.toLowerCase().includes(query)) ||
      doc.tags.some((t: string) => t.toLowerCase().includes(query))
    );
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user" as const,
      text: searchQuery
    };
    setChatMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setTimeout(() => {
      let responseText = `I searched the knowledge index for "${searchQuery}" but couldn't find a direct match. Try selecting one of the suggested engineering queries above or searching for keywords like GKE, incident, cache, or validation.`;
      let citations: KnowledgeCitation[] = [];
      if (match) {
        responseText = match.body;
        citations = match.citations;
      }
      const assistantMsg = {
        id: `assistant-${Date.now()}`,
        sender: "assistant" as const,
        text: responseText,
        citations
      };
      setChatMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 800);
    setSearchQuery("");
  };

  const handleTabKeyDown = (e: React.KeyboardEvent) => {
    const tabIds = ["overview", "architecture", "engineering", "operations", "qa", "assistant"] as const;
    const currentIndex = tabIds.indexOf(activeTab);
    let nextIndex = currentIndex;

    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabIds.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabIds.length) % tabIds.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = tabIds.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    setActiveTab(tabIds[nextIndex]);
    setTimeout(() => {
      document.getElementById(`tab-${tabIds[nextIndex]}`)?.focus();
    }, 50);
  };

  const renderActiveWorkspace = () => {
    switch (activeTab) {
      case "overview":
        return (
          <OverviewWorkspace
            project={project}
            evidence={evidence}
            timeline={timeline}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            highlightedSectionId={highlightedSectionId}
          />
        );
      case "architecture":
        return (
          <ArchitectureWorkspace
            project={project}
            evidence={evidence}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            highlightedSectionId={highlightedSectionId}
          />
        );
      case "engineering":
        return (
          <EngineeringWorkspace
            notebook={notebook}
            journal={journal}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            highlightedSectionId={highlightedSectionId}
          />
        );
      case "operations":
        return (
          <OperationsWorkspace
            perfReview={perfReview}
            pipeline={pipeline}
            observability={observability}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            highlightedSectionId={highlightedSectionId}
          />
        );
      case "qa":
        return (
          <QualityWorkspace
            testingStrategy={testingStrategy}
            evidence={evidence}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            highlightedSectionId={highlightedSectionId}
          />
        );
      case "assistant":
        return (
          <AssistantWorkspace
            assistant={assistant}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            chatMessages={chatMessages}
            isTyping={isTyping}
            handleSearchSubmit={handleSearchSubmit}
            handleQuestionTrigger={handleQuestionTrigger}
            handleCitationClick={handleCitationClick}
            chatEndRef={chatEndRef}
          />
        );
      default:
        return null;
    }
  };

  const tabsMeta = [
    { id: "overview" as const, label: "Overview", count: 4 },
    { id: "architecture" as const, label: "Architecture", count: 3 },
    { id: "engineering" as const, label: "Engineering", count: 2 },
    { id: "operations" as const, label: "Operations", count: 3 },
    { id: "qa" as const, label: "Quality", count: 6 },
    { id: "assistant" as const, label: "AI Assistant", count: assistant?.documents.length || 0 }
  ];

  return (
    <div 
      className="project-explorer-wrapper" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="explorer-title"
    >
      <div 
        ref={overlayRef} 
        className="explorer-overlay" 
        onClick={handleClose}
      />
      <div 
        ref={panelRef} 
        className="explorer-panel"
      >
        {/* Header */}
        <div className="explorer-header">
          <div>
            <h3 id="explorer-title">{project.name}</h3>
          </div>
          <button 
            ref={closeButtonRef}
            onClick={handleClose} 
            className="explorer-close-btn"
            aria-label="Close Project Detail Panel"
          >
            <FaTimes />
          </button>
        </div>

        {/* Explorer Body */}
        <div className="explorer-body">
          {/* Sticky Tab Navigator */}
          <div 
            className="explorer-tab-bar" 
            role="tablist" 
            aria-label="Project detail workspace tabs" 
            onKeyDown={handleTabKeyDown}
            style={{ 
              display: "flex", 
              gap: "6px", 
              borderBottom: "1px solid rgba(255,255,255,0.05)", 
              paddingBottom: "10px", 
              marginBottom: "15px", 
              position: "sticky", 
              top: "-30px", 
              zIndex: 10, 
              background: "#0a0a0f", 
              backdropFilter: "blur(8px)" 
            }}
          >
            {tabsMeta.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`explorer-tab-btn ${isActive ? "active" : ""}`}
                  style={{
                    background: isActive ? "rgba(194,164,255,0.05)" : "none",
                    border: isActive ? "1px solid rgba(194,164,255,0.2)" : "1px solid transparent",
                    borderRadius: "6px",
                    color: isActive ? "#ffffff" : "#adacac",
                    fontSize: "11px",
                    fontWeight: isActive ? 700 : 500,
                    padding: "6px 12px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    outline: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <span>{tab.label}</span>
                  <span 
                    className="tab-count-badge"
                    style={{
                      fontSize: "8px",
                      background: isActive ? "rgba(194,164,255,0.2)" : "rgba(255,255,255,0.05)",
                      color: isActive ? "#ffffff" : "#666",
                      padding: "1px 5px",
                      borderRadius: "10px"
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <WorkspaceLayout project={project} scrollToArchitecture={scrollToArchitecture}>
            <div id={`tabpanel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`} className="explorer-tab-panel">
              {renderActiveWorkspace()}
            </div>
          </WorkspaceLayout>
        </div>
      </div>
    </div>
  );
};

export const ProjectExplorer = React.memo(({ projectName, onClose }: ProjectExplorerProps) => {
  const project = useProjectData(projectName).project;
  if (!project) return null;

  const content = (
    <WorkspaceProvider projectName={projectName} projectNameFriendly={project.name}>
      <ProjectExplorerInner projectName={projectName} onClose={onClose} />
    </WorkspaceProvider>
  );

  return createPortal(content, document.body);
});

ProjectExplorer.displayName = "ProjectExplorer";
export default ProjectExplorer;
