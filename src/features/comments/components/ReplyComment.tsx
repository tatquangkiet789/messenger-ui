import { memo } from 'react';
import { Comment } from '../models/comment';
import { AiOutlineCloseCircle } from '@src/components/icons';
import { useAppDispatch } from '@src/hooks';
import { resetSelectedComment } from '../commentSlice';

type ReplyCommentProps = {
    selectedComment: Comment | null;
};

const ReplyComment = memo(function ReplyComment({ selectedComment }: ReplyCommentProps) {
    const dispatch = useAppDispatch();

    if (!selectedComment) return null;

    return (
        <div className={`flex item-center gap-5 pb-2 pl-3`}>
            <p className={`flex item-center font-semibold text-gray05`}>
                Trả lời @{selectedComment.userCommentDetail.lastName}{' '}
                {selectedComment.userCommentDetail.firstName}
            </p>
            <span
                className={`hover:cursor-pointer flex items-center`}
                onClick={() => dispatch(resetSelectedComment())}
            >
                <AiOutlineCloseCircle size={16} />
            </span>
        </div>
    );
});

export default ReplyComment;
