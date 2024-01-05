import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from '@src/components/icons';
import useAuth from '@src/features/auth/hooks/useAuth';
import { useAppDispatch } from '@src/hooks';
import AccountInfo from 'components/AccountInfo';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { numberFormat } from 'utils/format';
import { Post } from '../models/post';
import { likePostByID, unLikePostByID } from '../services/postThunk';
import PostContent from './PostContent';

//     const { currentUser } = useAppSelector((state) => state.auth);
//     const dispatch = useAppDispatch();

//     const [likePost, setLikePost] = useState(false);

//     const location = useLocation();
//     const navigate = useNavigate();

//     const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

//     useEffect(() => {
//         // if user is not login then not show like status
//         if (!currentUser) return;
//         // if nobody likes that post then not show like status
//         if (!userLikePostList) return;

//         const currentUserLikePostDetail = userLikePostList.filter(
//             (user) => user.id === currentUser.id,
//         )[0];

//         if (currentUserLikePostDetail) setLikePost(currentUserLikePostDetail.likeStatus);
//     }, [currentUser, id, userLikePostList]);

//     const handleLikeAndUnlikePost = () => {
//         if (!currentUser || !accessToken) {
//             return navigate(ROUTES.login, {
//                 replace: true,
//                 state: { from: location },
//             });
//         }
//         const postId = id as number;
//         if (!likePost) {
//             dispatch(
//                 likePostById({
//                     postId: postId,
//                     accessToken: accessToken,
//                 }),
//             )
//                 .unwrap()
//                 .then(() => {
//                     setLikePost(true);
//                     dispatch(userLikePost(postId));
//                     const notification: ISendNotification = {
//                         senderName: currentUser.username,
//                         receiverName: userPostDetail.username,
//                         notificationType: 'like',
//                         postId: postId,
//                     };
//                     socketClient.emit(SOCKET_EVENT.SEND_NOTIFICATION, notification);
//                 });
//             return;
//         }
//         dispatch(
//             unlikePostById({
//                 postId: postId,
//                 accessToken: accessToken,
//             }),
//         )
//             .unwrap()
//             .then(() => {
//                 setLikePost(false);
//                 dispatch(userUnlikePost(postId));
//             });
//     };

type PostItemProps = {
    post: Post;
};

const PostItem = memo(function PostItem({ post }: PostItemProps) {
    const {
        caption,
        authorDetail,
        postTypeName,
        postUrl,
        totalComments,
        totalLikes,
        createdDate,
        userLikeList,
        id,
    } = post;
    const { currentUser, isAuthenticated } = useAuth();
    const dispatch = useAppDispatch();
    const [isLike, setIsLike] = useState(false);

    // Find a way to remove useEffect
    useEffect(() => {
        if (!currentUser) return;

        setIsLike(!!userLikeList.find((like) => like.username === currentUser.username));
    }, [currentUser, userLikeList]);

    const handleLikeOrUnlikePost = () => {
        if (!isAuthenticated) {
            return toast.info(`Đăng nhập để thích bài viết`);
        }
        if (isLike) {
            return dispatch(unLikePostByID({ postID: id }))
                .unwrap()
                .then(() => setIsLike(false));
        }
        return dispatch(likePostByID({ postID: id }))
            .unwrap()
            .then(() => setIsLike(true));
    };

    return (
        <div className={`w-full max-w-[600px] bg-white_1 shadow-md rounded-lg mb-6`}>
            <div className={`py-3 px-4 flex items-center justify-between`}>
                <AccountInfo
                    avatar={authorDetail.avatar}
                    firstName={authorDetail.firstName}
                    lastName={authorDetail.lastName}
                    username={authorDetail.username}
                    isVerified={authorDetail.isVerified}
                    postCreatedDate={createdDate}
                />
            </div>
            <div className={`px-4`} style={{ wordWrap: 'break-word' }}>
                {caption}
            </div>
            <div className={`w-full max-w-[600px] flex justify-center pt-3`}>
                <PostContent postUrl={postUrl} postTypeName={postTypeName} contentSize='600px' />
            </div>
            <div className={`flex items-center justify-end py-4 mx-3 text-gray075`}>
                <span>{numberFormat.format(totalLikes)} lượt thích</span>
                <p className={`px-4`}>{numberFormat.format(totalComments)} bình luận</p>
            </div>

            <div className={`flex items-center justify-end px-4 pt-[6px] pb-3`}>
                <div
                    className={`flex items-center justify-center rounded-lg p-2 hover:bg-gray003 
                    hover:cursor-pointer`}
                    onClick={handleLikeOrUnlikePost}
                >
                    {isLike ? (
                        <AiFillHeart size={30} className={`fill-primary`} />
                    ) : (
                        <AiOutlineHeart size={30} />
                    )}
                </div>
                <Link
                    className={`flex items-center justify-center rounded-lg p-2 hover:bg-gray003 hover:cursor-pointer`}
                    to={`/posts/${id}`}
                >
                    <AiOutlineComment size={30} />
                </Link>
            </div>
        </div>
    );
});

export default PostItem;
