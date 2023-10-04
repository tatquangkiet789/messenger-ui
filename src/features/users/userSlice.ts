import { createSlice } from '@reduxjs/toolkit';
import { IUser } from './models/user';
import { findAllUsersByKeyword } from './services/userThunk';
import { AxiosError } from 'axios';

interface IUserState {
    userList: IUser[];
    loading: boolean;
    error: string;
}

const initialState: IUserState = {
    userList: [],
    loading: false,
    error: '',
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetUserList: (state) => {
            state.userList = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(findAllUsersByKeyword.pending, (state) => {
                state.userList = [];
                state.loading = true;
                state.error = '';
            })
            .addCase(findAllUsersByKeyword.fulfilled, (state, action) => {
                state.loading = false;
                state.userList = action.payload.content;
            })
            .addCase(findAllUsersByKeyword.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
            });
    },
});

export const { resetUserList } = userSlice.actions;

export default userSlice.reducer;
