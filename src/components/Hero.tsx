import { ChevronRight, Mail, ArrowDown, Code, Sparkles } from "lucide-react";
import "./styles/Hero.css";
import { useEffect } from "react";
import { playClickSound } from "../utils/sound";
import gsap from "gsap";

type HeroProps = {
  name: string;
  role: string;
  imageUrl?: string;
};

export default function Hero({ name, role, imageUrl }: HeroProps) {

  useEffect(() => {
    gsap.to(".hero-bg-blob-1", {
      y: 100,
      scrollTrigger: {
        trigger: ".hero",
        scrub: true,
      },
    });
    gsap.to(".hero-bg-blob-2", {
      y: -100,
      scrollTrigger: {
        trigger: ".hero",
        scrub: true,
      },
    });
  }, []);

  const scrollToContact = () => {
    playClickSound();
    const contactSection = document.getElementById("yath-contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToProjects = () => {
    playClickSound();
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="hero">
      {/* Animated Background Blobs */}
      <div className="hero-bg-blob hero-bg-blob-1"></div>
      <div className="hero-bg-blob hero-bg-blob-2"></div>
      
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Welcome to my portfolio</span>
          </div>
          <h1 className="hero-title">
            Hi, I'm{" "}
            <span className="gradient-text">{name}</span>
          </h1>
          <p className="hero-role">{role}</p>
          <p className="hero-description">
            I’m a B.Tech student passionate about building real-world web applications 
            using modern technologies. I enjoy turning ideas into functional products 
            with clean UI and smooth user experience. Currently exploring full-stack 
            development and continuously improving my skills.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={scrollToProjects}>
              View My Work
              <ChevronRight size={18} />
            </button>
            <button className="btn-secondary" onClick={scrollToContact}>
              Let's Connect
              <Mail size={18} />
            </button>
          </div>
          <div className="hero-social">
            <a 
              href="https://github.com/Yatharth-Dubey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub"
              onClick={playClickSound}
            >
              <img src="src/assets/github.png" alt="github" className="heroicon" />
            </a>
            <a 
              href="https://www.linkedin.com/in/yatharth-dubey-34a532316" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
              onClick={playClickSound}
            >
              <img src="src/assets/linkedin.png" alt="linkedin" className="heroicon"/>
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo-container">
            <div className="hero-photo-glow"></div>
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={name} 
                className="hero-photo"
              />
            ) : (
              <div className="hero-photo-placeholder">
                <Code size={48} />
                <span>Your Photo Here</span>
              </div>
            )}
          </div>
          <div className="hero-code-card">
            <div className="code-header">
              <div className="code-dots">
                <span className="code-dot red"></span>
                <span className="code-dot yellow"></span>
                <span className="code-dot green"></span>
              </div>
              <span className="code-title">developer.ts</span>
            </div>
            <div className="code-content">
              <p className="code-line">
                <span className="code-keyword">const</span>{" "}
                <span className="code-variable">developer</span>{" "}
                <span className="code-operator">=</span> {"{"}
              </p>
              <p className="code-line code-indent-1">
                <span className="code-property">name</span>:{" "}
                <span className="code-string">"{name}"</span>,
              </p>
              <p className="code-line code-indent-1">
                <span className="code-property">role</span>:{" "}
                <span className="code-string">"{role}"</span>,
              </p>
              <p className="code-line code-indent-1">
                <span className="code-property">passion</span>:{" "}
                <span className="code-string">"Building UI"</span>,
              </p>
              <p className="code-line code-indent-1">
                <span className="code-property">projects</span>:{" "}
                <span className="code-number">8+</span>,
              </p>
              <p className="code-line code-indent-1">
                <span className="code-property">available</span>:{" "}
                <span className="code-boolean">true</span>,
              </p>
              <p className="code-line">
                {"}"}
                <span className="code-semicolon">;</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <ArrowDown size={16} className="scroll-arrow" />
      </div>
    </section>
  );
}