import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> Credentials
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.E. (AI & ML)</h4>
                <h5>Visvesvaraya Technological University (VTU)</h5>
              </div>
              <h3>2028</h3>
            </div>
            <p>
              Bachelor of Engineering in Artificial Intelligence & Machine Learning. Focus areas: Machine Learning, Deep Learning, Neural Networks, Natural Language Processing, Computer Vision, and AI Ethics.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>IBM Cybersecurity Fundamentals</h4>
                <h5>IBM Professional Certification</h5>
              </div>
              <h3>CERT</h3>
            </div>
            <p>
              Verified Credential (ID: abdd04e5-8a87-4546-bce2-9eec5b30b57a). Mastered fundamental cybersecurity principles, including threat mitigation, data privacy, and systems security management.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>IBM AI Fundamentals</h4>
                <h5>IBM Professional Certification</h5>
              </div>
              <h3>CERT</h3>
            </div>
            <p>
              Verified Credential (ID: 659c71c4-80bc-409f-b2e4-ca41b93e9657). Built a strong foundation in AI, Machine Learning, Deep Learning, NLP, Computer Vision, AI Ethics, Chatbots, and Watson Studio.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Continuous AI & ML Learning</h4>
                <h5>Self-Driven Expertise</h5>
              </div>
              <h3>ongoing</h3>
            </div>
            <p>
              Consistently researching deep learning papers, experimenting with neural architectures, maintaining active GitHub contributions, and keeping up with ethical AI guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
