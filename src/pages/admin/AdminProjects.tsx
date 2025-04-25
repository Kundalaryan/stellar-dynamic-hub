
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

// Import the projects data
import { projects as initialProjects } from "@/data/projects";

const categories = ["AI", "Quantum", "Energy", "Blockchain", "Materials"];

const AdminProjects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: categories[0],
    image: '',
    link: '#'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: categories[0],
      image: '',
      link: '#'
    });
    setIsAdding(false);
    setIsEditing(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use a placeholder image if none provided
    const imageUrl = formData.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600";
    
    // Create new project with a new ID
    const newProject = {
      id: Math.max(...projects.map(p => p.id), 0) + 1,
      ...formData,
      image: imageUrl
    };
    
    setProjects(prev => [...prev, newProject]);
    toast.success('Project added successfully');
    resetForm();
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing === null) return;
    
    // Find current project to preserve image if not changed
    const currentProject = projects.find(p => p.id === isEditing);
    const imageUrl = formData.image || (currentProject ? currentProject.image : "");
    
    setProjects(prev => 
      prev.map(project => project.id === isEditing ? 
        { ...project, ...formData, image: imageUrl } : project
      )
    );
    
    toast.success('Project updated successfully');
    resetForm();
  };

  const handleEdit = (id: number) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        category: project.category,
        image: project.image,
        link: project.link
      });
      setIsEditing(id);
      setIsAdding(false);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(project => project.id !== id));
      toast.success('Project deleted successfully');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Research Projects</h1>
        {!isAdding && !isEditing && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Button>
        )}
      </div>
      
      {(isAdding || isEditing !== null) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{isAdding ? 'Add New Project' : 'Edit Project'}</CardTitle>
            <CardDescription>
              {isAdding 
                ? 'Create a new research project' 
                : 'Edit project details'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={isAdding ? handleAddSubmit : handleEditSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Project Title</label>
                <Input 
                  id="title" 
                  name="title" 
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter project title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief project description"
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <Select 
                  value={formData.category} 
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium">Project Image URL</label>
                <div className="flex gap-2">
                  <Input 
                    id="image" 
                    name="image" 
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                  {/* In a real app, this would trigger image upload */}
                  <Button type="button" variant="outline" className="shrink-0">
                    <Upload className="h-4 w-4 mr-2" /> Upload
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Leave blank to use a default image.
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="link" className="text-sm font-medium">Project Link</label>
                <Input 
                  id="link" 
                  name="link" 
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="https://example.com/project"
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit">
                  {isAdding ? 'Add Project' : 'Update Project'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Projects List</CardTitle>
          <CardDescription>
            Manage your research projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell className="max-w-sm">
                    <div className="truncate">{project.description}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{project.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(project.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProjects;
