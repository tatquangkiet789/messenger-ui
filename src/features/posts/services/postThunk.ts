import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
    createPostService,
    findAllPostsAreVideoService,
    findAllPostsByCurrentUserIDService,
    findAllPostsFromFriendsService,
    findAllPostsService,
    findPostByIDService,
    likePostByIDService,
    unlikePostByIDService,
} from './postService';

export const findAllPosts = createAsyncThunk(
    'findAllPosts',
    async ({ page, username }: { page: number; username?: string }, { rejectWithValue }) => {
        try {
            const data = await findAllPostsService({ page, username });
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

// export const findAllPostsAreVideo = createAsyncThunk(
//     'findAllPostsAreVideo',
//     async ({ page }: { page: number }, { rejectWithValue }, thunkAPI) => {
//         try {
//             const data = await findAllPostsAreVideoService({ page });
//             return data;
//         } catch (error) {
//             const err = error as AxiosError;
//             if (!err.response) throw err;
//             return rejectWithValue(err.response.data);
//         }
//     },
// );
export const findAllPostsAreVideo = createAsyncThunk(
    'findAllPostsAreVideo',
    async ({ page }: { page: number }) => {
        const data = await findAllPostsAreVideoService({ page });
        return data;
    },
    // {
    //     condition: (_, { getState }) => {
    //         const { posts } = getState() as RootState;
    //         if (posts.isLoading === true) {
    //             console.log('cancel');
    //             return false;
    //         }
    //     },
    // },
);

export const findAllPostsByCurrentUser = createAsyncThunk(
    'findAllPostsByCurrentUser',
    async ({ page }: { page: number }, { rejectWithValue }) => {
        try {
            const data = await findAllPostsByCurrentUserIDService({ page });
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

export const findPostByID = createAsyncThunk(
    'findPostByID',
    async ({ postID }: { postID: number }, { rejectWithValue }) => {
        try {
            const data = await findPostByIDService({ postID });
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

export const findAllPostsFromFriends = createAsyncThunk(
    'findAllPostsFromFriends',
    async ({ page }: { page: number }, { rejectWithValue }) => {
        try {
            const data = await findAllPostsFromFriendsService({ page });
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

export const likePostByID = createAsyncThunk(
    'likePostByID',
    async ({ postID }: { postID: number }, { rejectWithValue }) => {
        try {
            const data = await likePostByIDService({ postID });
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

export const unLikePostByID = createAsyncThunk(
    'unLikePostByID',
    async ({ postID }: { postID: number }, { rejectWithValue }) => {
        try {
            const data = await unlikePostByIDService({ postID });
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

export const createPost = createAsyncThunk(
    'createPost',
    async ({ formData }: { formData: FormData }, { rejectWithValue }) => {
        try {
            const data = await createPostService({ formData });
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);
