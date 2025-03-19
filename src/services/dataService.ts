import { useState, useEffect } from 'react';

// Define content types for different sections
export interface BaseContent {
  id: string;
}

export interface ProjectContent extends BaseContent {
  title: string;
  description: string;
  imageUrl?: string;
  technologies?: string[];
}

export interface AcademiaContent extends BaseContent {
  title: string;
  institution: string;
  year: string;
  description: string;
}

// Storage keys for different content types
const STORAGE_KEYS = {
  projects: 'website_projects_data',
  academia: 'website_academia_data',
};

// Generic save function
export const saveContent = <T extends BaseContent>(type: 'projects' | 'academia', data: T[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS[type], JSON.stringify(data));
    console.log(`${type} content saved successfully`);
  } catch (error) {
    console.error(`Error saving ${type} content:`, error);
  }
};

// Generic load function
export const loadContent = <T extends BaseContent>(type: 'projects' | 'academia'): T[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS[type]);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error loading ${type} content:`, error);
    return [];
  }
};

// Initialize with default data if empty
export const initializeDefaultData = () => {
  // Default projects data
  const defaultProjects: ProjectContent[] = [
    {
      id: '1',
      title: 'Energy Data Analysis Dashboard',
      description: 'Interactive dashboard for analyzing energy consumption patterns',
      imageUrl: '/images/project1.jpg',
      technologies: ['React', 'D3.js', 'Python'],
    },
    {
      id: '2',
      title: 'Renewable Energy Forecasting',
      description: 'Machine learning model to predict renewable energy generation',
      imageUrl: '/images/project2.jpg',
      technologies: ['TensorFlow', 'Python', 'SQL'],
    },
  ];

  // Default academia data
  const defaultAcademia: AcademiaContent[] = [
    {
      id: '1',
      title: 'Ph.D. in Energy Engineering',
      institution: 'University of Energy Sciences',
      year: '2020',
      description: 'Research focused on optimization of energy systems',
    },
    {
      id: '2',
      title: 'Master of Science in Data Analytics',
      institution: 'Data University',
      year: '2016',
      description: 'Specialized in big data analysis for energy applications',
    },
  ];

  // Initialize projects if empty
  if (!localStorage.getItem(STORAGE_KEYS.projects)) {
    saveContent('projects', defaultProjects);
  }

  // Initialize academia if empty
  if (!localStorage.getItem(STORAGE_KEYS.academia)) {
    saveContent('academia', defaultAcademia);
  }
};

// Custom hook for projects management
export const useProjectsManager = () => {
  const [projects, setProjects] = useState<ProjectContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize default data if needed
    initializeDefaultData();
    
    // Load projects data
    const loadedData = loadContent<ProjectContent>('projects');
    setProjects(loadedData);
    setLoading(false);
  }, []);

  const updateProject = (updatedProject: ProjectContent) => {
    const updatedProjects = projects.map(item => 
      item.id === updatedProject.id ? updatedProject : item
    );
    
    setProjects(updatedProjects);
    saveContent('projects', updatedProjects);
    return true;
  };

  const addProject = (newProject: ProjectContent) => {
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    saveContent('projects', updatedProjects);
    return true;
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(item => item.id !== id);
    setProjects(updatedProjects);
    saveContent('projects', updatedProjects);
    return true;
  };

  return {
    projects,
    loading,
    updateProject,
    addProject,
    deleteProject
  };
};

// Custom hook for academia management
export const useAcademiaManager = () => {
  const [academia, setAcademia] = useState<AcademiaContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize default data if needed
    initializeDefaultData();
    
    // Load academia data
    const loadedData = loadContent<AcademiaContent>('academia');
    setAcademia(loadedData);
    setLoading(false);
  }, []);

  const updateAcademia = (updatedAcademia: AcademiaContent) => {
    const updatedAcademiaList = academia.map(item => 
      item.id === updatedAcademia.id ? updatedAcademia : item
    );
    
    setAcademia(updatedAcademiaList);
    saveContent('academia', updatedAcademiaList);
    return true;
  };

  const addAcademia = (newAcademia: AcademiaContent) => {
    const updatedAcademiaList = [...academia, newAcademia];
    setAcademia(updatedAcademiaList);
    saveContent('academia', updatedAcademiaList);
    return true;
  };

  const deleteAcademia = (id: string) => {
    const updatedAcademiaList = academia.filter(item => item.id !== id);
    setAcademia(updatedAcademiaList);
    saveContent('academia', updatedAcademiaList);
    return true;
  };

  return {
    academia,
    loading,
    updateAcademia,
    addAcademia,
    deleteAcademia
  };
};