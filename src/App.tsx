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

// Main App component that doesn't use ScrollContext
function App() {
  return (
    <ThemeProvider>
      <ScrollProvider>
        <PortfolioContent />
      </ScrollProvider>
    </ThemeProvider>
  );
}

// Inner component that can safely use ScrollContext

function PortfolioContent() {
  const sectionsRef = useRef<HTMLDivElement>(null);
  
  // We'll move the ScrollContext usage to this component
  // which is rendered inside the ScrollProvider
  const { setActiveSection } = useScroll();

  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: number | null = null;
    let touchStartY: number | null = null;
    let touchEndY: number | null = null;
    let lastTouchTime = 0;
    let lastWheelTime = 0;
    let wheelDirection = 0;
    
    // Function to smoothly scroll to a specific section
    const scrollToSection = (sectionIndex: number) => {
      if (isScrolling) return;
      isScrolling = true;
      
      const targetY = sectionIndex * window.innerHeight;
      const startPosition = window.scrollY;
      const distance = targetY - startPosition;
      
      // Optimized scrolling for mobile devices
      const isMobile = window.innerWidth < 768;
      const duration = isMobile ? 250 : 600; // Much faster on mobile for better responsiveness
      let startTime: number;
      
      // Smooth scroll animation function with improved mobile performance
      const animateScroll = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        
        // Use a more aggressive easing for mobile for better responsiveness
        const progress = Math.min(elapsed / duration, 1);
        let easeProgress;
        
        if (isMobile) {
          // Linear easing for mobile - most responsive and predictable
          easeProgress = progress;
        } else {
          // Smoother easing for desktop
          easeProgress = progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        }
        
        window.scrollTo({
          top: startPosition + distance * easeProgress,
          behavior: 'auto' // Use our custom animation instead of 'smooth'
        });
        
        if (elapsed < duration) {
          requestAnimationFrame(animateScroll);
        } else {
          // Ensure we end exactly at the target position
          window.scrollTo({
            top: targetY,
            behavior: 'auto'
          });
          
          // Reset scrolling state after a shorter delay on mobile
          setTimeout(() => {
            isScrolling = false;
          }, isMobile ? 30 : 100);
        }
      };
      
      // Start the animation
      requestAnimationFrame(animateScroll);
    };
    
    // Function to check if we need to move to the next section
    const checkSectionTransition = (delta: number) => {
      // Only handle section transitions on mobile if we're at the edge of a section
      const isMobile = window.innerWidth < 768;
      const currentSectionIndex = Math.round(window.scrollY / window.innerHeight);
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      
      // Get the current section element
      const sectionElements = Array.from(sectionsRef.current?.children || []);
      const currentSectionElement = sectionElements[currentSectionIndex] as HTMLElement;
      
      if (!currentSectionElement) return false;
      
      // Get the content height of the current section
      const sectionContent = currentSectionElement.querySelector('section');
      if (!sectionContent) return false;
      
      // Get the scroll container (the section element itself)
      const scrollContainer = sectionContent;
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      
      // Calculate how close we are to the bottom or top
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 2;
      const isAtTop = scrollTop <= 2;
      
      // For mobile: Only transition when we're exactly at the edge and trying to scroll further
      if (isMobile) {
        // If scrolling down and we're at the bottom of the section content, go to next section
        if (delta > 0 && isAtBottom && currentSectionIndex < sections.length - 1) {
          // We're at the bottom of the content and scrolling down - go to next section
          scrollToSection(currentSectionIndex + 1);
          return true;
        }
        
        // If scrolling up and we're at the top of the section, go to previous section
        if (delta < 0 && isAtTop && currentSectionIndex > 0) {
          // We're at the top of the content and scrolling up - go to previous section
          scrollToSection(currentSectionIndex - 1);
          return true;
        }
      } else {
        // Desktop behavior - smoother transitions
        // If scrolling down and we're at the bottom of the section content, go to next section
        if (delta > 0 && scrollTop + clientHeight >= scrollHeight - 20 && currentSectionIndex < sections.length - 1) {
          scrollToSection(currentSectionIndex + 1);
          return true;
        }
        
        // If scrolling up and we're at the top of the section, go to previous section
        if (delta < 0 && scrollTop <= 20 && currentSectionIndex > 0) {
          scrollToSection(currentSectionIndex - 1);
          return true;
        }
      }
      
      return false;
    };
    
    // Enhanced touch events for mobile devices with section-specific scrolling
    const handleTouchStart = (e: TouchEvent) => {
      // Store touch start position
      touchStartY = e.touches[0].clientY;
      touchEndY = null;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      // Update end position during movement
      touchEndY = e.touches[0].clientY;
      
      // Only handle special cases for mobile
      const isMobile = window.innerWidth < 768;
      if (!isMobile) return;
      
      // Check if we're at the edge of a section and should prevent default scrolling
      if (touchStartY !== null && touchEndY !== null) {
        const touchDelta = touchStartY - touchEndY;
        const currentSectionIndex = Math.round(window.scrollY / window.innerHeight);
        const sectionElements = Array.from(sectionsRef.current?.children || []);
        const currentSectionElement = sectionElements[currentSectionIndex] as HTMLElement;
        
        if (currentSectionElement) {
          const sectionContent = currentSectionElement.querySelector('section');
          if (sectionContent) {
            // Check if we're at the edge of scrollable content
            const isAtBottom = sectionContent.scrollTop + sectionContent.clientHeight >= sectionContent.scrollHeight - 2;
            const isAtTop = sectionContent.scrollTop <= 2;
            
            // Prevent overscroll bounce at document edges
            if ((currentSectionIndex === 0 && isAtTop && touchDelta < 0) || 
                (currentSectionIndex === sectionElements.length - 1 && isAtBottom && touchDelta > 0)) {
              e.preventDefault();
            }
          }
        }
      }
    };
    
    const handleTouchEnd = () => {
      if (!touchStartY || !touchEndY) return;
      
      // Calculate swipe distance and direction
      const swipeDistance = touchStartY - touchEndY;
      const swipeDirection = swipeDistance > 0 ? 1 : -1; // 1 for up (next section), -1 for down (prev section)
      
      // Get device type
      const isMobile = window.innerWidth < 768;
      
      // Get current section information
      const currentSectionIndex = Math.round(window.scrollY / window.innerHeight);
      const sectionElements = Array.from(sectionsRef.current?.children || []);
      const currentSectionElement = sectionElements[currentSectionIndex] as HTMLElement;
      
      if (currentSectionElement) {
        const sectionContent = currentSectionElement.querySelector('section');
        if (sectionContent) {
          // Check if we're at the edge of scrollable content
          const isAtBottom = sectionContent.scrollTop + sectionContent.clientHeight >= sectionContent.scrollHeight - 2;
          const isAtTop = sectionContent.scrollTop <= 2;
          
          // For mobile: Only transition when we're exactly at the edge and trying to scroll further
          if (isMobile) {
            if ((swipeDirection > 0 && isAtBottom) || (swipeDirection < 0 && isAtTop)) {
              // Handle section transition at edges
              const minSwipeDistance = Math.min(40, window.innerHeight * 0.06);
              
              if (Math.abs(swipeDistance) >= minSwipeDistance) {
                // Prevent rapid consecutive swipes
                const now = Date.now();
                const minSwipeInterval = 300;
                
                if (now - lastTouchTime < minSwipeInterval) {
                  touchStartY = null;
                  touchEndY = null;
                  return;
                }
                
                lastTouchTime = now;
                
                // Calculate target section
                const targetSection = Math.max(0, Math.min(4, currentSectionIndex + swipeDirection));
                
                // Update active section
                const sectionIds = ['hero', 'about', 'skills', 'projects', 'contact'];
                if (setActiveSection && targetSection >= 0 && targetSection < sectionIds.length) {
                  setActiveSection(sectionIds[targetSection] as any);
                }
                
                // Only scroll if we're changing sections
                if (targetSection !== currentSectionIndex) {
                  scrollToSection(targetSection);
                }
              }
            }
          } else {
            // Desktop behavior - handle swipe gestures more liberally
            // Check if we should transition between sections
            if (checkSectionTransition(swipeDistance)) {
              // Already handled by the transition function
            } else {
              // Handle normal swipe gestures for section changes
              const minSwipeDistance = Math.min(50, window.innerHeight * 0.08);
              
              if (Math.abs(swipeDistance) >= minSwipeDistance) {
                // Prevent rapid consecutive swipes
                const now = Date.now();
                const minSwipeInterval = 500;
                
                if (now - lastTouchTime < minSwipeInterval) {
                  touchStartY = null;
                  touchEndY = null;
                  return;
                }
                
                lastTouchTime = now;
                
                // Calculate target section
                const targetSection = Math.max(0, Math.min(4, currentSectionIndex + swipeDirection));
                
                // Update active section
                const sectionIds = ['hero', 'about', 'skills', 'projects', 'contact'];
                if (setActiveSection && targetSection >= 0 && targetSection < sectionIds.length) {
                  setActiveSection(sectionIds[targetSection] as any);
                }
                
                // Only scroll if we're changing sections
                if (targetSection !== currentSectionIndex) {
                  scrollToSection(targetSection);
                }
              }
            }
          }
        }
      }
      
      // Reset touch tracking
      touchStartY = null;
      touchEndY = null;
    };
    
    // Enhanced wheel event handling for continuous scrolling between sections
    const handleWheel = (e: WheelEvent) => {
      // Get device type
      const isMobile = window.innerWidth < 768;
      
      // Prevent default only if we're handling section transitions
      const now = Date.now();
      const wheelDelay = isMobile ? 150 : 100; // Longer delay on mobile for better control
      
      // Track wheel direction for continuous scrolling
      const newDirection = e.deltaY > 0 ? 1 : -1;
      
      // If direction changed or enough time passed, update direction
      if (newDirection !== wheelDirection || now - lastWheelTime > wheelDelay) {
        wheelDirection = newDirection;
      }
      
      // Throttle wheel events to prevent too many transitions
      if (now - lastWheelTime < wheelDelay) {
        return;
      }
      
      lastWheelTime = now;
      
      // Get current section and its content
      const currentSectionIndex = Math.round(window.scrollY / window.innerHeight);
      const sectionElements = Array.from(sectionsRef.current?.children || []);
      const currentSectionElement = sectionElements[currentSectionIndex] as HTMLElement;
      
      if (currentSectionElement) {
        const sectionContent = currentSectionElement.querySelector('section');
        if (sectionContent) {
          // Check if the section is scrollable (content height > container height)
          const isScrollable = sectionContent.scrollHeight > sectionContent.clientHeight;
          
          // On mobile, if the section isn't scrollable or we're at the edges, check for section transition
          if (isMobile) {
            if (!isScrollable || 
                (e.deltaY > 0 && sectionContent.scrollTop + sectionContent.clientHeight >= sectionContent.scrollHeight - 2) ||
                (e.deltaY < 0 && sectionContent.scrollTop <= 2)) {
              // Check if we need to transition to another section
              if (checkSectionTransition(e.deltaY)) {
                e.preventDefault();
                return;
              }
            }
          } else {
            // Desktop behavior - check for section transition
            if (checkSectionTransition(e.deltaY)) {
              e.preventDefault();
              return;
            }
          }
          
          // Prevent overscroll bounce at document edges
          if ((currentSectionIndex === 0 && 
               sectionContent.scrollTop <= 0 && 
               e.deltaY < 0) || 
              (currentSectionIndex === sectionElements.length - 1 && 
               sectionContent.scrollTop + sectionContent.clientHeight >= sectionContent.scrollHeight && 
               e.deltaY > 0)) {
            e.preventDefault();
          }
        }
      }
    };
    
    // Add event listeners for both touch and wheel events
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    const handleScroll = () => {
      if (!sectionsRef.current) return;
      
      const sections = Array.from(sectionsRef.current.children);
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      // Update active section based on current scroll position
      const currentSectionIndex = Math.round(scrollPosition / windowHeight);
      const sectionIds = ['hero', 'about', 'skills', 'projects', 'contact'];
      if (currentSectionIndex >= 0 && currentSectionIndex < sectionIds.length && setActiveSection) {
        setActiveSection(sectionIds[currentSectionIndex] as any);
      }
      
      sections.forEach((section, index) => {
        const sectionElement = section as HTMLElement;
        const sectionTop = index * windowHeight;
        const sectionBottom = sectionTop + windowHeight;
        const lightBg = index === 0 ? '' : 'rgba(255, 255, 255, 0.9)';
        const darkBg = index === 0 ? '' : 'rgba(17, 24, 39, 0.9)'; // dark:bg-gray-900 equivalent with transparency

        // Calculate how far into the section we've scrolled (as a percentage)  
        const sectionScrollPercentage = index === 0 
          ? 0 
          : Math.min(100, Math.max(0, (scrollPosition - (sectionTop - windowHeight)) / windowHeight * 100));
        
        // Determine if we should be transparent or opaque based on scroll percentage
        // 0% = just starting to come into view, 100% = fully in view
        const shouldBeTransparent = sectionScrollPercentage < 45; // Transparent until 45% scrolled
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          // Current section - stays fixed and fully opaque
          sectionElement.style.position = 'fixed';
          sectionElement.style.top = '0';
          sectionElement.style.left = '0';
          sectionElement.style.width = '100%';
          sectionElement.style.height = '100vh';
          sectionElement.style.transform = 'translateY(0)';
          sectionElement.style.opacity = '1'; // Fully opaque when active
          sectionElement.style.zIndex = String(10 + index); // Increasing z-index for each section
          sectionElement.style.backgroundColor = index === 0 ? '' : (isDarkMode ? darkBg : lightBg); // Slight transparency for non-hero sections
        } else if (scrollPosition < sectionTop) {
          // Sections below - prepare to slide up
          sectionElement.style.position = 'fixed';
          sectionElement.style.top = '0';
          sectionElement.style.left = '0';
          sectionElement.style.width = '100%';
          sectionElement.style.height = '100vh';
          sectionElement.style.transform = 'translateY(100%)';
          sectionElement.style.opacity = shouldBeTransparent ? '0.7' : '1'; // Transparent until 45% scrolled
          sectionElement.style.zIndex = String(10 + index);
          sectionElement.style.backgroundColor = index === 0 
            ? '' 
            : shouldBeTransparent 
              ? (isDarkMode ? 'rgba(17, 24, 39, 0.7)' : 'rgba(255, 255, 255, 0.7)')
              : (isDarkMode ? 'rgb(17, 24, 39)' : 'rgb(255, 255, 255)');
        } else {
          // Sections above - keep them visible at the top
          sectionElement.style.position = 'fixed';
          sectionElement.style.top = '0';
          sectionElement.style.left = '0';
          sectionElement.style.width = '100%';
          sectionElement.style.height = '100vh';
          sectionElement.style.transform = 'translateY(0)'; // Keep in place
          sectionElement.style.opacity = '1'; // Fully opaque when scrolled past
          sectionElement.style.zIndex = String(10 + index - 5); // Lower z-index so newer sections appear on top
          sectionElement.style.backgroundColor = index === 0 
            ? '' 
            : (isDarkMode ? 'rgb(17, 24, 39)' : 'rgb(255, 255, 255)'); // Fully opaque
        }

        // Create sliding card effect for the next section
        if (scrollPosition > sectionTop - windowHeight && scrollPosition < sectionTop) {
          const progress = (scrollPosition - (sectionTop - windowHeight)) / windowHeight;
          const translateY = 100 - (progress * 100);
          const scale = 0.98 + (progress * 0.02);
          
          // Start with some transparency and become fully opaque at 45% scroll
          const opacity = progress < 0.45 ? (0.3 + (progress * 1.5)) : 1;
          
          // Set background transparency based on scroll percentage
          const bgOpacity = progress < 0.45 ? 0.7 : 1;
          
          sectionElement.style.transform = `translateY(${translateY}%) scale(${scale})`;
          sectionElement.style.opacity = String(opacity);
          sectionElement.style.zIndex = String(10 + index);
          
          if (index !== 0) { // Don't change Hero section background
            sectionElement.style.backgroundColor = isDarkMode 
              ? `rgba(17, 24, 39, ${bgOpacity})` 
              : `rgba(255, 255, 255, ${bgOpacity})`;  
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

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
    
    // Initial height setup
    updateContainerHeight();
    
    // Add resize listener to adjust height when window size changes
    window.addEventListener('resize', updateContainerHeight);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', updateContainerHeight);
      
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

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