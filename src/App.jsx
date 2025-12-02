import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TerminalShell from './components/TerminalShell';
import RetroDesktop from './components/RetroDesktop';
import { portfolioData } from './data/portfolioData';

function App() {
  const [currentMode, setCurrentMode] = useState('retro');
  const [openTerminalOnReturn, setOpenTerminalOnReturn] = useState(false);

  const handleSwitchToTerminal = () => {
    setCurrentMode('terminal');
    setOpenTerminalOnReturn(false);
  };

  const handleSwitchToRetro = (withTerminal = false) => {
    setCurrentMode('retro');
    setOpenTerminalOnReturn(withTerminal);
  };

  return (
    <div className="w-full min-h-screen">
      <AnimatePresence mode="wait">
        {currentMode === 'terminal' && (
          <TerminalShell 
            key="terminal" 
            portfolioData={portfolioData}
            onSwitchToRetro={handleSwitchToRetro}
          />
        )}
        
        {currentMode === 'retro' && (
          <RetroDesktop 
            key="retro" 
            portfolioData={portfolioData}
            onSwitchToTerminal={handleSwitchToTerminal}
            openTerminalWindow={openTerminalOnReturn}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
