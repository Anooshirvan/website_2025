import React, { useState } from 'react';
import { useProjectsManager, useAcademiaManager } from '../services/dataService';
import { v4 as uuidv4 } from 'uuid';

// Define interfaces for our content types
interface ProjectContent {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  technologies?: string[];
}

interface AcademiaContent {
  id: string;
  title: string;
  institution: string;
  year: string;
  description: string;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'academia'>('projects');
  const [saveStatus, setSaveStatus] = useState('');
  
  // Projects state
  const { projects, loading: projectsLoading, updateProject, addProject, deleteProject } = useProjectsManager();
  const [currentProject, setCurrentProject] = useState<ProjectContent>({ 
    id: '', 
    title: '', 
    description: '', 
    imageUrl: '', 
    technologies: [] 
  });
  const [isEditingProject, setIsEditingProject] = useState(false);
  
  // Academia state
  const { academia, loading: academiaLoading, updateAcademia, addAcademia, deleteAcademia } = useAcademiaManager();
  const [currentAcademia, setCurrentAcademia] = useState<AcademiaContent>({ 
    id: '', 
    title: '', 
    institution: '', 
    year: '', 
    description: '' 
  });
  const [isEditingAcademia, setIsEditingAcademia] = useState(false);

  // Handle project input changes
  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'technologies') {
      setCurrentProject({ 
        ...currentProject, 
        technologies: value.split(',').map(tech => tech.trim()) 
      });
    } else {
      setCurrentProject({ ...currentProject, [name]: value });
    }
  };

  // Handle academia input changes
  const handleAcademiaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentAcademia({ ...currentAcademia, [name]: value });
  };

  // Submit project form
  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditingProject) {
        updateProject(currentProject);
        setSaveStatus('Project updated successfully!');
      } else {
        addProject({ ...currentProject, id: uuidv4() });
        setSaveStatus('New project added successfully!');
      }
      
      setCurrentProject({ id: '', title: '', description: '', imageUrl: '', technologies: [] });
      setIsEditingProject(false);
      
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Error saving project:', error);
      setSaveStatus('Error saving project. Please try again.');
    }
  };

  // Submit academia form
  const handleAcademiaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditingAcademia) {
        updateAcademia(currentAcademia);
        setSaveStatus('Academia entry updated successfully!');
      } else {
        addAcademia({ ...currentAcademia, id: uuidv4() });
        setSaveStatus('New academia entry added successfully!');
      }
      
      setCurrentAcademia({ id: '', title: '', institution: '', year: '', description: '' });
      setIsEditingAcademia(false);
      
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Error saving academia entry:', error);
      setSaveStatus('Error saving academia entry. Please try again.');
    }
  };

  // Edit project
  const handleEditProject = (project: ProjectContent) => {
    setCurrentProject(project);
    setIsEditingProject(true);
  };

  // Edit academia
  const handleEditAcademia = (academia: AcademiaContent) => {
    setCurrentAcademia(academia);
    setIsEditingAcademia(true);
  };

  // Delete project
  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      setSaveStatus('Project deleted successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  // Delete academia
  const handleDeleteAcademia = (id: string) => {
    if (window.confirm('Are you sure you want to delete this academia entry?')) {
      deleteAcademia(id);
      setSaveStatus('Academia entry deleted successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  if (projectsLoading || academiaLoading) return <div className="p-4">Loading...</div>;

  return (
    <div className="admin-panel p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {saveStatus && (
        <div className={`p-3 mb-4 rounded ${saveStatus.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {saveStatus}
        </div>
      )}
      
      <div className="mb-6">
        <div className="flex border-b">
          <button 
            className={`py-2 px-4 ${activeTab === 'projects' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === 'academia' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('academia')}
          >
            Academia
          </button>
        </div>
      </div>
      
      {activeTab === 'projects' ? (
        <div>
          <div className="bg-white p-6 rounded shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">{isEditingProject ? 'Edit Project' : 'Add New Project'}</h2>
            
            <form onSubmit={handleProjectSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-2 font-medium">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={currentProject.title}
                  onChange={handleProjectChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block mb-2 font-medium">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={currentProject.description}
                  onChange={handleProjectChange}
                  className="w-full p-2 border rounded h-32"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="imageUrl" className="block mb-2 font-medium">Image URL:</label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={currentProject.imageUrl}
                  onChange={handleProjectChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="technologies" className="block mb-2 font-medium">Technologies (comma-separated):</label>
                <input
                  type="text"
                  id="technologies"
                  name="technologies"
                  value={currentProject.technologies?.join(', ')}
                  onChange={handleProjectChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div className="flex gap-2">
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isEditingProject ? 'Update Project' : 'Add Project'}
                </button>
                
                {isEditingProject && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsEditingProject(false);
                      setCurrentProject({ id: '', title: '', description: '', imageUrl: '', technologies: [] });
                    }}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Projects List</h2>
            
            {projects.length === 0 ? (
              <p className="text-gray-500">No projects available. Add some projects to get started.</p>
            ) : (
              <div className="space-y-4">
                {projects.map((item) => (
                  <div key={item.id} className="border p-4 rounded bg-white">
                    <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                    <p className="mb-4 text-gray-700">{item.description}</p>
                    {item.imageUrl && <p className="mb-2 text-sm text-gray-500">Image: {item.imageUrl}</p>}
                    {item.technologies && item.technologies.length > 0 && (
                      <p className="mb-4 text-sm text-gray-500">Technologies: {item.technologies.join(', ')}</p>
                    )}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditProject(item)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteProject(item.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-white p-6 rounded shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">{isEditingAcademia ? 'Edit Academia Entry' : 'Add New Academia Entry'}</h2>
            
            <form onSubmit={handleAcademiaSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-2 font-medium">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={currentAcademia.title}
                  onChange={handleAcademiaChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="institution" className="block mb-2 font-medium">Institution:</label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  value={currentAcademia.institution}
                  onChange={handleAcademiaChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="year" className="block mb-2 font-medium">Year:</label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  value={currentAcademia.year}
                  onChange={handleAcademiaChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block mb-2 font-medium">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={currentAcademia.description}
                  onChange={handleAcademiaChange}
                  className="w-full p-2 border rounded h-32"
                  required
                />
              </div>
              
              <div className="flex gap-2">
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isEditingAcademia ? 'Update Entry' : 'Add Entry'}
                </button>
                
                {isEditingAcademia && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsEditingAcademia(false);
                      setCurrentAcademia({ id: '', title: '', institution: '', year: '', description: '' });
                    }}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Academia List</h2>
            
            {academia.length === 0 ? (
              <p className="text-gray-500">No academia entries available. Add some entries to get started.</p>
            ) : (
              <div className="space-y-4">
                {academia.map((item) => (
                  <div key={item.id} className="border p-4 rounded bg-white">
                    <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                    <p className="mb-1 text-gray-600">{item.institution}, {item.year}</p>
                    <p className="mb-4 text-gray-700">{item.description}</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditAcademia(item)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteAcademia(item.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;