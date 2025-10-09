export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  github: string;
  linkedin: string;
}

export interface Skill {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'database' | 'tools' | 'deployment';
  icon: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
  featured: boolean;
}

export interface AboutSection {
  background: string[];
}

export const personalInfo: PersonalInfo = {
  name: "SHOMBHUNATH KARAN",
  title: "ASPIRING FULL-STACK DEVELOPER",
  subtitle: "Focused on Performance, Usability, and Clean Code",
  email: "shombhunathkaran@gmail.com",
  github: "https://github.com/sn7k",
  linkedin: "https://linkedin.com/in/shombhunath-karan"
};

export const skills: Skill[] = [
  // Languages
  { name: "JavaScript", category: "languages", icon: "devicon-javascript-plain" },
  { name: "HTML5", category: "languages", icon: "devicon-html5-plain" },
  { name: "CSS3", category: "languages", icon: "devicon-css3-plain" },
  { name: "Java", category: "languages", icon: "devicon-java-plain" },
  { name: "SQL", category: "languages", icon: "devicon-mysql-plain" },
  
  // Frontend
  { name: "React.js", category: "frontend", icon: "devicon-react-original" },
  { name: "TailwindCSS", category: "frontend", icon: "devicon-tailwindcss-plain" },
  { name: "Bootstrap", category: "frontend", icon: "devicon-bootstrap-plain" },
  { name: "Responsive Design", category: "frontend", icon: "devicon-css3-plain" },
  { name: "Framer Motion", category: "frontend", icon: "devicon-react-original" },
  
  // Backend
  { name: "Node.js", category: "backend", icon: "devicon-nodejs-plain" },
  { name: "Express.js", category: "backend", icon: "devicon-express-original" },
  { name: "REST APIs", category: "backend", icon: "devicon-nodejs-plain" },
  { name: "JWT Authentication", category: "backend", icon: "devicon-javascript-plain" },
  { name: "Spring Boot", category: "backend", icon: "devicon-spring-plain" },
  
  // Database
  { name: "MongoDB", category: "database", icon: "devicon-mongodb-plain" },
  { name: "Mongoose", category: "database", icon: "devicon-mongodb-plain" },
  { name: "MySQL", category: "database", icon: "devicon-mysql-plain" },
  { name: "Database Design", category: "database", icon: "devicon-mysql-plain" },
  
  // Tools
  { name: "Git", category: "tools", icon: "devicon-git-plain" },
  { name: "GitHub", category: "tools", icon: "devicon-github-original" },
  { name: "Postman", category: "tools", icon: "devicon-postman-plain" },
  { name: "VS Code", category: "tools", icon: "devicon-vscode-plain" },
  { name: "NPM", category: "tools", icon: "devicon-npm-original-wordmark" },
  { name: "Webpack", category: "tools", icon: "devicon-webpack-plain" },
  
  // Deployment
  { name: "Netlify", category: "deployment", icon: "devicon-netlify-plain" },
  { name: "Vercel", category: "deployment", icon: "devicon-vercel-plain" },
  { name: "Render", category: "deployment", icon: "devicon-heroku-plain" },
  { name: "Cloud Hosting", category: "deployment", icon: "devicon-amazonwebservices-original" }
];

export const projects: Project[] = [
  {
    id: 1,
    name: "INCAMPUS",
    description: "InCampus is a secure college-only platform where students and faculty can share memories, post updates, and connect through a clean, modern interface.",
    tech: ["REACT.JS", "TYPESCRIPT","TAILWIND CSS","NODE.JS", "EXPRESS.JS", "MONGODB","CLOUDINARY", "JWT", "OTP AUTH"],
    github: "https://github.com/SN7k/InCampus",
    demo: "https://incampus1.netlify.app/",
    image:"https://github.com/user-attachments/assets/9c031ee6-bf4b-4ec6-8003-2031b24b061d",
    featured: true
  },
  {
    id: 2,
    name: "BUSSEVA KOLKATA",
    description: "A user-friendly platform to explore bus routes across Kolkata. It helps commuters find route numbers, stops, and images, making daily travel smoother and more informed.",
    tech: ["HTML5", "CSS3", "JAVASCRIPT", "NODE.JS", "EXPRESS.JS", "MONGODB", "JWT","CLOUDINARY","CORS"],
    github: "https://github.com/SN7k/bussevakolkata.site",
    demo: "https://bussevakolkata.site",
    image:"https://github.com/user-attachments/assets/399ff6ce-660a-42f9-a7ef-9eb845d3d3e5",
    featured: true
  },
  
  {
    id: 3,
    name: "Arvyax Wellness",
    description: "A wellness-focused web app offering personalized health tips, goal tracking, and curated content—built with a clean UI and user authentication.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js","Express.js","MongoDB","JWT"],
    github: "https://github.com/SN7k/arvyax-wellness-platform",
    demo: "https://arvyaxwellness.netlify.app",
    image:"https://github.com/user-attachments/assets/69b1d811-1f3e-4867-bb41-1962379595ef",
    featured: true
  }

   {
    id: 4,
    name: "Sillysites",
    description: "Serious about silly",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js","Express.js","MongoDB","JWT"],
    github: "https://github.com/SN7k/",
    demo: "https://sillysites.studio/",
    image:"",
    featured: true
  }

];

export const aboutSection: AboutSection = {
  background: [
    "I'm Shombhunath Karan, a BCA student and full-stack web developer passionate about building clean, responsive apps with the MERN stack. I enjoy turning ideas into reality through code and continuous learning."
  ],
};

export const navigationSections = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'contact', label: 'CONTACT' }
]; 
