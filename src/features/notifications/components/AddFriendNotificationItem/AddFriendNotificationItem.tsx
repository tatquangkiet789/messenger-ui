import Button from '@src/components/ui/Button/Button';
import { FC } from 'react';
import { IAddFriendNotification } from '../../models/notification';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { removeSelectedAddFriendNotification } from '../../notificationSlice';
import {
    acceptAddFriendNotification,
    declineAddFriendNotification,
} from '../../services/notificationThunk';
import { STORAGE_KEY } from '@src/constants/constants';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { updateFriendListAfterAcceptAddFriendNotification } from '@src/features/friends/friendSlice';

interface AddFriendNotificationItemProps {
    addFriendNotification: IAddFriendNotification;
}

const AddFriendNotificationItem: FC<AddFriendNotificationItemProps> = ({
    addFriendNotification,
}) => {
    const { content, id, notificationSenderDetail } = addFriendNotification;
    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)!;
    const { loading: addFriendNotificationLoading } = useAppSelector(
        (state) => state.notifications,
    );
    const dispatch = useAppDispatch();

    const handleAcceptAddFriendNotification = () => {
        dispatch(acceptAddFriendNotification({ addFriendNotificationId: id, accessToken }))
            .unwrap()
            .then((data) => {
                const { content } = data;
                dispatch(updateFriendListAfterAcceptAddFriendNotification(content));
                dispatch(removeSelectedAddFriendNotification(id));
            });
    };

    const handleDeclineAddFriendNotification = () => {
        dispatch(declineAddFriendNotification({ addFriendNotificationId: id, accessToken }))
            .unwrap()
            .then(() => dispatch(removeSelectedAddFriendNotification(id)));
    };

    return (
        <div
            className={`flex items-start p-2 hover:cursor-pointer hover:bg-gray003 
            border-t border-gray006`}
        >
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
                        loading={addFriendNotificationLoading}
                        disabled={addFriendNotificationLoading}
                    />
                    <Button
                        size='md'
                        text='Từ chối'
                        variant='outlined'
                        onClick={handleDeclineAddFriendNotification}
                        disabled={addFriendNotificationLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddFriendNotificationItem;
