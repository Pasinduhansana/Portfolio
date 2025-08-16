import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import disastermanagement from "../../assets/DisasterManagement.png";
import tracker_img from "../../assets/image.jpeg";
import stellarQuaest from "../../assets/StellarQuest.png";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define project data
  const allProjects = [
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
      longDescription: `
        The Supplier PO Tracker is a desktop application designed for manufacturing businesses
        to track and manage purchase orders with suppliers. It features real-time notifications,
        risk assessment, and comprehensive reporting capabilities.
        
        Key Features:
        • Automated PO tracking system with status updates
        • Risk mitigation tools to identify potential delays
        • Supplier performance metrics and analytics
        • Integration with email systems for automated notifications
        • Customizable dashboard with KPI visualization
        
        This application was developed using C# and WPF with a modern UI design and follows
        the MVVM architectural pattern for better maintainability and testability.
      `,
      challenges: `
        • Implementing a reliable notification system that works across different network environments
        • Creating an intuitive UI that provides comprehensive information without overwhelming the user
        • Developing a flexible data model that can accommodate different types of purchase orders
      `,
      solution: `
        The solution employs a modular architecture with separate services for data processing,
        notification management, and UI presentation. The application uses SQLite for local data
        storage and includes a background service for monitoring PO status changes.
      `,
      screenshots: [tracker_img, tracker_img], // Add more screenshots if available
    },
    // Add similar detailed data for other projects
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
      longDescription: `
        The Natural Disaster Management System is a comprehensive platform that enables communities
        to prepare for, respond to, and recover from natural disasters. It combines modern web
        technologies with AI prediction models to provide timely information and resources.
        
        Key Features:
        • Community-based disaster reporting and verification
        • Real-time alerts and notifications for affected areas
        • AI-powered prediction of potential disaster impacts
        • Crowdfunding platform for disaster relief efforts
        • Resource allocation and management tools
        • Administrative dashboard for emergency response coordination
      `,
      challenges: `
        • Creating an accurate prediction model using limited historical data
        • Ensuring the platform remains accessible during disaster scenarios
        • Balancing between user-friendly interfaces and comprehensive information
        • Implementing secure payment processing for donations
      `,
      solution: `
        The system utilizes the MERN stack (MongoDB, Express, React, Node.js) for the web application,
        with TailwindCSS for responsive design. Python is used for the AI prediction models, which
        analyze weather patterns, geographical data, and historical records to predict potential disasters.
        Stripe integration enables secure donation processing.
      `,
      screenshots: [disastermanagement, disastermanagement], // Add more screenshots
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
      longDescription: `
        StellarQuest is an innovative web application that combines astronomy education with
        e-commerce functionality. It offers users an immersive space exploration experience while
        providing access to quality astronomy equipment and resources.
        
        Key Features:
        • Interactive 3D solar system exploration using Three.js
        • E-commerce platform for astronomy equipment and accessories
        • Educational content with detailed information about celestial bodies
        • Community forum for astronomy enthusiasts
        • Night sky prediction tool based on user location
        • Virtual observatory with live telescope feeds
      `,
      challenges: `
        • Creating performant 3D visualizations that work across different devices
        • Implementing an accurate sky prediction tool that accounts for location and time
        • Designing an intuitive navigation system for complex astronomical data
        • Balancing educational content with commercial offerings
      `,
      solution: `
        The application uses React and Next.js for the frontend with Three.js for 3D visualizations.
        Firebase provides authentication, database, and hosting services. A Spring Boot backend
        handles complex calculations for astronomical predictions and manages e-commerce functionality.
      `,
      screenshots: [stellarQuaest, stellarQuaest], // Add more screenshots
    },
    // Add remaining projects with detailed information
    {
      id: "staff-management",
      title: "Staff Management System",
      description:
        "A web-based platform for managing employee records, leave requests, and attendance with role-based access.",
      tech: ["Java", "MySQL", "HTML/CSS", "Servlets"],
      liveDemo: "",
      sourceCode: "https://github.com/Pasinduhansana/staff-management-system",
      longDescription: `
        The Staff Management System is a comprehensive web application designed to streamline
        human resource operations. It provides tools for managing employee records, processing
        leave requests, tracking attendance, and generating reports.
      `,
      challenges: `
        • Implementing a secure role-based access control system
        • Creating an efficient leave approval workflow
        • Designing a scalable database schema
      `,
      solution: `
        The system was built using Java Servlets and JSP for the backend, with MySQL for data storage.
        The frontend uses HTML, CSS, and JavaScript to create a responsive user interface.
      `,
      screenshots: [], // Add screenshots if available
    },
    {
      id: "thread-analysis",
      title: "Thread Analysis Dashboard",
      description:
        "A data visualization dashboard for analyzing thread production metrics and quality across units.",
      tech: ["Power BI", "SQL", "Excel", "DAX"],
      liveDemo: "",
      sourceCode: "https://github.com/Pasinduhansana/thread-analysis-dashboard",
      longDescription: `
        The Thread Analysis Dashboard is a Power BI solution that provides comprehensive insights
        into thread production processes. It visualizes key metrics, quality indicators, and
        production efficiency to support data-driven decision making.
      `,
      challenges: `
        • Consolidating data from multiple production units and systems
        • Creating meaningful visualizations for complex manufacturing metrics
        • Optimizing dashboard performance with large datasets
      `,
      solution: `
        The dashboard was developed using Power BI with custom DAX measures and SQL queries
        to transform and analyze production data. It features interactive filters and drill-through
        capabilities for detailed analysis.
      `,
      screenshots: [], // Add screenshots if available
    },
    {
      id: "wrapos",
      title: "WRAPOS - Point of Sale System",
      description:
        "A custom POS solution for retail environments, enabling real-time sales tracking, inventory control, and secure billing.",
      tech: ["C#", "WPF", "Sqlite", "MVVM"],
      liveDemo: "",
      sourceCode: "https://github.com/Pasinduhansana/WRAPOS",
      longDescription: `
        WRAPOS is a point of sale system designed for small to medium retail businesses. It provides
        comprehensive sales management, inventory tracking, and reporting capabilities in a
        user-friendly interface.
      `,
      challenges: `
        • Designing an intuitive interface for fast-paced retail environments
        • Implementing reliable inventory management with real-time updates
        • Creating a secure transaction processing system
      `,
      solution: `
        The application was developed using C# and WPF with the MVVM pattern. It uses SQLite for
        local data storage with a focus on performance and reliability. The UI was designed for
        touch screen compatibility and quick operation.
      `,
      screenshots: [], // Add screenshots if available
    },
    {
      id: "lms",
      title: "Learning Management System (LMS)",
      description:
        "An LMS designed to deliver educational content, track learner progress, and manage course interactions.",
      tech: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
      liveDemo: "",
      sourceCode: "https://github.com/Pasinduhansana/LMS",
      longDescription: `
        This Learning Management System provides a comprehensive platform for creating, delivering,
        and managing educational content. It supports multiple content types, assessment methods,
        and detailed progress tracking.
      `,
      challenges: `
        • Creating a flexible content management system for different types of learning materials
        • Implementing reliable progress tracking and assessment tools
        • Designing an intuitive interface for both instructors and learners
      `,
      solution: `
        The system was built using PHP and MySQL for the backend with Bootstrap and JavaScript
        for a responsive frontend. It features a modular architecture that allows for easy
        extension and customization.
      `,
      screenshots: [], // Add screenshots if available
    },
  ];

  useEffect(() => {
    // Find the project with the matching id
    const foundProject = allProjects.find((p) => p.id === id);

    if (foundProject) {
      setProject(foundProject);
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-300 dark:bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-dark-300 dark:bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Link to="/" className="text-primary-500 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-dark-300 dark:bg-gray-50 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-primary-500 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {project.title}
          </h1>

          <div className="rounded-xl overflow-hidden mb-8 bg-dark-200 dark:bg-white p-2">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-dark-200 dark:bg-white p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
                <p className="text-gray-300 dark:text-gray-700 whitespace-pre-line">
                  {project.longDescription || project.description}
                </p>
              </div>

              {project.challenges && (
                <div className="bg-dark-200 dark:bg-white p-6 rounded-xl">
                  <h2 className="text-xl font-semibold mb-4">Challenges</h2>
                  <p className="text-gray-300 dark:text-gray-700 whitespace-pre-line">
                    {project.challenges}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="bg-dark-200 dark:bg-white p-6 rounded-xl">
                  <h2 className="text-xl font-semibold mb-4">Solution</h2>
                  <p className="text-gray-300 dark:text-gray-700 whitespace-pre-line">
                    {project.solution}
                  </p>
                </div>
              )}

              {project.screenshots && project.screenshots.length > 1 && (
                <div className="bg-dark-200 dark:bg-white p-6 rounded-xl">
                  <h2 className="text-xl font-semibold mb-4">Screenshots</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.screenshots.map((screenshot, index) => (
                      <div key={index} className="rounded-lg overflow-hidden">
                        <img
                          src={screenshot}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="w-full h-auto"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-dark-200 dark:bg-white p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-dark-300 dark:bg-gray-100 rounded-full text-primary-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-dark-200 dark:bg-white p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Links</h2>
                <div className="space-y-3">
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary-500 hover:text-primary-600 transition-colors"
                    >
                      <ExternalLink size={18} className="mr-2" />
                      View Live Demo
                    </a>
                  )}

                  <a
                    href={project.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    <Github size={18} className="mr-2" />
                    View Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;
