import React, { useState, useRef } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { getFeaturedProjects, formatTechStack } from '../utils/dataUtils';

// Helper to chunk array into groups
function chunkArray<T>(arr: T[], size: number): T[][] {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

const Projects: React.FC = () => {
  const featuredProjects = getFeaturedProjects();
  const desktopProjectGroups = chunkArray(featuredProjects, 4); // 4 for desktop
  const mobileProjectGroups = chunkArray(featuredProjects, 2); // 2 for mobile
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentMobileSlide, setCurrentMobileSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (currentSlide < desktopProjectGroups.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToMobileSlide = (index: number) => {
    setCurrentMobileSlide(index);
    // Scroll to the corresponding slide
    if (scrollContainerRef.current) {
      const slideWidth = 320 + 32; // card width + gap
      scrollContainerRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="projects" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-mono font-bold mb-4">
              PROJECTS
            </h2>
            <div className="w-16 h-px bg-black dark:bg-white mx-auto"></div>
          </div>

          {/* Projects Container with Navigation */}
          <div className="relative">
            {/* Desktop Navigation Arrows */}
            <div className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border border-gray-200/50 dark:border-gray-600/50 text-black dark:text-white opacity-70 hover:opacity-100 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
                aria-label="Previous projects"
              >
                <ChevronLeft size={20} />
              </button>
            </div>

            <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <button
                onClick={nextSlide}
                disabled={currentSlide === desktopProjectGroups.length - 1}
                className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border border-gray-200/50 dark:border-gray-600/50 text-black dark:text-white opacity-70 hover:opacity-100 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
                aria-label="Next projects"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Projects Display */}
            <div className="relative">
              {/* Desktop: 2x2 grid view */}
              <div className="hidden lg:flex justify-center">
                <div className="grid grid-cols-2 gap-6 max-w-2xl">
                  {(() => {
                    const projects = desktopProjectGroups[currentSlide] || [];
                    const placeholders = 4 - projects.length;
                    return [
                      ...projects.map((project) => (
                        <div
                          key={project.id}
                          className="w-[280px] h-[280px] border border-gray-200 dark:border-gray-800 p-6 flex flex-col hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group"
                        >
                          <div className="flex flex-col h-full">
                            <div className="space-y-2">
                              <h3 className="text-lg font-mono font-bold">
                                {project.name}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 font-mono text-xs leading-relaxed">
                                {project.description}
                              </p>
                              <p className="text-xs font-mono text-gray-500 dark:text-gray-500">
                                {formatTechStack(project.tech)}
                              </p>
                            </div>
                            <div className="flex items-center space-x-3 mt-auto">
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 font-mono text-xs border border-gray-200 dark:border-gray-800 px-3 py-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                              >
                                <Github size={12} />
                                <span>CODE</span>
                              </a>
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 font-mono text-xs border border-gray-200 dark:border-gray-800 px-3 py-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                              >
                                <ExternalLink size={12} />
                                <span>DEMO</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      )),
                      ...Array.from({ length: placeholders }, (_, i) => (
                        <div
                          key={`placeholder-${i}`}
                          className="w-[280px] h-[280px] opacity-0 pointer-events-none"
                        />
                      )),
                    ];
                  })()}
                </div>
              </div>

              {/* Mobile: Horizontal scroll with 2 projects per slide */}
              <div 
                ref={scrollContainerRef}
                className="lg:hidden flex gap-8 md:gap-12 overflow-x-auto pb-4 scrollbar-hide"
              >
                {mobileProjectGroups.map((pair, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-8 min-w-[320px] max-w-xs flex-shrink-0"
                  >
                    {pair.map((project) => (
                      <div
                        key={project.id}
                        className="w-[320px] h-[320px] border border-gray-200 dark:border-gray-800 p-8 flex flex-col hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group"
                      >
                        <div className="flex flex-col h-full">
                          <div className="space-y-2">
                            <h3 className="text-xl font-mono font-bold">
                              {project.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                              {project.description}
                            </p>
                            <p className="text-xs font-mono text-gray-500 dark:text-gray-500">
                              {formatTechStack(project.tech)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4 mt-auto">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-2 font-mono text-xs border border-gray-200 dark:border-gray-800 px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                            >
                              <Github size={14} />
                              <span>CODE</span>
                            </a>
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-2 font-mono text-xs border border-gray-200 dark:border-gray-800 px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                            >
                              <ExternalLink size={14} />
                              <span>DEMO</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Slide Indicators */}
            <div className="hidden lg:flex justify-center mt-8 space-x-2">
              {desktopProjectGroups.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentSlide
                      ? 'bg-black dark:bg-white'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Mobile Slide Indicators */}
            <div className="lg:hidden flex justify-center mt-8 space-x-2">
              {mobileProjectGroups.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToMobileSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentMobileSlide
                      ? 'bg-black dark:bg-white'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;