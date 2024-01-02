import { memo } from 'react';
import { Comment } from '../models/comment';
import CommentItem from './CommentItem';

type CommentListProps = {
    authorID: number;
    comments: Comment[];
};

const CommentList = memo(function CommentList({ authorID, comments }: CommentListProps) {
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
