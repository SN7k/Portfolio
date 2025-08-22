import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getSkillsByCategories } from '../utils/dataUtils';
import { aboutSection } from '../data/mockData';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const About: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const skillsByCategory = getSkillsByCategories();
  const [currentCategory, setCurrentCategory] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  const nextCategory = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCategory((prev) => (prev + 1) % skillsByCategory.length);
      setIsTransitioning(false);
    }, 200);
  };

  const prevCategory = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCategory((prev) => (prev - 1 + skillsByCategory.length) % skillsByCategory.length);
      setIsTransitioning(false);
    }, 200);
  };

  const goToCategory = (index: number) => {
    if (isTransitioning || index === currentCategory) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCategory(index);
      setIsTransitioning(false);
    }, 200);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextCategory();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-purple-600/10 rounded-full animated-blob blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-gradient-to-r from-pink-400/10 to-red-600/10 rounded-full animated-blob blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-20">
          {/* Header */}
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'reveal-animation visible' : 'reveal-animation'}`}>
            <h2 className="text-4xl sm:text-5xl font-mono font-bold mb-6 relative group">
              <span className="hover:gradient-text transition-all duration-500">ABOUT ME</span>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-black dark:via-white to-transparent mx-auto"></div>
          </div>
          
          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-16 lg:gap-20">
            {/* Bio Section */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'reveal-left visible stagger-2' : 'reveal-left'}`}>
              <div className="glass-morphism p-8 rounded-2xl card-hover-effect">
                <div className="border-l-4 border-gradient-to-b from-blue-500 to-purple-500 pl-6">
                  <h3 className="text-xl font-mono font-bold mb-4 gradient-text">
                    BACKGROUND
                  </h3>
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-mono text-sm leading-relaxed space-y-4">
                  {aboutSection.background.map((paragraph, index) => (
                    <p key={index} className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Tech Stack Section */}
            <div className={`lg:col-span-2 space-y-8 transition-all duration-1000 ${isVisible ? 'reveal-right visible stagger-3' : 'reveal-right'}`}>
              <div className="glass-morphism p-8 rounded-2xl">
                <div className="border-l-4 border-gradient-to-b from-purple-500 to-pink-500 pl-6 mb-8">
                  <h3 className="text-xl font-mono font-bold gradient-text">
                    TECH STACK
                  </h3>
                </div>
                
                {/* Category Navigation */}
                <div className="flex items-center justify-between mb-8">
                  <button
                    onClick={prevCategory}
                    className="p-3 glass-morphism rounded-full magnetic-hover glow-on-hover transition-all duration-300 hover:scale-110"
                    aria-label="Previous category"
                  >
                    <ChevronLeft size={20} className="text-blue-500" />
                  </button>
                  
                  <div className="flex-1 mx-6">
                    <div className="text-center">
                      <h4 className="font-mono text-lg font-bold gradient-text mb-4">
                        {skillsByCategory[currentCategory].category.toUpperCase()}
                      </h4>
                      <div className="flex justify-center space-x-2">
                        {skillsByCategory.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToCategory(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-500 hover:scale-125 ${
                              index === currentCategory
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
                                : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                            }`}
                            aria-label={`Go to ${skillsByCategory[index].category}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={nextCategory}
                    className="p-3 glass-morphism rounded-full magnetic-hover glow-on-hover transition-all duration-300 hover:scale-110"
                    aria-label="Next category"
                  >
                    <ChevronRight size={20} className="text-purple-500" />
                  </button>
                </div>
                
                {/* Skills Display */}
                <div 
                  ref={skillsRef}
                  className={`min-h-[200px] flex items-center justify-center transition-all duration-500 ${
                    isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
                  }`}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                    {skillsByCategory[currentCategory].skills.map((skill, index) => (
                      <div
                        key={skill.name}
                        className="group flex flex-col items-center justify-center p-6 glass-morphism rounded-xl card-hover-effect magnetic-hover cursor-pointer"
                        style={{
                          animationDelay: `${index * 100}ms`
                        }}
                        title={skill.name}
                      >
                        <div className="relative">
                          <i className={`${skill.icon} text-3xl mb-3 transition-all duration-300 group-hover:scale-125 group-hover:text-blue-500`}></i>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <span className="font-mono text-xs font-medium text-center group-hover:text-blue-500 transition-colors duration-300">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Category Counter */}
                <div className="text-center mt-6">
                  <span className="font-mono text-sm text-gray-500 dark:text-gray-400">
                    {currentCategory + 1} / {skillsByCategory.length}
                  </span>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1 mt-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-500"
                      style={{ width: `${((currentCategory + 1) / skillsByCategory.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Accent */}
          <div className="flex justify-center">
            <div className={`w-48 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent transition-all duration-1000 ${isVisible ? 'reveal-animation visible stagger-5' : 'reveal-animation'}`}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;