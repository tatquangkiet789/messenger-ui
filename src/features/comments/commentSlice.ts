import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
    IComment,
    IFindComment,
    INewComment,
} from 'features/comments/models/commentModel';
import {
    findAllCommentsByPostIdService,
    createNewCommentService,
} from 'features/comments/services/commentService';
import { toast } from 'react-toastify';

type CommentState = {
    loading: boolean;
    comments: IComment[];
    error: string;
    commentSubmitLoading: boolean;
    selectedComment: IComment;
};

const initialState: CommentState = {
    loading: false,
    comments: [],
    error: '',
    commentSubmitLoading: false,
    selectedComment: null as any,
};

// // [GET] /api/v1/posts/:id/comments
export const findAllCommentsByPostId = createAsyncThunk(
    'findAllCommentsByPostId',
    async (params: IFindComment, { rejectWithValue }) => {
        try {
            const data = await findAllCommentsByPostIdService(params);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

// // [POST] /api/v1/posts/:postId/comments/create
export const createNewComment = createAsyncThunk(
    'createNewComment',
    async (params: INewComment, { rejectWithValue }) => {
        try {
            const data = await createNewCommentService(params);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        findSelectedCommentById: (state, action: PayloadAction<number>) => {
            state.selectedComment = state.comments.filter(
                (comment) => comment.id === action.payload,
            )[0];
        },
        resetSelectedComment: (state) => {
            state.selectedComment = null as any;
        },
    },
    extraReducers: (builder) => {
        builder
            // Find All Comments By Post Id
            .addCase(findAllCommentsByPostId.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(findAllCommentsByPostId.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload.content;
            })
            .addCase(findAllCommentsByPostId.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.error);
            })
            .addCase(createNewComment.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(createNewComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = [...state.comments, action.payload.content];
            })
            .addCase(createNewComment.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.error);
            });
    },
});

export const { findSelectedCommentById, resetSelectedComment } = commentSlice.actions;

export default commentSlice.reducer;
