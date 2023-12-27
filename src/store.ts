import { configureStore } from '@reduxjs/toolkit';
import friendSlice from './features/friends/friendSlice';
import messageSlice from './features/messages/messageSlice';
import notificationSlice from './features/notifications/notificationSlice';
import userReducer from './features/users/userSlice';
import authReducer from './features/auth/authSlice';
import postReducer from './features/posts/postSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        posts: postReducer,
        friends: friendSlice,
        messages: messageSlice,
        notifications: notificationSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
