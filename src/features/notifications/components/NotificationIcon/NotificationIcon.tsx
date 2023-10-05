import HeadlessTippy from '@tippyjs/react/headless';
import { FC, memo, useState } from 'react';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import { IAddFriendNotification } from '../../models/notification';
import AddFriendNotificationList from '../AddFriendNotificationList/AddFriendNotificationList';

interface INotificationIconProps {
    addFriendNotificationList: IAddFriendNotification[];
}

const NotificationIcon: FC<INotificationIconProps> = ({ addFriendNotificationList }) => {
    const [isOpenNotificationList, setIsOpenNotificationList] = useState(false);
    const totalNotifications = addFriendNotificationList.length;

    // useEffect(() => {
    //     socketClient.on(SOCKET_EVENT.SEND_ACCEPTED_ADD_FRIEND_NOTIFICATION, () => {});
    // }, []);

    return (
        <HeadlessTippy
            visible={isOpenNotificationList ? true : false}
            interactive
            placement='bottom-end'
            onClickOutside={() => setIsOpenNotificationList(false)}
            render={(attrs) => (
                <div
                    tabIndex={-1}
                    {...attrs}
                    className='bg-white_1 flex flex-col overflow-y-auto rounded-lg 
                    shadow-md max-w-[480px] max-h-[642px]'
                >
                    <AddFriendNotificationList
                        addFriendNotificationList={addFriendNotificationList}
                    />
                </div>
            )}
        >
            <div
                className={`flex items-center p-2 rounded-lg hover:cursor-pointer relative 
                hover:bg-gray006 ${
                    totalNotifications !== 0
                        ? `before:content-[attr(data-count)] before:bg-red-500 
                        before:absolute before:top-0 before:right-0 before:w-5 before:h-5 
                        before:flex before:items-center before:justify-center before:rounded-full 
                        before:text-white`
                        : ''
                }`}
                data-count={totalNotifications}
                onClick={() => setIsOpenNotificationList(true)}
            >
                <MdOutlineNotificationsNone size={25} />
            </div>
        </HeadlessTippy>
    );
};

export default memo(NotificationIcon);
