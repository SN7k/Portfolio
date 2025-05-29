import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';

type Section = 'hero' | 'about' | 'skills' | 'projects' | 'contact';

interface ScrollContextType {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  scrollToSection: (section: Section) => void;
  scrollProgress: number;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider = ({ children }: ScrollProviderProps) => {
  const [activeSection, setActiveSection] = useState<Section>('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Touch tracking for mobile
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
  const lastTouchTime = useRef<number>(0);
  const scrollTimeoutRef = useRef<number | null>(null);
  
  // Detect if device is mobile
  const isMobile = () => window.innerWidth < 768;

  const scrollToSection = (section: Section) => {
    // Don't start a new scroll if we're already scrolling
    if (isScrolling) return;
    
    // Get the index of the section
    const sectionIds: Section[] = ['hero', 'about', 'skills', 'projects', 'contact'];
    const sectionIndex = sectionIds.indexOf(section);
    
    if (sectionIndex !== -1) {
      // Set scrolling state to true
      setIsScrolling(true);
      
      // Calculate the target scroll position (section height * index)
      const targetY = window.innerHeight * sectionIndex;
      
      // Use custom smooth scrolling to avoid glitches
      const startPosition = window.scrollY;
      const distance = targetY - startPosition;
      
      // Optimize for mobile - faster and more responsive
      const mobile = isMobile();
      const duration = mobile ? 300 : 600; // Even faster on mobile
      let startTime: number;
      
      // Update active section immediately
      setActiveSection(section);
      
      // Smooth scroll animation function with improved mobile performance
      const animateScroll = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        
        // Use a more aggressive easing for mobile for better responsiveness
        const progress = Math.min(elapsed / duration, 1);
        let easeProgress;
        
        if (mobile) {
          // Faster, more direct easing for mobile
          easeProgress = 1 - Math.pow(1 - progress, 3);
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
          
          // Reset scrolling state after a short delay
          // Use a shorter delay on mobile for better responsiveness
          setTimeout(() => setIsScrolling(false), mobile ? 50 : 100);
        }
      };
      
      // Start the animation
      requestAnimationFrame(animateScroll);
    }
  };

  // Handle touch events for mobile scrolling
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchEndY.current = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (!touchStartY.current || !touchEndY.current) return;
      
      // Calculate swipe distance and direction
      const swipeDistance = touchStartY.current - touchEndY.current;
      const swipeDirection = swipeDistance > 0 ? 1 : -1; // 1 for up (next section), -1 for down (prev section)
      
      // Only trigger if the swipe is significant enough (prevent accidental swipes)
      const minSwipeDistance = 50; // Minimum pixels to consider it a swipe
      
      // Check if we should handle this swipe
      if (Math.abs(swipeDistance) >= minSwipeDistance) {
        // Prevent rapid consecutive swipes
        const now = Date.now();
        if (now - lastTouchTime.current < 500) return; // Minimum 500ms between swipes
        lastTouchTime.current = now;
        
        // Calculate current section and target section
        const currentSectionIndex = Math.round(window.scrollY / window.innerHeight);
        const sectionIds: Section[] = ['hero', 'about', 'skills', 'projects', 'contact'];
        
        // Calculate target section index with bounds checking
        const targetSectionIndex = Math.max(0, Math.min(sectionIds.length - 1, currentSectionIndex + swipeDirection));
        
        // Only scroll if we're changing sections
        if (targetSectionIndex !== currentSectionIndex) {
          scrollToSection(sectionIds[targetSectionIndex]);
        }
      }
      
      // Reset touch tracking
      touchStartY.current = null;
      touchEndY.current = null;
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight - windowHeight;
      
      setScrollProgress(scrollPosition / documentHeight);

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set a timeout to snap to the nearest section after scrolling stops
      scrollTimeoutRef.current = window.setTimeout(() => {
        if (isScrolling) return;
        
        const sections: Section[] = ['hero', 'about', 'skills', 'projects', 'contact'];
        const currentSectionIndex = Math.round(scrollPosition / windowHeight);
        
        // Ensure index is within bounds
        if (currentSectionIndex >= 0 && currentSectionIndex < sections.length) {
          // Only update if not currently in a scroll animation
          setActiveSection(sections[currentSectionIndex]);
          
          // Snap to the nearest section if we're slightly off
          const targetY = currentSectionIndex * windowHeight;
          const distance = Math.abs(scrollPosition - targetY);
          
          // Only snap if we're close but not exactly on a section boundary
          if (distance > 10 && distance < windowHeight * 0.3) {
            window.scrollTo({
              top: targetY,
              behavior: isMobile() ? 'auto' : 'smooth'
            });
          }
        }
      }, 150);
    };

    // Add event listeners for both touch and scroll
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isScrolling]);

  return (
    <ScrollContext.Provider value={{ activeSection, setActiveSection, scrollToSection, scrollProgress }}>
      {children}
    </ScrollContext.Provider>
  );
};