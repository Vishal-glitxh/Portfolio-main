import { useRef, useState } from "react";
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

const orderedSkills = [...skillsData].sort((a, b) =>
  Number(Boolean(b.isPrimary)) - Number(Boolean(a.isPrimary)) ||
  a.displayOrder - b.displayOrder || a.name.localeCompare(b.name)
);
const categories = ["All", ...new Set(skillsData.map(skill => skill.category))];

const TechStack = () => {
  const [category, setCategory] = useState("All");
  const [skillId, setSkillId] = useState("python");
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const slides = orderedSkills.filter(skill => category === "All" || skill.category === category);
  const index = Math.max(0, slides.findIndex(skill => skill.id === skillId));
  const selectedSkill = slides[index];
  const relatedSkills = orderedSkills.filter(skill =>
    skill.category === selectedSkill.category && skill.id !== selectedSkill.id
  ).slice(0, 4);

  function move(step: number) {
    setSkillId(slides[(index + step + slides.length) % slides.length].id);
  }

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

  return (
    <section className="techstack" id="techstack" aria-labelledby="engineering-title">
      <header className="deck-heading">
        <h2 id="engineering-title">Engineering Intelligence</h2>
        <div className="deck-filters">
          <label>Category
            <select value={category} onChange={event => {
              setCategory(event.target.value);
              setSkillId("");
            }}>
              {categories.map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </label>
          <label>Jump to skill
            <select value={selectedSkill.id} onChange={event => setSkillId(event.target.value)}>
              {slides.map(skill => <option key={skill.id} value={skill.id}>{skill.name}</option>)}
            </select>
          </label>
        </div>
      </header>
      <div className="skill-deck" role="region" aria-roledescription="carousel" aria-label="Engineering skills"
        tabIndex={0} onKeyDown={event => {
          if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}>
        <div className="deck-controls">
          <span role="status">Skill {index + 1} of {slides.length}<span className="deck-sr">, {selectedSkill.name}</span></span>
          <div>
            <button aria-label="Previous skill" onClick={() => move(-1)}>←</button>
            <button aria-label="Next skill" onClick={() => move(1)}>→</button>
          </div>
        </div>
        <article key={selectedSkill.id} className="skill-slide" aria-roledescription="slide" aria-label={selectedSkill.name}
          onTouchStart={event => {
            const touch = event.touches[0];
            touchStart.current = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
          }}
          onTouchCancel={() => { touchStart.current = null; }}
          onTouchEnd={event => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start) return;
            const dx = event.changedTouches[0].clientX - start.x;
            const dy = event.changedTouches[0].clientY - start.y;
            if (Math.abs(dx) > 55 && Math.abs(dx) > 2 * Math.abs(dy)) move(dx < 0 ? 1 : -1);
          }}>
          <div className="skill-cover">
            <div className="deck-emblem" aria-hidden="true">{getSkillIcon(selectedSkill.id)}</div>
            <span className="deck-category">{selectedSkill.category}</span>
            <h3>{selectedSkill.name}</h3>
            <p>{selectedSkill.description}</p>
          </div>
          <div className="skill-evidence">
            {/* 1. Projects mapping */}
            <div className="connection-group">
              <span className="connection-title">
                <FaCube className="conn-icon" /> Projects
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
                <FaBookReader className="conn-icon" /> Coursework (VTU)
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
                <FaAward className="conn-icon" /> Credentials
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
                  <FaCube className="conn-icon" /> Related skills
                </span>
                <div className="connection-chips-row">
                  {relatedSkills.map((relSkill) => (
                    <button
                      key={relSkill.id}
                      onClick={event => {
                        event.currentTarget.closest<HTMLElement>(".skill-deck")?.focus({ preventScroll: true });
                        setSkillId(relSkill.id);
                      }}
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
        </article>
      </div>
    </section>
  );
};

export default TechStack;
