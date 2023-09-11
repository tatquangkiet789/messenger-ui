import { AnimatePresence } from 'framer-motion';
import { FC, Fragment } from 'react';
import { IMessage } from '../../models/message';
import MessageItem from '../MessageItem/MessageItem';

interface IMessageListProps {
    messages: IMessage[];
    loading: boolean;
    error: string;
}

const MessageList: FC<IMessageListProps> = ({ messages, loading, error }) => {
    // const [element, setElement] = useState<HTMLDivElement | null>(null);
    // const latestMessageRef = useRef<HTMLDivElement | null>(null);
    // const observer = useRef(
    //     new IntersectionObserver(
    //         (entries) => {
    //             const first = entries[0];
    //             if (first.isIntersecting) onChangePage((prev: any) => prev + 1);
    //         },
    //         {
    //             threshold: 1,
    //         },
    //     ),
    // );

    // useEffect(() => {
    //     const currentElement = element;
    //     const currentObserver = observer.current;

    //     if (!currentElement) return;

    //     currentObserver.observe(currentElement);

    //     if (!hasNextPage) currentObserver.unobserve(currentElement);

    //     return () => currentObserver.unobserve(currentElement);
    // }, [element, hasNextPage]);

    return (
        <Fragment>
            {/* <div ref={setElement}></div> */}
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
            {/* <div ref={latestMessageRef} className='h-10 bg-red-100'></div> */}
        </Fragment>
    );
};

export default MessageList;
