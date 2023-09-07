import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import friendSlice from './reducers/friendSlice';
import messageSlice from './reducers/messageSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        friends: friendSlice,
        messages: messageSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
