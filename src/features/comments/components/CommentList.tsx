import { memo } from 'react';
import { Comment } from '../models/comment';
import CommentItem from './CommentItem';

type CommentListProps = {
    authorID: number;
    comments: Comment[];
};

const CommentList = memo(function CommentList({ authorID, comments }: CommentListProps) {
    // const rootComments = [...comments]
    //     .filter((comment) => comment.parentID === null)
    //     .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());

    // function getChildComments(parentID: number) {
    //     return [...comments]
    //         .filter((comment) => comment.parentID === parentID)
    //         .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
    // }

    return (
        <div className={`flex flex-col`}>
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    authorID={authorID}
                    isDisabledReply={false}
                />
            ))}
        </div>
    );
});

export default CommentList;
