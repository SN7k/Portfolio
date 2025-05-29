import { useEffect, useRef } from 'react';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { Navigation } from './components/Navigation';
import { ScrollProgress } from './components/ScrollProgress';
import { ScrollProvider, useScroll } from './context/ScrollContext';
import { ThemeProvider } from './context/ThemeContext';

// Main App component
function App() {
  return (
    <ThemeProvider>
      <ScrollProvider>
        <PortfolioContent />
      </ScrollProvider>
    </ThemeProvider>
  );
}

// Inner component that uses ScrollContext
function PortfolioContent() {
  const { activeSection, setActiveSection } = useScroll();
  const sectionsRef = useRef<HTMLDivElement>(null);

  // Handle navigation clicks
  useEffect(() => {
    if (!activeSection) return;
    
    // Map section ID to section index
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'contact'];
    const sectionIndex = sectionIds.indexOf(activeSection);
    
    if (sectionIndex !== -1) {
      // Scroll to the section
      const targetY = sectionIndex * window.innerHeight;
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    }
  }, [activeSection]);

  // Handle manual scrolling to update active section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionsRef.current) return;
      
      // Get current scroll position
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate which section is currently in view
      const currentSectionIndex = Math.floor(scrollPosition / windowHeight);
      
      // Update active section
      const sectionIds = ['hero', 'about', 'skills', 'projects', 'contact'];
      if (currentSectionIndex >= 0 && currentSectionIndex < sectionIds.length) {
        setActiveSection(sectionIds[currentSectionIndex] as any);
      }
    };

    // Set the main container height and handle resize events
    const updateContainerHeight = () => {
      if (sectionsRef.current) {
        // Set exact height for the container to prevent any extra space
        sectionsRef.current.style.height = `${window.innerHeight * 5}px`; // 5 sections
        
        // Ensure each section has the correct height
        const sections = Array.from(sectionsRef.current.children);
        sections.forEach((section) => {
          const sectionElement = section as HTMLElement;
          sectionElement.style.height = `${window.innerHeight}px`;
        });
      }
    };
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateContainerHeight);
    
    // Initial setup
    updateContainerHeight();
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateContainerHeight);
    };
  }, [setActiveSection]);

  return (
    <div className="relative font-sans text-gray-900 dark:text-gray-100 bg-neutral-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <Navigation />
      <ScrollProgress />
      <main className="relative">
        <div ref={sectionsRef} className="relative">
          <div className="section-container">
            <section>
              <Hero />
            </section>
          </div>
          <div className="section-container">
            <section>
              <About />
            </section>
          </div>
          <div className="section-container">
            <section>
              <Skills />
            </section>
          </div>
          <div className="section-container">
            <section>
              <Projects />
            </section>
          </div>
          <div className="section-container">
            <section>
              <Contact />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;