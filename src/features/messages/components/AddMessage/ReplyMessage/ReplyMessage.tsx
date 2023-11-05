import { MESSAGE_TYPE } from '@src/constants/constants';
import { resetSelectedMessage } from '@src/features/messages/messageSlice';
import { IMessage } from '@src/features/messages/models/message';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import Tippy from '@tippyjs/react';
import { memo } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

type ReplyMessageProps = {
    selectedMessage: IMessage;
    currentUserID: number;
};

const ReplyMessage = memo(function ReplyMessage({
    selectedMessage,
    currentUserID,
}: ReplyMessageProps) {
    const { senderDetail, messageTypeId, content } = selectedMessage;
    const dispatch = useAppDispatch();

    return (
        <div className={`px-5 py-2 flex items-start`}>
            <div className={`flex-1`}>
                <p>
                    Đang trả lời{' '}
                    {senderDetail.id === currentUserID ? (
                        <span className={`font-semibold text-primary`}>chính minh</span>
                    ) : (
                        <span className={`font-semibold text-primary`}>{senderDetail.name}</span>
                    )}
                </p>
                {messageTypeId === MESSAGE_TYPE.TEXT ? (
                    <p className={`text-sm`}>{content}</p>
                ) : (
                    <p className={`text-sm`}>Hình ảnh</p>
                )}
            </div>
            <Tippy content='Đóng'>
                <span
                    className={`hover:cursor-pointer hover:text-primary`}
                    onClick={() => dispatch(resetSelectedMessage())}
                >
                    <AiOutlineCloseCircle size={20} />
                </span>
            </Tippy>
        </div>
    );
});

export default ReplyMessage;
