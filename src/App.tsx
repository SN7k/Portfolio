import React, { useEffect, useRef } from 'react';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { Navigation } from './components/Navigation';
import { ScrollProgress } from './components/ScrollProgress';
import { ScrollProvider } from './context/ScrollContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionsRef.current) return;
      
      const sections = Array.from(sectionsRef.current.children);
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      sections.forEach((section, index) => {
        const sectionElement = section as HTMLElement;
        const sectionTop = index * windowHeight;
        const sectionBottom = sectionTop + windowHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          // Current section - stays fixed
          sectionElement.style.position = 'fixed';
          sectionElement.style.top = '0';
          sectionElement.style.transform = 'translateY(0)';
          sectionElement.style.opacity = '1';
          sectionElement.style.zIndex = '1';
        } else if (scrollPosition < sectionTop) {
          // Sections below - prepare to slide up
          sectionElement.style.position = 'fixed';
          sectionElement.style.top = '0';
          sectionElement.style.transform = 'translateY(100%)';
          sectionElement.style.opacity = '1';
          sectionElement.style.zIndex = '2';
        } else {
          // Sections above - move out of view
          sectionElement.style.position = 'fixed';
          sectionElement.style.top = '0';
          sectionElement.style.transform = 'translateY(-100%)';
          sectionElement.style.opacity = '0';
          sectionElement.style.zIndex = '0';
        }

        // Create sliding card effect for the next section
        if (scrollPosition > sectionTop - windowHeight && scrollPosition < sectionTop) {
          const progress = (scrollPosition - (sectionTop - windowHeight)) / windowHeight;
          const translateY = 100 - (progress * 100);
          const scale = 0.95 + (progress * 0.05);
          const opacity = progress;

          sectionElement.style.transform = `translateY(${translateY}%) scale(${scale})`;
          sectionElement.style.opacity = String(opacity);
          sectionElement.style.zIndex = '2';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    // Set the main container height
    if (sectionsRef.current) {
      sectionsRef.current.style.height = `${window.innerHeight * 5}px`; // 5 sections
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider>
      <ScrollProvider>
        <div className="relative font-sans text-gray-900 dark:text-gray-100 bg-neutral-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
          <Navigation />
          <ScrollProgress />
          <main ref={sectionsRef} className="relative">
            <section className="section-container">
              <Hero />
            </section>
            <section className="section-container">
              <About />
            </section>
            <section className="section-container">
              <Skills />
            </section>
            <section className="section-container">
              <Projects />
            </section>
            <section className="section-container">
              <Contact />
            </section>
          </main>
        </div>
      </ScrollProvider>
    </ThemeProvider>
  );
}

export default App;