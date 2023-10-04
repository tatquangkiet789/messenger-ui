import { IUser } from '@src/features/users/models/user';
import { FC, memo } from 'react';
import tickIcon from '@src/assets/icons/tick.svg';
import Button from '@src/components/ui/Button/Button';

interface ISearchFriendItemProps {
    searchFriendItem: IUser;
}

const SearchFriendItem: FC<ISearchFriendItemProps> = ({ searchFriendItem }) => {
    const { id, firstName, lastName, avatar, tick } = searchFriendItem;

    const handleAddFriend = () => {
        console.log(`Creating add friend notification: [${id}]`);
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
            <Button text='Kết bạn' size='sm' variant='primary' onClick={handleAddFriend} />
        </div>
    );
};

export default memo(SearchFriendItem);
