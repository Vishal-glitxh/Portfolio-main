import { FiAward, FiBookOpen, FiCpu, FiShield } from "react-icons/fi";
import "./styles/Career.css";

const credentials = [
  {
    title: "IBM Cybersecurity Fundamentals",
    icon: FiShield,
    summary: "Threat mitigation, data privacy, and systems security management.",
    id: "abdd04e5-8a87-4546-bce2-9eec5b30b57a",
  },
  {
    title: "IBM AI Fundamentals",
    icon: FiCpu,
    summary: "Machine learning, deep learning, language and vision models, AI ethics, chatbots, and Watson Studio.",
    id: "659c71c4-80bc-409f-b2e4-ca41b93e9657",
  },
];

const Career = () => (
  <section className="education-section" id="education" aria-labelledby="education-heading">
    <h2 id="education-heading">Education <span>&amp;</span> Credentials</h2>
    <div className="education-layout">
      <article className="education-degree">
        <div className="education-year">
          <FiBookOpen aria-hidden="true" />
          <span>Expected graduation<strong>2028</strong></span>
        </div>
        <div className="education-degree-copy">
          <p className="education-label">Bachelor of Engineering</p>
          <h3>Artificial Intelligence &amp; Machine Learning</h3>
          <p>Visvesvaraya Technological University (VTU)</p>
        </div>
        <div className="education-focus">
          <h4>Focus areas</h4>
          <ul>{["Machine learning", "Deep learning", "Neural networks", "Natural language processing", "Computer vision", "AI ethics"].map(topic => <li key={topic}>{topic}</li>)}</ul>
        </div>
      </article>
      <ol className="education-milestones" aria-label="Credentials and ongoing learning">
        {credentials.map(({ title, icon: Icon, summary, id }) => (
          <li key={id}>
            <span className="education-marker"><Icon aria-hidden="true" /></span>
            <div>
              <p className="education-label">IBM Professional Certification</p>
              <h3>{title}</h3>
              <p>{summary}</p>
              <details><summary>Credential ID</summary><code>{id}</code></details>
            </div>
          </li>
        ))}
        <li>
          <span className="education-marker"><FiAward aria-hidden="true" /></span>
          <div>
            <p className="education-label">Ongoing · Independent study</p>
            <h3>Continuous AI &amp; ML learning</h3>
            <p>Reading deep learning papers, experimenting with neural architectures, contributing on GitHub, and following developments in AI ethics.</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
);

export default Career;
