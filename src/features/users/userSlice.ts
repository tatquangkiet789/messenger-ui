import { createSlice } from '@reduxjs/toolkit';
import { IUser, User } from './models/user';
import { find10SuggestedUsers, findAllUsersByKeyword } from './services/userThunk';
import { AxiosError } from 'axios';

type UserState = {
    isLoading: boolean;
    error: string;
    searchResultList: IUser[];
    suggestedUsers: User[];
};

const initialState: UserState = {
    isLoading: false,
    error: '',
    searchResultList: [],
    suggestedUsers: [],
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
        removeCurrentUserInSuggestedUsers: (state, action) => {
            state.suggestedUsers = [...state.suggestedUsers].filter(
                (user) => user.id !== action.payload,
            );
        },
        setSuggestedUsers: (state, action) => {
            state.suggestedUsers = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(findAllUsersByKeyword.pending, (state) => {
                state.searchResultList = [];
                state.isLoading = true;
                state.error = '';
            })
            .addCase(findAllUsersByKeyword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchResultList = action.payload.content;
            })
            .addCase(findAllUsersByKeyword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
            })
            .addCase(find10SuggestedUsers.pending, (state) => {
                state.suggestedUsers = [];
                state.isLoading = true;
                state.error = '';
            })
            .addCase(find10SuggestedUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.suggestedUsers = action.payload.content;
            })
            .addCase(find10SuggestedUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
            });
    },
});

export const {
    resetSearchResultList,
    updateSearchResultListAfterDelete,
    removeCurrentUserInSuggestedUsers,
    setSuggestedUsers,
} = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
