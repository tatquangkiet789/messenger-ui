import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from '@src/components/icons';
import AccountInfo from 'components/AccountInfo';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { numberFormat } from 'utils/format';
import useLikePost from '../hooks/useLikePost';
import { Post } from '../models/post';
import PostContent from './PostContent';

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
    const { isLike, handleLikeOrUnlikePost } = useLikePost({ userLikeList });

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
                    onClick={() => handleLikeOrUnlikePost({ postID: id })}
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
