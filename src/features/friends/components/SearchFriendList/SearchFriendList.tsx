import { IUser } from '@src/features/users/models/user';
import { Fragment, memo } from 'react';
import SearchFriendItem from '../SearchFriendItem/SearchFriendItem';

interface ISearchFriendListProps {
    searchFriendList: IUser[];
}

const SearchFriendList = memo(function SearchFriendList({
    searchFriendList,
}: ISearchFriendListProps) {
    return (
        <Fragment>
            {searchFriendList.map((user) => (
                <SearchFriendItem key={user.id} searchFriendItem={user} />
            ))}
        </Fragment>
    );
});

export default SearchFriendList;
