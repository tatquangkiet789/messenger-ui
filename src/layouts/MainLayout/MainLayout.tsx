import SOCKET_EVENT from '@src/constants/socket';
import { updateReceiverLastestMessage } from '@src/features/friends/friendSlice';
import { receiveNewMessageFromSocket } from '@src/features/messages/messageSlice';
import { IMessage } from '@src/features/messages/models/message';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import socketClient from '@src/lib/socketClient';
import WelcomePage from '@src/pages/WelcomePage/WelcomePage';
import HomePage from 'pages/HomePage/HomePage';
import { FC, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';

const MainLayout: FC = () => {
    const { receiver } = useAppSelector((state) => state.friends);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!receiver) return;
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
    }, [dispatch, receiver]);

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
