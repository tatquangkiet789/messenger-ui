import { IoVideocamOutline } from '@src/components/icons';
import { ROUTES } from '@src/constants/routes';
import useAccessToken from '@src/features/auth/hooks/useAccessToken';
import ReceiverInfo from '@src/features/friends/components/ReceiverInfo/ReceiverInfo';
import AddMessage from '@src/features/messages/components/AddMessage/AddMessage';
import MessageList from '@src/features/messages/components/MessageList/MessageList';
import useMessage from '@src/features/messages/hooks/useMessage';
import { resetMessages, resetSelectedMessage } from '@src/features/messages/messageSlice';
import { VideoContext } from '@src/features/videos/context/VideoContext';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const [messagePage, setMessagePage] = useState(1);
    const { receiver } = useAppSelector((state) => state.friends);
    const { currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { accessToken } = useAccessToken();
    const { messageList, messageHasNextPage, messageError, messageLoading, messageNewList } =
        useMessage({ page: messagePage, accessToken, receiverId: receiver.id });
    const navigate = useNavigate();

    const { handleSendCallerAndReceiverIDContext } = useContext(VideoContext);

    useEffect(() => {
        dispatch(resetMessages());
        setMessagePage(1);
        dispatch(resetSelectedMessage());
    }, [dispatch, receiver.id]);

    const handleCallUser = () => {
        handleSendCallerAndReceiverIDContext({ receiverID: receiver.id, senderID: currentUser.id });
        return navigate(ROUTES.VIDEO_CALL);
    };

    return (
        <div className='bg-white flex-1 rounded-lg shadow-lg flex flex-col overflow-hidden'>
            <div className='flex items-center justify-between py-2 pr-[22px] pl-4'>
                <ReceiverInfo receiverInfo={receiver} />
                <div
                    className='flex items-center p-2 rounded-lg hover:cursor-pointer 
                    hover:bg-gray006'
                    onClick={handleCallUser}
                >
                    <IoVideocamOutline size={30} className='text-primary' />
                </div>
            </div>
            <div
                className='p-[10px] flex flex-1 flex-col gap-[10px] 
                overflow-x-hidden overflow-y-scroll'
            >
                <MessageList
                    loading={messageLoading}
                    error={messageError}
                    messages={messageList}
                    onChangePage={setMessagePage}
                    hasNextPage={messageHasNextPage}
                    isNewList={messageNewList}
                    receiverId={receiver.id}
                />
            </div>
            <AddMessage />
        </div>
    );
}
