import resumePDF from '../assets/Pasindu Hansana CV.pdf';

export const portfolioData = {
  projects: [
    {
      id: "po-tracker",
      title: "Supplier PO Tracker V0.1",
      description: "A robust C#/WPF desktop app for supplier PO tracking with real-time notifications, dashboard, and risk mitigation features.",
      tech: ["C#", "WPF", "Desktop Application", "Real-time Notifications", "Dashboard UI", "Supplier Management"],
      demo: "",
      repo: "https://github.com/Pasinduhansana/PO-Tracker.git",
      featured: false
    },
    {
      id: "disaster-management",
      title: "Natural Disaster Management System",
      description: "App for disaster reporting, community funding, dashboard features, and AI-based disaster prediction with real-time updates.",
      tech: ["MERN", "TailwindCSS", "Python", "Stripe", "AI Prediction Model"],
      demo: "https://guardianearth.netlify.app/",
      repo: "https://github.com/Pasinduhansana/Natural-Disaster-Management-System.git",
      featured: true
    },
    {
      id: "stellar-quest",
      title: "StellarQuest - Astronomy E-Commerce Web App",
      description: "Interactive space exploration platform with e-commerce, educational guides, and community features built with modern web technologies.",
      tech: ["React", "Firebase", "TailwindCSS", "Spring Boot", "Next.js", "Three.js"],
      demo: "",
      repo: "https://github.com/Pasinduhansana/StellarQuest.git",
      featured: true
    },
    {
      id: "staff-management",
      title: "Staff Management System",
      description: "A web-based platform for managing employee records, leave requests, and attendance with role-based access.",
      tech: ["Java", "MySQL", "HTML/CSS", "Servlets"],
      demo: "",
      repo: "https://github.com/Pasinduhansana/staff-management-system",
      featured: false
    },
    {
      id: "thread-analysis",
      title: "Thread Analysis Dashboard",
      description: "A data visualization dashboard for analyzing thread production metrics and quality across units.",
      tech: ["Power BI", "SQL", "Excel", "DAX"],
      demo: "",
      repo: "https://github.com/Pasinduhansana/thread-analysis-dashboard",
      featured: false
    },
    {
      id: "wrapos",
      title: "WRAPOS - Point of Sale System",
      description: "A custom POS solution for retail environments, enabling real-time sales tracking, inventory control, and secure billing.",
      tech: ["C#", "WPF", "Sqlite", "MVVM"],
      demo: "",
      repo: "https://github.com/Pasinduhansana/WRAPOS",
      featured: false
    },
    {
      id: "lms",
      title: "Learning Management System (LMS)",
      description: "An LMS designed to deliver educational content, track learner progress, and manage course interactions.",
      tech: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
      demo: "",
      repo: "https://github.com/Pasinduhansana/LMS",
      featured: false
    }
  ],
  education: [
    {
      year: "2022-2026",
      degree: "BSc (Hons) in Information Technology Specialising in information technology",
      institution: "Sri Lanka Institute of Information Technology - SLIIT",
      location: "Malabe, Sri Lanka",
      gpa: "3.9/4.0",
      description: "Completed coursework in software engineering, web development, and database management. Worked on group projects involving full-stack development. Conducting research on emerging technologies in IT. Engaged in extracurricular activities and student organizations. Built and deployed multiple real-world web applications using React and Firebase. Actively mentored peers in coding best practices and project development. Participated in workshops on cloud computing and DevOps practices. Contributed to open-source projects and community initiatives."
    }
  ],
  experience: [
    {
      year: "2022-Currrent",
      period: "2022-Currrent",
      title: "Executive - Supply Chain Analayst",
      company: "InQube Global pvt.ltd",
      description: "Involved in process automation and supply chain analytics, focusing on data-driven decision-making and operational efficiency. Spearheaded process automation initiatives across the supply chain using Macro/Power Automate/Python and VB.NET, reducing manual workload and enhancing operational efficiency. Designed and deployed cloud-based tracking analysis tools to streamline supply chain workflows, with a focus on data-driven decision-making and real-time visibility. Designed real-time dashboards to visualize supply chain KPIs such as inventory turnover, order accuracy, and fulfillment rate. Monitoring the supplier performance and Inventory D2D Control. Identified inefficiencies and implemented workflow optimizations to improve supply chain performance. Collaborated with cross-functional teams to gather requirements and deliver tailored solutions. Conducted training sessions for end-users to ensure smooth adoption of new tools and processes. Shipments follow-up and Ensuring the material availability and on-time delivery. Monitoring supplier payment flows , ensuring timely and accurate transactions, identifying any delays or discrepancies, and supplier relationships."
    },
    {
      year: "2024 - Part time",
      period: "2024 - Part time",
      title: "Assosiate - full Stack Developer",
      company: "WebMinds",
      description: "Developed and maintained full-stack web Applications. Built and deployed 10+ full-stack applications & web sites for various clients. Implemented RESTful APIs using Node.js and Express. Designed and developed modern user-friendly interfaces with React. Implemented real-time features using WebSocket technology. Worked with cloud services (AWS, Azure) for deployment. Participated in Agile development process and sprint planning. Integrated third-party APIs and payment gateways. Created unit tests and performed debugging. Participated in client meetings to gather requirements. Provided technical support and troubleshooting. Conducted performance testing and optimization."
    },
    {
      year: "Part time",
      period: "Part time",
      title: "Freelance software Developer and Designer",
      company: "Freelance",
      description: "Designed and developed websites,softwares and UI for various clients. Designed user interfaces and user experiences for web applications. Collaborated with clients to gather requirements and feedback. Utilized Figma and Adobe XD for UI/UX design. Implemented front-end frameworks like Bootstrap and Tailwind CSS. Managed project timelines and delivered on schedule. Developed responsive designs for various devices."
    }
  ],
  contact: {
    email: "gallagepasinduhansana@gmail.com",
    phone: "+94 74 160 5140",
    location: "Elpitiya, Sri Lanka",
    github: "https://github.com/Pasinduhansana",
    linkedin: "https://linkedin.com/in/pasinduhansana"
  },
  skills: {
    coding: [
      "React/Next.js", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind", "Node.js", 
      "C# / VB.Net", "Python", "Flutter", "Xamarin.Forms", "WPF-XAML", "PHP", 
      ".NET Framework", "C++", "Java", "Spring Boot"
    ],
    professional: [
      "UI/UX Design (Figma, XD, Photoshop)", "Microsoft 365 & Office Suite", "VBA & Macros", 
      "Power BI", "Power Apps", "Power Automate", "Git & GitHub", 
      "Database (SQL, MySQL, SQLite)", "NoSQL (Firebase, MongoDB)", 
      "Linux Basics", "Hardware & System Config"
    ],
    general: [
      "Communication", "Problem Solving", "Critical Thinking", 
      "Project Management", "Team Leadership"
    ]
  },
  resumeUrl: resumePDF
};
