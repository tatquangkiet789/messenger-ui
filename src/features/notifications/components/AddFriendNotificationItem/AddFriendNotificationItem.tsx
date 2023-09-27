import React, { FC } from 'react';
import { IAddFriendNotification } from '../../models/notification';
import Button from '@src/components/ui/Button/Button';

interface AddFriendNotificationItemProps {
    addFriendNotification: IAddFriendNotification;
}

const AddFriendNotificationItem: FC<AddFriendNotificationItemProps> = ({
    addFriendNotification,
}) => {
    const { content, id, notificationSenderDetail } = addFriendNotification;

    const handleAcceptAddFriendNotification = () => {
        console.log(`Accept Add Friend Notification with ID: [${id}]`);
    };

    const handleDeclineAddFriendNotification = () => {
        console.log(`Decline Add Friend Notification with ID: [${id}]`);
    };

    return (
        <div className={`flex items-start p-2 hover:cursor-pointer hover:bg-gray003`}>
            <div
                className={`bg-no-repeat bg-contain bg-center w-14 h-14 rounded-full`}
                style={{ backgroundImage: `url(${notificationSenderDetail.avatar})` }}
            ></div>
            <div className={`flex flex-col pl-4 pr-2`}>
                <p className={`flex-1 reak-keep`}>
                    <span className='font-semibold mr-1'>
                        {notificationSenderDetail.lastName} {notificationSenderDetail.firstName}
                    </span>
                    {content}
                </p>
                <div className={`flex items-start gap-2 mt-3 mb-2`}>
                    <Button
                        size='md'
                        text='Chấp nhận'
                        variant='primary'
                        onClick={handleAcceptAddFriendNotification}
                    />
                    <Button
                        size='md'
                        text='Từ chối'
                        variant='outlined'
                        onClick={handleDeclineAddFriendNotification}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddFriendNotificationItem;
