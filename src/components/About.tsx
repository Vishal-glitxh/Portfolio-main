import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I’m Vishal Suhas, an AI &amp; ML engineering student at VTU, graduating
          in 2028. I build AI applications, full-stack web tools, and native macOS
          experiences.
        </p>
        <p className="about-project-summary">
          My projects include NovaIsland, a macOS productivity workspace, an AI
          study companion with semantic search, and a platform for skills mapping
          and analytics.
        </p>
        <dl className="about-skills">
          <div>
            <dt>AI &amp; data</dt>
            <dd>Python · NLP · Semantic search · LLM integration</dd>
          </div>
          <div>
            <dt>Web development</dt>
            <dd>React · TypeScript · Node.js · MongoDB</dd>
          </div>
          <div>
            <dt>Native macOS</dt>
            <dd>Swift · SwiftUI · AppKit</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default About;
