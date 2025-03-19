import { useState, useEffect } from 'react';

// Define your data types based on your application needs
interface ContentData {
  id: string;
  title: string;
  content: string;
  // Add other fields as needed
}

// Local storage key
const STORAGE_KEY = 'website_content_data';

// Function to save data to localStorage
export const saveContent = (data: ContentData[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('Content saved successfully');
  } catch (error) {
    console.error('Error saving content:', error);
  }
};

// Function to load data from localStorage
export const loadContent = (): ContentData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading content:', error);
    return [];
  }
};

// Custom hook for content management
export const useContentManager = () => {
  const [contents, setContents] = useState<ContentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data on component mount
    const loadedData = loadContent();
    setContents(loadedData);
    setLoading(false);
  }, []);

  const updateContent = (updatedContent: ContentData) => {
    const updatedContents = contents.map(item => 
      item.id === updatedContent.id ? updatedContent : item
    );
    
    setContents(updatedContents);
    saveContent(updatedContents);
    return true;
  };

  const addContent = (newContent: ContentData) => {
    const updatedContents = [...contents, newContent];
    setContents(updatedContents);
    saveContent(updatedContents);
    return true;
  };

  const deleteContent = (id: string) => {
    const updatedContents = contents.filter(item => item.id !== id);
    setContents(updatedContents);
    saveContent(updatedContents);
    return true;
  };

  return {
    contents,
    loading,
    updateContent,
    addContent,
    deleteContent
  };
};