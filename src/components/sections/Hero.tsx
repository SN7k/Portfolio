import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { useScroll } from '../../context/ScrollContext';

export const Hero = () => {
  const { scrollToSection } = useScroll();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = () => {
      if (titleRef.current) {
        titleRef.current.style.opacity = '1';
        titleRef.current.style.transform = 'translateY(0)';
      }
      
      setTimeout(() => {
        if (subtitleRef.current) {
          subtitleRef.current.style.opacity = '1';
          subtitleRef.current.style.transform = 'translateY(0)';
        }
      }, 300);
      
      setTimeout(() => {
        if (ctaRef.current) {
          ctaRef.current.style.opacity = '1';
          ctaRef.current.style.transform = 'translateY(0)';
        }
      }, 600);
    };
    
    animate();
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-neutral-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="absolute w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-500/10 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-300/20 dark:bg-cyan-500/10 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-pink-300/20 dark:bg-pink-500/10 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 transition-all duration-700 opacity-0 transform translate-y-8"
          >
            <span className="block dark:text-white">Hi, I'm </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
              SNK
            </span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 md:mb-10 transition-all duration-700 opacity-0 transform translate-y-8 delay-300"
          >
            I create beautiful digital experiences 
            <span className="hidden sm:inline">
              {" "}that solve problems and delight users
            </span>
          </p>
          
          <div 
            ref={ctaRef}
            className="flex flex-row items-center justify-center space-x-3 transition-all duration-700 opacity-0 transform translate-y-8 delay-600"
          >
            <button 
              onClick={() => scrollToSection('about')}
              className="px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-full text-xs sm:text-sm md:text-base font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors hover:shadow-lg w-auto"
            >
              Explore My Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-full text-xs sm:text-sm md:text-base font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors w-auto"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={() => scrollToSection('about')}
      >
        <ArrowDown className="text-gray-600 dark:text-gray-400" size={28} />
      </div>
    </section>
  );
};