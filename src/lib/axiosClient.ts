import { API_URL } from '@src/constants/endpoints';
import axios from 'axios';

export const publicAxios = axios.create({
    baseURL: API_URL,
    timeout: 30000,
});

export const privateAxios = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    withCredentials: true,
});
