import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFindUsersByKeyword } from '../models/user';
import { findAllUsersByKeywordService } from './userService';
import { AxiosError } from 'axios';

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
