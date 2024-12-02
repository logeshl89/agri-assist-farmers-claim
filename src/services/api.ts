import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'admin';
  phone?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
}

export interface DamageReport {
  id: string;
  status: string;
  createdAt: string;
  cropType: string;
  estimatedDamage: number;
  farmer: {
    name: string;
  };
}

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post<LoginResponse>('/auth/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return response.data;
  },

  register: async (userData: RegisterData) => {
    const response = await api.post<LoginResponse>('/auth/register', userData);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

export const damages = {
  create: async (formData: FormData) => {
    return api.post('/damages', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  getAll: async () => {
    return api.get('/damages');
  },

  getStatus: async (id: string) => {
    return axios.get<DamageReport>(`${API_URL}/damages/status/${id}`);
  },

  updateStatus: async (id: string, status: string) => {
    return api.patch(`/damages/${id}/status`, { status });
  }
};

export const farmers = {
  createProfile: async (data: any) => {
    return api.post('/farmers', data);
  },

  updateProfile: async (id: string, data: any) => {
    return api.patch(`/farmers/${id}`, data);
  },

  getProfile: async () => {
    return api.get('/farmers/profile');
  },

  getAll: async () => {
    return api.get('/farmers');
  }
};

export const schemes = {
  getAll: async () => {
    return api.get('/schemes');
  },

  getById: async (id: string) => {
    return api.get(`/schemes/${id}`);
  }
};

export const contact = {
  submit: async (data: any) => {
    return api.post('/contact', data);
  }
};

export default api;