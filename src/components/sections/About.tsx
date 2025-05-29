import { useEffect, useRef } from 'react';
import { User, Calendar, MapPin, Briefcase } from 'lucide-react';

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (imageRef.current) {
              imageRef.current.style.opacity = '1';
              imageRef.current.style.transform = 'translateX(0)';
            }
            setTimeout(() => {
              if (contentRef.current) {
                contentRef.current.style.opacity = '1';
                contentRef.current.style.transform = 'translateX(0)';
              }
            }, 300);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center py-20 bg-white dark:bg-gray-900 relative"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div
            ref={imageRef}
            className="opacity-0 transform translate-x-[-50px] transition-all duration-700 ease-out"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-400/10 rounded-2xl transform rotate-3"></div>
              <img
                src="https://i.postimg.cc/pTck3dRb/oqg6smwpx0ib1.webp"
                alt="John Doe"
                className="rounded-2xl shadow-xl relative z-10 object-cover w-full h-[350px] sm:h-[400px] md:h-[500px]"
              />
            </div>
          </div>

          <div
            ref={contentRef}
            className="opacity-0 transform translate-x-[50px] transition-all duration-700 ease-out"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              <span className="text-gray-900 dark:text-white">About</span>{' '}
              <span className="text-blue-600 dark:text-blue-400">Me</span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-4 md:mb-6 leading-relaxed">
            I’m a passionate full-stack web developer with a strong focus on creating clean, responsive, and user-friendly web applications. I love turning ideas into real-world solutions using modern technologies like the MERN stack. With a strong interest in both development and cybersecurity, I strive to build secure, scalable, and impactful digital experiences that combine functionality with great design.
            </p>
           

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Name</h3>
                  <p className="text-gray-600 dark:text-gray-400">Shombhunath Karan</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Experience</h3>
                  <p className="text-gray-600 dark:text-gray-400">1+ Years</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Location</h3>
                  <p className="text-gray-600 dark:text-gray-400">Kolkata,India</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Available for</h3>
                  <p className="text-gray-600 dark:text-gray-400">Freelance & Part-time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};