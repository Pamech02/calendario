import axios from 'axios';
import { getEnvVaribales } from '../helpers/getEnvVariables';

const {VITE_API_URL} = getEnvVaribales();

const calendarApi = axios.create({
    baseURL:VITE_API_URL
});

//congigurar interceptores
calendarApi.interceptors.request.use(config =>{
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    return config;
})

export default calendarApi;