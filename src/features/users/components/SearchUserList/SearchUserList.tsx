import { IUser } from '@src/features/users/models/user';
import { Fragment, memo } from 'react';
import SearchFriendItem from '../SearchUsertem/SearchUsertem';

interface ISearchUserListProps {
    searchUserList: IUser[];
}

const SearchUserList = memo(function SearchUserList({ searchUserList }: ISearchUserListProps) {
    return (
        <Fragment>
            {searchUserList.map((user) => (
                <SearchFriendItem key={user.id} searchUserItem={user} />
            ))}
        </Fragment>
    );
});

export default SearchUserList;
