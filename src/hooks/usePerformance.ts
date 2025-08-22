import { useEffect, useCallback } from 'react';

export const usePerformanceObserver = () => {
  const logPerformance = useCallback(() => {
    if ('performance' in window && 'PerformanceObserver' in window) {
      // Log Core Web Vitals
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.log(`${entry.name}: ${entry.duration || entry.startTime}`);
        });
      }).observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] });
    }
  }, []);

  useEffect(() => {
    // Only in development
    if (import.meta.env.DEV) {
      logPerformance();
    }
  }, [logPerformance]);
};

export const useImagePreloader = (imageSrcs: string[]) => {
  useEffect(() => {
    const preloadImages = imageSrcs.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    return () => {
      preloadImages.forEach((img) => {
        img.src = '';
      });
    };
  }, [imageSrcs]);
};

export const useReducedMotion = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return prefersReducedMotion;
};
