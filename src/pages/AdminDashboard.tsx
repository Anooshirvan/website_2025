import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, X, Settings } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hero');
  const [sectionVisibility, setSectionVisibility] = useState({
    hero: true,
    about: true,
    expertise: true,
    projects: true,
    academia: true,
    contact: true,
    social: true
  });
  const [adminCredentials, setAdminCredentials] = useState({
    email: 'admin@anooshirvanmostmand.com',
    password: 'admin123'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [projects, setProjects] = useState([{ id: 1, title: '', description: '', image: '', link: '', isNewest: true, isVisible: true }]);
  const [academicItems, setAcademicItems] = useState([{ id: 1, title: '', description: '', image: '', link: '', isNewest: true, isVisible: true }]);
  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: 'LinkedIn', url: 'https://www.linkedin.com/in/anooshiravan-mostmand/', isActive: true },
    { id: 2, platform: 'GitHub', url: 'https://github.com/Anooshirvan', isActive: true },
    { id: 3, platform: 'Google Scholar', url: 'https://scholar.google.com', isActive: true },
    { id: 4, platform: 'X (Twitter)', url: '', isActive: false }
  ]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const toggleSectionVisibility = (section: string) => {
    setSectionVisibility(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateAdminCredentials = () => {
    localStorage.setItem('adminEmail', adminCredentials.email);
    localStorage.setItem('adminPassword', adminCredentials.password);
    alert('Admin credentials updated successfully!');
  };

  const addProject = () => {
    setProjects([...projects, { 
      id: projects.length + 1, 
      title: '', 
      description: '', 
      image: '', 
      link: '', 
      isNewest: true,
      isVisible: true
    }]);
  };

  const removeProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const toggleProjectVisibility = (id: number) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, isVisible: !project.isVisible } : project
    ));
  };

  const addAcademicItem = () => {
    setAcademicItems([...academicItems, { 
      id: academicItems.length + 1, 
      title: '', 
      description: '', 
      image: '', 
      link: '', 
      isNewest: true,
      isVisible: true
    }]);
  };

  const removeAcademicItem = (id: number) => {
    setAcademicItems(academicItems.filter(item => item.id !== id));
  };

  const toggleAcademicVisibility = (id: number) => {
    setAcademicItems(academicItems.map(item => 
      item.id === id ? { ...item, isVisible: !item.isVisible } : item
    ));
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { 
      id: socialLinks.length + 1, 
      platform: '', 
      url: '', 
      isActive: true 
    }]);
  };

  const removeSocialLink = (id: number) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setActiveTab('settings')}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
              <TabsTrigger value="hero">Hero Section</TabsTrigger>
              <TabsTrigger value="about">About Section</TabsTrigger>
              <TabsTrigger value="expertise">Expertise</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="academia">Academia</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="social">Social Links</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </ScrollArea>

          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Edit Hero Section</CardTitle>
                    <CardDescription>Update the main hero section content</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="hero-visibility" 
                      checked={sectionVisibility.hero}
                      onCheckedChange={() => toggleSectionVisibility('hero')}
                    />
                    <label htmlFor="hero-visibility" className="text-sm font-medium">
                      Show on website
                    </label>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input defaultValue="Energy Engineer & Data Scientist" />
                </div>
                <div>
                  <label className="text-sm font-medium">Subtitle</label>
                  <Input defaultValue="Dedicated to sustainable energy solutions and data-driven insights" />
                </div>
                <div>
                  <label className="text-sm font-medium">Hero Image</label>
                  <Input type="file" accept="image/*" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>Edit About Section</CardTitle>
                <CardDescription>Update your personal information and background</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input defaultValue="Anooshirvan Mostmand" />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea defaultValue="I'm an Energy Engineer and Data Scientist with expertise in energy systems, renewable energy integration, and data-driven solutions. With a background in Mechanical Engineering and an MSc in Energy and Nuclear Engineering, I combine technical knowledge with analytical skills to address complex energy challenges." />
                </div>
                <div>
                  <label className="text-sm font-medium">Profile Image</label>
                  <Input type="file" accept="image/*" />
                </div>
                <div>
                  <label className="text-sm font-medium">CV File</label>
                  <Input type="file" accept=".pdf" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expertise">
            <Card>
              <CardHeader>
                <CardTitle>Edit Expertise Section</CardTitle>
                <CardDescription>Update your areas of specialization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg">
                    <div>
                      <label className="text-sm font-medium">Title {index}</label>
                      <Input defaultValue={`Expertise ${index}`} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description {index}</label>
                      <Textarea defaultValue={`Description for expertise ${index}`} />
                    </div>
                  </div>
                ))}
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Edit Projects Section</CardTitle>
                <CardDescription>Update your project portfolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="space-y-4 p-4 border rounded-lg relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => removeProject(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div>
                      <label className="text-sm font-medium">Project Title</label>
                      <Input defaultValue={project.title} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea defaultValue={project.description} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Project Image</label>
                      <Input type="file" accept="image/*" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Project Link</label>
                      <Input type="url" defaultValue={project.link} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id={`newest-${project.id}`} defaultChecked={project.isNewest} />
                      <label htmlFor={`newest-${project.id}`} className="text-sm font-medium">
                        Show in initial view
                      </label>
                    </div>
                  </div>
                ))}
                <Button onClick={addProject} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Project
                </Button>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academia">
            <Card>
              <CardHeader>
                <CardTitle>Edit Academia Section</CardTitle>
                <CardDescription>Update your academic achievements and publications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {academicItems.map((item) => (
                  <div key={item.id} className="space-y-4 p-4 border rounded-lg relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => removeAcademicItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input defaultValue={item.title} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea defaultValue={item.description} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Image</label>
                      <Input type="file" accept="image/*" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Link</label>
                      <Input type="url" defaultValue={item.link} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id={`newest-academic-${item.id}`} defaultChecked={item.isNewest} />
                      <label htmlFor={`newest-academic-${item.id}`} className="text-sm font-medium">
                        Show in initial view
                      </label>
                    </div>
                  </div>
                ))}
                <Button onClick={addAcademicItem} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Academic Item
                </Button>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Edit Contact Information</CardTitle>
                <CardDescription>Update your contact details and current focus</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input defaultValue="anooshirvan.mostmand@gmail.com" />
                </div>
                <div>
                  <label className="text-sm font-medium">Current Focus</label>
                  <Textarea defaultValue="I'm currently focused on research and projects related to energy transition, machine learning applications in energy optimization, and innovative solutions for sustainable energy systems." />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Edit Social Links</CardTitle>
                <CardDescription>Update your social media and professional network links</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialLinks.map((link) => (
                  <div key={link.id} className="space-y-4 p-4 border rounded-lg relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => removeSocialLink(link.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div>
                      <label className="text-sm font-medium">Platform Name</label>
                      <Input defaultValue={link.platform} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">URL</label>
                      <Input type="url" defaultValue={link.url} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id={`active-${link.id}`} defaultChecked={link.isActive} />
                      <label htmlFor={`active-${link.id}`} className="text-sm font-medium">
                        Show on website
                      </label>
                    </div>
                  </div>
                ))}
                <Button onClick={addSocialLink} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Social Link
                </Button>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle>Manage Images</CardTitle>
                <CardDescription>Upload and manage all website images</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Hero Image</label>
                    <Input type="file" accept="image/*" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Profile Image</label>
                    <Input type="file" accept="image/*" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Project Images</label>
                    <Input type="file" accept="image/*" multiple />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Academic Images</label>
                    <Input type="file" accept="image/*" multiple />
                  </div>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard; 