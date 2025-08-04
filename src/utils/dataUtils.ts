import { skills, projects, Skill, Project } from '../data/mockData';

export const getSkillsByCategory = (category: Skill['category']) => {
  return skills.filter(skill => skill.category === category);
};

export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured);
};

export const getAllProjects = () => {
  return projects;
};

export const getProjectById = (id: number) => {
  return projects.find(project => project.id === id);
};

export const getSkillsByCategories = () => {
  const categories = ['languages', 'frontend', 'backend', 'database', 'tools', 'deployment'] as const;
  return categories.map(category => ({
    category,
    skills: getSkillsByCategory(category)
  }));
};

export const formatTechStack = (tech: string[]) => {
  return tech.join(' • ');
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateForm = (formData: { name: string; email: string; message: string }) => {
  const errors: string[] = [];
  
  if (!formData.name.trim()) {
    errors.push('Name is required');
  }
  
  if (!formData.email.trim()) {
    errors.push('Email is required');
  } else if (!validateEmail(formData.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!formData.message.trim()) {
    errors.push('Message is required');
  }
  
  return errors;
}; 