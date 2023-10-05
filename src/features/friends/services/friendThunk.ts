import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IFindFriend, IFindUsersByKeyword } from '../models/friend';
import { findAllFriendsSevice, findAllUsersByKeywordService } from './friendService';

export const findAllFriends = createAsyncThunk(
    'findAllFriends',
    async (param: IFindFriend, { rejectWithValue }) => {
        try {
            const data = await findAllFriendsSevice(param);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

export const findAllUsersByKeyword = createAsyncThunk(
    'findAllUsersByKeyword',
    async (param: IFindUsersByKeyword, { rejectWithValue }) => {
        try {
            const data = await findAllUsersByKeywordService(param);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);
