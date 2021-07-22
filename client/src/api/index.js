import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5000/api'});

export const signIn = (formData)=>API.post('/users/signIn',formData);
export const signUp = (formData)=>API.post('/users/signUp',formData);

