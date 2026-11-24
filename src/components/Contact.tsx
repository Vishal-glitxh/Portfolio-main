import { useState, type FormEvent } from "react";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const sendEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom ${name} (${email})`);
    window.location.href = `mailto:vishalsuhas0662@gmail.com?subject=${subject}&body=${body}`;
  };
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <form className="contact-form" onSubmit={sendEnquiry}>
          <label>Name<input required value={name} onChange={event => setName(event.target.value)} autoComplete="name" /></label>
          <label>Email<input required type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" /></label>
          <label>Message<textarea required value={message} onChange={event => setMessage(event.target.value)} rows={4} /></label>
          <button type="submit">Open email to send enquiry</button>
        </form>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:vishalsuhas0662@gmail.com" data-cursor="disable">
                vishalsuhas0662@gmail.com
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Location</h4>
            <p style={{ margin: "10px 0 20px 0" }}>
              <span style={{ color: "#ece9e5", fontSize: "1.1rem", fontWeight: 300 }}>
                Bangalore, Karnataka, India
              </span>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/Vishal-glitxh"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/vishalsuhas"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Vishal Suhas</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
        <nav className="legal-links" aria-label="Legal information">
          <a href="/privacy.html">Privacy policy</a>
          <a href="/terms.html">Terms and conditions</a>
        </nav>
      </div>
    </div>
  );
};

export default Contact;
