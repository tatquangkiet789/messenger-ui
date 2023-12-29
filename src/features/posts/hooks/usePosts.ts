import { useAppDispatch, useAppSelector } from '@src/hooks';
import { useEffect } from 'react';
import { toggleIsNewPostList } from '../postSlice';
import {
    createPost,
    findAllPosts,
    findAllPostsAreVideo,
    findAllPostsFromFriends,
} from '../services/postThunk';

type PostParam = 'watch' | 'friends' | 'default';
type PostsHook = {
    page: number;
    username?: string;
    type: PostParam;
};

export default function usePosts(props: PostsHook | undefined) {
    const page = props?.page;
    const username = props?.username;
    const type = props?.type;

    const { posts, isLastPage, isLoading } = useAppSelector((state) => state.posts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!page) return;

        let request: any;
        dispatch(toggleIsNewPostList(page === 1 ? true : false));

        if (type === 'watch') {
            request = dispatch(findAllPostsAreVideo({ page }));
        } else if (type === 'friends') {
            request = dispatch(findAllPostsFromFriends({ page }));
        } else {
            request = dispatch(findAllPosts({ page, username }));
        }

        return () => {
            request.abort();
        };
    }, [dispatch, page, type, username]);

    function handleCreatePost(formData: FormData) {
        dispatch(createPost({ formData }));
    }

    return { posts, isLastPage, isLoading, handleCreatePost };
}
