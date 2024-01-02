import { useAppDispatch, useAppSelector } from '@src/hooks';
import { useCallback, useEffect, useState } from 'react';
import { toggleIsNewPostList } from '../postSlice';
import {
    createPost,
    findAllPosts,
    findAllPostsAreVideo,
    findAllPostsByCurrentUser,
    findAllPostsFromFriends,
    findPostByID,
} from '../services/postThunk';

type FindPostType = 'watch' | 'friends' | 'default' | 'current-user' | 'id';

// type FindAllPosts = {
//     type: 'watch';
// };

// type FindPostByID = {
//     type: 'byID';
//     postID: number;
// };

type PostParam = {
    type: FindPostType;
    postID?: number;
    username?: string;
};
// type PostParam = {
//     test: number;
// } & (FindAllPosts | FindPostByID)

export default function usePosts(props: PostParam | undefined) {
    const username = props?.username;
    const postID = props?.postID;
    const type = props?.type;

    const [page, setPage] = useState(1);
    const { posts, isLastPage, isLoading, selectedPost } = useAppSelector((state) => state.posts);
    const dispatch = useAppDispatch();

    const handleFindAllPosts = useCallback(() => {
        if (type === 'watch') {
            return findAllPostsAreVideo({ page: page });
        } else if (type === 'friends') {
            return findAllPostsFromFriends({ page: page });
        } else if (type === 'current-user') {
            return findAllPostsByCurrentUser({ page: page });
        } else {
            return findAllPosts({ page: page, username });
        }
    }, [page, type, username]);

    useEffect(() => {
        if (type === 'id') return;

        dispatch(toggleIsNewPostList(page === 1 ? true : false));
        const request = dispatch(handleFindAllPosts());

        return () => {
            request.abort();
        };
    }, [dispatch, handleFindAllPosts, page, type]);

    useEffect(() => {
        if (type !== 'id' || !postID) return;

        const request = dispatch(findPostByID({ postID }));

        return () => {
            request.abort();
        };
    }, [dispatch, postID, type]);

    function handleCreatePost(formData: FormData) {
        dispatch(createPost({ formData }));
    }

    return { posts, isLastPage, isLoading, handleCreatePost, setPage, page, selectedPost };
}
