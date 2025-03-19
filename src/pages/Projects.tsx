import React from 'react';
import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/ProjectCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useProjectsManager } from '../services/dataService';

// Keep static projects as fallback
const staticProjects = [
  {
    title: "Energy Data Analysis Dashboard",
    description: "Interactive dashboard for analyzing energy consumption patterns across different sectors. Implemented using React and D3.js with data processing in Python.",
    tags: ["React", "D3.js", "Python", "Data Analysis"],
    image: "/images/project1.jpg",
    links: {
      github: "https://github.com/yourusername/energy-dashboard",
      demo: "https://energy-dashboard-demo.com"
    }
  },
  {
    title: "Renewable Energy Forecasting",
    description: "Machine learning model to predict renewable energy generation based on weather patterns and historical data. Achieved 92% accuracy in day-ahead forecasting.",
    tags: ["Machine Learning", "Python", "TensorFlow", "Time Series"],
    image: "/images/project2.jpg",
    links: {
      github: "https://github.com/yourusername/renewable-forecast"
    }
  },
  {
    title: "Smart Grid Optimization System",
    description: "Developed an optimization algorithm for energy distribution in smart grids, reducing energy losses by 15% in simulation environments.",
    tags: ["Optimization", "Python", "MATLAB", "Smart Grid"],
    image: "/images/project3.jpg",
    links: {}
  },
  {
    title: "Energy Consumption Analyzer",
    description: "Web application that helps users track and analyze their energy usage patterns, providing personalized recommendations for reducing consumption.",
    tags: ["React", "Node.js", "MongoDB", "Data Visualization"],
    image: "/images/project4.jpg",
    links: {
      demo: "https://energy-analyzer.com"
    }
  }
];

const Projects = () => {
  // Use the projects manager hook to get editable content
  const { projects, loading } = useProjectsManager();
  
  // Map projects data to the format expected by ProjectCard
  const displayProjects = loading || projects.length === 0
    ? staticProjects 
    : projects.map(item => ({
        title: item.title,
        description: item.description,
        tags: item.technologies || [],
        image: item.imageUrl || "/images/project-placeholder.jpg",
        links: {}
      }));

  return (
    <>
      <Navbar />
      
      <HeroSection
        title="Projects Portfolio"
        subtitle="Showcasing my work in energy data analysis and system optimization"
        image="/images/projects-hero.jpg"
        imageAlt="Energy Projects"
      />
      
      <main className="container mx-auto px-6 py-16">
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-4 px-3 py-1 bg-secondary rounded-full">
              <span className="text-sm font-medium">Portfolio</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mb-12">
              A collection of my professional projects in energy data analysis, 
              system optimization, and renewable energy integration.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                    image={project.image}
                    links={project.links}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Projects;
