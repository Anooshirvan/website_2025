import React, { useState, useEffect } from 'react';
import { useContentManager } from '../services/dataService';
import { v4 as uuidv4 } from 'uuid';

interface ContentData {
  id: string;
  title: string;
  content: string;
}

const AdminPanel: React.FC = () => {
  const { contents, loading, updateContent, addContent, deleteContent } = useContentManager();
  const [currentContent, setCurrentContent] = useState<ContentData>({ id: '', title: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentContent({ ...currentContent, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        updateContent(currentContent);
        setSaveStatus('Content updated successfully!');
      } else {
        addContent({ ...currentContent, id: uuidv4() });
        setSaveStatus('New content added successfully!');
      }
      
      setCurrentContent({ id: '', title: '', content: '' });
      setIsEditing(false);
      
      // Clear status message after 3 seconds
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      setSaveStatus('Error saving content. Please try again.');
    }
  };

  const handleEdit = (content: ContentData) => {
    setCurrentContent(content);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      deleteContent(id);
      setSaveStatus('Content deleted successfully!');
      
      // Clear status message after 3 seconds
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="admin-panel p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Content Management</h1>
      
      {saveStatus && (
        <div className={`p-3 mb-4 rounded ${saveStatus.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {saveStatus}
        </div>
      )}
      
      <div className="bg-white p-6 rounded shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Content' : 'Add New Content'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 font-medium">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={currentContent.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="content" className="block mb-2 font-medium">Content:</label>
            <textarea
              id="content"
              name="content"
              value={currentContent.content}
              onChange={handleInputChange}
              className="w-full p-2 border rounded h-32"
              required
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isEditing ? 'Update' : 'Add'}
            </button>
            
            {isEditing && (
              <button 
                type="button" 
                onClick={() => {
                  setIsEditing(false);
                  setCurrentContent({ id: '', title: '', content: '' });
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
        <h2 className="text-xl font-semibold mb-4">Content List</h2>
        
        {contents.length === 0 ? (
          <p className="text-gray-500">No content available. Add some content to get started.</p>
        ) : (
          <div className="space-y-4">
            {contents.map((item) => (
              <div key={item.id} className="border p-4 rounded bg-white">
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="mb-4 text-gray-700">{item.content}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
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
  );
};

export default AdminPanel;