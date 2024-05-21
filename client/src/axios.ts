import axios from 'axios';
export const baseURL: string = 'http://localhost:8000/api/v1/';
export const clientURL : string = 'http://localhost:5173/'
import {jwtDecode} from 'jwt-decode'
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';

export const axiosNoToken = axios.create({
    baseURL,
    withCredentials: true
});
export const axiosToken = axios.create({
    baseURL,
    headers: {
        token: (localStorage.getItem("accessToken") || ''),
    },
    withCredentials: true
})
axiosToken.interceptors.request.use(
    async (config) => {
        const accessToken= (localStorage.getItem("accessToken") || '');
        const date = new Date();
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken)
            if (decodedToken.exp! < date.getTime()/1000) {
               try {
                const resp : {accessToken : string} = await axiosNoToken.post("/auth/token/refresh")
                localStorage.setItem("accessToken", resp.accessToken)
               } catch (error) {
                console.error(error)
               }
            }
        }
        return config;
    }
)