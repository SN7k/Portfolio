import React from 'react';
import { ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/mockData';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-mono font-bold tracking-tight">
              {personalInfo.name}
            </h1>
            <div className="w-24 h-px bg-black dark:bg-white mx-auto"></div>
            <p className="text-lg sm:text-xl font-mono text-gray-500 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {personalInfo.title}<br />
              {personalInfo.subtitle}
            </p>
          </div>
          <div className="pt-48">
            <a
              href="#about"
              className="inline-flex items-center space-x-2 font-mono text-sm border border-gray-200 dark:border-gray-800 px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              <span>SCROLL</span>
              <ChevronDown size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;