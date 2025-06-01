import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Code,
  Palette,
  Brain,
  Users,
  Building,
  Award,
  Briefcase,
  GraduationCap,
  Book,
  Star,
  Calendar,
} from "lucide-react";

const About = () => {
  const [skillsView, setSkillsView] = useState("professional");
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const experience = [
    {
      year: "2022-Currrent",
      role: "Executive - Supply Chain Analayst",
      company: "InQube Global pvt.ltd",
      icon: Building,
      description:
        "Involved in process automation and supply chain analytics, focusing on data-driven decision-making and operational efficiency.",
      achievements: [
        "Spearheaded process automation initiatives across the supply chain using Macro/Power Automate/Python and VB.NET, reducing manual workload and enhancing operational efficiency.",
        "Designed and deployed cloud-based tracking analysis tools to streamline supply chain workflows, with a focus on data-driven decision-making and real-time visibility",
        "Designed real-time dashboards to visualize supply chain KPIs such as inventory turnover, order accuracy, and fulfillment rate",
        "Monitoring the supplier performance and Inventory D2D Control",
        "Identified inefficiencies and implemented workflow optimizations to improve supply chain performance.",
        "Collaborated with cross-functional teams to gather requirements and deliver tailored solutions.",
        "Conducted training sessions for end-users to ensure smooth adoption of new tools and processes.",
        "Shipments follow-up and Ensuring the material availability and on-time delivery",
        "Monitoring supplier payment flows , ensuring timely and accurate transactions, identifying any delays or discrepancies, and supplier relationships",
      ],
    },
    {
      year: "2024 - Part time",
      role: "Full Stack Developer",
      company: "WebMinds",
      icon: Briefcase,
      description: "Developed and maintained full-stack web Applications",
      achievements: [
        "Built and deployed 10+ full-stack applications & web sites for various clients",
        "Implemented RESTful APIs using Node.js and Express",
        "Designed and developed modern user-friendly interfaces with React",
        "Implemented real-time features using WebSocket technology",
        "Worked with cloud services (AWS, Azure) for deployment",
        "Participated in Agile development process and sprint planning",
        "Integrated third-party APIs and payment gateways",
        "Created unit tests and performed debugging",
        "Participated in client meetings to gather requirements",
        "Provided technical support and troubleshooting",
        "Conducted performance testing and optimization",
      ],
    },
    {
      year: "Part time",
      role: "Freelance software Developer and Designer",
      company: "Freelance",
      icon: Palette,
      description:
        "Designed and developed websites,softwares and UI for various clients",
      achievements: [
        "Designed user interfaces and user experiences for web applications",
        "Collaborated with clients to gather requirements and feedback",
        "Utilized Figma and Adobe XD for UI/UX design",
        "Implemented front-end frameworks like Bootstrap and Tailwind CSS",
        "Managed project timelines and delivered on schedule",
        "Developed responsive designs for various devices",
      ],
    },
  ];

  const education = [
    {
      year: "2022-2026",
      degree:
        "BSc (Hons) in Information Technology Specialising in information technology",
      institution: "Sri Lanka Institute of Information Technology - SLIIT",
      location: "Malabe, Sri Lanka",
      gpa: "3.9/4.0",
      highlights: [
        "Completed coursework in software engineering, web development, and database management",
        "Worked on group projects involving full-stack development",
        "Conducting research on emerging technologies in IT",
        "Engaged in extracurricular activities and student organizations",
        "Built and deployed multiple real-world web applications using React and Firebase",
        "Actively mentored peers in coding best practices and project development",
        "Participated in workshops on cloud computing and DevOps practices",
        "Contributed to open-source projects and community initiatives",
      ],
    },
    {
      year: "2025-2026",
      degree: "CIMA Certificate in Business Accounting (CIMA CERT.)",
      institution: "Wisdom Business Academy",
      location: "Colombo, Sri Lanka",
      highlights: [
        "Reading CIMA Certificate in Business Accounting",
        "Gained knowledge in financial management and accounting principles",
        "Participated in workshops on business strategy and analysis",
        "Achieved high distinction in all subjects",
        "Engaged in case studies and real-world business scenarios",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="about"
      className="section bg-gradient-to-b  from-dark-300 to-dark-400 dark:from-gray-50 dark:to-gray-50"
    >
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="section-title text-center mb-16">About Me</h2>

          {/* Professional Journey */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold mb-8 text-center">
              Professional Journey
            </h3>
            <div className="relative">
              {/* Timeline line with gradient */}
              <div className="absolute left-0 lg:left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>

              {/* Experience items */}
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className={`relative flex items-center mb-6 overflow-hidden ${
                    index % 2 === 0 ? "md:justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={` ${
                      index % 2 === 0
                        ? "pl-5 md:text-right md:pr-8"
                        : "pl-5 md:pl-8"
                    }`}
                  >
                    <motion.div
                      className="bg-dark-200 dark:bg-white p-6 rounded-xl w-full md:w-[430px] shadow-sm md:shadow-xl md:hover:shadow-2xl text-left transition-all duration-300 border border-white/10 dark:border-gray-200/10"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <exp.icon className="w-6 h-6 text-primary-500" />
                        <span className="text-primary-500 font-semibold">
                          {exp.year}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold ">{exp.role}</h4>
                      <p className="text-gray-400 dark:text-gray-600 mb-4 ">
                        {exp.company}
                      </p>
                      <p className="mb-4 text-[15px]">{exp.description}</p>

                      {/* Key Achievements */}
                      <div className="space-y-2">
                        <h5 className="font-semibold text-primary-500 mb-2">
                          Key Achievements:
                        </h5>
                        {exp.achievements.map((achievement, i) => (
                          <motion.div
                            key={i}
                            initial={{
                              opacity: 0,
                              x: index % 2 === 0 ? 20 : -20,
                            }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2"
                          >
                            <Award className="w-4 h-4 text-accent-500 mt-1 flex-shrink-0" />
                            <p className="text-sm text-gray-400 dark:text-gray-600">
                              {achievement}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Timeline node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.2 }}
                    className="absolute z-50 left-0 lg:left-1/2 transform md:-translate-x-1/2 -ml-[8px]  w-4 h-4 bg-primary-500 rounded-full border-2 border-white dark:border-gray-100"
                  >
                    <div className="absolute w-8 h-8  bg-primary-500/20 rounded-full -translate-x-2  -translate-y-2 animate-ping"></div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold mb-8 text-center">Education</h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-dark-200 dark:bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10 dark:border-gray-200/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Book className="w-6 h-6 text-primary-500" />
                      <div>
                        <h4 className="text-xl font-bold">{edu.degree}</h4>
                        <p className="text-gray-400 dark:text-gray-600">
                          {edu.institution}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent-500" />
                      <span className="text-primary-500 font-semibold">
                        {edu.year}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-400 dark:text-gray-600">
                      Reading
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-semibold text-primary-500 mb-2">
                      Key Highlights:
                    </h5>
                    {edu.highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <Award className="w-4 h-4 text-accent-500 mt-1 flex-shrink-0" />
                        <p className="text-sm text-gray-400 dark:text-gray-600">
                          {highlight}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
