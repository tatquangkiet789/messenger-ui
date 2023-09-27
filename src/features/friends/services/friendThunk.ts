import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IFindFriend } from '../models/friend';
import { findAllFriendsSevice } from './friendService';

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
