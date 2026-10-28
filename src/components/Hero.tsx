import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowDown, ChevronRight, Database, LayoutDashboard, Mail, PenTool, Server } from "lucide-react";
import { playClickSound } from "../utils/sound";
import githubIcon from "../assets/github.png";
import linkedinIcon from "../assets/linkedin.png";
import "./styles/Hero.css";

type HeroProps = { name: string; role: string; imageUrl?: string };

type Stage = { label: string; tool: string; line: string; proof: string; icon: LucideIcon };

// The idea: I work across the whole path of a product. Edit freely.
const STAGES: Stage[] = [
  {
    label: "Wireframe", tool: "Figma, Notion", icon: PenTool,
    line: "I start with the user flow: wireframes, information architecture and a written case study.",
    proof: "SchemeSetu: upload, chat, citations, history",
  },
  {
    label: "Interface", tool: "React, TypeScript", icon: LayoutDashboard,
    line: "Then I build responsive screens people can actually use, with thought for every state.",
    proof: "UniCircle, RBS Kids, TypeAce",
  },
  {
    label: "API", tool: "Node, Express, FastAPI", icon: Server,
    line: "Behind them sit authenticated services: JWT, role-based access, and the logic of each workflow.",
    proof: "EnglishOne: dashboards, approvals, live classes",
  },
  {
    label: "Data", tool: "MySQL, MongoDB, PostgreSQL", icon: Database,
    line: "And a database that holds up, from student records to a RAG index over scheme documents.",
    proof: "ElectRevise: 100K+ voter records",
  },
];

export default function Hero({ name, role, imageUrl }: HeroProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [first, ...rest] = name.split(" ");

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % STAGES.length), 3600);
    return () => clearInterval(t);
  }, [paused]);

  const go = (id: string) => {
    playClickSound();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="hero" className="hero" onMouseMove={onMove}>
      <div className="hero-bg-blob hero-bg-blob-1" />
      <div className="hero-bg-blob hero-bg-blob-2" />

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-pill">
            {imageUrl && <img src={imageUrl} alt={name} className="hero-avatar" />}
            <span className="hero-pill-text">
              <span className="hero-pill-dot" /> Open to Internships &amp; Full-Time Opportunities
            </span>
          </div>

          <h1 className="hero-title">
            <span>{first}</span>
            <span className="hero-title-line">{rest.join(" ")}</span>
          </h1>
          <p className="hero-role">{role}</p>
          <p className="hero-description">
            I build full-stack software and think about how people move through it, from the first wireframe to the last database query.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => go("projects")}>
              See what I've built <ChevronRight size={18} />
            </button>
            <button className="btn-secondary" onClick={() => go("yath-contact")}>
              Get in touch <Mail size={18} />
            </button>
          </div>

          <div className="hero-social">
            <a href="https://github.com/Yatharth-Dubey" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub" onClick={playClickSound}>
              <img src={githubIcon} alt="" className="heroicon" />
            </a>
            <a href="https://www.linkedin.com/in/yatharth-dubey-34a532316" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn" onClick={playClickSound}>
              <img src={linkedinIcon} alt="" className="heroicon" />
            </a>
          </div>
        </div>

        <div className="hero-flow" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <p className="hf-title">From idea to database</p>
          <ol className="hf">
            {STAGES.map((s, i) => (
              <li key={s.label} className={`hf-row ${i === active ? "is-active" : ""} ${i < active ? "is-done" : ""}`}>
                <span className="hf-node"><s.icon size={18} /></span>
                <button className="hf-btn" aria-expanded={i === active} onClick={() => { playClickSound(); setActive(i); }}>
                  <span className="hf-label">{s.label}</span>
                  <span className="hf-tool">{s.tool}</span>
                </button>
                <div className="hf-detail">
                  <div>
                    <p>{s.line}</p>
                    <span className="hf-proof">{s.proof}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <button className="hero-scroll-indicator" onClick={() => go("about")} aria-label="Scroll to About">
        <ArrowDown size={18} />
      </button>
    </section>
  );
}