import { privateAxios } from '@src/lib/axiosClient';
import { ILogin } from '../models/auth';
import { ENDPOINTS } from '@src/constants/endpoints';

// [POST] /api/v1/auth/login
export const loginService = async (params: ILogin) => {
    const res = await privateAxios.post(ENDPOINTS.LOGIN, params);
    return res.data;
};

// [POST] /api/v1/auth/logout
export const logoutService = async () => {
    const res = await privateAxios.post(ENDPOINTS.LOGOUT, null);
    return res.data;
};

// [POST] /api/v1/users/current-user
export const getCurrentUserByAccessTokenService = async (accessToken: string) => {
    const res = await privateAxios.post(
        ENDPOINTS.GET_CURRENT_USER_BY_ACCESS_TOKEN,
        null,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );
    return res.data;
};
