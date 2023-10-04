import { privateAxios, publicAxios } from '@src/lib/axiosClient';
import { ILogin, IUpdatePassword } from '../models/auth';
import { ENDPOINTS } from '@src/constants/endpoints';

// [POST] /api/v1/auth/login
export const loginService = async (params: ILogin) => {
    const res = await publicAxios.post(ENDPOINTS.LOGIN, params, {
        withCredentials: true,
    });
    return res.data;
};

// [POST] /api/v1/auth/register
export const registerService = async (formData: FormData) => {
    const res = await publicAxios.post(ENDPOINTS.REGISTER, formData);
    return res.data;
};

// [POST] /api/v1/auth/refresh-token
export const refreshTokenService = async () => {
    const res = await privateAxios.post(ENDPOINTS.REFRESH_TOKEN, null);
    return res.data;
};

// [POST] /api/v1/auth/update-password
export const updatePasswordService = async (data: IUpdatePassword) => {
    const { formData, accessToken } = data;
    const res = await privateAxios.post(ENDPOINTS.UPDATE_PASSWORD, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
};

// [POST] /api/v1/auth/logout
export const logoutService = async () => {
    const res = await privateAxios.post(ENDPOINTS.LOGOUT, null);
    return res.data;
};

// [POST] /api/v1/auth/current-user
export const getCurrentUserByAccessTokenService = async (accessToken: string) => {
    const res = await privateAxios.post(ENDPOINTS.GET_CURRENT_USER_BY_ACCESS_TOKEN, null, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
};
