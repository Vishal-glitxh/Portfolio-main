import { PropsWithChildren, useEffect, useState, lazy, Suspense, useRef } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechStack from "./TechStack";
import { useLightweightLayout } from "../hooks/useLightweightLayout";
import { useLoading } from "../context/LoadingProvider";
import "../styles/mobile.css";
import ArtworkViewer, { type Artwork } from "./ArtworkViewer";
import { projectForSlug, projectPath } from "../data/projectLinks";

const RecruiterPanel = lazy(() => import("./RecruiterPanel"));
const ProjectExplorer = lazy(() => import("./ProjectExplorer"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const lightweight = useLightweightLayout();
  const isDesktopView = !lightweight;
  const [showCharacter, setShowCharacter] = useState(false);
  const { setIsLoading } = useLoading();
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(() => projectForSlug(window.location.pathname.split("/")[2] || "") || null);
  const artworks: Artwork[] = [
    { title: "NovaIsland", src: "/images/novaisland_mockup.png" },
    { title: "AI Study Companion", src: "/images/ai_study_companion_mockup.png" },
    { title: "Intelligent Development Platform (IDP)", src: "/images/idp_mockup.png" },
    { title: "Personal Portfolio", src: "/images/portfolio_mockup.png" },
  ];
  const [artworkIndex, setArtworkIndex] = useState<number | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  const handleOpenProject = (name: string) => {
    lastActiveElementRef.current = document.activeElement as HTMLElement;
    window.history.pushState({ project: name }, "", projectPath(name));
    setSelectedProject(name);
  };

  const handleCloseProject = () => {
    window.history.pushState(null, "", "/#work");
    setSelectedProject(null);
    setTimeout(() => {
      if (lastActiveElementRef.current) {
        lastActiveElementRef.current.focus();
      }
    }, 100);
  };

  useEffect(() => {
    const onPopState = () => setSelectedProject(projectForSlug(window.location.pathname.split("/")[2] || "") || null);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (lightweight) {
      setIsLoading(false);
      document.body.style.overflowY = "auto";
    }
  }, [lightweight, setIsLoading]);

  return (
    <div className={`container-main ${lightweight ? "mobile-layout" : ""}`}>
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
            <Work onProjectClick={handleOpenProject} onArtworkClick={name => setArtworkIndex(artworks.findIndex(item => item.title === name))} />
            <TechStack />
            <Contact />
          </div>
        </div>
      </div>
      {artworkIndex !== null && <ArtworkViewer artworks={artworks} index={artworkIndex} onClose={() => setArtworkIndex(null)} />}
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
