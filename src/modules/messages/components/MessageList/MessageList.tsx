import { AnimatePresence } from 'framer-motion';
import { FC, Fragment, useEffect, useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IMessage } from '../../models/message';
import MessageItem from '../MessageItem/MessageItem';

interface IMessageListProps {
    messages: IMessage[];
    loading: boolean;
    error: string;
    onChangePage: (value: any) => void;
    hasNextPage: boolean;
    isNewList: boolean;
}

const MessageList: FC<IMessageListProps> = ({
    messages,
    loading,
    error,
    onChangePage,
    hasNextPage,
    isNewList,
}) => {
    const [element, setElement] = useState<HTMLDivElement | null>(null);
    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    handleChangePage();
                }
            },
            { threshold: 1 },
        ),
    );

    const handleChangePage = () => {
        onChangePage((prev: any) => prev + 1);
    };

    useEffect(() => {
        if (!element) return;
        const currentObserver = observer.current;
        let timeout = null as any;

        if (isNewList) {
            timeout = setTimeout(() => {
                currentObserver.observe(element);
            }, 3000);
            return;
        }
        currentObserver.observe(element);
        if (!hasNextPage) currentObserver.unobserve(element);

        return () => {
            currentObserver.unobserve(element);
            clearTimeout(timeout);
        };
    }, [element, hasNextPage, isNewList]);

    return (
        <Fragment>
            <div ref={setElement} className='p-2 flex items-center justify-center'>
                {hasNextPage ? (
                    <AiOutlineLoading3Quarters className='animate-spin' size={25} />
                ) : (
                    <p>Không còn tin nhắn để hiển thị</p>
                )}
            </div>
            {messages.length === 0 && loading ? (
                <p>Đang tải tin nhắn</p>
            ) : messages.length === 0 ? (
                <p>Hãy gửi tin nhắn để bắt đầu cuộc trò chuyện</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <AnimatePresence>
                    {messages.map(({ senderDetail, content, id, messageTypeId }) => (
                        <MessageItem
                            key={id}
                            content={content}
                            senderId={senderDetail.id}
                            senderAvatar={senderDetail.avatar}
                            messageTypeId={messageTypeId}
                        />
                    ))}
                </AnimatePresence>
            )}
        </Fragment>
    );
};

export default MessageList;
