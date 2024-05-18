import axios from 'axios';
const baseURL: string = 'http://localhost:8000/api/v1/';
import {jwtDecode} from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux';
import { accessTokenSelector } from './redux/selector';
import { AppDispatch } from './redux/store';
import { updateAccessToken } from './features/auth/authSlice';
const accessToken = useSelector(accessTokenSelector)
export const axiosNoToken = axios.create({
    baseURL,
    withCredentials: true
});
export const axiosToken = axios.create({
    baseURL,
    headers: {
        authorization: 'Bearer ' + (accessToken || ''),
    },
    withCredentials: true
})
axiosToken.interceptors.request.use(
    async (config) => {
        const date = new Date();
        if (accessToken) {
            const dispatch = useDispatch<AppDispatch>();
            const decodedToken = jwtDecode(accessToken)
            if (decodedToken.exp! < date.getTime()/1000) {
               try {
                const resp : {accessToken : string} = await  axiosNoToken.post("/auth/token/refresh")
                dispatch(updateAccessToken(resp.accessToken))
               } catch (error) {
                console.error(error)
               }
            }
        }
        return config;
    }
)