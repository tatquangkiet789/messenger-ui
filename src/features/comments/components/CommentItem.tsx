import { tickIcon } from '@src/assets';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Comment } from '../models/comment';

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
    const { id, content, userCommentDetail, createdDate, totalChildComments } = comment;
    const { avatar, lastName, firstName, id: userID, username, isVerified } = userCommentDetail;
    console.log(id);

    // const dispatch = useAppDispatch();

    // const handleSetRepliedUserFullName = () => {
    //     dispatch(findSelectedCommentById(id!));
    // };

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
                        {!isDisabledReply ? (
                            <button
                                className={`ml-[10px] text-base text-gray05 hover:cursor-pointer hover:underline`}
                            >
                                Phản hồi
                            </button>
                        ) : null}
                    </div>
                    {totalChildComments !== 0 ? (
                        <p className='text-base font-semibold hover:cursor-pointer hover:underline'>
                            Xem {totalChildComments} phản hồi
                        </p>
                    ) : null}
                </div>
            </div>
            {/* {childComments ? (
                <div className={`p-7 flex flex-col`}>
                    {childComments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            authorID={authorID}
                            comment={comment}
                            isDisabledReply={false}
                        />
                    ))}
                </div>
            ) : null} */}
        </div>
    );
});

export default CommentItem;
