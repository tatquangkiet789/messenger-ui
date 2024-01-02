import { tickIcon } from '@src/assets';
import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Comment } from '../models/comment';
import { findAllChildCommentsByParentIDService } from '../services/commentService';
import CommentList from './CommentList';
import useAuth from '@src/features/auth/hooks/useAuth';
import { calculateRemainChildComments } from '@src/utils/util';
import { useAppDispatch } from '@src/hooks';
import { setSelectedCommentByID } from '../commentSlice';

type CommentItemProps = {
    comment: Comment;
    authorID: number;
    isDisabledReply: boolean;
    // childComments?: Comment[];
};

const CommentItem = memo(function CommentItem({
    comment,
    authorID,
    isDisabledReply,
}: // childComments,
CommentItemProps) {
    const { id, content, userCommentDetail, createdDate, totalChildComments, postID } = comment;
    const { avatar, lastName, firstName, id: userID, username, isVerified } = userCommentDetail;
    const { isAuthenticated } = useAuth();
    const [childComments, setChildComments] = useState<Comment[]>([]);
    const [childCommentPage, setChildCommetPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const totalComments = calculateRemainChildComments({
        totalChildComments,
        fetchedChildComments: childComments.length,
    });
    const dispatch = useAppDispatch();

    const handleFindAllChildComments = async () => {
        const data = await findAllChildCommentsByParentIDService({
            page: childCommentPage,
            parentID: id,
            postID,
        });
        setChildComments(data.content);
        setIsLastPage(data.isLastPage);
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
                    {totalComments !== 0 && !isLastPage ? (
                        <p
                            className='text-base font-semibold hover:cursor-pointer hover:underline w-fit'
                            onClick={handleFindAllChildComments}
                        >
                            Xem {totalChildComments} phản hồi
                        </p>
                    ) : null}
                </div>
            </div>
            {childComments.length !== 0 ? (
                <div className='pl-12'>
                    <CommentList
                        comments={childComments}
                        authorID={authorID}
                        onChangePage={setChildCommetPage}
                    />
                </div>
            ) : null}
        </div>
    );
});

export default CommentItem;
