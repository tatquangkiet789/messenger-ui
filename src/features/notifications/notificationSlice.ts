import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAddFriendNotification } from './models/notification';
import {
    acceptAddFriendNotification,
    createAddFriendNotification,
    declineAddFriendNotification,
    findAllAddFriendNotifications,
} from './services/notificationThunk';
import { AxiosError } from 'axios';

interface INotificationState {
    addFriendNotificationList: IAddFriendNotification[];
    loading: boolean;
    error: string;
}

const initialState: INotificationState = {
    addFriendNotificationList: [],
    loading: false,
    error: '',
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        removeSelectedAddFriendNotification: (state, action: PayloadAction<number>) => {
            state.addFriendNotificationList = [...state.addFriendNotificationList].filter(
                (notification) => notification.id !== action.payload,
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(findAllAddFriendNotifications.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(findAllAddFriendNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.addFriendNotificationList = action.payload.content;
            })
            .addCase(findAllAddFriendNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
            })
            .addCase(acceptAddFriendNotification.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(acceptAddFriendNotification.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(acceptAddFriendNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
            })
            .addCase(declineAddFriendNotification.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(declineAddFriendNotification.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(declineAddFriendNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
            })
            .addCase(createAddFriendNotification.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(createAddFriendNotification.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createAddFriendNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
            });
    },
});

export const { removeSelectedAddFriendNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
