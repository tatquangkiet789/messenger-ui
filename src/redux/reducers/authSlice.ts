import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEY } from '@src/constants/constants';
import { IAuth, ILogin, IUpdatePassword } from '@src/modules/auth/models/auth';
import {
    loginService,
    getCurrentUserByAccessTokenService,
    logoutService,
    registerService,
    updatePasswordService,
} from '@src/modules/auth/services/authService';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface IAuthState {
    loading: boolean;
    currentUser: IAuth;
    error: string;
    registerMessage: string;
}

const initialState: IAuthState = {
    loading: false,
    currentUser: null as any,
    error: '',
    registerMessage: '',
};

export const login = createAsyncThunk('login', async (params: ILogin, { rejectWithValue }) => {
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
    async (param: string, { rejectWithValue }) => {
        try {
            const data = await getCurrentUserByAccessTokenService(param);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Login User
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.currentUser = null as any;
                sessionStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
                state.error = '';
            })
            .addCase(login.fulfilled, (state: IAuthState, action) => {
                state.loading = false;
                const { content } = action.payload;
                state.currentUser = content;
                sessionStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, content.accessToken);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.error);
            })
            // Register User
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.error);
            })
            // Update Password
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false;
                toast.success(action.payload.message);
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.error);
            })
            // Get Current User By Access Token
            .addCase(getCurrentUserByAccessToken.pending, (state) => {
                state.loading = true;
                state.currentUser = null as any;
                state.error = '';
            })
            .addCase(getCurrentUserByAccessToken.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload.content;
            })
            .addCase(getCurrentUserByAccessToken.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.error);
            })
            // Logout
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = null as any;
                sessionStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
                toast.success(action.payload.message);
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.error);
            });
    },
});

export default authSlice.reducer;
