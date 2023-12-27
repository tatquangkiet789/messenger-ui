// import { CloseIcon, HeartIcon } from 'assets/icons';
// import classNames from 'classnames/bind';
// import { POST_TYPE, STORAGE_KEY } from 'constants/constants';
// import { useAppDispatch } from 'hooks/useAppDispatch';
// import { useAppSelector } from 'hooks/useAppSelector';
// import { FC, Fragment, useEffect, useState } from 'react';
// import { AiOutlineComment } from 'react-icons/ai';
// import ReactPlayer from 'react-player';
// import { Link, useParams } from 'react-router-dom';
// import {
//     findPostById,
//     likePostById,
//     unlikePostById,
//     userLikePost,
//     userUnlikePost,
// } from 'redux/reducers/postSlice';
// import { numberFormat } from 'utils/format';
// import AddComment from '../../modules/comments/components/AddComment/AddComment';
// import styles from './PostDetail.module.scss';
// import { ISendNotification } from 'modules/notifications/models/notificationModel';
// import SOCKET_EVENT from 'constants/socket';
// import socketClient from 'lib/socketClient';
// import { ROUTES } from 'constants/api';
// import AccountInfo from 'components/ui/AccountInfo/AccountInfo';
// import CommentList from 'modules/comments/components/CommentList/CommentList';
// import { findAllCommentsByPostId } from 'redux/reducers/commentSlice';

// const cx = classNames.bind(styles);

// const PostDetail: FC = () => {
//     const { id } = useParams();

//     const { currentUser } = useAppSelector((state) => state.auth);
//     const { selectedPost, loading: postLoading } = useAppSelector((state) => state.posts);
//     const { comments, loading: commentLoading } = useAppSelector(
//         (state) => state.comments,
//     );
//     const dispatch = useAppDispatch();

//     const [userLikePostStatus, setUserLikePostStatus] = useState(false);

//     useEffect(() => {
//         // if (!id || !currentUser) return;
//         if (!id) return;

//         const postId = parseInt(id);
//         dispatch(findPostById(postId));
//         dispatch(findAllCommentsByPostId({ postId: postId }));
//         // .unwrap()
//         // .then((result) => {
//         //     const currentUserLikePost = result.userLikePostList.filter(
//         //         (user: any) => user.id === currentUser.id,
//         //     )[0];
//         //     if (currentUserLikePost)
//         //         setUserLikePostStatus(currentUserLikePost.likeStatus);
//         // });
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [currentUser, id]);

//     const handleLikeAndUnlikePost = () => {
//         if (!id || !currentUser) return;

//         const postId = parseInt(id);
//         const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)!;
//         if (!userLikePostStatus)
//             return dispatch(likePostById({ postId: postId, accessToken: accessToken }))
//                 .unwrap()
//                 .then(() => {
//                     setUserLikePostStatus(true);
//                     dispatch(userLikePost(postId));
//                     const notification: ISendNotification = {
//                         senderName: currentUser.username,
//                         receiverName: selectedPost.userPostDetail.username,
//                         notificationType: 'like',
//                         postId: postId,
//                     };
//                     socketClient.emit(SOCKET_EVENT.SEND_NOTIFICATION, notification);
//                 });

//         dispatch(unlikePostById({ postId: postId, accessToken: accessToken }))
//             .unwrap()
//             .then(() => {
//                 setUserLikePostStatus(false);
//                 dispatch(userUnlikePost(postId));
//             });
//     };

//     return (
//         <Fragment>
//             {postLoading || !selectedPost ? (
//                 <h1>Đang tải bài viết....</h1>
//             ) : (
//                 <div
//                     className={cx('container', {
//                         text: selectedPost.postTypeId === POST_TYPE.TEXT,
//                     })}
//                 >
//                     {selectedPost.postTypeId === POST_TYPE.TEXT ? null : (
//                         <div className={cx('post-content')}>
//                             {selectedPost.postTypeId === POST_TYPE.IMAGE ? (
//                                 <div
//                                     className={cx('content')}
//                                     style={{
//                                         backgroundImage: `url(${selectedPost.postUrl})`,
//                                     }}
//                                 ></div>
//                             ) : null}
//                             {selectedPost.postTypeId === POST_TYPE.VIDEO ? (
//                                 <div className={cx('content')}>
//                                     <ReactPlayer
//                                         width='100%'
//                                         height='100%'
//                                         url={selectedPost.postUrl}
//                                         controls
//                                     />
//                                 </div>
//                             ) : null}
//                             <Link to={ROUTES.home} className={cx('close-button')}>
//                                 <CloseIcon />
//                             </Link>
//                         </div>
//                     )}
//                     <div
//                         className={cx('post-detail', {
//                             text: selectedPost.postTypeId === POST_TYPE.TEXT,
//                         })}
//                     >
//                         <AccountInfo
//                             firstName={selectedPost.userPostDetail.firstName}
//                             lastName={selectedPost.userPostDetail.lastName}
//                             avatar={selectedPost.userPostDetail.avatar}
//                             username={selectedPost.userPostDetail.username}
//                             padding={true}
//                             tick={selectedPost.userPostDetail.tick}
//                             createdDate={selectedPost.createdDate}
//                         />
//                         <p className={cx('caption')}>{selectedPost.caption}</p>
//                         <div className={cx('like-comment-container')}>
//                             <div
//                                 className={cx('icon-button', {
//                                     userLikePost: userLikePostStatus,
//                                 })}
//                                 onClick={handleLikeAndUnlikePost}
//                             >
//                                 <HeartIcon />
//                                 {numberFormat.format(selectedPost.totalLikes)} lượt thích
//                             </div>
//                             <div className={cx('icon-button')}>
//                                 <AiOutlineComment />
//                                 {numberFormat.format(selectedPost.totalComments)} bình
//                                 luận
//                             </div>
//                         </div>
//                         <div className={cx('comment-list')}>
//                             {selectedPost.totalComments === 0 ? (
//                                 <h1>Chưa có bình luận</h1>
//                             ) : commentLoading ? (
//                                 <h1>Đang tải bình luận</h1>
//                             ) : (
//                                 <CommentList
//                                     userIdInPost={selectedPost.userPostDetail.id}
//                                     comments={comments}
//                                 />
//                             )}
//                         </div>
//                         <AddComment postId={parseInt(id!)} />
//                     </div>
//                 </div>
//             )}
//         </Fragment>
//     );
// };

// export default PostDetail;
export default function PostDetail() {
    return <h1>PostDetail</h1>;
}
