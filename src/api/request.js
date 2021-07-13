import axios from 'axios';
import { BASE_URL } from './constants';
const headers={};

if(localStorage.getItem('token'))
  headers['Authorization']= localStorage.getItem('token');

export const Axios = axios.create({
  baseURL: BASE_URL,
  headers
});

