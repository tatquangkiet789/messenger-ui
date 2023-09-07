import { FC } from 'react';
import { IMessage } from '../../models/message';
import MessageItem from '../MessageItem/MessageItem';
import { AnimatePresence } from 'framer-motion';

interface IMessageListProps {
    messages: IMessage[];
    loading: boolean;
    error: string;
}

const MessageList: FC<IMessageListProps> = ({ messages, loading, error }) => {
    return (
        <div className='flex flex-col gap-[10px] overflow-x-hidden'>
            {messages.length === 0 && loading ? (
                <p>Đang tải tin nhắn</p>
            ) : messages.length === 0 ? (
                <p>Hãy gửi tin nhắn để bắt đầu cuộc trò chuyện</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <AnimatePresence>
                    {messages.map(({ senderDetail, content, id }, index) => (
                        <MessageItem
                            key={index}
                            content={content}
                            senderId={senderDetail.id}
                            senderAvatar={senderDetail.avatar}
                            id={id}
                        />
                    ))}
                </AnimatePresence>
            )}
        </div>
    );
};

export default MessageList;
