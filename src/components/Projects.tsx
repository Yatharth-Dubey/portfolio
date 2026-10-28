import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ExternalLink, Palette } from "lucide-react";
import { playClickSound } from "../utils/sound";
import { projects, type Status } from "../data/Project";
import "./styles/Projects.css";

const STATUS_LABEL: Record<Status, string> = {
  live: "Live",
  building: "Building",
  built: "Built",
  private: "Private",
};

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState("All");
  const [activeId, setActiveId] = useState(projects[0].id);
  const [imgIdx, setImgIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const categories = useMemo(() => ["All", ...new Set(projects.map((p) => p.category))], []);
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const current = visible.find((p) => p.id === activeId) ?? visible[0];
  const shot = current.images.length ? current.images[imgIdx % current.images.length] : undefined;


  // lets the command palette open a project
  useEffect(() => {
    const open = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (projects.some((p) => p.id === id)) {
        setFilter("All");
        setActiveId(id);
        setImgIdx(0);
      }
    };
    window.addEventListener("open-project", open);
    return () => window.removeEventListener("open-project", open);
  }, []);

  // rotate screenshots of the open project only
  useEffect(() => {
    if (paused || current.images.length < 2) return;
    const t = setInterval(() => setImgIdx((i) => i + 1), 2800);
    return () => clearInterval(t);
  }, [current.id, current.images.length, paused]);

  const select = (id: string) => {
    playClickSound();
    setActiveId(id);
    setImgIdx(0);
  };

  const onFilter = (c: string) => {
    playClickSound();
    setFilter(c);
    setImgIdx(0);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const i = visible.findIndex((p) => p.id === current.id);
    if (e.key === "ArrowDown" || e.key === "ArrowRight") select(visible[(i + 1) % visible.length].id);
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") select(visible[(i - 1 + visible.length) % visible.length].id);
  };

  // cursor-following glow on the stage
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const ext = { target: "_blank", rel: "noopener noreferrer", onClick: playClickSound };
  const address = current.live ? current.live.replace(/^https?:\/\//, "") : "no public demo";

  return (
    <section ref={sectionRef} id="projects" className="projects-section page-section">
      <div className="projects-bg-blob projects-bg-blob-1" />
      <div className="projects-bg-blob projects-bg-blob-2" />

      <div className="projects-container">
        <header className="px-head">
          <h2 className="section-title" data-fx="decode">Things I've built</h2>
          <p className="section-subtitle">
            {projects.length} projects, from a school's daily tool to late-night experiments. Pick one to open it.
          </p>
        </header>

        <div className="filter-tabs" role="tablist" aria-label="Filter projects">
          {categories.map((c) => (
            <button key={c} className={`filter-btn ${filter === c ? "active" : ""}`} onClick={() => onFilter(c)}>
              {c}
            </button>
          ))}
        </div>

        <div className="px-layout" onKeyDown={onKey}>
          <ul className="px-list" data-fx="stagger" role="tablist" aria-orientation="vertical">
            {visible.map((p) => (
              <li key={p.id}>
                <button
                  role="tab"
                  aria-selected={p.id === current.id}
                  className={`px-item ${p.id === current.id ? "is-active" : ""}`}
                  onClick={() => select(p.id)}
                >
                  <span className={`px-dot px-dot--${p.status}`} aria-hidden />
                  <span className="px-item-text">
                    <span className="px-item-title">{p.title}</span>
                    <span className="px-item-tag">{p.tagline}</span>
                  </span>
                  <span className="px-item-year">{p.year ?? ""}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="px-stage" ref={stageRef} onMouseMove={onMove} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="px-window">
              <div className="px-chrome">
                <span className="px-lights"><i /><i /><i /></span>
                <span className="px-address">{address}</span>
                <span className={`px-status px-status--${current.status}`}>{STATUS_LABEL[current.status]}</span>
              </div>
              <div className="px-screen">
                {shot ? (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={current.id + shot}
                      src={shot}
                      alt={`${current.title} screenshot`}
                      className="px-shot"
                      initial={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    />
                  </AnimatePresence>
                ) : (
                  <div className="px-placeholder">
                    <span>Screenshots coming soon</span>
                  </div>
                )}
                {current.images.length > 1 && (
                  <div className="px-pips">
                    {current.images.map((_, i) => (
                      <button
                        key={i}
                        aria-label={`Screenshot ${i + 1}`}
                        className={i === imgIdx % current.images.length ? "on" : ""}
                        onClick={() => setImgIdx(i)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="px-info"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="px-title">{current.title}</h3>
                {current.role && <p className="px-role">{current.role}</p>}
                <p className="px-desc">{current.description}</p>
                {current.highlight && <p className="px-highlight">{current.highlight}</p>}
                <div className="px-tech">
                  {current.tech.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
                <div className="px-links">
                  {current.live && (
                    <a className="px-btn px-btn--solid" href={current.live} {...ext}>
                      <ExternalLink size={16} /> Live project
                    </a>
                  )}
                  {current.caseStudy && (
                    <a className="px-btn" href={current.caseStudy} {...ext}>
                      <BookOpen size={16} /> Case study
                    </a>
                  )}
                  {current.figma && (
                    <a className="px-btn" href={current.figma} {...ext}>
                      <Palette size={16} /> Figma
                    </a>
                  )}
                  {current.github && (
                    <a className="px-btn" href={current.github} {...ext}>
                      <GitHubIcon /> Source code
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;