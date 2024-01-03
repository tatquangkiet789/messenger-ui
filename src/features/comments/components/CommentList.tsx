import { memo } from 'react';
import { Comment } from '../models/comment';
import CommentItem from './CommentItem';
import { useIntersectionObserver } from '@src/hooks';

type CommentListProps = {
    authorID: number;
    isLastPage: boolean;
    comments: Comment[];
    onChangePage: (page: any) => void;
};

const CommentList = memo(function CommentList({
    authorID,
    comments,
    isLastPage,
    onChangePage,
}: CommentListProps) {
    const { elementRef } = useIntersectionObserver({
        isUnobserve: isLastPage,
        onChange: () => {
            console.log('OnChangePage');
            onChangePage((prev: any) => prev + 1);
        },
    });
    console.log(isLastPage);

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
            <div ref={elementRef}>End of comment</div>
        </div>
    );
});

export default CommentList;