import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { getFeaturedProjects} from '../utils/dataUtils';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

const Projects: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const featuredProjects = getFeaturedProjects();
  const desktopProjectGroups = chunkArray(featuredProjects, 4);
  const mobileProjectGroups = chunkArray(featuredProjects, 2);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentMobileSlide, setCurrentMobileSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (isTransitioning || currentSlide >= desktopProjectGroups.length - 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(currentSlide + 1);
      setIsTransitioning(false);
    }, 300);
  };

  const prevSlide = () => {
    if (isTransitioning || currentSlide <= 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(currentSlide - 1);
      setIsTransitioning(false);
    }, 300);
  };

  const goToMobileSlide = (index: number) => {
    setCurrentMobileSlide(index);
    if (scrollContainerRef.current) {
      const slideWidth = 360 + 32;
      scrollContainerRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      });
    }
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning && desktopProjectGroups.length > 1) {
        if (currentSlide < desktopProjectGroups.length - 1) {
          nextSlide();
        } else {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentSlide(0);
            setIsTransitioning(false);
          }, 300);
        }
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide, isTransitioning, desktopProjectGroups.length]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full animated-blob blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full animated-blob blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-20">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'reveal-animation visible' : 'reveal-animation'}`}>
            <h2 className="text-4xl sm:text-5xl font-mono font-bold mb-6 relative group">
              <span className="hover:gradient-text transition-all duration-500">PROJECTS</span>
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-black dark:via-white to-transparent mx-auto"></div>
          </div>

          {/* Projects Container */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'reveal-animation visible stagger-2' : 'reveal-animation'}`}>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="p-4 glass-morphism rounded-full magnetic-hover glow-on-hover transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
                aria-label="Previous projects"
              >
                <ChevronLeft size={24} className="text-cyan-500" />
              </button>
            </div>

            <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={nextSlide}
                disabled={currentSlide === desktopProjectGroups.length - 1}
                className="p-4 glass-morphism rounded-full magnetic-hover glow-on-hover transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
                aria-label="Next projects"
              >
                <ChevronRight size={24} className="text-purple-500" />
              </button>
            </div>

            {/* Projects Display */}
            <div className="relative">
              {/* Desktop: 2x2 grid view */}
              <div className="hidden lg:flex justify-center">
                <div className={`grid grid-cols-2 gap-8 max-w-4xl transition-all duration-500 ${
                  isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
                }`}>
                  {(() => {
                    const projects = desktopProjectGroups[currentSlide] || [];
                    const placeholders = 4 - projects.length;
                    return [
                      ...projects.map((project, index) => (
                        <div
                          key={project.id}
                          className="group w-[320px] h-[400px] glass-morphism rounded-2xl overflow-hidden card-hover-effect magnetic-hover"
                          style={{ animationDelay: `${index * 150}ms` }}
                        >
                          {/* Project Image */}
                          <div className="project-image-container h-48 relative overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.name}
                              className="project-image w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="project-overlay">
                              <div className="flex space-x-4">
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-3 glass-morphism rounded-full hover:scale-110 transition-all duration-300 glow-on-hover"
                                >
                                  <Github size={20} className="text-white" />
                                </a>
                                <a
                                  href={project.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-3 glass-morphism rounded-full hover:scale-110 transition-all duration-300 glow-on-hover"
                                >
                                  <Play size={20} className="text-white" />
                                </a>
                              </div>
                            </div>
                            <div className="absolute top-4 right-4 px-3 py-1 glass-morphism rounded-full">
                              <span className="text-xs font-mono text-white font-bold">FEATURED</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col h-full p-6">
                            <div className="space-y-3 flex-grow">
                              <h3 className="text-xl font-mono font-bold group-hover:gradient-text transition-all duration-300">
                                {project.name}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 font-mono text-sm leading-relaxed line-clamp-3">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {project.tech.slice(0, 3).map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="px-2 py-1 text-xs font-mono bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {project.tech.length > 3 && (
                                  <span className="px-2 py-1 text-xs font-mono text-gray-500">
                                    +{project.tech.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 mt-6">
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center space-x-2 font-mono text-xs glass-morphism px-4 py-2 rounded-lg modern-button magnetic-hover"
                              >
                                <Github size={14} />
                                <span>CODE</span>
                              </a>
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center space-x-2 font-mono text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg modern-button magnetic-hover"
                              >
                                <ExternalLink size={14} />
                                <span>DEMO</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      )),
                      ...Array.from({ length: placeholders }, (_, i) => (
                        <div
                          key={`placeholder-${i}`}
                          className="w-[320px] h-[400px] opacity-0 pointer-events-none"
                        />
                      )),
                    ];
                  })()}
                </div>
              </div>

              {/* Mobile: Horizontal scroll */}
              <div 
                ref={scrollContainerRef}
                className="lg:hidden flex gap-8 overflow-x-auto pb-4 scrollbar-hide"
              >
                {mobileProjectGroups.map((pair, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-8 min-w-[360px] flex-shrink-0"
                  >
                    {pair.map((project, index) => (
                      <div
                        key={project.id}
                        className="group w-[360px] h-[450px] glass-morphism rounded-2xl overflow-hidden card-hover-effect"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        {/* Project Image */}
                        <div className="project-image-container h-52 relative overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="project-image w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="project-overlay">
                            <div className="flex space-x-4">
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 glass-morphism rounded-full hover:scale-110 transition-all duration-300"
                              >
                                <Github size={22} className="text-white" />
                              </a>
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 glass-morphism rounded-full hover:scale-110 transition-all duration-300"
                              >
                                <Play size={22} className="text-white" />
                              </a>
                            </div>
                          </div>
                          <div className="absolute top-4 right-4 px-3 py-1 glass-morphism rounded-full">
                            <span className="text-xs font-mono text-white font-bold">FEATURED</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col h-full p-6">
                          <div className="space-y-3 flex-grow">
                            <h3 className="text-xl font-mono font-bold group-hover:gradient-text transition-all duration-300">
                              {project.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 font-mono text-sm leading-relaxed">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {project.tech.slice(0, 4).map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-2 py-1 text-xs font-mono bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.tech.length > 4 && (
                                <span className="px-2 py-1 text-xs font-mono text-gray-500">
                                  +{project.tech.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 mt-6">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center space-x-2 font-mono text-xs glass-morphism px-4 py-3 rounded-lg modern-button"
                            >
                              <Github size={16} />
                              <span>CODE</span>
                            </a>
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center space-x-2 font-mono text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-lg modern-button"
                            >
                              <ExternalLink size={16} />
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
            <div className="hidden lg:flex justify-center mt-12 space-x-3">
              {desktopProjectGroups.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setCurrentSlide(index);
                        setIsTransitioning(false);
                      }, 300);
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-500 hover:scale-125 ${
                    index === currentSlide
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
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
                  className={`w-3 h-3 rounded-full transition-all duration-500 hover:scale-125 ${
                    index === currentMobileSlide
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
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