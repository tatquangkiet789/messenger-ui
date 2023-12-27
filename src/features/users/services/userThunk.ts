import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { findAllUsersByKeywordService, findTop10SuggestedUsersService } from './userService';

export const find10SuggestedUsers = createAsyncThunk(
    'find10SuggestedUsers',
    async (_, { rejectWithValue }) => {
        try {
            const data = await findTop10SuggestedUsersService();
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
    async (keyword: string, { rejectWithValue }) => {
        try {
            const data = await findAllUsersByKeywordService(keyword);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);
