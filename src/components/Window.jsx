import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  X, Minus, Square, ArrowLeft, ArrowRight, RotateCw, Home, Search, Lock, Info, 
  Folder, FileText, Code, Cpu, Layers, Globe, Database, Terminal, Download, 
  Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Briefcase, GraduationCap, 
  User, Settings, HardDrive, AlertTriangle 
} from 'lucide-react';
import TerminalShell from './TerminalShell';

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
          <div className="h-full w-full bg-black overflow-hidden">
            <TerminalShell 
              portfolioData={portfolioData} 
              onSwitchToRetro={() => {}} 
              isEmbedded={true}
            />
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



      case 'explorer':
        const folderContent = windowData.data;
        const isProjectsFolder = folderContent?.name === 'Projects';
        
        return (
          <div className="flex flex-col h-full bg-white">
            {/* Explorer Toolbar */}
            <div className="bg-gray-100 border-b border-gray-300 p-2 flex items-center gap-2">
              <div className="flex gap-1">
                <button className="p-1 hover:bg-gray-200 rounded text-gray-500">⬅️</button>
                <button className="p-1 hover:bg-gray-200 rounded text-gray-500">➡️</button>
                <button className="p-1 hover:bg-gray-200 rounded text-gray-500">⬆️</button>
              </div>
              <div className="flex-1 bg-white border border-gray-300 rounded px-3 py-1 text-sm flex items-center gap-2">
                <span className="text-gray-500">📁</span>
                <span>C:\Users\Guest\Desktop\{folderContent?.name || 'Folder'}</span>
              </div>
              <div className="flex gap-2">
                <input type="text" placeholder="Search" className="bg-white border border-gray-300 rounded px-3 py-1 text-sm w-40" />
              </div>
            </div>

            {/* Explorer Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              {isProjectsFolder ? (
                <div className="space-y-6">
                  {['Web Projects', 'Macro Projects', 'Applications', 'Automation', 'Designs'].map((category) => {
                    const categoryProjects = portfolioData.projects.filter(p => p.category === category || (!p.category && category === 'Web Projects'));
                    if (categoryProjects.length === 0) return null;
                    
                    return (
                      <div key={category}>
                        <h3 className="text-gray-500 font-bold mb-3 border-b border-gray-200 pb-1">{category}</h3>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
                          {categoryProjects.map((project, i) => (
                            <div key={i} className="group flex flex-col items-center gap-2 p-2 rounded hover:bg-blue-50 cursor-pointer text-center">
                              <div className="text-4xl group-hover:scale-105 transition-transform">
                                {category === 'Web Projects' ? '🌐' : 
                                 category === 'Macro Projects' ? '📊' :
                                 category === 'Applications' ? '📱' : '📁'}
                              </div>
                              <span className="text-sm text-gray-700 group-hover:text-blue-600 line-clamp-2">{project.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
                  {/* Default view for other folders */}
                  <div className="text-gray-500 italic text-center col-span-full mt-10">
                    Folder is empty
                  </div>
                </div>
              )}
            </div>

            {/* Status Bar */}
            <div className="bg-gray-50 border-t border-gray-200 px-4 py-1 text-xs text-gray-500 flex justify-between">
              <span>{isProjectsFolder ? `${portfolioData.projects.length} items` : '0 items'}</span>
              <span>Local Disk (C:)</span>
            </div>
          </div>
        );

      case 'properties':
        const item = windowData.data;
        return (
          <div className="p-4 bg-gray-50 h-full text-sm select-none">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-300">
              <div className="text-5xl">{item?.icon || '📄'}</div>
              <div>
                <div className="font-bold text-lg text-gray-900">{item?.name || 'Unknown'}</div>
                <div className="text-gray-500">{item?.type === 'folder' ? 'File folder' : 'File'}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <div className="text-gray-500">Type:</div>
                <div>{item?.type === 'folder' ? 'File folder' : 'System File'}</div>
                
                <div className="text-gray-500">Location:</div>
                <div>C:\Users\Guest\Desktop</div>
                
                <div className="text-gray-500">Size:</div>
                <div>{item?.type === 'folder' ? '4.0 KB' : '1.2 MB'}</div>
                
                <div className="text-gray-500">Created:</div>
                <div>{new Date().toLocaleDateString()}</div>
              </div>

              <div className="pt-4 border-t border-gray-300">
                <div className="flex gap-6">
                  <div className="text-gray-500">Attributes:</div>
                  <div className="space-y-1">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked readOnly className="rounded border-gray-300" />
                      Read-only
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      Hidden
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 flex gap-2">
              <button onClick={onClose} className="px-4 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 shadow-sm">OK</button>
              <button onClick={onClose} className="px-4 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 shadow-sm">Cancel</button>
            </div>
          </div>
        );



      case 'education':
        return (
          <div className="p-6 space-y-4 overflow-y-auto h-full bg-gradient-to-br from-gray-900 to-black">
            <div className="mb-4 border-b border-green-500/30 pb-3">
              <h3 className="text-2xl font-bold text-green-400 font-mono">EDUCATION</h3>
            </div>
            {portfolioData.education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/40 backdrop-blur-xl border-2 border-green-500/30 rounded-xl p-4 hover:border-green-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎓</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-2">{edu.degree}</h4>
                    <div className="text-green-400 text-sm font-mono mb-2">{edu.institution}</div>
                    <div className="text-gray-400 text-xs font-mono mb-3">{edu.year}</div>
                    <p className="text-gray-300 text-sm leading-relaxed">{edu.description}</p>
                    {edu.gpa && (
                      <div className="mt-3 inline-block px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-lg">
                        <span className="text-green-400 text-xs font-mono">GPA: {edu.gpa}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'experience':
        return (
          <div className="p-6 space-y-4 overflow-y-auto h-full bg-gradient-to-br from-gray-900 to-black">
            <div className="mb-4 border-b border-green-500/30 pb-3">
              <h3 className="text-2xl font-bold text-green-400 font-mono">EXPERIENCE</h3>
            </div>
            {portfolioData.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/40 backdrop-blur-xl border-2 border-green-500/30 rounded-xl p-4 hover:border-green-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💼</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-2">{exp.title}</h4>
                    <div className="text-green-400 text-sm font-mono mb-2">{exp.company}</div>
                    <div className="text-gray-400 text-xs font-mono mb-3">{exp.period}</div>
                    <p className="text-gray-300 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'contact':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-black p-6 overflow-y-auto">
            <div className="max-w-md mx-auto">
              <div className="mb-6 border-b border-green-500/30 pb-4">
                <h3 className="text-2xl font-bold text-green-400 font-mono">CONTACT INFO</h3>
                <p className="text-gray-400 text-xs font-mono mt-2">Get in touch with me</p>
              </div>

              <div className="space-y-3">
                {/* Email */}
                <div className="bg-black/40 backdrop-blur-xl border-2 border-green-500/30 rounded-xl p-3 hover:border-green-500/50 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">📧</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-400 text-[10px] font-mono uppercase mb-1">Email</div>
                      <a href={`mailto:${portfolioData.contact.email}`} className="text-white text-sm font-mono hover:text-green-400 transition-colors block truncate">
                        {portfolioData.contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-black/40 backdrop-blur-xl border-2 border-green-500/30 rounded-xl p-3 hover:border-green-500/50 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">📱</div>
                    <div className="flex-1">
                      <div className="text-gray-400 text-[10px] font-mono uppercase mb-1">Phone</div>
                      <a href={`tel:${portfolioData.contact.phone}`} className="text-white text-sm font-mono hover:text-green-400 transition-colors">
                        {portfolioData.contact.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location */}
                {portfolioData.contact.location && (
                  <div className="bg-black/40 backdrop-blur-xl border-2 border-green-500/30 rounded-xl p-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">📍</div>
                      <div className="flex-1">
                        <div className="text-gray-400 text-[10px] font-mono uppercase mb-1">Location</div>
                        <div className="text-white text-sm font-mono">{portfolioData.contact.location}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* GitHub */}
                <div className="bg-black/40 backdrop-blur-xl border-2 border-green-500/30 rounded-xl p-3 hover:border-green-500/50 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">💻</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-400 text-[10px] font-mono uppercase mb-1">GitHub</div>
                      <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="text-white text-sm font-mono hover:text-green-400 transition-colors block truncate">
                        {portfolioData.contact.github.replace('https://', '')}
                      </a>
                    </div>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="bg-black/40 backdrop-blur-xl border-2 border-green-500/30 rounded-xl p-3 hover:border-green-500/50 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">💼</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-400 text-[10px] font-mono uppercase mb-1">LinkedIn</div>
                      <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-white text-sm font-mono hover:text-green-400 transition-colors block truncate">
                        {portfolioData.contact.linkedin.replace('https://', '')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-black p-6 overflow-y-auto">
            <div className="mb-6 border-b border-green-500/30 pb-4">
              <h3 className="text-2xl font-bold text-green-400 font-mono">SKILLS & EXPERTISE</h3>
            </div>

            <div className="space-y-6">
              {/* Coding Skills */}
              <div>
                <h4 className="text-green-400 font-mono text-sm mb-3 flex items-center gap-2">
                  <span>💻</span> CODING
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {portfolioData.skills.coding.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-lg px-3 py-2 text-white text-xs font-mono hover:border-green-500/50 hover:bg-green-500/10 transition-all"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Professional Skills */}
              <div>
                <h4 className="text-green-400 font-mono text-sm mb-3 flex items-center gap-2">
                  <span>🛠️</span> PROFESSIONAL
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {portfolioData.skills.professional.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-lg px-3 py-2 text-white text-xs font-mono hover:border-green-500/50 hover:bg-green-500/10 transition-all"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* General Skills */}
              {portfolioData.skills.general && (
                <div>
                  <h4 className="text-green-400 font-mono text-sm mb-3 flex items-center gap-2">
                    <span>⚡</span> GENERAL
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {portfolioData.skills.general.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-lg px-3 py-2 text-white text-xs font-mono hover:border-green-500/50 hover:bg-green-500/10 transition-all"
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'resume':
        return (
          <div className="h-full flex flex-col bg-gray-900">
            <div className="p-3 bg-black/50 backdrop-blur-md border-b border-green-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📄</span>
                <span className="text-green-400 font-mono text-sm">Resume.pdf</span>
              </div>
              <a
                href={portfolioData.resumeUrl}
                download="Pasindu_Hansana_CV.pdf"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg flex items-center gap-2 transition-colors shadow-[0_0_10px_rgba(34,197,94,0.3)] font-mono"
              >
                <Download size={16} />
                DOWNLOAD_PDF
              </a>
            </div>
            <div className="flex-1 w-full relative bg-gray-800">
              <object
                data={portfolioData.resumeUrl}
                type="application/pdf"
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
                  <p className="mb-4">Unable to display PDF directly.</p>
                  <a 
                    href={portfolioData.resumeUrl} 
                    download="Pasindu_Hansana_CV.pdf"
                    className="text-green-400 hover:underline"
                  >
                    Click here to download
                  </a>
                </div>
              </object>
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
            {windowData.type === 'explorer' && '📂'}
            {windowData.type === 'properties' && 'ℹ️'}
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
