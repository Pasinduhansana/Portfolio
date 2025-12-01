import { motion } from 'framer-motion';

const ModeSelector = ({ onSelectMode }) => {
  const modes = [
    { 
      name: 'Classic', 
      mode: 'classic', 
      icon: '🎨', 
      description: 'A modern, standard portfolio layout.',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      name: 'Terminal', 
      mode: 'terminal', 
      icon: '💻', 
      description: 'Interact via a command-line interface.',
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      name: 'Retro', 
      mode: 'retro', 
      icon: '💾', 
      description: 'Experience a retro desktop environment.',
      gradient: 'from-blue-500 to-cyan-500'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 bg-gray-800/80 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-gray-700 max-w-5xl w-11/12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
      >
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          Choose Your Experience
        </motion.h1>
        
        <p className="text-center text-gray-400 mb-12 text-lg">
          Select a mode to explore the portfolio in your preferred style
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {modes.map((mode, index) => (
            <motion.button
              key={mode.mode}
              className={`group relative p-8 rounded-2xl bg-gradient-to-br ${mode.gradient} bg-opacity-10 border-2 border-gray-700 hover:border-gray-500 transition-all duration-300 overflow-hidden`}
              onClick={() => onSelectMode(mode.mode)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.15, type: 'spring', stiffness: 120 }}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Gradient Overlay on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <motion.div 
                  className="text-6xl filter drop-shadow-lg"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {mode.icon}
                </motion.div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {mode.name}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed min-h-[60px]">
                    {mode.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className={`mt-4 px-6 py-2 rounded-full bg-gradient-to-r ${mode.gradient} text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  Enter →
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.p 
          className="text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          💡 Your selection will be saved for future visits
        </motion.p>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 text-gray-700 text-sm font-mono">
        v2.0.0
      </div>
      <div className="absolute bottom-10 right-10 text-gray-700 text-sm font-mono">
        Built with React + Tailwind
      </div>
    </motion.div>
  );
};

export default ModeSelector;
