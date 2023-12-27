import AccountItem from 'components/AccountItem';
import { memo } from 'react';
import { User } from '../models/user';

type SuggestedUsersProps = {
    suggestedUsers: User[];
};

const SuggestedUsers = memo(function SuggestedUsers({ suggestedUsers }: SuggestedUsersProps) {
    return (
        <>
            <p className='text-gray075 text-sm font-semibold px-2 mt-[14px] mb-[10px]'>
                Tài khoản được đề xuất
            </p>
            {suggestedUsers.map(({ firstName, lastName, id, isVerified, avatar, username }) => (
                <AccountItem
                    key={id}
                    firstName={firstName}
                    lastName={lastName}
                    avatar={avatar}
                    username={username}
                    isVerified={isVerified}
                />
            ))}
        </>
    );
});

export default SuggestedUsers;
