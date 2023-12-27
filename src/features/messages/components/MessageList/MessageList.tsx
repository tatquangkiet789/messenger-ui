import { AnimatePresence } from 'framer-motion';
import { Fragment, memo, useEffect, useRef, useState } from 'react';
import { IMessage } from '../../models/message';
import MessageItem from '../MessageItem/MessageItem';
import { AiOutlineLoading3Quarters } from '@src/components/icons';
import useSrcollDown from '../../hooks/useScrollDown';

interface IMessageListProps {
    messages: IMessage[];
    loading: boolean;
    error: string;
    onChangePage: (value: any) => void;
    hasNextPage: boolean;
    isNewList: boolean;
    receiverId: number;
}

const MessageList = memo(function MessageList({
    messages,
    loading,
    error,
    onChangePage,
    hasNextPage,
    isNewList,
    receiverId,
}: IMessageListProps) {
    const lastestMessageRef = useSrcollDown({ delay: 200, scrollDownTrigger: receiverId });
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
            }, 5000);
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
            <div ref={setElement} className='flex items-center justify-center'>
                {hasNextPage ? (
                    <AiOutlineLoading3Quarters className='animate-spin' size={25} />
                ) : null}
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
                            messageId={id}
                        />
                    ))}
                    <div ref={lastestMessageRef}></div>
                </AnimatePresence>
            )}
        </Fragment>
    );
});

export default MessageList;
