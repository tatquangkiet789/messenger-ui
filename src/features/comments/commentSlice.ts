import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Comment } from './models/comment';
import {
    createComment,
    findAllChildCommentsByParentID,
    findAllCommentsByPostID,
} from './services/commentThunk';

type CommentState = {
    isLoading: boolean;
    comments: Comment[];
    error: string;
    selectedComment: Comment;
    isLastPage: boolean;
    isNewList: boolean;
};

const initialState: CommentState = {
    isLoading: false,
    comments: [],
    error: '',
    selectedComment: null as any,
    isLastPage: false,
    isNewList: false,
};

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setSelectedCommentByID: (state, action: PayloadAction<number>) => {
            state.selectedComment = state.comments.filter(
                (comment) => comment.id === action.payload,
            )[0];
        },
        resetSelectedComment: (state) => {
            state.selectedComment = null as any;
        },
        toggleIsNewCommentList: (state, action: PayloadAction<boolean>) => {
            state.isNewList = action.payload;
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
                state.isLastPage = action.payload.isLastPage;

                if (state.isNewList) {
                    console.log('isNewList');
                    state.comments = action.payload.content;
                } else {
                    console.log('Update list');
                    state.comments = [...state.comments, ...action.payload.content];
                }
            })
            .addCase(findAllCommentsByPostID.rejected, (state, action) => {
                state.isLoading = false;
                const error = action.payload as AxiosError;
                if (error) {
                    state.error = error.message;
                    toast.error(state.error);
                } else console.error(action.error.message);
            })
            // Find All Child Comments By Parent Id
            .addCase(findAllChildCommentsByParentID.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(findAllChildCommentsByParentID.fulfilled, (state, action) => {
                state.isLoading = false;
                const childComments: Comment[] = action.payload.content;
                const parentID = childComments[0].parentID!;

                const rootComment = state.comments.filter((comment) => comment.id === parentID)[0];
                rootComment.childComments = childComments;
            })
            .addCase(findAllChildCommentsByParentID.rejected, (state, action) => {
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
                const comment: Comment = action.payload.content;

                if (!comment.parentID) {
                    state.comments.unshift(comment);
                } else {
                    const { parentID } = comment;
                    const rootComment = state.comments.filter(
                        (comment) => comment.id === parentID,
                    )[0];
                    rootComment.totalChildComments = rootComment.totalChildComments + 1;
                    rootComment.childComments.unshift(comment);
                }
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

export const { setSelectedCommentByID, resetSelectedComment, toggleIsNewCommentList } =
    commentSlice.actions;

const commentReducer = commentSlice.reducer;

export default commentReducer;