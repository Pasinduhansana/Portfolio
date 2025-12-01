import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Window = ({ window: windowData, onClose, onMinimize, onMaximize, onFocus, portfolioData, onDragStart, onDragEnd, isAnyWindowDragging }) => {
  const [position, setPosition] = useState(windowData.position);
  const [size, setSize] = useState(windowData.size);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [browserUrl, setBrowserUrl] = useState('https://www.wikipedia.org');
  const [currentSrc, setCurrentSrc] = useState('https://www.wikipedia.org');
  const [browserHistory, setBrowserHistory] = useState(['https://www.wikipedia.org']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const windowRef = useRef(null);

  // Sites known to block iframes
  const blockedSites = ['google.com', 'facebook.com', 'twitter.com', 'instagram.com', 'linkedin.com', 'github.com', 'youtube.com'];

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-titlebar') && !e.target.closest('.window-controls')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      onFocus();
      if (onDragStart) onDragStart();
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && !windowData.isMaximized) {
      setPosition({
        x: Math.max(0, Math.min(e.clientX - dragStart.x, window.innerWidth - 300)),
        y: Math.max(0, Math.min(e.clientY - dragStart.y, window.innerHeight - 100))
      });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (onDragEnd) onDragEnd();
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const windowStyle = windowData.isMaximized
    ? { left: 0, top: 0, width: '100%', height: 'calc(100vh - 56px)' }
    : { left: position.x, top: position.y, width: size.width, height: size.height };

  const navigateTo = (url) => {
    let finalUrl = url;
    if (!url.startsWith('http') && !url.includes('.')) {
      // Search query
      finalUrl = `https://www.bing.com/search?q=${encodeURIComponent(url)}`;
    } else if (!url.startsWith('http')) {
      finalUrl = `https://${url}`;
    }

    setBrowserUrl(finalUrl);
    setCurrentSrc(finalUrl);
    
    const newHistory = [...browserHistory.slice(0, historyIndex + 1), finalUrl];
    setBrowserHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setIsLoading(true);
  };

  const handleBrowserNavigate = (e) => {
    e.preventDefault();
    navigateTo(browserUrl);
  };

  const handleBrowserBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setBrowserUrl(browserHistory[newIndex]);
      setCurrentSrc(browserHistory[newIndex]);
    }
  };

  const handleBrowserForward = () => {
    if (historyIndex < browserHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setBrowserUrl(browserHistory[newIndex]);
      setCurrentSrc(browserHistory[newIndex]);
    }
  };

  const isBlocked = blockedSites.some(site => currentSrc.includes(site));

  const renderContent = () => {
    switch (windowData.type) {
      case 'browser':
        return (
          <div className="flex flex-col h-full bg-white">
            {/* Browser Toolbar */}
            <div className="flex flex-col border-b border-gray-300">
              <div className="flex items-center gap-2 p-2 bg-gray-100">
                <div className="flex gap-1">
                  <button 
                    onClick={handleBrowserBack}
                    disabled={historyIndex === 0}
                    className="p-1.5 rounded-full hover:bg-gray-200 disabled:opacity-30 transition-colors"
                  >
                    ◀
                  </button>
                  <button 
                    onClick={handleBrowserForward}
                    disabled={historyIndex === browserHistory.length - 1}
                    className="p-1.5 rounded-full hover:bg-gray-200 disabled:opacity-30 transition-colors"
                  >
                    ▶
                  </button>
                  <button 
                    onClick={() => { setIsLoading(true); const src = currentSrc; setCurrentSrc(''); setTimeout(() => setCurrentSrc(src), 10); }}
                    className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    ↻
                  </button>
                </div>
                
                <form onSubmit={handleBrowserNavigate} className="flex-1">
                  <input
                    type="text"
                    value={browserUrl}
                    onChange={(e) => setBrowserUrl(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    className="w-full px-4 py-1.5 bg-white border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500 transition-colors text-gray-900"
                    placeholder="Search or type a URL"
                  />
                </form>
                
                <div className="flex gap-2 px-2 items-center">
                   <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
                     <svg viewBox="0 0 24 24" className="w-full h-full">
                       <path fill="#4285F4" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"/>
                       <path fill="#FBBC05" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" clipPath="circle(12px at 12px 12px)"/>
                       <path fill="#34A853" d="M12 12L2.5 12C2.5 6.75 6.75 2.5 12 2.5C17.25 2.5 21.5 6.75 21.5 12L12 12Z"/>
                       <path fill="#EA4335" d="M12 12L12 21.5C6.75 21.5 2.5 17.25 2.5 12L12 12Z"/>
                       <circle cx="12" cy="12" r="4.5" fill="#fff"/>
                       <circle cx="12" cy="12" r="3.5" fill="#4285F4"/>
                     </svg>
                   </div>
                </div>
              </div>

              {/* Bookmarks Bar */}
              <div className="flex gap-1 px-2 py-1 bg-gray-50 text-xs overflow-x-auto">
                <button 
                  onClick={() => navigateTo('https://pasinduhansana.netlify.app/')} 
                  className="flex items-center gap-1 hover:bg-gray-200 px-2 py-1 rounded-full text-gray-700 transition-colors whitespace-nowrap"
                >
                  <span>🌐</span> Portfolio
                </button>
                <button 
                  onClick={() => navigateTo(portfolioData.contact.linkedin)} 
                  className="flex items-center gap-1 hover:bg-gray-200 px-2 py-1 rounded-full text-gray-700 transition-colors whitespace-nowrap"
                >
                  <span>💼</span> LinkedIn
                </button>
                <button 
                  onClick={() => navigateTo(portfolioData.contact.github)} 
                  className="flex items-center gap-1 hover:bg-gray-200 px-2 py-1 rounded-full text-gray-700 transition-colors whitespace-nowrap"
                >
                  <span>💻</span> GitHub
                </button>
              </div>
            </div>

            {/* Browser Content */}
            <div className="flex-1 bg-white relative overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              {isBlocked ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-center p-8">
                    <div className="text-6xl mb-4">🛡️</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Content Blocked</h3>
                    <p className="text-gray-600 mb-6 max-w-md">
                      The website <strong>{new URL(currentSrc).hostname}</strong> does not allow itself to be displayed inside another page (like this portfolio OS).
                    </p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => navigateTo('wikipedia.org')}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 transition-colors"
                      >
                        Go Home
                      </button>
                      <a 
                        href={currentSrc} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        Open in New Tab <span className="text-xs">↗</span>
                      </a>
                    </div>
                 </div>
              ) : (
                <iframe
                  key={currentSrc}
                  src={currentSrc}
                  className={`w-full h-full border-none ${isAnyWindowDragging ? 'pointer-events-none' : ''}`}
                  title="Browser Content"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  onLoad={() => setIsLoading(false)}
                  onError={() => setIsLoading(false)}
                />
              )}
            </div>
          </div>
        );

      case 'terminal':
        return (
          <div className="flex flex-col h-full bg-black text-green-400 font-mono p-2 overflow-hidden">
            <div className="mb-2 text-sm opacity-70">Microsoft Windows [Version 10.0.19045.4291]</div>
            <div className="mb-4 text-sm opacity-70">(c) Microsoft Corporation. All rights reserved.</div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="mb-2">
                <span className="text-white">C:\Users\Guest\Portfolio&gt;</span>
                <span className="ml-2">dir</span>
              </div>
              <div className="mb-2 opacity-80">
                <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                  <div>05/20/2024</div><div>&lt;DIR&gt; Projects</div>
                  <div>05/20/2024</div><div>&lt;DIR&gt; Education</div>
                  <div>05/20/2024</div><div>&lt;DIR&gt; Experience</div>
                  <div>05/20/2024</div><div>resume.pdf</div>
                  <div>05/20/2024</div><div>skills.txt</div>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-white">C:\Users\Guest\Portfolio&gt;</span>
                <span className="ml-2 animate-pulse">_</span>
              </div>
            </div>
            
            <div className="mt-2 p-2 bg-gray-900 border-t border-gray-800 text-xs text-gray-400 text-center">
              Maximize this window to enter full Terminal Mode
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="p-4 space-y-4 overflow-y-auto h-full bg-gray-50">
            {portfolioData.projects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-3xl p-2 bg-blue-50 rounded-lg">📁</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                      {project.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((t, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium border border-gray-200">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" 
                           className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
                          <span>🌐</span> Live Demo
                        </a>
                      )}
                      {project.repo && (
                        <a href={project.repo} target="_blank" rel="noopener noreferrer"
                           className="px-3 py-1.5 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-900 transition-colors flex items-center gap-2">
                          <span>💻</span> Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'education':
        return (
          <div className="p-4 space-y-4 overflow-y-auto h-full bg-gray-50">
            {portfolioData.education.map((edu, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-4xl p-3 bg-purple-50 rounded-xl">🎓</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{edu.degree}</h3>
                    <p className="text-purple-600 font-semibold mb-2">{edu.institution}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">📅 {edu.year}</span>
                      <span className="flex items-center gap-1">📍 {edu.location}</span>
                      {edu.gpa && <span className="flex items-center gap-1">🏆 GPA: {edu.gpa}</span>}
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">{edu.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'experience':
        return (
          <div className="p-4 space-y-4 overflow-y-auto h-full bg-gray-50">
            {portfolioData.experience.map((exp, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-400 to-blue-500"></div>
                <div className="flex items-start gap-4 pl-2">
                  <div className="text-4xl p-3 bg-green-50 rounded-xl">💼</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.title}</h3>
                    <p className="text-green-600 font-semibold mb-2">{exp.company}</p>
                    <p className="text-gray-500 text-sm mb-4 italic flex items-center gap-2">
                      <span>📅</span> {exp.period}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'contact':
        return (
          <div className="p-8 space-y-6 h-full flex flex-col justify-center bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Email</h3>
                <a href={`mailto:${portfolioData.contact.email}`} className="text-blue-600 hover:underline">
                  {portfolioData.contact.email}
                </a>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Phone</h3>
                <a href={`tel:${portfolioData.contact.phone}`} className="text-blue-600 hover:underline">
                  {portfolioData.contact.phone}
                </a>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">GitHub</h3>
                <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View Profile
                </a>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">LinkedIn</h3>
                <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Connect
                </a>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Location</h3>
              <p className="text-gray-600">{portfolioData.contact.location}</p>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="p-6 space-y-8 overflow-y-auto h-full bg-gray-50">
            {/* Coding Skills */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b border-gray-200">
                <span className="text-2xl">💻</span> Coding Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {portfolioData.skills.coding.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-white text-blue-700 rounded-lg text-sm font-medium border border-blue-100 shadow-sm hover:shadow-md transition-shadow cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Professional Skills */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b border-gray-200">
                <span className="text-2xl">⚙️</span> Professional Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {portfolioData.skills.professional.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-white text-purple-700 rounded-lg text-sm font-medium border border-purple-100 shadow-sm hover:shadow-md transition-shadow cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* General Skills */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b border-gray-200">
                <span className="text-2xl">🧠</span> General Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {portfolioData.skills.general.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-white text-green-700 rounded-lg text-sm font-medium border border-green-100 shadow-sm hover:shadow-md transition-shadow cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'resume':
        return (
          <div className="h-full flex flex-col bg-gray-50">
            {/* PDF Viewer */}
            <div className="flex-1 bg-white border-b border-gray-300 overflow-auto p-8">
              <div className="max-w-3xl mx-auto bg-white shadow-lg p-12 min-h-full">
                {/* Resume Header */}
                <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">Pasindu Hansana</h1>
                  <p className="text-xl text-gray-600 mb-3">Full Stack Developer | Supply Chain Analyst</p>
                  <div className="flex justify-center gap-4 text-sm text-gray-600 flex-wrap">
                    <span>📧 {portfolioData.contact.email}</span>
                    <span>📱 {portfolioData.contact.phone}</span>
                    <span>📍 {portfolioData.contact.location}</span>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                    Professional Summary
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Dedicated IT undergraduate and Full Stack Developer with experience in building robust web applications and optimizing supply chain processes. 
                    Skilled in React, Node.js, and .NET technologies. Passionate about leveraging technology to solve complex business problems.
                  </p>
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                    Work Experience
                  </h2>
                  {portfolioData.experience.map((exp, i) => (
                    <div key={i} className="mb-4">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                        <span className="text-sm text-gray-500 font-medium">{exp.period}</span>
                      </div>
                      <p className="text-gray-600 italic mb-1">{exp.company}</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{exp.description.substring(0, 150)}...</p>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                    Education
                  </h2>
                  {portfolioData.education.map((edu, i) => (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                        <span className="text-sm text-gray-500 font-medium">{edu.year}</span>
                      </div>
                      <p className="text-gray-600 italic">{edu.institution}</p>
                      <p className="text-gray-500 text-sm">{edu.location} | GPA: {edu.gpa}</p>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                    Technical Skills
                  </h2>
                  <div className="text-gray-700 text-sm">
                    <p className="mb-2"><strong>Languages & Frameworks:</strong> {portfolioData.skills.coding.slice(0, 8).join(', ')}</p>
                    <p className="mb-2"><strong>Tools & Platforms:</strong> {portfolioData.skills.professional.slice(0, 6).join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="p-4 bg-gray-100 border-t border-gray-300 flex justify-center">
              <a 
                href={portfolioData.resumeUrl} 
                download="Pasindu_Hansana_CV.pdf"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-lg"
              >
                <span>📥</span>
                Download PDF
              </a>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="p-6 space-y-4 overflow-y-auto h-full bg-gray-50">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Settings</h3>
            <div className="space-y-3">
              <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Appearance</h4>
                <p className="text-sm text-gray-600">Customize your desktop wallpaper from the taskbar</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                <p className="text-sm text-gray-600">Portfolio OS v1.0</p>
                <p className="text-sm text-gray-600">Built with React + Tailwind CSS</p>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="p-6 text-gray-500 italic h-full flex items-center justify-center">No content available</div>;
    }
  };

  return (
    <motion.div
      ref={windowRef}
      className="absolute bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col border border-gray-400"
      style={{
        ...windowStyle,
        zIndex: windowData.zIndex,
        minWidth: '300px',
        minHeight: '200px'
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div 
        className={`window-titlebar px-4 py-2 flex justify-between items-center cursor-move select-none ${
          windowData.type === 'browser' ? 'bg-gray-200 border-b border-gray-300' : 
          windowData.type === 'terminal' ? 'bg-gray-900 border-b border-gray-800' :
          'bg-gradient-to-r from-blue-600 to-blue-700'
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className={`flex items-center gap-2 font-semibold ${
          windowData.type === 'browser' ? 'text-gray-700' : 
          windowData.type === 'terminal' ? 'text-green-400' :
          'text-white'
        }`}>
          <span className="text-lg">
            {windowData.type === 'projects' && '📁'}
            {windowData.type === 'education' && '🎓'}
            {windowData.type === 'experience' && '💼'}
            {windowData.type === 'contact' && '📧'}
            {windowData.type === 'resume' && '📄'}
            {windowData.type === 'skills' && '🛠️'}
            {windowData.type === 'settings' && '⚙️'}
            {windowData.type === 'browser' && '🌐'}
            {windowData.type === 'terminal' && '💻'}
          </span>
          <span className="capitalize">{windowData.type === 'browser' ? 'Chrome' : windowData.type}</span>
        </div>
        
        <div className="window-controls flex gap-1">
          <button
            className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
              windowData.type === 'browser' ? 'hover:bg-gray-300 text-gray-600' : 
              windowData.type === 'terminal' ? 'hover:bg-gray-800 text-gray-400' :
              'hover:bg-blue-500 text-white'
            }`}
            onClick={onMinimize}
            title="Minimize"
          >
            <span className="text-xl leading-none">−</span>
          </button>
          <button
            className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
              windowData.type === 'browser' ? 'hover:bg-gray-300 text-gray-600' : 
              windowData.type === 'terminal' ? 'hover:bg-gray-800 text-gray-400' :
              'hover:bg-blue-500 text-white'
            }`}
            onClick={onMaximize}
            title={windowData.isMaximized ? "Restore" : "Maximize"}
          >
            <span className="text-lg leading-none">{windowData.isMaximized ? '❐' : '□'}</span>
          </button>
          <button
            className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
              windowData.type === 'browser' ? 'hover:bg-red-500 hover:text-white text-gray-600' : 
              windowData.type === 'terminal' ? 'hover:bg-red-600 text-white' :
              'hover:bg-red-600 text-white'
            }`}
            onClick={onClose}
            title="Close"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="flex-1 overflow-hidden bg-white">
        {renderContent()}
      </div>
    </motion.div>
  );
};

export default Window;
