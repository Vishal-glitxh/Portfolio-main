import { useEffect, useState, useMemo } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { 
  FaPython, FaNodeJs, FaDatabase, FaBrain, FaCube, FaAward, FaBookReader
} from "react-icons/fa";
import { 
  SiTypescript, SiTensorflow, SiMongodb, SiPrisma, SiSwift,
  SiNextdotjs, SiReact, SiThreedotjs, SiFramer,
  SiTailwindcss, SiFastapi, SiDjango, SiDocker, SiFirebase,
  SiGithubactions, SiXcode, SiFigma, SiPostman, SiOpenai,
  SiGoogle, SiAnthropic, SiSqlite, SiSupabase, SiVercel,
  SiRender, SiNetlify, SiNpm, SiPnpm, SiHomebrew, SiJavascript,
  SiHtml5, SiCss3, SiVite, SiPostgresql, SiMysql, SiVisualstudiocode
} from "react-icons/si";
import { GiShield } from "react-icons/gi";
import { skillsData } from "../data/skillsData";
import "./styles/TechStack.css";

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedSkillName, setSelectedSkillName] = useState<string>("Python");

  const categories = [
    "All", 
    "Frontend Engineering", 
    "Backend Engineering", 
    "Databases", 
    "Artificial Intelligence", 
    "Native macOS Development", 
    "DevOps & Deployment", 
    "Tools & Productivity"
  ];

  useEffect(() => {
    // Refresh ScrollTrigger to ensure bounds are aligned
    ScrollTrigger.refresh();
    
    // Bento card dynamic interactive mouse light trails
    const cards = document.querySelectorAll(".bento-card");
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const card = mouseEvent.currentTarget as HTMLDivElement;
      const rect = card.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;
      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
    };

    cards.forEach((card) => {
      card.addEventListener("mousemove", handleMouseMove);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleMouseMove);
      });
    };
  }, []);

  // GSAP transition when active skill changes
  useEffect(() => {
    gsap.fromTo(".inspector-animate",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" }
    );
  }, [selectedSkillName]);

  const sortedSkills = useMemo(() => {
    return [...skillsData]
      .filter((skill) => activeCategory === "All" || skill.category === activeCategory)
      .sort((a, b) => {
        // 1. isPrimary (descending - primary first)
        const primaryA = a.isPrimary ? 1 : 0;
        const primaryB = b.isPrimary ? 1 : 0;
        if (primaryA !== primaryB) {
          return primaryB - primaryA;
        }
        // 2. displayOrder (ascending)
        if (a.displayOrder !== b.displayOrder) {
          return a.displayOrder - b.displayOrder;
        }
        // 3. alphabetical (ascending)
        return a.name.localeCompare(b.name);
      });
  }, [activeCategory]);

  const selectedSkill = useMemo(() => {
    return skillsData.find((s) => s.name === selectedSkillName) || skillsData[0];
  }, [selectedSkillName]);

  const relatedSkills = useMemo(() => {
    return [...skillsData]
      .filter((s) => s.category === selectedSkill.category && s.id !== selectedSkill.id)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .slice(0, 4);
  }, [selectedSkill]);

  const getSkillIcon = (id: string) => {
    switch (id) {
      case "react":
        return <SiReact className="skill-icon react" />;
      case "nextjs":
        return <SiNextdotjs className="skill-icon nextjs" />;
      case "typescript":
        return <SiTypescript className="skill-icon typescript" />;
      case "tailwindcss":
        return <SiTailwindcss className="skill-icon tailwind" />;
      case "threejs":
        return <SiThreedotjs className="skill-icon three" />;
      case "r3f":
        return <SiReact className="skill-icon r3f" />;
      case "gsap":
        return <FaAward className="skill-icon gsap" />;
      case "framermotion":
        return <SiFramer className="skill-icon framer" />;
      case "javascript":
        return <SiJavascript className="skill-icon javascript" />;
      case "html5":
        return <SiHtml5 className="skill-icon html5" />;
      case "css3":
        return <SiCss3 className="skill-icon css3" />;
      case "vite":
        return <SiVite className="skill-icon vite" />;
      case "shadcnui":
        return <SiReact className="skill-icon shadcn" />;
      case "python":
        return <FaPython className="skill-icon python" />;
      case "nodejs":
        return <FaNodeJs className="skill-icon nodejs" />;
      case "expressjs":
        return <FaNodeJs className="skill-icon express" />;
      case "fastapi":
        return <SiFastapi className="skill-icon fastapi" />;
      case "flask":
        return <FaPython className="skill-icon flask" />;
      case "django":
        return <SiDjango className="skill-icon django" />;
      case "restapis":
        return <FaDatabase className="skill-icon rest" />;
      case "jwt":
        return <GiShield className="skill-icon jwt" />;
      case "prisma":
        return <SiPrisma className="skill-icon prisma" />;
      case "postgresql":
        return <SiPostgresql className="skill-icon postgres" />;
      case "mysql":
        return <SiMysql className="skill-icon mysql" />;
      case "mongodb":
        return <SiMongodb className="skill-icon mongodb" />;
      case "sqlite":
        return <SiSqlite className="skill-icon sqlite" />;
      case "supabase":
        return <SiSupabase className="skill-icon supabase" />;
      case "tensorflow":
        return <SiTensorflow className="skill-icon tensorflow" />;
      case "numpy":
        return <FaPython className="skill-icon numpy" />;
      case "pandas":
        return <FaPython className="skill-icon pandas" />;
      case "nlp":
        return <FaBrain className="skill-icon nlp" />;
      case "rag":
        return <FaBrain className="skill-icon rag" />;
      case "ollama":
        return <FaBrain className="skill-icon ollama" />;
      case "openai":
        return <SiOpenai className="skill-icon openai" />;
      case "geminiapi":
        return <SiGoogle className="skill-icon gemini" />;
      case "claudeapi":
        return <SiAnthropic className="skill-icon claude" />;
      case "vectorembeddings":
        return <FaBrain className="skill-icon vector" />;
      case "swift":
        return <SiSwift className="skill-icon swift" />;
      case "swiftui":
        return <SiSwift className="skill-icon swiftui" />;
      case "appkit":
        return <SiSwift className="skill-icon appkit" />;
      case "swiftconcurrency":
        return <SiSwift className="skill-icon concurrency" />;
      case "swiftactors":
        return <SiSwift className="skill-icon actors" />;
      case "mvvm":
        return <FaCube className="skill-icon mvvm" />;
      case "observation":
        return <SiSwift className="skill-icon observation" />;
      case "spm":
        return <SiSwift className="skill-icon spm" />;
      case "git":
        return <FaDatabase className="skill-icon git" />;
      case "github":
        return <SiGithubactions className="skill-icon github" />;
      case "githubactions":
        return <SiGithubactions className="skill-icon actions" />;
      case "docker":
        return <SiDocker className="skill-icon docker" />;
      case "vercel":
        return <SiVercel className="skill-icon vercel" />;
      case "render":
        return <SiRender className="skill-icon render" />;
      case "netlify":
        return <SiNetlify className="skill-icon netlify" />;
      case "firebase":
        return <SiFirebase className="skill-icon firebase" />;
      case "linuxcli":
        return <FaDatabase className="skill-icon linux" />;
      case "vscode":
        return <SiVisualstudiocode className="skill-icon vscode" />;
      case "xcode":
        return <SiXcode className="skill-icon xcode" />;
      case "cursorai":
        return <FaBrain className="skill-icon cursor" />;
      case "figma":
        return <SiFigma className="skill-icon figma" />;
      case "postman":
        return <SiPostman className="skill-icon postman" />;
      case "npm":
        return <SiNpm className="skill-icon npm" />;
      case "pnpm":
        return <SiPnpm className="skill-icon pnpm" />;
      case "homebrew":
        return <SiHomebrew className="skill-icon homebrew" />;
      case "lmstudio":
        return <FaCube className="skill-icon lmstudio" />;
      default:
        return <FaDatabase className="skill-icon general" />;
    }
  };

  const getProjectDisplayName = (id: string) => {
    switch (id) {
      case "novaisland":
        return "NovaIsland";
      case "studycompanion":
        return "AI Study Companion";
      case "idp":
        return "IDP";
      case "portfolio":
        return "Personal Portfolio";
      default:
        return id;
    }
  };

  // Radial progress calculations
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (selectedSkill.strength / 100) * circumference;

  return (
    <div className="techstack" id="techstack">
      <section className="tech-header">
        <h2 className="tech-header-title">Engineering Intelligence</h2>
        <p className="tech-header-description">
          Interactive technology map highlighting engineering capabilities, project experience and recruiter insights.
        </p>
        <div className="tech-header-divider" />
        <span className="tech-filter-label">Recruiter Filters</span>
        <div className="tech-filter-container">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                // Auto-select first matching skill under the new category
                const firstMatch = skillsData.find(s => cat === "All" || s.category === cat);
                if (firstMatch) {
                  setSelectedSkillName(firstMatch.name);
                }
              }}
              aria-pressed={activeCategory === cat}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Screen Reader Announcements live region */}
      <div className="sr-only" aria-live="polite">
        Showing {sortedSkills.length} skills for {activeCategory}
      </div>

      {/* Bento Grid layout */}
      <div className="tech-bento-grid engineering-grid">
        
        {/* LEFT CARD: Skills Map grid */}
        <div className="bento-card bento-skills-map">
          <div className="bento-card-header">
            <h3>Skills Network Map</h3>
            <p>Click on any capability node below to inspect its mapped projects, credentials, and coursework.</p>
          </div>
          
          <div className="skills-interactive-container">
            {sortedSkills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => setSelectedSkillName(skill.name)}
                className={`skill-tag interactive-tag ${selectedSkillName === skill.name ? "skill-tag-active" : ""} ${skill.isPrimary ? "is-primary-tag" : ""}`}
                aria-label={`Inspect ${skill.name} connections`}
              >
                {getSkillIcon(skill.id)}
                <span>{skill.name}</span>
                {selectedSkillName === skill.name && <span className="active-glow-dot" />}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT CARD: Connection Inspector */}
        <div className="bento-card bento-skills-inspector">
          <div className="bento-card-header">
            <h3>Connection Inspector</h3>
            <p>Direct relational mapping of the selected technical capability.</p>
          </div>

          <div className="inspector-content-wrapper inspector-animate">
            
            {/* Header info */}
            <div className="inspector-head">
              <div className="inspector-title-row">
                {getSkillIcon(selectedSkill.id)}
                <h4>{selectedSkill.name}</h4>
              </div>
              <span className="inspector-cat-badge">{selectedSkill.category}</span>
            </div>

            <p className="inspector-description">{selectedSkill.description || "Core engineering technology."}</p>

            <div className="inspector-details-row">
              {/* Radial Proficiency Gauge */}
              <div className="radial-metric-box">
                <svg className="radial-progress-svg" width="90" height="90">
                  <circle
                    className="radial-progress-bg"
                    cx="45"
                    cy="45"
                    r={radius}
                  />
                  <circle
                    className="radial-progress-bar"
                    cx="45"
                    cy="45"
                    r={radius}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 45 45)"
                  />
                  <text className="radial-progress-text" x="45" y="49">
                    {selectedSkill.strength}%
                  </text>
                </svg>
                <div className="radial-labels">
                  <span className="radial-label-exp">{selectedSkill.expertise}</span>
                  <span className="radial-label-sub">Proficiency</span>
                </div>
              </div>

              {/* Mapped Connections list */}
              <div className="mapped-connections-lists">
                
                {/* 1. Projects mapping */}
                <div className="connection-group">
                  <span className="connection-title">
                    <FaCube className="conn-icon" /> Applied in Projects:
                  </span>
                  {selectedSkill.projects.length > 0 ? (
                    <div className="connection-chips-row">
                      {selectedSkill.projects.map((projId, idx) => (
                        <a href="#work" className="conn-project-chip" key={idx}>
                          {getProjectDisplayName(projId)}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <span className="connection-empty-text">None currently featured</span>
                  )}
                </div>

                {/* 2. Coursework mapping */}
                <div className="connection-group">
                  <span className="connection-title">
                    <FaBookReader className="conn-icon" /> Applied in Coursework (VTU):
                  </span>
                  {selectedSkill.coursework && selectedSkill.coursework.length > 0 ? (
                    <ul className="connection-list">
                      {selectedSkill.coursework.map((course, idx) => (
                        <li key={idx}>{course}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="connection-empty-text">Self-taught / Applied independently</span>
                  )}
                </div>

                {/* 3. Certification mapping */}
                <div className="connection-group">
                  <span className="connection-title">
                    <FaAward className="conn-icon" /> Linked Credentials:
                  </span>
                  {selectedSkill.certifications && selectedSkill.certifications.length > 0 ? (
                    <ul className="connection-list credential-list">
                      {selectedSkill.certifications.map((cert, idx) => (
                        <li key={idx}>{cert} (Verified)</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="connection-empty-text">No external certifications linked</span>
                  )}
                </div>

                {/* 4. Related Technologies mapping */}
                {relatedSkills.length > 0 && (
                  <div className="connection-group">
                    <span className="connection-title">
                      <FaCube className="conn-icon" /> Related Technologies:
                    </span>
                    <div className="connection-chips-row">
                      {relatedSkills.map((relSkill) => (
                        <button
                          key={relSkill.id}
                          onClick={() => setSelectedSkillName(relSkill.name)}
                          className="conn-project-chip related-tech-chip"
                          aria-label={`Inspect related skill ${relSkill.name}`}
                        >
                          {relSkill.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TechStack;
