import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaTimes, 
  FaAward, FaCode, FaBriefcase, FaLightbulb, FaExternalLinkAlt 
} from "react-icons/fa";
import { trackResumeDownloaded, trackRecruiterModeOpened, trackRecruiterModeClosed } from "./utils/analytics";
import { useScrollLock } from "./utils/useScrollLock";
import "./styles/RecruiterPanel.css";

interface RecruiterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecruiterPanel = ({ isOpen, onClose }: RecruiterPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useScrollLock(isOpen, trackRecruiterModeOpened, trackRecruiterModeClosed);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  useEffect(() => {
    if (isOpen) {
      // Animate overlay in
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 }, 
        { opacity: 0.6, duration: 0.3, ease: "power2.out" }
      );

      // Animate panel slide-in
      gsap.fromTo(panelRef.current, 
        { x: "100%", opacity: 0 }, 
        { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
      );

      // Stagger reveal of content elements
      const cards = panelRef.current?.querySelectorAll(".recruiter-card, .recruiter-chip, .recruiter-btn");
      if (cards && cards.length > 0) {
        gsap.fromTo(cards, 
          { y: 15, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out", delay: 0.2 }
        );
      }
    }
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const focusableElements = panelRef.current?.querySelectorAll(
      'a[href], button:not(:disabled), [tabindex="0"]'
    );
    if (!focusableElements || focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Set initial focus to the close button
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    } else {
      firstElement.focus();
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  const content = (
    <div 
      className="recruiter-overlay-wrapper" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="recruiter-title"
      aria-describedby="recruiter-desc"
    >
      <div 
        ref={overlayRef} 
        className="recruiter-overlay" 
        onClick={handleClose}
      />
      <div 
        ref={panelRef} 
        className="recruiter-panel"
      >
        <div className="recruiter-header">
          <div>
            <span className="recruiter-subtitle">Recruiter Console &bull; Quick summary</span>
            <h3 id="recruiter-title">Vishal Suhas Summary</h3>
          </div>
          <button 
            ref={closeButtonRef}
            onClick={handleClose} 
            className="recruiter-close-btn"
            aria-label="Close Recruiter Panel"
          >
            <FaTimes />
          </button>
        </div>

        <div className="recruiter-body" id="recruiter-desc">
          
          {/* Section: Overview */}
          <div className="recruiter-card recruiter-overview">
            <div className="recruiter-section-header">
              <FaCode className="section-icon text-accent" />
              <h4>Professional Summary</h4>
            </div>
            <p>
              AI Engineer & Full-Stack Developer and B.E. (AI & ML) student at VTU (expected 2028). Specialized in building predictive models, semantic match search engines, and relational full-stack apps.
            </p>
          </div>

          {/* Section: Availability */}
          <div className="recruiter-card recruiter-availability">
            <div className="recruiter-section-header">
              <FaBriefcase className="section-icon text-availability" />
              <h4>Current Status</h4>
            </div>
            <p className="availability-highlight">
              Available for Internships & Collaborations
            </p>
          </div>

          {/* Section: Why Hire Me */}
          <div className="recruiter-card">
            <div className="recruiter-section-header">
              <FaLightbulb className="section-icon text-why" />
              <h4>Why Hire Me</h4>
            </div>
            <div className="recruiter-chips-grid">
              <span className="recruiter-chip">AI & Machine Learning</span>
              <span className="recruiter-chip">Full Stack Development</span>
              <span className="recruiter-chip">Problem Solving</span>
              <span className="recruiter-chip">Fast Learner</span>
              <span className="recruiter-chip">Team Collaboration</span>
              <span className="recruiter-chip">Continuous Learning</span>
            </div>
          </div>

          {/* Section: Core Skills */}
          <div className="recruiter-card">
            <div className="recruiter-section-header">
              <FaCode className="section-icon text-accent" />
              <h4>Core Skills</h4>
            </div>
            <div className="recruiter-skills-list">
              <p><strong>Languages:</strong> Python, Java, C++, C, JavaScript</p>
              <p><strong>Frontend/Backend:</strong> React, Next.js, Node.js, Express, Flask, HTML5/CSS3</p>
              <p><strong>Data & ML:</strong> NumPy, Pandas, Scikit-learn, Watson Studio, Power BI</p>
              <p><strong>Security & DB:</strong> Cybersecurity, Systems Security, MongoDB, MySQL, SQLite, Prisma ORM</p>
            </div>
          </div>

          {/* Section: Featured Projects */}
          <div className="recruiter-card">
            <div className="recruiter-section-header">
              <FaBriefcase className="section-icon text-project" />
              <h4>Featured Projects</h4>
            </div>
            <ul className="recruiter-projects-list">
              <li>
                <a href="#work" onClick={handleClose}>
                  <span>NovaIsland (AI Dynamic Island)</span>
                  <FaExternalLinkAlt className="project-link-icon" />
                </a>
              </li>
              <li>
                <a href="#work" onClick={handleClose}>
                  <span>AI Study Companion</span>
                  <FaExternalLinkAlt className="project-link-icon" />
                </a>
              </li>
              <li>
                <a href="#work" onClick={handleClose}>
                  <span>Intelligent Development Platform (IDP)</span>
                  <FaExternalLinkAlt className="project-link-icon" />
                </a>
              </li>
              <li>
                <a href="#work" onClick={handleClose}>
                  <span>Personal Portfolio Website</span>
                  <FaExternalLinkAlt className="project-link-icon" />
                </a>
              </li>
            </ul>
          </div>

          {/* Section: Certifications */}
          <div className="recruiter-card">
            <div className="recruiter-section-header">
              <FaAward className="section-icon text-award" />
              <h4>Certifications</h4>
            </div>
            <ul className="recruiter-cert-list">
              <li>
                <strong>IBM Cybersecurity Fundamentals</strong>
                <span>Threat mitigation & systems security management</span>
              </li>
              <li>
                <strong>IBM AI Fundamentals</strong>
                <span>Deep learning, NLP, computer vision foundations</span>
              </li>
            </ul>
          </div>

          {/* Section: Quick Actions */}
          <div className="recruiter-card recruiter-actions-card">
            <h4>Quick Actions</h4>
            <div className="recruiter-actions-grid">
              
              {/* Resume Download (Coming Soon) */}
              <button 
                disabled 
                onClick={trackResumeDownloaded}
                className="recruiter-btn recruiter-btn-disabled"
                title="Resume is under construction"
              >
                Download CV (Coming Soon)
              </button>

              {/* Resume Preview (Coming Soon) */}
              <button 
                disabled 
                onClick={trackResumeDownloaded}
                className="recruiter-btn recruiter-btn-disabled"
                title="Resume is under construction"
              >
                Preview CV (Coming Soon)
              </button>

              <a 
                href="mailto:vishalsuhas0662@gmail.com" 
                className="recruiter-btn recruiter-btn-primary"
              >
                <FaEnvelope className="btn-icon" /> Email Me
              </a>

              <a 
                href="https://www.linkedin.com/in/vishalsuhas" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="recruiter-btn recruiter-btn-secondary"
              >
                <FaLinkedin className="btn-icon" /> LinkedIn
              </a>

              <a 
                href="https://github.com/Vishal-glitxh" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="recruiter-btn recruiter-btn-secondary"
              >
                <FaGithub className="btn-icon" /> GitHub
              </a>

            </div>
          </div>

        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default RecruiterPanel;
