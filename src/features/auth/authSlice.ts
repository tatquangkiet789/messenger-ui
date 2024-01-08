import { createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEY } from '@src/constants/constants';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { User } from '../users/models/user';
import {
    getCurrentUserByAccessToken,
    login,
    logout,
    register,
    updatePassword,
} from './services/authThunk';

type AuthState = {
    isLoading: boolean;
    currentUser: User;
    error: string;
    registerMessage: string;
    isAuthenticated: boolean;
};

const initialState: AuthState = {
    isLoading: false,
    currentUser: null as any,
    error: '',
    registerMessage: '',
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Login User
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.currentUser = null as any;
                state.error = '';
            })
            .addCase(login.fulfilled, (state) => {
                state.isLoading = false;
                // sessionStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, action.payload.accessToken);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                const error = action.payload as AxiosError;
                if (error) {
                    state.error = error.message;
                    toast.error(state.error);
                } else console.error(action.error.message);
            })
            // Register User
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                const error = action.payload as AxiosError;
                if (error) {
                    state.error = error.message;
                    toast.error(state.error);
                } else console.error(action.error.message);
            })
            // Update Password
            .addCase(updatePassword.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload.message);
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.isLoading = false;
                const error = action.payload as AxiosError;
                if (error) {
                    state.error = error.message;
                    toast.error(state.error);
                } else console.error(action.error.message);
            })
            // Get Current User By Access Token
            .addCase(getCurrentUserByAccessToken.pending, (state) => {
                state.isLoading = true;
                state.currentUser = null as any;
                state.error = '';
            })
            .addCase(getCurrentUserByAccessToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload.content;
            })
            .addCase(getCurrentUserByAccessToken.rejected, (state, action) => {
                state.isLoading = false;
                const error = action.payload as AxiosError;
                if (error) {
                    state.error = error.message;
                    toast.error(state.error);
                } else console.error(action.error.message);
            })
            // Logout
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = null as any;
                sessionStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
                toast.success(action.payload.message);
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                const error = action.payload as AxiosError;
                if (error) {
                    state.error = error.message;
                    toast.error(state.error);
                } else console.error(action.error.message);
            });
    },
});

const authReducer = authSlice.reducer;

export default authReducer;
