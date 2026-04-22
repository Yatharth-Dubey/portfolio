import { useState } from 'react';
import './styles/Projects.css';
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { playClickSound } from '../utils/sound';
import rbs1 from "../assets/rbs1.png";
import rbs2 from "../assets/rbs2.png";
import rbs3 from "../assets/rbs3.png";
import rbs4 from "../assets/rbs4.png";
import rbs5 from "../assets/rbs5.png";
import sir1 from "../assets/sir1.png";
import sir2 from "../assets/sir2.png";
import sir3 from "../assets/sir3.png";
import sir4 from "../assets/sir4.png";
import sir5 from "../assets/sir5.png";
import sir6 from "../assets/sir6.png";
import typeace1 from "../assets/typeace1.png";
import typeace2 from "../assets/typeace2.png";
import typeace3 from "../assets/typeace3.png";
import typeace4 from "../assets/typeace4.png";
import unicircle0 from "../assets/unicircle0.png";
import unicircle1 from "../assets/unicircle1.png";
import unicircle2 from "../assets/unicircle2.png";
import unicircle3 from "../assets/unicircle3.png";
import unicircle4 from "../assets/unicircle4.png";
import blogpick1 from "../assets/blogpick1.png";
import blogpick2 from "../assets/blogpick2.png";
import blogpick3 from "../assets/blogpick3.png";
import weather from "../assets/weatherapp.png"
import snakegame from "../assets/snakegame.png"
gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  category: string;
  featured?: boolean;
}

const Projects: React.FC = () => {

  const [imageIndexes, setImageIndexes] = useState<{ [key: number]: number }>({});
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];
    projects.forEach((project, index) => {
      const baseDelay = index * 300;
      const randomOffset = 2000 + Math.random() * 1200;
      const startDelay = baseDelay + randomOffset;
      const timeout = setTimeout(() => {
        const intervalTime = 2000 + Math.random() * 2000;
        const interval = setInterval(() => {
          setImageIndexes((prev) => {
            const newIndexes = { ...prev };
            const currentIndex = newIndexes[project.id] || 0;
            newIndexes[project.id] =
              (currentIndex + 1) % project.image.length;
            return newIndexes;
          });
        }, intervalTime);
        intervals.push(interval);
      }, startDelay);
      timeouts.push(timeout);
    });
    return () => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, []);
  
  const sectionRef = useRef(null);
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
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const projects: Project[] = [
    {
      id: 1,
      title: "RBS Kids Paradise School Student Management Website (Currently in Use)",
      description: "Full-stack web application to manage student data including Fees, Results, etc with authentication and secure access. In use by RBS Kids Paradise School.",
      image: [rbs1, rbs2, rbs3, rbs4, rbs5],
      techStack: ["React", "JavaScript", "MySQL", "Express", "JWT", "Bcrypt"],
      githubUrl: "#",
      liveUrl: "https://rbs.eduguruji.com/",
      category: "Full Stack",
      featured: true
    },
    {
      id: 2,
      title: "SIR Evaluation System (Admin Panel)",
      description: "Admin dashboard to manage student feedback and evaluation with secure login system.",
      image: [sir1, sir2, sir3, sir4, sir5, sir6],
      techStack: ["React", "JavaScript", "MySQL", "Express", "JWT"],
      githubUrl: "#",
      liveUrl: "#",
      category: "Full Stack"
    },
    {
      id: 3,
      title: "UniCircle (In Progress)",
      description: "A social platform for students to connect, share, and collaborate.",
      image: [unicircle0, unicircle1, unicircle2, unicircle3, unicircle4],
      techStack: ["React", "CSS", "MongoDB", "Express", "JWT", "Bcrypt"],
      githubUrl: "#",
      liveUrl: "https://unicircle.eduguruji.com/",
      category: "Full Stack"
    },
    {
      id: 4,
      title: "TypeAce",
      description: "Typing speed test application with performance tracking and clean UI.",
      image: [typeace1, typeace2, typeace3, typeace4],
      techStack: ["React", "CSS", "JavaScript", "MySQL", "Express"],
      githubUrl: "#",
      liveUrl: "https://examatom.com/",
      category: "Web App"
    },
    // {
    //   id: 5,
    //   title: "Portfolio Website",
    //   description: "Modern responsive portfolio built using React, Vite, and TypeScript.",
    //   image: ["your-image"],
    //   techStack: ["React", "TypeScript", "CSS"],
    //   githubUrl: "#",
    //   liveUrl: "#",
    //   category: "Frontend"
    // },
    {
      id: 6,
      title: "BlogPick (In Progress)",
      description: "Full-stack blogging platform with authentication and content management.",
      image: [blogpick1, blogpick2, blogpick3],
      techStack: ["React", "CSS", "MongoDB", "Express", "JWT"],
      githubUrl: "#",
      liveUrl: "#",
      category: "Full Stack"
    },
    {
      id: 7,
      title: "Weather App",
      description: "Simple weather app using API integration.",
      image: [weather],
      techStack: ["HTML", "JavaScript", "API", "CSS"],
      githubUrl: "#",
      liveUrl: "#",
      category: "JavaScript"
    },
    {
      id: 8,
      title: "Snake Game (Python)",
      description: "Classic snake game built using Python with custom features.",
      image: [snakegame],
      techStack: ["Python", "Pygame"],
      githubUrl: "#",
      liveUrl: "#",
      category: "Python"
    }
  ];

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);
  
  const featuredProject = projects.find(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

  return (
    <section ref={sectionRef} id="projects" className="projects-section page-section">
      {/* Animated Background Blobs */}
      <div className="projects-bg-blob projects-bg-blob-1"></div>
      <div className="projects-bg-blob projects-bg-blob-2"></div>
      
      <div className="projects-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Some things I've built</p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => { playClickSound(); setActiveFilter(category) }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Project (if in filtered view) */}
        {featuredProject && activeFilter === 'All' && (
          <div className="featured-project">
            <div className="featured-card">
              <div className="featured-image-wrapper">
                <div className="image-slider">
                <div
                  className="image-track"
                  style={{
                    transform: `translateX(-${(imageIndexes[featuredProject.id] || 0) * 100}%)`
                  }}
                >
                  {featuredProject.image.map((img, i) => (
                    <img key={i} src={img} className="slide-image" />
                  ))}
                </div>
              </div>
              </div>
              <div className="featured-content">
                <div className="featured-badge">Featured Project</div>
                <h3 className="featured-title">{featuredProject.title}</h3>
                <p className="featured-description">{featuredProject.description}</p>
                <div className="featured-tech">
                  {featuredProject.techStack.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="featured-actions">
                  <a 
                    href={featuredProject.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-link"
                    onClick={playClickSound}
                  >
                    <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                    GitHub
                  </a>
                  <a 
                    href={featuredProject.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-link primary"
                    onClick={playClickSound}
                  >
                    <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeLinecap="round"/>
                      <polyline points="15 3 21 3 21 9" stroke="currentColor" strokeLinecap="round"/>
                      <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeLinecap="round"/>
                    </svg>
                    Live
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="projects-grid">
          {regularProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="card-image-wrapper">
                <div className="image-slider">
                  <div
                    className="image-track"
                    style={{
                      transform: `translateX(-${(imageIndexes[project.id] || 0) * 100}%)`
                    }}
                  >
                    {project.image.map((img, i) => (
                      <img key={i} src={img} className="slide-image" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">{project.title}</h3>
                <p className="card-description">{project.description}</p>
                <div className="card-tech">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="card-actions">
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-link"
                    aria-label="GitHub Repository"
                    onClick={playClickSound}
                  >
                    <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                    GitHub
                  </a>
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-link"
                    aria-label="Demo"
                    onClick={playClickSound}
                  >
                    <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeLinecap="round"/>
                      <polyline points="15 3 21 3 21 9" stroke="currentColor" strokeLinecap="round"/>
                      <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeLinecap="round"/>
                    </svg>
                    Live
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;