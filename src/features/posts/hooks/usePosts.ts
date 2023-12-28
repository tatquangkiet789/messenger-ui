import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { useEffect } from 'react';
import { toggleIsNewPostList } from '../postSlice';
import { createPost, findAllPosts, findAllPostsAreVideo } from '../services/postThunk';

type PostsHook = {
    page: number;
    isWatch?: boolean;
    username?: string;
};

export default function usePosts(props: PostsHook | undefined) {
    const page = props?.page;
    const isWatch = props?.isWatch;
    const username = props?.username;

    const { posts, isLastPage, isLoading } = useAppSelector((state) => state.posts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!page) return;

        let request: any;
        dispatch(toggleIsNewPostList(page === 1 ? true : false));

        if (isWatch) {
            request = dispatch(findAllPostsAreVideo({ page }));
        } else {
            request = dispatch(findAllPosts({ page, username }));
        }

        return () => {
            request.abort();
        };
    }, [dispatch, isWatch, page, username]);

    function handleCreatePost(formData: FormData) {
        dispatch(createPost({ formData }));
    }

    return { posts, isLastPage, isLoading, handleCreatePost };
}
