import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import ProjectDetails from "./components/sections/ProjectDetails";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import Cursor from "./components/ui/Cursor";
import { AnimatePresence } from "framer-motion";

function App() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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
    <Router>
      <div className="bg-dark-300 bg-mesh min-h-screen">
        {!isMobile && <Cursor />}
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <AnimatePresence>
                  <Hero />
                  <Projects />
                  <About />
                  <Skills />
                  <Contact />
                </AnimatePresence>
              </main>
            }
          />
          <Route path="/projects" element={<ProjectDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
