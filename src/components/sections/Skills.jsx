import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Brain,
  MessageSquare,
  Lightbulb,
  Puzzle,
  GitBranch,
  Database,
  Terminal,
  Cpu,
} from "lucide-react";
import resumePDF from "../../assets/Pasindu Hansana CV.pdf";

// Import custom tech icons
import uiuxIcon from "../../assets/icons/design.svg";
import office365Icon from "../../assets/icons/office365.svg";
import vbaIcon from "../../assets/icons/vba.svg";
import powerbiIcon from "../../assets/icons/powerbi.svg";
import powerappsIcon from "../../assets/icons/powerapps.svg";
import powerautomateIcon from "../../assets/icons/powerautomate.svg";
import gitIcon from "../../assets/icons/git.svg";
import sqlIcon from "../../assets/icons/sql.svg";
import nosqlIcon from "../../assets/icons/nosql.svg";
import linuxIcon from "../../assets/icons/linux.svg";
import hardwareIcon from "../../assets/icons/hardware.svg";

import reactIcon from "../../assets/icons/react.svg";
import jsIcon from "../../assets/icons/javascript.svg";
import tsIcon from "../../assets/icons/typescript.svg";
import htmlIcon from "../../assets/icons/html5.svg";
import cssIcon from "../../assets/icons/css3.svg";
import tailwindIcon from "../../assets/icons/tailwind.svg";
import nodeIcon from "../../assets/icons/nodejs.svg";
import csharpIcon from "../../assets/icons/csharp.svg";
import pythonIcon from "../../assets/icons/python.svg";
import flutterIcon from "../../assets/icons/flutter.svg";
import xamarinIcon from "../../assets/icons/xamarin.svg";
import wpfIcon from "../../assets/icons/dotnet.svg";
import phpIcon from "../../assets/icons/php.svg";
import javaIcon from "../../assets/icons/java.svg";
import cppIcon from "../../assets/icons/cpp.svg";
import dotnetIcon from "../../assets/icons/dotnet.svg";
import springIcon from "../../assets/icons/spring.svg";

const Skills = () => {
  const [activeTab, setActiveTab] = useState("coding");

  const skillCategories = {
    coding: {
      title: "Coding Skills",
      skills: [
        { name: "React/Next.js", icon: reactIcon },
        { name: "JavaScript", icon: jsIcon },
        { name: "TypeScript", icon: tsIcon },
        { name: "HTML/CSS", icon: htmlIcon },
        { name: "Tailwind", icon: tailwindIcon },
        { name: "Node.js", icon: nodeIcon },
        { name: "C# / VB.Net", icon: csharpIcon },
        { name: "Python", icon: pythonIcon },
        { name: "Flutter", icon: flutterIcon },
        { name: "Xamarin.Forms", icon: xamarinIcon },
        { name: "WPF-XAML", icon: wpfIcon },
        { name: "PHP", icon: phpIcon },
        { name: ".NET Framework", icon: dotnetIcon },
        { name: "C++", icon: cppIcon },

        { name: "Java", icon: javaIcon },
        { name: "Spring Boot", icon: springIcon },
      ],
    },
    professional: {
      title: "Professional Skills",
      skills: [
        { name: "UI/UX Design (Figma, XD, Photoshop)", icon: uiuxIcon },
        { name: "Microsoft 365 & Office Suite", icon: office365Icon },
        { name: "VBA & Macros", icon: vbaIcon },
        { name: "Power BI", icon: powerbiIcon },
        { name: "Power Apps", icon: powerappsIcon },
        { name: "Power Automate", icon: powerautomateIcon },
        { name: "Git & GitHub", icon: gitIcon },
        { name: "Database (SQL, MySQL, SQLite)", icon: sqlIcon },
        { name: "NoSQL (Firebase, MongoDB)", icon: nosqlIcon },
        { name: "Linux Basics", icon: linuxIcon },
        { name: "Hardware & System Config", icon: hardwareIcon },
      ],
    },
    general: {
      title: "General Skills",
      skills: [
        { name: "Communication", icon: MessageSquare },
        { name: "Problem Solving", icon: Puzzle },
        { name: "Critical Thinking", icon: Lightbulb },
        { name: "Project Management", icon: Users },
        { name: "Team Leadership", icon: Users },
      ],
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  // Custom icon component to handle both SVG imports and Lucide icons
  const IconComponent = ({ icon }) => {
    // Check if icon is a string (SVG import) or a component (Lucide)
    if (typeof icon === "string") {
      return <img src={icon} alt="Skill icon" className="w-8 h-8 mr-3" />;
    } else {
      const LucideIcon = icon;
      return <LucideIcon className="w-6 h-6 text-primary-500 mr-3" />;
    }
  };

  return (
    <section id="skills" className="section bg-dark-300 dark:bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="section-title text-center mb-16">
            Skills & Expertise
          </h2>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="md:bg-dark-200 md:dark:bg-white p-1 rounded-full flex flex-col gap-2 md:flex-row">
              {Object.keys(skillCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 border md:border-none ${
                    activeTab === category
                      ? "bg-primary-500 text-white"
                      : "text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-gray-900"
                  }`}
                >
                  {skillCategories[category].title}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-6 "
            >
              {skillCategories[activeTab].skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-200 dark:bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-115"
                >
                  <div className="flex items-center gap-2">
                    <IconComponent icon={skill.icon} />
                    <h3 className="text-[15px] font-medium">{skill.name}</h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* CV Download Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <a
              href={resumePDF}
              download="Pasindu_Hansana_Resume.pdf"
              className="inline-flex items-center gap-2 px-8 py-4 bg-dark-200 dark:bg-white rounded-full text-white dark:text-gray-900 font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-opacity-50"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download CV
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
