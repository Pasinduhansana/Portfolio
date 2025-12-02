import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TerminalShell = ({ portfolioData, onSwitchToRetro, isEmbedded = false }) => {
  const [history, setHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState('matrix'); // matrix, hacker, retro, modern
  const [username, setUsername] = useState('guest');
  const [isTyping, setIsTyping] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const themes = {
    matrix: {
      bg: 'bg-black',
      text: 'text-green-400',
      prompt: 'text-green-500',
      error: 'text-red-400',
      header: 'bg-gray-900 border-green-500',
      accent: 'text-green-300'
    },
    hacker: {
      bg: 'bg-gray-950',
      text: 'text-cyan-400',
      prompt: 'text-cyan-500',
      error: 'text-red-500',
      header: 'bg-gray-900 border-cyan-500',
      accent: 'text-cyan-300'
    },
    retro: {
      bg: 'bg-amber-950',
      text: 'text-amber-400',
      prompt: 'text-amber-500',
      error: 'text-red-400',
      header: 'bg-amber-900 border-amber-500',
      accent: 'text-amber-300'
    },
    modern: {
      bg: 'bg-slate-900',
      text: 'text-slate-200',
      prompt: 'text-blue-400',
      error: 'text-rose-400',
      header: 'bg-slate-800 border-blue-500',
      accent: 'text-blue-300'
    }
  };

  const currentTheme = themes[theme];

  const typeWriter = async (text, callback) => {
    setIsTyping(true);
    const words = text.split(' ');
    let output = '';
    
    for (let word of words) {
      output += word + ' ';
      callback(output.trim());
      await new Promise(resolve => setTimeout(resolve, 30));
    }
    setIsTyping(false);
  };

  const commands = {
    help: () => ({
      output: `╔════════════════════════════════════════════════════════════╗
║                    AVAILABLE COMMANDS                      ║
╚════════════════════════════════════════════════════════════╝

NAVIGATION:
  list, ls              - Show all available sections
  open <section>        - Open a section (projects/education/experience/contact)
  project <id>          - View detailed project information
  cd <section>          - Navigate to a section
  cd desktop            - Return to desktop/Windows mode
  
INFORMATION:
  whoami                - Display current user
  about                 - About this portfolio
  skills                - List technical skills
  achievements          - Show achievements and certifications
  
CUSTOMIZATION:
  theme <name>          - Change terminal theme (matrix/hacker/retro/modern)
  username <name>       - Change username
  banner                - Display welcome banner
  
UTILITIES:
  clear, cls            - Clear terminal screen
  history               - Show command history
  date                  - Display current date and time
  echo <text>           - Print text to terminal
  cowsay <text>         - ASCII art message
  matrix                - Run matrix rain animation
  
SYSTEM:
  help                  - Show this help message

Type any command to get started!`,
      type: 'text'
    }),

    list: () => ({
      output: `📁 Available Sections:
  
  [1] projects       - View my portfolio projects
  [2] education      - Academic background
  [3] experience     - Work experience
  [4] contact        - Get in touch
  [5] skills         - Technical skills
  
Use 'open <section>' to view details`,
      type: 'text'
    }),

    ls: () => commands.list(),

    open: (args) => {
      const section = args[0]?.toLowerCase();
      if (!section) {
        return { output: '❌ Usage: open <section>\nTry: open projects', type: 'error' };
      }

      switch (section) {
        case 'projects':
          return {
            output: `╔════════════════════════════════════════════════════════════╗
║                         PROJECTS                           ║
╚════════════════════════════════════════════════════════════╝

${portfolioData.projects.map((p, i) => 
  `[${i}] ${p.title}
    📝 ${p.description}
    🛠️  Tech: ${p.tech.join(', ')}
    ${p.demo ? `🔗 Demo: ${p.demo}` : ''}
    ${p.repo ? `💻 Repo: ${p.repo}` : ''}
    
    Use 'project ${i}' for more details
`).join('\n')}`,
            type: 'text'
          };
        case 'education':
          return {
            output: `╔════════════════════════════════════════════════════════════╗
║                        EDUCATION                           ║
╚════════════════════════════════════════════════════════════╝

${portfolioData.education.map(e => 
  `🎓 ${e.degree}
   📍 ${e.institution}
   📅 ${e.year}
   📖 ${e.description}
`).join('\n')}`,
            type: 'text'
          };
        case 'experience':
          return {
            output: `╔════════════════════════════════════════════════════════════╗
║                       EXPERIENCE                           ║
╚════════════════════════════════════════════════════════════╝

${portfolioData.experience.map(e => 
  `💼 ${e.title}
   🏢 ${e.company}
   📅 ${e.period}
   📝 ${e.description}
`).join('\n')}`,
            type: 'text'
          };
        case 'contact':
          return {
            output: `╔════════════════════════════════════════════════════════════╗
║                        CONTACT ME                          ║
╚════════════════════════════════════════════════════════════╝

📧 Email:    ${portfolioData.contact.email}
💻 GitHub:   ${portfolioData.contact.github}
💼 LinkedIn: ${portfolioData.contact.linkedin}

Feel free to reach out!`,
            type: 'text'
          };
        case 'skills':
          return commands.skills();
        default:
          return { output: `❌ Section '${section}' not found.\nAvailable: projects, education, experience, contact, skills`, type: 'error' };
      }
    },

    cd: (args) => {
      const section = args[0]?.toLowerCase();
      if (section === 'desktop') {
        // Switch to retro desktop mode with terminal window open
        if (window.switchToRetro) {
          window.switchToRetro(true);
        }
        return { output: '🖥️ Switching to desktop mode...', type: 'text' };
      }
      return commands.open(args);
    },

    project: (args) => {
      const id = parseInt(args[0]);
      if (isNaN(id) || id < 0 || id >= portfolioData.projects.length) {
        return { output: `❌ Invalid project ID. Use 'open projects' to see available projects.`, type: 'error' };
      }
      const p = portfolioData.projects[id];
      return {
        output: `╔════════════════════════════════════════════════════════════╗
║  ${p.title.padEnd(58)}║
╚════════════════════════════════════════════════════════════╝

📝 DESCRIPTION:
   ${p.description}

🛠️  TECH STACK:
   ${p.tech.join(' • ')}

${p.features ? `✨ KEY FEATURES:
${p.features.map(f => `   • ${f}`).join('\n')}` : ''}

${p.demo ? `🔗 LIVE DEMO: ${p.demo}` : ''}
${p.repo ? `💻 REPOSITORY: ${p.repo}` : ''}`,
        type: 'text'
      };
    },

    whoami: () => ({
      output: `${username}@portfolio.dev`,
      type: 'text'
    }),

    about: () => ({
      output: `╔════════════════════════════════════════════════════════════╗
║                    ABOUT THIS PORTFOLIO                    ║
╚════════════════════════════════════════════════════════════╝

🚀 Multi-Mode Interactive Portfolio
📅 Version: 2.0.0
💻 Built with: React + Vite + Tailwind CSS
🎨 Modes: Classic, Terminal, Retro Desktop

This terminal interface provides a unique way to explore
my portfolio. Type 'help' to see all available commands.

Creator: Full Stack Developer
Focus: Modern Web Applications & User Experience`,
      type: 'text'
    }),

    skills: () => ({
      output: `╔════════════════════════════════════════════════════════════╗
║                     TECHNICAL SKILLS                       ║
╚════════════════════════════════════════════════════════════╝

💻 FRONTEND:
   React • Vue.js • Next.js • TypeScript • Tailwind CSS
   Framer Motion • Redux • Zustand

⚙️  BACKEND:
   Node.js • Express • MongoDB • PostgreSQL • Firebase
   REST APIs • GraphQL

🛠️  TOOLS & OTHERS:
   Git • Docker • AWS • Vite • Webpack • CI/CD
   Agile • Testing (Jest, Vitest)`,
      type: 'text'
    }),

    achievements: () => ({
      output: `╔════════════════════════════════════════════════════════════╗
║                      ACHIEVEMENTS                          ║
╚════════════════════════════════════════════════════════════╝

🏆 AWS Certified Solutions Architect
🏆 Full Stack Web Development Bootcamp Graduate
🏆 Multiple successful client projects delivered
🏆 Open source contributor
🏆 Tech blog writer with 10k+ readers`,
      type: 'text'
    }),

    theme: (args) => {
      const newTheme = args[0]?.toLowerCase();
      if (!newTheme) {
        return { 
          output: `Current theme: ${theme}\n\nAvailable themes:\n  • matrix  - Classic green on black\n  • hacker  - Cyan cyberpunk style\n  • retro   - Amber terminal vibes\n  • modern  - Sleek blue interface\n\nUsage: theme <name>`, 
          type: 'text' 
        };
      }
      if (themes[newTheme]) {
        setTheme(newTheme);
        return { output: `✓ Theme changed to '${newTheme}'`, type: 'text' };
      }
      return { output: `❌ Unknown theme. Available: matrix, hacker, retro, modern`, type: 'error' };
    },

    username: (args) => {
      const newUsername = args[0];
      if (!newUsername) {
        return { output: `Current username: ${username}\nUsage: username <name>`, type: 'text' };
      }
      setUsername(newUsername);
      return { output: `✓ Username changed to '${newUsername}'`, type: 'text' };
    },

    banner: () => ({
      output: `
  ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
  ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
  ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
  ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
  ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
  ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
  
  Welcome to the Interactive Terminal Portfolio!
  Type 'help' to see available commands.
`,
      type: 'text'
    }),

    clear: () => {
      setHistory([]);
      return null;
    },

    cls: () => commands.clear(),

    history: () => ({
      output: commandHistory.length > 0 
        ? commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('\n')
        : 'No command history yet.',
      type: 'text'
    }),

    date: () => ({
      output: new Date().toLocaleString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      type: 'text'
    }),

    echo: (args) => ({
      output: args.join(' '),
      type: 'text'
    }),

    cowsay: (args) => {
      const message = args.join(' ') || 'Hello!';
      const length = message.length;
      return {
        output: `
 ${'_'.repeat(length + 2)}
< ${message} >
 ${'-'.repeat(length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,
        type: 'text'
      };
    },

    matrix: () => ({
      output: `🟢 Matrix rain effect activated!
(This is a simulation - imagine green characters falling...)

01001101 01100001 01110100 01110010 01101001 01111000
01010010 01100001 01101001 01101110 00100001 00100001

Wake up, Neo... The Matrix has you...
Follow the white rabbit. 🐰

Type 'clear' to stop the simulation.`,
      type: 'text'
    })
  };

  useEffect(() => {
    setHistory([{
      command: '',
      output: `╔════════════════════════════════════════════════════════════╗
║          Welcome to Terminal Portfolio v2.0               ║
╚════════════════════════════════════════════════════════════╝

Type 'help' for available commands or 'banner' for ASCII art.
Current theme: ${theme} | User: ${username}`,
      type: 'text',
      timestamp: new Date()
    }]);
  }, []);

  useEffect(() => {
    // Expose switch function to window for cd desktop command
    if (onSwitchToRetro) {
      window.switchToRetro = onSwitchToRetro;
    }
    return () => {
      delete window.switchToRetro;
    };
  }, [onSwitchToRetro]);

  useEffect(() => {
    const handleSecurityViolation = (e) => {
      const violationType = e.detail?.type || 'unknown';
      setIsLocked(true);
      setHistory([]); // Clear history to focus on the alert
      
      // Generate a random challenge
      const num1 = Math.floor(Math.random() * 50) + 10;
      const num2 = Math.floor(Math.random() * 50) + 10;
      const answer = num1 + num2;
      
      setChallenge({
        type: 'math',
        question: `CALCULATE CHECKSUM: ${num1} + ${num2} = ?`,
        answer: answer.toString()
      });

      setHistory([{
        command: 'SYSTEM_ALERT',
        output: `
██████╗ ███████╗███╗   ██╗██╗███████╗██████╗ 
██╔══██╗██╔════╝████╗  ██║██║██╔════╝██╔══██╗
██║  ██║█████╗  ██╔██╗ ██║██║█████╗  ██║  ██║
██║  ██║██╔══╝  ██║╚██╗██║██║██╔══╝  ██║  ██║
██████╔╝███████╗██║ ╚████║██║███████╗██████╔╝
╚═════╝ ╚══════╝╚═╝  ╚═══╝╚═╝╚══════╝╚═════╝ 

⚠️ SECURITY VIOLATION DETECTED: ${violationType.toUpperCase()}
⚠️ UNAUTHORIZED ACTION INTERCEPTED
⚠️ SYSTEM LOCKDOWN INITIATED

To regain access, verify admin privileges by solving the challenge below.
`,
        type: 'error',
        timestamp: new Date()
      }]);
    };

    window.addEventListener('security-violation', handleSecurityViolation);
    return () => window.removeEventListener('security-violation', handleSecurityViolation);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Handle Security Lockdown
    if (isLocked) {
      setHistory(prev => [...prev, {
        command: trimmedCmd,
        output: '',
        type: 'input',
        timestamp: new Date()
      }]);

      if (trimmedCmd === challenge.answer) {
        setIsLocked(false);
        setChallenge(null);
        setHistory(prev => [...prev, {
          command: '',
          output: `
✅ ACCESS GRANTED
✅ SYSTEM RESTORED
✅ WELCOME BACK, ADMIN

Type 'help' for available commands.
`,
          type: 'success',
          timestamp: new Date()
        }]);
      } else {
        setHistory(prev => [...prev, {
          command: '',
          output: `❌ ACCESS DENIED. INCORRECT CHECKSUM. TRY AGAIN.\n${challenge.question}`,
          type: 'error',
          timestamp: new Date()
        }]);
      }
      return;
    }

    const [command, ...args] = trimmedCmd.split(' ');
    
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    const commandFunc = commands[command.toLowerCase()];
    if (commandFunc) {
      const result = commandFunc(args);
      if (result !== null) {
        setHistory(prev => [...prev, {
          command: trimmedCmd,
          output: result.output,
          type: result.type,
          timestamp: new Date()
        }]);
      }
    } else {
      setHistory(prev => [...prev, {
        command: trimmedCmd,
        output: `❌ Command not found: '${command}'\nType 'help' for available commands.`,
        type: 'error',
        timestamp: new Date()
      }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const sections = ['projects', 'education', 'experience', 'contact', 'skills'];
      const commandNames = Object.keys(commands);
      const allOptions = [...commandNames, ...sections];
      const matches = allOptions.filter(s => s.startsWith(currentInput.toLowerCase()));
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
      } else if (matches.length > 1) {
        setHistory(prev => [...prev, {
          command: '',
          output: `Suggestions: ${matches.join(', ')}`,
          type: 'text',
          timestamp: new Date()
        }]);
      }
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      commands.clear();
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      setCurrentInput('');
    }
  };

  const containerClass = isEmbedded 
    ? `h-full w-full flex flex-col font-mono text-sm ${currentTheme.bg} overflow-hidden`
    : `w-full h-screen ${currentTheme.bg} font-mono flex flex-col`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={containerClass}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header - Hide if embedded */}
      {!isEmbedded && (
        <div className={`${currentTheme.header} px-4 py-2 flex items-center justify-between border-b-2`}>
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className={`${currentTheme.text} text-sm ml-2`}>
              {isLocked ? 'SYSTEM LOCKDOWN' : `${username}@portfolio:~$`}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className={`${currentTheme.accent} text-xs`}>Theme: {theme}</span>
            <span className={`${currentTheme.accent} text-xs`}>
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      )}
      
      {/* Terminal Body */}
      <div 
        ref={terminalRef}
        className={`flex-1 overflow-y-auto p-4 space-y-2 cursor-text ${isLocked ? 'text-red-500' : ''}`}
      >
        <AnimatePresence>
          {history.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1"
            >
              {entry.command && (
                <div className="flex gap-2">
                  <span className={`${isLocked ? 'text-red-500' : currentTheme.prompt} font-bold`}>
                    {isLocked ? '🔒 LOCKED >' : `${username}@portfolio:~$`}
                  </span>
                  <span className={isLocked ? 'text-red-400' : currentTheme.text}>{entry.command}</span>
                </div>
              )}
              {entry.output && (
                <pre className={`${
                  entry.type === 'error' ? (isLocked ? 'text-red-500 font-bold' : currentTheme.error) : 
                  entry.type === 'success' ? (isLocked ? 'text-green-500' : 'text-green-400') : 
                  entry.type === 'warning' ? 'text-yellow-400' : 
                  (isLocked ? 'text-red-400' : currentTheme.text)
                } whitespace-pre-wrap font-mono text-sm leading-relaxed pl-0`}>
                  {entry.output}
                </pre>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Input Line */}
        <div className="flex gap-2 items-center">
          <span className={`${isLocked ? 'text-red-500' : currentTheme.prompt} font-bold`}>
            {isLocked ? '🔒 LOCKED >' : `${username}@portfolio:~$`}
          </span>
          <input
            ref={inputRef}
            type="text"
            className={`flex-1 bg-transparent border-none outline-none ring-0 focus:ring-0 focus:outline-none ${isLocked ? 'text-red-500' : currentTheme.text} font-mono caret-transparent text-base`}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            placeholder={isLocked ? challenge?.question : ''}
          />
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className={`w-2.5 h-5 ${isLocked ? 'bg-red-500' : currentTheme.prompt.replace('text-', 'bg-')} inline-block -ml-1`}
          />
        </div>
      </div>

      {/* Status Bar - Hide if embedded */}
      {!isEmbedded && (
        <div className={`${currentTheme.header} px-4 py-1 flex items-center justify-between text-xs border-t-2 ${currentTheme.text}`}>
          <span>Commands: {commandHistory.length}</span>
          <span>Press Ctrl+L to clear | Ctrl+C to cancel | Tab for autocomplete</span>
          <span>Lines: {history.length}</span>
        </div>
      )}
    </motion.div>
  );
};

export default TerminalShell;
