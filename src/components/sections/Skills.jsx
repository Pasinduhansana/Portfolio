import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
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

const Skills = () => {
  const [activeTab, setActiveTab] = useState("coding");

  const skillCategories = {
    coding: {
      title: "Coding Skills",
      skills: [
        { name: "React/Next.js", level: 85, icon: Code },
        { name: "JavaScript/TypeScript", level: 90, icon: Code },
        { name: "HTML/CSS/Tailwind", level: 95, icon: Code },
        { name: "Node.js", level: 70, icon: Code },
        { name: "C# / VB.Net", level: 90, icon: Code },
        { name: "Python", level: 75, icon: Code },
        { name: "Flutter / Xamarin.Forms", level: 50, icon: Code },
        { name: "WPF-XAML", level: 85, icon: Code },
        { name: "PHP", level: 80, icon: Code },
        { name: "Java / C++", level: 75, icon: Code },
        { name: ".NET Framework", level: 65, icon: Code },
        { name: "Spring Boot", level: 60, icon: Code },
      ],
    },
    professional: {
      title: "Professional Skills",
      skills: [
        { name: "UI/UX Design (Figma, XD, Photoshop)", level: 90, icon: Brain },
        { name: "Microsoft 365 & Office Suite", level: 95, icon: Brain },
        { name: "VBA & Macros", level: 90, icon: Brain },
        { name: "Power BI", level: 88, icon: Brain },
        { name: "Power Apps", level: 85, icon: Brain },
        { name: "Power Automate", level: 85, icon: Brain },
        { name: "Project Management", level: 85, icon: Users },
        { name: "Team Leadership", level: 88, icon: Users },
      ],
    },
    general: {
      title: "General Skills",
      skills: [
        { name: "Communication", level: 92, icon: MessageSquare },
        { name: "Problem Solving", level: 88, icon: Puzzle },
        { name: "Critical Thinking", level: 90, icon: Lightbulb },
        { name: "Git & GitHub", level: 90, icon: GitBranch },
        { name: "Database (SQL, MySQL, SQLite)", level: 90, icon: Database },
        { name: "NoSQL (Firebase, MongoDB)", level: 85, icon: Database },
        { name: "Linux Basics", level: 40, icon: Terminal },
        { name: "Hardware & System Config", level: 80, icon: Cpu },
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

  return (
    <section id="skills" className="section bg-dark-300 dark:bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
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
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {skillCategories[activeTab].skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-200 dark:bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <skill.icon className="w-6 h-6 text-primary-500 mr-3" />
                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                  </div>

                  {/* Radial Progress */}
                  <div className="relative pt-2">
                    <div className="flex mb-2 items-center justify-between">
                      <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-500 bg-primary-500/20">
                        {skill.level}%
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-primary-500/20">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                      />
                    </div>
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
