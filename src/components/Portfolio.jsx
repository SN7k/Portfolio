import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mail,
  Database,
  Linkedin,
  Github,
  User,
  X,
  Code,
  Server,
  ExternalLink,
  Palette
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const Portfolio = () => {
  const [showContact, setShowContact] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showColorStick, setShowColorStick] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const holdTimerRef = useRef(null);
  const buttonRef = useRef(null);
  const colorStickRef = useRef(null);
  const { theme, cycleTheme, setThemeByIndex, getCurrentThemeIndex, getTotalThemes, themes } = useTheme();

  useEffect(() => {
    fetch('/data/portfolio.json')
      .then(r => {
        if (!r.ok) throw new Error('Failed to load data');
        return r.json();
      })
      .then(json => setData(json))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const toggleContact = () => setShowContact(!showContact);

  // Handle mouse/touch events for color stick with hold detection
  const handleThemeButtonStart = (e) => {
    if (e.type === 'touchstart') {
      e.preventDefault();
      e.stopPropagation();
    }
    
    holdTimerRef.current = setTimeout(() => {
      setShowColorStick(true);
      setIsDragging(true);
    }, 250); // 250ms threshold for holding
  };

  const handleThemeButtonEnd = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      
      // If color stick wasn't shown, it's a single click - cycle theme
      if (!showColorStick) {
        cycleTheme();
      }
      
      holdTimerRef.current = null;
    }
    setShowColorStick(false);
    setIsDragging(false);
  };

  const handleColorStickDrag = useCallback((clientY) => {
    if (!showColorStick || !colorStickRef.current || !isDragging) return;
    
    const rect = colorStickRef.current.getBoundingClientRect();
    const totalThemes = getTotalThemes();
    
    const y = clientY - rect.top;
    const percentage = Math.max(0, Math.min(1, y / rect.height));
    const themeIndex = Math.floor(percentage * totalThemes);
    
    setThemeByIndex(themeIndex);
  }, [showColorStick, isDragging, getTotalThemes, setThemeByIndex]);

  const onMouseMove = useCallback((e) => {
    if (isDragging) {
      e.preventDefault();
      handleColorStickDrag(e.clientY);
    }
  }, [isDragging, handleColorStickDrag]);

  const onTouchMove = useCallback((e) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      handleColorStickDrag(e.touches[0].clientY);
    }
  }, [isDragging, handleColorStickDrag]);

  // Global event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      // Prevent body scroll when dragging
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', handleThemeButtonEnd);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', handleThemeButtonEnd);
    } else {
      // Re-enable body scroll
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', handleThemeButtonEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', handleThemeButtonEnd);
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isDragging, onMouseMove, onTouchMove]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-pulse mb-4 h-8 w-48 bg-gray-200 rounded" />
          <p className="font-medium text-sm text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-sm">
          <p className="text-red-600 font-bold mb-2">Error loading data</p>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-black text-white text-xs font-bold rounded shadow">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { personalInfo, aboutText, projects, techStack: techStackFromData, availability } = data;
  const defaultTechStack = [
    { title: 'Frontend', icon: 'Code', items: ['React', 'Tailwind', 'Vite'] },
    { title: 'Backend', icon: 'Server', items: ['Node.js', 'Express', 'API'] },
    { title: 'Database', icon: 'Database', items: ['MongoDB', 'MySQL'] }
  ];
  const techStack = techStackFromData && Array.isArray(techStackFromData) ? techStackFromData : defaultTechStack;
  const ICONS = { Code, Server, Database };

  const isSketch = theme.id === 'sketch';
  const roughBorderStyle = isSketch && theme.roughBorderStyle ? theme.roughBorderStyle : {};
  
  // Helper function to get varied rough border styles for sketch theme
  const getRoughBorder = (index = 0) => {
    if (!isSketch || !theme.roughBorderVariants) return {};
    const variants = theme.roughBorderVariants;
    return {
      ...variants[index % variants.length],
      borderColor: '#27272a',
      borderStyle: 'solid'
    };
  };
  
  const cardStyle = isSketch ? 'bg-white border-2 border-zinc-800' : `${theme.cardBg} ${theme.border} ${theme.shadow} rounded-xl transition-all duration-200 ${theme.cardText}`;
  const buttonStyle = isSketch ? 'bg-zinc-900 text-white sketch-animate' : `${theme.accent1} ${theme.accentContent} ${theme.border} ${theme.shadow} ${theme.accent1Hover} rounded-xl uppercase font-bold tracking-wide transition-colors`;
  const badgeStyle = isSketch ? 'bg-zinc-100 border-2 border-zinc-800 text-zinc-800' : `${theme.cardBg} ${theme.border} ${theme.cardText} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`;

  return (
    <div className={`relative min-h-screen ${theme.bg} ${isSketch ? `${theme.paperTexture} font-['Architects_Daughter',_cursive]` : 'font-sans'} ${theme.text} ${theme.selection} selection:text-white pb-32 transition-colors duration-500`}>
      {/* Animated Decorations */}
      {theme.decorations && theme.decorations.map((d, idx) => (
        <div key={idx} className={d.className} style={d.style} aria-hidden="true" />
      ))}
      <header className="max-w-3xl mx-auto pt-12 pb-10 px-6 text-center">
        {(() => {
          const rawLabel = availability?.label || 'Open for Work';
          const hasDot = rawLabel.startsWith('.');
          const cleanLabel = hasDot ? rawLabel.replace(/^\.+/, '').trimStart() : rawLabel;
          return (
            <div 
              className={`inline-flex items-center ${hasDot ? 'gap-2' : ''} px-4 py-2 mb-8 ${badgeStyle}`}
              style={isSketch ? roughBorderStyle : {}}
            >
              {hasDot && (
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-20"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
                </span>
              )}
              <span className="text-xs font-bold uppercase tracking-wide">{cleanLabel}</span>
            </div>
          );
        })()}

        <h1 className={`${isSketch ? 'text-5xl md:text-8xl leading-none' : 'text-5xl md:text-7xl leading-none'} font-extrabold tracking-tight mb-6 drop-shadow-[4px_4px_0_rgba(0,0,0,0.2)] uppercase`}>
          {isSketch ? (
            <>
              <span className="marker-highlight">{personalInfo.name.split(' ')[0]}</span> <br />
              <span className="ml-4 md:ml-12">{personalInfo.name.split(' ')[1]}</span>
            </>
          ) : (
            <>
              {personalInfo.name.split(' ')[0]} <br />
              <span className={`${theme.accent1Text} transition-colors duration-500`}>{personalInfo.name.split(' ')[1]}</span>
            </>
          )}
        </h1>

        <p className={`${isSketch ? 'text-2xl' : 'text-xl md:text-2xl'} font-bold ${isSketch ? 'opacity-70' : 'opacity-90'} leading-relaxed mx-auto max-w-[90%] sm:max-w-none break-words sm:whitespace-nowrap ${isSketch ? 'italic' : ''}`}>
          {isSketch ? `"${personalInfo.subtitle}"` : personalInfo.subtitle}
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column sticky stack */}
        <div className="lg:col-span-4 h-full">
          <div className="space-y-6 lg:sticky lg:top-4">
            <div className={`p-6 ${cardStyle}`} style={isSketch ? getRoughBorder(0) : {}}>
              <div className={`w-16 h-16 ${isSketch ? 'border-2 border-zinc-800' : 'rounded-full'} flex items-center justify-center overflow-hidden mb-4 ${theme.accent3} ${isSketch ? '' : 'border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'} transition-colors duration-500`} style={isSketch ? getRoughBorder(1) : {}}>
                {personalInfo.logo ? (
                  <img src={personalInfo.logo} alt={personalInfo.name + ' logo'} className="w-14 h-14 object-contain" />
                ) : (
                  <User className={`w-8 h-8 ${theme.cardText}`} />
                )}
              </div>
              <h2 className={`text-xl font-black mb-2 uppercase ${isSketch ? 'underline decoration-wavy underline-offset-4' : ''}`}>About Me</h2>
              <p className={`text-sm font-medium opacity-80 leading-relaxed mb-6 ${isSketch ? 'text-base' : ''}`}>
                {aboutText}
              </p>
              <button 
                onClick={toggleContact} 
                className={`w-full ${isSketch ? 'px-8 py-3 text-xl' : 'py-3'} flex items-center justify-center gap-2 uppercase font-bold tracking-wide transition-colors ${buttonStyle}`}
                style={isSketch ? getRoughBorder(2) : {}}
              >
                <Mail className="w-4 h-4" /> Contact Me
              </button>
            </div>

            <div className={`${isSketch ? 'p-8' : 'p-6'} ${cardStyle}`} style={isSketch ? getRoughBorder(3) : {}}>
              <h3 className={`${isSketch ? 'text-4xl' : 'text-sm'} font-bold uppercase tracking-wider mb-4 border-b-2 border-black pb-2 inline-block ${isSketch ? 'underline decoration-wavy underline-offset-8 border-b-0 mb-8' : ''}`}>Tech Stack</h3>

              <div className="space-y-4">
                {techStack.map((stack, idx) => {
                  const Icon = ICONS[stack.icon] || Code;
                  return (
                    <div key={idx} className={`flex items-start ${isSketch ? 'gap-3' : 'gap-4'} group`}>
                      <div 
                        className={`p-2 ${isSketch ? 'border-2 border-zinc-800' : 'rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'} ${theme.accent2} ${theme.cardText} transition-colors duration-500`}
                        style={isSketch ? getRoughBorder(idx + 10) : {}}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className={isSketch ? 'mb-6' : ''}>
                        <h4 className={`${isSketch ? 'text-2xl' : ''} font-bold`}>{stack.title}</h4>
                        <p className={`${isSketch ? 'text-lg' : 'text-xs'} font-medium opacity-70`}>{Array.isArray(stack.items) ? stack.items.join(', ') : String(stack.items || '')}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className={`p-4 flex items-center justify-center hover:${theme.accent3} transition-colors duration-500 ${cardStyle}`}
                style={isSketch ? getRoughBorder(4) : {}}
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noreferrer" 
                className={`p-4 flex items-center justify-center hover:${theme.accent3} transition-colors duration-500 ${cardStyle}`}
                style={isSketch ? getRoughBorder(5) : {}}
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        {/* Right column scrolls (header + projects) */}
        <div className="lg:col-span-8 space-y-6">
          <div className={`flex items-center justify-between p-4 ${cardStyle}`} style={isSketch ? getRoughBorder(6) : {}}>
            <h2 className={`${isSketch ? 'text-4xl' : 'text-lg'} font-extrabold uppercase tracking-wide drop-shadow-[3px_3px_0_rgba(0,0,0,0.1)] ${isSketch ? 'underline decoration-wavy underline-offset-8' : ''}`}>
              Selected <span className={`${theme.accent1Text}`}>Projects</span>
            </h2>
            <div className="flex gap-2">
              <span className={`h-3 w-3 rounded-full ${theme.accent1}`}></span>
              <span className={`h-3 w-3 rounded-full ${theme.accent2}`}></span>
              <span className={`h-3 w-3 rounded-full ${theme.accent3}`}></span>
            </div>
          </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, idx) => {
              const sketchColor = isSketch && theme.projectColors ? theme.projectColors[idx % theme.projectColors.length] : null;
              
              if (isSketch) {
                return (
                  <div 
                    key={project.id} 
                    className="group relative bg-white p-6 transition-transform hover:-translate-y-2"
                    style={{
                      ...getRoughBorder(idx + 20),
                      transform: `rotate(${idx % 2 === 0 ? '1deg' : '-1deg'})`
                    }}
                  >
                    {/* ID Badge */}
                    <div className="absolute -top-4 -left-4 px-3 py-1 bg-zinc-900 text-white font-bold" style={getRoughBorder(idx + 30)}>
                      PRJ-{String(idx + 1).padStart(2, '0')}
                    </div>

                    {/* Colorful square with project info */}
                    <div 
                      className="aspect-square mb-6 border-2 border-zinc-800 flex flex-col items-center justify-center p-4 text-center group-hover:opacity-80 transition-all relative overflow-hidden"
                      style={{ backgroundColor: sketchColor }}
                    >
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.name} 
                          className="absolute inset-0 w-full h-full object-cover opacity-[0.98]"
                        />
                      ) : (
                        <div className="relative z-10">
                          <h3 className="text-3xl font-bold mb-2 uppercase">{project.name}</h3>
                          <div className="w-12 h-1 bg-zinc-800 mb-4 mx-auto"></div>
                          <p className="text-sm italic">{project.description}</p>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map(tag => (
                          <span key={tag} className="text-[10px] font-bold border border-zinc-800 px-2 py-0.5 rounded-sm bg-white/50 uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Links */}
                      <div className="flex gap-4 pt-2 border-t border-zinc-200">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline font-bold text-sm">
                            <Github size={14} /> Source
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline font-bold text-sm">
                            <ExternalLink size={14} /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
              
              // Regular theme project card
              return (
              <div 
                key={project.id} 
                className={`group flex flex-col h-full ${cardStyle} overflow-hidden transition-transform duration-300 hover:-translate-y-1`}
              >
                {/* Window-style header */}
                <div className={`flex items-center justify-between px-4 py-3 border-b-2 border-black ${theme.accent2} transition-colors duration-500`}>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-white border-2 border-black"></div>
                    <div className="w-3 h-3 rounded-full bg-white border-2 border-black opacity-50"></div>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    {`PRJ-${project.id.toString().padStart(2, '0')}`}
                  </div>
                </div>

                {/* Image area */}
                <div className="h-56 md:h-64 relative border-b-2 border-black overflow-hidden bg-slate-100 group-hover:opacity-95 transition-opacity">
                  {project.image ? (
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${theme.lightAccent} transition-colors duration-500`}>
                      <Code className={`w-16 h-16 ${theme.cardText} opacity-20`} />
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-extrabold uppercase">{project.name}</h3>
                  </div>

                  <p className="text-sm font-medium opacity-80 mb-6 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Tech tags with +N more */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.slice(0, 4).map(tag => (
                      <span key={tag} className={`px-2 py-1 text-[10px] font-bold uppercase ${theme.lightAccent} ${theme.tagText} border-2 border-black rounded-md transition-colors duration-500`}>
                        {tag}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-1 text-[10px] font-bold uppercase bg-white text-black border-2 border-black rounded-md">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Footer actions */}
                  <div className="flex gap-3 mt-auto pt-4 border-t-2 border-dashed border-gray-200">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold hover:underline decoration-2 underline-offset-2">
                        <Github className="w-4 h-4" /> Source
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className={`flex items-center gap-1.5 text-xs font-bold hover:underline decoration-2 underline-offset-2 ml-auto ${theme.accent1Text}`}>
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </main>

      <button 
        ref={buttonRef}
        onMouseDown={handleThemeButtonStart}
        onTouchStart={handleThemeButtonStart}
        onMouseUp={handleThemeButtonEnd}
        onTouchEnd={handleThemeButtonEnd}
        className={`fixed bottom-6 right-6 p-4 ${isSketch ? 'border-2 border-zinc-800' : 'rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'} ${theme.accent1} text-white transition-all z-40 ${showColorStick ? 'scale-90' : 'hover:scale-110 active:scale-95'}`} 
        style={isSketch ? getRoughBorder(7) : {}}
        aria-label="Change Theme"
      >
        <Palette className={`w-6 h-6 ${showColorStick ? 'animate-pulse' : ''}`} />
        {showColorStick && (
          <div 
            className="absolute inset-[-8px] rounded-full border-2 animate-ping opacity-30" 
            style={{ borderColor: 'currentColor' }}
          />
        )}
      </button>

      {/* Color Stick Slider */}      
      <div 
        ref={colorStickRef}
        className={`fixed bottom-24 flex flex-col items-center z-50 ${showColorStick ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-20 pointer-events-none'}`}
        style={{
          transition: 'opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          right: 'calc(24px + 2rem)',
          transform: showColorStick ? 'translateX(50%)' : 'translateX(50%) translateY(20px) scale(0.75)',
          willChange: 'transform, opacity'
        }}
      >
        <div className="glass-morphism p-3 rounded-[2rem] shadow-2xl flex flex-col items-center gap-3" style={{ transition: 'none' }}>
          {/* Theme index display */}
          <span 
            className={`text-[10px] font-mono font-bold px-2 py-1 rounded-full ${theme.cardText}`}
            style={{ 
              backgroundColor: `${theme.accent1.replace('bg-', '')}20`,
              opacity: 0.9
            }}
          >
            {getCurrentThemeIndex() + 1}/{getTotalThemes()}
          </span>

          {/* Vertical gradient track */}
          <div 
            className="w-1.5 h-[300px] rounded-full relative cursor-ns-resize overflow-visible"
            style={{
              background: 'linear-gradient(to bottom, #ff0000 0%, #ff7f00 14.28%, #ffff00 28.56%, #00ff00 42.84%, #00ffff 57.12%, #0000ff 71.4%, #8b00ff 85.68%, #ff00ff 92.84%, #ff0066 100%)'
            }}
          >
            {/* Thumb indicator */}
            <div 
              className="absolute left-1/2 w-7 h-7 bg-white rounded-full shadow-2xl border-4 border-black/20 transition-all"
              style={{ 
                top: `${(getCurrentThemeIndex() / (getTotalThemes() - 1)) * 100}%`,
                transform: isDragging ? 'translate(-50%, -50%) scale(1.1)' : 'translate(-50%, -50%)',
                boxShadow: '0 0 20px rgba(255,255,255,0.6), 0 4px 10px rgba(0,0,0,0.3)'
              }}
            />
          </div>
        </div>
        
        {/* Tooltip tail */}
        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-zinc-900/90" />
      </div>

      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
          <div 
            className={`p-8 md:p-10 max-w-md w-full relative ${theme.cardBg} ${theme.cardText} border-4 border-black ${isSketch ? '-rotate-[0.5deg] border-2 border-zinc-800' : 'rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'} transition-colors duration-500`}
            style={isSketch ? getRoughBorder(8) : {}}
          >
            {isSketch && <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-2 bg-zinc-400/30 rounded-full"></div>}
            
            <button onClick={toggleContact} className={`absolute top-4 right-4 p-1 hover:bg-slate-100 ${isSketch ? 'border-2 border-zinc-800' : 'rounded-full'} ${isSketch ? '' : 'border-2 border-transparent'} hover:border-black transition-all`} style={isSketch ? getRoughBorder(9) : {}}>
              <X className="w-6 h-6" />
            </button>
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-extrabold mb-2 drop-shadow-[3px_3px_0_rgba(0,0,0,0.15)] ${isSketch ? 'underline decoration-double text-5xl' : ''}`}>
                {isSketch ? 'Contact Me' : "Let's Talk!"}
              </h2>
              {!isSketch && <p className="font-medium opacity-80">I'm currently accepting new projects.</p>}
            </div>
            <div className="space-y-4">
              <a 
                href={`mailto:${personalInfo.email}`} 
                className={`flex items-center justify-between p-4 ${isSketch ? 'bg-zinc-50 border-2 border-zinc-800' : `${theme.cardBg} rounded-xl border-2 border-black`} ${theme.cardText} hover:bg-zinc-100 transition-colors duration-300`}
                style={isSketch ? getRoughBorder(40) : {}}
              >
                <span className="font-bold text-sm sm:text-base truncate">{personalInfo.email}</span>
                <Mail className="w-5 h-5 flex-shrink-0" />
              </a>
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className={`flex items-center justify-between p-4 ${isSketch ? 'bg-zinc-50 border-2 border-zinc-800' : `${theme.lightAccent} rounded-xl border-2 border-black`} ${theme.tagText} hover:bg-zinc-100 transition-colors duration-300`}
                style={isSketch ? getRoughBorder(41) : {}}
              >
                <span className="font-bold">LinkedIn Profile</span>
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
