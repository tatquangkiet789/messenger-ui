import { tickIcon } from '@src/assets';
import useAuth from '@src/features/auth/hooks/useAuth';
import { useAppDispatch } from '@src/hooks';
import { calculateRemainChildComments } from '@src/utils/util';
import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { setSelectedCommentByID } from '../commentSlice';
import { Comment } from '../models/comment';
import { findAllChildCommentsByParentID } from '../services/commentThunk';
import ChildCommentList from './ChildCommentList';

type CommentItemProps = {
    comment: Comment;
    authorID: number;
    isDisabledReply: boolean;
};

const CommentItem = memo(function CommentItem({
    comment,
    authorID,
    isDisabledReply,
}: CommentItemProps) {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAuth();
    const [childCommentPage, setChildCommetPage] = useState(1);

    const { id, content, userCommentDetail, createdDate, totalChildComments, postID } = comment;
    const { avatar, lastName, firstName, id: userID, username, isVerified } = userCommentDetail;
    const childComments = comment.childComments ? comment.childComments : [];

    const totalComments = calculateRemainChildComments({
        totalChildComments,
        fetchedChildComments: childComments.length,
    });

    const handleFindAllChildComments = async () => {
        dispatch(findAllChildCommentsByParentID({ page: childCommentPage, parentID: id, postID }));
    };

    const handleSetSelectedComment = () => {
        dispatch(setSelectedCommentByID(id));
    };

    return (
        <div className={`flex flex-col w-full max-w-[500px]`}>
            <div className={`flex justify-between mb-5`}>
                <div
                    className={`w-10 h-10 bg-center bg-cover rounded-full`}
                    style={{ backgroundImage: `url(${avatar})` }}
                ></div>
                <div className={`flex flex-col w-[calc(100%-50px)]`}>
                    <Link
                        to={`/${username}`}
                        className={`flex item-center font-bold text-xl gap-2`}
                    >
                        <p className={`flex item-center hover:cursor-pointer hover:underline`}>
                            {lastName} {firstName}
                            {isVerified ? <img className='ml-2' src={tickIcon} /> : null}
                        </p>
                        {userID === authorID ? (
                            <p className={`text-sm text-primary my-auto`}>Tác giả</p>
                        ) : null}
                    </Link>
                    <p className={`text-lg whitespace-pre-wrap`} style={{ wordWrap: 'break-word' }}>
                        {content}
                    </p>
                    <div className={`flex items-center py-[2px]`}>
                        <span className={`text-gray05`}>{createdDate}</span>
                        {!isDisabledReply && isAuthenticated ? (
                            <button
                                className={`ml-[10px] text-base text-gray05 hover:cursor-pointer hover:underline`}
                                onClick={handleSetSelectedComment}
                            >
                                Phản hồi
                            </button>
                        ) : null}
                    </div>
                    {/* {totalComments !== 0 && !isLastPage ? ( */}
                    {totalComments !== 0 ? (
                        <p
                            className='text-base font-semibold hover:cursor-pointer hover:underline w-fit'
                            onClick={handleFindAllChildComments}
                        >
                            Xem {totalChildComments} phản hồi
                        </p>
                    ) : null}
                </div>
            </div>
            <ChildCommentList
                authorID={authorID}
                childComments={childComments}
                totalChildComments={childComments.length}
            />
        </div>
    );
});

export default CommentItem;
