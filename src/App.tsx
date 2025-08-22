import { Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import ScrollDots from './components/ScrollDots';

// Lazy load components for better performance
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-white"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <Header />
        <ScrollDots />
        <main className="lg:pl-16">
          <Suspense fallback={<LoadingSpinner />}>
            <Hero />
          </Suspense>
          <Suspense fallback={<div className="min-h-screen"></div>}>
            <About />
          </Suspense>
          <Suspense fallback={<div className="min-h-screen"></div>}>
            <Projects />
          </Suspense>
          <Suspense fallback={<div className="min-h-screen"></div>}>
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={<div className="h-20"></div>}>
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

export default App;