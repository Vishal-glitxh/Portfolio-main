import { PropsWithChildren, useEffect, useState, lazy, Suspense, useRef } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechStack from "./TechStack";
import setSplitText, { resetSplitText } from "./utils/splitText";
import { useLightweightLayout } from "../hooks/useLightweightLayout";
import { useLoading } from "../context/LoadingProvider";
import "../styles/mobile.css";

const RecruiterPanel = lazy(() => import("./RecruiterPanel"));
const ProjectExplorer = lazy(() => import("./ProjectExplorer"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const lightweight = useLightweightLayout();
  const isDesktopView = !lightweight;
  const [showCharacter, setShowCharacter] = useState(false);
  const { setIsLoading } = useLoading();
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  const handleOpenProject = (name: string) => {
    lastActiveElementRef.current = document.activeElement as HTMLElement;
    setSelectedProject(name);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    setTimeout(() => {
      if (lastActiveElementRef.current) {
        lastActiveElementRef.current.focus();
      }
    }, 100);
  };

  useEffect(() => {
    const resizeHandler = () => {
      if (isDesktopView) setSplitText();
    };
    if (lightweight) {
      resetSplitText();
      setIsLoading(false);
      document.body.style.overflowY = "auto";
    }
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView, lightweight, setIsLoading]);

  return (
    <div className={`container-main ${lightweight ? "mobile-layout" : ""}`}>
      {isDesktopView && <Cursor />}
      <Navbar isRecruiterOpen={isRecruiterOpen} onToggleRecruiter={() => setIsRecruiterOpen(true)} />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{lightweight && <div className="mobile-character-stage">
              {showCharacter ? <>
                {children}
                <button className="character-toggle" onClick={() => setShowCharacter(false)}>Close 3D character</button>
              </> : <button className="character-toggle" onClick={() => setShowCharacter(true)}>
                View 3D character <span>Optional interactive preview</span>
              </button>}
            </div>}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work onProjectClick={handleOpenProject} />
            <TechStack />
            <Contact />
          </div>
        </div>
      </div>
      {isRecruiterOpen && (
        <Suspense fallback={null}>
          <RecruiterPanel isOpen={isRecruiterOpen} onClose={() => setIsRecruiterOpen(false)} />
        </Suspense>
      )}
      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectExplorer projectName={selectedProject} onClose={handleCloseProject} />
        </Suspense>
      )}
    </div>
  );
};

export default MainContainer;
