import { useEffect, useRef, useState } from 'react';
import './styles/About.css';
import { Code, Award, Briefcase, GraduationCap, Sparkles, Zap, TrendingUp, User, Mail, MapPin, Calendar } from 'lucide-react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { playClickSound } from '../utils/sound';
gsap.registerPlugin(ScrollTrigger);

type AboutProps = {
  imageUrl?: string;
};

interface StatItem {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface HighlightItem {
  text: string;
  category?: string;
}

const About: React.FC<AboutProps> = ({ imageUrl }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const el = sectionRef.current;
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);
  
  const skillTags: string[] = [
    "React", "JavaScript", "TypeScript", 
    "Node.js", "Express.js", 
    "MongoDB", "MySQL",
    "JWT Auth", "REST APIs",
    "HTML", "CSS", "Tailwind",
    "Git & GitHub", "PostMan"
  ];

  const statsData: StatItem[] = [
    { value: "10+", label: "Projects Completed", icon: <Code size={20} /> },
    { value: "6449", label: "CodeVita Rank", icon: <TrendingUp size={20} /> },
    { value: "8.75", label: "Current SGPA", icon: <Award size={20} /> },
    { value: "3+", label: "Hackathons", icon: <Zap size={20} /> }
  ];

  const highlightData: HighlightItem[] = [
    { text: "Ranked 6449 in TCS CodeVita Season 12 (Round 1), a global competitive programming contest", category: "competition" },
    { text: "State-level Bronze Medallist and National-level participant in International Robotics Competition (Avishkaar)", category: "achievement" },
    { text: "Secured 1st place in \"Resume Making King\" at Aarohan (college-level event)", category: "achievement" },
    { text: "Participated in IBM Hackathon 2025, building an AI-assisted solution under strict time constraints", category: "hackathon" },
    { text: "Successfully completed the HENNGE backend challenge involving recursion-based problem solving, secure GitHub gist submission, and API-based validation with authentication", category: "certification" }
  ];

  const educationData = [
    {
      degree: "B.Tech Computer Science",
      institution: "Current University",
      year: "2023 - Present",
      details: "6th Semester | 8.75 SGPA (5th Sem)",
      icon: <GraduationCap size={18} />
    },
    {
      degree: "Class 12th",
      institution: "Senior Secondary Education",
      year: "2023",
      details: "Scored 77%",
      icon: <GraduationCap size={18} />
    },
    {
      degree: "Class 10th",
      institution: "Secondary Education",
      year: "2021",
      details: "Scored 94%",
      icon: <GraduationCap size={18} />
    }
  ];

  const journeyData = [
    {
      title: "Started Coding Journey",
      year: "2023",
      description: "Began exploring web development and programming fundamentals",
      icon: <Sparkles size={18} />
    },
    {
      title: "Hackathon Participation",
      year: "2024-2025",
      description: "Participated in IBM Hackathon and multiple college-level competitions",
      icon: <Award size={18} />
    },
    {
      title: "First Project",
      year: "2025-2026",
      description: "Built first full-stack application using MERN stack",
      icon: <Code size={18} />
    },
    {
      title: "Current Focus",
      year: "2025",
      description: "Advanced full-stack development & competitive programming",
      icon: <TrendingUp size={18} />
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleDownloadResume = () => {
    playClickSound();
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Resume_YatharthDubey.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactClick = () => {
    playClickSound();
    const contactSection = document.getElementById('yath-contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCategoryColor = (category?: string) => {
    switch(category) {
      case 'competition': return 'var(--gradient-start)';
      case 'hackathon': return 'var(--gradient-end)';
      case 'certification': return '#10b981';
      default: return 'var(--gradient-start)';
    }
  };

  return (
    <section ref={sectionRef} id="about" className="about-section page-section">
      <div className="about-bg-blob about-bg-blob-1"></div>
      <div className="about-bg-blob about-bg-blob-2"></div>
      
      <div className="about-container">
        {/* Left Column - Profile Card - Hidden on mobile */}
        <div className="about-image-col about-hide-mobile">
          <div className="image-sticky-wrapper">
            <div className="about-profile-card">
              <div className="about-image-wrapper">
                <div className="about-image-border"></div>
                {imageUrl ? (
                  <img src={imageUrl} alt="Yatharth" className="about-profile-image-main" />
                ) : (
                  <div className="about-hero-photo-placeholder">
                    <Code size={48} />
                    <span>Your Photo Here</span>
                  </div>
                )}
              </div>
              
              <div className="about-profile-info-card">
                <h3 className="about-profile-name">Yatharth Dubey</h3>
                <p className="about-profile-title">Full-Stack Developer</p>
                
                <div className="about-profile-details">
                  <div className="about-profile-detail-item">
                    <User size={14} />
                    <span>B.Tech in Computer Science Engineering</span>
                  </div>
                  <div className="about-profile-detail-item">
                    <MapPin size={14} />
                    <span>India</span>
                  </div>
                  <div className="about-profile-detail-item">
                    <Mail size={14} />
                    <span>yatharthdubey12dec2004@gmail.com</span>
                  </div>
                  <div className="about-profile-detail-item">
                    <Calendar size={14} />
                    <span>Available for opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`about-content-col ${isVisible ? 'fade-in' : ''}`} ref={contentRef}>
          <div className="about-stats-grid">
            {statsData.map((stat, idx) => (
              <div key={idx} className="about-stat-card">
                <div className="about-stat-icon">{stat.icon}</div>
                <div className="about-stat-content">
                  <h4 className="about-stat-value">{stat.value}</h4>
                  <p className="about-stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bio Section */}
          <div className="about-bio-section">
            <h2 className="about-section-title">
              <span className="about-title-gradient">About Me</span>
            </h2>
            <p className="about-bio-text">
              I'm a passionate Computer Science student with a drive for creating impactful web applications. 
              My journey in tech started with curiosity and has evolved into a commitment to building 
              solutions that matter. I thrive on challenges, whether it's mastering new technologies, 
              solving complex problems, or collaborating on innovative projects.
            </p>
            <p className="about-bio-text">
              While pursuing my B.Tech in Computer Science, I've built multiple full-stack applications and actively 
              participate in hackathons and coding competitions. I believe in continuous learning and 
              pushing boundaries to create meaningful digital experiences.
            </p>
          </div>

          {/* Key Highlights Section */}
          <div className="about-highlights-section">
            <h3 className="about-section-subtitle">
              <Award size={20} />
              Key Highlights
            </h3>
            <div className="about-highlights-grid">
              {highlightData.map((highlight, idx) => (
                <div key={idx} className="about-highlight-card">
                  <div 
                    className="about-highlight-dot" 
                    style={{ background: getCategoryColor(highlight.category) }}
                  ></div>
                  <div className="about-highlight-content">
                    <p className="about-highlight-text">{highlight.text}</p>
                    {highlight.category && (
                      <span className="about-highlight-category">{highlight.category}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="about-skills-section">
            <h3 className="about-section-subtitle">
              <Code size={20} />
              Tech Stack & Tools
            </h3>
            <div className="about-skills-tags">
              {skillTags.map((skill, idx) => (
                <span key={idx} className="about-skill-tag">{skill}</span>
              ))}
            </div>
          </div>

          {/* Dual Timeline Section */}
          <div className="about-dual-timeline-section">
            <div className="about-timeline-columns">
              {/* Education Column */}
              <div className="about-timeline-column">
                <h3 className="about-timeline-column-title">
                  <GraduationCap size={18} />
                  Education
                </h3>
                <div className="about-vertical-timeline">
                  {educationData.map((item, idx) => (
                    <div key={idx} className="about-timeline-node">
                      <div className="about-timeline-marker">{item.icon}</div>
                      <div className="about-timeline-content-card">
                        <div className="about-timeline-year">{item.year}</div>
                        <h4 className="about-timeline-degree">{item.degree}</h4>
                        <p className="about-timeline-institution">{item.institution}</p>
                        <p className="about-timeline-details">{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Journey Column */}
              <div className="about-timeline-column">
                <h3 className="about-timeline-column-title">
                  <Briefcase size={18} />
                  Journey
                </h3>
                <div className="about-vertical-timeline">
                  {journeyData.map((item, idx) => (
                    <div key={idx} className="about-timeline-node">
                      <div className="about-timeline-marker">{item.icon}</div>
                      <div className="about-timeline-content-card">
                        <div className="about-timeline-year">{item.year}</div>
                        <h4 className="about-timeline-degree">{item.title}</h4>
                        <p className="about-timeline-details">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons - Contact button hidden on mobile */}
          <div className="about-action-buttons">
            <button className="about-btn about-btn-primary" onClick={handleDownloadResume}>
              <svg className="about-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v12m0 0-3-3m3 3 3-3M5 21h14" stroke="currentColor" strokeLinecap="round"/>
              </svg>
              Download Resume
            </button>
            <button className="about-btn about-btn-secondary about-hide-mobile" onClick={handleContactClick}>
              <svg className="about-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;