import axios from 'axios';
const baseURL: string = 'http://localhost:8000/api/v1/';
export const axiosNoToken = axios.create({
    baseURL,
});
export const axiosToken = axios.create({
    baseURL,
    headers: {
        authorization: 'Bearer ' + (localStorage.getItem('token') || ''),
    },
});