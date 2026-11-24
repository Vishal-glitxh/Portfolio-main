import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <p className="landing-eyebrow">AI and machine learning engineering student</p>
            <h1>
              VISHAL
              <br />
              <span>SUHAS</span>
            </h1>
          </div>
          <p className="landing-info">Building AI, web, and native macOS projects.</p>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
