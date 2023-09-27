import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IFindMessage, INewMessage } from '../models/message';
import { findAllMessagesService, createNewMessageService } from './messageService';

// [GET] /api/v1/messages/:userId?page=:page
export const findAllMessages = createAsyncThunk(
    'findAllMessages',
    async (param: IFindMessage, { rejectWithValue }) => {
        try {
            const data = await findAllMessagesService(param);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

// [POST] /api/v1/messages/create
export const createNewMessage = createAsyncThunk(
    'createNewMessage',
    async (param: INewMessage, { rejectWithValue }) => {
        try {
            const data = await createNewMessageService(param);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);
