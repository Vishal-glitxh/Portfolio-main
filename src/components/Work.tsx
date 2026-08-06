import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    num: "01",
    name: "NovaIsland",
    category: "Native macOS Productivity Platform",
    role: "macOS Software Engineer & AI Systems Developer",
    stack: "Swift 6, SwiftUI, AppKit, Ollama, OpenAI, Gemini, Claude",
    bullets: [
      "Description: A native macOS productivity platform that transforms the MacBook notch into an intelligent workspace combining AI assistance, system widgets, and developer tools.",
      "Problem Statement: Building a non-intrusive floating dynamic overlay that interfaces with native APIs without stealing active keyboard focus or draining system batteries.",
      "Solution Overview: Engineered a modular architecture using SwiftUI/AppKit bridged via NSPanel window styles and isolated thread states via Swift Concurrency.",
      "GitHub & Status: Active Development (35–40% progress). Repository hosted at github.com/Vishal-glitxh. Beta release target: Q1 2027."
    ],
    image: "/images/novaisland_mockup.png"
  },
  {
    num: "02",
    name: "AI Study Companion",
    category: "NLP & Semantic Exam Predictor",
    role: "AI & NLP Developer",
    stack: "Python, NLP, Semantic Search, React, MongoDB",
    bullets: [
      "Description: An AI-powered study companion that predicts likely examination questions using intelligent document analysis.",
      "Problem Statement: Suboptimal preparation due to student difficulties in identifying key exam topics and patterns.",
      "Solution Overview: Built a Semantic-Match-Engine utilizing high-dimensional 768-dim embeddings and cosine similarity matches.",
      "GitHub & Status: Under Development (70% progress). Repository hosted at github.com/Vishal-glitxh. Live demo under construction."
    ],
    image: "/images/ai_study_companion_mockup.png"
  },
  {
    num: "03",
    name: "Intelligent Development Platform (IDP)",
    category: "Skills Mapping & Analytics Platform",
    role: "Full-Stack & Analytics Engineer",
    stack: "React, Node.js, Python, Visualization, 9-Box Matrix",
    bullets: [
      "Description: An intelligent employee development platform for skills mapping and talent visualization.",
      "Problem Statement: Difficulty in tracking employee potential, mapping workforce capabilities, and identifying growth paths.",
      "Solution Overview: Analyzes workforce skills using the 9-Box Talent Matrix mapping performance and potential nodes.",
      "GitHub & Status: Under Development (55% progress). Repository hosted at github.com/Vishal-glitxh. Live demo under construction."
    ],
    image: "/images/idp_mockup.png"
  },
  {
    num: "04",
    name: "Personal Portfolio",
    category: "3D Interactive Web Presence",
    role: "Frontend & 3D Interaction Developer",
    stack: "React, TypeScript, Three.js, GSAP, CSS",
    bullets: [
      "Description: A premium, highly interactive portfolio featuring a 3D avatar that tracks user scroll and movement.",
      "Problem Statement: Displaying complex engineering skills and projects in a static, unengaging format.",
      "Solution Overview: Integrated React Three Fiber canvas elements and GSAP ScrollSmoother pipelines with pixel-perfect layouts.",
      "GitHub & Status: Completed. Repository hosted at github.com/Vishal-glitxh. Live demo is this website."
    ],
    image: "/images/portfolio_mockup.png"
  }
];

interface WorkProps {
  onProjectClick: (name: string) => void;
}

const Work = ({ onProjectClick }: WorkProps) => {
  useGSAP(() => {
    function s() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return 0;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      return rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    let r = s();
    let debounceId: number | null = null;
    function t() {
      if (debounceId) {
        clearTimeout(debounceId);
      }
      debounceId = setTimeout(() => {
        r = s();
      }, 200) as unknown as number;
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: "+=1500",
        scrub: 0.5,
        pinSpacing: true,
        pin: true,
        pinType: window.innerWidth > 1024 ? "transform" : "fixed",
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: () => -r,
      duration: 500,
      delay: 0.2,
    });

    window.addEventListener("resize", t);

    // Clean up
    return () => {
      window.removeEventListener("resize", t);
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div 
              className="work-box" 
              key={index}
              onClick={() => onProjectClick(project.name)}
              tabIndex={0}
              role="button"
              aria-label={`Open engineering details for ${project.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onProjectClick(project.name);
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.num}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p style={{ color: "var(--accentColor)", fontWeight: 500 }}>{project.category}</p>
                  </div>
                </div>
                <div className="project-details" style={{ marginBottom: "12px", borderBottom: "1px dashed rgba(255,255,255,0.1)", paddingBottom: "8px" }}>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#eae5ec", margin: 0 }}>
                    Role: {project.role}
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--accentColor)", margin: "4px 0 0 0", opacity: 0.8 }}>
                    Stack: {project.stack}
                  </p>
                </div>
                <div className="project-highlights" style={{ marginTop: "8px" }}>
                  <ul style={{ paddingLeft: "15px", margin: 0, listStyleType: "square" }}>
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx} style={{ fontSize: "13px", lineHeight: "1.5", color: "#adacac", marginBottom: "8px" }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <WorkImage image={project.image} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
