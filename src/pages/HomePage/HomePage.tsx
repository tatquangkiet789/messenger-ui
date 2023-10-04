import { STORAGE_KEY } from '@src/constants/constants';
import { ROUTES } from '@src/constants/routes';
import ReceiverInfo from '@src/features/friends/components/ReceiverInfo/ReceiverInfo';
import AddMessage from '@src/features/messages/components/AddMessage/AddMessage';
import MessageList from '@src/features/messages/components/MessageList/MessageList';
import { resetMessages, setIsNewList } from '@src/features/messages/messageSlice';
import { findAllMessages } from '@src/features/messages/services/messageThunk';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { FC, useEffect, useState } from 'react';
import { IoVideocamOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const HomePage: FC = () => {
    const { receiver } = useAppSelector((state) => state.friends);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(1);
    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)!;
    const {
        messages,
        loading: messageLoading,
        error: messageError,
        hasNextPage,
        isNewList,
    } = useAppSelector((state) => state.messages);

    useEffect(() => {
        dispatch(setIsNewList(page === 1 ? true : false));
        dispatch(
            findAllMessages({
                accessToken: accessToken,
                page: page,
                userId: receiver.id,
            }),
        );
    }, [dispatch, accessToken, page, receiver.id]);

    useEffect(() => {
        dispatch(resetMessages());
        setPage(1);
    }, [dispatch, receiver.id]);

    return (
        <div className='bg-white flex-1 rounded-lg shadow-lg flex flex-col overflow-hidden'>
            <div className='flex items-center justify-between py-2 pr-[22px] pl-4'>
                <ReceiverInfo receiverInfo={receiver} />
                <Link
                    to={`${ROUTES.VIDEO_CALL}`}
                    className='flex items-center p-2 rounded-lg hover:cursor-pointer 
                    hover:bg-gray006'
                >
                    <IoVideocamOutline size={30} className='text-primary' />
                </Link>
            </div>
            <div
                className='p-[10px] flex flex-1 flex-col gap-[10px] 
                overflow-x-hidden overflow-y-scroll'
            >
                <MessageList
                    loading={messageLoading}
                    error={messageError}
                    messages={messages}
                    onChangePage={setPage}
                    hasNextPage={hasNextPage}
                    isNewList={isNewList}
                    receiverId={receiver.id}
                />
            </div>
            <AddMessage />
        </div>
    );
};

export default HomePage;
