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
import setSplitText from "./utils/splitText";

const RecruiterPanel = lazy(() => import("./RecruiterPanel"));
const ProjectExplorer = lazy(() => import("./ProjectExplorer"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
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
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar isRecruiterOpen={isRecruiterOpen} onToggleRecruiter={() => setIsRecruiterOpen(true)} />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work onProjectClick={handleOpenProject} />
            {isDesktopView && <TechStack />}
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
