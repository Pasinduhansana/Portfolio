import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Folder } from 'lucide-react';

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const featuredProjects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with real-time inventory management, secure payments, and an intuitive admin dashboard.",
      image: "https://images.pexels.com/photos/18069362/pexels-photo-18069362.jpeg",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      liveDemo: "https://ecommerce-demo.com",
      sourceCode: "https://github.com/username/ecommerce",
      featured: true
    },
    {
      title: "AI Content Generator",
      description: "An AI-powered platform that generates high-quality content using advanced natural language processing.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
      tech: ["React", "Python", "OpenAI", "Flask"],
      liveDemo: "https://ai-content.demo.com",
      sourceCode: "https://github.com/username/ai-content",
      featured: true
    }
  ];

  const otherProjects = [
    {
      title: "Task Management App",
      description: "A collaborative task management tool with real-time updates and team features.",
      tech: ["React", "Firebase", "Tailwind CSS"],
      liveDemo: "https://tasks-demo.com",
      sourceCode: "https://github.com/username/tasks"
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather tracking with interactive maps and forecasting.",
      tech: ["React", "OpenWeather API", "Chart.js"],
      liveDemo: "https://weather-demo.com",
      sourceCode: "https://github.com/username/weather"
    },
    {
      title: "Portfolio Generator",
      description: "A tool that helps developers create beautiful portfolios with minimal setup.",
      tech: ["React", "Tailwind CSS", "Netlify"],
      liveDemo: "https://portfolio-gen.demo.com",
      sourceCode: "https://github.com/username/portfolio-gen"
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management and tracking.",
      tech: ["React", "D3.js", "Node.js"],
      liveDemo: "https://social-demo.com",
      sourceCode: "https://github.com/username/social-dash"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="projects" className="section bg-dark-300">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl">
            Here are some of my recent projects that showcase my expertise in web development and design.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="project-card group relative overflow-hidden rounded-xl bg-dark-200 border border-white/10"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-sm bg-dark-300 rounded-full text-primary-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-primary-500 transition-colors"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                  <a
                    href={project.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-primary-500 transition-colors"
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
              className="bg-dark-200 p-6 rounded-xl border border-white/10 hover:border-primary-500/50 transition-all duration-300"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex justify-between items-start mb-4">
                <Folder
                  size={40}
                  className={`transition-colors duration-300 ${
                    hoveredIndex === index ? 'text-primary-500' : 'text-gray-400'
                  }`}
                />
                <div className="flex gap-3">
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-500 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
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
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-sm text-primary-400"
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