import React, { useState, useEffect } from 'react';
import { navigationSections } from '../data/mockData';

const sections = navigationSections;

const ScrollDots: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex flex-col space-y-4">
        {sections.map((section,) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center transition-all duration-500 hover:scale-125 magnetic-hover"
            aria-label={`Go to ${section.label}`}
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-500 relative overflow-hidden ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125 shadow-lg glow-on-hover'
                  : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
              }`}
            >
              {activeSection === section.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse rounded-full"></div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScrollDots;