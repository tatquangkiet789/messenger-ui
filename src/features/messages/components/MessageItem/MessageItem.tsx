import { MESSAGE_TYPE } from '@src/constants/constants';
import { useAppSelector } from '@src/hooks/useRedux';
import { motion } from 'framer-motion';
import { memo, useState } from 'react';
import MessageOption from '../MessageOption/MessageOption';

interface IMessageItemProps {
    content: string;
    senderId: number;
    senderAvatar: string;
    messageTypeId: number;
    messageId: number;
}

const MessageItem = memo(function MessageItem({
    content,
    senderId,
    senderAvatar,
    messageTypeId,
    messageId,
}: IMessageItemProps) {
    const { currentUser } = useAppSelector((state) => state.auth);
    const [isShowOptions, setIsShowOptions] = useState(false);

    const renderContent = () => {
        if (messageTypeId === MESSAGE_TYPE.TEXT) {
            return (
                <>
                    <div
                        className={`w-12 h-12 bg-center bg-no-repeat bg-cover rounded-full ${
                            senderId === currentUser.id ? 'hidden' : ''
                        } mt-auto`}
                        style={{ backgroundImage: `url(${senderAvatar})` }}
                    ></div>
                    <p
                        className={`bg-gray006 h-fit p-[11px] rounded-lg break-normal flex-1 ${
                            senderId === currentUser.id ? 'text-white bg-primary' : ''
                        }`}
                    >
                        {content}
                    </p>
                </>
            );
        }
        if (messageTypeId === MESSAGE_TYPE.IMAGE) {
            return (
                <>
                    <div
                        className={`w-12 h-12 bg-center bg-no-repeat bg-cover rounded-full ${
                            senderId === currentUser.id ? 'hidden' : ''
                        } mt-auto`}
                        style={{ backgroundImage: `url(${senderAvatar})` }}
                    ></div>
                    <div
                        className='w-[319px] h-[368px] bg-red-100 bg-center 
                        bg-no-repeat bg-cover rounded-xl'
                        style={{ backgroundImage: `url(${content})` }}
                    ></div>
                </>
            );
        }
    };

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className={`flex items-center gap-[10px] ${
                senderId === currentUser.id && 'flex-row-reverse'
            }`}
            onMouseEnter={() => setIsShowOptions(true)}
            onMouseLeave={() => setIsShowOptions(false)}
        >
            <div className={`flex items-center max-w-[70%] w-fit gap-[10px]`}>
                {renderContent()}
            </div>
            {isShowOptions ? <MessageOption messageID={messageId} /> : null}
        </motion.div>
    );
});

export default MessageItem;
