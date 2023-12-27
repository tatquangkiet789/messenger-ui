import { authAxios, publicAxios } from '@src/lib/axiosClient';
import { Login, IUpdatePassword } from '../models/auth';
import { ENDPOINTS } from '@src/constants/endpoints';

// [POST] /api/v1/auth/login
export const loginService = async (params: Login) => {
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
    const res = await authAxios.post(ENDPOINTS.REFRESH_TOKEN, null);
    return res.data;
};

// [POST] /api/v1/auth/update-password
export const updatePasswordService = async (data: IUpdatePassword) => {
    const { formData, accessToken } = data;
    const res = await authAxios.post(ENDPOINTS.UPDATE_PASSWORD, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
};

// [POST] /api/v1/auth/logout
export const logoutService = async () => {
    const res = await authAxios.post(ENDPOINTS.LOGOUT, null);
    return res.data;
};

// [POST] /api/v1/auth/current-user
export const getCurrentUserByAccessTokenService = async () => {
    const res = await authAxios.post(ENDPOINTS.GET_CURRENT_USER_BY_ACCESS_TOKEN);
    return res.data;
};
