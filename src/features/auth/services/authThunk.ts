import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Login, IUpdatePassword } from '../models/auth';
import {
    loginService,
    registerService,
    updatePasswordService,
    logoutService,
    getCurrentUserByAccessTokenService,
} from './authService';

export const login = createAsyncThunk('login', async (params: Login, { rejectWithValue }) => {
    try {
        const data = await loginService(params);
        return data;
    } catch (error) {
        const err = error as AxiosError;
        if (!err.response) throw err;
        return rejectWithValue(err.response.data);
    }
});

export const register = createAsyncThunk(
    'register',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const data = await registerService(formData);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

export const updatePassword = createAsyncThunk(
    'updatePassword',
    async (param: IUpdatePassword, { rejectWithValue }) => {
        try {
            const data = await updatePasswordService(param);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

export const logout = createAsyncThunk('logout', async (_, { rejectWithValue }) => {
    try {
        const data = await logoutService();
        return data;
    } catch (error) {
        const err = error as AxiosError;
        if (!err.response) throw err;
        return rejectWithValue(err.response.data);
    }
});

export const getCurrentUserByAccessToken = createAsyncThunk(
    'getCurrentUserByAccessToken',
    async (_, { rejectWithValue }) => {
        try {
            const data = await getCurrentUserByAccessTokenService();
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);
