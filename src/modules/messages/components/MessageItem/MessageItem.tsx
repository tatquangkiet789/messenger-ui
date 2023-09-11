import { MESSAGE_TYPE } from '@src/constants/constants';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { motion } from 'framer-motion';
import { FC, Fragment } from 'react';

interface IMessageItemProps {
    content: string;
    senderId: number;
    senderAvatar: string;
    messageTypeId: number;
}

const MessageItem: FC<IMessageItemProps> = ({
    content,
    senderId,
    senderAvatar,
    messageTypeId,
}) => {
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
            {messageTypeId === MESSAGE_TYPE.TEXT ? (
                <Fragment>
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
                </Fragment>
            ) : null}
            {messageTypeId === MESSAGE_TYPE.IMAGE ? (
                <Fragment>
                    <div
                        className={`w-12 h-12 bg-center bg-no-repeat bg-cover rounded-full ${
                            senderId === currentUser.id ? 'hidden' : ''
                        } mt-auto`}
                        style={{ backgroundImage: `url(${senderAvatar})` }}
                    ></div>
                    {/* <p
                        className={`bg-gray006 h-fit p-[11px] rounded-lg break-normal flex-1 ${
                            senderId === currentUser.id ? 'text-white bg-primary' : ''
                        }`}
                    >
                        {content}
                    </p> */}
                    <div
                        className='w-[319px] h-[368px] bg-red-100 bg-center 
                        bg-no-repeat bg-cover rounded-xl'
                        style={{ backgroundImage: `url(${content})` }}
                    ></div>
                </Fragment>
            ) : null}
        </motion.div>
    );
};

export default MessageItem;
