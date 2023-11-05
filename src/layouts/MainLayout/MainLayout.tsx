import ReceivedCall from '@src/features/videos/components/ReceivedCall/ReceivedCall';
import { VideoContext } from '@src/features/videos/context/VideoContext';
import { useAppSelector } from '@src/hooks/useAppSelector';
import WelcomePage from '@src/pages/WelcomePage/WelcomePage';
import HomePage from 'pages/HomePage/HomePage';
import { FC, useCallback, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { IMessage } from '@src/features/messages/models/message';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import SOCKET_EVENT from '@src/constants/socket';
import socketClient from '@src/lib/socketClient';
import { updateReceiverLastestMessage } from '@src/features/friends/friendSlice';
import { receiveNewMessageFromSocket } from '@src/features/messages/messageSlice';
import { receiveAddFriendNotificationFromSocket } from '@src/features/notifications/notificationSlice';

const MainLayout: FC = () => {
    const { receiver } = useAppSelector((state) => state.friends);
    const dispatch = useAppDispatch();
    const { callDetail, isEnded } = useContext(VideoContext);

    useEffect(() => {
        if (!callDetail) return;
        if (!callDetail.isReceivedCall) return;
        if (isEnded) return;

        const { callerDetail } = callDetail;
        toast(() => <ReceivedCall callerDetail={callerDetail} />, {
            className: `cursor-default`,
            closeOnClick: true,
        });
        socketClient.on(SOCKET_EVENT.RECEIVED_END_CALL, () => {
            console.log('Received end call');
        });

        return () => {
            socketClient.off(SOCKET_EVENT.RECEIVED_END_CALL, () => {
                console.log('Clean up Received end call');
            });
        };
    }, [callDetail, isEnded]);

    const handleAddFriend = useCallback(
        (data: any) => {
            dispatch(receiveAddFriendNotificationFromSocket(data.content));
        },
        [dispatch],
    );

    const handleAddMessage = useCallback(
        (data: any) => {
            if (!receiver) return;
            const newMessage: IMessage = data.content;
            if (newMessage.senderDetail.id === receiver.id) {
                dispatch(receiveNewMessageFromSocket(newMessage));
            }
            dispatch(updateReceiverLastestMessage(newMessage));
        },
        [dispatch, receiver],
    );

    useEffect(() => {
        socketClient.on(SOCKET_EVENT.SEND_ADD_FRIEND_NOTIFICATION, handleAddFriend);

        // Cập nhật tin nhắn vào trong message list và cập nhật
        // tin nhắn mới nhất trong friend list ở phía receiver
        socketClient.on(SOCKET_EVENT.RECEIVE_MESSAGE, handleAddMessage);

        return () => {
            socketClient.off(SOCKET_EVENT.SEND_ADD_FRIEND_NOTIFICATION, handleAddFriend);
            socketClient.off(SOCKET_EVENT.RECEIVE_MESSAGE, handleAddMessage);
        };
    }, [handleAddFriend, handleAddMessage]);

    return (
        <div className='bg-gray248_248_248'>
            <Navbar />
            <div className='flex p-[18px] w-full gap-[18px] h-[calc(100vh-60px)] bg-gray241_241_242_1'>
                <Sidebar />
                {receiver ? <HomePage /> : <WelcomePage />}
            </div>
        </div>
    );
};

export default MainLayout;
