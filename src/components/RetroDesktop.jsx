import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Window from './Window';
import { AlertTriangle } from 'lucide-react';

const RetroDesktop = ({ portfolioData, onSwitchToTerminal, openTerminalWindow }) => {
  const [stage, setStage] = useState('boot'); // boot, login, desktop
  const [bootProgress, setBootProgress] = useState(0);
  const [pinInput, setPinInput] = useState('');
  const [windows, setWindows] = useState([]);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [wallpaper, setWallpaper] = useState('tech');
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAnyWindowDragging, setIsAnyWindowDragging] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [securityAlert, setSecurityAlert] = useState(false);
  const [userLocation, setUserLocation] = useState({ ip: 'UNKNOWN', city: 'UNKNOWN', country: 'UNKNOWN', isp: 'UNKNOWN' });
  const [securityAction, setSecurityAction] = useState('');

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => setUserLocation({
        ip: data.ip,
        city: data.city,
        country: data.country_name,
        isp: data.org
      }))
      .catch(() => console.log('Security location fetch failed'));
  }, []);

  const wallpapers = {
    tech: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f2818 100%)',
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
            setTimeout(() => setStage('login'), 800);
            return 100;
          }
          return prev + 0.15;
        });
      }, 10);
      return () => clearInterval(interval);
    }
  }, [stage]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (openTerminalWindow && stage === 'desktop') {
      openWindow('terminal');
    }
  }, [openTerminalWindow, stage]);

  const handlePinInput = (digit) => {
    if (pinInput.length < 6) {
      setPinInput(prev => prev + digit);
    }
  };

  const openWindow = (type, data = null) => {
    const id = Date.now();
    const newWindow = {
      id,
      type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      isMaximized: false,
      isMinimized: false,
      zIndex: nextZIndex,
      position: { x: 100 + (windows.length * 30), y: 50 + (windows.length * 30) },
      size: { width: 800, height: 600 },
      data: data // Pass data to window (e.g. folder content)
    };
    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const maximizeWindow = (id) => {
    // Special case for Terminal: Switch to Terminal Mode
    const windowToMaximize = windows.find(w => w.id === id);
    if (windowToMaximize && windowToMaximize.type === 'terminal' && onSwitchToTerminal) {
      onSwitchToTerminal();
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

  const minimizeWindow = (id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const restoreWindow = (id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w
    ));
    setNextZIndex(prev => prev + 1);
  };

  const handleSecurityViolation = (action) => {
    setSecurityAction(action || 'UNAUTHORIZED_ACCESS');
    setSecurityAlert(true);
    
    setTimeout(() => {
      setSecurityAlert(false);
      if (onSwitchToTerminal) {
        onSwitchToTerminal();
        window.dispatchEvent(new CustomEvent('security-violation', { detail: { action } }));
      }
    }, 4000);
  };

  const desktopIcons = [
    { name: 'Projects', icon: '📁', type: 'folder', action: () => openWindow('explorer', { name: 'Projects' }) },
    { name: 'Education', icon: '🎓', type: 'folder', action: () => openWindow('education') },
    { name: 'Experience', icon: '💼', type: 'folder', action: () => openWindow('experience') },
    { name: 'Contact', icon: '📧', type: 'folder', action: () => openWindow('contact') },
    { name: 'Resume.pdf', icon: '📄', type: 'file', action: () => openWindow('resume') },
    { name: 'Skills', icon: '🛠️', type: 'folder', action: () => openWindow('skills') },
    { name: 'Chrome', icon: '🌐', type: 'app', action: () => openWindow('browser') },
    { name: 'Terminal', icon: '💻', type: 'app', action: () => openWindow('terminal') }
  ];

  const handleContextMenu = (e, icon = null) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      icon: icon
    });
    if (icon) {
      setSelectedIcon(icon.name);
    }
  };

  const handleDesktopClick = () => {
    setContextMenu(null);
    setSelectedIcon(null);
  };

  const getContextMenuItems = (icon) => {
    if (!icon) {
      // Desktop context menu
      return [
        { label: 'Refresh', icon: '🔄', action: () => window.location.reload() },
        { label: 'New Folder', icon: '📁', action: () => handleSecurityViolation('create_folder') },
        { type: 'separator' },
        { label: 'Personalize', icon: '🎨', action: () => openWindow('settings') }
      ];
    }
    
    // Icon context menu
    const items = [
      { label: 'Open', icon: '📂', action: () => { icon.action(); setContextMenu(null); } }
    ];
    
    if (icon.type === 'folder') {
      items.push(
        { label: 'Open in Explorer', icon: '🗂️', action: () => { openWindow('explorer', icon); setContextMenu(null); } }
      );
    }
    
    items.push(
      { type: 'separator' },
      { label: 'Properties', icon: 'ℹ️', action: () => { openWindow('properties', icon); setContextMenu(null); } },
      { label: 'Delete', icon: '🗑️', action: () => { handleSecurityViolation('delete_file'); setContextMenu(null); } }
    );
    
    return items;
  };

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
    { name: 'Settings', icon: '⚙️', action: () => { openWindow('settings'); setShowStartMenu(false); } }
  ];

  if (stage === 'boot') {
    const bootMessages = [
      { text: '> Initializing Portfolio OS...', delay: 0 },
      { text: '> Loading system files...', delay: 0.3 },
      { text: '> Checking system integrity...', delay: 0.6 },
      { text: '> Mounting file systems...', delay: 0.9 },
      { text: '> Starting core services...', delay: 1.2 },
      { text: '> Initializing network protocols...', delay: 1.5 },
      { text: '> Loading user interface components...', delay: 1.8 },
      { text: '> Preparing desktop environment...', delay: 2.1 },
      { text: '> System ready!', delay: 2.4, isLast: true }
    ];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-screen bg-black flex items-center justify-center text-white font-mono overflow-hidden"
      >
        <div className="text-center max-w-2xl w-11/12">
          <div className="mb-16">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-6xl font-bold mb-4 text-green-400 drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]"
            >
              Portfolio OS
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-gray-500"
            >
              Version 1.0
            </motion.div>
          </div>
          
          <div className="mb-10">
            <div className="w-full h-6 bg-gray-800 border-2 border-gray-600 rounded overflow-hidden mb-3 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-green-600 via-green-500 to-green-400"
                initial={{ width: 0 }}
                animate={{ width: `${bootProgress}%` }}
                transition={{ duration: 0.3 }}
              />
              {/* Animated scanning line */}
              {bootProgress < 100 && (
                <motion.div
                  className="absolute inset-y-0 w-1 bg-green-300 shadow-[0_0_10px_rgba(134,239,172,0.8)]"
                  animate={{ left: ['0%', '100%'] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              )}
            </div>
            <div className="text-green-400 text-xl font-bold">{bootProgress}%</div>
          </div>
          
          {/* Scrolling/Growing Boot Messages */}
          <div className="text-left text-sm space-y-1 max-h-64 overflow-hidden">
            {bootMessages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ 
                  opacity: bootProgress >= (index * 11) ? 1 : 0.3,
                  x: bootProgress >= (index * 11) ? 0 : -20,
                  height: 'auto'
                }}
                transition={{ 
                  delay: msg.delay,
                  duration: 0.4,
                  ease: "easeOut"
                }}
                className={`overflow-hidden ${
                  msg.isLast 
                    ? 'text-green-400 font-bold' 
                    : bootProgress >= (index * 11) 
                      ? 'text-green-400/80' 
                      : 'text-gray-600'
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
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
        className="w-full h-screen bg-black flex items-center justify-center text-white font-mono"
      >
        <div className="max-w-2xl w-11/12">
          {/* Header */}
          <div className="mb-8 border-2 border-green-500 bg-gray-900 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-green-400 text-sm">PORTFOLIO OS v1.0</div>
              <div className="text-green-400 text-sm">{new Date().toLocaleTimeString()}</div>
            </div>
            <div className="text-gray-500 text-xs">System ready. Awaiting authentication...</div>
          </div>

          {/* Login Box */}
          <div className="border-2 border-gray-600 bg-gray-900 p-6">
            {/* User Info */}
            <div className="mb-6 pb-4 border-b border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 border-2 border-green-500 bg-black flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <div className="text-green-400 text-sm font-bold">GUEST USER</div>
                  <div className="text-gray-500 text-xs">guest@portfolio.local</div>
                </div>
              </div>
            </div>

            {/* PIN Entry */}
            <div className="mb-6">
              <div className="text-gray-400 text-xs mb-3">ENTER AUTHENTICATION CODE:</div>
              
              {/* PIN Display - Terminal Style */}
              <div className="bg-black border border-gray-700 p-3 mb-4 font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">PIN &gt;</span>
                  <div className="flex gap-1">
                    {[...Array(6)].map((_, i) => (
                      <span
                        key={i}
                        className={`${
                          i < pinInput.length 
                            ? 'text-green-400' 
                            : 'text-gray-700'
                        }`}
                      >
                        {i < pinInput.length ? '█' : '▯'}
                      </span>
                    ))}
                  </div>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-green-400"
                  >
                    ▊
                  </motion.span>
                </div>
              </div>

              {/* Keypad - Terminal Style */}
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(digit => (
                  <button
                    key={digit}
                    className="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-green-500 p-3 text-green-400 font-bold transition-all duration-200 hover:shadow-lg hover:shadow-green-500/20"
                    onClick={() => handlePinInput(digit.toString())}
                  >
                    {digit}
                  </button>
                ))}
                <button
                  className="bg-gray-800 hover:bg-red-900 border border-gray-600 hover:border-red-500 p-3 text-red-400 text-xs font-bold transition-all duration-200"
                  onClick={() => setPinInput('')}
                >
                  CLR
                </button>
                <button
                  className="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-green-500 p-3 text-green-400 font-bold transition-all duration-200"
                  onClick={() => handlePinInput('0')}
                >
                  0
                </button>
                <button
                  className="bg-gray-800 hover:bg-green-900 border border-gray-600 hover:border-green-500 p-3 text-green-400 text-xs font-bold transition-all duration-200"
                  onClick={() => pinInput.length >= 4 && setStage('desktop')}
                >
                  ENTER
                </button>
              </div>
            </div>

            {/* Status Messages */}
            <div className="border-t border-gray-700 pt-4">
              <div className="text-gray-500 text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">●</span>
                  <span>System Status: ONLINE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">●</span>
                  <span>Security: ENABLED</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">⚠</span>
                  <span>Minimum 4 digits required for access</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 text-center text-gray-600 text-xs">
            <div>Press any key to wake system | ESC to cancel</div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-screen relative overflow-hidden font-mono"
      style={{ background: wallpapers[wallpaper] }}
      onContextMenu={(e) => handleContextMenu(e)}
      onClick={handleDesktopClick}
    >
      {/* Matrix/Tech Background Effect */}
      {(wallpaper === 'tech' || wallpaper === 'matrix') && (
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(34, 197, 94, .3) 25%, rgba(34, 197, 94, .3) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, .3) 75%, rgba(34, 197, 94, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(34, 197, 94, .3) 25%, rgba(34, 197, 94, .3) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, .3) 75%, rgba(34, 197, 94, .3) 76%, transparent 77%, transparent)',
               backgroundSize: '50px 50px'
             }}
        />
      )}

      {/* Security Alert Overlay */}
      {/* Security Alert Overlay */}
      <AnimatePresence>
        {securityAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center font-mono"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-red-500/50 p-1 max-w-lg w-full shadow-[0_0_50px_rgba(239,68,68,0.5)] rounded-lg overflow-hidden"
            >
              <div className="bg-red-500/10 p-6 relative overflow-hidden">
                {/* Scanning Line Animation */}
                <motion.div 
                  className="absolute top-0 left-0 w-full h-1 bg-red-500/50"
                  animate={{ top: ['0%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/50 animate-pulse">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-red-500 tracking-wider">SECURITY VIOLATION DETECTED</h2>
                    <p className="text-red-400/80 text-xs mt-1">SYSTEM INTEGRITY COMPROMISED</p>
                  </div>
                </div>

                <div className="space-y-3 bg-black/40 p-4 rounded border border-red-500/20">
                  <div className="grid grid-cols-[100px_1fr] gap-2 text-xs">
                    <span className="text-red-400/60">THREAT TYPE:</span>
                    <span className="text-red-400 font-bold">{securityAction}</span>
                    
                    <span className="text-red-400/60">SOURCE IP:</span>
                    <span className="text-red-400 font-mono">{userLocation.ip}</span>
                    
                    <span className="text-red-400/60">LOCATION:</span>
                    <span className="text-red-400">{userLocation.city}, {userLocation.country}</span>
                    
                    <span className="text-red-400/60">ISP:</span>
                    <span className="text-red-400">{userLocation.isp}</span>

                    <span className="text-red-400/60">TIMESTAMP:</span>
                    <span className="text-red-400">{new Date().toISOString()}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="text-[10px] text-red-500/60 animate-pulse">
                    initiating_lockdown_sequence...
                  </div>
                  <div className="text-xs text-red-500 font-bold border border-red-500 px-2 py-1 rounded">
                    ACCESS DENIED
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Widgets */}
      <div className="absolute top-4 right-4 space-y-4 z-20 pointer-events-auto">
        {/* Clock Widget */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-black/40 backdrop-blur-xl border-2 border-green-500/30 rounded-2xl p-4 min-w-[200px] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          <div className="text-green-400 text-xs font-mono mb-2">SYSTEM TIME</div>
          <div className="text-white text-2xl font-bold font-mono">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-gray-400 text-xs font-mono mt-1">
            {currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </motion.div>

        {/* System Info Widget */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-black/40 backdrop-blur-xl border-2 border-green-500/30 rounded-2xl p-4 min-w-[200px] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          <div className="text-green-400 text-xs font-mono mb-3">SYSTEM STATUS</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400 font-mono">CPU</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: '45%' }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
                </div>
                <span className="text-green-400 font-mono">45%</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400 font-mono">RAM</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: '62%' }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  />
                </div>
                <span className="text-green-400 font-mono">62%</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400 font-mono">DISK</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: '38%' }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                  />
                </div>
                <span className="text-green-400 font-mono">38%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Widget */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-black/40 backdrop-blur-xl border-2 border-green-500/30 rounded-2xl p-4 min-w-[200px] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          <div className="text-green-400 text-xs font-mono mb-3">QUICK STATS</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs font-mono">Projects</span>
              <span className="text-white text-lg font-bold font-mono">{portfolioData.projects.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs font-mono">Skills</span>
              <span className="text-white text-lg font-bold font-mono">
                {portfolioData.skills.coding.length + portfolioData.skills.professional.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs font-mono">Experience</span>
              <span className="text-white text-lg font-bold font-mono">2+ yrs</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Desktop Icons */}
      <div className="p-4 grid grid-cols-[repeat(auto-fill,90px)] gap-4 h-[calc(100vh-56px)] content-start relative z-10">
        {desktopIcons.map((icon, index) => (
          <motion.div
            key={icon.name}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer transition-all duration-300 select-none backdrop-blur-sm ${
              selectedIcon === icon.name 
                ? 'bg-green-500/30 border-2 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.5)]' 
                : 'bg-black/20 border-2 border-white/10 hover:bg-green-900/20 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]'
            }`}
            onDoubleClick={icon.action}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIcon(icon.name);
            }}
            onContextMenu={(e) => {
              e.stopPropagation();
              handleContextMenu(e, icon);
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`text-4xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] transition-all duration-300 ${
              selectedIcon === icon.name ? 'filter-none' : ''
            }`}>
              {icon.icon}
            </div>
            <div className={`text-xs font-semibold text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] max-w-full break-words leading-tight ${
              selectedIcon === icon.name ? 'text-green-300' : 'text-white'
            }`}>
              {icon.name}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bg-gray-900/95 backdrop-blur-xl border border-green-500/30 rounded-lg shadow-2xl py-1 min-w-[200px] z-[10002]"
            style={{ left: contextMenu.x, top: contextMenu.y }}
            onClick={(e) => e.stopPropagation()}
          >
            {getContextMenuItems(contextMenu.icon).map((item, index) => (
              item.type === 'separator' ? (
                <div key={index} className="h-px bg-gray-700 my-1"></div>
              ) : (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-green-900/30 text-gray-300 hover:text-green-400 text-sm transition-colors text-left"
                  onClick={item.action}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 left-4 w-[600px] h-[500px] bg-black/90 backdrop-blur-2xl rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-green-500/30 overflow-hidden z-[10001] flex flex-col"
          >
            {/* Start Menu Header */}
            <div className="p-6 bg-gradient-to-r from-green-900/20 to-black border-b border-green-500/20 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                👨‍💻
              </div>
              <div>
                <div className="text-white font-bold text-lg tracking-wide">SYSTEM ADMIN</div>
                <div className="text-green-400 text-xs font-mono">ACCESS LEVEL: UNRESTRICTED</div>
              </div>
              <button 
                className="ml-auto p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                title="Power Off"
                onClick={() => window.location.reload()}
              >
                ⏻
              </button>
            </div>
            
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar / Pinned */}
              <div className="w-1/3 bg-white/5 border-r border-white/5 p-2 space-y-1">
                <div className="text-xs font-bold text-gray-500 px-3 py-2 mb-1">PINNED</div>
                {startMenuItems.filter((_, i) => i < 5).map((item, index) => (
                  item.type !== 'separator' && (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg transition-all group text-left"
                      onClick={item.action}
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                      <span className="text-gray-300 group-hover:text-white text-sm font-medium">{item.name}</span>
                    </button>
                  )
                ))}
              </div>

              {/* All Apps Grid */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="text-xs font-bold text-gray-500 mb-4">ALL APPLICATIONS</div>
                <div className="grid grid-cols-3 gap-4">
                  {startMenuItems.map((item, index) => (
                    item.type !== 'separator' && (
                      <button
                        key={index}
                        className="flex flex-col items-center gap-2 p-3 hover:bg-white/5 rounded-xl transition-all group hover:shadow-lg border border-transparent hover:border-white/10"
                        onClick={item.action}
                      >
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-lg group-hover:bg-green-500/20 group-hover:text-green-400 transition-colors text-xl shadow-inner">
                          {item.icon}
                        </div>
                        <span className="text-gray-400 group-hover:text-white text-xs text-center font-medium truncate w-full">
                          {item.name}
                        </span>
                      </button>
                    )
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/80 backdrop-blur-xl border-t border-white/10 flex items-center px-4 gap-4 shadow-2xl z-[10000]">
        <button
          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
            showStartMenu 
              ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.6)]' 
              : 'hover:bg-white/10 text-white hover:text-green-400'
          }`}
          onClick={() => setShowStartMenu(!showStartMenu)}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M4 4h16v16H4V4zm2 2v12h12V6H6z" fillOpacity="0.5"/>
            <path d="M8 8h8v8H8V8z"/>
          </svg>
        </button>
        
        <div className="h-6 w-px bg-white/10 mx-2"></div>

        <div className="flex-1 flex gap-2 overflow-x-auto items-center">
          {windows.map(w => (
            <button
              key={w.id}
              className={`group relative px-4 py-1.5 rounded-md transition-all duration-200 flex items-center gap-2 min-w-[140px] max-w-[200px] ${
                !w.isMinimized 
                  ? 'bg-white/10 border-b-2 border-green-500' 
                  : 'hover:bg-white/5 border-b-2 border-transparent hover:border-white/20'
              }`}
              onClick={() => w.isMinimized ? restoreWindow(w.id) : focusWindow(w.id)}
            >
              <span className="text-lg opacity-80 group-hover:opacity-100">
                {w.type === 'projects' && '📁'}
                {w.type === 'education' && '🎓'}
                {w.type === 'experience' && '💼'}
                {w.type === 'contact' && '📧'}
                {w.type === 'resume' && '📄'}
                {w.type === 'skills' && '🛠️'}
                {w.type === 'settings' && '⚙️'}
                {w.type === 'browser' && '🌐'}
                {w.type === 'terminal' && '💻'}
                {w.type === 'explorer' && '📂'}
                {w.type === 'properties' && 'ℹ️'}
              </span>
              <span className={`text-xs font-medium truncate ${!w.isMinimized ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                {w.title}
              </span>
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4 pl-4 border-l border-white/10">
          <select
            className="bg-transparent text-xs text-gray-400 hover:text-white focus:outline-none cursor-pointer text-right appearance-none"
            value={wallpaper}
            onChange={(e) => setWallpaper(e.target.value)}
            title="Change Wallpaper"
          >
            <option value="tech">THEME: TECH</option>
            <option value="bliss">THEME: RETRO</option>
            <option value="purple">THEME: SYNTH</option>
            <option value="matrix">THEME: MATRIX</option>
          </select>
          
          <div className="flex flex-col items-end">
            <div className="text-white text-xs font-bold font-mono">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-green-500 text-[10px] font-mono">
              {currentTime.toLocaleDateString([], { month: 'short', day: 'numeric' })}
            </div>
          </div>
          
          <button 
            className="w-1 h-full hover:bg-white/20 ml-2"
            onClick={() => {
              setWindows(prev => prev.map(w => ({ ...w, isMinimized: true })));
            }}
            title="Show Desktop"
          ></button>
        </div>
      </div>
    </motion.div>
  );
};

export default RetroDesktop;
