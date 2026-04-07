import { apiClient } from './client';

export const authService = {
  register: async (data: any) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },
  login: async (data: any) => {
    const response = await apiClient.post('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export const linkService = {
  getAll: async () => {
    const response = await apiClient.get('/links');
    return response.data;
  },
  create: async (data: any) => {
    const response = await apiClient.post('/links', data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await apiClient.delete(`/links/${id}`);
    return response.data;
  },
  getAnalytics: async (id: number) => {
    const response = await apiClient.get(`/analytics/${id}`);
    return response.data;
  },
};
