import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Post } from 'features/posts/models/post';
import { IPost } from 'features/posts/models/postModel';
import { findAllPosts } from 'features/posts/services/postThunk';
import { toast } from 'react-toastify';

type PostState = {
    isLoading: boolean;
    posts: Post[];
    selectedPost: IPost;
    error: string;
    isLastPage: boolean;
    message: string;
    isNewPostList: boolean;
};

const initialState: PostState = {
    isLoading: true,
    posts: [],
    selectedPost: null as any,
    error: '',
    isLastPage: false,
    message: '',
    isNewPostList: true,
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
        updateNewPostList: (state, action: PayloadAction<boolean>) => {
            state.isNewPostList = action.payload;
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
                state.posts = action.payload.content;
                // if (state.isNewPostList) state.posts = action.payload.content;
                // else state.posts = [...state.posts, ...action.payload.content];

                // state.isLastPage = Boolean(action.payload.content.length);
            })
            .addCase(findAllPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.error);
            });
        // .addCase(findAllPostsByCurrentUserId.pending, (state) => {
        //     state.isLoading = true;
        //     state.error = '';
        // })
        // .addCase(findAllPostsByCurrentUserId.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     if (state.isNewPostList) state.posts = action.payload.content;
        //     else state.posts = [...state.posts, ...action.payload.content];

        //     state.isLastPage = Boolean(action.payload.content.length);
        // })
        // .addCase(findAllPostsByCurrentUserId.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.error = (action.payload as AxiosError)
        //         ? (action.payload as AxiosError).message
        //         : action.error.message!;
        //     toast.error(state.error);
        // })
        // // Find Post By Id
        // .addCase(findPostById.pending, (state) => {
        //     state.isLoading = true;
        //     state.error = '';
        // })
        // .addCase(findPostById.fulfilled, (state, action) => {
        //     state.selectedPost = action.payload.content;
        //     state.isLoading = false;
        // })
        // .addCase(findPostById.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.error = (action.payload as AxiosError)
        //         ? (action.payload as AxiosError).message
        //         : action.error.message!;
        //     toast.error(state.error);
        // })
        // // Like Post By Id
        // .addCase(likePostById.pending, (state) => {})
        // .addCase(likePostById.fulfilled, (state, action) => {
        //     state.message = action.payload.message;
        // })
        // .addCase(likePostById.rejected, (state, action) => {
        //     state.error = action.error.message!;
        //     toast.error(state.error);
        // })
        // // Unlike Post By Id
        // .addCase(unlikePostById.pending, (state) => {})
        // .addCase(unlikePostById.fulfilled, (state, action) => {
        //     state.message = action.payload.message;
        // })
        // .addCase(unlikePostById.rejected, (state, action) => {
        //     state.error = (action.payload as AxiosError)
        //         ? (action.payload as AxiosError).message
        //         : action.error.message!;
        //     toast.error(state.error);
        // })
        // // Create New Post
        // .addCase(createNewPost.pending, (state) => {
        //     state.isLoading = true;
        // })
        // .addCase(createNewPost.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.message = action.payload.message;
        //     state.posts = [{ ...action.payload.content }, ...state.posts];
        //     toast.success(state.message);
        // })
        // .addCase(createNewPost.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.error = (action.payload as AxiosError)
        //         ? (action.payload as AxiosError).message
        //         : action.error.message!;
        //     toast.error(state.error);
        // })
        // // Find All Posts Are Video
        // .addCase(findAllPostsAreVideo.pending, (state) => {
        //     state.isLoading = true;
        //     state.error = '';
        // })
        // .addCase(findAllPostsAreVideo.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     if (state.isNewPostList) state.posts = action.payload.content;
        //     else state.posts = [...state.posts, ...action.payload.content];

        //     state.isLastPage = Boolean(action.payload.content.length);
        // })
        // .addCase(findAllPostsAreVideo.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.error = (action.payload as AxiosError)
        //         ? (action.payload as AxiosError).message
        //         : action.error.message!;
        //     toast.error(state.error);
        // })
        // // Find All Posts From Friends
        // .addCase(findAllPostsFromFriends.pending, (state) => {
        //     state.isLoading = true;
        //     state.error = '';
        // })
        // .addCase(findAllPostsFromFriends.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     if (state.isNewPostList) state.posts = action.payload.content;
        //     else state.posts = [...state.posts, ...action.payload.content];

        //     state.isLastPage = Boolean(action.payload.content.length);
        // })
        // .addCase(findAllPostsFromFriends.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.error = (action.payload as AxiosError)
        //         ? (action.payload as AxiosError).message
        //         : action.error.message!;
        //     toast.error(state.error);
        // });
    },
});

export const { userLikePost, userUnlikePost, userAddNewComment, updateNewPostList } =
    postSlice.actions;

const postReducer = postSlice.reducer;

export default postReducer;
