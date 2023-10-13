import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import friendSlice from './features/friends/friendSlice';
import messageSlice from './features/messages/messageSlice';
import notificationSlice from './features/notifications/notificationSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        friends: friendSlice,
        messages: messageSlice,
        notifications: notificationSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
