
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";

// Import the events data
import { events as initialEvents } from "@/data/events";

const eventTypes = ["Conference", "Workshop", "Lecture", "Presentation", "Seminar"];

const AdminEvents = () => {
  const [events, setEvents] = useState(initialEvents);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    type: eventTypes[0],
    registration: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, type: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, registration: checked }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      type: eventTypes[0],
      registration: false
    });
    setIsAdding(false);
    setIsEditing(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new event with a new ID
    const newEvent = {
      id: Math.max(...events.map(e => e.id), 0) + 1,
      ...formData
    };
    
    setEvents(prev => [...prev, newEvent]);
    toast.success('Event added successfully');
    resetForm();
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing === null) return;
    
    setEvents(prev => 
      prev.map(event => event.id === isEditing ? 
        { ...event, ...formData } : event
      )
    );
    
    toast.success('Event updated successfully');
    resetForm();
  };

  const handleEdit = (id: number) => {
    const event = events.find(e => e.id === id);
    if (event) {
      setFormData({
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description,
        type: event.type,
        registration: event.registration
      });
      setIsEditing(id);
      setIsAdding(false);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(event => event.id !== id));
      toast.success('Event deleted successfully');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        {!isAdding && !isEditing && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
        )}
      </div>
      
      {(isAdding || isEditing !== null) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{isAdding ? 'Add New Event' : 'Edit Event'}</CardTitle>
            <CardDescription>
              {isAdding 
                ? 'Create a new event' 
                : 'Edit event details'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={isAdding ? handleAddSubmit : handleEditSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Event Title</label>
                <Input 
                  id="title" 
                  name="title" 
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter event title"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">Date</label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <Input 
                        id="date" 
                        name="date" 
                        value={formData.date}
                        onChange={handleInputChange}
                        placeholder="e.g., June 15-16, 2025"
                        required
                      />
                      <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="time" className="text-sm font-medium">Time</label>
                  <Input 
                    id="time" 
                    name="time" 
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder="e.g., 9:00 AM - 5:00 PM"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">Location</label>
                <Input 
                  id="location" 
                  name="location" 
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Event venue"
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
                  placeholder="Event description"
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-medium">Event Type</label>
                  <Select 
                    value={formData.type} 
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Registration Required</label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch 
                      checked={formData.registration} 
                      onCheckedChange={handleSwitchChange} 
                      id="registration" 
                    />
                    <label htmlFor="registration">
                      {formData.registration ? 'Yes' : 'No'}
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit">
                  {isAdding ? 'Add Event' : 'Update Event'}
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
          <CardTitle>Events List</CardTitle>
          <CardDescription>
            Manage your upcoming events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Registration</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate">{event.location}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      event.type === "Conference" ? "default" : 
                      event.type === "Workshop" ? "secondary" : 
                      "outline"
                    }>
                      {event.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {event.registration ? (
                      <Badge variant="default" className="bg-green-500">Required</Badge>
                    ) : (
                      <Badge variant="outline">Optional</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(event.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(event.id)}>
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

export default AdminEvents;
