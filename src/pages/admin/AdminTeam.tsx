
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Edit, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

// Import the team members data
import { teamMembers as initialTeamMembers } from "@/data/team";

const AdminTeam = () => {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('social.')) {
      const socialField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        social: {
          ...prev.social,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      bio: '',
      image: '',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    });
    setIsAdding(false);
    setIsEditing(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use a placeholder image if none provided
    const imageUrl = formData.image || "https://randomuser.me/api/portraits/lego/1.jpg";
    
    // Create new team member with a new ID
    const newMember = {
      id: Math.max(...teamMembers.map(m => m.id), 0) + 1,
      ...formData,
      image: imageUrl
    };
    
    setTeamMembers(prev => [...prev, newMember]);
    toast.success('Team member added successfully');
    resetForm();
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing === null) return;
    
    // Find current member to preserve image if not changed
    const currentMember = teamMembers.find(m => m.id === isEditing);
    const imageUrl = formData.image || (currentMember ? currentMember.image : "");
    
    setTeamMembers(prev => 
      prev.map(member => member.id === isEditing ? 
        { ...member, ...formData, image: imageUrl } : member
      )
    );
    
    toast.success('Team member updated successfully');
    resetForm();
  };

  const handleEdit = (id: number) => {
    const member = teamMembers.find(m => m.id === id);
    if (member) {
      setFormData({
        name: member.name,
        role: member.role,
        bio: member.bio,
        image: member.image,
        social: { ...member.social }
      });
      setIsEditing(id);
      setIsAdding(false);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      setTeamMembers(prev => prev.filter(member => member.id !== id));
      toast.success('Team member deleted successfully');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Team Members</h1>
        {!isAdding && !isEditing && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Team Member
          </Button>
        )}
      </div>
      
      {(isAdding || isEditing !== null) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{isAdding ? 'Add New Team Member' : 'Edit Team Member'}</CardTitle>
            <CardDescription>
              {isAdding 
                ? 'Add a new member to your team' 
                : 'Edit team member details'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={isAdding ? handleAddSubmit : handleEditSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">Role</label>
                <Input 
                  id="role" 
                  name="role" 
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Job title or role"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium">Bio</label>
                <Textarea 
                  id="bio" 
                  name="bio" 
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Brief biography"
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium">Profile Image URL</label>
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="social.linkedin" className="text-sm font-medium">LinkedIn</label>
                  <Input 
                    id="social.linkedin" 
                    name="social.linkedin" 
                    value={formData.social.linkedin}
                    onChange={handleInputChange}
                    placeholder="LinkedIn URL"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="social.twitter" className="text-sm font-medium">Twitter</label>
                  <Input 
                    id="social.twitter" 
                    name="social.twitter" 
                    value={formData.social.twitter}
                    onChange={handleInputChange}
                    placeholder="Twitter URL"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="social.github" className="text-sm font-medium">GitHub</label>
                  <Input 
                    id="social.github" 
                    name="social.github" 
                    value={formData.social.github}
                    onChange={handleInputChange}
                    placeholder="GitHub URL"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit">
                  {isAdding ? 'Add Team Member' : 'Update Team Member'}
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
          <CardTitle>Team Members List</CardTitle>
          <CardDescription>
            Manage your research team members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Bio</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell className="max-w-sm">
                    <div className="truncate">{member.bio}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(member.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(member.id)}>
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

export default AdminTeam;
