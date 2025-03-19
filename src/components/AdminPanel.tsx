import React, { useState } from 'react';
import { useContentManager } from '../services/dataService';
import { v4 as uuidv4 } from 'uuid'; // You may need to install this: npm install uuid @types/uuid

interface ContentData {
  id: string;
  title: string;
  content: string;
}

const AdminPanel: React.FC = () => {
  const { contents, loading, updateContent, addContent, deleteContent } = useContentManager();
  const [currentContent, setCurrentContent] = useState<ContentData>({ id: '', title: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentContent({ ...currentContent, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      updateContent(currentContent);
      setIsEditing(false);
    } else {
      addContent({ ...currentContent, id: uuidv4() });
    }
    
    setCurrentContent({ id: '', title: '', content: '' });
  };

  const handleEdit = (content: ContentData) => {
    setCurrentContent(content);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    deleteContent(id);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-panel">
      <h2>{isEditing ? 'Edit Content' : 'Add New Content'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={currentContent.title}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={currentContent.content}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
        {isEditing && (
          <button type="button" onClick={() => {
            setIsEditing(false);
            setCurrentContent({ id: '', title: '', content: '' });
          }}>
            Cancel
          </button>
        )}
      </form>
      
      <h3>Content List</h3>
      {contents.length === 0 ? (
        <p>No content available.</p>
      ) : (
        <ul>
          {contents.map((item) => (
            <li key={item.id}>
              <h4>{item.title}</h4>
              <p>{item.content}</p>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;