import React from 'react';
import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/ProjectCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useProjectsManager } from '../services/dataService';

// Keep static projects as fallback
const staticProjects = [
  // Your existing static projects array
];

const Projects = () => {
  // Use the projects manager hook to get editable content
  const { projects, loading } = useProjectsManager();
  
  // Map projects data to the format expected by ProjectCard
  const displayProjects = loading 
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
