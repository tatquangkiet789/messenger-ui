import Tippy from '@tippyjs/react';
import { memo } from 'react';
import { setSelectedMessage } from '../../messageSlice';
import { BsSend } from '@src/components/icons';
import { useAppDispatch } from '@src/hooks/useRedux';

type MessageOptionProps = {
    messageID: number;
};

const MessageOption = memo(function MessageOption({ messageID }: MessageOptionProps) {
    const dispatch = useAppDispatch();

    const handleReplyMessage = () => {
        dispatch(setSelectedMessage(messageID));
    };

    return (
        <Tippy content='Trả lời'>
            <div
                className={`flex bg-gray003 p-[6px] rounded-md hover:cursor-pointer hover:text-primary`}
                onClick={handleReplyMessage}
            >
                <BsSend size={16} />
            </div>
        </Tippy>
    );
});

export default MessageOption;
