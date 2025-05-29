import { useState, useEffect } from 'react';
import { useScroll } from '../context/ScrollContext';
import { ThemeToggle } from './ThemeToggle';

export const Navigation = () => {
  const { activeSection, scrollToSection } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Define section colors for navbar with increased transparency
  const sectionColors = {
    hero: 'bg-transparent',
    about: 'bg-white/70 dark:bg-gray-900/70',
    skills: 'bg-gray-50/70 dark:bg-gray-800/70',
    projects: 'bg-white/70 dark:bg-gray-900/70',
    contact: 'bg-blue-50/70 dark:bg-gray-800/70'
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile navigation removed as per user request

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  // Get the current section color
  const getNavbarColor = () => {
    if (!isScrolled && activeSection === 'hero') {
      return 'bg-transparent py-6';
    }
    
    return `${sectionColors[activeSection as keyof typeof sectionColors]} backdrop-blur-md shadow-sm py-4`;
  };
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarColor()}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
          Portfolio
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id as any)}
                  className={`relative px-1 py-2 font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.label}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform origin-left transition-all duration-300 ease-out ${
                      activeSection === item.id ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                    }`}
                  ></span>
                </button>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>

        {/* Mobile - Only Dark Mode Toggle */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Navigation removed as per user request */}
    </header>
  );
};