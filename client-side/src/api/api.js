import axios from 'axios'


const API = axios.create({ baseURL: 'https://invest4you.herokuapp.com/' });


API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req; 
})

export const getAllCompanies = () => API.get('/api/v1/companies');
export const createCompany = (newCompany) => API.post('/api/v1/companies', newCompany);
export const updateCompany = (id, updateComp) => API.patch(`/api/v1/companies/${id}`, updateComp);
export const deleteCompany = (id) => API.delete(`/api/v1/companies/${id}`);
export const likeCompany = (id) => API.patch(`/api/v1/companies/${id}/likeCompany`);


// trebas da implementujes like opciju 


export const singin = (formData) => API.post('api/v1/users/login', formData);
export const signup = (formData) => API.post('api/v1/users/signup', formData);
