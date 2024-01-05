import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Post } from 'features/posts/models/post';
import {
    createPost,
    findAllPosts,
    findAllPostsAreVideo,
    findAllPostsByCurrentUser,
    findAllPostsFromFriends,
    findPostByID,
    likePostByID,
    unLikePostByID,
} from 'features/posts/services/postThunk';
import { toast } from 'react-toastify';

type PostState = {
    isLoading: boolean;
    posts: Post[];
    selectedPost: Post;
    error: string;
    isLastPage: boolean;
    message: string;
    isNewList: boolean;
};

const initialState: PostState = {
    isLoading: true,
    posts: [],
    selectedPost: null as any,
    error: '',
    isLastPage: false,
    message: '',
    isNewList: true,
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        userLikePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.map((post: Post) => {
                if (post.id === action.payload) return { ...post, totalLikes: post.totalLikes + 1 };
                return post;
            });
        },
        userUnlikePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.map((post: Post) => {
                if (post.id === action.payload) return { ...post, totalLikes: post.totalLikes - 1 };
                return post;
            });
        },
        userAddNewComment: (state) => {
            state.selectedPost.totalComments = state.selectedPost.totalComments + 1;
        },
        toggleIsNewPostList: (state, action: PayloadAction<boolean>) => {
            state.isNewList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Find All Posts
            .addCase(findAllPosts.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(findAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLastPage = action.payload.isLastPage;

                if (state.isNewList) {
                    state.posts = action.payload.content;
                } else {
                    state.posts = [...state.posts, ...action.payload.content];
                }
            })
            .addCase(findAllPosts.rejected, (state, action) => {
                state.isLoading = false;
                const error = action.payload as AxiosError;
                if (error) {
                    state.error = error.message;
                    toast.error(state.error);
                } else console.error(action.error.message);
            })
            .addCase(findAllPostsByCurrentUser.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(findAllPostsByCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                if (state.isNewList) state.posts = action.payload.content;
                else state.posts = [...state.posts, ...action.payload.content];

                state.isLastPage = action.payload.isLastPage;
            })
            .addCase(findAllPostsByCurrentUser.rejected, (state, action) => {
                state.isLoading = false;
                const error = action.payload as AxiosError;
                if (error) {
                    state.error = error.message;
                    toast.error(state.error);
                } else console.error(action.error.message);
            })
            // Find Post By Id
            .addCase(findPostByID.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(findPostByID.fulfilled, (state, action) => {
                state.selectedPost = action.payload.content;
                state.isLoading = false;
            })
            .addCase(findPostByID.rejected, (state, action) => {
                state.isLoading = false;
                const error = action.payload as AxiosError;
                if (error) {
                    state.error = error.message;
                    toast.error(state.error);
                } else console.error(action.error.message);
            })
            // // Like Post By Id
            .addCase(likePostByID.pending, () => {})
            .addCase(likePostByID.fulfilled, (state, action) => {
                state.message = action.payload.message;
            })
            .addCase(likePostByID.rejected, (state, action) => {
                const error = action.payload as AxiosError;
                if (error) {
                    state.error = error.message;
                    toast.error(state.error);
                } else console.error(action.error.message);
            })
            // // Unlike Post By Id
            .addCase(unLikePostByID.pending, () => {})
            .addCase(unLikePostByID.fulfilled, (state, action) => {
                state.message = action.payload.message;
            })
            .addCase(unLikePostByID.rejected, (state, action) => {
                const error = action.payload as AxiosError;
                if (error) {
                    state.error = error.message;
                    toast.error(state.error);
                } else console.error(action.error.message);
            })
            // // Create New Post
            .addCase(createPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message;
                state.posts = [{ ...action.payload.content }, ...state.posts];
                toast.success(state.message);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false;
                const error = action.payload as AxiosError;
                if (error) {
                    state.error = error.message;
                    toast.error(state.error);
                } else console.error(action.error.message);
            })
            // // Find All Posts Are Video
            .addCase(findAllPostsAreVideo.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(findAllPostsAreVideo.fulfilled, (state, action) => {
                state.isLoading = false;
                if (state.isNewList) state.posts = action.payload.content;
                else state.posts = [...state.posts, ...action.payload.content];

                state.isLastPage = Boolean(action.payload.content.length);
            })
            .addCase(findAllPostsAreVideo.rejected, (state, action) => {
                state.isLoading = false;
                const error = action.payload as AxiosError;

                if (error) {
                    state.error = error.message;
                    toast.error(state.error);
                } else console.error(action.error.message);
            })
            // Find All Posts From Friends
            .addCase(findAllPostsFromFriends.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(findAllPostsFromFriends.fulfilled, (state, action) => {
                state.isLoading = false;
                if (state.isNewList) state.posts = action.payload.content;
                else state.posts = [...state.posts, ...action.payload.content];

                state.isLastPage = Boolean(action.payload.content.length);
            })
            .addCase(findAllPostsFromFriends.rejected, (state, action) => {
                state.isLoading = false;
                const error = action.payload as AxiosError;
                if (error) {
                    state.error = error.message;
                    toast.error(state.error);
                } else console.error(action.error.message);
            });
    },
});

export const { userLikePost, userUnlikePost, userAddNewComment, toggleIsNewPostList } =
    postSlice.actions;

const postReducer = postSlice.reducer;

export default postReducer;
