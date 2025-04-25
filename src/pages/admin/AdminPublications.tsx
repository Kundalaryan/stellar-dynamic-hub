
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Import the publication data
import { publications as initialPublications } from "@/data/publications";

const AdminPublications = () => {
  const [publications, setPublications] = useState(initialPublications);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journal: '',
    year: new Date().getFullYear(),
    doi: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      authors: '',
      journal: '',
      year: new Date().getFullYear(),
      doi: ''
    });
    setIsAdding(false);
    setIsEditing(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new publication with a new ID
    const newPublication = {
      id: Math.max(...publications.map(p => p.id), 0) + 1,
      ...formData
    };
    
    setPublications(prev => [...prev, newPublication]);
    toast.success('Publication added successfully');
    resetForm();
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing === null) return;
    
    setPublications(prev => 
      prev.map(pub => pub.id === isEditing ? { ...pub, ...formData } : pub)
    );
    
    toast.success('Publication updated successfully');
    resetForm();
  };

  const handleEdit = (id: number) => {
    const publication = publications.find(pub => pub.id === id);
    if (publication) {
      setFormData({
        title: publication.title,
        authors: publication.authors,
        journal: publication.journal,
        year: publication.year,
        doi: publication.doi
      });
      setIsEditing(id);
      setIsAdding(false);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this publication?')) {
      setPublications(prev => prev.filter(pub => pub.id !== id));
      toast.success('Publication deleted successfully');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Publications</h1>
        {!isAdding && !isEditing && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Publication
          </Button>
        )}
      </div>
      
      {(isAdding || isEditing !== null) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{isAdding ? 'Add New Publication' : 'Edit Publication'}</CardTitle>
            <CardDescription>
              {isAdding 
                ? 'Create a new publication entry' 
                : 'Edit publication details'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={isAdding ? handleAddSubmit : handleEditSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Publication Title</label>
                <Input 
                  id="title" 
                  name="title" 
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter publication title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="authors" className="text-sm font-medium">Authors</label>
                <Input 
                  id="authors" 
                  name="authors" 
                  value={formData.authors}
                  onChange={handleInputChange}
                  placeholder="Author names separated by commas"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="journal" className="text-sm font-medium">Journal</label>
                  <Input 
                    id="journal" 
                    name="journal" 
                    value={formData.journal}
                    onChange={handleInputChange}
                    placeholder="Journal name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="year" className="text-sm font-medium">Year</label>
                  <Input 
                    id="year" 
                    name="year" 
                    type="number" 
                    value={formData.year}
                    onChange={handleInputChange}
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="doi" className="text-sm font-medium">DOI</label>
                <Input 
                  id="doi" 
                  name="doi" 
                  value={formData.doi}
                  onChange={handleInputChange}
                  placeholder="DOI reference number"
                  required
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit">
                  {isAdding ? 'Add Publication' : 'Update Publication'}
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
          <CardTitle>Publication List</CardTitle>
          <CardDescription>
            Manage your research publications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Authors</TableHead>
                <TableHead>Journal</TableHead>
                <TableHead>Year</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {publications.map((pub) => (
                <TableRow key={pub.id}>
                  <TableCell className="font-medium">{pub.title}</TableCell>
                  <TableCell>{pub.authors}</TableCell>
                  <TableCell>{pub.journal}</TableCell>
                  <TableCell>{pub.year}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(pub.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(pub.id)}>
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

export default AdminPublications;
