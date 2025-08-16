import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Filter, Grid3X3, List, X, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Import project data
import { featuredProjects, otherProjects } from "../../lib/projectData";

const ProjectsShowcase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isSearchSticky, setIsSearchSticky] = useState(false);
  const searchBarRef = useRef(null);
  const navigate = useNavigate();

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Apps" },
    { id: "mobile", label: "Mobile" },
    { id: "desktop", label: "Desktop" },
    { id: "data", label: "Data Viz" },
  ];

  // Combine all projects
  const allProjects = [...featuredProjects, ...otherProjects];

  // Filter projects based on search term and active filter
  useEffect(() => {
    let results = allProjects;

    // Filter by category
    if (activeFilter !== "all") {
      results = results.filter(
        (project) =>
          project.categories && project.categories.includes(activeFilter)
      );
    }

    // Filter by search term
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      results = results.filter(
        (project) =>
          project.title.toLowerCase().includes(lowercasedTerm) ||
          project.description.toLowerCase().includes(lowercasedTerm) ||
          (project.tech &&
            project.tech.some((tech) =>
              tech.toLowerCase().includes(lowercasedTerm)
            ))
      );
    }

    setFilteredProjects(results);
  }, [searchTerm, activeFilter, allProjects]);

  // Implement sticky search bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const searchBarPosition = searchBarRef.current?.offsetTop;
      if (searchBarPosition && scrollY > searchBarPosition - 20) {
        setIsSearchSticky(true);
      } else {
        setIsSearchSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    //window.scrollTo(0, 0);
  }, []);

  // Navigate to project details
  const navigateToProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-8 pb-16 bg-white dark:bg-gray-50"
    >
      <div className="container mx-auto px-4 relative pt-2">
        {/* Search and filter controls - Sticky version will appear when scrolling */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          ref={searchBarRef}
          className={`${
            isSearchSticky
              ? "fixed top-0 left-0 right-0 z-50 px-4 py-3 backdrop-blur-lg bg-dark-200/90 dark:bg-white/90 shadow-lg transition-all duration-300 ease-in-out"
              : "bg-dark-200 dark:bg-white rounded-2xl p-4 shadow-lg mb-8"
          }`}
        >
          <div
            className={`container mx-auto flex flex-col md:flex-row gap-4 items-stretch md:items-center ${
              isSearchSticky ? "max-w-7xl" : ""
            }`}
          >
            <div className="flex bg-dark-100 dark:bg-gray-100 rounded-lg p-1 ml-2 h-[34px]">
              <Link
                to="/"
                className="inline-flex items-center text-[14px] transition-all duration-200 text-gray-400 hover:text-white dark:hover:text-gray-800 pt-[1px]  px-2 "
              >
                <ArrowLeft size={18} className="mr-2" />
                Back to Home
              </Link>
            </div>
            <div className="relative flex-grow h-[34px]">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white dark:hover:text-gray-800"
                >
                  <X size={16} />
                </button>
              )}
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10  rounded-lg bg-dark-100 dark:bg-gray-100 text-white dark:text-gray-800 text-[14px] border-none h-full  outline-none focus:ring-1 focus:ring-gray-600"
              />
            </div>

            <div className="flex items-center gap-2 self-end">
              <Filter size={20} className="text-gray-400" />
              <div className="flex flex-wrap bg-dark-100 dark:bg-gray-100 rounded-lg p-1">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-3 py-1 text-sm rounded-md transition-all ${
                      activeFilter === filter.id
                        ? "bg-primary-500 text-white"
                        : "text-gray-400 hover:text-white dark:hover:text-gray-800"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <div className="flex bg-dark-100 dark:bg-gray-100 rounded-lg p-1 ml-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1 rounded-md transition-all ${
                    viewMode === "grid"
                      ? "bg-primary-500 text-white"
                      : "text-gray-400 hover:text-white dark:hover:text-gray-800"
                  }`}
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1 rounded-md transition-all ${
                    viewMode === "list"
                      ? "bg-primary-500 text-white"
                      : "text-gray-400 hover:text-white dark:hover:text-gray-800"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero section */}
        <div className="relative z-10 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
                  Project Gallery
                </span>
              </h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-300 dark:text-gray-700 text-lg max-w-2xl"
              >
                Explore my portfolio of projects spanning web development,
                desktop applications, and data visualization.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Featured project - Mac inspired design */}
        {activeFilter === "all" && searchTerm === "" && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12 overflow-hidden rounded-2xl group"
            onClick={() => navigateToProject("disaster-management")}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
              <img
                src={featuredProjects[1].image}
                alt={featuredProjects[1].title}
                className="w-full h-[300px] md:h-[400px] object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={18} className="text-primary-500" />
                  <span className="text-primary-500 font-medium text-sm">
                    Featured Project
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-primary-500 transition-colors">
                  {featuredProjects[1].title}
                </h2>
                <p className="text-gray-300 mb-4 max-w-2xl">
                  {featuredProjects[1].description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredProjects[1].tech.slice(0, 4).map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-dark-200/70 backdrop-blur-sm rounded-full text-primary-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Projects Grid - Mac inspired design with Tailwind */}
        <div className="mt-12">
          {/* If no results found */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-medium mb-2 text-white dark:text-gray-800">
                No projects found
              </h3>
              <p className="text-gray-400 dark:text-gray-600 text-center max-w-md">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("all");
                }}
                className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
              >
                Reset Filters
              </button>
            </motion.div>
          )}

          {/* Render projects based on view mode */}
          <div
            className={`
            ${
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }
          `}
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => navigateToProject(project.id)}
                  className={`
                    ${
                      viewMode === "grid"
                        ? "bg-dark-200 dark:bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform perspective-1000 hover:scale-[1.02] hover:-rotate-1 transition-all duration-300 cursor-pointer"
                        : "bg-dark-200 dark:bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:translate-x-1 transition-all duration-300 cursor-pointer"
                    }
                  `}
                >
                  {/* Grid View */}
                  {viewMode === "grid" && (
                    <>
                      <div className="overflow-hidden h-48 relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-300/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      </div>
                      <div className="p-5 backdrop-blur-sm bg-opacity-80">
                        <h3 className="text-xl font-semibold mb-2 text-white dark:text-gray-800 group-hover:text-primary-500 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 dark:text-gray-600 text-sm mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.tech &&
                            project.tech.slice(0, 3).map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="text-xs px-2 py-1 bg-dark-300/50 dark:bg-gray-100 rounded-full text-primary-400"
                              >
                                {tech}
                              </span>
                            ))}
                          {project.tech && project.tech.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-dark-300/50 dark:bg-gray-100 rounded-full text-primary-400">
                              +{project.tech.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* List View */}
                  {viewMode === "list" && (
                    <div className="flex gap-4 p-4 group">
                      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold mb-1 text-white dark:text-gray-800 group-hover:text-primary-500 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 dark:text-gray-600 text-sm mb-2 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.tech &&
                            project.tech.slice(0, 4).map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="text-xs px-2 py-1 bg-dark-300/50 dark:bg-gray-100 rounded-full text-primary-400"
                              >
                                {tech}
                              </span>
                            ))}
                          {project.tech && project.tech.length > 4 && (
                            <span className="text-xs px-2 py-1 bg-dark-300/50 dark:bg-gray-100 rounded-full text-primary-400">
                              +{project.tech.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsShowcase;
