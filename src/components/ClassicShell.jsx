import { motion } from 'framer-motion';

const ClassicShell = ({ portfolioData }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen bg-gray-950 text-white"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to My Portfolio
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-3xl mb-12 text-gray-300"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Full Stack Developer | Creative Problem Solver
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <a 
              href="#projects" 
              className="px-10 py-4 bg-white text-purple-900 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project, index) => (
              <motion.div
                key={index}
                className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        🔗 Demo
                      </a>
                    )}
                    {project.repo && (
                      <a 
                        href={project.repo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        💻 Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Education
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-cyan-500"></div>
            
            <div className="space-y-12">
              {portfolioData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="relative flex gap-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Timeline Marker */}
                  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-3xl shadow-lg shadow-purple-500/50">
                    🎓
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-2xl font-bold mb-2 text-white">{edu.degree}</h3>
                    <p className="text-purple-400 font-semibold mb-1">{edu.institution}</p>
                    <p className="text-gray-500 text-sm mb-4 italic">{edu.year}</p>
                    <p className="text-gray-400 leading-relaxed">{edu.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Experience
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-cyan-500"></div>
            
            <div className="space-y-12">
              {portfolioData.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative flex gap-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Timeline Marker */}
                  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-3xl shadow-lg shadow-purple-500/50">
                    💼
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-2xl font-bold mb-2 text-white">{exp.title}</h3>
                    <p className="text-cyan-400 font-semibold mb-1">{exp.company}</p>
                    <p className="text-gray-500 text-sm mb-4 italic">{exp.period}</p>
                    <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-4">📧</div>
              <h3 className="text-xl font-bold mb-2 text-white">Email</h3>
              <p className="text-gray-400 break-all">{portfolioData.contact.email}</p>
            </motion.div>
            
            <motion.div
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-5xl mb-4">💻</div>
              <h3 className="text-xl font-bold mb-2 text-white">GitHub</h3>
              <a 
                href={portfolioData.contact.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                View Profile
              </a>
            </motion.div>
            
            <motion.div
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-xl font-bold mb-2 text-white">LinkedIn</h3>
              <a 
                href={portfolioData.contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Connect
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black border-t border-gray-800">
        <p className="text-center text-gray-500">
          &copy; 2024 Portfolio. All rights reserved. Built with React + Tailwind CSS
        </p>
      </footer>
    </motion.div>
  );
};

export default ClassicShell;
