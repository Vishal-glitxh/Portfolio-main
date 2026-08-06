import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I am an AI Engineer & Full-Stack Developer and Undergraduate Engineering Student at VTU passionate about developing intelligent software solutions that solve practical problems. My experience spans machine learning modeling, natural language processing, semantic search engines, and full-stack web integration. I focus on building clean applications, analyzing data patterns, and strengthening cybersecurity systems using Python, React, Node.js, and modern cloud deployment pipelines.
        </p>
        <div className="about-metrics-grid">
          <div className="metric-card">
            <span className="metric-num">4+</span>
            <span className="metric-desc">AI & Dev Projects</span>
          </div>
          <div className="metric-card">
            <span className="metric-num">20+</span>
            <span className="metric-desc">Tech & Frameworks</span>
          </div>
          <div className="metric-card">
            <span className="metric-num">2</span>
            <span className="metric-desc">IBM Certifications</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
