import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";
import disastermanagement from "../../assets/DisasterManagement.png";
import tracker_img from "../../assets/image.jpeg";
import stellarQuaest from "../../assets/StellarQuest.png";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

const Projects = ({ showcaseMode = false }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const featuredProjects = [
    {
      id: "po-tracker",
      title: "Supplier PO Tracker V0.1",
      description:
        "A robust C#/WPF desktop app for supplier PO tracking with real-time notifications, dashboard, and risk mitigation features.",
      image: tracker_img,
      tech: [
        "C#",
        "WPF",
        "Desktop Application",
        "Real-time Notifications",
        "Dashboard UI",
        "Supplier Management",
      ],
      liveDemo: "",
      sourceCode: "https://github.com/Pasinduhansana/PO-Tracker.git",
      featured: false,
    },
    {
      id: "disaster-management",
      title: "Natural Disaster Management System",
      description:
        "App for disaster reporting, community funding, dashboard features, and AI-based disaster prediction with real-time updates.",
      image: disastermanagement,
      tech: ["MERN", "TailwindCSS", "Python", "Stripe", "AI Prediction Model"],
      liveDemo: "https://guardianearth.netlify.app/",
      sourceCode:
        "https://github.com/Pasinduhansana/Natural-Disaster-Management-System.git",
      featured: true,
    },
    {
      id: "stellar-quest",
      title: "StellarQuest - Astronomy E-Commerce Web App",
      description:
        "Interactive space exploration platform with e-commerce, educational guides, and community features built with modern web technologies.",
      image: stellarQuaest,
      tech: [
        "React",
        "Firebase",
        "TailwindCSS",
        "Spring Boot",
        "Next.js",
        "Three.js",
      ],
      liveDemo: "",
      sourceCode: "https://github.com/Pasinduhansana/StellarQuest.git",
      featured: true,
    },
  ];

  const otherProjects = [
    {
      id: "staff-management",
      title: "Staff Management System",
      description:
        "A web-based platform for managing employee records, leave requests, and attendance with role-based access.",
      tech: ["Java", "MySQL", "HTML/CSS", "Servlets"],
      liveDemo: "",
      sourceCode: "https://github.com/Pasinduhansana/staff-management-system",
    },
    {
      id: "thread-analysis",
      title: "Thread Analysis Dashboard",
      description:
        "A data visualization dashboard for analyzing thread production metrics and quality across units.",
      tech: ["Power BI", "SQL", "Excel", "DAX"],
      liveDemo: "",
      sourceCode: "https://github.com/Pasinduhansana/thread-analysis-dashboard",
    },
    {
      id: "wrapos",
      title: "WRAPOS - Point of Sale System",
      description:
        "A custom POS solution for retail environments, enabling real-time sales tracking, inventory control, and secure billing.",
      tech: ["C#", "WPF", "Sqlite", "MVVM"],
      liveDemo: "",
      sourceCode: "https://github.com/Pasinduhansana/WRAPOS",
    },
    {
      id: "lms",
      title: "Learning Management System (LMS)",
      description:
        "An LMS designed to deliver educational content, track learner progress, and manage course interactions.",
      tech: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
      liveDemo: "",
      sourceCode: "https://github.com/Pasinduhansana/LMS",
    },
  ];

  // Function to navigate to project details page
  const navigateToProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="projects"
      className={`${
        !showcaseMode ? "section bg-dark-300 dark:bg-gray-50" : ""
      }`}
    >
      <div className="container">
        {!showcaseMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h2 className="section-title">Featured Projects</h2>
            <p className="text-gray-400 max-w-2xl">
              Here are some of my recent projects that showcase my expertise in
              web development and design.
            </p>
          </motion.div>
        )}

        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="project-card group relative overflow-hidden rounded-xl bg-dark-200 dark:bg-white shadow-xl dark:border-none border border-white/10 cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-2xl"
              onClick={() => navigateToProject(project.id)}
            >
              <div className="aspect-video overflow-hidden m-4 border-[2px] border-gray-800 dark:border-gray-200 rounded-[6px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="px-6 pb-4">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 dark:text-gray-800">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-sm bg-dark-300 dark:bg-white rounded-full text-primary-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div
                  className="flex gap-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center dark:text-gray-800 gap-2 text-white hover:text-primary-500 transition-colors"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                  )}
                  <a
                    href={project.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center dark:text-gray-800 gap-2 text-white hover:text-primary-500 transition-colors"
                  >
                    <Github size={18} />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="section-title">Other Noteworthy Projects</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {otherProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-dark-200 dark:bg-white dark:shadow-xl p-6 rounded-xl border border-white/10 hover:border-primary-500/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-105"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => navigateToProject(project.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <Folder
                  size={40}
                  className={`transition-colors duration-300 ${
                    hoveredIndex === index
                      ? "text-primary-500"
                      : "text-gray-400"
                  }`}
                />
                <div
                  className="flex gap-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                  <a
                    href={project.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-500 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-400 dark:text-gray-600 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-sm text-primary-400 dark:text-primary-500"
                  >
                    {tech}
                    {techIndex < project.tech.length - 1 && " • "}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
