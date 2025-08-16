import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/layout/Header";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import ProjectDetails from "./components/sections/ProjectDetails";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import Cursor from "./components/ui/Cursor";
import ProjectsShowcase from "./components/sections/ProjectsShowcase";
import { AnimatePresence } from "framer-motion";

// Wrapper component to access location
function AppContent() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Check if current path is projects showcase
  const isProjectsShowcase = location.pathname === "/projects";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-dark-300 flex items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-dark-300 bg-mesh min-h-screen">
      {!isMobile && <Cursor />}
      {!isProjectsShowcase && <Header />}
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <Projects />
                <About />
                <Skills />
                <Contact />
              </main>
            }
          />
          <Route path="/projects" element={<ProjectsShowcase />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
