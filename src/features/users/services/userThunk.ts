import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IFindUsersByKeyword } from '../models/user';
import { findAllUsersByKeywordService } from './userService';

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
