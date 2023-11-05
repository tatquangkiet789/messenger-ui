import { createSlice } from '@reduxjs/toolkit';
import { IUser } from './models/user';
import { findAllUsersByKeyword } from './services/userThunk';
import { AxiosError } from 'axios';

interface IUserState {
    loading: boolean;
    error: string;
    searchResultList: IUser[];
}

const initialState: IUserState = {
    loading: false,
    error: '',
    searchResultList: [],
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateSearchResultListAfterDelete: (state, action) => {
            state.searchResultList = [...state.searchResultList].filter(
                (user) => user.id !== action.payload,
            );
        },
        resetSearchResultList: (state) => {
            state.searchResultList = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(findAllUsersByKeyword.pending, (state) => {
                state.searchResultList = [];
                state.loading = true;
                state.error = '';
            })
            .addCase(findAllUsersByKeyword.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResultList = action.payload.content;
            })
            .addCase(findAllUsersByKeyword.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
            });
    },
});

export const { resetSearchResultList, updateSearchResultListAfterDelete } = userSlice.actions;

export default userSlice.reducer;
