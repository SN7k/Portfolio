import React from 'react';
import { Moon, Sun, Monitor, User, Folder, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { isDark, isSystemMode, toggleTheme } = useTheme();

  const navItems = [
    { href: '#about', icon: User, label: 'About' },
    { href: '#projects', icon: Folder, label: 'Projects' },
    { href: '#contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-full w-16 z-50 flex-col items-center justify-center gap-8 bg-transparent">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className="text-black dark:text-white opacity-70 hover:opacity-100 transition-all duration-200 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 border border-gray-200/50 dark:border-gray-600/50"
          >
            <item.icon size={20} />
          </a>
        ))}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="text-black dark:text-white opacity-70 hover:opacity-100 transition-all duration-200 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 border border-gray-200/50 dark:border-gray-600/50"
        >
          {isSystemMode ? <Monitor size={20} /> : isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      {/* Mobile Top Navigation */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/10 dark:bg-black/10 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-center items-center gap-12 py-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className="text-black dark:text-white opacity-70 hover:opacity-100 transition-opacity"
            >
              <item.icon size={24} />
            </a>
          ))}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-black dark:text-white opacity-70 hover:opacity-100 transition-opacity"
          >
            {isSystemMode ? <Monitor size={24} /> : isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;