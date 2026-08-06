import React from "react";
import { FaListUl, FaGithub, FaExternalLinkAlt, FaArrowRight, FaDownload } from "react-icons/fa";
import { ProjectDetails } from "../../types";
import { trackGitHubClicked, trackDemoClicked } from "../utils/analytics";

interface WorkspaceLayoutProps {
  project: ProjectDetails;
  scrollToArchitecture: () => void;
  children: React.ReactNode;
}

export const WorkspaceLayout = React.memo(({
  project,
  scrollToArchitecture,
  children
}: WorkspaceLayoutProps) => {
  const getStatusClass = (status: string) => {
    const norm = status.toLowerCase();
    if (norm.includes("live") || norm.includes("active")) return "active";
    if (norm.includes("progress")) return "updating";
    return "inactive";
  };

  const getStatusText = (status: string) => {
    return status;
  };

  return (
    <div className="explorer-grid-layout">
      {/* LEFT COLUMN: Scrollable Workspace Content */}
      <div className="explorer-left-col">
        {children}
      </div>

      {/* RIGHT COLUMN: Sticky Sidebar */}
      <div className="explorer-right-col">
        <div className="sticky-sidebar-wrapper">
          {/* Status Card */}
          <div className="sidebar-card">
            <span className="sidebar-card-title">Project Status</span>
            <div className="status-badge-wrapper">
              <span className={`status-badge-pulse ${getStatusClass(project.status)}`} />
              <span className="status-badge-text">{getStatusText(project.status)}</span>
            </div>
          </div>

          {/* Role & Duration Card */}
          <div className="sidebar-card">
            <span className="sidebar-card-title">Development Info</span>
            <div className="dev-meta-info">
              <p><strong>Role:</strong> {project.role}</p>
              <p><strong>Duration:</strong> {project.duration}</p>
            </div>
          </div>

          {/* Categorized Tech Stack */}
          <div className="sidebar-card">
            <span className="sidebar-card-title">Technology Stack</span>
            <div className="categorized-skills">
              {Object.entries(project.categories).map(([category, items]) => (
                <div className="category-block" key={category}>
                  <h6>{category}</h6>
                  <div className="explorer-chips-grid">
                    {items.map((tech, idx) => (
                      <span className="explorer-chip" key={idx}>{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recruiter Quick Facts */}
          <div className="sidebar-card">
            <div className="sidebar-card-header">
              <FaListUl className="sidebar-header-icon" />
              <span className="sidebar-card-title">Recruiter Quick Facts</span>
            </div>
            <ul className="quick-facts-list">
              {project.quickFacts.map((fact, idx) => (
                <li key={idx}>{fact}</li>
              ))}
            </ul>
          </div>

          {/* Recruiter Toolkit CTA Area */}
          <div className="sidebar-card cta-card">
            <span className="sidebar-card-title">Recruiter Toolkit</span>
            <div className="explorer-actions-grid">
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => trackGitHubClicked(project.name, project.github)}
                className="explorer-btn explorer-btn-primary"
              >
                <FaGithub className="btn-icon" /> GitHub Repository
              </a>
              {project.demo ? (
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => trackDemoClicked(project.name, project.demo || "")}
                  className="explorer-btn explorer-btn-secondary"
                >
                  <FaExternalLinkAlt className="btn-icon" /> Live Demo
                </a>
              ) : (
                <button 
                  disabled 
                  className="explorer-btn explorer-btn-disabled"
                  title="Demo under construction"
                >
                  Live Demo (Coming Soon)
                </button>
              )}
              <button 
                onClick={scrollToArchitecture}
                className="explorer-btn explorer-btn-secondary"
              >
                <FaArrowRight className="btn-icon" /> View Architecture
              </button>
              <button 
                disabled 
                className="explorer-btn explorer-btn-disabled"
                title="Case study download is coming soon"
              >
                <FaDownload className="btn-icon" /> Case Study (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

WorkspaceLayout.displayName = "WorkspaceLayout";
export default WorkspaceLayout;
