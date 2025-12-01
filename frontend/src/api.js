import axios from 'axios';
import API_URL from './config';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Categories
export const getCategories = () => api.get('/categories/');
export const createCategory = (data) => api.post('/categories/', data);

// Products
export const getProducts = (params) => api.get('/products/', { params });
export const createProduct = (data) => api.post('/products/', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Sales
export const getSales = () => api.get('/sales/');
export const createSale = (data) => api.post('/sales/', data);

// Dashboard
export const getDashboardStats = () => api.get('/dashboard/stats');

export default api;
