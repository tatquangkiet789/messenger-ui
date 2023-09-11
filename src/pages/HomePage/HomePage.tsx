import { STORAGE_KEY } from '@src/constants/constants';
import SOCKET_EVENT from '@src/constants/socket';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import socketClient from '@src/lib/socketClient';
import ReceiverInfo from '@src/modules/friends/components/ReceiverInfo/ReceiverInfo';
import AddMessage from '@src/modules/messages/components/AddMessage/AddMessage';
import MessageList from '@src/modules/messages/components/MessageList/MessageList';
import { IMessage } from '@src/modules/messages/models/message';
import { updateReceiverLastestMessage } from '@src/redux/reducers/friendSlice';
import {
    findAllMessages,
    receiveNewMessageFromSocket,
    resetMessages,
    setIsNewList,
} from '@src/redux/reducers/messageSlice';
import { FC, useEffect, useState } from 'react';
import { IoVideocamOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

const HomePage: FC = () => {
    const { receiver } = useAppSelector((state) => state.friends);
    const dispatch = useAppDispatch();
    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const [page, setPage] = useState(1);
    const {
        messages,
        loading: messageLoading,
        error: messageError,
    } = useAppSelector((state) => state.messages);

    useEffect(() => {
        if (!accessToken) return;
        dispatch(setIsNewList(page === 1 ? true : false));
        dispatch(
            findAllMessages({
                accessToken: accessToken,
                page: page,
                userId: receiver.id,
            }),
        );
    }, [accessToken, dispatch, page, receiver.id]);

    useEffect(() => {
        dispatch(resetMessages());
        setPage(1);
    }, [dispatch, receiver.id]);

    useEffect(() => {
        socketClient.on(SOCKET_EVENT.RECEIVE_MESSAGE, (data) => {
            // Cập nhật tin nhắn vào trong message list và cập nhật
            // tin nhắn mới nhất trong friend list ở phía receiver
            const newMessage: IMessage = data.content;
            if (newMessage.senderDetail.id === receiver.id) {
                dispatch(receiveNewMessageFromSocket(newMessage));
            }
            dispatch(updateReceiverLastestMessage(newMessage));
        });
        return () => {
            socketClient.off(SOCKET_EVENT.RECEIVE_MESSAGE);
        };
    }, [dispatch, receiver.id]);

    const handleVideoCall = () => {
        toast.info('Opening new browser window');
    };

    return (
        <div className='bg-white flex-1 rounded-lg shadow-lg flex flex-col'>
            <div className='flex items-center justify-between py-2 pr-[22px] pl-4 shadow-md'>
                <ReceiverInfo receiverInfo={receiver} />
                <span
                    onClick={handleVideoCall}
                    className='flex items-center p-2 rounded-lg hover:cursor-pointer 
                    hover:bg-gray006'
                >
                    <IoVideocamOutline size={30} className='text-primary' />
                </span>
            </div>
            <div
                className='py-[10px] pl-[10px] flex flex-1 flex-col gap-[10px] 
                overflow-x-hidden'
                style={{ overflow: 'overlay', overflowAnchor: 'none' }}
            >
                <button
                    className='w-full text-[18px] leading-[25px] font-semibold 
                    text-primary hover:bg-gray006 p-2 duration-500'
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Tải thêm tin nhắn
                </button>
                <MessageList
                    loading={messageLoading}
                    error={messageError}
                    messages={messages}
                />
            </div>
            <AddMessage />
        </div>
    );
};

export default HomePage;
