import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Menu, X, Moon, Sun, Volume2, VolumeX, Search } from "lucide-react";
import { toggleSound, isSoundEnabled, playClickSound, handleScrollSound } from "../utils/sound";
import { projects } from "../data/Project";
import CommandPalette, { type Command } from "./CommandPalette";
import "./styles/Navbar.css";

type NavItem = { label: string; id: string };
type NavbarProps = { toggleTheme: () => void; darkMode: boolean };

const NAV: NavItem[] = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "yath-contact" },
];
const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

export default function Navbar({ toggleTheme, darkMode }: NavbarProps) {
  const [soundOn, setSoundOn] = useState(true);
  const [active, setActive] = useState<string>("hero");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const handleSoundToggle = () => {
    playClickSound();
    toggleSound();
    setSoundOn(isSoundEnabled());
  };

  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setMenuOpen(false);
      setActive(id);
    }
  }, []);

  const downloadResume = () => {
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.download = "Resume_YatharthDubey.pdf";
    a.click();
  };

  const commands: Command[] = [
    ...NAV.map((n) => ({ id: `go-${n.id}`, label: n.label, group: "Go to", run: () => scrollTo(n.id) })),
    ...projects.map((p) => ({
      id: `p-${p.id}`, label: p.title, group: "Projects",
      run: () => { scrollTo("projects"); window.dispatchEvent(new CustomEvent("open-project", { detail: p.id })); },
    })),
    { id: "a-theme", label: darkMode ? "Switch to light theme" : "Switch to dark theme", group: "Actions", run: toggleTheme },
    { id: "a-sound", label: soundOn ? "Turn sounds off" : "Turn sounds on", group: "Actions", run: handleSoundToggle },
    { id: "a-resume", label: "Download resume", group: "Actions", run: downloadResume },
    { id: "a-mail", label: "Email me", group: "Links", run: () => { window.location.href = "mailto:yatharthdubey12dec2004@gmail.com"; } },
    { id: "a-gh", label: "Open GitHub", group: "Links", run: () => window.open("https://github.com/Yatharth-Dubey", "_blank", "noopener") },
    { id: "a-li", label: "Open LinkedIn", group: "Links", run: () => window.open("https://www.linkedin.com/in/yatharth-dubey-34a532316", "_blank", "noopener") },
  ];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        playClickSound();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const sections = NAV.map((n) => n.id);
    const handleScroll = () => {
      handleScrollSound();
      setIsScrolled(window.scrollY > 50);
      let current = "";
      const pos = window.scrollY + window.innerHeight / 2;
      for (const id of sections) {
        const s = document.getElementById(id);
        if (s && pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) { current = id; break; }
      }
      if (current && current !== active) setActive(current);
    };
    let timeoutId: ReturnType<typeof setTimeout>;
    const throttled = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };
    window.addEventListener("scroll", throttled);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", throttled);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [active]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (menuOpen && !target.closest(".navbar")) setMenuOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || paletteOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [menuOpen, paletteOpen]);

  const openPalette = () => { playClickSound(); setMenuOpen(false); setPaletteOpen(true); };

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`} aria-label="Main">
      <div className="navbar-container">
        <button className="navbar-logo" aria-label="Back to top" onClick={() => { playClickSound(); scrollTo("hero"); }}>
          <span className="logo-mark">YD</span>
          <span className="logo-word">Yatharth</span>
        </button>

        <div className="navbar-links">
          {NAV.map((item) => (
            <button
              id={`nav-${item.id}`}
              key={item.id}
              className={`nav-link-btn ${active === item.id ? "active" : ""}`}
              onClick={() => { playClickSound(); scrollTo(item.id); }}
            >
              {active === item.id && (
                <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              <span className="nav-link-label">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="navbar-right">
          <button id="cmd-open" className="cmd-btn" onClick={openPalette} aria-label="Open quick jump">
            <Search size={16} />
            <span className="cmd-btn-text">Jump to</span>
            <kbd>{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </button>
          <button id="theme-toggle" className="theme-btn" onClick={() => { playClickSound(); toggleTheme(); }} aria-label="Toggle theme">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button id="sound-toggle" className="theme-btn" onClick={handleSoundToggle} aria-label="Toggle sound">
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button id="mobile-navbtn" className="mobile-menu-btn" onClick={() => { playClickSound(); setMenuOpen(!menuOpen); }} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-container">
          {NAV.map((item) => (
            <button key={item.id} tabIndex={menuOpen ? 0 : -1} className={`mobile-link ${active === item.id ? "active" : ""}`} onClick={() => { playClickSound(); scrollTo(item.id); }}>
              {item.label}
            </button>
          ))}
          <button tabIndex={menuOpen ? 0 : -1} className="mobile-link mobile-link--small" onClick={openPalette}>Search the site</button>
        </div>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} commands={commands} />
    </nav>
  );
}