import { IUser } from '@src/features/users/models/user';
import { FC, Fragment, memo } from 'react';
import SearchFriendItem from '../SearchFriendItem/SearchFriendItem';

interface ISearchFriendListProps {
    searchFriendList: IUser[];
}

const SearchFriendList: FC<ISearchFriendListProps> = ({ searchFriendList }) => {
    return (
        <Fragment>
            {searchFriendList.map((user) => (
                <SearchFriendItem key={user.id} searchFriendItem={user} />
            ))}
        </Fragment>
    );
};

export default memo(SearchFriendList);
