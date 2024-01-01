import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Comment } from './models/comment';
import { createComment, findAllCommentsByPostID } from './services/commentThunk';

type CommentState = {
    isLoading: boolean;
    comments: Comment[];
    error: string;
    selectedComment: Comment;
};

const initialState: CommentState = {
    isLoading: false,
    comments: [],
    error: '',
    selectedComment: null as any,
};

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
            .addCase(findAllCommentsByPostID.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(findAllCommentsByPostID.fulfilled, (state, action) => {
                state.isLoading = false;
                state.comments = action.payload.content;
            })
            .addCase(findAllCommentsByPostID.rejected, (state, action) => {
                state.isLoading = false;
                const error = action.payload as AxiosError;
                if (error) {
                    state.error = error.message;
                    toast.error(state.error);
                } else console.error(action.error.message);
            })
            // Create comment | child comment
            .addCase(createComment.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.comments = [...state.comments, action.payload.content];
            })
            .addCase(createComment.rejected, (state, action) => {
                state.isLoading = false;
                const error = action.payload as AxiosError;
                if (error) {
                    state.error = error.message;
                    toast.error(state.error);
                } else console.error(action.error.message);
            });
    },
});

export const { findSelectedCommentById, resetSelectedComment } = commentSlice.actions;

const commentReducer = commentSlice.reducer;

export default commentReducer;
