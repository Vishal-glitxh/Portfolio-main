import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { trackRecruiterModeOpened } from "./utils/analytics";
import "./styles/Navbar.css";

import { useLightweightLayout } from "../hooks/useLightweightLayout";
import { setSmoother } from "./utils/smoother";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

interface NavbarProps {
  isRecruiterOpen: boolean;
  onToggleRecruiter: () => void;
}

const Navbar = ({ isRecruiterOpen, onToggleRecruiter }: NavbarProps) => {
  const lightweight = useLightweightLayout();
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const wasRecruiterOpen = useRef(false);
  useEffect(() => {
    if (wasRecruiterOpen.current && !isRecruiterOpen && toggleButtonRef.current) {
      toggleButtonRef.current.focus();
    }
    wasRecruiterOpen.current = isRecruiterOpen;
  }, [isRecruiterOpen]);

  useEffect(() => {
    if (lightweight) return;
    const instance = ScrollSmoother.create({
      wrapper: "#smooth-wrapper", content: "#smooth-content", smooth: 1.7,
      effects: true, autoResize: true, ignoreMobileResize: true,
    });
    setSmoother(instance);
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".header ul a"));
    const navigate = (event: Event) => {
      const section = (event.currentTarget as HTMLAnchorElement).getAttribute("data-href");
      if (!section) return;
      event.preventDefault();
      instance.scrollTo(section, true, "top top");
    };
    links.forEach(link => link.addEventListener("click", navigate));
    return () => {
      links.forEach(link => link.removeEventListener("click", navigate));
      instance.kill();
      setSmoother(undefined);
    };
  }, [lightweight]);
  return (
    <>
      <div className="header" id="nav">
        <a href="/" className="logo" data-cursor="disable">
          VISHAL SUHAS
        </a>
        <a
          href="mailto:vishalsuhas0662@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          vishalsuhas0662@gmail.com
        </a>
        <ul>
          <li>
            <button
              ref={toggleButtonRef}
              onClick={() => {
                trackRecruiterModeOpened();
                onToggleRecruiter();
              }}
              className="recruiter-toggle-btn"
              data-cursor="disable"
              aria-label="Open Recruiter Mode Side Panel"
            >
              <HoverLinks text="RECRUITER" />
            </button>
          </li>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
