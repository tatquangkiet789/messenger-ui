import { useEffect } from 'react';
import { createPost, findAllPosts } from '../services/postThunk';
import { useAppSelector, useAppDispatch } from '@src/hooks/useRedux';

type PostsHook = {
    page: number;
};

export default function usePosts(props: PostsHook | undefined) {
    const page = props?.page;
    const { posts, isLastPage, isLoading } = useAppSelector((state) => state.posts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!page) return;

        dispatch(findAllPosts({ page }));
    }, [dispatch, page]);

    function handleCreatePost(formData: FormData) {
        dispatch(createPost({ formData }));
    }

    return { posts, isLastPage, isLoading, handleCreatePost };
}
