import AccountInfo from '@src/components/AccountInfo';
import AccountItemSkeleton from '@src/components/AccountItemSkeleton';
import {
    AiFillHeart,
    AiOutlineClose,
    AiOutlineComment,
    AiOutlineHeart,
} from '@src/components/icons';
import { ROUTES } from '@src/constants/routes';
import useAuth from '@src/features/auth/hooks/useAuth';
import { toggleIsNewCommentList } from '@src/features/comments/commentSlice';
import AddComment from '@src/features/comments/components/AddComment';
import CommentList from '@src/features/comments/components/CommentList';
import { findAllCommentsByPostID } from '@src/features/comments/services/commentThunk';
import PostContent from '@src/features/posts/components/PostContent';
import useLikePost from '@src/features/posts/hooks/useLikePost';
import { findPostByID } from '@src/features/posts/services/postThunk';
import { useAppDispatch, useAppSelector } from '@src/hooks';
import { numberFormat } from '@src/utils/format';
import { Suspense, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function PostDetailPage() {
    const { id } = useParams();
    const postID = parseInt(id!.toString());

    const { selectedPost } = useAppSelector((state) => state.posts);
    const { comments, isLastPage } = useAppSelector((state) => state.comments);
    const dispatch = useAppDispatch();

    const { isAuthenticated } = useAuth();
    const { isLike, handleLikeOrUnlikePost } = useLikePost({
        userLikeList: selectedPost?.userLikeList,
    });

    const [commentPage, setCommentPage] = useState(1);

    useEffect(() => {
        dispatch(findPostByID({ postID }));
        dispatch(toggleIsNewCommentList(commentPage === 1 ? true : false));
        dispatch(findAllCommentsByPostID({ postID, page: commentPage }));
    }, [dispatch, postID, commentPage]);

    return (
        <div className={`w-full h-screen flex justify-center bg-[rgba(243, 243, 244, 0.9)]`}>
            <div className={`flex justify-center flex-1 bg-gray248_248_248 relative`}>
                {!selectedPost ? (
                    <>Loading....</>
                ) : (
                    <>
                        <PostContent
                            contentSize='100%'
                            postTypeName={selectedPost.postTypeName}
                            postUrl={selectedPost.postUrl}
                        />
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
                                    onClick={() => handleLikeOrUnlikePost({ postID })}
                                >
                                    {isLike ? (
                                        <AiFillHeart size={30} className={`fill-primary`} />
                                    ) : (
                                        <AiOutlineHeart size={30} />
                                    )}
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
                                        isLastPage={isLastPage}
                                        authorID={selectedPost.authorDetail.id}
                                        onChangePage={setCommentPage}
                                    />
                                </Suspense>
                            </div>
                            <AddComment postID={postID} isAuthenticated={isAuthenticated} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
