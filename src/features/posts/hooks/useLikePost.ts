import useAuth from '@src/features/auth/hooks/useAuth';
import { useAppDispatch } from '@src/hooks';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { likePostByID, unLikePostByID } from '../services/postThunk';
import { UserLike } from '@src/features/users/models/user';
import { userLikePost, userUnlikePost } from '../postSlice';

type LikePostHook = {
    userLikeList: UserLike[];
};

export default function useLikePost({ userLikeList }: LikePostHook) {
    const dispatch = useAppDispatch();
    const { isAuthenticated, currentUser } = useAuth();
    const [isLike, setIsLike] = useState(false);

    useEffect(() => {
        if (!currentUser) return;
        if (!userLikeList) return;

        setIsLike(!!userLikeList.find((like) => like.username === currentUser.username));
    }, [currentUser, userLikeList]);

    function increaseTotalLikes({ postID }: { postID: number }) {
        dispatch(userLikePost(postID));
        setIsLike(true);
    }

    function decreaseTotalLikes({ postID }: { postID: number }) {
        dispatch(userUnlikePost(postID));
        setIsLike(false);
    }

    function handleLikeOrUnlikePost({ postID }: { postID: number }) {
        if (!isAuthenticated) {
            return toast.info(`Đăng nhập để thích bài viết`);
        }
        if (isLike) {
            return dispatch(unLikePostByID({ postID }))
                .unwrap()
                .then(() => decreaseTotalLikes({ postID }));
        }
        return dispatch(likePostByID({ postID }))
            .unwrap()
            .then(() => increaseTotalLikes({ postID }));
    }

    return { isLike, handleLikeOrUnlikePost } as const;
}
