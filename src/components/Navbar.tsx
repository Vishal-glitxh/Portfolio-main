import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { trackRecruiterModeOpened } from "./utils/analytics";
import "./styles/Navbar.css";

import { setSmoother } from "./utils/smoother";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

interface NavbarProps {
  isRecruiterOpen: boolean;
  onToggleRecruiter: () => void;
}

const Navbar = ({ isRecruiterOpen, onToggleRecruiter }: NavbarProps) => {
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isRecruiterOpen && toggleButtonRef.current) {
      toggleButtonRef.current.focus();
    }
  }, [isRecruiterOpen]);

  useEffect(() => {
    const smootherInstance = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });
    setSmoother(smootherInstance);

    smootherInstance.scrollTop(0);
    smootherInstance.paused(true);

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const elem = e.currentTarget as HTMLAnchorElement;
          const section = elem.getAttribute("data-href");
          smootherInstance.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);
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
