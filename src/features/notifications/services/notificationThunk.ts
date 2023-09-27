import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    IAcceptOrDeclineAddFriendNotification,
    IFindAddFriendNotification,
} from '../models/notification';
import {
    acceptAddFriendNotificationService,
    declineAddFriendNotificationService,
    findAllAddFriendNotificationsService,
} from './notificationService';
import { AxiosError } from 'axios';

export const findAllAddFriendNotifications = createAsyncThunk(
    'findAllAddFriendNotifications',
    async (param: IFindAddFriendNotification, { rejectWithValue }) => {
        try {
            const data = await findAllAddFriendNotificationsService(param);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

export const acceptAddFriendNotification = createAsyncThunk(
    'acceptAddFriendNotification',
    async (param: IAcceptOrDeclineAddFriendNotification, { rejectWithValue }) => {
        try {
            const data = await acceptAddFriendNotificationService(param);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

export const declineAddFriendNotification = createAsyncThunk(
    'declineAddFriendNotification',
    async (param: IAcceptOrDeclineAddFriendNotification, { rejectWithValue }) => {
        try {
            const data = await declineAddFriendNotificationService(param);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);
