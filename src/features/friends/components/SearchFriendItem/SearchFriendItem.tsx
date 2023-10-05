import { IUser } from '@src/features/users/models/user';
import { FC, memo } from 'react';
import tickIcon from '@src/assets/icons/tick.svg';
import Button from '@src/components/ui/Button/Button';
import { createAddFriendNotification } from '@src/features/notifications/services/notificationThunk';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { STORAGE_KEY } from '@src/constants/constants';

interface ISearchFriendItemProps {
    searchFriendItem: IUser;
}

const SearchFriendItem: FC<ISearchFriendItemProps> = ({ searchFriendItem }) => {
    const { id, firstName, lastName, avatar, tick } = searchFriendItem;
    const dispatch = useAppDispatch();
    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)!;

    const handleCreateAddFriendNotification = () => {
        console.log(`Creating add friend notification: [${id}]`);
        dispatch(createAddFriendNotification({ receiverId: id, accessToken }));
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
            <Button
                text='Kết bạn'
                size='sm'
                variant='primary'
                onClick={handleCreateAddFriendNotification}
            />
        </div>
    );
};

export default memo(SearchFriendItem);
