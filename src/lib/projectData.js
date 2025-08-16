import disastermanagement from "../assets/DisasterManagement.png";
import tracker_img from "../assets/image.jpeg";
import stellarQuaest from "../assets/StellarQuest.png";

export const featuredProjects = [
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
    categories: ["desktop", "data"],
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
    categories: ["web", "data"],
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
    categories: ["web"],
  },
];

export const otherProjects = [
  {
    id: "staff-management",
    title: "Staff Management System",
    description:
      "A web-based platform for managing employee records, leave requests, and attendance with role-based access.",
    image: disastermanagement, // Replace with appropriate image
    tech: ["Java", "MySQL", "HTML/CSS", "Servlets"],
    liveDemo: "",
    sourceCode: "https://github.com/Pasinduhansana/staff-management-system",
    categories: ["web", "data"],
  },
  {
    id: "thread-analysis",
    title: "Thread Analysis Dashboard",
    description:
      "A data visualization dashboard for analyzing thread production metrics and quality across units.",
    image: stellarQuaest, // Replace with appropriate image
    tech: ["Power BI", "SQL", "Excel", "DAX"],
    liveDemo: "",
    sourceCode: "https://github.com/Pasinduhansana/thread-analysis-dashboard",
    categories: ["data"],
  },
  {
    id: "wrapos",
    title: "WRAPOS - Point of Sale System",
    description:
      "A custom POS solution for retail environments, enabling real-time sales tracking, inventory control, and secure billing.",
    image: tracker_img, // Replace with appropriate image
    tech: ["C#", "WPF", "Sqlite", "MVVM"],
    liveDemo: "",
    sourceCode: "https://github.com/Pasinduhansana/WRAPOS",
    categories: ["desktop"],
  },
  {
    id: "lms",
    title: "Learning Management System (LMS)",
    description:
      "An LMS designed to deliver educational content, track learner progress, and manage course interactions.",
    image: disastermanagement, // Replace with appropriate image
    tech: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    liveDemo: "",
    sourceCode: "https://github.com/Pasinduhansana/LMS",
    categories: ["web"],
  },
  {
    id: "mobile-app",
    title: "Fitness Tracker Mobile App",
    description:
      "A cross-platform mobile application for tracking workouts, nutrition, and fitness goals with social features.",
    image: stellarQuaest, // Replace with appropriate image
    tech: ["Flutter", "Firebase", "RESTful API", "SQLite"],
    liveDemo: "",
    sourceCode: "https://github.com/Pasinduhansana/fitness-tracker",
    categories: ["mobile"],
  },
  {
    id: "inventory-system",
    title: "Inventory Management System",
    description:
      "A comprehensive system for tracking inventory levels, orders, sales, and deliveries for small to medium businesses.",
    image: tracker_img, // Replace with appropriate image
    tech: ["React", "Node.js", "MongoDB", "Express"],
    liveDemo: "",
    sourceCode: "https://github.com/Pasinduhansana/inventory-system",
    categories: ["web", "data"],
  },
];
