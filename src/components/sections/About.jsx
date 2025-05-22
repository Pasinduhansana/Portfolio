import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Palette, Brain, Users, Building, Award, Briefcase, GraduationCap, Book, Star, Calendar } from 'lucide-react';

const About = () => {
  const [skillsView, setSkillsView] = useState('professional');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const experience = [
    {
      year: '2023',
      role: 'Senior Frontend Developer',
      company: 'Tech Corp',
      icon: Building,
      description: 'Led development of enterprise web applications using React and Next.js',
      achievements: [
        'Led a team of 5 developers in delivering a major e-commerce platform',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
        'Architected and delivered microservices-based application structure',
        'Mentored junior developers and conducted code reviews',
        'Reduced application bundle size by 45% through code optimization'
      ]
    },
    {
      year: '2021-2023',
      role: 'Full Stack Developer',
      company: 'Digital Solutions Inc',
      icon: Briefcase,
      description: 'Developed and maintained full-stack applications using MERN stack',
      achievements: [
        'Built and deployed 10+ full-stack applications for various clients',
        'Implemented real-time features using WebSocket technology',
        'Reduced database query times by 70% through optimization',
        'Developed custom CMS solution for content management',
        'Integrated third-party APIs and payment gateways'
      ]
    },
    {
      year: '2019-2021',
      role: 'Web Developer',
      company: 'Creative Agency',
      icon: GraduationCap,
      description: 'Created responsive websites and e-commerce solutions',
      achievements: [
        'Developed 20+ responsive websites for clients across industries',
        'Implemented SEO best practices improving client rankings by 40%',
        'Created reusable component library reducing development time',
        'Optimized website performance achieving 95+ PageSpeed scores',
        'Integrated e-commerce solutions with multiple payment gateways'
      ]
    },
  ];

  const education = [
    {
      year: '2018-2020',
      degree: 'Master of Computer Science',
      institution: 'Tech University',
      location: 'New York, USA',
      gpa: '3.9/4.0',
      highlights: [
        'Specialized in Web Technologies and Cloud Computing',
        'Published research paper on Progressive Web Applications',
        'Led student development team for university portal redesign',
        'Received Outstanding Academic Achievement Award',
        'Teaching Assistant for Advanced Web Development course'
      ]
    },
    {
      year: '2014-2018',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'State University',
      location: 'California, USA',
      gpa: '3.8/4.0',
      highlights: [
        'Dean\'s List all semesters',
        'Completed honors thesis on React performance optimization',
        'Founded university\'s first Web Development Club',
        'Won first place in Annual Hackathon',
        'Internship at leading tech company'
      ]
    }
  ];

  const professionalSkills = [
    { name: 'UI/UX Design', level: 90, icon: Palette },
    { name: 'Project Management', level: 85, icon: Brain },
    { name: 'Team Leadership', level: 88, icon: Users },
  ];

  const codingSkills = [
    { name: 'JavaScript/TypeScript', level: 95, icon: Code },
    { name: 'React/Next.js', level: 92, icon: Code },
    { name: 'Node.js', level: 88, icon: Code },
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
    <section id="about" className="section bg-gradient-to-b from-dark-300 to-dark-400 dark:from-gray-100 dark:to-white">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="section-title text-center mb-16">About Me</h2>

          {/* Professional Journey */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold mb-8 text-center">Professional Journey</h3>
            <div className="relative">
              {/* Timeline line with gradient */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>

              {/* Experience items */}
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`w-5/12 ${
                      index % 2 === 0 ? 'text-right pr-8' : 'pl-8'
                    }`}
                  >
                    <motion.div
                      className="bg-dark-200 dark:bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10 dark:border-gray-200/10"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <exp.icon className="w-6 h-6 text-primary-500" />
                        <span className="text-primary-500 font-semibold">{exp.year}</span>
                      </div>
                      <h4 className="text-xl font-bold">{exp.role}</h4>
                      <p className="text-gray-400 dark:text-gray-600 mb-4">{exp.company}</p>
                      <p className="mb-4">{exp.description}</p>
                      
                      {/* Key Achievements */}
                      <div className="space-y-2">
                        <h5 className="font-semibold text-primary-500 mb-2">Key Achievements:</h5>
                        {exp.achievements.map((achievement, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2"
                          >
                            <Award className="w-4 h-4 text-accent-500 mt-1 flex-shrink-0" />
                            <p className="text-sm text-gray-400 dark:text-gray-600">{achievement}</p>
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
                    className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-2 border-white dark:border-gray-100"
                  >
                    <div className="absolute w-8 h-8 bg-primary-500/20 rounded-full -translate-x-2 -translate-y-2 animate-ping"></div>
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
                        <p className="text-gray-400 dark:text-gray-600">{edu.institution}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent-500" />
                      <span className="text-primary-500 font-semibold">{edu.year}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-400 dark:text-gray-600">GPA: {edu.gpa}</span>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-semibold text-primary-500 mb-2">Key Highlights:</h5>
                    {edu.highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <Award className="w-4 h-4 text-accent-500 mt-1 flex-shrink-0" />
                        <p className="text-sm text-gray-400 dark:text-gray-600">{highlight}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-20">
            <div className="flex justify-center mb-8">
              <div className="bg-dark-200 dark:bg-white rounded-full p-1 flex">
                <button
                  onClick={() => setSkillsView('professional')}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    skillsView === 'professional'
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-gray-900'
                  }`}
                >
                  Professional
                </button>
                <button
                  onClick={() => setSkillsView('coding')}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    skillsView === 'coding'
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-gray-900'
                  }`}
                >
                  Coding
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={skillsView}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {(skillsView === 'professional' ? professionalSkills : codingSkills).map(
                  (skill, index) => (
                    <div
                      key={skill.name}
                      className="bg-dark-200 dark:bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10 dark:border-gray-200/10"
                    >
                      <div className="flex items-center mb-4">
                        <skill.icon className="w-6 h-6 text-primary-500 mr-3" />
                        <h4 className="text-lg font-semibold">{skill.name}</h4>
                      </div>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-500 bg-primary-500/20">
                              {skill.level}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-primary-500/20">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Download CV Button */}
          <div className="text-center">
            <a
              href="/path-to-your-cv.pdf"
              download
              className="inline-block px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Download CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;