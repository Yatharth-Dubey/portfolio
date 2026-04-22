import { useEffect, useState, useCallback } from "react";
import { Menu, X, Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { toggleSound, isSoundEnabled, playClickSound, handleScrollSound } from "../utils/sound";
import "./styles/Navbar.css";

type NavItem = {
  label: string;
  id: string;
  icon?: React.ReactNode;
};

type NavbarProps = {
  toggleTheme: () => void;
  darkMode: boolean;
};

export default function Navbar({ toggleTheme, darkMode }: NavbarProps) {
  const [soundOn, setSoundOn] = useState(true);
  const [active, setActive] = useState<string>("hero");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  
  const navItems: NavItem[] = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "yath-contact" },
  ];

  const handleSoundToggle = () => {
    playClickSound();
    toggleSound();
    setSoundOn(isSoundEnabled());
  };
  
  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setMenuOpen(false);
      setActive(id);
    }
  }, []);
  
  useEffect(() => {
    const sections = ["hero", "about", "projects", "yath-contact"];
    const handleScroll = () => {
      handleScrollSound();
      setIsScrolled(window.scrollY > 50);
      let currentActive = "";
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentActive = id;
            break;
          }
        }
      }
      if (currentActive && currentActive !== active) {
        setActive(currentActive);
      }
    };
    
    let timeoutId: ReturnType<typeof setTimeout>;
    const throttledScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };
    
    window.addEventListener("scroll", throttledScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [active]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (menuOpen && !target.closest('.navbar')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);
  
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);
  
  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <h2 className="navbar-logo" onClick={() => {playClickSound(); scrollTo("hero");}}>
          YATHARTH
        </h2>
        
        <div className="navbar-links">
          {navItems.map((item) => (
            <button id={`nav-${item.id}`}
              key={item.id}
              className={`nav-link-btn ${active === item.id ? 'active' : ''}`}
              onClick={() => {console.log(item, item.id);playClickSound(); scrollTo(item.id);}}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        <div className="navbar-right">
          <button id="theme-toggle"
            className="theme-btn"
            onClick={() => {
              playClickSound();
              toggleTheme();
            }}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button id="sound-toggle"
            className="theme-btn"
            onClick={handleSoundToggle}
            aria-label="Toggle sound"
          >
            {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          
          <button id="mobile-navbtn"
            className="mobile-menu-btn"
            onClick={() => {playClickSound(); setMenuOpen(!menuOpen);}}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="mobile-menu-container">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`mobile-link ${active === item.id ? 'active' : ''}`}
              onClick={() => {playClickSound(); scrollTo(item.id);}}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}