import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import About from "./components/About";
import Projects from "./components/Projects";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { playClickSound } from "./utils/sound";
import "./index.css";
import profileImg from "./assets/profile.jpg";
import profileImg1 from "./assets/profile1.jpeg";

const startTour = () => {
  const driverObj = driver({
    showProgress: true,
    animate: true,
    overlayOpacity: 0.3,
    stagePadding: 10,
    allowClose: true,
    nextBtnText: "Next →",
    prevBtnText: "← Back",
    smoothScroll: true,
    doneBtnText: "Finish 🎉",
    onHighlightStarted: () => {
      playClickSound();
    },
  });

  driverObj.setSteps([
    {
      element: "#theme-toggle",
      popover: {
        title: "🎨 Theme Switch",
        description: "Switch between light and dark mode. Two completely different looks await",
        side: "bottom",
      },
    },
    {
      element: "#sound-toggle",
      popover: {
        title: "🔊 Sound Control",
        description: "Enable or disable UI sounds",
        side: "right",
      },
    },
    {
      element: "#nav-about",
      popover: {
        title: "🙎‍♂️ About",
        description: "Know more about my qualifications",
        side: "bottom",
      },
    },
    {
      element: "#nav-projects",
      popover: {
        title: "🚀 Projects",
        description: "Explore my work and projects here",
        side: "bottom",
      },
    },
    {
      element: "#nav-yath-contact",
      popover: {
        title: "📬 Contact",
        description: "Contact me here.",
        side: "bottom",
      },
    },
  ]);
  driverObj.drive();
};

export default function App() {

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches;
  });

  useEffect(() => {
    const seen = localStorage.getItem("seenTour");
    if (!seen) {
      setTimeout(() => {
        startTour();
      }, 1000);
      localStorage.setItem("seenTour", "true");
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div>
      <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
      <Hero 
        name="Yatharth Dubey" 
        role="Building scalable web apps & exploring full-stack development" 
        imageUrl={profileImg}
      />
      <About imageUrl={profileImg1} />
      <Projects />
      <Contact />
    </div>
  );
}