import { FC, memo } from 'react';
import { IAddFriendNotification } from '../../models/notification';
import AddFriendNotificationItem from '../AddFriendNotificationItem/AddFriendNotificationItem';

interface AddFriendNotificationListProps {
    addFriendNotificationList: IAddFriendNotification[];
}

const AddFriendNotificationList: FC<AddFriendNotificationListProps> = ({
    addFriendNotificationList,
}) => {
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
};

export default memo(AddFriendNotificationList);
