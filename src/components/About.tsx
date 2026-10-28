import { useRef, useState } from "react";
import { Download, Mail, MapPin, RotateCw } from "lucide-react";
import { playClickSound } from "../utils/sound";
import "./styles/About.css";

type AboutProps = { imageUrl?: string };

/* ── Edit your content here ───────────────────────────── */
const LAYERS = [
  { name: "Product", note: "SchemeSetu case study and wireframes", items: ["Figma (basic)", "Notion", "Wireframing", "User flows", "Information architecture", "Interaction design basics"] },
  { name: "Interface", note: "UniCircle, RBS Kids, TypeAce", items: ["React.js", "TypeScript", "HTML5", "CSS3", "Responsive UI"] },
  { name: "Services", note: "EnglishOne, RBS Kids, ElectRevise", items: ["Node.js", "Express.js", "FastAPI", "RESTful APIs", "JWT", "bcrypt", "Google OAuth", "WebRTC"] },
  { name: "Data and AI", note: "ElectRevise records, SchemeSetu retrieval", items: ["MySQL", "MongoDB", "PostgreSQL", "RAG", "FAISS", "Sentence Transformers"] },
  { name: "Tooling", note: "Every project, from commit to deploy", items: ["Git", "GitHub", "Postman", "VS Code", "Vercel", "AWS", "JIRA", "Linux", "EmailJS", "Python", "C/C++"] },
];

const LEDGER = [
  { fig: "9+", text: "projects built, from an AI document assistant to a school's daily management system" },
  { fig: "8.76", text: "SGPA out of 10 in B.Tech Computer Science, currently in the 6th semester" },
  { fig: "6449", text: "rank in TCS CodeVita Season 12, Round 1, a global coding contest" },
  { fig: "3+", text: "hackathons, including IBM Hackathon 2025 where I delivered an AI-assisted solution" },
  { fig: "Bronze", text: "state level, and national participant, in the Avishkaar International Robotics Competition" },
  { fig: "1st", text: "place in \"Resume Making King\" at Aarohan, a college event" },
  { fig: "Cleared", text: "the HENNGE backend challenge: recursion, authenticated APIs and a secure gist submission" },
];

type Kind = "work" | "build" | "learn";
const LOG: { when: string; title: string; where: string; kind: Kind; points: string[] }[] = [
  { when: "Jul to Aug 2026", title: "Full-Stack Development Intern", where: "InfoSeeds, EnglishOne", kind: "work", points: [
    "Worked as part of a team on a role-based learning platform for students, teachers and super admins, using React.js, Node.js, Express.js and MySQL",
    "Built features across authentication, dashboards, course and lesson management, teacher approval, calendar management and live-class workflows",
    "Helped with UI improvements, API troubleshooting, JIRA-based bug tracking and AWS production deployment" ] },
  { when: "2026", title: "Letter of Recommendation", where: "Pulse by OptiMaxin", kind: "work", points: [
    "Assisted in full-stack feature development within a professional product environment",
    "Contributed to assigned tasks from development to deployment" ] },
  { when: "2026", title: "Started SchemeSetu", where: "AI government schemes assistant", kind: "build", points: [
    "Wireframes and a product case study first, then the RAG application with FastAPI and FAISS, which is still in progress" ] },
  { when: "2025", title: "ElectRevise", where: "Voter survey and booth management", kind: "build", points: [
    "Built with one teammate",
    "Excel upload, merging, assignment and reporting for 100K+ voter records, with role-based access control" ] },
  { when: "2024 to 2025", title: "Hackathons and contests", where: "IBM Hackathon, CodeVita, Avishkaar", kind: "build", points: [
    "IBM Hackathon 2025: delivered an AI-assisted solution under time constraints" ] },
  { when: "2023 to 2027", title: "B.Tech in Computer Science Engineering", where: "Raja Balwant Singh Engineering Technical Campus, Agra", kind: "learn", points: [
    "Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow",
    "SGPA 8.76/10, 6th semester",
    "Coursework: Data Structures and Algorithms, Operating Systems, DBMS, Computer Networks, OOPs, Software Engineering" ] },
  { when: "2023", title: "Started coding", where: "", kind: "build", points: ["Web development and programming fundamentals"] },
];

const NOW = [
  ["Studying", "B.Tech CSE, 6th semester"],
  ["Building", "SchemeSetu and UniCircle"],
  ["Open to", "Internships and full-time roles"],
  ["Based in", "India"],
];

const About: React.FC<AboutProps> = ({ imageUrl }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [flipped, setFlipped] = useState(false);


  const tilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--ry", `${x * 14}deg`);
    e.currentTarget.style.setProperty("--rx", `${-y * 14}deg`);
  };
  const untilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--ry", "0deg");
    e.currentTarget.style.setProperty("--rx", "0deg");
  };
  const flip = () => { playClickSound(); setFlipped((f) => !f); };

  const download = () => {
    playClickSound();
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.download = "Resume_YatharthDubey.pdf";
    a.click();
  };

  return (
    <section ref={sectionRef} id="about" className="about-section page-section">
      <div className="about-bg-blob about-bg-blob-1" />
      <div className="about-bg-blob about-bg-blob-2" />

      <div className="about-container">
        <aside className="ab-side">
          <div className="ab-card" onMouseMove={tilt} onMouseLeave={untilt}>
            <div
              className={`ab-card-inner ${flipped ? "is-flipped" : ""}`}
              role="button" tabIndex={0} aria-pressed={flipped} aria-label="Flip card to see what I'm up to"
              onClick={flip}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } }}
            >
              <div className="ab-face ab-front">
                {imageUrl && <img src={imageUrl} alt="Yatharth Dubey" />}
                <span className="ab-hint"><RotateCw size={13} /> Flip</span>
              </div>
              <div className="ab-face ab-back">
                <p className="ab-back-title">Right now</p>
                <dl>
                  {NOW.map(([k, v]) => (
                    <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <h3 className="ab-name">Yatharth Dubey</h3>
          <p className="ab-sub">Full-stack developer with a product mindset</p>
          <p className="ab-meta"><MapPin size={14} /> India</p>
          <a className="ab-meta ab-link" href="mailto:yatharthdubey12dec2004@gmail.com" onClick={playClickSound}>
            <Mail size={14} /> yatharthdubey12dec2004@gmail.com
          </a>
          <button className="ab-download" onClick={download}>
            <Download size={16} /> Download resume
          </button>
        </aside>

        <div className="ab-main">
          <h2 className="ab-heading" data-fx="decode">I build full-stack products and care how they feel to use.</h2>
          <p className="ab-text">
            I build full-stack software and think about how people move through it: user flows, wireframes and
            documentation sit alongside the APIs and databases. I learn fastest on real problems, which is why I enter
            hackathons and contests, and why one of my projects is a management system a school uses every day.
          </p>

          <h3 className="ab-sub-heading" data-fx="decode">How a product gets built, layer by layer</h3>
          <div className="ab-layers" data-fx="stagger">
            {LAYERS.map((l) => (
              <div key={l.name} className="ab-layer" tabIndex={0}>
                <span className="ab-layer-name">{l.name}</span>
                <div className="ab-layer-body">
                  <div className="ab-layer-items">
                    {l.items.map((s) => <span key={s} className="ab-chip">{s}</span>)}
                  </div>
                  <span className="ab-layer-note">Used in: {l.note}</span>
                </div>
              </div>
            ))}
          </div>

          <h3 className="ab-sub-heading" data-fx="decode">Track record</h3>
          <ul className="ab-ledger" data-fx="stagger">
            {LEDGER.map((r) => (
              <li key={r.fig + r.text}>
                <span className="ab-fig" data-fx="count">{r.fig}</span>
                <span className="ab-ledger-text">{r.text}</span>
              </li>
            ))}
          </ul>

          <h3 className="ab-sub-heading" data-fx="decode">Experience, education and builds, newest first</h3>
          <div className="ab-log" data-fx="stagger">
            {LOG.map((e) => (
              <details key={e.title} name="ab-log" className={`ab-entry ab-entry--${e.kind}`}>
                <summary onClick={playClickSound}>
                  <span className="ab-when">{e.when}</span>
                  <span className="ab-entry-title">{e.title}</span>
                  {e.where && <span className="ab-where">{e.where}</span>}
                </summary>
                <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;