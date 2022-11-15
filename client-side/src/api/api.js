import axios from 'axios'


const API = axios.create({ baseURL: 'https://invest-for-you.herokuapp.com'});

// ' /  http://localhost:5000 https://invest-for-you.herokuapp.com/

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const getAllCompanies = () => API.get('/api/v1/companies');
export const createCompany = (newCompany) => API.post('/api/v1/companies', newCompany);
export const GetAllPrices = () => API.get('/api/v1/companies/MyAccount');
export const newPrice = (newPrice) => API.post('/api/v1/companies/MyAccount', newPrice);
export const updateCompany = (id, updateComp) => API.patch(`/api/v1/companies/${id}`, updateComp);
export const deleteCompany = (id) => API.delete(`/api/v1/companies/${id}`);
export const likeCompany = (id) => API.patch(`/api/v1/companies/${id}/likeCompany`);
///////////////////////////////////////////////////////7
export const getAllNews = () => API.get('/api/v1/companies/ir');
export const createNews = (newNews) => API.post('/api/v1/companies/ir', newNews);

// trebas da implementujes frogot password cijeli put i da promjenis password 

export const forgotPassword = formData => API.post('/api/v1/users/forgotPassword', formData)
export const singin = (formData) => API.post('/api/v1/users/login', formData);
export const signup = (formData) => API.post('/api/v1/users/signup', formData);
export const getAllUsers = () => API.get('/api/v1/users/all');
export const getUser = (id) => API.get(`api/v1/users/${id}`);
export const getMe = () => API.get('/api/v1/users/me');
export const updateUser = (id, formData) => API.patch(`/api/v1/users/${id}`, formData);
export const deleteUser = (id) => API.delete(`/api/v1/users/${id}`);
export const updateMe = (id, formData) => API.patch(`/api/v1/users/me/${id}`, formData);
export const deleteMe = (id) => API.delete(`/api/v1/users/me/${id}`);

