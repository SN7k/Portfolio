import React, { useRef, useEffect } from 'react';
import { Mail, Github, Linkedin, Send, MapPin, Clock } from 'lucide-react';
import { personalInfo } from '../data/mockData';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Contact: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const floatingRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (floatingRef.current) {
        const rect = floatingRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        
        floatingRef.current.style.transform = `perspective(1000px) rotateX(${y * 5}deg) rotateY(${x * 5}deg) translateZ(20px)`;
      }
    };

    const handleMouseLeave = () => {
      if (floatingRef.current) {
        floatingRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      }
    };

    const element = floatingRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);
  
  return (
    <>
      <section id="contact" className="py-24 relative overflow-hidden" ref={ref}>
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-teal-600/10 rounded-full animated-blob blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-indigo-600/10 rounded-full animated-blob blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-20">
            <div className={`text-center transition-all duration-1000 ${isVisible ? 'reveal-animation visible' : 'reveal-animation'}`}>
              <h2 className="text-4xl sm:text-5xl font-mono font-bold mb-6 relative group">
                <span className="hover:gradient-text transition-all duration-500">GET IN TOUCH</span>
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-black dark:via-white to-transparent mx-auto"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
              {/* Contact Info */}
              <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'reveal-left visible stagger-2' : 'reveal-left'}`}>
                <div className="glass-morphism p-8 rounded-2xl card-hover-effect">
                  <h3 className="text-2xl font-mono font-bold gradient-text mb-6">
                    LET'S CONNECT
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-mono text-sm leading-relaxed mb-8">
                    Always open to discussing new opportunities, collaborations, 
                    or just having a conversation about minimal design and clean code.
                  </p>
                  
                  <div className="space-y-6">
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="group flex items-center space-x-4 font-mono text-sm hover:text-blue-500 transition-all duration-300 p-4 glass-morphism rounded-xl magnetic-hover"
                    >
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Mail size={18} className="text-white" />
                      </div>
                      <div>
                        <div className="font-bold">EMAIL</div>
                        <div className="text-gray-500 dark:text-gray-400">{personalInfo.email}</div>
                      </div>
                    </a>
                    
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-4 font-mono text-sm hover:text-purple-500 transition-all duration-300 p-4 glass-morphism rounded-xl magnetic-hover"
                    >
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Github size={18} className="text-white" />
                      </div>
                      <div>
                        <div className="font-bold">GITHUB</div>
                        <div className="text-gray-500 dark:text-gray-400">@sn7k</div>
                      </div>
                    </a>
                    
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-4 font-mono text-sm hover:text-cyan-500 transition-all duration-300 p-4 glass-morphism rounded-xl magnetic-hover"
                    >
                      <div className="p-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Linkedin size={18} className="text-white" />
                      </div>
                      <div>
                        <div className="font-bold">LINKEDIN</div>
                        <div className="text-gray-500 dark:text-gray-400">Professional Network</div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="glass-morphism p-6 rounded-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <MapPin size={16} className="text-emerald-500" />
                      <div className="font-mono text-xs">
                        <div className="font-bold">LOCATION</div>
                        <div className="text-gray-500 dark:text-gray-400">India</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock size={16} className="text-blue-500" />
                      <div className="font-mono text-xs">
                        <div className="font-bold">RESPONSE</div>
                        <div className="text-gray-500 dark:text-gray-400">24-48 hrs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Card */}
              <div className={`transition-all duration-1000 ${isVisible ? 'reveal-right visible stagger-3' : 'reveal-right'}`}>
                <div 
                  ref={floatingRef}
                  className="glass-morphism p-8 rounded-2xl h-full flex flex-col justify-center items-center text-center space-y-6 transition-transform duration-300 ease-out"
                >
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6 floating-element">
                      <Send size={32} className="text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-mono font-bold gradient-text">
                      READY TO COLLABORATE?
                    </h3>
                    <p className="font-mono text-sm text-gray-600 dark:text-gray-400 max-w-sm">
                      Let's build something amazing together. Drop me a message and let's discuss your next project.
                    </p>
                  </div>
                  
                  <a
                    href={`mailto:${personalInfo.email}?subject=Let's Collaborate&body=Hi Shombhunath,%0D%0A%0D%0AI'd like to discuss a potential collaboration...`}
                    className="inline-flex items-center space-x-3 font-mono text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl modern-button magnetic-hover glow-on-hover"
                  >
                    <Send size={16} />
                    <span>START CONVERSATION</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Floating GitHub Button */}
      <a
        href={personalInfo.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open GitHub profile"
        className="fixed bottom-8 right-8 z-50 group"
        tabIndex={0}
      >
        <div className="relative">
          <div className="w-16 h-16 glass-morphism rounded-full shadow-2xl flex items-center justify-center magnetic-hover glow-on-hover floating-element">
            <Github size={28} className="text-black dark:text-white group-hover:text-blue-500 transition-colors duration-300" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="glass-morphism px-3 py-2 rounded-lg whitespace-nowrap">
              <span className="font-mono text-xs font-bold">VIEW GITHUB</span>
            </div>
          </div>
        </div>
      </a>
    </>
  );
};

export default Contact;