import tickIcon from '@src/assets/icons/tick.svg';
import Button from '@src/components/ui/Button/Button';
import { STORAGE_KEY } from '@src/constants/constants';
import {
    createAddFriendNotification,
    deleteAddFriendNotification,
} from '@src/features/notifications/services/notificationThunk';
import { IUser } from '@src/features/users/models/user';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { memo } from 'react';
import { updateSearchResultListAfterDelete } from '../../userSlice';

interface ISearchUserItemList {
    searchUserItem: IUser;
}

const SearchUserItem = memo(function SearchUserItem({ searchUserItem }: ISearchUserItemList) {
    const { id, firstName, lastName, avatar, tick, isSentAddFriendNotification } = searchUserItem;
    const dispatch = useAppDispatch();
    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)!;
    const { loading: notificationLoading } = useAppSelector((state) => state.notifications);

    const handleCreateAddFriendNotification = () => {
        dispatch(createAddFriendNotification({ receiverId: id, accessToken }));
    };

    const handleDeleteAddFriendNotification = () => {
        dispatch(deleteAddFriendNotification({ userID: id, accessToken }))
            .unwrap()
            .then(() => dispatch(updateSearchResultListAfterDelete(id)));
    };

    return (
        <div className={`flex items-center py-2 px-4 hover:bg-gray003`}>
            <div
                className={`bg-cover bg-center bg-no-repeat h-12 w-12 rounded-full`}
                style={{ backgroundImage: `url(${avatar})` }}
            ></div>
            <div className={`pl-2 flex-1`}>
                <h2 className={`flex items-center`}>
                    {lastName} {firstName}
                    {tick ? <img src={tickIcon} className='pl-2' /> : null}
                </h2>
            </div>
            {isSentAddFriendNotification ? (
                <Button
                    text='Hủy lời mời'
                    size='sm'
                    variant='default'
                    onClick={handleDeleteAddFriendNotification}
                    loading={notificationLoading}
                    disabled={notificationLoading}
                />
            ) : (
                <Button
                    text='Kết bạn'
                    size='sm'
                    variant='primary'
                    onClick={handleCreateAddFriendNotification}
                    loading={notificationLoading}
                    disabled={notificationLoading}
                />
            )}
        </div>
    );
});

export default SearchUserItem;
