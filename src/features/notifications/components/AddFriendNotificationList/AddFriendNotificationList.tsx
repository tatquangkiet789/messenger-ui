import { memo } from 'react';
import { IAddFriendNotification } from '../../models/notification';
import AddFriendNotificationItem from '../AddFriendNotificationItem/AddFriendNotificationItem';

interface AddFriendNotificationListProps {
    addFriendNotificationList: IAddFriendNotification[];
}

const AddFriendNotificationList = memo(function AddFriendNotificationList({
    addFriendNotificationList,
}: AddFriendNotificationListProps) {
    return (
        <div className={`flex flex-col`}>
            {addFriendNotificationList.map((addFriendNotification) => (
                <AddFriendNotificationItem
                    key={addFriendNotification.id}
                    addFriendNotification={addFriendNotification}
                />
            ))}
        </div>
    );
});

export default AddFriendNotificationList;
