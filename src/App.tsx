import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollDots from './components/ScrollDots';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <Header />
        <ScrollDots />
        <main className="lg:pl-16">
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;