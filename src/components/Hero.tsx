import React, { useEffect, useRef, useCallback } from 'react';
import { personalInfo } from '../data/mockData';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Throttled mouse move handler for better performance
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      
      requestAnimationFrame(() => {
        if (heroRef.current) {
          heroRef.current.style.transform = `perspective(1000px) rotateX(${y * 1}deg) rotateY(${x * 1}deg)`;
        }
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (heroRef.current) {
      heroRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  }, []);

  useEffect(() => {
    // Only add mouse effects on non-mobile devices
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    let timeoutId: number;
    const throttledMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => handleMouseMove(e), 16); // ~60fps
    };

    window.addEventListener('mousemove', throttledMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timeoutId);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-start pt-16 md:justify-center md:pt-0 relative overflow-hidden">
      {/* Simplified background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Reduced gradient blobs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-400/10 to-red-600/10 rounded-full blur-3xl"></div>
        
        {/* Reduced floating particles - only for desktop */}
        <div className="hidden md:block">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute particle opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            >
              <div className="w-1 h-1 bg-black dark:bg-white rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div 
        ref={heroRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 transition-transform duration-300 ease-out"
      >
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-mono font-bold tracking-tight">
              <span className="inline-block transition-all duration-500 hover:scale-105 cursor-default">
                {personalInfo.name}
              </span>
            </h1>
            
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-black dark:via-white to-transparent mx-auto"></div>
            
            <div className="space-y-4">
              <p className="text-xl sm:text-2xl font-mono text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {personalInfo.title}
              </p>
              <p className="text-lg font-mono text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                {personalInfo.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-700 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-300 dark:bg-gray-700 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;