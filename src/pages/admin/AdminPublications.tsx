
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { publicationsApi } from "@/services/api";

const AdminPublications = () => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journal: '',
    year: new Date().getFullYear(),
    doi: ''
  });

  // Fetch publications
  const { 
    data: publications = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['publications'],
    queryFn: publicationsApi.getAll,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: publicationsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publications'] });
      toast.success('Publication added successfully');
      resetForm();
    },
    onError: (error: any) => {
      toast.error(`Error adding publication: ${error.message}`);
    }
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => 
      publicationsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publications'] });
      toast.success('Publication updated successfully');
      resetForm();
    },
    onError: (error: any) => {
      toast.error(`Error updating publication: ${error.message}`);
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: publicationsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publications'] });
      toast.success('Publication deleted successfully');
    },
    onError: (error: any) => {
      toast.error(`Error deleting publication: ${error.message}`);
    }
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
    createMutation.mutate(formData);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing === null) return;
    
    updateMutation.mutate({
      id: isEditing,
      data: formData
    });
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
      deleteMutation.mutate(id);
    }
  };

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Failed to load publications. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

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
                <Button 
                  type="submit" 
                  disabled={isAdding ? createMutation.isPending : updateMutation.isPending}
                >
                  {(isAdding ? createMutation.isPending : updateMutation.isPending) ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...</>
                  ) : (
                    isAdding ? 'Add Publication' : 'Update Publication'
                  )}
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
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-navy-600" />
            </div>
          ) : (
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
                {publications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No publications found. Add your first one!
                    </TableCell>
                  </TableRow>
                ) : (
                  publications.map((pub) => (
                    <TableRow key={pub.id}>
                      <TableCell className="font-medium">{pub.title}</TableCell>
                      <TableCell>{pub.authors}</TableCell>
                      <TableCell>{pub.journal}</TableCell>
                      <TableCell>{pub.year}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEdit(pub.id)}
                            disabled={updateMutation.isPending}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(pub.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPublications;
