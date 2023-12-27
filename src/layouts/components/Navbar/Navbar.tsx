import logo from '@src/assets/icons/logo.svg';
import { STORAGE_KEY } from '@src/constants/constants';
import NotificationIcon from '@src/features/notifications/components/NotificationIcon/NotificationIcon';
import { findAllAddFriendNotifications } from '@src/features/notifications/services/notificationThunk';
import CurrentUserIcon from '@src/features/users/components/CurrentUserIcon/CurrentUserIcon';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { FC, useEffect } from 'react';

const Navbar: FC = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    const { addFriendNotificationList } = useAppSelector((state) => state.notifications);
    const dispatch = useAppDispatch();
    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)!;

    useEffect(() => {
        if (!currentUser) return;

        dispatch(findAllAddFriendNotifications({ page: 1, accessToken }));
    }, [accessToken, currentUser, dispatch]);

    return (
        <div className='w-screen h-[60px] shadow-[0_1px_1px_rgba(22, 24, 35, 0.12)] z-10 bg-white'>
            <div className='h-[60px] w-full lg:w-[1150px] mx-auto flex justify-between items-center pl-5 pr-6'>
                <span>
                    <img src={logo} alt='Logo' />
                </span>
                <div className={`flex gap-1 items-center`}>
                    <NotificationIcon addFriendNotificationList={addFriendNotificationList} />
                    {currentUser ? <CurrentUserIcon currentUser={currentUser} /> : null}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
