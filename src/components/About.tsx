import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getSkillsByCategories } from '../utils/dataUtils';
import { aboutSection } from '../data/mockData';

const About: React.FC = () => {
  const skillsByCategory = getSkillsByCategories();
  const [currentCategory, setCurrentCategory] = useState(0);

  const nextCategory = () => {
    setCurrentCategory((prev) => (prev + 1) % skillsByCategory.length);
  };

  const prevCategory = () => {
    setCurrentCategory((prev) => (prev - 1 + skillsByCategory.length) % skillsByCategory.length);
  };

  const goToCategory = (index: number) => {
    setCurrentCategory(index);
  };

  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-mono font-bold mb-4">
              ABOUT ME
            </h2>
            <div className="w-16 h-px bg-black dark:bg-white mx-auto"></div>
          </div>
          
          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Bio Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="border-l-2 border-black dark:border-white pl-4">
                  <h3 className="text-lg font-mono font-bold mb-3">
                    BACKGROUND
                  </h3>
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-mono text-sm leading-relaxed space-y-4">
                  {aboutSection.background.map((paragraph, index) => (
                    <p key={index}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Tech Stack Section */}
            <div className="lg:col-span-2 space-y-8">
              <div className="border-l-2 border-black dark:border-white pl-4">
                <h3 className="text-lg font-mono font-bold mb-6">
                  TECH STACK
                </h3>
              </div>
              
              {/* Category Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevCategory}
                  className="p-2 border border-gray-300 dark:border-gray-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  aria-label="Previous category"
                >
                  <ChevronLeft size={16} />
                </button>
                
                <div className="flex-1 mx-4">
                  <div className="text-center">
                    <h4 className="font-mono text-sm font-bold text-black dark:text-white mb-2">
                      {skillsByCategory[currentCategory].category.toUpperCase()}
                    </h4>
                    <div className="flex justify-center space-x-1">
                      {skillsByCategory.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToCategory(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentCategory
                              ? 'bg-black dark:bg-white'
                              : 'bg-gray-300 dark:bg-gray-700'
                          }`}
                          aria-label={`Go to ${skillsByCategory[index].category}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={nextCategory}
                  className="p-2 border border-gray-300 dark:border-gray-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  aria-label="Next category"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              
              {/* Skills Display */}
              <div className="min-h-[160px] flex items-center justify-center">
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
                  {skillsByCategory[currentCategory].skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="flex flex-col items-center justify-center p-4 border border-gray-300 dark:border-gray-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 animate-fade-in"
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                      title={skill.name}
                    >
                      <i className={`${skill.icon} text-2xl mb-2`}></i>
                      <span className="font-mono text-xs font-medium text-center">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Category Counter */}
              <div className="text-center">
                <span className="font-mono text-xs text-gray-500 dark:text-gray-500">
                  {currentCategory + 1} / {skillsByCategory.length}
                </span>
              </div>
            </div>
          </div>
          
          {/* Bottom Accent Line */}
          <div className="flex justify-center">
            <div className="w-32 h-px bg-gray-300 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;