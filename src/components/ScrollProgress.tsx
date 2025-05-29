import React from 'react';
import { useScroll } from '../context/ScrollContext';

export const ScrollProgress = () => {
  const { scrollProgress } = useScroll();

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
      <div className="h-64 w-1 bg-gray-200 dark:bg-gray-700 rounded-full relative">
        <div
          className="absolute top-0 left-0 w-full bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-300"
          style={{ height: `${scrollProgress * 100}%` }}
        ></div>
      </div>
      <div className="mt-4 space-y-6">
        {['hero', 'about', 'skills', 'projects', 'contact'].map((section, index) => (
          <button
            key={section}
            onClick={() => {
              const element = document.getElementById(section);
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-2 h-2 rounded-full block transition-all duration-300"
            style={{
              backgroundColor:
                scrollProgress * 5 >= index && scrollProgress * 5 < index + 1
                  ? '#2563EB'
                  : '#E5E7EB',
              transform:
                scrollProgress * 5 >= index && scrollProgress * 5 < index + 1
                  ? 'scale(1.5)'
                  : 'scale(1)',
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};