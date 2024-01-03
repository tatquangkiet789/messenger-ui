import { memo } from 'react';
import { Comment } from '../models/comment';
import CommentItem from './CommentItem';

type ChildCommentListProps = {
    totalChildComments: number;
    childComments: Comment[];
    authorID: number;
    // onChangePage: (page: any) => void;
    // isLastPage: boolean;
};

const ChildCommentList = memo(function ChildCommentList({
    authorID,
    childComments,
    // isLastPage,
    // onChangePage,
    totalChildComments,
}: ChildCommentListProps) {
    if (totalChildComments === 0) return null;

    return (
        <div className='pl-12'>
            {childComments.map((commet) => (
                <CommentItem
                    key={commet.id}
                    comment={commet}
                    authorID={authorID}
                    isDisabledReply={true}
                />
            ))}
            {/* <CommentList
                comments={childComments}
                authorID={authorID}
                onChangePage={onChangePage}
                isLastPage={isLastPage}
            /> */}
        </div>
    );
});

export default ChildCommentList;
