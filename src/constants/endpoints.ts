export const API_URL = import.meta.env.VITE_API_URL;
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const ENDPOINTS = {
    // Authentication endpoints
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    GET_CURRENT_USER_BY_ACCESS_TOKEN: '/auth/current-user',
    REFRESH_TOKEN: '/auth/refresh-token',
    UPDATE_PASSWORD: '/auth/update-password',

    // Friend endpoints
    FIND_ALL_FRIENDS: (page: number) => `/friends?page=${page}`,

    // Message endpoints
    FIND_ALL_MESSAGES: (userId: number, page: number) => `/messages/${userId}?page=${page}`,
    CREATE_NEW_MESSAGE: '/messages/create',

    // Notification endpoints
    FIND_ALL_ADD_FRIEND_NOTIFICATIONS: (page: number) => `/notifications?page=${page}`,
    CREATE_ADD_FRIEND_NOTIFICATION: `/notifications/add-friend`,
    ACCEPT_ADD_FRIEND_NOTIFICATION: `/notifications/accept`,
    DECLINE_ADD_FRIEND_NOTIFICATION: `/notifications/decline`,

    // User endpoints
    FIND_ALL_USERS_BY_KEYWORD: (keyword: string) => `/users/search?q=${keyword}`,
};
