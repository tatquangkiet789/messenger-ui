import Button from '@src/components/ui/Button/Button';
import { STORAGE_KEY } from '@src/constants/constants';
import SOCKET_EVENT from '@src/constants/socket';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import socketClient from '@src/lib/socketClient';
import ReceiverInfo from '@src/modules/friends/components/ReceiverInfo/ReceiverInfo';
import AddMessage from '@src/modules/messages/components/AddMessage/AddMessage';
import MessageList from '@src/modules/messages/components/MessageList/MessageList';
import { IMessage } from '@src/modules/messages/models/message';
import { updateLastestMessageFromSocket } from '@src/redux/reducers/friendSlice';
import {
    findAllMessages,
    receiveNewMessageFromSocket,
    resetMessages,
    setIsNewList,
} from '@src/redux/reducers/messageSlice';
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import { IoVideocamOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

const HomePage: FC = () => {
    const { receiver } = useAppSelector((state) => state.friends);
    const dispatch = useAppDispatch();
    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const element = useRef() as MutableRefObject<HTMLDivElement>;
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, page, receiver.id]);

    useEffect(() => {
        socketClient.on(SOCKET_EVENT.RECEIVE_MESSAGE, (data: IMessage) => {
            if (data.senderDetail.id === receiver.id) {
                console.log('In the same conversation');
                dispatch(receiveNewMessageFromSocket(data));
            } else {
                console.log('Not in the same conversation');
                dispatch(updateLastestMessageFromSocket(data));
            }
            // console.log(data);
        });
        // return () => {
        //     console.log('Remove socketClient');
        //     socketClient.removeListener();
        // };
    }, [dispatch, receiver.id]);

    useEffect(() => {
        if (!element) return;
        if (messages.length === 0) return;

        const scrollToBottom = () => {
            element.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        };

        scrollToBottom();
    }, [element, receiver.id, messages.length]);

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
            <div className='flex-1 overflow-y-scroll p-[10px]'>
                <div className='flex gap-4'>
                    <Button
                        size='md'
                        text='Load'
                        variant='primary'
                        onClick={() => setPage((prev) => prev + 1)}
                    />
                    <Button
                        size='md'
                        text='Reset'
                        variant='default'
                        onClick={() => dispatch(resetMessages())}
                    />
                </div>
                <MessageList
                    loading={messageLoading}
                    error={messageError}
                    messages={messages}
                />
                <div ref={element}></div>
            </div>
            <AddMessage />
        </div>
    );
};

export default HomePage;
