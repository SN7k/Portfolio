import React, { useState, useEffect } from 'react';
import { navigationSections } from '../data/mockData';

const sections = navigationSections;

const ScrollDots: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
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
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex flex-col space-y-3">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center"
            aria-label={`Go to ${section.label}`}
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-black dark:bg-white scale-125'
                  : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
              }`}
            />
            <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden md:block">
              <div className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 text-xs font-mono whitespace-nowrap">
                {section.label}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScrollDots;