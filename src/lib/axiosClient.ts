import { STORAGE_KEY } from '@src/constants/constants';
import { API_URL } from '@src/constants/endpoints';
import { refreshTokenService } from '@src/features/auth/services/authService';
import axios, { InternalAxiosRequestConfig } from 'axios';
import jwt_decode, { JwtPayload } from 'jwt-decode';

const publicAxios = axios.create({
    baseURL: API_URL,
    timeout: 30000,
});

const privateAxios = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    withCredentials: true,
});

const authAxios = axios.create({
    baseURL: API_URL as string,
    timeout: 30000,
    withCredentials: true,
});

const accessTokenInterceptor = (req: InternalAxiosRequestConfig) => {
    try {
        const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
        if (accessToken) {
            req.headers!['Authorization'] = `Bearer ${accessToken}`;
        }

        return req;
    } catch (error) {
        console.error(error);
        return Promise.reject((error as Error).message);
    }
};

authAxios.interceptors.request.use(accessTokenInterceptor);

privateAxios.interceptors.request.use(async (config: any) => {
    try {
        const currentDate = new Date();
        const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
        const decodedUser = jwt_decode<JwtPayload>(accessToken!);

        if (decodedUser.exp && decodedUser.exp < currentDate.getTime() / 1000) {
            const data = await refreshTokenService();
            config.headers!['Authorization'] = `Bearer ${data.content}`;
            sessionStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, data.content);
        }

        return config;
    } catch (err) {
        console.error(err);
    }
});

export { authAxios, privateAxios, publicAxios };
