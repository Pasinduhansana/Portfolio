import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Window from './Window';

const RetroDesktop = ({ portfolioData, onModeChange, onSelectMode }) => {
  const [stage, setStage] = useState('boot'); // boot, login, desktop
  const [bootProgress, setBootProgress] = useState(0);
  const [pinInput, setPinInput] = useState('');
  const [windows, setWindows] = useState([]);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [wallpaper, setWallpaper] = useState('bliss');
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAnyWindowDragging, setIsAnyWindowDragging] = useState(false);

  const wallpapers = {
    bliss: 'linear-gradient(to bottom, #87CEEB 0%, #98D8C8 50%, #6BCF7F 100%)',
    purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    sunset: 'linear-gradient(to bottom, #ff6b6b 0%, #feca57 50%, #48dbfb 100%)',
    matrix: 'linear-gradient(to bottom, #0f0f0f 0%, #1a1a1a 100%)',
    ocean: 'linear-gradient(to bottom, #2E3192 0%, #1BFFFF 100%)'
  };

  useEffect(() => {
    if (stage === 'boot') {
      const interval = setInterval(() => {
        setBootProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStage('login'), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [stage]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePinInput = (digit) => {
    if (pinInput.length < 6) {
      const newPin = pinInput + digit;
      setPinInput(newPin);
      if (newPin.length >= 4) {
        setTimeout(() => {
          setStage('desktop');
        }, 300);
      }
    }
  };

  const openWindow = (type, data = null) => {
    const newWindow = {
      id: Date.now(),
      type,
      data,
      zIndex: nextZIndex,
      position: { x: 100 + windows.length * 30, y: 80 + windows.length * 30 },
      size: type === 'browser' ? { width: 900, height: 600 } : { width: 700, height: 500 },
      isMinimized: false,
      isMaximized: false
    };
    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    setMinimizedWindows(prev => prev.filter(wId => wId !== id));
  };

  const minimizeWindow = (id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
    setMinimizedWindows(prev => [...prev, id]);
  };

  const restoreWindow = (id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: false, isMaximized: false } : w
    ));
    setMinimizedWindows(prev => prev.filter(wId => wId !== id));
    focusWindow(id);
  };

  const maximizeWindow = (id) => {
    // Special case for Terminal: Switch to Terminal Mode
    const windowToMaximize = windows.find(w => w.id === id);
    if (windowToMaximize && windowToMaximize.type === 'terminal') {
      onSelectMode('terminal');
      return;
    }

    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const focusWindow = (id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex } : w
    ));
    setNextZIndex(prev => prev + 1);
  };

  const desktopIcons = [
    { name: 'Projects', icon: '📁', action: () => openWindow('projects') },
    { name: 'Education', icon: '🎓', action: () => openWindow('education') },
    { name: 'Experience', icon: '💼', action: () => openWindow('experience') },
    { name: 'Contact', icon: '📧', action: () => openWindow('contact') },
    { name: 'Resume.pdf', icon: '📄', action: () => openWindow('resume') },
    { name: 'Skills', icon: '🛠️', action: () => openWindow('skills') },
    { name: 'Chrome', icon: '🌐', action: () => openWindow('browser') },
    { name: 'Terminal', icon: '💻', action: () => openWindow('terminal') }
  ];

  const startMenuItems = [
    { name: 'Chrome Browser', icon: '🌐', action: () => { openWindow('browser'); setShowStartMenu(false); } },
    { name: 'Terminal', icon: '💻', action: () => { openWindow('terminal'); setShowStartMenu(false); } },
    { name: 'Projects', icon: '📁', action: () => { openWindow('projects'); setShowStartMenu(false); } },
    { name: 'Education', icon: '🎓', action: () => { openWindow('education'); setShowStartMenu(false); } },
    { name: 'Experience', icon: '💼', action: () => { openWindow('experience'); setShowStartMenu(false); } },
    { name: 'Contact', icon: '📧', action: () => { openWindow('contact'); setShowStartMenu(false); } },
    { name: 'Skills', icon: '🛠️', action: () => { openWindow('skills'); setShowStartMenu(false); } },
    { name: 'Resume', icon: '📄', action: () => { openWindow('resume'); setShowStartMenu(false); } },
    { type: 'separator' },
    { name: 'Change Mode', icon: '🔄', action: () => { onModeChange(); setShowStartMenu(false); } },
    { name: 'Settings', icon: '⚙️', action: () => { openWindow('settings'); setShowStartMenu(false); } }
  ];

  if (stage === 'boot') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-screen bg-black flex items-center justify-center text-white font-mono"
      >
        <div className="text-center max-w-lg w-11/12">
          <div className="mb-16">
            <div className="text-6xl font-bold mb-4 text-shadow-lg">Portfolio OS</div>
            <div className="text-sm text-gray-500">Version 1.0</div>
          </div>
          
          <div className="mb-10">
            <div className="w-full h-6 bg-gray-800 border-2 border-gray-600 rounded overflow-hidden mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-green-400"
                initial={{ width: 0 }}
                animate={{ width: `${bootProgress}%` }}
              />
            </div>
            <div className="text-green-400 text-xl font-bold">{bootProgress}%</div>
          </div>
          
          <div className="text-left text-sm text-gray-400 space-y-2">
            <div className="opacity-80">Loading system files...</div>
            <div className="opacity-60">Initializing components...</div>
            <div className="opacity-40">Starting services...</div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (stage === 'login') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <motion.div
          className="relative z-10 bg-white/10 backdrop-blur-2xl p-12 rounded-3xl shadow-2xl border border-white/20 max-w-md w-11/12"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
        >
          {/* User Avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-5xl shadow-lg">
              👤
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white text-center mb-2">Welcome Back</h2>
          <p className="text-white/80 text-center mb-8">Guest User</p>
          
          {/* PIN Display */}
          <div className="flex justify-center gap-3 mb-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  i < pinInput.length 
                    ? 'bg-white scale-125 shadow-lg' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          
          {/* Keypad */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(digit => (
              <button
                key={digit}
                className="p-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white text-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 border border-white/20"
                onClick={() => handlePinInput(digit.toString())}
              >
                {digit}
              </button>
            ))}
            <button
              className="p-4 bg-red-500/30 hover:bg-red-500/40 backdrop-blur-sm rounded-xl text-white font-semibold transition-all duration-200 hover:scale-105 active:scale-95 border border-white/20"
              onClick={() => setPinInput('')}
            >
              Clear
            </button>
            <button
              className="p-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white text-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 border border-white/20"
              onClick={() => handlePinInput('0')}
            >
              0
            </button>
            <button
              className="p-4 bg-green-500/30 hover:bg-green-500/40 backdrop-blur-sm rounded-xl text-white font-semibold transition-all duration-200 hover:scale-105 active:scale-95 border border-white/20"
              onClick={() => pinInput.length >= 4 && setStage('desktop')}
            >
              Enter
            </button>
          </div>
          
          <p className="text-white/60 text-center text-sm">Enter any 4+ digit PIN to continue</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-screen relative overflow-hidden"
      style={{ background: wallpapers[wallpaper] }}
    >
      {/* Desktop Icons */}
      <div className="p-5 grid grid-cols-[repeat(auto-fill,100px)] gap-6 h-[calc(100vh-56px)] content-start">
        {desktopIcons.map((icon, index) => (
          <motion.div
            key={icon.name}
            className="flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer hover:bg-white/20 transition-all duration-200 select-none"
            onDoubleClick={icon.action}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-5xl drop-shadow-lg">{icon.icon}</div>
            <div className="text-sm font-medium text-white text-center drop-shadow-md max-w-full break-words">
              {icon.name}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.filter(w => !w.isMinimized).map(window => (
          <Window
            key={window.id}
            window={window}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            portfolioData={portfolioData}
            onDragStart={() => setIsAnyWindowDragging(true)}
            onDragEnd={() => setIsAnyWindowDragging(false)}
            isAnyWindowDragging={isAnyWindowDragging}
          />
        ))}
      </AnimatePresence>

      {/* Start Menu */}
      <AnimatePresence>
        {showStartMenu && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-14 left-2 w-80 bg-gray-900/95 backdrop-blur-xl rounded-lg shadow-2xl border border-gray-700 overflow-hidden z-[10001]"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <div className="text-white font-semibold">Guest User</div>
                  <div className="text-white/70 text-sm">Portfolio OS</div>
                </div>
              </div>
            </div>
            
            <div className="p-2 max-h-96 overflow-y-auto">
              {startMenuItems.map((item, index) => (
                item.type === 'separator' ? (
                  <div key={index} className="h-px bg-gray-700 my-2"></div>
                ) : (
                  <button
                    key={index}
                    className="w-full flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg transition-colors text-left"
                    onClick={item.action}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-white font-medium">{item.name}</span>
                  </button>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700 flex items-center px-2 gap-2 shadow-2xl z-[10000]">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200 font-semibold text-white shadow-lg"
          onClick={() => setShowStartMenu(!showStartMenu)}
        >
          <span className="text-xl">⊞</span>
          <span>Start</span>
        </button>
        
        <div className="flex-1 flex gap-1 overflow-x-auto">
          {windows.map(w => (
            <button
              key={w.id}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                w.isMinimized 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white font-medium`}
              onClick={() => w.isMinimized ? restoreWindow(w.id) : focusWindow(w.id)}
            >
              <span className="capitalize">{w.type === 'browser' ? 'Chrome' : w.type}</span>
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <select
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors cursor-pointer border border-gray-600"
            value={wallpaper}
            onChange={(e) => setWallpaper(e.target.value)}
            title="Change Wallpaper"
          >
            <option value="bliss">Bliss</option>
            <option value="purple">Purple</option>
            <option value="sunset">Sunset</option>
            <option value="matrix">Matrix</option>
            <option value="ocean">Ocean</option>
          </select>
          
          <div className="px-3 py-1 bg-gray-700 rounded-lg text-white font-mono text-sm border border-gray-600">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RetroDesktop;
