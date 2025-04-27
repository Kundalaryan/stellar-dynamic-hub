
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Create axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Publications API
export const publicationsApi = {
  getAll: async () => {
    const response = await api.get('/publications');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/publications/${id}`);
    return response.data;
  },
  create: async (publication: any) => {
    const response = await api.post('/publications', publication);
    return response.data;
  },
  update: async (id: number, publication: any) => {
    const response = await api.put(`/publications/${id}`, publication);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/publications/${id}`);
    return response.data;
  }
};

// Projects API
export const projectsApi = {
  getAll: async () => {
    const response = await api.get('/projects');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
  create: async (project: any) => {
    const response = await api.post('/projects', project);
    return response.data;
  },
  update: async (id: number, project: any) => {
    const response = await api.put(`/projects/${id}`, project);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  }
};

// Team API
export const teamApi = {
  getAll: async () => {
    const response = await api.get('/team');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/team/${id}`);
    return response.data;
  },
  create: async (member: any) => {
    const response = await api.post('/team', member);
    return response.data;
  },
  update: async (id: number, member: any) => {
    const response = await api.put(`/team/${id}`, member);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/team/${id}`);
    return response.data;
  }
};

// Events API
export const eventsApi = {
  getAll: async () => {
    const response = await api.get('/events');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },
  create: async (event: any) => {
    const response = await api.post('/events', event);
    return response.data;
  },
  update: async (id: number, event: any) => {
    const response = await api.put(`/events/${id}`, event);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  }
};
