import setu from "../assets/setu.png";
import setu2 from "../assets/setu2.png";
import setu3 from "../assets/setu3.png";
import setu4 from "../assets/setu4.png";
import setu5 from "../assets/setu5.png";
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
import weather from "../assets/weatherapp.png";
import snakegame from "../assets/snakegame.png";

export type Status = "live" | "building" | "built" | "private";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  highlight?: string;
  year?: string;
  category: string;
  status: Status;
  images: string[];
  tech: string[];
  github?: string;
  live?: string;
  caseStudy?: string;
  figma?: string;
  role?: string;
}

export const projects: Project[] = [
  {
    id: "schemesetu",
    title: "SchemeSetu: AI Government Schemes Assistant",
    tagline: "Ask questions, get answers from the scheme documents",
    description:
      "An AI assistant that answers questions from uploaded government-scheme PDFs using Retrieval-Augmented Generation (RAG), so answers come from retrieved passages of the document itself. Wireframes cover document upload, chat, answer citations and conversation history.",
    highlight: "Product problem, workflows, architecture and roadmap are documented in a case study. The application itself is still being built.",
    year: "2026",
    category: "AI",
    status: "building",
    images: [setu, setu2, setu3, setu4, setu5],
    tech: ["Python", "FastAPI", "React", "RAG", "FAISS", "Sentence Transformers", "PostgreSQL"],
    github: "https://github.com/Yatharth-Dubey/SchemeSetu",
    figma: "https://www.figma.com/community/file/1696120811135606136/schemesetu-ai-product-ux-case-study",
    caseStudy: "https://luxuriant-production-d9f.notion.site/SchemeSetu-AI-Product-UX-Case-Study-404bfd63a5be800c8d2efbfc3882f38c",
  },
  {
    id: "englishone",
    title: "EnglishOne: Online Learning Platform",
    tagline: "Role-based learning for students, teachers and admins",
    description:
      "Online learning platform with separate journeys for students, teachers and super admins, covering authentication, dashboards, course and lesson management, teacher approval, calendar management and live classes.",
    role: "Team project, built during my Full-Stack Development Internship at InfoSeeds (1 July to 18 August 2026)",
    highlight: "My part: features across dashboards, course and lesson flows, teacher approval and live-class workflows, plus UI improvements, API troubleshooting and deployment collaboration.",
    year: "2026",
    category: "Full Stack",
    status: "live",
    images: [],
    tech: ["React", "Node.js", "Express", "MySQL", "JWT", "bcrypt", "Jira"],
    live: "https://english-one.online/",
    caseStudy: "https://luxuriant-production-d9f.notion.site/EnglishOne-Product-Experience-My-Contributions-55e16a9aa62d480b8dd77a3ca557e8c2",
  },
  {
    id: "unicircle",
    title: "UniCircle: Student Networking Platform",
    tagline: "Discovery, collaboration and knowledge sharing for students",
    description:
      "Student networking platform where students find each other, collaborate and share knowledge, with secure authentication behind the community flows.",
    highlight: "Currently in beta.",
    year: "2026",
    category: "Full Stack",
    status: "building",
    images: [unicircle0, unicircle1, unicircle2, unicircle3, unicircle4],
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "bcrypt"],
    github: "https://github.com/Yatharth-Dubey/UniCircle",
    live: "https://unicircle.eduguruji.com/",
  },
  {
    id: "electrevise",
    title: "ElectRevise: Voter Survey & Booth Management",
    tagline: "Process and assign 100K+ voter records from Excel",
    description:
      "Full-stack admin platform for managing voter data through Excel workflows: record upload, merging, booth assignment, survey tracking and report generation, with role-based access control.",
    highlight: "Built with one teammate. Handles 100K+ voter records.",
    year: "2025",
    category: "Full Stack",
    status: "built",
    images: [sir1, sir2, sir3, sir4, sir5, sir6],
    tech: ["React", "Node.js", "Express", "MySQL", "Excel processing", "RBAC", "Multer"],
    github: "https://github.com/Yatharth-Dubey/ElectRevise",
    caseStudy: "https://luxuriant-production-d9f.notion.site/ElectRevise-Voter-Survey-Booth-Management-System-c9450b43ce984a37b1309308a2f0a659",
  },
  {
    id: "rbs",
    title: "RBS Kids Paradise: Student Management",
    tagline: "Fees, results and student records for a real school",
    description:
      "Full-stack system the school staff use to manage student data, fee collection and results, behind authenticated, role-based access.",
    highlight: "In daily use at RBS Kids Paradise School",
    category: "Full Stack",
    status: "live",
    images: [rbs1, rbs2, rbs3, rbs4, rbs5],
    tech: ["React", "Express", "MySQL", "JWT", "Bcrypt"],
    github: "https://github.com/Yatharth-Dubey/RbsKidsManagement",
    // live: "https://rbs.eduguruji.com/",
  },
  {
    id: "typeace",
    title: "TypeAce: Typing Practice Platform",
    tagline: "Typing speed test that tracks how you improve",
    description:
      "Typing test with a clean interface and performance tracking, so progress is visible over time.",
    category: "Full Stack",
    status: "live",
    images: [typeace1, typeace2, typeace3, typeace4],
    tech: ["React", "Express", "MySQL", "JavaScript", "CSS"],
    live: "https://examatom.com/",
  },
  {
    id: "blogpick",
    title: "BlogPick: Blogging Platform",
    tagline: "Blogging platform with authentication and content management",
    description:
      "Full-stack blogging platform with authentication and content management for writers.",
    category: "Full Stack",
    status: "building",
    images: [blogpick1, blogpick2, blogpick3],
    tech: ["React", "Express", "MongoDB", "JWT", "CSS"],
    github: "https://github.com/Yatharth-Dubey/BlogPick",
  },
  {
    id: "weather",
    title: "Weather App",
    tagline: "Live conditions for any city",
    description: "Simple weather app built around a public API, written in plain JavaScript.",
    category: "Frontend",
    status: "built",
    images: [weather],
    tech: ["HTML", "JavaScript", "CSS", "API"],
    github: "https://github.com/Yatharth-Dubey/WeatherApp",
  },
  {
    id: "snake",
    title: "Snake Game",
    tagline: "The classic, rebuilt in Python",
    description: "Classic snake game built in Python with Pygame, with custom features.",
    category: "Python",
    status: "built",
    images: [snakegame],
    tech: ["Python", "Pygame"],
    github: "https://github.com/Yatharth-Dubey/snake-game",
  },
];