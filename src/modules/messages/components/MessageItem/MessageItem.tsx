import { useAppSelector } from '@src/hooks/useAppSelector';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface IMessageItemProps {
    content: string;
    senderId: number;
    senderAvatar: string;
    id: number;
}

const MessageItem: FC<IMessageItemProps> = ({ content, senderId, senderAvatar, id }) => {
    const { currentUser } = useAppSelector((state) => state.auth);

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className={`flex items-center max-w-[70%] w-fit gap-[10px] ${
                senderId === currentUser.id ? 'ml-auto' : ''
            }`}
        >
            <div
                className={`w-12 h-12 bg-center bg-no-repeat bg-contain rounded-full ${
                    senderId === currentUser.id ? 'hidden' : ''
                } mt-auto`}
                style={{ backgroundImage: `url(${senderAvatar})` }}
            ></div>
            <p
                className={`bg-gray006 h-fit p-[11px] rounded-lg break-normal flex-1 ${
                    senderId === currentUser.id ? 'text-white bg-primary' : ''
                }`}
            >
                {content}-{id}
            </p>
        </motion.div>
    );
};

export default MessageItem;