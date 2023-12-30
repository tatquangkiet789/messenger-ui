// import { HeartIcon } from 'assets/icons';
// import classNames from 'classnames/bind';
// import { POST_TYPE, STORAGE_KEY } from 'constants/constants';
// import { useAppDispatch } from 'hooks/useAppDispatch';
// import { useAppSelector } from 'hooks/useAppSelector';
// import React, { memo, useEffect, useState } from 'react';
// import { AiOutlineComment } from 'react-icons/ai';
// import ReactPlayer from 'react-player';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { numberFormat } from 'utils/format';
// import styles from './PostItem.module.scss';
// import { IPost } from 'modules/posts/models/postModel';
// import AccountInfo from 'components/ui/AccountInfo/AccountInfo';
// import {
//     likePostById,
//     userLikePost,
//     unlikePostById,
//     userUnlikePost,
// } from 'redux/reducers/postSlice';
// import { ROUTES } from 'constants/api';
// import { ISendNotification } from 'modules/notifications/models/notificationModel';
// import SOCKET_EVENT from 'constants/socket';
// import socketClient from 'lib/socketClient';

import VideoPlayer from '@src/components/VideoPlayer';
import { AiOutlineComment, AiOutlineHeart } from '@src/components/icons';
import AccountInfo from 'components/AccountInfo';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { numberFormat } from 'utils/format';
import { Post } from '../models/post';
import { PostType } from '../models/postType.enum';

// const cx = classNames.bind(styles);

// interface IPostItemProps {
//     post: IPost;
// }

// const PostItem: React.FC<IPostItemProps> = ({ post }) => {
//     const {
//         id,
//         caption,
//         postUrl,
//         postTypeId,
//         totalComments,
//         totalLikes,
//         userLikePostList,
//         authorDetail,
//         createdDate,
//     } = post;

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
        id,
    } = post;

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
            <div className={`px-4 break-keep`}>{caption}</div>
            <div className={`w-full max-w-[600px] flex justify-center pt-3`}>
                {postTypeName === PostType.Image ? (
                    <div
                        className={`w-[600px] h-[600px] bg-center bg-cover bg-no-repeat`}
                        style={{ backgroundImage: `url(${postUrl})` }}
                    ></div>
                ) : null}
                {postTypeName === PostType.Video ? (
                    <VideoPlayer size='400px' url={postUrl} />
                ) : null}
            </div>
            <div className={`flex items-center justify-end py-4 mx-3 text-gray075`}>
                <span>{numberFormat.format(totalLikes)} lượt thích</span>
                <p className={`px-4`}>{numberFormat.format(totalComments)} bình luận</p>
            </div>

            <div className={`flex items-center justify-end px-4 pt-[6px] pb-3`}>
                <div
                    className={`flex items-center justify-center rounded-lg p-2 hover:bg-gray003 hover:cursor-pointer`}
                >
                    <AiOutlineHeart size={30} />
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
