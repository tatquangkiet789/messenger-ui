import { ROUTES } from '@src/constants/routes';
import { Link } from 'react-router-dom';
import logo from '@src/assets/icons/logo.svg';
import Search from './ui/Search';
import Button from './ui/Button';
import useAuth from '@src/features/auth/hooks/useAuth';
import MessageIcon from '@src/features/messages/components/MessageIcon';
import { IoAddOutline } from './icons';
import NotificationIcon from '@src/features/notifications/components/NotificationIcon/NotificationIcon';
import CurrentUserIcon from '@src/features/users/components/CurrentUserIcon/CurrentUserIcon';
import { useState } from 'react';
import CreatePost from '@src/features/posts/components/CreatePost';

export default function Navbar() {
    const { isAuthenticated, currentUser } = useAuth();
    const [isOpenCreatePost, setIsOpenCreatePost] = useState(false);

    function handleOpenCreatePost() {
        setIsOpenCreatePost(true);
    }

    // useEffect(() => {
    //     if (!currentUser) return;

    //     const { username } = currentUser;
    //     socketClient.emit(SOCKET_EVENT.NEW_USER, username);

    //     return () => {
    //         socketClient.removeListener();
    //     };
    // }, [currentUser]);

    // useEffect(() => {
    //     socketClient.on(
    //         SOCKET_EVENT.RECEIVE_NOTIFICATION,
    //         (data: IReceiveNotification) => {
    //             dispatch(receiveNewNotification(data));
    //             dispatch(userLikePost(data.postId));
    //         },
    //     );

    //     return () => {
    //         socketClient.removeListener();
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [dispatch, socketClient]);

    return (
        <>
            <div className='w-screen h-[60px] shadow-[0_1px_1px_rgba(22, 24, 35, 0.12)] z-10 bg-white fixed'>
                <div className='h-[60px] w-full lg:w-[1150px] mx-auto flex justify-between items-center pl-5 pr-6'>
                    <Link to={ROUTES.HOME}>
                        <span>
                            <img src={logo} alt='Logo' />
                        </span>
                    </Link>

                    <Search />
                    <div className='flex justify-between items-center'>
                        {isAuthenticated ? (
                            <div className='flex items-center gap-2'>
                                <div className='mr-6'>
                                    <Button
                                        text='Tải lên'
                                        variant='primary'
                                        iconLeft={<IoAddOutline size={16} />}
                                        size='md'
                                        onClick={handleOpenCreatePost}
                                    />
                                </div>
                                <MessageIcon totalUnreadMessages={0} />
                                <NotificationIcon addFriendNotificationList={[]} />
                                <CurrentUserIcon currentUser={currentUser} />
                            </div>
                        ) : (
                            <Button
                                text='Đăng nhập'
                                variant='primary'
                                size='md'
                                to={ROUTES.LOGIN}
                            />
                        )}
                    </div>
                </div>
            </div>
            {isOpenCreatePost ? <CreatePost onClosePost={setIsOpenCreatePost} /> : null}
        </>
    );
}
