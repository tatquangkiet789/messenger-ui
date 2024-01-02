import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    createCommentService,
    findAllChildCommentsByParentIDService,
    findAllCommentsByPostIDService,
} from './commentService';
import { AxiosError } from 'axios';
import { CreateChildComment, CreateComment } from '../models/comment';

// [GET] /api/v1/posts/:id/comments?page=:page
export const findAllCommentsByPostID = createAsyncThunk(
    'findAllCommentsByPostID',
    async (
        {
            postID,
            page,
        }: {
            postID: number;
            page: number;
        },
        { rejectWithValue },
    ) => {
        try {
            const data = await findAllCommentsByPostIDService({ postID, page });
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

// [GET] /api/v1/posts/:id/comments/:parentId?page=:page
export const findAllChildCommentsByParentID = createAsyncThunk(
    'findAllChildCommentsByParentID',
    async (
        {
            postID,
            page,
            parentID,
        }: {
            postID: number;
            page: number;
            parentID: number;
        },
        { rejectWithValue },
    ) => {
        try {
            const data = await findAllChildCommentsByParentIDService({ postID, page, parentID });
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

// [POST] /api/v1/posts/:postId/comments/create
export const createComment = createAsyncThunk(
    'createComment',
    async (comment: CreateComment | CreateChildComment, { rejectWithValue }) => {
        try {
            const data = await createCommentService(comment);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);
