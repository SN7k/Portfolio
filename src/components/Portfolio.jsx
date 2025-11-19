import React, { useState, useEffect } from 'react';
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
  const { theme, cycleTheme } = useTheme();

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

  const cardStyle = `${theme.cardBg} ${theme.border} ${theme.shadow} rounded-xl transition-all duration-200 ${theme.cardText}`;
  const buttonStyle = `${theme.accent1} text-white ${theme.border} ${theme.shadow} ${theme.accent1Hover} rounded-xl uppercase font-bold tracking-wide transition-colors`;
  const badgeStyle = `${theme.cardBg} ${theme.border} ${theme.cardText} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`;

  return (
    <div className={`relative min-h-screen ${theme.bg} font-sans ${theme.text} ${theme.selection} selection:text-white pb-32 transition-colors duration-500`}>
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
            <div className={`inline-flex items-center ${hasDot ? 'gap-2' : ''} px-4 py-2 rounded-full mb-8 ${badgeStyle}`}>
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

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-[4px_4px_0_rgba(0,0,0,0.2)] uppercase leading-none">
          {personalInfo.name.split(' ')[0]} <br />
          <span className={`${theme.accent1Text} transition-colors duration-500`}>{personalInfo.name.split(' ')[1]}</span>
        </h1>

        <p className="text-xl md:text-2xl font-bold opacity-90 leading-relaxed mx-auto max-w-[90%] sm:max-w-none break-words sm:whitespace-nowrap">{personalInfo.subtitle}</p>
      </header>

      <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column sticky stack */}
        <div className="lg:col-span-4 h-full">
          <div className="space-y-6 lg:sticky lg:top-4">
            <div className={`p-6 ${cardStyle}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center overflow-hidden mb-4 ${theme.accent3} border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors duration-500`}>
                {personalInfo.logo ? (
                  <img src={personalInfo.logo} alt={personalInfo.name + ' logo'} className="w-14 h-14 object-contain" />
                ) : (
                  <User className={`w-8 h-8 ${theme.cardText}`} />
                )}
              </div>
              <h2 className="text-xl font-black mb-2 uppercase">About Me</h2>
              <p className="text-sm font-medium opacity-80 leading-relaxed mb-6">
                {aboutText}
              </p>
              <button onClick={toggleContact} className={`w-full py-3 flex items-center justify-center gap-2 ${buttonStyle}`}>
                <Mail className="w-4 h-4" /> Contact Me
              </button>
            </div>

            <div className={`p-6 ${cardStyle}`}>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b-2 border-black pb-2 inline-block">Tech Stack</h3>

              <div className="space-y-4">
                {techStack.map((stack, idx) => {
                  const Icon = ICONS[stack.icon] || Code;
                  return (
                    <div key={idx} className="flex items-start gap-4 group">
                      <div className={`p-2 rounded-lg ${theme.accent2} ${theme.accentContent} border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors duration-500`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold">{stack.title}</h4>
                        <p className="text-xs font-medium opacity-70">{Array.isArray(stack.items) ? stack.items.join(', ') : String(stack.items || '')}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className={`p-4 flex items-center justify-center hover:${theme.accent3} transition-colors duration-500 ${cardStyle}`}>
                <Linkedin className="w-6 h-6" />
              </a>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className={`p-4 flex items-center justify-center hover:${theme.accent3} transition-colors duration-500 ${cardStyle}`}>
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        {/* Right column scrolls (header + projects) */}
        <div className="lg:col-span-8 space-y-6">
          <div className={`flex items-center justify-between p-4 ${cardStyle}`}>
            <h2 className="text-lg font-extrabold uppercase tracking-wide drop-shadow-[3px_3px_0_rgba(0,0,0,0.1)]">
              Selected <span className={`${theme.accent1Text}`}>Projects</span>
            </h2>
            <div className="flex gap-2">
              <span className={`h-3 w-3 rounded-full ${theme.accent1}`}></span>
              <span className={`h-3 w-3 rounded-full ${theme.accent2}`}></span>
              <span className={`h-3 w-3 rounded-full ${theme.accent3}`}></span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(project => (
              <div key={project.id} className={`group flex flex-col h-full ${cardStyle} overflow-hidden transition-transform duration-300 hover:-translate-y-1`}>
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
            ))}
          </div>
        </div>
      </main>

      <button onClick={cycleTheme} className={`fixed bottom-6 right-6 p-4 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${theme.accent1} text-white hover:scale-110 transition-all z-40`} aria-label="Change Theme">
        <Palette className="w-6 h-6" />
      </button>

      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
          <div className={`p-8 max-w-md w-full relative ${theme.cardBg} ${theme.cardText} border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl transition-colors duration-500`}>
            <button onClick={toggleContact} className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-full border-2 border-transparent hover:border-black transition-all">
              <X className="w-6 h-6" />
            </button>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold mb-2 drop-shadow-[3px_3px_0_rgba(0,0,0,0.15)]">Let's Talk!</h2>
              <p className="font-medium opacity-80">I'm currently accepting new projects.</p>
            </div>
            <div className="space-y-4">
              <a href={`mailto:${personalInfo.email}`} className={`flex items-center justify-between p-4 rounded-xl transition-all group ${theme.cardBg} ${theme.cardText} border-2 border-black hover:${theme.accent2} transition-colors duration-300`}>
                <span className="font-bold text-sm sm:text-base truncate">{personalInfo.email}</span>
                <Mail className="w-5 h-5 flex-shrink-0" />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className={`flex items-center justify-between p-4 rounded-xl transition-all group ${theme.lightAccent} ${theme.tagText} border-2 border-black hover:${theme.accent3} transition-colors duration-300`}>
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
