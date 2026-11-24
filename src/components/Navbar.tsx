import { useEffect, useRef, useState } from "react";
import HoverLinks from "./HoverLinks";
import { trackRecruiterModeOpened } from "./utils/analytics";
import "./styles/Navbar.css";

import { useLightweightLayout } from "../hooks/useLightweightLayout";

interface NavbarProps {
  isRecruiterOpen: boolean;
  onToggleRecruiter: () => void;
}

const Navbar = ({ isRecruiterOpen, onToggleRecruiter }: NavbarProps) => {
  const lightweight = useLightweightLayout();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const wasRecruiterOpen = useRef(false);
  useEffect(() => {
    if (wasRecruiterOpen.current && !isRecruiterOpen && toggleButtonRef.current) {
      toggleButtonRef.current.focus();
    }
    wasRecruiterOpen.current = isRecruiterOpen;
  }, [isRecruiterOpen]);

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
        {lightweight && <button className="mobile-menu-toggle" type="button" aria-label="Toggle navigation menu" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? "Close" : "Menu"}</button>}
        <ul id="primary-navigation" className={lightweight && !menuOpen ? "mobile-menu-closed" : ""} onClick={event => { if ((event.target as HTMLElement).closest("a, button")) setMenuOpen(false); }}>
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
    </>
  );
};

export default Navbar;
