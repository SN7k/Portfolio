import React, {} from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { personalInfo } from '../data/mockData';

const Contact: React.FC = () => {
 
  
  return (
    <>
      <section id="contact" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-mono font-bold mb-4">
                GET IN TOUCH
              </h2>
              <div className="w-16 h-px bg-black dark:bg-white mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-mono font-bold">
                    LET'S CONNECT
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-mono text-sm leading-relaxed">
                    Always open to discussing new opportunities, collaborations, 
                    or just having a conversation about minimal design and clean code.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center space-x-3 font-mono text-sm hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                  >
                    <Mail size={16} />
                    <span>{personalInfo.email.toUpperCase()}</span>
                  </a>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 font-mono text-sm hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                  >
                    <Github size={16} />
                    <span>GITHUB</span>
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 font-mono text-sm hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                  >
                    <Linkedin size={16} />
                    <span>LINKEDIN</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Floating GitHub Accessibility Button */}
      <a
        href={personalInfo.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open GitHub profile"
        className="fixed bottom-6 right-6 z-50 text-black dark:text-white rounded-full shadow-lg p-4 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-gray-400 transition-transform hover:scale-110"
        tabIndex={0}
      >
        {/* Minimal, outlined, transparent GitHub SVG icon */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.14-1.1-1.44-1.1-1.44-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
        </svg>
      </a>
    </>
  );
};

export default Contact;