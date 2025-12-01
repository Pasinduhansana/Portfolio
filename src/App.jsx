import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ModeSelector from './components/ModeSelector';
import ClassicShell from './components/ClassicShell';
import TerminalShell from './components/TerminalShell';
import RetroDesktop from './components/RetroDesktop';
import { portfolioData } from './data/portfolioData';

function App() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [showModeSelector, setShowModeSelector] = useState(true);

  useEffect(() => {
    // Check localStorage for saved mode preference
    const savedMode = localStorage.getItem('portfolioMode');
    if (savedMode) {
      setSelectedMode(savedMode);
      setShowModeSelector(false);
    }
  }, []);

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    setShowModeSelector(false);
    localStorage.setItem('portfolioMode', mode);
  };

  const handleModeChange = () => {
    setSelectedMode(null);
    setShowModeSelector(true);
    localStorage.removeItem('portfolioMode');
  };

  return (
    <div className="w-full min-h-screen">
      <AnimatePresence mode="wait">
        {showModeSelector && (
          <ModeSelector key="selector" onSelectMode={handleModeSelect} />
        )}
        
        {!showModeSelector && selectedMode === 'classic' && (
          <ClassicShell key="classic" portfolioData={portfolioData} />
        )}
        
        {!showModeSelector && selectedMode === 'terminal' && (
          <TerminalShell key="terminal" portfolioData={portfolioData} />
        )}
        
        {!showModeSelector && selectedMode === 'retro' && (
          <RetroDesktop 
            key="retro" 
            portfolioData={portfolioData} 
            onModeChange={handleModeChange}
            onSelectMode={handleModeSelect}
          />
        )}
      </AnimatePresence>

      {/* Mode Toggle Button (appears after mode selection) */}
      {!showModeSelector && (
        <button 
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 shadow-lg hover:shadow-2xl flex items-center justify-center text-2xl transform hover:scale-110 hover:rotate-180 transition-all duration-300 z-[9999]"
          onClick={handleModeChange} 
          title="Change Mode"
          aria-label="Change Mode"
        >
          🔄
        </button>
      )}
    </div>
  );
}

export default App;
