import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, ExternalLink, Github } from 'lucide-react';

const ProjectDetails = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      thumbnail: "https://images.pexels.com/photos/18069362/pexels-photo-18069362.jpeg",
      description: "A full-featured e-commerce platform with real-time inventory management.",
      demoUrl: "https://example.com/demo1",
      githubUrl: "https://github.com/example/project1",
      tech: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 2,
      title: "Task Management App",
      thumbnail: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
      description: "Collaborative task management with real-time updates.",
      demoUrl: "https://example.com/demo2",
      githubUrl: "https://github.com/example/project2",
      tech: ["React", "Firebase", "Tailwind"]
    },
    {
      id: 3,
      title: "Weather Dashboard",
      thumbnail: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg",
      description: "Real-time weather tracking with interactive maps.",
      demoUrl: "https://example.com/demo3",
      githubUrl: "https://github.com/example/project3",
      tech: ["React", "OpenWeather API", "Chart.js"]
    }
  ];

  useEffect(() => {
    setSelectedProject(projects[0]);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-dark-300 dark:bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Project List Sidebar */}
          <motion.div 
            className="lg:col-span-4 bg-dark-200 dark:bg-white rounded-xl p-4 h-[calc(100vh-8rem)] overflow-y-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xl font-bold mb-6 px-2">Projects</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className={`cursor-pointer rounded-lg p-3 transition-all duration-300 ${
                    selectedProject?.id === project.id
                      ? 'bg-primary-500/10 border border-primary-500/30'
                      : 'hover:bg-dark-100 dark:hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{project.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {project.tech.map((tech, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 rounded-full bg-primary-500/20 text-primary-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Project Preview */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {selectedProject && (
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-dark-200 dark:bg-white rounded-xl overflow-hidden shadow-xl"
                >
                  {/* Browser Frame Header */}
                  <div className="bg-dark-100 dark:bg-gray-50 p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                      >
                        <X size={8} className="text-red-900" />
                      </button>
                      <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
                      >
                        <Minus size={8} className="text-yellow-900" />
                      </button>
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-sm font-medium text-gray-400">
                        {selectedProject.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary-500 transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary-500 transition-colors"
                      >
                        <Github size={18} />
                      </a>
                    </div>
                  </div>

                  {/* Project Content */}
                  <AnimatePresence>
                    {!isMinimized && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="aspect-video relative">
                          <img
                            src={selectedProject.thumbnail}
                            alt={selectedProject.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-300/80 to-transparent" />
                        </div>
                        <div className="p-6">
                          <h2 className="text-2xl font-bold mb-4">{selectedProject.title}</h2>
                          <p className="text-gray-400 dark:text-gray-600 mb-6">
                            {selectedProject.description}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {selectedProject.tech.map((tech, index) => (
                              <span
                                key={index}
                                className="px-4 py-2 rounded-full bg-primary-500/10 text-primary-500"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;