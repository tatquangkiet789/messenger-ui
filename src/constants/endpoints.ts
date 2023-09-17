export const API_URL = import.meta.env.VITE_API_URL;
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const ENDPOINTS = {
    // Authentication endpoints
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    GET_CURRENT_USER_BY_ACCESS_TOKEN: '/users/current-user',
    REFRESH_TOKEN: '/auth/refresh-token',
    UPDATE_PASSWORD: '/auth/update-password',

    // Friend endpoints
    FIND_ALL_FRIENDS: (page: number) => `/friends?page=${page}`,

    // Message endpoints
    FIND_ALL_MESSAGES: (userId: number, page: number) =>
        `/messages/${userId}?page=${page}`,
    CREATE_NEW_MESSAGE: '/messages/create',
};
