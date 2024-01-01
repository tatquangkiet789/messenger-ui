import AccountInfo from '@src/components/AccountInfo';
import AccountItemSkeleton from '@src/components/AccountItemSkeleton';
import VideoPlayer from '@src/components/VideoPlayer';
import { AiOutlineClose, AiOutlineComment, AiOutlineHeart } from '@src/components/icons';
import { ROUTES } from '@src/constants/routes';
import CommentList from '@src/features/comments/components/CommentList';
import { findAllCommentsByPostID } from '@src/features/comments/services/commentThunk';
import usePosts from '@src/features/posts/hooks/usePosts';
import { PostType } from '@src/features/posts/models/postType.enum';
import { useAppDispatch, useAppSelector } from '@src/hooks';
import { numberFormat } from '@src/utils/format';
import { Suspense, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

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

export default function PostDetail() {
    const { id } = useParams();
    const postID = parseInt(id!.toString());
    const { selectedPost } = usePosts({ type: 'id', postID: postID });
    const dispatch = useAppDispatch();
    const { comments } = useAppSelector((state) => state.comments);

    useEffect(() => {
        dispatch(findAllCommentsByPostID({ postID, page: 1 }));
    }, [dispatch, postID]);

    function renderPostContent() {
        if (selectedPost.postTypeName === PostType.Image) {
            return (
                <div
                    className={`w-full bg-center bg-no-repeat bg-cover`}
                    style={{
                        backgroundImage: `url(${selectedPost.postUrl})`,
                    }}
                ></div>
            );
        }

        return <VideoPlayer size='100%' url={selectedPost.postUrl} />;
    }

    return (
        <div className={`w-full h-screen flex justify-center bg-[rgba(243, 243, 244, 0.9)]`}>
            <div className={`flex justify-center flex-1 bg-gray248_248_248 relative`}>
                {!selectedPost ? (
                    <>Loading....</>
                ) : (
                    <>
                        {renderPostContent()}
                        <Link to={ROUTES.HOME} className={`absolute left-0 top-2 cursor-pointer`}>
                            <AiOutlineClose size={40} color={'rgba(243, 243, 244, 0.9)'} />
                        </Link>
                        <div
                            className={`w-[calc(100vw-600px)] flex flex-col justify-end border-2 border-gray006 shadow-md bg-white_1`}
                        >
                            <AccountInfo
                                firstName={selectedPost.authorDetail.firstName}
                                lastName={selectedPost.authorDetail.lastName}
                                avatar={selectedPost.authorDetail.avatar}
                                username={selectedPost.authorDetail.username}
                                isVerified={selectedPost.authorDetail.isVerified}
                                postCreatedDate={selectedPost.createdDate}
                            />
                            <p
                                className={`pr-3 pl-8 my-4 text-lg overflow-y-auto max-h-28 h-fit`}
                                style={{ wordWrap: 'break-word' }}
                            >
                                {selectedPost.caption}
                            </p>
                            <div className={`flex item-center pl-8 pb-3 gap-3`}>
                                <div
                                    className={`flex item-center gap-1 [&_svg]:hover:cursor-pointer`}
                                >
                                    <AiOutlineHeart size={30} />
                                    {numberFormat.format(selectedPost.totalLikes)} lượt thích
                                </div>
                                <div
                                    className={`flex item-center gap-1 [&_svg]:hover:cursor-pointer`}
                                >
                                    <AiOutlineComment size={30} />
                                    {numberFormat.format(selectedPost.totalComments)} bình luận
                                </div>
                            </div>
                            <div
                                className={`border-y border-y-gray03 overflow-y-auto bg-gray241_241_242_1 h-1/2 pt-6 px-8`}
                            >
                                <Suspense fallback={<AccountItemSkeleton size={5} />}>
                                    <CommentList
                                        comments={comments}
                                        authorID={selectedPost.authorDetail.id}
                                    />
                                </Suspense>
                            </div>
                            <div>Add comment</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
