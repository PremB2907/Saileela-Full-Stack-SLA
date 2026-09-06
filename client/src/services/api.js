import axios from 'axios';

const api = axios.create({ baseURL: '/api' });
api.interceptors.request.use((config) => { const token = localStorage.getItem('saileela_token'); if (token) config.headers.Authorization = `Bearer ${token}`; return config; });
export const siteApi = { content: () => api.get('/content'), yatra: () => api.get('/yatra/status'), site: () => api.get('/site') };
export const authApi = { login: (data) => api.post('/auth/login', data) };
export const donationApi = { order: (data) => api.post('/donations/order', data), confirm: (data) => api.post('/donations/confirm', data) };
export const enquiryApi = { contact: (data) => api.post('/enquiries/contact', data), advertisement: (data) => api.post('/enquiries/advertisements', data) };
export const registrationApi = { create: (data) => api.post('/registrations', data), verify: (number) => api.get(`/registrations/verify/${number}`) };
export const dbtApi = { submit: (formData) => api.post('/dbt', formData, { headers: { 'Content-Type': 'multipart/form-data' } }) };
export default api;
