import { useEffect, useRef } from 'react';
import { Code, Figma, Database, Globe } from 'lucide-react';

interface Skill {
  category: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
  darkColor: string;
}

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    {
      category: 'Frontend Development',
      icon: <Code size={24} />,
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'],
      color: 'bg-blue-500',
      darkColor: 'dark:bg-blue-600'
    },
    {
      category: 'UI/UX Design',
      icon: <Figma size={24} />,
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Wireframing', 'Prototyping', 'User Research'],
      color: 'bg-purple-500',
      darkColor: 'dark:bg-purple-600'
    },
    {
      category: 'Backend Development',
      icon: <Database size={24} />,
      skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'API Design'],
      color: 'bg-green-500',
      darkColor: 'dark:bg-green-600'
    },
    {
      category: 'Other Skills',
      icon: <Globe size={24} />,
      skills: ['Git/GitHub', 'Docker', 'AWS', 'CI/CD', 'Testing', 'Performance Optimization'],
      color: 'bg-orange-500',
      darkColor: 'dark:bg-orange-600'
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (titleRef.current) {
              titleRef.current.style.opacity = '1';
              titleRef.current.style.transform = 'translateY(0)';
            }
            setTimeout(() => {
              if (skillsRef.current) {
                skillsRef.current.style.opacity = '1';
                skillsRef.current.style.transform = 'translateY(0)';
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
      id="skills"
      ref={sectionRef}
      className="min-h-screen flex items-center py-20 bg-gray-50 dark:bg-gray-800 relative"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div
          ref={titleRef}
          className="text-center mb-16 opacity-0 transform translate-y-8 transition-all duration-700 ease-out"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            My <span className="text-blue-600 dark:text-blue-400">Skills</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            I've developed expertise in various technologies and tools over the years.
            Here's a snapshot of my technical skills and competencies.
          </p>
        </div>

        <div
          ref={skillsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 opacity-0 transform translate-y-8 transition-all duration-700 ease-out"
        >
          {skills.map((skillGroup, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${skillGroup.color} ${skillGroup.darkColor}`}>
                  {skillGroup.icon}
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                  {skillGroup.category}
                </h3>
              </div>

              <ul className="space-y-3">
                {skillGroup.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${skillGroup.color} ${skillGroup.darkColor}`}
                        style={{
                          width: `${Math.random() * 30 + 70}%`,
                          animationDelay: `${skillIndex * 100}ms`,
                        }}
                      ></div>
                    </div>
                    <span className="ml-3 text-gray-700 dark:text-gray-300 w-24">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};