import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';

type Section = 'hero' | 'about' | 'skills' | 'projects' | 'contact';

interface ScrollContextType {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  scrollToSection: (section: Section) => void;
  scrollProgress: number;
  isMobileView: boolean;
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
  const [isMobileView, setIsMobileView] = useState(false);
  
  // Touch tracking for mobile
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
  const lastTouchTime = useRef<number>(0);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollPosition = useRef<number>(0);
  
  // Get all section IDs
  const getSectionIds = (): Section[] => {
    return ['hero', 'about', 'skills', 'projects', 'contact'];
  };
  
  // Check if a section has reached its content end
  const hasReachedSectionEnd = (sectionId: string): boolean => {
    if (!isMobileView) return true; // Always allow section changes on desktop
    
    const section = document.getElementById(sectionId);
    if (!section) return true;
    
    const sectionContent = section.querySelector('.section-content');
    if (!sectionContent) return true;
    
    // Calculate if we've scrolled to the bottom of the content
    const contentRect = sectionContent.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Allow section change if content bottom is above viewport bottom (with some margin)
    return contentRect.bottom <= viewportHeight + 50;
  };

  // Function to ensure the last section is fully visible
  const ensureLastSectionFullyVisible = () => {
    const sectionIds = getSectionIds();
    const lastSectionId = sectionIds[sectionIds.length - 1];
    const lastSection = document.getElementById(lastSectionId);
    
    if (lastSection && isMobileView) {
      // Force scroll to the bottom of the page minus viewport height
      // This ensures the last section is always fully visible
      const scrollToBottom = () => {
        // Use a small offset to ensure we're at the very bottom
        const bottomPosition = document.body.scrollHeight - window.innerHeight - 10;
        window.scrollTo({
          top: bottomPosition,
          behavior: 'auto' // Use auto instead of smooth for more reliable behavior
        });
      };
      
      // Execute immediately and then again after a short delay to ensure it works
      scrollToBottom();
      setTimeout(scrollToBottom, 50);
      setTimeout(scrollToBottom, 200); // Additional attempt for more reliability
    }
  };

  const scrollToSection = (section: Section) => {
    // Don't start a new scroll if we're already scrolling
    if (isScrolling) return;
    
    // Get the index of the section
    const sectionIds = getSectionIds();
    const sectionIndex = sectionIds.indexOf(section);
    const currentSectionIndex = Math.round(window.scrollY / window.innerHeight);
    
    // For mobile: Check if we've reached the end of current section's content before allowing section change
    if (isMobileView && sectionIndex > currentSectionIndex) {
      const currentSectionId = sectionIds[currentSectionIndex];
      if (!hasReachedSectionEnd(currentSectionId)) {
        // If we haven't reached the end of the current section's content,
        // scroll to the bottom of the current section's content instead
        const currentSection = document.getElementById(currentSectionId);
        if (currentSection) {
          const sectionContent = currentSection.querySelector('.section-content');
          if (sectionContent) {
            const contentRect = sectionContent.getBoundingClientRect();
            const targetY = window.scrollY + contentRect.bottom - window.innerHeight + 10;
            
            window.scrollTo({
              top: targetY,
              behavior: 'smooth'
            });
            return;
          }
        }
      }
    }
    
    if (sectionIndex !== -1) {
      // Set scrolling state to true
      setIsScrolling(true);
      // Update last scroll position for tracking
      lastScrollPosition.current = window.scrollY;
      
      // Calculate the target scroll position (section height * index)
      // For the last section, adjust to ensure it's fully visible
      const isLastSection = sectionIndex === getSectionIds().length - 1;
      const targetY = isLastSection 
        ? document.body.scrollHeight - window.innerHeight 
        : window.innerHeight * sectionIndex;
      
      // Use custom smooth scrolling to avoid glitches
      const startPosition = window.scrollY;
      const distance = targetY - startPosition;
      
      // Optimize for mobile - faster and more responsive
      const mobile = isMobileView;
      const duration = mobile ? 300 : 600; // Faster on mobile for better responsiveness
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
          // More controlled easing for mobile
          easeProgress = 1 - Math.pow(1 - progress, 2);
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
          
          // Reset scrolling state after a delay
          setTimeout(() => {
            setIsScrolling(false);
          }, mobile ? 100 : 200);
        }
      };
      
      // Start the animation
      requestAnimationFrame(animateScroll);
    }
  };

  useEffect(() => {
    // Handle touch events for mobile swipe navigation
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
      
      // Get current section based on scroll position
      const sectionIds = getSectionIds();
      const currentSectionIndex = Math.round(window.scrollY / window.innerHeight);
      const currentSectionId = sectionIds[currentSectionIndex];
      
      // For upward swipes (next section), check if we've reached the end of current section's content
      if (swipeDirection > 0 && isMobileView) {
        // If we haven't reached the end of content, scroll to the end of content instead of changing section
        if (!hasReachedSectionEnd(currentSectionId)) {
          const currentSection = document.getElementById(currentSectionId);
          if (currentSection) {
            const sectionContent = currentSection.querySelector('.section-content');
            if (sectionContent) {
              const contentRect = sectionContent.getBoundingClientRect();
              const targetY = window.scrollY + contentRect.bottom - window.innerHeight + 10;
              
              window.scrollTo({
                top: targetY,
                behavior: 'smooth'
              });
              
              // Reset touch tracking
              touchStartY.current = null;
              touchEndY.current = null;
              return;
            }
          }
        }
      }
      
      // Threshold for swipe detection
      const minSwipeDistance = isMobileView ? 50 : 40;
      
      // Check if we should handle this swipe
      if (Math.abs(swipeDistance) >= minSwipeDistance) {
        // Prevent rapid consecutive swipes
        const now = Date.now();
        if (now - lastTouchTime.current < 400) return;
        lastTouchTime.current = now;
        
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
    
    // Handle scroll events
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight - windowHeight;
      
      setScrollProgress(scrollPosition / documentHeight);
      
      // Track scroll direction and distance
      const scrollDirection = scrollPosition > lastScrollPosition.current ? 1 : -1; // 1 for down, -1 for up
      const scrollDistance = Math.abs(scrollPosition - lastScrollPosition.current);
      lastScrollPosition.current = scrollPosition;

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set a timeout to update active section after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        if (isScrolling) return;
        
        const sectionIds = getSectionIds();
        
        // Calculate current section based on scroll position
        const currentSectionIndex = Math.round(scrollPosition / windowHeight);
        
        // Update active section
        if (currentSectionIndex >= 0 && currentSectionIndex < sectionIds.length) {
          setActiveSection(sectionIds[currentSectionIndex]);
        }
        
        // If we're on mobile and scrolling down significantly, check if we need to show next section
        if (isMobileView && scrollDirection > 0 && scrollDistance > 50) {
          const currentSectionId = sectionIds[currentSectionIndex];
          
          // If we've reached the end of current section's content, allow showing next section
          if (hasReachedSectionEnd(currentSectionId)) {
            // If we're not at the last section, show the next section
            if (currentSectionIndex < sectionIds.length - 1) {
              const nextSectionIndex = currentSectionIndex + 1;
              scrollToSection(sectionIds[nextSectionIndex]);
            }
          }
        }
        
        // Check if this is the last section and ensure it's fully visible
        const isLastSection = currentSectionIndex === sectionIds.length - 1;
        if (isMobileView && isLastSection) {
          ensureLastSectionFullyVisible();
        }
      }, 150);
    };
    
    // Check and set mobile view state
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    // Initial check for mobile view
    handleResize();
    
    // Add event listeners for resize, touch and scroll
    window.addEventListener('resize', handleResize);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ activeSection, setActiveSection, scrollToSection, scrollProgress, isMobileView }}>
      {children}
    </ScrollContext.Provider>
  );
};
